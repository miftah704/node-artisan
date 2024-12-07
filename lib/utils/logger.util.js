import chalk from 'chalk';
import figures from 'figures';
import Str from './str.util.js';

// Divider for log separation
const divider = chalk.gray(figures.line.repeat(60));

/**
 * Utility class for logging formatted outputs to the console.
 */
export default class LogUtil {
  /**
   * Logs a summary of the helper generation process.
   *
   * @param {string} pascalClassName - The name of the class in PascalCase.
   * @param {string} kebabCaseName - The file name in kebab-case.
   * @param {string} folderPath - The folder where the file will be created.
   * @param {string} type - The type of the file being generated (e.g., "helper", "transformer").
   */
  static logSummary(pascalClassName, kebabCaseName, folderPath, type) {
    console.log(chalk.bold.blue(`\n${figures.info} [Helper Generator]\n`));
    console.log(chalk.bold(`✨ Summary:`));
    console.log(`${chalk.green(figures.pointerSmall)} Class Name  : ${chalk.cyan(pascalClassName)}${Str.title(type)}`);
    console.log(`${chalk.green(figures.pointerSmall)} File Name   : ${chalk.cyan(kebabCaseName)}.${Str.lower(type)}.ts`);
    console.log(`${chalk.green(figures.pointerSmall)} Folder Path : ${chalk.cyan(folderPath)}`);
    console.log(divider);
  }

  /**
   * Logs whether a folder was created or already exists.
   *
   * @param {string} folderPath - The path of the folder.
   * @param {boolean} isCreated - Whether the folder was created.
   */
  static logFolderCreation(folderPath, isCreated) {
    if (isCreated) {
      console.log(chalk.green(`${figures.tick} Folder created:`), chalk.blue.bold(folderPath));
    } else {
      console.log(chalk.yellow(`${figures.warning} Folder already exists:`), chalk.gray(folderPath));
    }
  }

  /**
   * Logs a message indicating a file already exists.
   *
   * @param {string} filePath - The path of the file.
   */
  static logFileExistence(filePath) {
    console.log(chalk.red(`${figures.cross} File already exists:`), chalk.red.underline(filePath));
    console.log(chalk.gray(figures.line.repeat(60)));
  }

  /**
   * Logs a success message for the creation of a helper file.
   *
   * @param {string} filePath - The path of the created file.
   * @param {Array<string> | null} functions - The list of functions included in the file.
   */
  static logHelperCreationSuccess(filePath, functions = null) {
    console.log(chalk.green(`${figures.tick} Helper created successfully!`));
    console.log(chalk.cyan(`${figures.pointerSmall} File Location:`), chalk.blue.underline(filePath));
    console.log(chalk.magenta(`${figures.star} Functions:`), functions && functions.length > 0 ? chalk.white(functions.map(fn => chalk.cyan.bold(fn)).join(', ')) : chalk.gray('No functions specified'));
    console.log(chalk.gray(figures.line.repeat(60)));
  }
}