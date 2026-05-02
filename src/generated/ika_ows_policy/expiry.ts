/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/


/**
 * Expiry rule — signing permission expires at a given timestamp.
 * 
 * Useful for temporary agent delegations. Once the on-chain clock passes
 * `expiry_ms`, the rule blocks all signatures. No admin action needed to revoke —
 * it's automatic.
 * 
 * # Usage
 * 
 * ```move
 * // Admin: allow signing until 2025-06-01 00:00:00 UTC (ms timestamp)
 * expiry::add(&mut engine, &admin_cap, 1748736000000);
 * 
 * // Agent: enforce during signing
 * let receipt = expiry::enforce(&engine, &request, &clock);
 * request.add_receipt(receipt);
 * ```
 */

import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
const $moduleName = '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180::expiry';
export const Expiry = new MoveStruct({ name: `${$moduleName}::Expiry`, fields: {
        dummy_field: bcs.bool()
    } });
export const ExpiryConfig = new MoveStruct({ name: `${$moduleName}::ExpiryConfig`, fields: {
        /** Timestamp in milliseconds after which signing is blocked. */
        expiry_ms: bcs.u64()
    } });
export interface AddArguments {
    engine: RawTransactionArgument<string>;
    adminCap: RawTransactionArgument<string>;
    expiryMs: RawTransactionArgument<number | bigint>;
}
export interface AddOptions {
    package?: string;
    arguments: AddArguments | [
        engine: RawTransactionArgument<string>,
        adminCap: RawTransactionArgument<string>,
        expiryMs: RawTransactionArgument<number | bigint>
    ];
}
/** Register the expiry rule. */
export function add(options: AddOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null,
        'u64'
    ] satisfies (string | null)[];
    const parameterNames = ["engine", "adminCap", "expiryMs"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'expiry',
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
/** Remove the expiry rule. */
export function remove(options: RemoveOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null
    ] satisfies (string | null)[];
    const parameterNames = ["engine", "adminCap"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'expiry',
        function: 'remove',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface SetExpiryMsArguments {
    engine: RawTransactionArgument<string>;
    adminCap: RawTransactionArgument<string>;
    expiryMs: RawTransactionArgument<number | bigint>;
}
export interface SetExpiryMsOptions {
    package?: string;
    arguments: SetExpiryMsArguments | [
        engine: RawTransactionArgument<string>,
        adminCap: RawTransactionArgument<string>,
        expiryMs: RawTransactionArgument<number | bigint>
    ];
}
/** Update the expiry timestamp. */
export function setExpiryMs(options: SetExpiryMsOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null,
        'u64'
    ] satisfies (string | null)[];
    const parameterNames = ["engine", "adminCap", "expiryMs"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'expiry',
        function: 'set_expiry_ms',
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
 * Enforce the expiry rule.
 *
 * Aborts if `clock.timestamp_ms() > expiry_ms`.
 */
export function enforce(options: EnforceOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null,
        '0x2::clock::Clock'
    ] satisfies (string | null)[];
    const parameterNames = ["engine", "request"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'expiry',
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
/** Borrow the expiry config. */
export function config(options: ConfigOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["engine"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'expiry',
        function: 'config',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface ExpiryMsArguments {
    self: RawTransactionArgument<string>;
}
export interface ExpiryMsOptions {
    package?: string;
    arguments: ExpiryMsArguments | [
        self: RawTransactionArgument<string>
    ];
}
/** The expiry timestamp in milliseconds. */
export function expiryMs(options: ExpiryMsOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'expiry',
        function: 'expiry_ms',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface IsExpiredArguments {
    self: RawTransactionArgument<string>;
    nowMs: RawTransactionArgument<number | bigint>;
}
export interface IsExpiredOptions {
    package?: string;
    arguments: IsExpiredArguments | [
        self: RawTransactionArgument<string>,
        nowMs: RawTransactionArgument<number | bigint>
    ];
}
/** Whether the rule has expired at the given timestamp. */
export function isExpired(options: IsExpiredOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        'u64'
    ] satisfies (string | null)[];
    const parameterNames = ["self", "nowMs"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'expiry',
        function: 'is_expired',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}