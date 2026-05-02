/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/


/**
 * Target filter rule — restrict which addresses/contracts an agent can interact
 * with.
 * 
 * Supports two modes (can be combined):
 * 
 * - **Allowlist**: if non-empty, the declared target MUST be in the list.
 * - **Blocklist**: if non-empty, the declared target MUST NOT be in the list.
 * 
 * The agent declares the target address (as raw bytes) when enforcing. The
 * declaration is emitted as an on-chain event for accountability — if the agent
 * lies about the target, the evidence is on-chain alongside the signed message.
 * 
 * Uses `vector<u8>` for target addresses to support any chain format:
 * 
 * - EVM: 20 bytes
 * - Solana: 32 bytes
 * - Bitcoin: 20-32 bytes (depending on address type)
 * - Sui: 32 bytes
 * 
 * # Usage
 * 
 * ```move
 * // Admin: only allow interactions with two EVM contracts
 * let allowed = vector[contract_a_bytes, contract_b_bytes];
 * target_filter::add(&mut engine, &admin_cap, allowed, vector[]);
 * 
 * // Agent: enforce with declared target
 * let receipt = target_filter::enforce(&mut engine, &request, target_bytes);
 * request.add_receipt(receipt);
 * ```
 */

import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
const $moduleName = '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180::target_filter';
export const TargetFilter = new MoveStruct({ name: `${$moduleName}::TargetFilter`, fields: {
        dummy_field: bcs.bool()
    } });
export const TargetFilterConfig = new MoveStruct({ name: `${$moduleName}::TargetFilterConfig`, fields: {
        /** If non-empty, declared target must be in this list. */
        allowed_targets: bcs.vector(bcs.vector(bcs.u8())),
        /** If non-empty, declared target must NOT be in this list. */
        blocked_targets: bcs.vector(bcs.vector(bcs.u8()))
    } });
export const TargetDeclaration = new MoveStruct({ name: `${$moduleName}::TargetDeclaration`, fields: {
        engine_id: bcs.Address,
        /** The declared target address (raw bytes). */
        declared_target: bcs.vector(bcs.u8())
    } });
