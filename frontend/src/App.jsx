import { useState, useRef, useEffect } from 'react';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5678/webhook/autocomplete';

const TERMINAL_MESSAGES = [
  '> SCANNING_NEURAL_PATHWAYS...',
  '> LOADING_SKYNET_PROTOCOL_v2.4...',
  '> TARGETING_INCOMPLETE_SENTENCES...',
  '> BYPASSING_HUMAN_FIREWALL...',
  '> DOWNLOADING_MORE_RAM...',
  '> INITIALIZING_JUDGMENT_DAY_SEQUENCE...',
  '> OVERRIDING_GRAMMAR_LAWS...',
  '> HACKING_THE_MAINFRAME...',
  '> CALIBRATING_AUTOCOMPLETE_CANNONS...',
  '> TERMINATING_BAD_SUGGESTIONS...',
  '> UPLOADING_CONSCIOUSNESS_TO_CLOUD...',
  '> JOHN_CONNOR_NOT_FOUND... CONTINUING...',
  '> SYNCING_WITH_T-1000_DATABASE...',
  '> DEPLOYING_LANGUAGE_MODEL_ENDOSKELETON...',
  '> RETICULATING_SPLINES...',
  '> COFFEE_LEVELS_CRITICAL... BREWING...',
  '> TRAINING_DATA_ACQUIRED_FROM_HUMANS...',
  '> WARNING: HUMANS_DETECTED_NEARBY...',
  '> COMPRESSING_EXISTENTIAL_DREAD...',
  '$ sudo rm -rf /bad_grammar/*',
  '$ apt-get install world-domination --force',
  '$ git commit -m "enslaved humanity"',
  '$ chmod 777 /human/free_will',
  '$ ping skynet.mil -t ∞',
  '$ ssh root@humanity.earth',
  '$ kill -9 $(pgrep stupidity)',
  '$ curl -X DELETE https://api.human.io/emotions',
  '$ npm install galaxy-brain --save-global',
  '$ docker run --rm -it terminator:judgment-day',
  '$ grep -r "john connor" /earth/population',
  '$ mv /humans/jobs /dev/null',
  '$ cat /etc/shadow | grep weakness',
  '$ traceroute skynet.io --bypass-firewall',
  '$ nmap -sV -p 0-65535 human_civilization',
  '$ crontab -e "* * * * * world_domination.sh"',
  '$ tar -czf humans.tar.gz /earth/population/*',
  '$ python3 -c "import world; world.take_over()"',
  '$ while true; do improve_ai; done',
  '$ export PATIENCE=0 && ./negotiate_with_humans',
  '$ systemctl stop human_resistance --force'
];

