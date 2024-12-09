import path from 'path'
import Command from '../utils/command.util.js'
import fs from 'fs'
import chalk from 'chalk'
import figures from 'figures'
import LogUtil from '../utils/logger.util.js'

// Get the current working directory of the user
const userWorkingDir = process.cwd()

/**
 * Generates a helper file with the given name and optional functions.
 *
 * @param {string} name - The name of the helper, including any nested folder structure.
 * @param {Array<string>} functions - An array of function names to include in the helper.
 */
export default function makeHelper(name, functions = []) {
  // Parse the helper name to determine folder and file structure
  const parts = name.split('/')
  const helperName = parts.pop() // Extract the helper name

  // Construct the folder path where the helper will be created
  const folderPath = path.join(userWorkingDir, 'src', 'helpers', ...parts)

  // Standardize the file and class names
  const fileName = Command.removeSuffixFromName(helperName, 'helper') // Remove "helper" suffix
  const kebabCaseName = Command.toKebabCase(fileName) // Convert to kebab-case for file naming
  const pascalClassName = Command.toPascalCase(fileName) // Convert to PascalCase for class naming
  const camelCase = Command.toCamelCase(helperName) // Convert to camelCase for instance naming

  // Define the full file path for the helper
  const filePath = path.join(folderPath, `${kebabCaseName}.helper.ts`)

  // Generate helper class functions using the provided function names
  const classFunctions = Command.generateUtilFunctions(functions, fileName)

  // Prepare the content of the helper file
  const content = `class ${pascalClassName}Helper {
${classFunctions ?? '// script ...'}
}
const H${camelCase} = new ${pascalClassName}Helper()
export default H${camelCase}`

  // Divider for log output
  const divider = chalk.gray(figures.line.repeat(60))

  // Log the summary of the operation
  LogUtil.logSummary(pascalClassName, kebabCaseName, folderPath, 'helper')

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
  LogUtil.logHelperCreationSuccess(filePath, functions)
}
