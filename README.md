# Node Artisan

Node Artisan is a command-line tool for generating various components in Node.js projects, inspired by [Laravel's Artisan CLI](https://laravel.com). This tool helps developers quickly scaffold controllers, models, services, middleware, and other project files, making the development process faster and more efficient. It is particularly suited for Express.js projects, enabling easy generation of essential backend components.

## Screenshots

### Available Command List
![Command List Screenshot](https://raw.githubusercontent.com/miftah704/nodejs-artisan/refs/heads/dev/src/screenshot/artisan-list.png)

### Initialize Artisan
![Initialization Screenshot](https://raw.githubusercontent.com/miftah704/nodejs-artisan/refs/heads/dev/src/screenshot/make-init.png)

### Make a Controller
![Make Controller Screenshot](https://raw.githubusercontent.com/miftah704/nodejs-artisan/refs/heads/dev/src/screenshot/make-controller.png)

### Make a Model
![Make Model Screenshot](https://raw.githubusercontent.com/miftah704/nodejs-artisan/refs/heads/dev/src/screenshot/make-model.png)

### Make a Service
![Make Service Screenshot](https://raw.githubusercontent.com/miftah704/nodejs-artisan/refs/heads/dev/src/screenshot/make-service.png)

### Make a Repository
![Make Repository Screenshot](https://raw.githubusercontent.com/miftah704/nodejs-artisan/refs/heads/dev/src/screenshot/make-repository.png)

### Make a Utility
![Make Utility Screenshot](https://raw.githubusercontent.com/miftah704/nodejs-artisan/refs/heads/dev/src/screenshot/make-utility.png)

### Make an Enum
![Make Enum Screenshot](https://raw.githubusercontent.com/miftah704/nodejs-artisan/refs/heads/dev/src/screenshot/make-enum.png)

### Make a Type
![Make Type Screenshot](https://raw.githubusercontent.com/miftah704/nodejs-artisan/refs/heads/dev/src/screenshot/make-type.png)

### Make a Validator
![Make Validator Screenshot](https://raw.githubusercontent.com/miftah704/nodejs-artisan/refs/heads/dev/src/screenshot/make-validator.png)

### Make a Transformer
![Make Transformer Screenshot](https://raw.githubusercontent.com/miftah704/nodejs-artisan/refs/heads/dev/src/screenshot/make-transformer.png)

### Make a Helper
![Make Helper Screenshot](https://raw.githubusercontent.com/miftah704/nodejs-artisan/refs/heads/dev/src/screenshot/make-helper.png)

## Features

- Generate controllers, models, services, repositories, middleware, and transformers effortlessly.
- Command structure inspired by Laravel Artisan.
- Simplifies repetitive tasks during project development.

## Installation

You can install Node Artisan either locally in your project or globally for system-wide use.

### Local Installation

To add Node Artisan as a project dependency, run:

```sh
npm install nodejs-artisan
```

## Usage

To initialize Node Artisan in your project, run:

```sh
npx artisan init
```

**Purpose:** This command enables you to use `node artisan` commands seamlessly by:

1. Creating an `artisan.js` file in the root of your project.
2. Automatically adding a `bin` entry for `artisan` in your `package.json`.

Once initialized, you can use Node Artisan commands as follows:

```sh
node artisan <command> <name>
```

For example, to generate a controller named `UserController`, use:

```sh
node artisan make:controller UserController
```

Alternatively, you can use:

```sh
npx artisan make:<command> <name>
```

### Available Commands

| Command              | Description                                             |
|----------------------|---------------------------------------------------------|
| `list`               | List all available artisan commands                    |
| `make:controller`    | Create a new controller in `src/controllers` directory  |
| `make:enum`          | Create a new enum in `src/enums` directory              |
| `make:middleware`    | Create a new middleware in `src/middleware` directory   |
| `make:model`         | Create a new model in `src/models` directory            |
| `make:transformer`   | Create a new transformer in `src/transformers` directory|
| `make:service`       | Create a new service in `src/services` directory        |
| `make:repository`    | Create a new repository in `src/repositories` directory |

### Command Details

#### Generate Controller

```sh
node artisan make:controller <ControllerName> index show update
```

Creates a new controller file in the `controllers` folder.

- **Basic Name:** Creates `controllers/<name>.controller.ts`.
- **Nested Path:** Creates `controllers/<path>/<name>.controller.ts`.
- **Function Names:** Adds specified methods to the class:

```typescript
static async index(req: Request, res: Response, next: NextFunction) {
  try {
    // Logic here
  } catch (error) {
    next(error);
  }
}

static async show(req: Request, res: Response, next: NextFunction) {
  try {
    // Logic here
  } catch (error) {
    next(error);
  }
}

static async update(req: Request, res: Response, next: NextFunction) {
  try {
    // Logic here
  } catch (error) {
    next(error);
  }
}
```

#### Generate Model

```sh
node artisan make:model <ModelName>
```

Creates a new model file in the `models` folder.

**Recommendation:** Integrate your models with [Sutando ORM](https://sutando.org) for improved type safety and functionality.

#### Generate Middleware

```sh
node artisan make:middleware <MiddlewareName>
```

Creates a new middleware file in the `middleware` folder.

#### Generate Enum

```sh
node artisan make:enum <EnumName>
```

Creates a new enum file in the `enums` folder.

#### Generate Transformer

```sh
node artisan make:transformer <TransformerName>
```

Creates a new transformer file in the `transformers` folder.

**Purpose and Functionality:** Transformers serve as a formatting layer for API responses, similar to Laravel's resources. They allow you to structure and standardize the output of your APIs, ensuring that data returned to the client is consistently formatted and easy to consume.

You only need to call the transformer without additional conditions:

1. **List Data:**
   ```typescript
   const users = User.all();
   UserShowTransformer.transform(users);
   ```

2. **Single Data:**
   ```typescript
   const user = User.find(1);
   UserShowTransformer.transform(user);
   ```

The transformer will automatically handle formatting for both cases, ensuring consistent API responses.

**Example Implementation:**

```typescript
import { Transformer, Str } from 'nodejs-artisan';

export default class UserShowTransformer extends Transformer {
  /**
   * Override the protected _format method
   * @param {any} data - The input data
   * @param {string} [_lang] - Optional language parameter
   * @returns {Record<string, any> | null} - The formatted result
   */
  static override _format(data: any, _lang?: string): Record<string, any> | null {
    return Str.attributes({
      id: data.id,
      name: data.name,
      email: data.email,
      created_at: data.createdAt,
      updated_at: data.updatedAt
    });
  }
}
```

1. **List Data:**
   ```typescript
   const users = User.all();
   UserShowTransformer.transform(users);
   ```

2. **Single Data:**
   ```typescript
   const user = User.find(1);
   UserShowTransformer.transform(user);
   ```

The transformer will automatically handle formatting for both cases, ensuring consistent API responses.

#### Generate Service

```sh
node artisan make:service <ServiceName>
```

Creates a new service file in the `services` folder.

#### Generate Repository

```sh
node artisan make:repository <RepositoryName>
```

Creates a new repository file in the `repositories` folder.

#### Generate Validator

```sh
node artisan make:validator <ValidatorName>
```

Creates a new validator file in the `validators` folder.

**Recommendation:** Use [VineJS](https://vinejs.dev) for robust and extensible validation.

### Example Output

When running the `make:controller` command:

```sh
node artisan make:controller UserController
```

You will see output similar to:

```
ℹ [Controller Generator]

✨ Summary:
› Class Name : UserController
› File Name : user.controller.ts
› Folder Path : ./src/controllers
────────────────────────────────────────────────────────────
✔ Folder created: ./src/controllers
✔ Controller created successfully!
› File Location: ./src/controllers/user.controller.ts
★ Functions: No functions specified
────────────────────────────────────────────────────────────
```

## License

This project is licensed under the MIT License.

## Author

Created by Miftah704.

