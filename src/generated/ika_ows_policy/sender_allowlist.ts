/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/


/**
 * Sender allowlist rule — only whitelisted addresses can sign.
 * 
 * Defense in depth on top of `PolicyAccessCap`. Even if an access cap is
 * transferred or compromised, only `ctx.sender()` addresses in the allowlist can
 * produce valid receipts.
 * 
 * # Usage
 * 
 * ```move
 * // Admin: register with allowed addresses
 * let allowed = vector[agent_addr_1, agent_addr_2];
 * sender_allowlist::add(&mut engine, &admin_cap, allowed);
 * 
 * // Agent: enforce during signing
 * let receipt = sender_allowlist::enforce(&engine, &request, ctx);
 * request.add_receipt(receipt);
 * ```
 */

import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
const $moduleName = '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180::sender_allowlist';
export const SenderAllowlist = new MoveStruct({ name: `${$moduleName}::SenderAllowlist`, fields: {
        dummy_field: bcs.bool()
    } });
export const SenderAllowlistConfig = new MoveStruct({ name: `${$moduleName}::SenderAllowlistConfig`, fields: {
        /** Addresses allowed to produce signatures. */
        allowed: bcs.vector(bcs.Address)
    } });
export interface AddArguments {
    engine: RawTransactionArgument<string>;
    adminCap: RawTransactionArgument<string>;
    allowed: RawTransactionArgument<Array<string>>;
}
export interface AddOptions {
    package?: string;
    arguments: AddArguments | [
        engine: RawTransactionArgument<string>,
        adminCap: RawTransactionArgument<string>,
        allowed: RawTransactionArgument<Array<string>>
    ];
}
/** Register the sender allowlist rule. */
export function add(options: AddOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null,
        'vector<address>'
    ] satisfies (string | null)[];
    const parameterNames = ["engine", "adminCap", "allowed"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'sender_allowlist',
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
/** Remove the sender allowlist rule. */
export function remove(options: RemoveOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null
    ] satisfies (string | null)[];
    const parameterNames = ["engine", "adminCap"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'sender_allowlist',
        function: 'remove',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface SetAllowedArguments {
    engine: RawTransactionArgument<string>;
    adminCap: RawTransactionArgument<string>;
    allowed: RawTransactionArgument<Array<string>>;
}
export interface SetAllowedOptions {
    package?: string;
    arguments: SetAllowedArguments | [
        engine: RawTransactionArgument<string>,
        adminCap: RawTransactionArgument<string>,
        allowed: RawTransactionArgument<Array<string>>
    ];
}
/** Replace the entire allowlist. */
export function setAllowed(options: SetAllowedOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null,
        'vector<address>'
    ] satisfies (string | null)[];
    const parameterNames = ["engine", "adminCap", "allowed"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'sender_allowlist',
        function: 'set_allowed',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface AddAddressArguments {
    engine: RawTransactionArgument<string>;
    adminCap: RawTransactionArgument<string>;
    addr: RawTransactionArgument<string>;
}
export interface AddAddressOptions {
    package?: string;
    arguments: AddAddressArguments | [
        engine: RawTransactionArgument<string>,
        adminCap: RawTransactionArgument<string>,
        addr: RawTransactionArgument<string>
    ];
}
/** Add a single address to the allowlist. */
export function addAddress(options: AddAddressOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null,
        'address'
    ] satisfies (string | null)[];
    const parameterNames = ["engine", "adminCap", "addr"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'sender_allowlist',
        function: 'add_address',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface RemoveAddressArguments {
    engine: RawTransactionArgument<string>;
    adminCap: RawTransactionArgument<string>;
    addr: RawTransactionArgument<string>;
}
export interface RemoveAddressOptions {
    package?: string;
    arguments: RemoveAddressArguments | [
        engine: RawTransactionArgument<string>,
        adminCap: RawTransactionArgument<string>,
        addr: RawTransactionArgument<string>
    ];
}
/** Remove a single address from the allowlist. */
export function removeAddress(options: RemoveAddressOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null,
        'address'
    ] satisfies (string | null)[];
    const parameterNames = ["engine", "adminCap", "addr"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'sender_allowlist',
        function: 'remove_address',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface EnforceArguments {
    engine: RawTransactionArgument<string>;
    request: RawTransactionArgument<string>;
}
export interface EnforceOptions {
    package?: string;
    arguments: EnforceArguments | [
        engine: RawTransactionArgument<string>,
        request: RawTransactionArgument<string>
    ];
}
/**
 * Enforce the sender allowlist.
 *
 * Aborts if `ctx.sender()` is not in the allowlist.
 */
export function enforce(options: EnforceOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null
    ] satisfies (string | null)[];
    const parameterNames = ["engine", "request"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'sender_allowlist',
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
/** Borrow the allowlist config. */
export function config(options: ConfigOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["engine"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'sender_allowlist',
        function: 'config',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface AllowedArguments {
    self: RawTransactionArgument<string>;
}
export interface AllowedOptions {
    package?: string;
    arguments: AllowedArguments | [
        self: RawTransactionArgument<string>
    ];
}
/** The allowed addresses. */
export function allowed(options: AllowedOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'sender_allowlist',
        function: 'allowed',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface IsAllowedArguments {
    self: RawTransactionArgument<string>;
    addr: RawTransactionArgument<string>;
}
export interface IsAllowedOptions {
    package?: string;
    arguments: IsAllowedArguments | [
        self: RawTransactionArgument<string>,
        addr: RawTransactionArgument<string>
    ];
}
/** Check if an address is allowed. */
export function isAllowed(options: IsAllowedOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        'address'
    ] satisfies (string | null)[];
    const parameterNames = ["self", "addr"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'sender_allowlist',
        function: 'is_allowed',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}