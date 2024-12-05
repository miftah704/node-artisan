import path from 'path';
import Command from '../utils/command.utils.js';
import fs from 'fs';
import chalk from 'chalk';
import figures from 'figures';

const userWorkingDir = process.cwd();

export function makeController(name, functions = []) {
  const parts = name.split('/');
  const controllerName = parts.pop();
  
  // Update folder path to be relative to the user's project directory
  const folderPath = path.join(userWorkingDir, 'src', 'controllers', ...parts);
  const fileName = Command.removeSuffixFromName(controllerName, 'controller');
  const pascalClassName = Command.toPascalCase(fileName);
  const kebabCaseName = Command.toKebabCase(fileName);
  
  // Set file path relative to the user's project directory
  const filePath = path.join(folderPath, `${kebabCaseName}.controller.ts`);
  const classFunctions = Command.generateFunctions(functions, fileName);

  const content = `import { NextFunction, Request, Response } from 'express'
export default class ${pascalClassName}Controller {
  ${classFunctions}
}`;

  const divider = chalk.gray(figures.line.repeat(60));
  console.log(chalk.bold.blue(`\n${figures.info} [Controller Generator]\n`));
  console.log(chalk.bold(`✨ Summary:`));
  console.log(`${chalk.green(figures.pointerSmall)} Class Name  : ${chalk.cyan(pascalClassName)}Controller`);
  console.log(`${chalk.green(figures.pointerSmall)} File Name   : ${chalk.cyan(kebabCaseName)}.controller.ts`);
  console.log(`${chalk.green(figures.pointerSmall)} Folder Path : ${chalk.cyan(folderPath)}`);
  console.log(divider);

  // Handle folder creation
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, {
      recursive: true
    });
    console.log(chalk.green(`${figures.tick} Folder created:`), chalk.blue.bold(folderPath));
  } else {
    console.log(chalk.yellow(`${figures.warning} Folder already exists:`), chalk.gray(folderPath));
  }

  // Handle file existence
  if (fs.existsSync(filePath)) {
    console.log(chalk.red(`${figures.cross} File already exists:`), chalk.red.underline(filePath));
    console.log(divider);
    return;
  }

  // Create the file
  fs.writeFileSync(filePath, content);
  console.log(chalk.green(`${figures.tick} Controller created successfully!`));
  console.log(chalk.cyan(`${figures.pointerSmall} File Location:`), chalk.blue.underline(filePath));

  // Add function feedback
  console.log(chalk.magenta(`${figures.star} Functions:`), functions.length > 0 ? chalk.white(functions.map(fn => chalk.cyan.bold(fn)).join(', ')) : chalk.gray('No functions specified'));
  console.log(divider);
}
