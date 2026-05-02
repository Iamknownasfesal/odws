/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/


/**
 * Time delay rule — commit-reveal with owner review window.
 * 
 * For high-value operations where the wallet owner wants a veto window. The agent
 * commits the message hash first, waits a configurable delay (in milliseconds),
 * then reveals and signs. During the delay, the owner can pause the engine or
 * revoke the specific commitment.
 * 
 * This is the most trust-minimized spending control — no oracle, no value
 * declaration, just a time window for the owner to review and intervene.
 * 
 * # Flow
 * 
 * 1.  Agent calls `commit(engine, access_cap, message_hash, clock)`
 * 2.  Agent waits `delay_ms` milliseconds
 * 3.  Agent calls `enforce(engine, request, clock)` → verifies delay has passed
 *     and message matches commitment → produces receipt
 * 
 * During the delay, the owner can:
 * 
 * - `engine.pause(admin_cap)` — block all signatures
 * - `revoke_commitment(engine, admin_cap, message_hash)` — cancel one
 * 
 * # Usage
 * 
 * ```move
 * // Admin: register with 1-hour delay (3_600_000 ms)
 * time_delay::add(&mut engine, &admin_cap, 3_600_000, ctx);
 * 
 * // Agent: commit
 * time_delay::commit(&mut engine, &access_cap, message_hash, &clock);
 * 
 * // Agent (1 hour later): enforce
 * let receipt = time_delay::enforce(&mut engine, &request, &clock);
 * request.add_receipt(receipt);
 * ```
 */

import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
import * as table from './deps/sui/table.js';
const $moduleName = '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180::time_delay';
export const TimeDelay = new MoveStruct({ name: `${$moduleName}::TimeDelay`, fields: {
        dummy_field: bcs.bool()
    } });
export const TimeDelayConfig = new MoveStruct({ name: `${$moduleName}::TimeDelayConfig`, fields: {
        /** Delay duration in milliseconds between commit and reveal. */
        delay_ms: bcs.u64(),
        /** Pending commitments: message_hash → commit timestamp (ms). */
        commitments: table.Table
    } });
export const CommitmentCreated = new MoveStruct({ name: `${$moduleName}::CommitmentCreated`, fields: {
        engine_id: bcs.Address,
        message_hash: bcs.vector(bcs.u8()),
        commit_ms: bcs.u64(),
        release_ms: bcs.u64()
    } });
export const CommitmentConsumed = new MoveStruct({ name: `${$moduleName}::CommitmentConsumed`, fields: {
        engine_id: bcs.Address,
        message_hash: bcs.vector(bcs.u8()),
        consumed_ms: bcs.u64()
    } });
export const CommitmentRevoked = new MoveStruct({ name: `${$moduleName}::CommitmentRevoked`, fields: {
        engine_id: bcs.Address,
        message_hash: bcs.vector(bcs.u8()),
        revoked_ms: bcs.u64()
    } });
