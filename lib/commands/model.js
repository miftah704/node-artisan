import path from 'path';
import Command from '../utils/command.util.js';
import fs from 'fs';
import chalk from 'chalk';
import figures from 'figures';
import LogUtil from '../utils/logger.util.js';
import makeController from './controller.js';
import makeRepository from './repository.js';
import makeService from './service.js';

// Get the current working directory of the user
const userWorkingDir = process.cwd();

/**
 * Generates a model file with the given name.
 *
 * @param {string} name - The name of the model, including any nested folder structure.
 * @param {Object} options - Additional options for generating related files.
 * @param {boolean} [options.controller=false] - Whether to generate a corresponding controller.
 * @param {boolean} [options.service=false] - Whether to generate a corresponding service.
 * @param {boolean} [options.repository=false] - Whether to generate a corresponding repository.
 */
export default function makeModel(name, options = {}) {
  // Parse the model name to determine folder and file structure
  const parts = name.split('/');
  const modelName = parts.pop(); // Extract the model name

  // Construct the folder path where the model will be created
  const folderPath = path.join(userWorkingDir, 'src', 'models', ...parts);

  // Standardize the file and class names
  const fileName = Command.removeSuffixFromName(modelName, 'model'); // Remove "model" suffix
  const pascalClassName = Command.toPascalCase(fileName); // Convert to PascalCase for class naming
  const kebabCaseName = Command.toKebabCase(fileName); // Convert to kebab-case for file naming

  // Define the full file path for the model
  const filePath = path.join(folderPath, `${kebabCaseName}.model.ts`);

  // Prepare the content of the model file
  const content = `import { Model } from 'sutando'

export default class ${pascalClassName} extends Model {
  // static tableName = ''
  // connection = ''
}`;

  // Divider for log output
  const divider = chalk.gray(figures.line.repeat(60));

  // Log the summary of the operation
  LogUtil.logSummary(pascalClassName, kebabCaseName, folderPath, 'model');

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

  // Generate additional files based on options
  if (options.controller) {
    console.log(chalk.italic(chalk.dim(`${figures.info} Generating controller for model: ${modelName}`)));
    makeController(path.join(parts.join('/'), fileName));
  }
  if (options.service) {
    console.log(chalk.italic(chalk.dim(`${figures.info} Generating service for model: ${modelName}`)));
    makeService(path.join(parts.join('/'), fileName));
  }
  if (options.repository) {
    console.log(chalk.italic(chalk.dim(`${figures.info} Generating repository for model: ${modelName}`)));
    makeRepository(path.join(parts.join('/'), fileName));
  }
}