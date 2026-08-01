# CartForge Client

This folder contains the frontend of the CartForge e-commerce application. It is built with **React**, **Vite**, and **Tailwind CSS**.

## Folder Structure

### `src/`

Contains the main React application, including components, pages, styles, hooks, and other frontend logic.

### `public/`

Stores static files that are served directly without being processed by Vite, such as images, icons, or other public assets.

### `node_modules/`

Contains all installed npm packages required by the frontend. This folder is generated automatically by `npm install` and should not be edited manually.

## Files

### `package.json`

Defines the project's metadata, scripts, and frontend dependencies.

### `package-lock.json`

Locks the exact versions of installed packages to ensure consistent installations across different environments.

### `vite.config.js`

Contains the Vite configuration, including plugins and build settings used by the React application.

### `eslint.config.js`

Defines ESLint rules that help maintain consistent code quality and identify common coding mistakes.

### `index.html`

The single HTML entry point for the React application. Vite injects the React app into this file.

### `.gitignore`

Lists files and folders that Git should ignore, such as `node_modules` and build output.

## Future `src` Structure

As the project grows, the `src` folder will be organized into folders such as:

* `assets/` – Images, fonts, icons, and other frontend assets.
* `components/` – Reusable UI components like buttons, cards, and navigation.
* `pages/` – Individual application pages (Home, Product, Cart, Login, etc.).
* `layouts/` – Shared page layouts used across multiple pages.
* `hooks/` – Custom React hooks.
* `context/` – React Context providers for global state.
* `services/` – API calls and external service logic.
* `utils/` – Helper and utility functions.
* `constants/` – Shared constant values used throughout the application.
* `styles/` – Global styles and custom CSS.
* `routes/` – Application routing configuration.
* `App.jsx` – Root React component.
* `main.jsx` – Application entry point where React is mounted.
