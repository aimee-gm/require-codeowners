#!/usr/bin/env node

import { checkCodeowners } from "./checkCodeowners";

const args = process.argv.slice(2);

const [pattern] = args;

if (!pattern) {
  console.error(`Usage: require-codeowners <pattern>`);
  process.exit(1);
}

checkCodeowners(pattern);
