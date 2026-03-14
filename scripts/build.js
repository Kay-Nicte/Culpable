const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'www');

// Clean
if (fs.existsSync(OUT)) fs.rmSync(OUT, { recursive: true });
fs.mkdirSync(OUT, { recursive: true });

// Copy files/dirs
const toCopy = [
    'index.html', 'styles.css', 'i18n.js', 'game.js', 'sw.js',
    'manifest.json', 'chapters', 'minigames', 'icons'
];

function copyRecursive(src, dest) {
    const stat = fs.statSync(src);
    if (stat.isDirectory()) {
        fs.mkdirSync(dest, { recursive: true });
        for (const child of fs.readdirSync(src)) {
            copyRecursive(path.join(src, child), path.join(dest, child));
        }
    } else {
        fs.copyFileSync(src, dest);
    }
}

for (const item of toCopy) {
    const src = path.join(ROOT, item);
    const dest = path.join(OUT, item);
    if (fs.existsSync(src)) {
        copyRecursive(src, dest);
        console.log(`  ✓ ${item}`);
    }
}

// Register service worker in index.html
const indexPath = path.join(OUT, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');
if (!html.includes('serviceWorker')) {
    html = html.replace('</body>', `    <script>
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js');
        }
    </script>
</body>`);
    fs.writeFileSync(indexPath, html);
    console.log('  ✓ Service worker registered');
}

console.log(`\n  Build complete → www/`);
