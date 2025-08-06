# Voolt Lead Generation Landing Page

A modern, responsive landing page built with SASS and HTML.

## 🎯 Project Structure

```
voolt-lead/
├── index.html              # Main HTML file
├── main.sass              # Main SASS file (root level)
├── main.css               # Compiled CSS (root level)
├── main.css.map           # Source map for debugging
├── package.json           # Project dependencies and scripts
├── css/                   # CSS folder with main.scss
│   ├── main.scss          # Main SCSS file (imports from sass/)
│   ├── main.css           # Compiled CSS from css/main.scss
│   └── main.css.map       # Source map
├── sass/                  # SASS source files
│   ├── main.scss          # Main SCSS file (imports local files)
│   ├── main.css           # Compiled CSS from sass/main.scss
│   ├── main.css.map       # Source map
│   ├── _global.sass       # Global variables and base styles
│   ├── _header.sass       # Header section styles
│   ├── _hero.sass         # Hero section styles
│   ├── _local-pros.sass   # Local pros section styles
│   ├── _comparison.sass   # Comparison section styles
│   ├── _ad-examples.sass  # Ad examples section styles
│   ├── _how-it-works.sass # How it works section styles
│   ├── _charging-info.sass # Charging info section styles
│   ├── _features.sass     # Features section styles
│   ├── _cta.sass          # CTA section styles
│   ├── _faq.sass          # FAQ section styles
│   └── _footer.sass       # Footer section styles
└── images/                # Image assets
    └── [32 meaningful image files]
```

## 🚀 Getting Started

### Prerequisites

- Node.js and npm (for SASS compilation)
- Modern web browser

### Installation

1. Clone or download the project
2. Install dependencies (optional):
   ```bash
   npm install
   ```

### Development

#### Root Level Compilation

- **Compile SASS once:**
  ```bash
  npm run sass
  ```
- **Watch for changes (auto-compile):**
  ```bash
  npm run sass:watch
  ```

#### CSS Folder Compilation

- **Compile from css/main.scss:**
  ```bash
  npm run sass:css
  ```
- **Watch css/main.scss:**
  ```bash
  npm run sass:css:watch
  ```

#### SASS Folder Compilation

- **Compile from sass/main.scss:**
  ```bash
  npm run sass:sass
  ```
- **Watch sass/main.scss:**
  ```bash
  npm run sass:sass:watch
  ```

#### Production Build

- **Build for production (minified):**
  ```bash
  npm run build
  ```

## 🎨 SASS Architecture

### Multiple Entry Points

- **`main.sass`** (root) - Uses `@use 'sass/filename'` syntax
- **`css/main.scss`** - Uses `@use '../sass/filename'` syntax
- **`sass/main.scss`** - Uses `@use 'filename'` syntax

### Section Files

Each section has its own SASS file with:

- **Section wrapper** (e.g., `.hero-section`, `.footer-section`)
- **Nested styles** within the wrapper
- **Responsive design** with media queries
- **Consistent naming** and structure

### Global Styles (`_global.sass`)

- CSS variables (custom properties)
- Base styles and resets
- Utility classes
- Button styles
- Typography

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: 768px, 992px, 1024px
- Flexible layouts with CSS Grid and Flexbox

## 🎯 Features

- ✅ **Multiple SASS entry points** for different workflows
- ✅ **Modular SASS structure** with section wrappers
- ✅ **Clean, semantic HTML**
- ✅ **Responsive design**
- ✅ **Optimized images** with meaningful names
- ✅ **Modern CSS** with custom properties
- ✅ **Easy maintenance** and scalability

## 🔧 Customization

- Edit `sass/_global.sass` for colors, fonts, and variables
- Modify individual section files for specific styling
- Add new sections by creating new SASS files and importing in main files
- Choose your preferred entry point:
  - `main.sass` (root) - Simple imports
  - `css/main.scss` - CSS folder organization
  - `sass/main.scss` - SASS folder organization

## 📄 License

MIT License - feel free to use and modify as needed.
