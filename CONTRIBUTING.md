# Contributing to FAHH-DevKit

First off, thank you for considering contributing to FAHH-DevKit! It's people like you who make it a great tool.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct (standard contributor covenant).

## How Can I Contribute?

### Reporting Bugs
* Check the existing issues to see if the bug has already been reported.
* If not, open a new issue. Include a clear title, a description of the problem, steps to reproduce, and the expected vs actual behavior.

### Suggesting Enhancements
* Open an issue with the "enhancement" label.
* Describe the feature and why it would be useful.

### Pull Requests
1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes (`npm test`).
5. Make sure your code lints (`npm run lint`).
6. Issue that pull request!

## Style Guide

* We use ESM (ECMAScript Modules).
* Follow the project's ESLint and Prettier configurations.
* Use descriptive variable and function names.
* Keep functions small and focused.

## Development Setup

```bash
npm install
npm link
```

Run tests with:
```bash
npm test
```

Happy coding!
