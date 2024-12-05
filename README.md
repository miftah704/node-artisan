# Node Artisan

Node Artisan is a command-line tool for generating various components in Node.js projects, inspired by Laravel's Artisan CLI. This tool helps developers quickly scaffold controllers, models, services, middleware, and other project files, making the development process faster and more efficient. This package is especially suitable for Express.js projects, making it easy to generate essential components for your backend.

## Features

- Generate controllers, models, services, repositories, middleware, and transformers with ease.
- Command structure similar to Laravel Artisan.
- Simplifies repetitive tasks during project development.

## Installation

You can install Node Artisan locally in your project or globally for system-wide use.

### Local Installation

Run the following command to add Node Artisan as a project dependency:

```sh
npm install nodejs-artisan
```

## Usage

To initialize Node Artisan in your project, run the following command:

```sh
npx artisan init
```

After initializing, you can use Node Artisan with the following command:

```sh
node artisan <command> <name>
```

For example, to generate a controller named `UserController`, run:

```sh
node artisan make:controller UserController
```

Alternatively, you can directly use:

```sh
npx artisan make:<command> <name>
```

### Available Commands

Here is a list of commands you can use:

| Command            | Description                                              |
| ------------------ | -------------------------------------------------------- |
| `list`             | List all available artisan commands                      |
| `make:controller`  | Create a new controller in `src/controllers` directory   |
| `make:enum`        | Create a new enum in `src/enums` directory               |
| `make:middleware`  | Create a new middleware in `src/middleware` directory    |
| `make:model`       | Create a new model in `src/models` directory             |
| `make:transformer` | Create a new transformer in `src/transformers` directory |
| `make:service`     | Create a new service in `src/services` directory         |
| `make:repository`  | Create a new repository in `src/repositories` directory  |

![Example Output for Controller Creation](https://github.com/miftah704/nodejs-artisan/raw/main/src/screenshot/artisan-list.png)

### Command Details

1. **Generate Controller**

   ```sh
   node artisan make:controller <ControllerName> index show update
   ```

   Creates a new controller file in the `controllers` folder.

   - If you provide just the name (e.g., `Name`), it will create `controllers/name.controller.ts`.
   - If you provide a nested path (e.g., `v1/sub/Name`), it will create `controllers/v1/sub/name.controller.ts`.
   - If you provide function names (e.g., `index show update`), it will create the following methods inside the class:

     ```typescript
     static async index(req: Request, res: Response, next: NextFunction) {
       try {
       } catch (error) {
         next(error);
       }
     }

     static async show(req: Request, res: Response, next: NextFunction) {
       try {
       } catch (error) {
         next(error);
       }
     }

     static async update(req: Request, res: Response, next: NextFunction) {
       try {
       } catch (error) {
         next(error);
       }
     }
     ```

2. **Generate Model**

   ```sh
   node artisan make:model <ModelName>
   ```

   Creates a new model file in the `models` folder.

3. **Generate Middleware**

   ```sh
   node artisan make:middleware <MiddlewareName>
   ```

   Creates a new middleware file in the `middleware` folder.

4. **Generate Enum**

   ```sh
   node artisan make:enum <EnumName>
   ```

   Creates a new enum file in the `enums` folder.

5. **Generate Transformer**

   ```sh
   node artisan make:transformer <TransformerName>
   ```

   Creates a new transformer file in the `transformers` folder.

6. **Generate Service**

   ```sh
   node artisan make:service <ServiceName>
   ```

   Creates a new service file in the `services` folder.

7. **Generate Repository**

   ```sh
   node artisan make:repository <RepositoryName>
   ```

   Creates a new repository file in the `repositories` folder.

### Example Output

When running the `make:controller` command:

```sh
node artisan make:controller UserController
```

You will see output similar to the following:

```
ℹ [Controller Generator]

✨ Summary:
› Class Name  : UserController
› File Name   : user.controller.ts
› Folder Path : ./src/controllers
────────────────────────────────────────────────────────────
✔ Folder created: ./src/controllers
✔ Controller created successfully!
› File Location: ./src/controllers/user.controller.ts
★ Functions: No functions specified
────────────────────────────────────────────────────────────
```

![Example Output for Controller Creation](https://github.com/miftah704/nodejs-artisan/raw/main/src/screenshot/make-artisan.png)

## License

This project is licensed under the MIT License.

## Author

Created by Mivu704.

