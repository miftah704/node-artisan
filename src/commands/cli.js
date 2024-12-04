#!/usr/bin/env node

import { Command } from 'commander'
import { makeController } from './controller.js'
import { makeModel } from './model.js'
import { makeTransformer } from './transformer.js'
import { makeService } from './service.js'
import { makeRepository } from './repository.js'
import { makeEnum } from './enum.js'
import chalk from 'chalk'
import figures from 'figures'
import { table } from 'table'
import { makeMiddleware } from './middleware.js'

const program = new Command()

program
  .command('list')
  .description('List all available artisan commands')
  .action(() => {
    console.log(chalk.cyan(figures.info), chalk.bold('[Available Commands]'));
    console.log();

    const data = program.commands.map(cmd => [
      chalk.bold.yellow(cmd.name()),
      chalk.whiteBright(cmd.description())
    ]);

    const config = {
      columns: {
        0: { alignment: 'left', wrapWord: true },
        1: { alignment: 'left', wrapWord: true }
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
      drawHorizontalLine: (index, size) => {
        return index === 0 || index === 1 || index === size;
      }
    };

    const output = table([[chalk.bold('Command'), chalk.bold('Description')], ...data], config);
    console.log(output);
  });

program
  .command('make:controller <name> [functions...]')
  .description('Create a new controller in src/controllers directory')
  .action((name, functions = []) => makeController(name, functions))

program
  .command('make:enum <name> [functions...]')
  .description('Create a new enum in src/enums directory')
  .action((name, functions = []) => makeEnum(name, functions))

program
  .command('make:middleware <name> [functions...]')
  .description('Create a new middleware in src/middleware directory')
  .action((name, functions = []) => makeMiddleware(name, functions))

program
  .command('make:model <name>')
  .description('Create a new model in src/models directory')
  .action((name) => makeModel(name))

program
  .command('make:transformer <name>')
  .description('Create a new transformer in src/transformers directory')
  .action((name) => makeTransformer(name))

program
  .command('make:service <name> [functions...]')
  .description('Create a new service in src/services directory')
  .action((name, functions = []) => makeService(name, functions))

program
  .command('make:repository <name> [functions...]')
  .description('Create a new repository in src/repositories directory')
  .action((name, functions = []) => makeRepository(name, functions))


program.parse(process.argv)
