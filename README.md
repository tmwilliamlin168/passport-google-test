## Setup

1. `npm i`
2. Use VSCode, make sure the recommended eslint and prettier plugins are installed. Automatic linting should occur when you save!
3. `npx husky install`. Automatic linting should occur when you commit!

## Commands

- `npm run dev`: Run with live reloading.
- `npm run build`: Generates the production build.
- `npm start`: Runs the production build.

## Steps to reproduce template

`npm init`

Create `.gitignore` with `node_modules`

`npm i -D typescript`

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "incremental": true,
    "target": "es2016",
    "module": "commonjs",
    "outDir": "dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}
```

Create `src/index.ts`:

```ts
console.log('Hello, world!');
```

Add `dist` to `.gitignore`

Add to `scripts` in `package.json`:

```json
"start": "node dist/index.js",
"build": "tsc"
```

`npm i -D ts-node-dev`

Add `"dev": "tsnd --respawn --transpile-only src/index.ts"` to `scripts` in `package.json`

`npm i -D eslint @typescript-eslint/eslint-plugin prettier eslint-config-prettier`

Create `.eslintrc.json`:

```json
{
  "extends": ["plugin:@typescript-eslint/recommended", "prettier"],
  "rules": {
    "eqeqeq": "error",
    "no-case-declarations": "error"
  }
}
```

Create `.prettierrc.json`:

```json
{
  "singleQuote": true,
  "trailingComma": "all"
}
```

Create `.vscode/extensions.json`:

```json
{
  "recommendations": ["dbaeumer.vscode-eslint", "esbenp.prettier-vscode"]
}
```

Create `.vscode/settings.json`:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

`npm i -D husky lint-staged`, `npx husky install`, `npx husky add .husky/pre-commit "npx lint-staged"`

Create `lint-staged.config.js`:

```js
module.exports = {
  '**/*.(ts)': () => 'npx tsc --noEmit',
  '**/*.(ts)': (filenames) => [
    `npx eslint --fix ${filenames.join(' ')}`,
    `npx prettier --write ${filenames.join(' ')}`,
  ],
  '**/*.(md|json)': (filenames) =>
    `npx prettier --write ${filenames.join(' ')}`,
};
```

Add `.env` to `.gitignore`

`npm i dotenv`

Add `import dotenv from 'dotenv';` and `dotenv.config();` to `src/index.ts`
