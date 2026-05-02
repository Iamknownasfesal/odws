/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/


/**
 * Rate limit rule — time-window based signature rate limiting.
 * 
 * Limits the number of signatures within a configurable time window (in
 * milliseconds). The counter resets when the window elapses.
 * 
 * # Usage
 * 
 * ```move
 * // Admin: max 100 signatures per hour (3_600_000 ms)
 * rate_limit::add(&mut engine, &admin_cap, 100, 3_600_000, &clock);
 * 
 * // Agent: enforce during signing
 * let receipt = rate_limit::enforce(&mut engine, &request, &clock);
 * request.add_receipt(receipt);
 * ```
 */

import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
const $moduleName = '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180::rate_limit';
export const RateLimit = new MoveStruct({ name: `${$moduleName}::RateLimit`, fields: {
        dummy_field: bcs.bool()
    } });
export const RateLimitConfig = new MoveStruct({ name: `${$moduleName}::RateLimitConfig`, fields: {
        /** Max signatures per time window. */
        max_per_window: bcs.u64(),
        /** Window duration in milliseconds. */
        window_ms: bcs.u64(),
        /** Signature count in the current window. */
        window_count: bcs.u64(),
        /** Timestamp (ms) when the current window started. */
        window_start_ms: bcs.u64()
    } });
export interface AddArguments {
    engine: RawTransactionArgument<string>;
    adminCap: RawTransactionArgument<string>;
    maxPerWindow: RawTransactionArgument<number | bigint>;
    windowMs: RawTransactionArgument<number | bigint>;
}
export interface AddOptions {
    package?: string;
    arguments: AddArguments | [
        engine: RawTransactionArgument<string>,
        adminCap: RawTransactionArgument<string>,
        maxPerWindow: RawTransactionArgument<number | bigint>,
        windowMs: RawTransactionArgument<number | bigint>
    ];
}
/** Register the rate limit rule. */
export function add(options: AddOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null,
        'u64',
        'u64',
        '0x2::clock::Clock'
    ] satisfies (string | null)[];
    const parameterNames = ["engine", "adminCap", "maxPerWindow", "windowMs"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'rate_limit',
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
/** Remove the rate limit rule. */
export function remove(options: RemoveOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null
    ] satisfies (string | null)[];
    const parameterNames = ["engine", "adminCap"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'rate_limit',
        function: 'remove',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface SetMaxPerWindowArguments {
    engine: RawTransactionArgument<string>;
    adminCap: RawTransactionArgument<string>;
    maxPerWindow: RawTransactionArgument<number | bigint>;
}
export interface SetMaxPerWindowOptions {
    package?: string;
    arguments: SetMaxPerWindowArguments | [
        engine: RawTransactionArgument<string>,
        adminCap: RawTransactionArgument<string>,
        maxPerWindow: RawTransactionArgument<number | bigint>
    ];
}
/** Update the max signatures per window. */
export function setMaxPerWindow(options: SetMaxPerWindowOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null,
        'u64'
    ] satisfies (string | null)[];
    const parameterNames = ["engine", "adminCap", "maxPerWindow"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'rate_limit',
        function: 'set_max_per_window',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface SetWindowMsArguments {
    engine: RawTransactionArgument<string>;
    adminCap: RawTransactionArgument<string>;
    windowMs: RawTransactionArgument<number | bigint>;
}
export interface SetWindowMsOptions {
    package?: string;
    arguments: SetWindowMsArguments | [
        engine: RawTransactionArgument<string>,
        adminCap: RawTransactionArgument<string>,
        windowMs: RawTransactionArgument<number | bigint>
    ];
}
/** Update the window duration. */
export function setWindowMs(options: SetWindowMsOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null,
        'u64'
    ] satisfies (string | null)[];
    const parameterNames = ["engine", "adminCap", "windowMs"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'rate_limit',
        function: 'set_window_ms',
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
 * Enforce the rate limit and produce a receipt.
 *
 * Resets the counter when the current window has elapsed. Aborts if the limit is
 * exceeded within the current window.
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
        module: 'rate_limit',
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
/** Borrow the rate limit config. */
export function config(options: ConfigOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["engine"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'rate_limit',
        function: 'config',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface MaxPerWindowArguments {
    self: RawTransactionArgument<string>;
}
export interface MaxPerWindowOptions {
    package?: string;
    arguments: MaxPerWindowArguments | [
        self: RawTransactionArgument<string>
    ];
}
/** Max signatures per window. */
export function maxPerWindow(options: MaxPerWindowOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'rate_limit',
        function: 'max_per_window',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface WindowMsArguments {
    self: RawTransactionArgument<string>;
}
export interface WindowMsOptions {
    package?: string;
    arguments: WindowMsArguments | [
        self: RawTransactionArgument<string>
    ];
}
/** Window duration in milliseconds. */
export function windowMs(options: WindowMsOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'rate_limit',
        function: 'window_ms',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface WindowCountArguments {
    self: RawTransactionArgument<string>;
}
export interface WindowCountOptions {
    package?: string;
    arguments: WindowCountArguments | [
        self: RawTransactionArgument<string>
    ];
}
/** Signature count in the current window. */
export function windowCount(options: WindowCountOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'rate_limit',
        function: 'window_count',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface WindowStartMsArguments {
    self: RawTransactionArgument<string>;
}
export interface WindowStartMsOptions {
    package?: string;
    arguments: WindowStartMsArguments | [
        self: RawTransactionArgument<string>
    ];
}
/** Timestamp when the current window started. */
export function windowStartMs(options: WindowStartMsOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'rate_limit',
        function: 'window_start_ms',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}