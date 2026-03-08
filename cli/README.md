# TerminAItor CLI

![npm version](https://img.shields.io/npm/v/terminaitor)
![npm downloads](https://img.shields.io/npm/dm/terminaitor)
![License](https://img.shields.io/npm/l/terminaitor)

AI-powered terminal command assistant. Describe what you want, get the exact shell command.

## Features

- 🎯 **Natural Language** - Describe tasks in plain English
- 🤖 **AI-Powered** - Uses Gemini AI via n8n workflow
- 🛡️ **Safety First** - Warns about dangerous commands
- 📋 **Copy or Run** - Copy to clipboard or execute directly
- 💡 **Explain Mode** - Understand what commands do
- 🎨 **Interactive REPL** - Chat-like interface

## Install

```bash
npm install -g terminaitor
```

## Setup

Configure your n8n webhook URL (one-time setup):

```bash
terminai config set-url https://your-instance.app.n8n.cloud/webhook/autocomplete
```

## Usage

### Generate Commands

```bash
# Describe what you want to do
terminai "kill process on port 3000"
terminai "find all files larger than 100MB"
terminai "compress folder into tar.gz"
terminai "git push to main branch"
```

### Explain Commands

```bash
terminai explain "chmod 755 file.txt"
terminai explain "docker ps -a"
terminai explain "grep -r 'pattern' ."
```

### Interactive Mode

```bash
terminai
# Starts interactive REPL mode
# Type tasks or "explain <command>"
# Type "exit" to quit
```

### Configuration

```bash
# Show current configuration
terminai config show

# Set webhook URL
terminai config set-url <your-n8n-url>
```

## Examples

```bash
$ terminai "find all node_modules folders"

  Task:     find all node_modules folders
  Command:  find . -name "node_modules" -type d
  What:     recursively find all directories named node_modules

  ? What do you want to do?
    ❯ Copy to clipboard
      Run command
      Show explanation
      Cancel
```

```bash
$ terminai explain "tar -czf archive.tar.gz folder/"

  Command:     tar -czf archive.tar.gz folder/
  Explanation: Creates a gzip-compressed tar archive of the folder
               -c: create archive
               -z: compress with gzip
               -f: specify filename
```

## Safety Features

TerminAItor checks commands for dangerous patterns:

- `rm -rf /` - Prevents system deletion
- `dd if=/dev/zero` - Prevents disk wiping
- Fork bombs and other malicious patterns
- Warns about `sudo` commands

## Requirements

- Node.js 18 or higher
- Active n8n workflow with Gemini API
- Internet connection

## How It Works

1. You describe a task in natural language
2. CLI sends request to your n8n webhook
3. n8n calls Gemini AI to generate commands
4. CLI displays formatted results with safety checks
5. You choose to copy, run, or cancel

## Configuration File

Settings are stored in:
- **macOS**: `~/Library/Preferences/terminaitor-nodejs/config.json`
- **Linux**: `~/.config/terminaitor-nodejs/config.json`
- **Windows**: `%APPDATA%\terminaitor-nodejs\Config\config.json`

## Troubleshooting

### "No webhook URL set"
Run: `terminai config set-url <your-n8n-url>`

### "Cannot connect to n8n webhook"
- Check if your n8n workflow is active
- Verify the webhook URL is correct
- Test the webhook with curl

### Commands not working
- Ensure Gemini API key is configured in n8n
- Check n8n execution logs for errors
- Verify internet connection

## Development

```bash
# Clone the repo
git clone https://github.com/MohitSahoo/TerminAItor.git
cd TerminAItor/cli

# Install dependencies
npm install

# Link locally for testing
npm link

# Test the CLI
terminai "test command"

# Unlink when done
npm unlink
```

## Publishing Updates

```bash
# Bump version in package.json
npm version patch  # or minor, or major

# Publish to npm
npm publish
```

## License

MIT © [Mohit Sahoo](https://github.com/MohitSahoo)

## Links

- [GitHub Repository](https://github.com/MohitSahoo/TerminAItor)
- [Web Version](https://terminaitor.vercel.app)
- [Report Issues](https://github.com/MohitSahoo/TerminAItor/issues)

---

**Made with ☕ and `sudo npm install coffee --save-dev`**
