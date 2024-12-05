import path from 'path';
import Command from '../utils/command.utils.js';
import fs from 'fs';
import chalk from 'chalk';
import figures from 'figures';

// Use process.cwd() to reference the user's project directory
const userWorkingDir = process.cwd();

export function makeModel(name) {
  const parts = name.split('/');
  const modelName = parts.pop();

  // Update folder path to be relative to the user's project directory
  const folderPath = path.join(userWorkingDir, 'src', 'models', ...parts);
  const fileName = Command.removeSuffixFromName(modelName, 'model');
  const pascalClassName = Command.toPascalCase(fileName);
  const kebabCaseName = Command.toKebabCase(fileName);
  const filePath = path.join(folderPath, `${kebabCaseName}.model.ts`);
  
  const content = `import { Model } from 'sutando'

export default class ${pascalClassName} extends Model {
  // static tableName = ''
  // connection = ''
}`;

  const divider = chalk.gray(figures.line.repeat(60));
  console.log(chalk.bold.blue(`\n${figures.info} [Model Generator]\n`));
  console.log(chalk.bold(`✨ Summary:`));
  console.log(`${chalk.green(figures.pointerSmall)} Model Name   : ${chalk.cyan(`${pascalClassName}`)}`);
  console.log(`${chalk.green(figures.pointerSmall)} File Name   : ${chalk.cyan(`${kebabCaseName}.model.ts`)}`);
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
  console.log(chalk.green(`${figures.tick} Model created successfully!`));
  console.log(chalk.cyan(`${figures.pointerSmall} File Location:`), chalk.blue.underline(filePath));
  console.log(divider);
}
