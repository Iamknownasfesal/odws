#!/usr/bin/env node
import { build } from 'esbuild';
import { promises as fs, existsSync } from 'node:fs';
import * as path from 'node:path';
import { exec as execCb } from 'node:child_process';
import { promisify } from 'node:util';

const exec = promisify(execCb);
const cwd = process.cwd();
const ignorePatterns = [/\.test\.ts$/, /\.graphql$/];

async function findAllFiles(dir, files = []) {
	for (const entry of await fs.readdir(dir)) {
		const full = path.join(dir, entry);
		const stat = await fs.stat(full);
		if (stat.isDirectory()) {
			await findAllFiles(full, files);
		} else if (!ignorePatterns.some((re) => re.test(full))) {
			files.push(full);
		}
	}
	return files;
}

async function emptyDir(p) {
	if (existsSync(p)) await fs.rm(p, { recursive: true, force: true, maxRetries: 5 });
	await fs.mkdir(p, { recursive: true });
}

const entryPoints = await findAllFiles(path.join(cwd, 'src'));
const pkg = JSON.parse(await fs.readFile(path.join(cwd, 'package.json'), 'utf-8'));

await emptyDir(path.join(cwd, 'dist'));

await Promise.all([
	build({
		format: 'cjs',
		logLevel: 'error',
		target: 'es2020',
		entryPoints,
		outdir: 'dist/cjs',
		outbase: 'src',
		sourcemap: true,
	}),
	exec('pnpm tsc --project tsconfig.json'),
]);
await fs.writeFile(
	path.join(cwd, 'dist/cjs/package.json'),
	JSON.stringify({ private: true, type: 'commonjs', sideEffects: pkg.sideEffects ?? undefined }, null, 2),
);

await build({
	format: 'esm',
	logLevel: 'error',
	target: 'es2020',
	entryPoints,
	outdir: 'dist/esm',
	outbase: 'src',
	sourcemap: true,
});
await exec('pnpm tsc --project tsconfig.esm.json');
await fs.writeFile(
	path.join(cwd, 'dist/esm/package.json'),
	JSON.stringify({ private: true, type: 'module', sideEffects: pkg.sideEffects ?? undefined }, null, 2),
);

const cliCjs = path.join(cwd, 'dist/cjs/cli/index.js');
const cliEsm = path.join(cwd, 'dist/esm/cli/index.js');
for (const f of [cliCjs, cliEsm]) {
	if (existsSync(f)) await fs.chmod(f, 0o755);
}
