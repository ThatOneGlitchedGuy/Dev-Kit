# FAHH-DevKit ⚙️

**Enterprise-grade development engine for high-performance engineering workflows.**

`FAHH-DevKit` is a modular, high-speed CLI toolkit designed to automate the repetitive tasks of modern software engineering. From scaffolding to deployment, it provides a unified interface for complex workflows.

---

## 🚀 Key Features

- **Advanced Scaffolding**: Create production-ready project structures (Node.js, React, Static) in seconds.
- **Deep Audit**: Scan dependencies for license compliance and security risks.
- **Automated Releases**: Seamless semantic versioning, changelog generation, and Git tagging.
- **Project Analytics**: High-fidelity metrics on LOC, disk footprint, and binary distribution.
- **High-Concurrency Runtime**: Deploy static sites instantly with a built-in Polka-powered server.

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/FAHHHH-lab/FAHH-DevKit.git
cd FAHH-DevKit

# Install dependencies
npm install

# Link globally for development
npm link
```

---

## 🛠 Usage Guide

### 1. Scaffolding
Initialize a new project with a standard architecture.
```bash
fahhh init
```

### 2. Dependency Audit
Perform a deep scan of your `node_modules` for license compliance.
```bash
fahhh audit
```

### 3. Automated Deployment
Manage releases following Semantic Versioning.
```bash
fahhh deploy [--dry-run]
```

### 4. Project Profiling
Analyze your project's technical footprint.
```bash
fahhh profile
```

### 5. Static Server
Spin up a high-performance static server.
```bash
fahhh serve --port 8080 --dir ./dist
```

---

## 🔧 Core Commands

| Command | Description | Options |
|---------|-------------|---------|
| `init` | Scaffold production hierarchy | N/A |
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

## 🧪 Development & Testing

```bash
# Run tests
npm test

# Run linter
npm run lint

# Generate coverage (requires c8)
npx c8 npm test
```

---

## 🛡 License

Distributed under the MIT License. See `LICENSE` for more information.

**FAHHHH-lab** | build • break • learn • repeat
