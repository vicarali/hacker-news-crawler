# Hacker News crawler

Hacker News crawler app that allows to list the latest 30 articles, including some filtering options.

## Main technologies used

- Node.js as the runtime environment
- Express as the framework
- TypeScript as the coding language
- Vite as a bundler
- Vitest as the unit test framework
- OpenAPI (Swagger) for the API specification and testing

## Technical decisions

- The Express framework has been chosen in order to simplify routing and API usage as a whole and error handling (including logs)
- TypeScript is used instead of Vanilla JavaScript to enforce typing and to improve the robustness of the app
- The usage of Vitest as the unit test framework was decided due to the great integration with Vite and easiness of use, since it follows the same syntax as Jest
- The only unit tests created were in relation to the services, since they are the only elements that contain business logic
- To do the initial setup of the project with all the required boilerplate, the [express-generator-typescript](https://github.com/seanpmaxwell/express-generator-typescript) npm package was used, which gives an initial structure and acts as a template to save some time
- Since we only needed a database for the storage of simple logs (related to the usage of API endpoints) and to make it easily readable, the DBMS chosen has been simply the management of a local JSON file that gets automatically generated on the `src/repos/common/database.json`
- The scrapping has been implemented using the native Fetch API to request the listing page, and the retrieval of required data is done via the `cheerio` npm package, which allows the selection of specific HTML elements easily

### Architectural decisions

- The architecture of the project followed more or less has been the MVC one, with separation of concerns in the form of services for the business logic, models for the definition of schema objects, repos for the database interaction and routes for the API endpoints managament
- In this case, only some TypeScript types were set up as models, since we don't require any kind of validation given that the users do not input any data
- For simplicity reasons and mainly due to the smallness of the project and the lack of data provided by users on the HTTP requests, route methods were used directly as controllers

## How to run/test app

In the next section there are more details on all the available operations regarding the app, but to keep it simple you would only need to do the following in order to test its functionality:

1. Go to the project folder on a CLI terminal
2. Run the script to launch the local/development environment: `npm run dev`
3. Once the server finishes the startup process, you can head to the following URL on a browser that will load an OpenAPI (Swagger) specification page, in which you will be able to see all the different API endpoints and, of course, test them: http://localhost:3000/api/docs/

## Available Scripts

### `npm run clean-install`

Remove the existing `node_modules/` folder, `package-lock.json`, and reinstall all library modules.

### `npm run dev` 

Run the server in development with hot reloading and browser refresh (see `package.json` for all `npm run dev` variations)<br/>

**IMPORTANT** development mode uses `swc` for performance reasons which DOES NOT check for typescript errors. Run `npm run type-check` to check for type errors. NOTE: you should use your IDE to prevent most type errors.

### `npm test`

Run unit-tests with <a href="https://vitest.dev/guide/">vitest</a>.

### `npm run lint`

Check for linting errors.

### `npm run build`

Build the project for production.

### `npm start`

Run the production build (Must be built first).

### `npm run type-check`

Check for typescript errors.

## Additional Notes

- If `npm run dev` gives you issues with bcrypt on MacOS you may need to run: `npm rebuild bcrypt --build-from-source`.
