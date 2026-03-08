# TerminAItor 🤖⚡

AI-powered terminal command assistant that generates intelligent command suggestions in real-time. Type a partial command or describe what you want to do, and get three expert-level terminal commands with explanations.

**Built with:** React + Vite, n8n workflow orchestration, and Gemini AI

![Terminal Theme](https://img.shields.io/badge/theme-cyberpunk-FFD700)
![Status](https://img.shields.io/badge/status-online-00FF00)
![AI](https://img.shields.io/badge/AI-Gemini-4285F4)

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
   git clone <your-repo-url>
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
