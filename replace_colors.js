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
    
    // Replace cyan with indigo
    content = content.replace(/cyan-50/g, 'indigo-50');
    content = content.replace(/cyan-100/g, 'indigo-100');
    content = content.replace(/cyan-200/g, 'indigo-200');
    content = content.replace(/cyan-300/g, 'indigo-300');
    content = content.replace(/cyan-400/g, 'indigo-400');
    content = content.replace(/cyan-500/g, 'indigo-500');
    content = content.replace(/cyan-600/g, 'indigo-600');
    content = content.replace(/cyan-700/g, 'indigo-700');
    content = content.replace(/cyan-800/g, 'indigo-800');
    content = content.replace(/cyan-900/g, 'indigo-900');
    
    // Replace orange with slate (for premium look) or emerald for money
    // Let's use slate for avatars/tags, and emerald for money.
    // In VehicleListing/VehicleDetails/AdminVehicleList, orange-500 is used for price.
    content = content.replace(/orange-500/g, 'emerald-600'); 
    
    // For tags/avatars using orange-100/200/600/900
    content = content.replace(/orange-100/g, 'slate-100');
    content = content.replace(/orange-200/g, 'slate-200');
    content = content.replace(/orange-600/g, 'slate-600');
    content = content.replace(/orange-800/g, 'slate-800');
    content = content.replace(/orange-900\/50/g, 'slate-800/50');
    
    fs.writeFileSync(filePath, content, 'utf8');
  }
});

console.log('Colors replaced successfully!');
