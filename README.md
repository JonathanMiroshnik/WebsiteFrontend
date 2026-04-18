# HTMX JavaScript Frontend

A modern, static website built with HTMX for dynamic content loading and client-side routing.

## 🚀 Features

- **HTMX Integration**: Dynamic content loading without page refreshes
- **Client-Side Routing**: Smooth navigation with history API
- **Modular CSS**: Organized styling architecture
- **CI/CD Pipeline**: Automated testing and deployment
- **Coding Standards**: Comprehensive linting and formatting

## 📦 Project Structure

```
WebsiteFrontend/
├── index.html          # Main entry point
├── vercel.json         # Vercel deployment configuration
├── package.json        # Node.js dependencies and scripts
├── .eslintrc.js        # JavaScript linting rules
├── .prettierrc         # Code formatting rules
├── .htmlhintrc         # HTML validation rules
├── .stylelintrc        # CSS validation rules
├── .gitignore          # Git ignore patterns
├── .github/
│   └── workflows/
│       └── ci.yml      # GitHub Actions CI/CD workflow
├── assets/             # Static assets (images, icons, etc.)
├── css/                # CSS stylesheets
│   ├── index.css
│   ├── navbar.css
│   ├── home.css
│   ├── blog.css
│   ├── projects.css
│   └── footer.css
├── html/               # HTML partials
│   ├── home.html
│   ├── blog.html
│   ├── projects.html
│   ├── footer.html
│   └── blog/
│       └── *.html      # Blog post templates
└── js/                 # JavaScript modules
    ├── navigation.js   # Client-side routing
    └── styling.js      # Style manipulation utilities
```

## 🛠 Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server (if needed):

```bash
# For local development, you can use any static server
npx serve .
```

### Available Scripts

```bash
# Run all linting and formatting checks
npm run lint

# Fix linting and formatting issues
npm run lint:fix

# Run security audit
npm run security

# Run complete CI pipeline locally
npm run ci
```

## 📋 Coding Standards

### JavaScript (ESLint)

- ES2021+ syntax
- No console statements in production
- Prefer const over let/var
- Strict equality (===)
- Security best practices

### HTML (HTMLHint)

- Semantic HTML5
- Accessibility requirements
- Valid attribute formatting
- No duplicate IDs

### CSS (Stylelint)

- Modern CSS standards
- No important declarations
- Consistent naming conventions
- No pixel units (use rem/em)

### Formatting (Prettier)

- 2-space indentation
- Single quotes for JS
- Double quotes for HTML/CSS
- 80 character line limit

## 🔧 CI/CD Pipeline

The GitHub Actions workflow includes:

1. **Linting**: ESLint, Prettier, HTMLHint, Stylelint
2. **Security**: npm audit with moderate threshold
3. **Build Verification**: Static site validation
4. **Deployment**: Automatic Vercel deployment on main branch

## 🚀 Deployment

### Vercel (Automatic)

- Push to main/master branch triggers deployment
- Previews for pull requests
- Custom domain support
- SSL/TLS encryption

### Manual Deployment

1. Build the project:

```bash
npm run ci
```

2. Deploy to Vercel:

```bash
npx vercel --prod
```

## 🧪 Testing

### Test Structure

- Unit tests for JavaScript functions
- DOM testing with jsdom
- Mocked HTMX functionality
- Coverage reporting

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npx jest __tests__/navigation.test.js
```

## 🔒 Security Features

- Content Security Policy ready
- XSS protection headers
- Clickjacking protection
- Referrer policy control
- Permission policy restrictions
- Dependency vulnerability scanning

## 📊 Performance

- Static file caching (1 year)
- Brotli compression
- CDN distribution
- Minimal JavaScript footprint
- Optimized asset delivery

## 🤝 Contributing

1. Follow the coding standards
2. Write tests for new functionality
3. Run `npm run ci` before pushing
4. Create pull requests for review

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

For issues or questions:

1. Check existing tests
2. Review linting output
3. Check GitHub Actions logs
4. Create an issue in the repository
