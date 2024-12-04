const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');
const fsSync = require('fs');

describe('Artisan CLI Generators', () => {
  const commands = [
    { cmd: 'make:controller', dir: 'controllers', suffix: '.controller.ts' },
    { cmd: 'make:enum', dir: 'enums', suffix: '.enum.ts' },
    { cmd: 'make:middleware', dir: 'middleware', suffix: '.middleware.ts' },
    { cmd: 'make:model', dir: 'models', suffix: '.model.ts' },
    { cmd: 'make:transformer', dir: 'transformers', suffix: '.transformer.ts' },
    { cmd: 'make:service', dir: 'services', suffix: '.service.ts' },
    { cmd: 'make:repository', dir: 'repositories', suffix: '.repository.ts' }
  ];

  commands.forEach(({ cmd, dir, suffix }) => {
    test(`should create ${cmd} file successfully`, async () => {
      const name = `test${cmd.split(':')[1]}`;
      const folderPath = path.resolve(__dirname, '..', 'src', dir);
      const filePath = path.resolve(folderPath, `${name}${suffix}`);

      console.log('Testing creation for file path:', filePath);

      try {
        // Clean up before the test
        await fs.unlink(filePath).catch(() => {});

        // Run the command
        execSync(`node artisan ${cmd} ${name}`, { stdio: 'inherit', cwd: path.resolve(__dirname, '..') });

        // Delay to ensure file is created
        await waitForFile(filePath);  // Menggunakan fungsi polling

        // Check if the file is created
        const fileExists = fsSync.existsSync(filePath);  // Menggunakan pengecekan sinkron
        expect(fileExists).toBe(true);
      } catch (error) {
        console.error('Error while creating file:', error);
        throw error;
      } finally {
        // Optional: Clean up after the test
        await fs.unlink(filePath).catch(() => {});
      }
    });
  });
});

async function waitForFile(filePath, timeout = 5000, interval = 500) {
  const startTime = Date.now();
  while (Date.now() - startTime < timeout) {
    const fileExists = await fs.access(filePath).then(() => true).catch(() => false);
    if (fileExists) {
      return true;
    }
    await new Promise(resolve => setTimeout(resolve, interval));
  }
  throw new Error(`Timeout waiting for file: ${filePath}`);
}
