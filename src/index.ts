#!/usr/bin/env node

import { program } from "commander";
import { checkCodeowners } from "./checkCodeowners";

program
  .command("check <glob>")
  .description("check a glob for having explicit GitHub codeowners")
  .action((glob: string) => checkCodeowners(glob));

program.parse(process.argv);