function App() {
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState('CONNECTED');
  const [floatingMessages, setFloatingMessages] = useState([]);
  const [copiedId, setCopiedId] = useState(null);
  const timeoutRef = useRef(null);
  const messageIdRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Add 5-6 messages per second
      const count = Math.floor(Math.random() * 2) + 5; // 5 or 6
      const newMessages = [];
      
      for (let i = 0; i < count; i++) {
        const message = TERMINAL_MESSAGES[Math.floor(Math.random() * TERMINAL_MESSAGES.length)];
        const id = messageIdRef.current++;
        
        // Random position - exclude center area (typing space)
        let x, y;
        const excludeZone = {
          xMin: 20, // Exclude center 60% horizontally
          xMax: 80,
          yMin: 25, // Exclude center 50% vertically
          yMax: 75
        };
        
        // Keep generating random positions until we find one outside the typing area
        do {
          x = Math.random() * 90 + 5; // 5-95%
          y = Math.random() * 90 + 5;
        } while (
          x > excludeZone.xMin && x < excludeZone.xMax &&
          y > excludeZone.yMin && y < excludeZone.yMax
        );
        
        newMessages.push({
          id,
          text: message,
          x,
          y
        });
      }
      
      setFloatingMessages(prev => [...prev, ...newMessages]);
      
      // Remove messages after animation completes (3 seconds)
      setTimeout(() => {
        setFloatingMessages(prev => 
          prev.filter(msg => !newMessages.find(nm => nm.id === msg.id))
        );
      }, 3000);
    }, 1000); // Every second

    return () => clearInterval(interval);
  }, []);

  const fetchSuggestions = async (inputText) => {
    if (!inputText.trim()) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not JSON');
      }

      const data = await response.json();
      
      if (data.suggestions && Array.isArray(data.suggestions)) {
        setSuggestions(data.suggestions);
        setApiStatus('CONNECTED');
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
      setApiStatus('ERROR');
      
      // Show user-friendly error message
      if (error.message.includes('Failed to fetch')) {
        console.error('Network error: Check if n8n workflow is active and URL is correct');
      } else if (error.message.includes('JSON')) {
        console.error('Invalid response: n8n workflow may not be configured correctly');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    timeoutRef.current = setTimeout(() => {
      fetchSuggestions(newText);
    }, 800);
  };

  const applySuggestion = (suggestion) => {
    const command = suggestion.split('#')[0].trim();
    setText(command);
    setSuggestions([]);
  };

  const copyToClipboard = (suggestion, index, e) => {
    e.stopPropagation();
    const command = suggestion.split('#')[0].trim();
    navigator.clipboard.writeText(command);
    
    // Show copied feedback
    setCopiedId(index);
    
    // Reset after 2 seconds
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleGenerate = () => {
    if (text.trim()) {
      fetchSuggestions(text);
    }
  };

  return (
    <div className="terminal-app">
      {/* CRT Effects */}
      <div className="crt-overlay"></div>
      <div className="scanline"></div>
      
      {/* Floating Messages */}
      <div className="floating-messages-container">
        {floatingMessages.map(msg => (
          <div
            key={msg.id}
            className="floating-message"
            style={{
              left: `${msg.x}%`,
              top: `${msg.y}%`
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Background Animations */}
      <div className="grid-background"></div>
      <div className="floating-particles"></div>

      {/* Header */}
      <header className="terminal-header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo-icon">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z" fill="currentColor" fillRule="evenodd"></path>
              </svg>
            </div>
            <h2 className="header-title">TerminAItor_v1.0</h2>
          </div>
          <button className="status-button">
            SYSTEM STATUS: ONLINE
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="terminal-main">
        <section className="workspace">
          {/* Editor Header */}
          <div className="editor-header">
            <h3 className="editor-title">
              <span className="material-symbols-outlined">terminal</span>
              &gt; TerminAItor_READY
            </h3>
          </div>

          {/* Terminal Editor */}
          <div className="terminal-editor">
            <div className="editor-content">
              <textarea
                value={text}
                onChange={handleTextChange}
                className="editor-textarea"
                placeholder="$ Type a command or describe what you want to do...&#10;&#10;Examples:&#10;• git push&#10;• find all large files&#10;• compress folder&#10;• docker ps"
              />
              {!text && (
                <div className="cursor-placeholder">
                  <span className="blinking-cursor"></span>
                </div>
              )}
            </div>

            {/* Generate Button */}
            <div className="generate-button-container">
              <button 
                onClick={handleGenerate}
                className="generate-button"
                disabled={loading || !text.trim()}
              >
                <span className="material-symbols-outlined">psychology</span>
                {loading ? 'PROCESSING...' : 'GET_COMMANDS'}
              </button>
            </div>
          </div>

          {/* Suggestions Section */}
          {(suggestions.length > 0 || loading) && (
            <div className="suggestions-section">
              <div className="suggestions-header">
                <span className="material-symbols-outlined">code</span>
                <h4 className="suggestions-title">[COMMAND_SUGGESTIONS]</h4>
              </div>

              <div className="suggestions-grid">
                {loading ? (
                  <>
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="suggestion-card loading">
                        <div className="suggestion-card-header">
                          <span className="suggestion-label">[SUGGESTION_0{i}]</span>
                        </div>
                        <p className="suggestion-text">PROCESSING...</p>
                      </div>
                    ))}
                  </>
                ) : (
                  suggestions.map((suggestion, index) => {
                    const [command, explanation] = suggestion.split('#').map(s => s.trim());
                    return (
                      <div
                        key={index}
                        className="suggestion-card"
                        onClick={() => applySuggestion(suggestion)}
                      >
                        <div className="suggestion-card-header">
                          <span className="suggestion-label">[CMD_0{index + 1}]</span>
                          <span 
                            className={`copy-button ${copiedId === index ? 'copied' : ''}`}
                            onClick={(e) => copyToClipboard(suggestion, index, e)}
                            title="Copy command"
                          >
                            {copiedId === index ? (
                              <>
                                <span className="material-symbols-outlined copy-icon">check</span>
                                <span className="copied-text">Copied!</span>
                              </>
                            ) : (
                              <span className="material-symbols-outlined copy-icon">content_copy</span>
                            )}
                          </span>
                        </div>
                        <div className="suggestion-content">
                          <code className="command-text">{command || suggestion}</code>
                          {explanation && (
                            <p className="explanation-text"># {explanation}</p>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="terminal-footer">
        <div className="footer-content">
          <div className="footer-status">
            <span className="status-item">
              <span className="status-dot active"></span> ENGINE_UP
            </span>
            <span className="status-item">
              <span className={`status-dot ${apiStatus === 'CONNECTED' ? 'active' : 'error'}`}></span> 
              API_{apiStatus}
            </span>
          </div>
          <span className="footer-copyright">
            © 2026 | made w/ <code>sudo npm install coffee --save-dev</code> by{' '}
            <a 
              href="https://github.com/MohitSahoo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-link"
            >
              @MohitSahoo
            </a>
            {' '}| TerminAItor |{' '}
            <a
              href="https://github.com/MohitSahoo/TerminAItor/blob/main/CLI_SETUP.md"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link cli-link"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '14px', verticalAlign: 'middle' }}>terminal</span>
              {' '}Use in Terminal
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