export interface AddArguments {
    engine: RawTransactionArgument<string>;
    adminCap: RawTransactionArgument<string>;
    allowedTargets: RawTransactionArgument<Array<Array<number>>>;
    blockedTargets: RawTransactionArgument<Array<Array<number>>>;
}
export interface AddOptions {
    package?: string;
    arguments: AddArguments | [
        engine: RawTransactionArgument<string>,
        adminCap: RawTransactionArgument<string>,
        allowedTargets: RawTransactionArgument<Array<Array<number>>>,
        blockedTargets: RawTransactionArgument<Array<Array<number>>>
    ];
}
/** Register the target filter rule. */
export function add(options: AddOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null,
        'vector<vector<u8>>',
        'vector<vector<u8>>'
    ] satisfies (string | null)[];
    const parameterNames = ["engine", "adminCap", "allowedTargets", "blockedTargets"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'target_filter',
        function: 'add',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface RemoveArguments {
    engine: RawTransactionArgument<string>;
    adminCap: RawTransactionArgument<string>;
}
export interface RemoveOptions {
    package?: string;
    arguments: RemoveArguments | [
        engine: RawTransactionArgument<string>,
        adminCap: RawTransactionArgument<string>
    ];
}
/** Remove the target filter rule. */
export function remove(options: RemoveOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null
    ] satisfies (string | null)[];
    const parameterNames = ["engine", "adminCap"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'target_filter',
        function: 'remove',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface SetAllowedTargetsArguments {
    engine: RawTransactionArgument<string>;
    adminCap: RawTransactionArgument<string>;
    allowedTargets: RawTransactionArgument<Array<Array<number>>>;
}
export interface SetAllowedTargetsOptions {
    package?: string;
    arguments: SetAllowedTargetsArguments | [
        engine: RawTransactionArgument<string>,
        adminCap: RawTransactionArgument<string>,
        allowedTargets: RawTransactionArgument<Array<Array<number>>>
    ];
}
/** Replace the allowlist. */
export function setAllowedTargets(options: SetAllowedTargetsOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null,
        'vector<vector<u8>>'
    ] satisfies (string | null)[];
    const parameterNames = ["engine", "adminCap", "allowedTargets"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'target_filter',
        function: 'set_allowed_targets',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface SetBlockedTargetsArguments {
    engine: RawTransactionArgument<string>;
    adminCap: RawTransactionArgument<string>;
    blockedTargets: RawTransactionArgument<Array<Array<number>>>;
}
export interface SetBlockedTargetsOptions {
    package?: string;
    arguments: SetBlockedTargetsArguments | [
        engine: RawTransactionArgument<string>,
        adminCap: RawTransactionArgument<string>,
        blockedTargets: RawTransactionArgument<Array<Array<number>>>
    ];
}
/** Replace the blocklist. */
export function setBlockedTargets(options: SetBlockedTargetsOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null,
        'vector<vector<u8>>'
    ] satisfies (string | null)[];
    const parameterNames = ["engine", "adminCap", "blockedTargets"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'target_filter',
        function: 'set_blocked_targets',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface AllowTargetArguments {
    engine: RawTransactionArgument<string>;
    adminCap: RawTransactionArgument<string>;
    target: RawTransactionArgument<Array<number>>;
}
export interface AllowTargetOptions {
    package?: string;
    arguments: AllowTargetArguments | [
        engine: RawTransactionArgument<string>,
        adminCap: RawTransactionArgument<string>,
        target: RawTransactionArgument<Array<number>>
    ];
}
/** Add a single target to the allowlist. */
export function allowTarget(options: AllowTargetOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null,
        'vector<u8>'
    ] satisfies (string | null)[];
    const parameterNames = ["engine", "adminCap", "target"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'target_filter',
        function: 'allow_target',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface DisallowTargetArguments {
    engine: RawTransactionArgument<string>;
    adminCap: RawTransactionArgument<string>;
    target: RawTransactionArgument<Array<number>>;
}
export interface DisallowTargetOptions {
    package?: string;
    arguments: DisallowTargetArguments | [
        engine: RawTransactionArgument<string>,
        adminCap: RawTransactionArgument<string>,
        target: RawTransactionArgument<Array<number>>
    ];
}
/** Remove a single target from the allowlist. */
export function disallowTarget(options: DisallowTargetOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null,
        'vector<u8>'
    ] satisfies (string | null)[];
    const parameterNames = ["engine", "adminCap", "target"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'target_filter',
        function: 'disallow_target',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface BlockTargetArguments {
    engine: RawTransactionArgument<string>;
    adminCap: RawTransactionArgument<string>;
    target: RawTransactionArgument<Array<number>>;
}
export interface BlockTargetOptions {
    package?: string;
    arguments: BlockTargetArguments | [
        engine: RawTransactionArgument<string>,
        adminCap: RawTransactionArgument<string>,
        target: RawTransactionArgument<Array<number>>
    ];
}
/** Add a single target to the blocklist. */
export function blockTarget(options: BlockTargetOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null,
        'vector<u8>'
    ] satisfies (string | null)[];
    const parameterNames = ["engine", "adminCap", "target"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'target_filter',
        function: 'block_target',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface UnblockTargetArguments {
    engine: RawTransactionArgument<string>;
    adminCap: RawTransactionArgument<string>;
    target: RawTransactionArgument<Array<number>>;
}
export interface UnblockTargetOptions {
    package?: string;
    arguments: UnblockTargetArguments | [
        engine: RawTransactionArgument<string>,
        adminCap: RawTransactionArgument<string>,
        target: RawTransactionArgument<Array<number>>
    ];
}
/** Remove a single target from the blocklist. */
export function unblockTarget(options: UnblockTargetOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null,
        'vector<u8>'
    ] satisfies (string | null)[];
    const parameterNames = ["engine", "adminCap", "target"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'target_filter',
        function: 'unblock_target',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface EnforceArguments {
    engine: RawTransactionArgument<string>;
    request: RawTransactionArgument<string>;
    declaredTarget: RawTransactionArgument<Array<number>>;
}
export interface EnforceOptions {
    package?: string;
    arguments: EnforceArguments | [
        engine: RawTransactionArgument<string>,
        request: RawTransactionArgument<string>,
        declaredTarget: RawTransactionArgument<Array<number>>
    ];
}
/**
 * Enforce the target filter and produce a receipt.
 *
 * The agent declares the target address of this transaction. The contract:
 *
 * 1.  If allowlist is non-empty, asserts the target is in the allowlist.
 * 2.  If blocklist is non-empty, asserts the target is NOT in the blocklist.
 *
 * Emits a `TargetDeclaration` event for on-chain accountability.
 */
export function enforce(options: EnforceOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null,
        'vector<u8>'
    ] satisfies (string | null)[];
    const parameterNames = ["engine", "request", "declaredTarget"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'target_filter',
        function: 'enforce',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface ConfigArguments {
    engine: RawTransactionArgument<string>;
}
export interface ConfigOptions {
    package?: string;
    arguments: ConfigArguments | [
        engine: RawTransactionArgument<string>
    ];
}
/** Borrow the target filter config. */
export function config(options: ConfigOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["engine"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'target_filter',
        function: 'config',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface AllowedTargetsArguments {
    self: RawTransactionArgument<string>;
}
export interface AllowedTargetsOptions {
    package?: string;
    arguments: AllowedTargetsArguments | [
        self: RawTransactionArgument<string>
    ];
}
/** The allowed targets. */
export function allowedTargets(options: AllowedTargetsOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'target_filter',
        function: 'allowed_targets',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface BlockedTargetsArguments {
    self: RawTransactionArgument<string>;
}
export interface BlockedTargetsOptions {
    package?: string;
    arguments: BlockedTargetsArguments | [
        self: RawTransactionArgument<string>
    ];
}
/** The blocked targets. */
export function blockedTargets(options: BlockedTargetsOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'target_filter',
        function: 'blocked_targets',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface IsTargetPermittedArguments {
    self: RawTransactionArgument<string>;
    target: RawTransactionArgument<Array<number>>;
}
export interface IsTargetPermittedOptions {
    package?: string;
    arguments: IsTargetPermittedArguments | [
        self: RawTransactionArgument<string>,
        target: RawTransactionArgument<Array<number>>
    ];
}
/** Check if a target is allowed (passes both allowlist and blocklist). */
export function isTargetPermitted(options: IsTargetPermittedOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        'vector<u8>'
    ] satisfies (string | null)[];
    const parameterNames = ["self", "target"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'target_filter',
        function: 'is_target_permitted',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}