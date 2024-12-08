import path from 'path'
import fs from 'fs'
import Command from '../examples/utils/command.util.js'
import chalk from 'chalk'
import figures from 'figures'
import LogUtil from '../examples/utils/logger.util.js'

// Get the current working directory of the user
const userWorkingDir = process.cwd()

/**
 * Generates a repository file with the given name and optional functions.
 *
 * @param {string} name - The name of the repository, including any nested folder structure.
 * @param {Array<string>} functions - An array of function names to include in the repository.
 */
export default function makeRepository(name, functions = []) {
  // Parse the repository name to determine folder and file structure
  const parts = name.split('/')
  const repositoryName = parts.pop() // Extract the repository name

  // Construct the folder path where the repository will be created
  const folderPath = path.join(userWorkingDir, 'src', 'repositories', ...parts)

  // Standardize the file and class names
  const fileName = Command.removeSuffixFromName(repositoryName, 'repository') // Remove "repository" suffix
  const pascalClassName = Command.toPascalCase(fileName) // Convert to PascalCase for class naming
  const kebabCaseName = Command.toKebabCase(fileName) // Convert to kebab-case for file naming

  // Define the full file path for the repository
  const filePath = path.join(folderPath, `${kebabCaseName}.repository.ts`)

  // Generate class functions using the provided function names
  const classFunctions = Command.generateFunctions(functions, fileName)

  // Prepare the content of the repository file
  const content = `export default class ${pascalClassName}Repository {
${classFunctions}
}`

  // Divider for log output
  const divider = chalk.gray(figures.line.repeat(60))

  // Log the summary of the operation
  LogUtil.logSummary(pascalClassName, kebabCaseName, folderPath, 'repository')

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
