import fs from 'fs';
import path from 'path';
class Command {
  static createFile(filePath, template) {
    const folderPath = path.dirname(filePath);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, {
        recursive: true
      });
      console.log(`Folder ${folderPath} created successfully.`);
    }
    if (fs.existsSync(filePath)) {
      console.log(`${filePath} already exists.`);
      return;
    }
    fs.writeFileSync(filePath, template);
    console.log(`${filePath} created successfully at: ${filePath}`);
  }
  static toKebabCase(str) {
    return str.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`).replace(/^-/, '');
  }
  static removeSuffixFromName(name, type) {
    const regex = new RegExp(`${type}(s)?$`, 'i');
    return name.replace(regex, '');
  }
  static toPascalCase(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => index === 0 ? match.toUpperCase() : match.toLowerCase()).replace(/\s+/g, '');
  }
  static generateFunctions(functions, className) {
    return functions.map(fn => `static async ${fn}(req: Request, res: Response, next: NextFunction) {
    try {
      //
    } catch (error) {
      next(error)
    }
  }`).join('\n');
  }
}
export default Command;