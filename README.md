# TerminAItor 🤖⚡

AI-powered terminal command assistant. Get intelligent command suggestions in real-time - available as a web app and CLI tool.

**Built with:** React + Vite, n8n workflow orchestration, and Gemini AI

![Terminal Theme](https://img.shields.io/badge/theme-cyberpunk-FFD700)
![Status](https://img.shields.io/badge/status-online-00FF00)
![AI](https://img.shields.io/badge/AI-Gemini-4285F4)
[![npm version](https://img.shields.io/npm/v/terminaitor)](https://www.npmjs.com/package/terminaitor)
[![npm downloads](https://img.shields.io/npm/dm/terminaitor)](https://www.npmjs.com/package/terminaitor)

---

## 🚀 Two Ways to Use

### 1. Web App (Browser)
Visit the live app and start typing commands instantly.

**Live Demo:** https://termin-ai-tor.vercel.app/

### 2. CLI Tool (Terminal)
Install globally and use directly in your terminal.

```bash
npm install -g terminaitor
terminai config set-url https://tooez4mohit.app.n8n.cloud/webhook/autocomplete
terminai "find large files"
```

**[📖 CLI Setup Guide](CLI_SETUP.md)**

---

## ✨ Features

- 🎯 **Smart Command Completion** - Partial commands get intelligent completions
- 💡 **Natural Language Processing** - Describe tasks in plain English
- 📝 **Detailed Explanations** - Every command comes with a clear explanation
- ⚡ **Real-time Suggestions** - 800ms debounce for smooth experience
- 🎨 **Cyberpunk Terminal Aesthetic** - CRT effects, scanlines, and matrix rain
- 📋 **One-Click Copy** - Copy commands directly to clipboard
- 🛡️ **Safety Checks** - CLI warns about dangerous commands
- 🌐 **Cloud-Powered** - n8n workflow + Gemini AI

---

## 📖 Usage Examples

### Web App

1. Open the web app
2. Type: `git push`
3. Get 3 intelligent suggestions
4. Click to copy or use

### CLI Tool

```bash
# Generate commands
terminai "compress folder"
terminai "kill port 3000"

# Explain commands
terminai explain "chmod 755"

# Interactive mode
terminai
```

**Example Output:**
```
$ terminai "find large files"

  Task:     find large files
  Command:  find . -type f -size +100M
  What:     find files larger than 100MB

  ? What do you want to do?
    ❯ Copy to clipboard
      Run command
      Show explanation
      Cancel
```

---

## 🎯 Supported Commands

- **Git Operations** - push, pull, commit, branch, merge
- **File Management** - find, grep, sed, awk, ls, cp, mv
- **Docker/Containers** - run, ps, exec, logs, compose
- **System Monitoring** - top, ps, free, df, htop
- **Network Utilities** - curl, wget, ping, netstat, ssh
- **Package Management** - apt, yum, brew, npm, pip
- **Compression** - tar, zip, gzip, bzip2
- **Process Management** - kill, pkill, killall

See [COMMAND_EXAMPLES.md](docs/COMMAND_EXAMPLES.md) for 50+ detailed examples.

---

## 🏗️ Architecture

```
┌─────────────┐      ┌──────────┐      ┌─────────────┐      ┌──────────┐
│   React     │─────▶│   n8n    │─────▶│   Gemini    │─────▶│ Response │
│  Frontend   │      │ Workflow │      │     API     │      │  Parser  │
└─────────────┘      └──────────┘      └─────────────┘      └──────────┘
     ▲                                                              │
     └──────────────────────────────────────────────────────────────┘

┌─────────────┐
│     CLI     │─────▶ Same n8n Workflow
│   (Node.js) │
└─────────────┘
```

---

## 📦 Installation

### Web App
No installation needed - just visit the URL!

### CLI Tool

**Requirements:**
- Node.js 18+
- npm

**Install:**
```bash
npm install -g terminaitor
```

**Setup:**
```bash
terminai config set-url https://tooez4mohit.app.n8n.cloud/webhook/autocomplete
```

**[📖 Full CLI Setup Guide](CLI_SETUP.md)**

---

## 🛠️ Development

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### CLI

```bash
cd cli
npm install
npm link
terminai "test"
```

---

## 📁 Project Structure

```
TerminAItor/
├── frontend/              # React web app
│   ├── src/
│   │   ├── App.jsx       # Main component
│   │   ├── App.css       # Cyberpunk styling
│   │   └── main.jsx      # Entry point
│   └── package.json
│
├── cli/                   # CLI tool
│   ├── commands/         # Command handlers
│   ├── utils/            # Helper functions
│   ├── index.js          # CLI entry point
│   └── package.json
│
├── n8n-workflow.json     # n8n workflow export
├── CLI_SETUP.md          # CLI setup guide
└── README.md             # This file
```

---

## 🔧 Configuration

### Frontend (.env)
```bash
VITE_API_URL=https://your-instance.app.n8n.cloud/webhook/autocomplete
```

### CLI
```bash
terminai config set-url <your-n8n-webhook-url>
terminai config show
```

---

## 🚢 Deployment

### Frontend
- Deploy to Vercel, Netlify, or any static host
- Set environment variable: `VITE_API_URL`

### CLI
- Published on npm: `terminaitor`
- Users install with: `npm install -g terminaitor`

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

---

## 👨‍💻 Author

**Mohit Sahoo**
- GitHub: [@MohitSahoo](https://github.com/MohitSahoo)
- npm: [terminaitor](https://www.npmjs.com/package/terminaitor)

---

## 🙏 Acknowledgments

- Powered by Google's Gemini AI
- Built with n8n workflow automation
- Styled with cyberpunk terminal aesthetics

---

## 📚 Documentation

- [CLI Setup Guide](CLI_SETUP.md) - How to install and use the CLI
- [Command Examples](docs/COMMAND_EXAMPLES.md) - 50+ example commands
- [n8n Workflow Setup](docs/N8N_WORKFLOW_SETUP.md) - Backend configuration
- [Troubleshooting](docs/TROUBLESHOOTING.md) - Common issues and solutions

---

## 🔗 Links

- **Web App**: [Your Vercel URL]
- **npm Package**: https://www.npmjs.com/package/terminaitor
- **GitHub**: https://github.com/MohitSahoo/TerminAItor
- **Issues**: https://github.com/MohitSahoo/TerminAItor/issues

---

**Made with ☕ and `sudo npm install coffee --save-dev`**

---

## ✨ Features

- 🎯 **Smart Command Completion** - Partial commands get intelligent completions
- 💡 **Natural Language Processing** - Describe tasks in plain English
- 📝 **Detailed Explanations** - Every command comes with a clear explanation
- ⚡ **Real-time Suggestions** - 800ms debounce for smooth experience
- 🎨 **Cyberpunk Terminal Aesthetic** - CRT effects, scanlines, and matrix rain
- 📋 **One-Click Copy** - Copy commands directly to clipboard
- 🌐 **Cloud-Powered** - n8n workflow + Gemini AI
- 🎭 **Skynet-Themed** - Terminator-inspired UI with floating system messages

---

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** (for frontend)
- **n8n cloud account** (free tier available)
- **Gemini API key** (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MohitSahoo/TerminAItor
   cd terminaitor
   ```

2. **Setup n8n workflow**
   - Follow the guide in `docs/N8N_WORKFLOW_SETUP.md`
   - Import `n8n-workflow.json` to your n8n cloud instance
   - Add your Gemini API key
   - Activate the workflow

3. **Configure frontend**
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   ```
   
   Edit `.env` and add your n8n webhook URL:
   ```
   VITE_API_URL=https://your-instance.app.n8n.cloud/webhook/autocomplete
   ```

4. **Run the application**
   ```bash
   npm run dev
   ```
   
   Open `http://localhost:3000` in your browser

---

## 📖 Usage Examples

### Partial Commands
**Input:** `git push`

**Output:**
```bash
git push origin main # push to main branch
git push -u origin feature-branch # push and set upstream
git push --force-with-lease # safely force push
```

### Natural Language
**Input:** `find all large files`

**Output:**
```bash
find . -type f -size +100M # find files larger than 100MB
du -ah . | sort -rh | head -20 # show top 20 largest files/folders
find . -type f -exec ls -lh {} \; | sort -k5 -rh | head -10 # list 10 largest files
```

### Task Descriptions
**Input:** `compress folder`

**Output:**
```bash
tar -czf archive.tar.gz folder/ # create gzip compressed archive
zip -r archive.zip folder/ # create zip archive
tar -cjf archive.tar.bz2 folder/ # create bzip2 compressed archive
```

---

## 🎯 Supported Commands

- **Git Operations** - push, pull, commit, branch, merge
- **File Management** - find, grep, sed, awk, ls, cp, mv
- **Docker/Containers** - run, ps, exec, logs, compose
- **System Monitoring** - top, ps, free, df, htop
- **Network Utilities** - curl, wget, ping, netstat, ssh
- **Package Management** - apt, yum, brew, npm, pip
- **Compression** - tar, zip, gzip, bzip2
- **Process Management** - kill, pkill, killall
- **SSH & Remote** - ssh, scp, rsync

See `docs/COMMAND_EXAMPLES.md` for 50+ detailed examples.

---

## 🏗️ Architecture

```
┌─────────────┐      ┌──────────┐      ┌─────────────┐      ┌──────────┐
│   React     │─────▶│   n8n    │─────▶│   Gemini    │─────▶│ Response │
│  Frontend   │      │ Workflow │      │     API     │      │  Parser  │
└─────────────┘      └──────────┘      └─────────────┘      └──────────┘
     ▲                                                              │
     └──────────────────────────────────────────────────────────────┘
```

1. User types command/description
2. Frontend sends request to n8n webhook
3. n8n constructs prompt for Gemini
4. Gemini generates 3 command suggestions
5. n8n parses and formats response
6. Frontend displays suggestions with explanations

---

## 🎨 UI Features

- **CRT Monitor Effects** - Authentic retro terminal look
- **Scanline Animation** - Moving scanline across screen
- **Matrix Rain** - Floating Skynet-themed messages
- **Grid Background** - Animated perspective grid
- **Glowing Elements** - Pulsing buttons and borders
- **Responsive Design** - Works on desktop and mobile

---

## 📁 Project Structure

```
terminaitor/
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Main React component
│   │   ├── App.css          # Cyberpunk styling
│   │   └── main.jsx         # Entry point
│   ├── public/
│   │   └── favicon.svg      # TerminAItor icon
│   ├── package.json
│   └── vite.config.js
├── docs/
│   ├── N8N_WORKFLOW_SETUP.md    # n8n setup guide
│   ├── COMMAND_EXAMPLES.md      # Usage examples
│   └── DEPLOYMENT.md            # Deployment guide
├── n8n-workflow.json        # n8n workflow export
├── README.md
└── .gitignore
```

---

## 🔧 Configuration

### Environment Variables

Create `frontend/.env`:
```bash
VITE_API_URL=https://your-instance.app.n8n.cloud/webhook/autocomplete
```

### n8n Workflow

The workflow consists of 5 nodes:
1. **Webhook** - Receives POST requests
2. **Construct Prompt** - Builds Gemini prompt
3. **Gemini API** - Calls AI model
4. **Parse Response** - Extracts suggestions
5. **Respond to Webhook** - Returns JSON

---

## 🚢 Deployment

See `docs/DEPLOYMENT.md` for detailed deployment instructions for:
- Vercel (Frontend)
- Netlify (Frontend)
- n8n Cloud (Backend)
- Custom VPS

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

---

## 👨‍💻 Author

**Mohit Sahoo**
- GitHub: [@MohitSahoo](https://github.com/MohitSahoo)
- Made with `sudo npm install coffee --save-dev` ☕

---

## 🙏 Acknowledgments

- Powered by Google's Gemini AI
- Built with n8n workflow automation
- Styled with cyberpunk terminal aesthetics

---
