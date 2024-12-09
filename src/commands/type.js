import path from 'path'
import Command from '../utils/command.util.js'
import fs from 'fs'
import chalk from 'chalk'
import figures from 'figures'
import LogUtil from '../utils/logger.util.js'

// Get the current working directory of the user
const userWorkingDir = process.cwd()

/**
 * Generates a type file with the given name.
 *
 * @param {string} name - The name of the type, including any nested folder structure.
 */
export default function makeType(name) {
  // Parse the type name to determine folder and file structure
  const parts = name.split('/')
  const typeName = parts.pop() // Extract the type name

  // Construct the folder path where the type will be created
  const folderPath = path.join(userWorkingDir, 'src', 'types', ...parts)

  // Standardize the file and type names
  const fileName = Command.removeSuffixFromName(typeName, 'type') // Remove "type" suffix
  const pascalClassName = Command.toPascalCase(fileName) // Convert to PascalCase for type naming
  const kebabCaseName = Command.toKebabCase(fileName) // Convert to kebab-case for file naming

  // Define the full file path for the type
  const filePath = path.join(folderPath, `${kebabCaseName}.type.ts`)

  // Prepare the content of the type file
  const content = `export type T${pascalClassName} = 'nodejs' | 'artisan' | 'miftah704'`

  // Divider for log output
  const divider = chalk.gray(figures.line.repeat(60))

  // Log the summary of the operation
  LogUtil.logSummary(pascalClassName, kebabCaseName, folderPath, 'type')

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
