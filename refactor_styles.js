const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./frontend/src', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Backgrounds
    content = content.replace(/bg-slate-50 dark:bg-slate-900/g, 'bg-canvas');
    content = content.replace(/bg-white dark:bg-slate-800/g, 'bg-surface');
    content = content.replace(/bg-slate-50 dark:bg-slate-800/g, 'bg-surface');
    content = content.replace(/bg-slate-50/g, 'bg-surface');
    content = content.replace(/bg-white/g, 'bg-surface');
    content = content.replace(/dark:bg-slate-900\/50/g, 'bg-surface');
    content = content.replace(/dark:bg-slate-900/g, 'bg-canvas');
    content = content.replace(/dark:bg-slate-800/g, 'bg-surface');
    
    // Borders
    content = content.replace(/border-slate-100 dark:border-slate-800/g, 'border-divider');
    content = content.replace(/border-slate-100 dark:border-slate-700/g, 'border-divider');
    content = content.replace(/border-slate-200 dark:border-slate-700/g, 'border-divider');
    content = content.replace(/border-slate-100/g, 'border-divider');
    content = content.replace(/border-slate-200/g, 'border-divider');
    content = content.replace(/dark:border-slate-800/g, 'border-divider');
    content = content.replace(/dark:border-slate-700/g, 'border-divider');
    
    // Text Primary
    content = content.replace(/text-slate-800 dark:text-slate-100/g, 'text-primary');
    content = content.replace(/text-slate-700 dark:text-slate-300/g, 'text-primary');
    content = content.replace(/text-slate-800/g, 'text-primary');
    content = content.replace(/text-slate-700/g, 'text-primary');
    content = content.replace(/dark:text-slate-100/g, 'text-primary');
    
    // Text Secondary
    content = content.replace(/text-slate-600 dark:text-slate-400/g, 'text-secondary');
    content = content.replace(/text-slate-500 dark:text-slate-400/g, 'text-secondary');
    content = content.replace(/text-slate-600 dark:text-slate-300/g, 'text-secondary');
    content = content.replace(/text-slate-600/g, 'text-secondary');
    content = content.replace(/text-slate-500/g, 'text-secondary');
    content = content.replace(/text-slate-400/g, 'text-secondary');
    content = content.replace(/dark:text-slate-400/g, 'text-secondary');
    content = content.replace(/dark:text-slate-300/g, 'text-secondary');
    
    // Shadows -> Removed for clean flat look
    content = content.replace(/shadow-xl/g, 'shadow-none');
    content = content.replace(/shadow-lg/g, 'shadow-none');
    content = content.replace(/shadow-md/g, 'shadow-none');
    content = content.replace(/shadow-sm/g, 'shadow-none');
    
    // Buttons / Accents
    content = content.replace(/bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600/g, 'bg-brand hover:opacity-90 text-white');
    content = content.replace(/bg-indigo-600 hover:bg-indigo-700/g, 'bg-brand hover:opacity-90 text-white');
    content = content.replace(/text-indigo-600 dark:text-indigo-500/g, 'text-brand');
    content = content.replace(/text-indigo-600/g, 'text-brand');
    
    // Ensure all Cards have border
    content = content.replace(/border-0/g, 'border border-divider');

    fs.writeFileSync(filePath, content, 'utf8');
  }
});

console.log('Refactoring completed successfully!');
