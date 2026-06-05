# Dev-Kit ⚙️

**Fah-grade development engine for high-performance engineering workflows.**

`Dev-Kit` is a modular, high-speed CLI toolkit designed to automate the repetitive tasks of modern software engineering. From scaffolding to deployment, it provides a unified interface for complex workflows.

---

##  Key Features

- **Interactive Dashboard**: Real-time project overview including Git status, environment, and dependencies.
- **Advanced Scaffolding**: Create production-ready project structures (Node.js, Express/TS, CLI, Static) with optional features like Docker and CI.
- **Deep Audit & Inspection**: Scan dependencies for license compliance and perform deep file/directory analysis.
- **Live Watch Engine**: Watch for file changes and automatically trigger development commands.
- **Global Configuration**: Manage persistent CLI settings across your development environment.
- **Automated Releases**: Seamless semantic versioning, changelog generation, and Git tagging.
- **Project Analytics**: High-fidelity metrics on LOC, disk footprint, and binary distribution.

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/ThatOneGlitchedGuy/Dev-Kit.git
cd fah-DevKit

# Install dependencies
npm install

# Link globally for development
npm link
```

---

## 🛠 Usage Guide

### 1. Project Dashboard
Get a high-level overview of your project's health and status.
```bash
fah dashboard
```

### 2. Scaffolding
Initialize a new project with a standard architecture and optional features.
```bash
fah init
```

### 2. Live Watcher
Automatically run commands on file changes.
```bash
fah watch "npm test"
```

### 3. Deep Inspection
Analyze a specific file or directory's technical details.
```bash
fah inspect ./src/index.js
```

### 4. Global Configuration
Configure your engine settings.
```bash
fah config set author "John Doe"
fah config get
```

---

## 🔧 Core Commands

| Command | Description | Options |
|---------|-------------|---------|
| `dashboard` | Interactive project overview | N/A |
| `init` | Scaffold production hierarchy | N/A |
| `config` | Manage global engine settings | `get`, `set`, `delete` |
| `inspect` | Deep inspection of file/dir | `[target]` |
| `watch` | Watch changes & execute command | `<command>` |
| `audit` | Execute compliance & security audit | N/A |
| `deploy` | Execute semantic release pipeline | `--dry-run` |
| `profile` | Generate project analytics | N/A |
| `serve` | Deploy static runtime | `-p, --port`, `-d, --dir` |
| `doctor` | Verify system runtime integrity | N/A |
| `clean` | Purge temporary artifacts | `-d, --deep` |
| `git sync` | Atomic source synchronization | `<message>` |
| `port kill` | Kill process on specific port | `<port>` |
| `tree` | Visualize directory architecture | N/A |

---

##  Development & Testing

```bash
# Run tests
npm test

# Run linter
npm run lint

# Generate coverage (requires c8)
npx c8 npm test
```

---

##  License

Distributed under the MIT License. See `LICENSE` for more information.

* probably fine. probably not.

* readme helped by tools, code helped by insomnia
