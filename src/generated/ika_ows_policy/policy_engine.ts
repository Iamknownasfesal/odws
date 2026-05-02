/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/


/**
 * OWS Policy Engine — composable, on-chain policy enforcement for dWallets.
 * 
 * Uses a Sui TransferPolicy-style composable rule system. The `DWalletCap` (or
 * `ImportedKeyDWalletCap`) is custodied inside a `PolicyEngine` shared object. The
 * agent cannot call `approve_message` directly — it must go through the engine,
 * which requires proof that every registered policy rule has been satisfied.
 * 
 * # Composable Rules
 * 
 * Policy rules are registered by type. Each rule module defines:
 * 
 * - A witness type `T` with `drop` ability
 * - A config type `Config` with `store + drop` abilities
 * - An `enforce` function that checks conditions and produces `PolicyReceipt<T>`
 * 
 * The admin registers rules via `add_rule<T, Config>`. To approve a message:
 * 
 * 1.  Agent calls `engine.create_request(...)` → gets `ApprovalRequest` (no
 *     `drop`)
 * 2.  Agent calls each rule's `enforce` → gets `PolicyReceipt<T>` per rule
 * 3.  Agent calls `request.add_receipt(receipt)` for each receipt
 * 4.  Agent calls `engine.confirm_dkg(coordinator, request)` → gets approval (only
 *     succeeds if ALL registered rules have matching receipts)
 * 
 * Only the module that defines `T` can create `PolicyReceipt<T>` (witness
 * pattern), so rules are unskippable.
 * 
 * # Capabilities
 * 
 * - `PolicyAdminCap` — wallet owner. Add/remove rules, pause, grant access.
 * - `PolicyAccessCap` — agent. Can create approval requests.
 * 
 * # Built-in: Emergency Pause
 * 
 * The engine has a built-in pause flag (admin-only kill switch). When paused,
 * `create_request` and `confirm_*` both abort. This is not a composable rule —
 * it's an absolute override.
 */

import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import { bcs, type BcsType } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import * as vec_set from './deps/sui/vec_set.js';
import * as type_name from './deps/std/type_name.js';
import * as bag from './deps/sui/bag.js';
import * as vec_set_1 from './deps/sui/vec_set.js';
import * as type_name_1 from './deps/std/type_name.js';
const $moduleName = '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180::policy_engine';
export const PolicyEngineCreatedEvent = new MoveStruct({ name: `${$moduleName}::PolicyEngineCreatedEvent`, fields: {
        engine_id: bcs.Address,
        admin_cap_id: bcs.Address
    } });
export const PolicyAccessGrantedEvent = new MoveStruct({ name: `${$moduleName}::PolicyAccessGrantedEvent`, fields: {
        engine_id: bcs.Address,
        access_cap_id: bcs.Address,
        recipient: bcs.Address
    } });
export const DkgCapKey = new MoveStruct({ name: `${$moduleName}::DkgCapKey`, fields: {
        dummy_field: bcs.bool()
    } });
export const ImportedKeyCapKey = new MoveStruct({ name: `${$moduleName}::ImportedKeyCapKey`, fields: {
        dummy_field: bcs.bool()
    } });
export const PolicyEngine = new MoveStruct({ name: `${$moduleName}::PolicyEngine`, fields: {
        id: bcs.Address,
        /** Registered rule types that must be satisfied for every approval. */
        rules: vec_set.VecSet(type_name.TypeName),
        /**
         * Rule configuration storage. Keyed by `TypeName`, stores each rule's `Config`
         * value. Managed via `add_rule` / `remove_rule`.
         */
        rule_configs: bag.Bag,
        /** Admin cap ID — validates admin operations. */
        admin_cap_id: bcs.Address,
        /** Emergency pause. When true, all approvals abort. */
        paused: bcs.bool()
    } });
export const PolicyAdminCap = new MoveStruct({ name: `${$moduleName}::PolicyAdminCap`, fields: {
        id: bcs.Address,
        /** ID of the `PolicyEngine` this cap controls. */
        engine_id: bcs.Address
    } });
