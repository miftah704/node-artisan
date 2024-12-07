import path from 'path'
import Command from '../utils/command.util.js'
import LogUtil from '../utils/logger.util.js'
import fs from 'fs'
import chalk from 'chalk'
import figures from 'figures'

// Get the current working directory of the user
const userWorkingDir = process.cwd()

/**
 * Generates a transformer file with the given name.
 *
 * @param {string} name - The name of the transformer, including any nested folder structure.
 */
export default function makeTransformer(name) {
  // Parse the transformer name to determine folder and file structure
  const parts = name.split('/')
  const transformerName = parts.pop() // Extract the transformer name

  // Construct the folder path where the transformer will be created
  const folderPath = path.join(userWorkingDir, 'src', 'transformers', ...parts)

  // Standardize the file and class names
  const fileName = Command.removeSuffixFromName(transformerName, 'transformer') // Remove "transformer" suffix
  const kebabCaseName = Command.toKebabCase(fileName) // Convert to kebab-case for file naming
  const pascalClassName = Command.toPascalCase(fileName) // Convert to PascalCase for class naming

  // Define the full file path for the transformer
  const filePath = path.join(folderPath, `${kebabCaseName}.transformer.ts`)

  // Prepare the content of the transformer file
  const content = `import { Transformer, Str } from 'nodejs-artisan'

export default class ${pascalClassName}Transformer extends Transformer {
  /**
   * Override the protected _format method
   * @param {any} data - The input data
   * @param {string} [_lang] - Optional language parameter
   * @returns {Record<string, any> | null} - The formatted result
   */
  static override _format(data: any, _lang?: string): Record<string, any> | null {
    return Str.attributes({
      // Transformer data here
    });
  }
}`

  // Divider for log output
  const divider = chalk.gray(figures.line.repeat(60))

  // Log the summary of the operation
  LogUtil.logSummary(pascalClassName, kebabCaseName, folderPath, 'transformer')

  // Handle folder creation
  const folderExists = fs.existsSync(folderPath) // Check if the folder exists
  if (!folderExists) {
    fs.mkdirSync(folderPath, { recursive: true }) // Create folder if it does not exist
  }
  LogUtil.logFolderCreation(folderPath, !folderExists)

  // Handle file existence
  if (fs.existsSync(filePath)) {
    // If the file already exists, log an error and exit
    console.log(chalk.red(`${figures.cross} File already exists:`), chalk.red.underline(filePath))
    console.log(divider)
    return
  }

  // Create the file with the generated content
  fs.writeFileSync(filePath, content)
  LogUtil.logHelperCreationSuccess(filePath)
}
