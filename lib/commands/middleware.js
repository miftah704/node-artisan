import path from 'path';
import Command from '../examples/utils/command.util.js';
import fs from 'fs';
import chalk from 'chalk';
import figures from 'figures';
import LogUtil from '../examples/utils/logger.util.js';

// Get the current working directory of the user
const userWorkingDir = process.cwd();

/**
 * Generates a middleware file with the given name.
 *
 * @param {string} name - The name of the middleware, including any nested folder structure.
 * @param {Array<string>} functions - An array of function names (reserved for future use).
 */
export default function makeMiddleware(name, functions = []) {
  // Parse the middleware name to determine folder and file structure
  const parts = name.split('/');
  const middlewareName = parts.pop(); // Extract the middleware name

  // Construct the folder path where the middleware will be created
  const folderPath = path.join(userWorkingDir, 'src', 'middleware', ...parts);

  // Standardize the file and class names
  const fileName = Command.removeSuffixFromName(middlewareName, 'middleware'); // Remove "middleware" suffix
  const pascalClassName = Command.toPascalCase(fileName); // Convert to PascalCase for class naming
  const kebabCaseName = Command.toKebabCase(fileName); // Convert to kebab-case for file naming

  // Define the full file path for the middleware
  const filePath = path.join(folderPath, `${kebabCaseName}.middleware.ts`);

  // Create the dynamic route name based on the file name
  const routeName = `${fileName}Route`;

  // Prepare the content of the middleware file
  const content = `import express from 'express'
const ${routeName} = express()
// Middleware functions can be added here
export default ${routeName}`;

  // Divider for log output
  const divider = chalk.gray(figures.line.repeat(60));

  // Log the summary of the operation
  LogUtil.logSummary(pascalClassName, kebabCaseName, folderPath, 'middleware');

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