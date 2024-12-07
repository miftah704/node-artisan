import path from 'path';
import Command from '../utils/command.util.js';
import fs from 'fs';
import chalk from 'chalk';
import figures from 'figures';
import LogUtil from '../utils/logger.util.js';

// Get the current working directory of the user
const userWorkingDir = process.cwd();

/**
 * Generates a utility file with the given name and optional functions.
 *
 * @param {string} name - The name of the utility, including any nested folder structure.
 * @param {Array<string>} functions - An array of function names to include in the utility class.
 */
export default function makeUtil(name, functions = []) {
  // Parse the utility name to determine folder and file structure
  const parts = name.split('/');
  const utilName = parts.pop(); // Extract the utility name

  // Construct the folder path where the utility will be created
  const folderPath = path.join(userWorkingDir, 'src', 'utils', ...parts);

  // Standardize the file and class names
  const fileName = Command.removeSuffixFromName(utilName, 'util'); // Remove "util" suffix
  const kebabCaseName = Command.toKebabCase(fileName); // Convert to kebab-case for file naming
  const pascalClassName = Command.toPascalCase(fileName); // Convert to PascalCase for class naming

  // Define the full file path for the utility
  const filePath = path.join(folderPath, `${kebabCaseName}.util.ts`);

  // Generate utility class functions using the provided function names
  const classFunctions = Command.generateUtilFunctions(functions, fileName);

  // Prepare the content of the utility file
  const content = `export default class ${pascalClassName}Service {
${classFunctions}
}`;

  // Divider for log output
  const divider = chalk.gray(figures.line.repeat(60));

  // Log the summary of the operation
  LogUtil.logSummary(pascalClassName, kebabCaseName, folderPath, 'util');

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
  LogUtil.logHelperCreationSuccess(filePath, functions);
}