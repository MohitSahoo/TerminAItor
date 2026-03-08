const DANGEROUS = [
  'rm -rf /',
  'rm -rf /*',
  'rm -rf ~',
  'mkfs',
  'dd if=/dev/zero',
  ':(){ :|:& };:',
  'sudo rm -rf',
  'chmod -R 777 /',
  '> /dev/sda',
  'mv / /dev/null',
];

const RISKY_PATTERNS = [
  /rm\s+-rf\s+[~/]/,
  /sudo\s+rm/,
  /chmod\s+-R\s+777/,
  /dd\s+if=/,
  /mkfs/,
  /:\(\)/,
];

function isSafe(command) {
  const dangerous = DANGEROUS.find(d => command.includes(d));
  if (dangerous) {
    return { 
      ok: false, 
      reason: `Contains dangerous pattern: ${dangerous}` 
    };
  }

  const riskyPattern = RISKY_PATTERNS.find(pattern => pattern.test(command));
  if (riskyPattern) {
    return { 
      ok: false, 
      reason: 'Command matches a dangerous pattern' 
    };
  }

  if (command.includes('sudo') && !command.includes('sudo rm')) {
    return { 
      ok: true, 
      warning: 'This command requires sudo privileges' 
    };
  }

  return { ok: true };
}

module.exports = { isSafe };