export interface AddArguments {
    engine: RawTransactionArgument<string>;
    adminCap: RawTransactionArgument<string>;
    delayMs: RawTransactionArgument<number | bigint>;
}
export interface AddOptions {
    package?: string;
    arguments: AddArguments | [
        engine: RawTransactionArgument<string>,
        adminCap: RawTransactionArgument<string>,
        delayMs: RawTransactionArgument<number | bigint>
    ];
}
/** Register the time delay rule. */
export function add(options: AddOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null,
        'u64'
    ] satisfies (string | null)[];
    const parameterNames = ["engine", "adminCap", "delayMs"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'time_delay',
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
/**
 * Remove the time delay rule.
 *
 * The commitments table must be empty (all commitments consumed or revoked).
 */
export function remove(options: RemoveOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null
    ] satisfies (string | null)[];
    const parameterNames = ["engine", "adminCap"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'time_delay',
        function: 'remove',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface SetDelayMsArguments {
    engine: RawTransactionArgument<string>;
    adminCap: RawTransactionArgument<string>;
    delayMs: RawTransactionArgument<number | bigint>;
}
export interface SetDelayMsOptions {
    package?: string;
    arguments: SetDelayMsArguments | [
        engine: RawTransactionArgument<string>,
        adminCap: RawTransactionArgument<string>,
        delayMs: RawTransactionArgument<number | bigint>
    ];
}
/** Update the delay duration. Only affects future commitments. */
export function setDelayMs(options: SetDelayMsOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null,
        'u64'
    ] satisfies (string | null)[];
    const parameterNames = ["engine", "adminCap", "delayMs"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'time_delay',
        function: 'set_delay_ms',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface RevokeCommitmentArguments {
    engine: RawTransactionArgument<string>;
    adminCap: RawTransactionArgument<string>;
    messageHash: RawTransactionArgument<Array<number>>;
}
export interface RevokeCommitmentOptions {
    package?: string;
    arguments: RevokeCommitmentArguments | [
        engine: RawTransactionArgument<string>,
        adminCap: RawTransactionArgument<string>,
        messageHash: RawTransactionArgument<Array<number>>
    ];
}
/**
 * Revoke a specific commitment. The agent will not be able to sign this message
 * even after the delay.
 */
export function revokeCommitment(options: RevokeCommitmentOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null,
        'vector<u8>',
        '0x2::clock::Clock'
    ] satisfies (string | null)[];
    const parameterNames = ["engine", "adminCap", "messageHash"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'time_delay',
        function: 'revoke_commitment',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface CommitArguments {
    engine: RawTransactionArgument<string>;
    accessCap: RawTransactionArgument<string>;
    messageHash: RawTransactionArgument<Array<number>>;
}
export interface CommitOptions {
    package?: string;
    arguments: CommitArguments | [
        engine: RawTransactionArgument<string>,
        accessCap: RawTransactionArgument<string>,
        messageHash: RawTransactionArgument<Array<number>>
    ];
}
/**
 * Commit a message hash. The agent must wait `delay_ms` before it can produce a
 * receipt for this message.
 *
 * The `message_hash` should be `blake2b256(message)` — the agent computes this
 * off-chain before committing.
 */
export function commit(options: CommitOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null,
        'vector<u8>',
        '0x2::clock::Clock'
    ] satisfies (string | null)[];
    const parameterNames = ["engine", "accessCap", "messageHash"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'time_delay',
        function: 'commit',
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
 * Enforce the time delay rule.
 *
 * Verifies:
 *
 * 1.  A commitment exists for the blake2b256 hash of the request message.
 * 2.  At least `delay_ms` milliseconds have passed since the commitment.
 *
 * Consumes the commitment (single-use).
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
        module: 'time_delay',
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
/** Borrow the time delay config. */
export function config(options: ConfigOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["engine"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'time_delay',
        function: 'config',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface DelayMsArguments {
    self: RawTransactionArgument<string>;
}
export interface DelayMsOptions {
    package?: string;
    arguments: DelayMsArguments | [
        self: RawTransactionArgument<string>
    ];
}
/** The delay duration in milliseconds. */
export function delayMs(options: DelayMsOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'time_delay',
        function: 'delay_ms',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface HasCommitmentArguments {
    self: RawTransactionArgument<string>;
    messageHash: RawTransactionArgument<Array<number>>;
}
export interface HasCommitmentOptions {
    package?: string;
    arguments: HasCommitmentArguments | [
        self: RawTransactionArgument<string>,
        messageHash: RawTransactionArgument<Array<number>>
    ];
}
/** Whether a commitment exists for a message hash. */
export function hasCommitment(options: HasCommitmentOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        'vector<u8>'
    ] satisfies (string | null)[];
    const parameterNames = ["self", "messageHash"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'time_delay',
        function: 'has_commitment',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface CommitmentMsArguments {
    self: RawTransactionArgument<string>;
    messageHash: RawTransactionArgument<Array<number>>;
}
export interface CommitmentMsOptions {
    package?: string;
    arguments: CommitmentMsArguments | [
        self: RawTransactionArgument<string>,
        messageHash: RawTransactionArgument<Array<number>>
    ];
}
/** The timestamp (ms) a commitment was made (aborts if not found). */
export function commitmentMs(options: CommitmentMsOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        'vector<u8>'
    ] satisfies (string | null)[];
    const parameterNames = ["self", "messageHash"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'time_delay',
        function: 'commitment_ms',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}