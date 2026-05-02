/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/


/**
 * Allowed algorithms rule — restrict which (signature_algorithm, hash_scheme)
 * pairs an agent can use.
 * 
 * This effectively controls which chains the agent can sign for, since each chain
 * family requires a specific algorithm+hash combination:
 * 
 * | Chain Family | signature_algorithm |  hash_scheme |
 * | ------------ | ------------------: | -----------: |
 * | EVM          |      ECDSASecp256k1 |    KECCAK256 |
 * | Bitcoin      |      ECDSASecp256k1 | DoubleSHA256 |
 * | Solana       |               EdDSA |       SHA512 |
 * | Cosmos       |      ECDSASecp256k1 |       SHA256 |
 * 
 * # Usage
 * 
 * ```move
 * // Admin: only allow EVM signing (ECDSA+Keccak)
 * let pairs = vector[allowed_algorithms::new_pair(1, 3)];
 * allowed_algorithms::add(&mut engine, &admin_cap, pairs);
 * 
 * // Agent: enforce during signing
 * let receipt = allowed_algorithms::enforce(&engine, &request);
 * request.add_receipt(receipt);
 * ```
 */

import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from '../utils/index.js';
import { bcs } from '@mysten/sui/bcs';
import { type Transaction } from '@mysten/sui/transactions';
const $moduleName = '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180::allowed_algorithms';
export const AllowedAlgorithms = new MoveStruct({ name: `${$moduleName}::AllowedAlgorithms`, fields: {
        dummy_field: bcs.bool()
    } });
export const AllowedPair = new MoveStruct({ name: `${$moduleName}::AllowedPair`, fields: {
        signature_algorithm: bcs.u32(),
        hash_scheme: bcs.u32()
    } });
export const AllowedAlgorithmsConfig = new MoveStruct({ name: `${$moduleName}::AllowedAlgorithmsConfig`, fields: {
        /** Allowed (signature_algorithm, hash_scheme) pairs. */
        pairs: bcs.vector(AllowedPair)
    } });
export interface NewPairArguments {
    signatureAlgorithm: RawTransactionArgument<number>;
    hashScheme: RawTransactionArgument<number>;
}
export interface NewPairOptions {
    package?: string;
    arguments: NewPairArguments | [
        signatureAlgorithm: RawTransactionArgument<number>,
        hashScheme: RawTransactionArgument<number>
    ];
}
/** Create an `AllowedPair`. */
export function newPair(options: NewPairOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        'u32',
        'u32'
    ] satisfies (string | null)[];
    const parameterNames = ["signatureAlgorithm", "hashScheme"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'allowed_algorithms',
        function: 'new_pair',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface AddArguments {
    engine: RawTransactionArgument<string>;
    adminCap: RawTransactionArgument<string>;
    pairs: RawTransactionArgument<Array<string>>;
}
export interface AddOptions {
    package?: string;
    arguments: AddArguments | [
        engine: RawTransactionArgument<string>,
        adminCap: RawTransactionArgument<string>,
        pairs: RawTransactionArgument<Array<string>>
    ];
}
/** Register the allowed algorithms rule. */
export function add(options: AddOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null,
        'vector<null>'
    ] satisfies (string | null)[];
    const parameterNames = ["engine", "adminCap", "pairs"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'allowed_algorithms',
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
/** Remove the allowed algorithms rule. */
export function remove(options: RemoveOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null
    ] satisfies (string | null)[];
    const parameterNames = ["engine", "adminCap"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'allowed_algorithms',
        function: 'remove',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface SetPairsArguments {
    engine: RawTransactionArgument<string>;
    adminCap: RawTransactionArgument<string>;
    pairs: RawTransactionArgument<Array<string>>;
}
export interface SetPairsOptions {
    package?: string;
    arguments: SetPairsArguments | [
        engine: RawTransactionArgument<string>,
        adminCap: RawTransactionArgument<string>,
        pairs: RawTransactionArgument<Array<string>>
    ];
}
/** Replace the entire set of allowed pairs. */
export function setPairs(options: SetPairsOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null,
        'vector<null>'
    ] satisfies (string | null)[];
    const parameterNames = ["engine", "adminCap", "pairs"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'allowed_algorithms',
        function: 'set_pairs',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface AddPairArguments {
    engine: RawTransactionArgument<string>;
    adminCap: RawTransactionArgument<string>;
    pair: RawTransactionArgument<string>;
}
export interface AddPairOptions {
    package?: string;
    arguments: AddPairArguments | [
        engine: RawTransactionArgument<string>,
        adminCap: RawTransactionArgument<string>,
        pair: RawTransactionArgument<string>
    ];
}
/** Add a single allowed pair. */
export function addPair(options: AddPairOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null,
        null
    ] satisfies (string | null)[];
    const parameterNames = ["engine", "adminCap", "pair"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'allowed_algorithms',
        function: 'add_pair',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface RemovePairArguments {
    engine: RawTransactionArgument<string>;
    adminCap: RawTransactionArgument<string>;
    pair: RawTransactionArgument<string>;
}
export interface RemovePairOptions {
    package?: string;
    arguments: RemovePairArguments | [
        engine: RawTransactionArgument<string>,
        adminCap: RawTransactionArgument<string>,
        pair: RawTransactionArgument<string>
    ];
}
/** Remove a single allowed pair. */
export function removePair(options: RemovePairOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null,
        null,
        null
    ] satisfies (string | null)[];
    const parameterNames = ["engine", "adminCap", "pair"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'allowed_algorithms',
        function: 'remove_pair',
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
 * Enforce the allowed algorithms rule.
 *
 * Reads the request's `signature_algorithm` and `hash_scheme` and checks them
 * against the allowed pairs. Aborts if the combination is not allowed.
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
        module: 'allowed_algorithms',
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
/** Borrow the config. */
export function config(options: ConfigOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["engine"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'allowed_algorithms',
        function: 'config',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface PairsArguments {
    self: RawTransactionArgument<string>;
}
export interface PairsOptions {
    package?: string;
    arguments: PairsArguments | [
        self: RawTransactionArgument<string>
    ];
}
/** The allowed pairs. */
export function pairs(options: PairsOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'allowed_algorithms',
        function: 'pairs',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface PairSignatureAlgorithmArguments {
    self: RawTransactionArgument<string>;
}
export interface PairSignatureAlgorithmOptions {
    package?: string;
    arguments: PairSignatureAlgorithmArguments | [
        self: RawTransactionArgument<string>
    ];
}
/** Signature algorithm of a pair. */
export function pairSignatureAlgorithm(options: PairSignatureAlgorithmOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'allowed_algorithms',
        function: 'pair_signature_algorithm',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}
export interface PairHashSchemeArguments {
    self: RawTransactionArgument<string>;
}
export interface PairHashSchemeOptions {
    package?: string;
    arguments: PairHashSchemeArguments | [
        self: RawTransactionArgument<string>
    ];
}
/** Hash scheme of a pair. */
export function pairHashScheme(options: PairHashSchemeOptions) {
    const packageAddress = options.package ?? '0x9fd74e7ad831f13730ddb59072978eeb51b1eb840f97238d836b27953be52180';
    const argumentsTypes = [
        null
    ] satisfies (string | null)[];
    const parameterNames = ["self"];
    return (tx: Transaction) => tx.moveCall({
        package: packageAddress,
        module: 'allowed_algorithms',
        function: 'pair_hash_scheme',
        arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
    });
}