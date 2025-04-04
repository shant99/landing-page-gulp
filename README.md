# Gulp Project

```markdown
# 🚀 Landing Page with Gulp

This project uses **Gulp** to automate tasks such as compiling SCSS, bundling JavaScript, injecting HTML components, optimizing images, and building the project for both **development** and **production**.

---

## 📌 Prerequisites

- **Node.js** and **npm** must be installed.
- Check your installed versions with:

  ```bash
  node -v
  npm -v
  ```

If Node.js is not installed, download it from [nodejs.org](https://nodejs.org/).

---

## 🔧 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/landing-page-gulp.git
   ```

2. **Navigate to the project folder:**

   ```bash
   cd landing-page-gulp
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

---

## 🚦 Running the Project

### ⚙️ Development Mode

To run the project in development mode (with file watching):

```bash
npx gulp --dev
```

or simply:

```bash
npx gulp
```

**In development mode:**
- SCSS is compiled to CSS without minification.
- JavaScript is bundled without minification.
- HTML components are injected dynamically.
- Files are watched for changes and rebuilt automatically.

### 🚀 Production Mode

To build the project for production (minification and optimization enabled):

```bash
npx gulp --prod
```

or

```bash
npx gulp --production
```

**In production mode:**
- HTML, CSS, and JavaScript are minified.
- Images are optimized.
- The final build is output to the `build/` directory.

### 👀 Watch Mode

To watch for file changes and rebuild automatically (only in development mode):

```bash
npx gulp
```

### 🧹 Clean Build Directory

To clean the build directory before a new build:

```bash
npx gulp clean
```

---

## 📂 Project Structure

```
landing-page-gulp/
├── build/                  # Compiled project files (production-ready)
├── gulp/                   # Gulp configuration and tasks
│   ├── dev.js              # Tasks for development mode
│   ├── prod.js             # Tasks for production mode
│   ├── paths.js            # File paths configuration
│   ├── tasks.js            # Shared task logic
│   └── utils.js            # Utility functions (error handling, etc.)
├── src/                    # Source files
│   ├── assets/
│   │   └── images/         # Source images
│   ├── components/         # HTML components (partials)
│   ├── js/                 # JavaScript files
│   ├── scss/               # SCSS style files
│   └── index.html          # Main HTML file
├── gulpfile.js             # Main Gulp entry point
├── package.json            # Project dependencies
└── README.md               # Project documentation (this file)
```

---

## 🛠️ Available Commands

| Command              | Description                                          |
|----------------------|------------------------------------------------------|
| `npx gulp`           | Run in development mode (with watch)                 |
| `npx gulp --dev`     | Explicitly run in development mode                   |
| `npx gulp --prod`    | Build the project for production (minified/optimized)|
| `npx gulp clean`     | Clean the build directory (`build/`)                 |

---

## 📌 Configuration Details

### HTML Injection

HTML components from the `/src/components/` folder are injected into `index.html` using special comments:

```html
<!-- inject:components/header.html -->
<!-- endinject -->
```

The `gulp-inject` plugin automatically replaces these comments with the content of the respective HTML files.

### SCSS Compilation

All SCSS files from `/src/scss/` are compiled into CSS and output to the `build/css/` folder.

### JavaScript Bundling

JavaScript files from `/src/js/` (including libraries, utilities, globals, components, and the main `app.js`) are bundled into a single `app.js` file in the `build/js/` folder.

---

## 📦 Dependencies

- **gulp** – Task automation
- **gulp-sass** – Compile SCSS to CSS
- **gulp-inject** – Inject HTML components
- **gulp-concat** – Bundle JavaScript files
- **gulp-babel** – Transpile modern JS
- **gulp-uglify** – Minify JavaScript (production)
- **gulp-clean-css** – Minify CSS (production)
- **gulp-htmlmin** – Minify HTML (production)
- **gulp-imagemin** – Optimize images (production)
- **gulp-plumber** – Error handling
- **gulp-notify** – Notifications
- **gulp-sourcemaps** – Generate source maps
- **del** – Clean the build directory
- **yargs** – Parse command-line arguments

---

## 🤝 Contributing

Contributions are welcome! Fork the repository and submit a pull request with your improvements.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Happy coding! 😊🎉
```

Скопируй этот текст в файл `README.md` в корне твоего проекта, и он будет готов к использованию. Если возникнут вопросы или потребуется дополнительная помощь, пиши!