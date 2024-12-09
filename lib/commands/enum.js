import path from 'path';
import Command from '../utils/command.util.js';
import fs from 'fs';
import chalk from 'chalk';
import figures from 'figures';
import LogUtil from '../utils/logger.util.js';

// Get the current working directory of the user
const userWorkingDir = process.cwd();

/**
 * Generates an enum file with the given name.
 *
 * @param {string} name - The name of the enum, including any nested folder structure.
 */
export default function makeEnum(name) {
  // Parse the enum name to determine folder and file structure
  const parts = name.split('/');
  const enumName = parts.pop(); // Extract the enum name

  // Construct the folder path where the enum will be created
  const folderPath = path.join(userWorkingDir, 'src', 'enums', ...parts);

  // Standardize the file and class names
  const fileName = Command.removeSuffixFromName(enumName, 'enum'); // Remove "enum" suffix
  const pascalClassName = Command.toPascalCase(fileName); // Convert to PascalCase for class naming
  const kebabCaseName = Command.toKebabCase(fileName); // Convert to kebab-case for file naming

  // Define the full file path for the enum
  const filePath = path.join(folderPath, `${kebabCaseName}.enum.ts`);

  // Prepare the content of the enum file
  const content = `export enum E${pascalClassName} {
  // var = ''
}`;

  // Divider for log output
  const divider = chalk.gray(figures.line.repeat(60));

  // Log the summary of the operation
  LogUtil.logSummary(pascalClassName, kebabCaseName, folderPath, 'enum');

  // Handle folder creation
  const folderExists = fs.existsSync(folderPath); // Check if the folder exists
  if (!folderExists) {
    fs.mkdirSync(folderPath, {
      recursive: true
    }); // Create folder if it does not exist
  }
  LogUtil.logFolderCreation(folderPath, !folderExists);

  // Handle file existence
  if (fs.existsSync(filePath)) {
    // If the file already exists, log an error and exit
    console.log(chalk.red(`${figures.cross} File already exists:`), chalk.red.underline(filePath));
    console.log(divider);
    return;
  }

  // Create the file with the generated content
  fs.writeFileSync(filePath, content);
  LogUtil.logHelperCreationSuccess(filePath);
}