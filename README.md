

![Captura de pantalla (486)](https://github.com/CristianOrizano/App-FusionFood-React/assets/112443620/2e2bb713-d5a7-407c-b504-a9890a97485d)
![Captura de pantalla (487)](https://github.com/CristianOrizano/App-FusionFood-React/assets/112443620/27562e6c-83d6-4f69-a559-d2c934e59f22)
![Captura de pantalla (490)](https://github.com/CristianOrizano/App-FusionFood-React/assets/112443620/e1c18a88-a78a-488e-9fd1-c6db7a12ea4c)
![Captura de pantalla (491)](https://github.com/CristianOrizano/App-FusionFood-React/assets/112443620/4e18ea01-5da6-4681-9c21-6559640e151f)




# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
