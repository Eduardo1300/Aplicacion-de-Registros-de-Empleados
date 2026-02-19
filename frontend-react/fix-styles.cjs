const fs = require('fs');
const path = require('path');

const replacements = [
  // Purple gradient
  [/style="background: linear-gradient\(135deg, #667eea 0%, #764ba2 100%\); box-shadow: 0 [0-9]+px [0-9]+px rgba\(102, 126, 234, [0-9.]+\);"/g, 'className="bg-gradient-purple shadow-gradient-purple"'],
  [/style="background: linear-gradient\(135deg, #667eea 0%, #764ba2 100%\);"/g, 'className="bg-gradient-purple"'],
  
  // Green gradient
  [/style="background: linear-gradient\(135deg, #10b981 0%, #059669 100%\); box-shadow: 0 [0-9]+px [0-9]+px rgba\(16, 185, 129, [0-9.]+\);"/g, 'className="bg-gradient-green shadow-gradient-green"'],
  [/style="background: linear-gradient\(135deg, #10b981 0%, #059669 100%\);"/g, 'className="bg-gradient-green"'],
  
  // Yellow gradient
  [/style="background: linear-gradient\(135deg, #f59e0b 0%, #d97706 100%\); box-shadow: 0 [0-9]+px [0-9]+px rgba\(245, 158, 11, [0-9.]+\);"/g, 'className="bg-gradient-yellow shadow-gradient-yellow"'],
  [/style="background: linear-gradient\(135deg, #f59e0b 0%, #d97706 100%\);"/g, 'className="bg-gradient-yellow"'],
  
  // Blue gradient
  [/style="background: linear-gradient\(135deg, #3b82f6 0%, #2563eb 100%\); box-shadow: 0 [0-9]+px [0-9]+px rgba\(59, 130, 246, [0-9.]+\);"/g, 'className="bg-gradient-blue shadow-gradient-blue"'],
  [/style="background: linear-gradient\(135deg, #3b82f6 0%, #2563eb 100%\);"/g, 'className="bg-gradient-blue"'],
  
  // Indigo gradient
  [/style="background: linear-gradient\(135deg, #6366f1 0%, #4f46e5 100%\); box-shadow: 0 [0-9]+px [0-9]+px rgba\(99, 102, 241, [0-9.]+\);"/g, 'className="bg-gradient-indigo shadow-gradient-blue"'],
  [/style="background: linear-gradient\(135deg, #6366f1 0%, #4f46e5 100%\);"/g, 'className="bg-gradient-indigo"'],
  
  // Red gradient
  [/style="background: linear-gradient\(135deg, #ef4444 0%, #dc2626 100%\);"/g, 'className="bg-gradient-red"'],
  
  // Simple backgrounds
  [/style="background: #e5e7eb;"/g, 'className="bg-gray-200"'],
  [/style="background: #f1f5f9;"/g, 'className="bg-gray-100"'],
  
  // RGBA backgrounds
  [/style="background: rgba\(102, 126, 234, 0\.1\);"/g, 'className="bg-purple-100"'],
  [/style="background: rgba\(16, 185, 129, 0\.1\);"/g, 'className="bg-green-100"'],
  [/style="background: rgba\(245, 158, 11, 0\.1\);"/g, 'className="bg-yellow-100"'],
  [/style="background: rgba\(59, 130, 246, 0\.1\);"/g, 'className="bg-blue-100"'],
];

function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    
    for (const [regex, replacement] of replacements) {
      content = content.replace(regex, replacement);
    }
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated: ${filePath}`);
    }
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err.message);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.jsx')) {
      processFile(filePath);
    }
  }
}

const viewsDir = path.join(__dirname, 'src', 'views');
walkDir(viewsDir);
console.log('Done!');
