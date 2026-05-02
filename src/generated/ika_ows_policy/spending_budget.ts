/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/


/**
 * Spending budget rule — cumulative spending cap per time window.
 * 
 * The agent declares the value of each signing request. The contract enforces a
 * per-window cumulative budget and a per-transaction cap. The agent cannot exceed
 * the budget without lying — and if it lies, the declared value + signed message
 * are both on-chain as evidence.
 * 
 * This is a trust-minimized approach: the agent is already trusted to construct
 * valid transactions, so it's accountable for its declarations. The spending rule
 * creates a budget envelope the agent operates within.
 * 
 * # Usage
 * 
 * ```move
 * // Admin: max 1000 units per hour, max 100 per tx
 * spending_budget::add(&mut engine, &admin_cap, 1000, 100, 3_600_000, &clock);
 * 
 * // Agent: enforce with declared value
 * let receipt = spending_budget::enforce(&mut engine, &request, 50, &clock);
 * request.add_receipt(receipt);
 * ```
 */

import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
const $moduleName = '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180::spending_budget';
export const SpendingBudget = new MoveStruct({ name: `${$moduleName}::SpendingBudget`, fields: {
        dummy_field: bcs.bool()
    } });
export const SpendingBudgetConfig = new MoveStruct({ name: `${$moduleName}::SpendingBudgetConfig`, fields: {
        /**
           * Max cumulative value per window (in abstract units — USD cents, wei, sats,
           * etc.). The admin and agent agree on the unit off-chain.
           */
        max_per_window: bcs.u64(),
        /** Max value per single transaction. 0 = no per-tx limit (only window cap applies). */
        max_per_tx: bcs.u64(),
        /** Window duration in milliseconds. */
        window_ms: bcs.u64(),
        /** Cumulative value spent in the current window. */
        window_spent: bcs.u64(),
        /** Timestamp (ms) when the current window started. */
        window_start_ms: bcs.u64()
    } });
export const SpendingDeclaration = new MoveStruct({ name: `${$moduleName}::SpendingDeclaration`, fields: {
        /** Engine this declaration belongs to. */
        engine_id: bcs.Address,
        /** Declared value of this transaction. */
        declared_value: bcs.u64(),
        /** Cumulative spending after this transaction. */
        cumulative_spent: bcs.u64(),
        /** Timestamp of the declaration. */
        timestamp_ms: bcs.u64()
    } });
export interface AddArguments {
    engine: RawTransactionArgument<string>;
    adminCap: RawTransactionArgument<string>;
    maxPerWindow: RawTransactionArgument<number | bigint>;
    maxPerTx: RawTransactionArgument<number | bigint>;
    windowMs: RawTransactionArgument<number | bigint>;
}
export interface AddOptions {
    package?: string;
    arguments: AddArguments | [
        engine: RawTransactionArgument<string>,
        adminCap: RawTransactionArgument<string>,
        maxPerWindow: RawTransactionArgument<number | bigint>,
        maxPerTx: RawTransactionArgument<number | bigint>,
        windowMs: RawTransactionArgument<number | bigint>
    ];
}
/** Register the spending budget rule. */
export function add(options: AddOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null,
        'u64',
        'u64',
        'u64',
        '0x2::clock::Clock'
    ] satisfies (string | null)[];
    const parameterNames = ["engine", "adminCap", "maxPerWindow", "maxPerTx", "windowMs"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'spending_budget',
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
/** Remove the spending budget rule. */
export function remove(options: RemoveOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null
    ] satisfies (string | null)[];
    const parameterNames = ["engine", "adminCap"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'spending_budget',
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
/** Update the per-window budget. */
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
        module: 'spending_budget',
        function: 'set_max_per_window',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface SetMaxPerTxArguments {
    engine: RawTransactionArgument<string>;
    adminCap: RawTransactionArgument<string>;
    maxPerTx: RawTransactionArgument<number | bigint>;
}
export interface SetMaxPerTxOptions {
    package?: string;
    arguments: SetMaxPerTxArguments | [
        engine: RawTransactionArgument<string>,
        adminCap: RawTransactionArgument<string>,
        maxPerTx: RawTransactionArgument<number | bigint>
    ];
}
/** Update the per-transaction cap. */
export function setMaxPerTx(options: SetMaxPerTxOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null,
        'u64'
    ] satisfies (string | null)[];
    const parameterNames = ["engine", "adminCap", "maxPerTx"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'spending_budget',
        function: 'set_max_per_tx',
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
        module: 'spending_budget',
        function: 'set_window_ms',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface EnforceArguments {
    engine: RawTransactionArgument<string>;
    request: RawTransactionArgument<string>;
    declaredValue: RawTransactionArgument<number | bigint>;
}
export interface EnforceOptions {
    package?: string;
    arguments: EnforceArguments | [
        engine: RawTransactionArgument<string>,
        request: RawTransactionArgument<string>,
        declaredValue: RawTransactionArgument<number | bigint>
    ];
}
/**
 * Enforce the spending budget and produce a receipt.
 *
 * The agent declares the value of this transaction. The contract checks:
 *
 * 1.  `declared_value > 0`
 * 2.  `declared_value <= max_per_tx` (if max_per_tx > 0)
 * 3.  `window_spent + declared_value <= max_per_window`
 *
 * Emits a `SpendingDeclaration` event for on-chain accountability.
 */
export function enforce(options: EnforceOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null,
        'u64',
        '0x2::clock::Clock'
    ] satisfies (string | null)[];
    const parameterNames = ["engine", "request", "declaredValue"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'spending_budget',
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
/** Borrow the spending budget config. */
export function config(options: ConfigOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["engine"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'spending_budget',
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
/** Max cumulative value per window. */
export function maxPerWindow(options: MaxPerWindowOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'spending_budget',
        function: 'max_per_window',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface MaxPerTxArguments {
    self: RawTransactionArgument<string>;
}
export interface MaxPerTxOptions {
    package?: string;
    arguments: MaxPerTxArguments | [
        self: RawTransactionArgument<string>
    ];
}
/** Max value per transaction. */
export function maxPerTx(options: MaxPerTxOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'spending_budget',
        function: 'max_per_tx',
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
        module: 'spending_budget',
        function: 'window_ms',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface WindowSpentArguments {
    self: RawTransactionArgument<string>;
}
export interface WindowSpentOptions {
    package?: string;
    arguments: WindowSpentArguments | [
        self: RawTransactionArgument<string>
    ];
}
/** Cumulative value spent in the current window. */
export function windowSpent(options: WindowSpentOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'spending_budget',
        function: 'window_spent',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface RemainingArguments {
    self: RawTransactionArgument<string>;
}
export interface RemainingOptions {
    package?: string;
    arguments: RemainingArguments | [
        self: RawTransactionArgument<string>
    ];
}
/** Remaining budget in the current window. */
export function remaining(options: RemainingOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'spending_budget',
        function: 'remaining',
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
        module: 'spending_budget',
        function: 'window_start_ms',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}