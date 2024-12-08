import path from 'path'
import fs from 'fs'
import chalk from 'chalk'
import figures from 'figures'
import Command from '../examples/utils/command.util.js'
import LogUtil from '../examples/utils/logger.util.js'
import makeService from './service.js'
import makeRepository from './repository.js'

// Get the current working directory of the user
const userWorkingDir = process.cwd()

/**
 * Generates a controller file with the given name and functions.
 *
 * @param {string} name - The name of the controller, including any nested folder structure.
 * @param {Array<string>} functions - An array of function names to include in the controller.
 * @param {Object} options - Additional options for generating related files.
 * @param {boolean} [options.service=false] - If true, generates a service file for the controller.
 * @param {boolean} [options.repository=false] - If true, generates a repository file for the controller.
 * @param {boolean} [options.all=false] - If true, generates both service and repository files for the controller.
 */
export default function makeController(name, functions = [], options = {}) {
  // Parse the controller name to determine folder and file structure
  const parts = name.split('/')
  const controllerName = parts.pop() // Extract the controller name

  // Construct the folder path where the controller will be created
  const folderPath = path.join(userWorkingDir, 'src', 'controllers', ...parts)

  // Standardize the file and class names
  const fileName = Command.removeSuffixFromName(controllerName, 'controller') // Remove "controller" suffix
  const pascalClassName = Command.toPascalCase(fileName) // Convert to PascalCase for class naming
  const kebabCaseName = Command.toKebabCase(fileName) // Convert to kebab-case for file naming

  // Define the full file path for the controller
  const filePath = path.join(folderPath, `${kebabCaseName}.controller.ts`)

  // Generate class functions using the provided function names
  const classFunctions = Command.generateFunctions(functions, fileName)

  // Prepare the content of the controller file
  const content = `import { NextFunction, Request, Response } from 'express'
export default class ${pascalClassName}Controller {
  ${classFunctions}
}`

  // Divider for log output
  const divider = chalk.gray(figures.line.repeat(60))

  // Log the summary of the operation
  LogUtil.logSummary(pascalClassName, kebabCaseName, folderPath, 'controller')

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

  if (options.service || options.all) {
    console.log(
      chalk.italic(chalk.dim(`${figures.info} Generating service for controller: ${fileName}`))
    )
    makeService(name)
  }

  if (options.repository || options.all) {
    console.log(
      chalk.italic(chalk.dim(`${figures.info} Generating repository for controller: ${fileName}`))
    )
    makeRepository(name)
  }
}
