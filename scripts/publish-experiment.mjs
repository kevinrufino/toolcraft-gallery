#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { cp, mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const [sourceArg, slug, ...flags] = process.argv.slice(2);

function fail(message) {
  console.error(message);
  process.exit(1);
}

function readFlag(name) {
  const index = flags.indexOf(`--${name}`);
  return index >= 0 ? flags[index + 1] : undefined;
}

if (!sourceArg || !slug) {
  fail('Usage: npm run publish:experiment -- <source-dir> <slug> --title "Title" --category "Motion / Canvas" --description "One sentence." --source "https://github.com/..." --accent "#2145ff"');
}

if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) fail('Slug must contain lowercase letters, numbers, and single hyphens only.');

const sourceDir = resolve(sourceArg);
const viteBin = join(sourceDir, 'node_modules', '.bin', 'vite');
const distDir = join(sourceDir, 'dist');
const targetDir = join(repoRoot, 'public', 'experiments', slug);
const flatEntry = join(repoRoot, 'public', 'experiments', `${slug}.html`);
const catalogPath = join(repoRoot, 'data', 'experiments.json');

await stat(viteBin).catch(() => fail(`No local Vite binary found in ${sourceDir}. Install the experiment dependencies first.`));

const build = spawnSync(viteBin, ['build', `--base=/experiments/${slug}/`], {
  cwd: sourceDir,
  stdio: 'inherit',
});

if (build.status !== 0) fail(`The ${slug} build failed.`);

await rm(targetDir, { recursive: true, force: true });
await mkdir(targetDir, { recursive: true });
await cp(distDir, targetDir, { recursive: true });
await cp(join(distDir, 'index.html'), flatEntry);

const catalog = JSON.parse(await readFile(catalogPath, 'utf8'));
const existing = catalog.find((experiment) => experiment.id === slug);
const record = {
  id: slug,
  title: readFlag('title') ?? existing?.title ?? slug.replaceAll('-', ' '),
  category: readFlag('category') ?? existing?.category ?? 'Experiment',
  description: readFlag('description') ?? existing?.description ?? 'An interactive Toolcraft exploration.',
  path: `/experiments/${slug}.html`,
  source: readFlag('source') ?? existing?.source ?? '',
  accent: readFlag('accent') ?? existing?.accent ?? '#2145ff',
};

const nextCatalog = existing
  ? catalog.map((experiment) => experiment.id === slug ? record : experiment)
  : [...catalog, record];

await writeFile(catalogPath, `${JSON.stringify(nextCatalog, null, 2)}\n`);
console.log(`Published ${record.title} to the gallery.`);