export const PolicyAccessCap = new MoveStruct({ name: `${$moduleName}::PolicyAccessCap`, fields: {
        id: bcs.Address,
        /** ID of the `PolicyEngine` this cap grants access to. */
        engine_id: bcs.Address
    } });
export const ApprovalRequest = new MoveStruct({ name: `${$moduleName}::ApprovalRequest`, fields: {
        /** Engine this request belongs to. */
        engine_id: bcs.Address,
        /** Signing parameters. */
        signature_algorithm: bcs.u32(),
        hash_scheme: bcs.u32(),
        message: bcs.vector(bcs.u8()),
        /** Collected receipts (by type name). */
        receipts: vec_set_1.VecSet(type_name_1.TypeName)
    } });
export const PolicyReceipt = new MoveStruct({ name: `${$moduleName}::PolicyReceipt<phantom T>`, fields: {
        engine_id: bcs.Address
    } });
export interface CreateWithDkgCapArguments {
    cap: RawTransactionArgument<string>;
}
export interface CreateWithDkgCapOptions {
    package?: string;
    arguments: CreateWithDkgCapArguments | [
        cap: RawTransactionArgument<string>
    ];
}
/**
 * Create a policy engine that custodies a DKG `DWalletCap`.
 *
 * The `DWalletCap` is stored as a dynamic object field on the engine. Returns
 * `PolicyAdminCap` to the caller (wallet owner).
 */
