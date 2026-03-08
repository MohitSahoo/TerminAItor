const fetch = require('node-fetch');
const Conf = require('conf');

const config = new Conf({ projectName: 'terminaitor' });

async function callN8N(input, mode = 'generate') {
  const webhookUrl = config.get('webhookUrl') || process.env.N8N_WEBHOOK_URL;

  if (!webhookUrl) {
    throw new Error(
      'No webhook URL set. Run: terminai config set-url <your-n8n-url>'
    );
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input, mode })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Handle the response format from n8n
    if (data.suggestions && Array.isArray(data.suggestions)) {
      // Return first suggestion parsed
      const firstSuggestion = data.suggestions[0];
      const [command, explanation] = firstSuggestion.split('#').map(s => s.trim());
      return {
        command: command || firstSuggestion,
        explanation: explanation || 'AI-generated command',
        allSuggestions: data.suggestions
      };
    }

    return data;
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      throw new Error('Cannot connect to n8n webhook. Is the workflow active?');
    }
    throw error;
  }
}

module.exports = { callN8N };
