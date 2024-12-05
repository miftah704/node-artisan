import path from 'path';
import Command from '../utils/command.utils.js';
import fs from 'fs';
import chalk from 'chalk';
import figures from 'figures';

// Determine the current working directory of the user running the command
const userWorkingDir = process.cwd();
export function makeEnum(name) {
  const parts = name.split('/');
  const enumName = parts.pop();

  // Update folder path to be relative to the user's project directory
  const folderPath = path.join(userWorkingDir, 'src', 'enums', ...parts);
  const fileName = Command.removeSuffixFromName(enumName, 'enum');
  const pascalClassName = Command.toPascalCase(fileName);
  const kebabCaseName = Command.toKebabCase(fileName);

  // Set file path relative to the user's project directory
  const filePath = path.join(folderPath, `${kebabCaseName}.enum.ts`);
  const content = `export enum E${pascalClassName} {
  // var = ''
}`;
  const divider = chalk.gray(figures.line.repeat(60));
  console.log(chalk.bold.blue(`\n${figures.info} [Enum Generator]\n`));
  console.log(chalk.bold(`✨ Summary:`));
  console.log(`${chalk.green(figures.pointerSmall)} Enum Name   : ${chalk.cyan(`E${pascalClassName}`)}`);
  console.log(`${chalk.green(figures.pointerSmall)} File Name   : ${chalk.cyan(`${kebabCaseName}.enum.ts`)}`);
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
  Command.createFile(filePath, content);
  console.log(chalk.green(`${figures.tick} Enum created successfully!`));
  console.log(chalk.cyan(`${figures.pointerSmall} File Location:`), chalk.blue.underline(filePath));
  console.log(divider);
}