export function createWithDkgCap(options: CreateWithDkgCapOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["cap"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'policy_engine',
        function: 'create_with_dkg_cap',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface CreateWithImportedKeyCapArguments {
    cap: RawTransactionArgument<string>;
}
export interface CreateWithImportedKeyCapOptions {
    package?: string;
    arguments: CreateWithImportedKeyCapArguments | [
        cap: RawTransactionArgument<string>
    ];
}
/** Create a policy engine that custodies an `ImportedKeyDWalletCap`. */
export function createWithImportedKeyCap(options: CreateWithImportedKeyCapOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["cap"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'policy_engine',
        function: 'create_with_imported_key_cap',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface AddRuleArguments<T extends BcsType<any>, Config extends BcsType<any>> {
    self: RawTransactionArgument<string>;
    adminCap: RawTransactionArgument<string>;
    Witness: RawTransactionArgument<T>;
    config: RawTransactionArgument<Config>;
}
export interface AddRuleOptions<T extends BcsType<any>, Config extends BcsType<any>> {
    package?: string;
    arguments: AddRuleArguments<T, Config> | [
        self: RawTransactionArgument<string>,
        adminCap: RawTransactionArgument<string>,
        Witness: RawTransactionArgument<T>,
        config: RawTransactionArgument<Config>
    ];
    typeArguments: [
        string,
        string
    ];
}
/**
 * Register a composable rule.
 *
 * `T` is the rule's witness type (must have `drop`). `Config` is the rule's
 * configuration, stored in the engine. Only the module defining `T` can create
 * instances of `T`, so only it can produce `PolicyReceipt<T>`.
 */
export function addRule<T extends BcsType<any>, Config extends BcsType<any>>(options: AddRuleOptions<T, Config>) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null,
        `${options.typeArguments[0]}`,
        `${options.typeArguments[1]}`
    ] satisfies (string | null)[];
    const parameterNames = ["self", "adminCap", "Witness", "config"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'policy_engine',
        function: 'add_rule',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface RemoveRuleArguments {
    self: RawTransactionArgument<string>;
    adminCap: RawTransactionArgument<string>;
}
export interface RemoveRuleOptions {
    package?: string;
    arguments: RemoveRuleArguments | [
        self: RawTransactionArgument<string>,
        adminCap: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string
    ];
}
/**
 * Remove a registered rule and return its config.
 *
 * All rules must be removed before the engine can be destroyed.
 */
export function removeRule(options: RemoveRuleOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self", "adminCap"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'policy_engine',
        function: 'remove_rule',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface HasRuleArguments {
    self: RawTransactionArgument<string>;
}
export interface HasRuleOptions {
    package?: string;
    arguments: HasRuleArguments | [
        self: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
/** Check if a rule type is registered. */
export function hasRule(options: HasRuleOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'policy_engine',
        function: 'has_rule',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface RuleConfigArguments {
    self: RawTransactionArgument<string>;
}
export interface RuleConfigOptions {
    package?: string;
    arguments: RuleConfigArguments | [
        self: RawTransactionArgument<string>
    ];
    typeArguments: [
        string,
        string
    ];
}
/** Borrow a rule's config (immutable). */
export function ruleConfig(options: RuleConfigOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'policy_engine',
        function: 'rule_config',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface RuleConfigMutArguments<T extends BcsType<any>> {
    self: RawTransactionArgument<string>;
    Witness: RawTransactionArgument<T>;
}
export interface RuleConfigMutOptions<T extends BcsType<any>> {
    package?: string;
    arguments: RuleConfigMutArguments<T> | [
        self: RawTransactionArgument<string>,
        Witness: RawTransactionArgument<T>
    ];
    typeArguments: [
        string,
        string
    ];
}
/**
 * Borrow a rule's config (mutable). Requires the rule's witness to prove the
 * caller is the defining module.
 *
 * Used by rule modules in their `enforce` function to update state (e.g.,
 * incrementing a rate limit counter).
 */
export function ruleConfigMut<T extends BcsType<any>>(options: RuleConfigMutOptions<T>) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        `${options.typeArguments[0]}`
    ] satisfies (string | null)[];
    const parameterNames = ["self", "Witness"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'policy_engine',
        function: 'rule_config_mut',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface CreateRequestArguments {
    self: RawTransactionArgument<string>;
    accessCap: RawTransactionArgument<string>;
    signatureAlgorithm: RawTransactionArgument<number>;
    hashScheme: RawTransactionArgument<number>;
    message: RawTransactionArgument<Array<number>>;
}
export interface CreateRequestOptions {
    package?: string;
    arguments: CreateRequestArguments | [
        self: RawTransactionArgument<string>,
        accessCap: RawTransactionArgument<string>,
        signatureAlgorithm: RawTransactionArgument<number>,
        hashScheme: RawTransactionArgument<number>,
        message: RawTransactionArgument<Array<number>>
    ];
}
/**
 * Create an approval request.
 *
 * Aborts if the engine is paused or the access cap is invalid. The returned
 * `ApprovalRequest` has no `drop` — it must be consumed via `confirm_*` or
 * `cancel`.
 */
export function createRequest(options: CreateRequestOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null,
        'u32',
        'u32',
        'vector<u8>'
    ] satisfies (string | null)[];
    const parameterNames = ["self", "accessCap", "signatureAlgorithm", "hashScheme", "message"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'policy_engine',
        function: 'create_request',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface NewReceiptArguments<T extends BcsType<any>> {
    Witness: RawTransactionArgument<T>;
    request: RawTransactionArgument<string>;
}
export interface NewReceiptOptions<T extends BcsType<any>> {
    package?: string;
    arguments: NewReceiptArguments<T> | [
        Witness: RawTransactionArgument<T>,
        request: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
/**
 * Create a `PolicyReceipt<T>` proving that rule `T` has been satisfied.
 *
 * Only callable by the module that defines `T` (witness pattern). Rule modules
 * call this at the end of their `enforce` function after checking their
 * conditions.
 */
export function newReceipt<T extends BcsType<any>>(options: NewReceiptOptions<T>) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        `${options.typeArguments[0]}`,
        null
    ] satisfies (string | null)[];
    const parameterNames = ["Witness", "request"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'policy_engine',
        function: 'new_receipt',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface AddReceiptArguments {
    self: RawTransactionArgument<string>;
    receipt: RawTransactionArgument<string>;
}
export interface AddReceiptOptions {
    package?: string;
    arguments: AddReceiptArguments | [
        self: RawTransactionArgument<string>,
        receipt: RawTransactionArgument<string>
    ];
    typeArguments: [
        string
    ];
}
/**
 * Add a receipt to an approval request.
 *
 * Each registered rule type must have exactly one receipt added before the request
 * can be confirmed.
 */
export function addReceipt(options: AddReceiptOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self", "receipt"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'policy_engine',
        function: 'add_receipt',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        typeArguments: options.typeArguments
    });
}
export interface ConfirmDkgArguments {
    self: RawTransactionArgument<string>;
    coordinator: RawTransactionArgument<string>;
    request: RawTransactionArgument<string>;
}
export interface ConfirmDkgOptions {
    package?: string;
    arguments: ConfirmDkgArguments | [
        self: RawTransactionArgument<string>,
        coordinator: RawTransactionArgument<string>,
        request: RawTransactionArgument<string>
    ];
}
/**
 * Confirm a request and produce a `MessageApproval` for a DKG dWallet.
 *
 * Asserts:
 *
 * 1.  Engine is not paused.
 * 2.  Request belongs to this engine.
 * 3.  All registered rules have matching receipts.
 *
 * Then calls `coordinator.approve_message` with the custodied `DWalletCap`.
 */
export function confirmDkg(options: ConfirmDkgOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null,
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self", "coordinator", "request"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'policy_engine',
        function: 'confirm_dkg',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface ConfirmImportedKeyArguments {
    self: RawTransactionArgument<string>;
    coordinator: RawTransactionArgument<string>;
    request: RawTransactionArgument<string>;
}
export interface ConfirmImportedKeyOptions {
    package?: string;
    arguments: ConfirmImportedKeyArguments | [
        self: RawTransactionArgument<string>,
        coordinator: RawTransactionArgument<string>,
        request: RawTransactionArgument<string>
    ];
}
/** Confirm a request and produce an `ImportedKeyMessageApproval`. */
export function confirmImportedKey(options: ConfirmImportedKeyOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null,
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self", "coordinator", "request"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'policy_engine',
        function: 'confirm_imported_key',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface CancelArguments {
    request: RawTransactionArgument<string>;
}
export interface CancelOptions {
    package?: string;
    arguments: CancelArguments | [
        request: RawTransactionArgument<string>
    ];
}
/**
 * Cancel a request without producing an approval. Consumes the `ApprovalRequest`
 * (which has no `drop`).
 */
export function cancel(options: CancelOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["request"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'policy_engine',
        function: 'cancel',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface EngineIdArguments {
    self: RawTransactionArgument<string>;
}
export interface EngineIdOptions {
    package?: string;
    arguments: EngineIdArguments | [
        self: RawTransactionArgument<string>
    ];
}
/** Engine ID the request belongs to. */
export function engineId(options: EngineIdOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'policy_engine',
        function: 'engine_id',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface SignatureAlgorithmArguments {
    self: RawTransactionArgument<string>;
}
export interface SignatureAlgorithmOptions {
    package?: string;
    arguments: SignatureAlgorithmArguments | [
        self: RawTransactionArgument<string>
    ];
}
/** Signature algorithm requested. */
export function signatureAlgorithm(options: SignatureAlgorithmOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'policy_engine',
        function: 'signature_algorithm',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface HashSchemeArguments {
    self: RawTransactionArgument<string>;
}
export interface HashSchemeOptions {
    package?: string;
    arguments: HashSchemeArguments | [
        self: RawTransactionArgument<string>
    ];
}
/** Hash scheme requested. */
export function hashScheme(options: HashSchemeOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'policy_engine',
        function: 'hash_scheme',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface MessageArguments {
    self: RawTransactionArgument<string>;
}
export interface MessageOptions {
    package?: string;
    arguments: MessageArguments | [
        self: RawTransactionArgument<string>
    ];
}
/** Raw message bytes to be signed. */
export function message(options: MessageOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'policy_engine',
        function: 'message',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface PauseArguments {
    self: RawTransactionArgument<string>;
    adminCap: RawTransactionArgument<string>;
}
export interface PauseOptions {
    package?: string;
    arguments: PauseArguments | [
        self: RawTransactionArgument<string>,
        adminCap: RawTransactionArgument<string>
    ];
}
/** Pause the engine. All `create_request` and `confirm_*` calls will abort. */
export function pause(options: PauseOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self", "adminCap"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'policy_engine',
        function: 'pause',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface UnpauseArguments {
    self: RawTransactionArgument<string>;
    adminCap: RawTransactionArgument<string>;
}
export interface UnpauseOptions {
    package?: string;
    arguments: UnpauseArguments | [
        self: RawTransactionArgument<string>,
        adminCap: RawTransactionArgument<string>
    ];
}
/** Unpause the engine. */
export function unpause(options: UnpauseOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self", "adminCap"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'policy_engine',
        function: 'unpause',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface GrantAccessArguments {
    self: RawTransactionArgument<string>;
    adminCap: RawTransactionArgument<string>;
}
export interface GrantAccessOptions {
    package?: string;
    arguments: GrantAccessArguments | [
        self: RawTransactionArgument<string>,
        adminCap: RawTransactionArgument<string>
    ];
}
/** Grant a new `PolicyAccessCap` for this engine. */
export function grantAccess(options: GrantAccessOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self", "adminCap"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'policy_engine',
        function: 'grant_access',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface RevokeAccessArguments {
    accessCap: RawTransactionArgument<string>;
}
export interface RevokeAccessOptions {
    package?: string;
    arguments: RevokeAccessArguments | [
        accessCap: RawTransactionArgument<string>
    ];
}
/** Revoke a `PolicyAccessCap` by destroying it. */
export function revokeAccess(options: RevokeAccessOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["accessCap"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'policy_engine',
        function: 'revoke_access',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface DestroyAndReclaimDkgCapArguments {
    self: RawTransactionArgument<string>;
    adminCap: RawTransactionArgument<string>;
}
export interface DestroyAndReclaimDkgCapOptions {
    package?: string;
    arguments: DestroyAndReclaimDkgCapArguments | [
        self: RawTransactionArgument<string>,
        adminCap: RawTransactionArgument<string>
    ];
}
/**
 * Destroy the engine and reclaim the custodied DKG `DWalletCap`.
 *
 * All rules must be removed first (bag must be empty).
 */
export function destroyAndReclaimDkgCap(options: DestroyAndReclaimDkgCapOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self", "adminCap"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'policy_engine',
        function: 'destroy_and_reclaim_dkg_cap',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface DestroyAndReclaimImportedKeyCapArguments {
    self: RawTransactionArgument<string>;
    adminCap: RawTransactionArgument<string>;
}
export interface DestroyAndReclaimImportedKeyCapOptions {
    package?: string;
    arguments: DestroyAndReclaimImportedKeyCapArguments | [
        self: RawTransactionArgument<string>,
        adminCap: RawTransactionArgument<string>
    ];
}
/**
 * Destroy the engine and reclaim the custodied `ImportedKeyDWalletCap`.
 *
 * All rules must be removed first (bag must be empty).
 */
export function destroyAndReclaimImportedKeyCap(options: DestroyAndReclaimImportedKeyCapOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self", "adminCap"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'policy_engine',
        function: 'destroy_and_reclaim_imported_key_cap',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface IsPausedArguments {
    self: RawTransactionArgument<string>;
}
export interface IsPausedOptions {
    package?: string;
    arguments: IsPausedArguments | [
        self: RawTransactionArgument<string>
    ];
}
/** Whether the engine is currently paused. */
export function isPaused(options: IsPausedOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'policy_engine',
        function: 'is_paused',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface RulesCountArguments {
    self: RawTransactionArgument<string>;
}
export interface RulesCountOptions {
    package?: string;
    arguments: RulesCountArguments | [
        self: RawTransactionArgument<string>
    ];
}
/** Number of registered rules. */
export function rulesCount(options: RulesCountOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'policy_engine',
        function: 'rules_count',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface AccessCapEngineIdArguments {
    self: RawTransactionArgument<string>;
}
export interface AccessCapEngineIdOptions {
    package?: string;
    arguments: AccessCapEngineIdArguments | [
        self: RawTransactionArgument<string>
    ];
}
/** The engine ID that an access cap is bound to. */
export function accessCapEngineId(options: AccessCapEngineIdOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'policy_engine',
        function: 'access_cap_engine_id',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface AdminCapEngineIdArguments {
    self: RawTransactionArgument<string>;
}
export interface AdminCapEngineIdOptions {
    package?: string;
    arguments: AdminCapEngineIdArguments | [
        self: RawTransactionArgument<string>
    ];
}
/** The engine ID that an admin cap is bound to. */
export function adminCapEngineId(options: AdminCapEngineIdOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'policy_engine',
        function: 'admin_cap_engine_id',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}