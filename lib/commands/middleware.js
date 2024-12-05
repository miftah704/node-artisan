import path from 'path';
import Command from '../utils/command.utils.js';
import fs from 'fs';
import chalk from 'chalk';
import figures from 'figures';

// Use process.cwd() to reference the user's project directory
const userWorkingDir = process.cwd();
export function makeMiddleware(name, functions = []) {
  const parts = name.split('/');
  const middlewareName = parts.pop();

  // Update folder path to be relative to the user's project directory
  const folderPath = path.join(userWorkingDir, 'src', 'middleware', ...parts);
  const fileName = Command.removeSuffixFromName(middlewareName, 'middleware');
  const pascalClassName = Command.toPascalCase(fileName);
  const kebabCaseName = Command.toKebabCase(fileName);
  const filePath = path.join(folderPath, `${kebabCaseName}.middleware.ts`);

  // Create the dynamic route name
  const routeName = `${fileName}Route`;
  const content = `import express from 'express'
const ${routeName} = express()
// Middleware functions can be added here
export default ${routeName}`;
  const divider = chalk.gray(figures.line.repeat(60));
  console.log(chalk.bold.blue(`\n${figures.info} [Middleware Generator]\n`));
  console.log(chalk.bold(`✨ Summary:`));
  console.log(`${chalk.green(figures.pointerSmall)} Class Name  : ${chalk.cyan(pascalClassName)}Route`);
  console.log(`${chalk.green(figures.pointerSmall)} File Name   : ${chalk.cyan(kebabCaseName)}.middleware.ts`);
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
  console.log(chalk.green(`${figures.tick} Middleware created successfully!`));
  console.log(chalk.cyan(`${figures.pointerSmall} File Location:`), chalk.blue.underline(filePath));
  console.log(divider);
}