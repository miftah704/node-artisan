#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';
import figures from 'figures';
import { table } from 'table';
import { Command } from 'commander';
import makeController from './commands/controller.js';
import makeModel from './commands/model.js';
import makeTransformer from './commands/transformer.js';
import makeService from './commands/service.js';
import makeRepository from './commands/repository.js';
import makeEnum from './commands/enum.js';
import makeMiddleware from './commands/middleware.js';
import makeType from './commands/type.js';
import makeUtil from './commands/util.js';
import makeHelper from './commands/helper.js';
import makeValidator from './commands/validator.js';
const program = new Command();

/**
 * Command: init
 * Description: Initialize Artisan in the project root directory
 */
program.command('init').description('Initialize Artisan in the project root directory').action(() => {
  const projectRoot = process.cwd();
  const artisanFilePath = path.join(projectRoot, 'artisan.js');
  const artisanContent = `#!/usr/bin/env node

// Automatically resolve the path to the artisan CLI file
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const cliModule = async () => await import(require.resolve('nodejs-artisan/lib/cli.js'));
cliModule();
`;

  // Create 'artisan.js' file if it doesn't exist
  if (!fs.existsSync(artisanFilePath)) {
    fs.writeFileSync(artisanFilePath, artisanContent);
    fs.chmodSync(artisanFilePath, '755');
    console.log(chalk.green(`${figures.tick} Artisan initialized successfully!`));
  } else {
    console.log(chalk.yellow(`${figures.warning} 'artisan.js' file already exists in the project root.`));
  }

  // Update package.json to include 'bin' entry
  const packageJsonPath = path.join(projectRoot, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    try {
      const packageJsonContent = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

      // Add bin entry if it doesn't exist
      if (!packageJsonContent.bin) {
        packageJsonContent.bin = {};
      }
      packageJsonContent.bin['artisan'] = './artisan.js';

      // Write updated package.json back to disk
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJsonContent, null, 2));
      console.log(chalk.green(`${figures.tick} 'bin' entry added to package.json successfully!`));
    } catch (error) {
      console.error(chalk.red(`${figures.cross} Failed to update package.json: ${error.message}`));
    }
  } else {
    console.log(chalk.red(`${figures.cross} package.json not found in the project root directory.`));
  }
});

/**
 * Command: list
 * Description: List all available artisan commands
 */
program.command('list').description('List all available artisan commands').action(() => {
  console.log(chalk.cyan(figures.info), chalk.bold('[Available Commands]'));
  console.log();

  // Format commands as a table
  const data = program.commands.map(cmd => [chalk.bold.yellow(cmd.name()), chalk.whiteBright(cmd.description())]);
  const config = {
    columns: {
      0: {
        alignment: 'left',
        wrapWord: true
      },
      1: {
        alignment: 'left',
        wrapWord: true
      }
    },
    border: {
      topBody: chalk.gray('─'),
      topJoin: chalk.gray('┬'),
      topLeft: chalk.gray('┌'),
      topRight: chalk.gray('┐'),
      bottomBody: chalk.gray('─'),
      bottomJoin: chalk.gray('┴'),
      bottomLeft: chalk.gray('└'),
      bottomRight: chalk.gray('┘'),
      bodyLeft: chalk.gray('│'),
      bodyRight: chalk.gray('│'),
      bodyJoin: chalk.gray('│'),
      joinBody: chalk.gray('─'),
      joinLeft: chalk.gray('├'),
      joinRight: chalk.gray('┤'),
      joinJoin: chalk.gray('┼')
    },
    drawHorizontalLine: (index, size) => index === 0 || index === 1 || index === size
  };
  const output = table([[chalk.bold('Command'), chalk.bold('Description')], ...data], config);
  console.log(output);
});

// Define various make commands
program.command('make:controller <name> [functions...]').description('Create a new controller in src/controllers directory').action((name, functions = []) => makeController(name, functions));
program.command('make:enum <name> [functions...]').description('Create a new enum in src/enums directory').action((name, functions = []) => makeEnum(name, functions));
program.command('make:middleware <name> [functions...]').description('Create a new middleware in src/middleware directory').action((name, functions = []) => makeMiddleware(name, functions));
program.command('make:model <name>').description('Create a new model in src/models directory').action(name => makeModel(name));
program.command('make:transformer <name>').description('Create a new transformer in src/transformers directory').action(name => makeTransformer(name));
program.command('make:service <name> [functions...]').description('Create a new service in src/services directory').action((name, functions = []) => makeService(name, functions));
program.command('make:repository <name> [functions...]').description('Create a new repository in src/repositories directory').action((name, functions = []) => makeRepository(name, functions));
program.command('make:type <name>').description('Create a new type in src/types directory').action(name => makeType(name));
program.command('make:util <name> [functions...]').description('Create a new util in src/utils directory').action((name, functions = []) => makeUtil(name, functions));
program.command('make:helper <name> [functions...]').description('Create a new helper in src/helpers directory').action((name, functions = []) => makeHelper(name, functions));
program.command('make:validator <name>').description('Create a new validator in src/validators directory').action(name => makeValidator(name));

// Parse and execute commands
program.parse(process.argv);