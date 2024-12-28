import path from 'path'
import fs from 'fs'
import Command from '../utils/command.util.js'
import chalk from 'chalk'
import figures from 'figures'
import LogUtil from '../utils/logger.util.js'

// Use process.cwd() to reference the user's project directory
const userWorkingDir = process.cwd()

/**
 * Generates a validator file with the given name.
 *
 * @param {string} name - The name of the validator, including any nested folder structure.
 */
export default function makeRoute(name) {
  // Parse the route name to determine folder and file structure
  const parts = name.split('/')
  const routeName = parts.pop() // Extract the route name

  // Construct the folder path where the route will be created
  const folderPath = path.join(userWorkingDir, 'src', 'routes', ...parts)

  // Standardize the file and class names
  const fileName = Command.removeSuffixFromName(routeName, 'route') // Remove "route" suffix
  const camelCase = Command.toCamelCase(fileName) // Convert to PascalCase for class naming
  const kebabCaseName = Command.toKebabCase(fileName) // Convert to kebab-case for file naming

  // Define the full file path for the route
  const filePath = path.join(folderPath, `${kebabCaseName}.route.ts`)

  // Prepare the content of the route file
  const content = `import { Router } from 'express'
  
const ${camelCase}Route = Router()

// ${camelCase}Route.get('/mivu', mivuMiddleware, MivuController.index)

export default ${camelCase}Route
`

  // Divider for log output
  const divider = chalk.gray(figures.line.repeat(60))

  // Log the summary of the operation
  LogUtil.logSummary(camelCase, kebabCaseName, folderPath, 'route')

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
