import path from 'path'
import Command from '../utils/command.utils.js'
import fs from 'fs'
import chalk from 'chalk'
import figures from 'figures'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url) 
const __dirname = path.dirname(__filename) 

export function makeTransformer(name) {
  const parts = name.split('/')
  const transformerName = parts.pop()
  const folderPath = path.join(__dirname, '..', 'transformers', ...parts)
  const fileName = Command.removeSuffixFromName(transformerName, 'transformer')
  const pascalClassName = Command.toPascalCase(fileName)
  const kebabCaseName = Command.toKebabCase(fileName)
  const filePath = path.join(folderPath, `${kebabCaseName}.transformer.ts`)

  const relativePath = path.relative(folderPath, path.join(__dirname, '..', 'transformers'))

  const content = `import Transformer from '${relativePath}/transformer.util.js'
import Str from '${relativePath}/utils/str.util.js'

export default class ${fileName}Transformer extends Transformer {
  static override format(data: any, lang?: string): Record<string, any> | null {
    return Str.attributes({
      // Transformer data here
    })
  }
}`

  const divider = chalk.gray(figures.line.repeat(60))

  console.log(chalk.bold.magenta(`\n${figures.info} [Transformer Generator]\n`))

  console.log(chalk.bold(`✨ Summary:`))
  console.log(
    `${chalk.green(figures.pointerSmall)} Transformer Name: ${chalk.cyan(`${fileName}Transformer`)}`
  )
  console.log(
    `${chalk.green(figures.pointerSmall)} File Name       : ${chalk.cyan(`${kebabCaseName}.transformer.ts`)}`
  )
  console.log(`${chalk.green(figures.pointerSmall)} Folder Path     : ${chalk.cyan(folderPath)}`)
  console.log(divider)

  // Handle folder creation
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true })
    console.log(chalk.green(`${figures.tick} Folder created:`), chalk.blue.bold(folderPath))
  } else {
    console.log(chalk.yellow(`${figures.warning} Folder already exists:`), chalk.gray(folderPath))
  }

  // Handle file existence
  if (fs.existsSync(filePath)) {
    console.log(chalk.red(`${figures.cross} File already exists:`), chalk.red.underline(filePath))
    console.log(divider)
    return
  }

  // Create the file
  Command.createFile(filePath, content)
  console.log(chalk.green(`${figures.tick} Transformer created successfully!`))
  console.log(chalk.cyan(`${figures.pointerSmall} File Location:`), chalk.blue.underline(filePath))
  console.log(divider)
}
