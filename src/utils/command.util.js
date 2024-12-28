import fs from 'fs'
import path from 'path'

/**
 * Utility class for handling common command operations, such as file creation,
 * string manipulation, and generating reusable code templates.
 */
class Command {
  /**
   * Creates a file with the specified path and template content.
   *
   * @param {string} filePath - The path where the file will be created.
   * @param {string} template - The content to write into the file.
   */
  static createFile(filePath, template) {
    const folderPath = path.dirname(filePath)

    // Ensure the folder exists
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true })
      console.log(`Folder ${folderPath} created successfully.`)
    }

    // Check if the file already exists
    if (fs.existsSync(filePath)) {
      console.log(`${filePath} already exists.`)
      return
    }

    // Write the template to the file
    fs.writeFileSync(filePath, template)
    console.log(`${filePath} created successfully at: ${filePath}`)
  }

  /**
   * Converts a string to kebab-case.
   *
   * @param {string} str - The input string.
   * @returns {string} - The kebab-case version of the input string.
   */
  static toKebabCase(str) {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2') // Add dash between camelCase
      .replace(/[\s_]+/g, '-') // Replace spaces and underscores with dash
      .toLowerCase()
  }

  /**
   * Removes a specified suffix from a string.
   *
   * @param {string} name - The input string.
   * @param {string} type - The suffix to remove (e.g., "type").
   * @returns {string} - The string without the specified suffix.
   */
  static removeSuffixFromName(name, type) {
    const regex = new RegExp(`${type}(s)?$`, 'i')
    return name.replace(regex, '')
  }

  /**
   * Converts a string to PascalCase.
   *
   * @param {string} str - The input string.
   * @returns {string} - The PascalCase version of the input string.
   */
  static toPascalCase(str) {
    return str
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
      .replace(/^(.)/, (_, chr) => chr.toUpperCase())
  }

  /**
   * Generates functions for a controller file.
   *
   * @param {Array<string>} functions - The function names to generate.
   * @returns {string} - The generated functions as a string.
   */
  static generateFunctions(functions) {
    return functions
      .map(
        (fn) => `static async ${fn}(req: Request, res: Response, next: NextFunction) {
    try {
      //
    } catch (error) {
      next(error);
    }
  }`
      )
      .join('\n')
  }

  /**
   * Converts a string to camelCase.
   *
   * @param {string} str - The input string.
   * @returns {string} - The camelCase version of the input string.
   */
  static toCamelCase(str) {
    return str
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
      .replace(/^(.)/, (_, chr) => chr.toLowerCase())
  }

  /**
   * Generates utility functions for a utility file.
   *
   * @param {Array<string>} functions - The function names to generate.
   * @returns {string} - The generated utility functions as a string.
   */
  static generateUtilFunctions(functions) {
    return functions
      .map(
        (fn) => `  static async ${fn}() {
    //
  }
`
      )
      .join('\n')
  }
}

export default Command
