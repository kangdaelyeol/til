# Upgrade tailwind 3.x to 4.x

## Previous Step of Tailwindcss

### 1. install tailwindcss postcss autoprefixer packages via npm.

```
npm i -D tailwindcss postcss autoprefixer
```

### 2. generates config files for tailwindcss project via npx.

```
npx tainwindcss init -p
```

- -p: including postcss config file

- this command generates **postcss.config.js** and **tailwind.config.js**

### 3. set plugins and configuration in the config files

```js
// postcss.config.js
export default {
	plugins: {
		tailwindcss: {},
		autoprefixer: {},
	},
};
```

```js
// tainwind.config.js
export default {
	// content: set scope for compiling tailwindcss
	content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],

	// theme: customizing style variable or style(classname)
	theme: {},
	plugins: [],
};
```

### 4. Import(apply) tailwindcss layers in the main css file(index.css).

```css
/* index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

---

## Newer Step of Tailwindcss

### 1. Add packages via npm

```
npm i tailwindcss @tailwind/postcss postcss
```

### 2. Add tailwind plugin to postcss.config.js file

```js
// postcss.config.js
export default {
	plugins: {
		'@tailwindcss/postcss': {},
	},
};
```

### 3. import tailwind in the main css file

```css
/* index.css */
@import 'tailwindcss';
```

`If you use 'VITE', there is easier way to apply tailwindcss`

---

---

### 1. install packages via npm

```
npm i tailwindcss @tailwindcss/vite
```

### 2. add plugin in vite.config.json file.

```js
// vite.config.js
// Imports ...
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [react(), tailwindcss()],
});
```

### 3. import tailwindcss in default css file

```css
/* index.css */
@import 'tailwindcss';
```

## Key Differences between previous and latest version

### 1. Reduced config files

- About the previous version, you need to create `postcss.config.js` and `tailwind.config.js`, but now you only need `postcss.config.js`

  - With `Vite`, no config files needed no longer.

### 2. Reduced additional npm packages

- Previously, `postcss` and `autoprefixer` must be required to use tailwindcss like boilerplate, but now, only `postcss` is required.

  - With `Vite`, no additional packages needed no longer. tailwindcss packages for `Vite` is released as `@tailwindcss/vite` in 'npm'. from now on, you can use it with vite-friendly.
