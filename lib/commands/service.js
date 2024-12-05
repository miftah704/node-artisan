import path from 'path';
import Command from '../utils/command.utils.js';
import fs from 'fs';
import chalk from 'chalk';
import figures from 'figures';

// Use process.cwd() to reference the user's project directory
const userWorkingDir = process.cwd();
export function makeService(name, functions = []) {
  const parts = name.split('/');
  const serviceName = parts.pop();

  // Update folder path to be relative to the user's project directory
  const folderPath = path.join(userWorkingDir, 'src', 'services', ...parts);
  const fileName = Command.removeSuffixFromName(serviceName, 'service');
  const kebabCaseName = Command.toKebabCase(fileName);
  const filePath = path.join(folderPath, `${kebabCaseName}.service.ts`);
  const classFunctions = Command.generateFunctions(functions, fileName);
  const content = `export default class ${fileName}Service {
${classFunctions}
}`;
  const divider = chalk.gray(figures.line.repeat(60));
  console.log(chalk.bold.blue(`\n${figures.info} [Service Generator]\n`));
  console.log(chalk.bold(`✨ Summary:`));
  console.log(`${chalk.green(figures.pointerSmall)} Service Name  : ${chalk.cyan(`${fileName}`)}`);
  console.log(`${chalk.green(figures.pointerSmall)} File Name     : ${chalk.cyan(`${kebabCaseName}.service.ts`)}`);
  console.log(`${chalk.green(figures.pointerSmall)} Folder Path   : ${chalk.cyan(folderPath)}`);
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
  console.log(chalk.green(`${figures.tick} Service created successfully!`));
  console.log(chalk.cyan(`${figures.pointerSmall} File Location:`), chalk.blue.underline(filePath));
  console.log(divider);
}