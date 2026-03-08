# TerminAItor CLI Setup Guide

Get AI-powered command suggestions directly in your terminal.

---

## Quick Install

```bash
npm install -g terminaitor
```

---

## Setup (One-Time)

Configure your n8n webhook URL:

```bash
terminai config set-url https://tooez4mohit.app.n8n.cloud/webhook/autocomplete
```

---

## Usage

### Generate Commands

Describe what you want to do in plain English:

```bash
terminai "find all files larger than 100MB"
terminai "kill process on port 3000"
terminai "compress folder into tar.gz"
terminai "git push to main branch"
```

### Explain Commands

Understand what a command does:

```bash
terminai explain "chmod 755 file.txt"
terminai explain "docker ps -a"
terminai explain "tar -czf archive.tar.gz folder/"
```

### Interactive Mode

Start a chat-like session:

```bash
terminai
```

Then type tasks or commands to explain. Type `exit` to quit.

---

## Examples

### Example 1: Find Large Files

```bash
$ terminai "find large files"

  Task:     find large files
  Command:  find . -type f -size +100M
  What:     find files larger than 100MB in current directory

  ? What do you want to do?
    ❯ Copy to clipboard
      Run command
      Show explanation
      Cancel
```

### Example 2: Docker Commands

```bash
$ terminai "list all docker containers"

  Task:     list all docker containers
  Command:  docker ps -a
  What:     show all containers including stopped ones

  ? What do you want to do?
    ❯ Copy to clipboard
      Run command
      Show explanation
      Cancel
```

### Example 3: Explain Mode

```bash
$ terminai explain "chmod 755"

  Command:     chmod 755
  Explanation: Sets file permissions to rwxr-xr-x
               Owner: read, write, execute
               Group: read, execute
               Others: read, execute
```

---

## Features

- 🎯 **Natural Language** - Describe tasks in plain English
- 🤖 **AI-Powered** - Uses Gemini AI for intelligent suggestions
- 🛡️ **Safety First** - Warns about dangerous commands
- 📋 **Copy or Run** - Copy to clipboard or execute directly
- 💡 **Explain Mode** - Understand what commands do
- 🎨 **Interactive REPL** - Chat-like interface

---

## Configuration

### Show Current Config

```bash
terminai config show
```

### Change Webhook URL

```bash
terminai config set-url <your-n8n-webhook-url>
```

### Config File Location

Settings are stored in:
- **macOS**: `~/Library/Preferences/terminaitor-nodejs/config.json`
- **Linux**: `~/.config/terminaitor-nodejs/config.json`
- **Windows**: `%APPDATA%\terminaitor-nodejs\Config\config.json`

---

## Safety Features

TerminAItor checks commands for dangerous patterns:

- ⚠️ `rm -rf /` - Prevents system deletion
- ⚠️ `dd if=/dev/zero` - Prevents disk wiping
- ⚠️ Fork bombs and malicious patterns
- ⚠️ Warns about `sudo` commands

When a dangerous command is detected, you'll see a warning and must confirm before running.

---

## Troubleshooting

### "No webhook URL set"

**Solution:**
```bash
terminai config set-url https://tooez4mohit.app.n8n.cloud/webhook/autocomplete
```

### "Cannot connect to n8n webhook"

**Possible causes:**
- n8n workflow is not active
- Wrong webhook URL
- No internet connection

**Solution:**
1. Check if n8n workflow is active (toggle ON in n8n dashboard)
2. Verify webhook URL: `terminai config show`
3. Test webhook with curl:
   ```bash
   curl -X POST https://tooez4mohit.app.n8n.cloud/webhook/autocomplete \
     -H "Content-Type: application/json" \
     -d '{"text": "test"}'
   ```

### Command not found: terminai

**Solution:**
```bash
# Reinstall globally
npm install -g terminaitor

# Check if it's installed
which terminai

# If still not found, check npm global bin path
npm config get prefix
# Add to PATH if needed
```

---

## Requirements

- Node.js 18 or higher
- npm (comes with Node.js)
- Internet connection
- Active n8n workflow with Gemini API

---

## Uninstall

```bash
npm uninstall -g terminaitor
```

---

## Updates

Check for updates:

```bash
npm outdated -g terminaitor
```

Update to latest version:

```bash
npm update -g terminaitor
```

---

## Links

- **npm Package**: https://www.npmjs.com/package/terminaitor
- **GitHub Repository**: https://github.com/MohitSahoo/TerminAItor
- **Web Version**: https://terminaitor.vercel.app
- **Report Issues**: https://github.com/MohitSahoo/TerminAItor/issues

---

## Support

Need help? 
- Check the [main README](README.md)
- Open an issue on [GitHub](https://github.com/MohitSahoo/TerminAItor/issues)
- Read the [CLI documentation](cli/README.md)

---

**Made with ☕ and `sudo npm install coffee --save-dev`**
