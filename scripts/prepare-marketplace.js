#!/usr/bin/env node

/**
 * Pre-publish script to generate marketplace-ready README
 * Extracts content between MARKETPLACE-START and MARKETPLACE-END markers
 */

const fs = require('fs');
const path = require('path');

const readmePath = path.join(__dirname, '..', 'README.md');
const backupPath = path.join(__dirname, '..', '.README.full.md');

// Read the full README
const readmeContent = fs.readFileSync(readmePath, 'utf8');

// Create backup of full README
fs.writeFileSync(backupPath, readmeContent);
console.log('✓ Created backup: .README.full.md');

// Extract marketplace content
const marketplaceMatch = readmeContent.match(
  /<!-- MARKETPLACE-START -->([\s\S]*?)<!-- MARKETPLACE-END -->/
);

if (!marketplaceMatch) {
  console.error('❌ Error: MARKETPLACE-START/MARKETPLACE-END markers not found in README.md');
  process.exit(1);
}

let marketplaceReadme = marketplaceMatch[1].trim();

// Add header and footer
marketplaceReadme = `# Nostromo Theme Pack

A retro-futuristic VS Code theme pack featuring four meticulously crafted variants, inspired by the Nostromo spacecraft UI from the 1979 film _Alien_.

[![Version](https://img.shields.io/visual-studio-marketplace/v/grikomsn.nostromo-theme-pack)](https://marketplace.visualstudio.com/items?itemName=grikomsn.nostromo-theme-pack)
[![Downloads](https://img.shields.io/visual-studio-marketplace/d/grikomsn.nostromo-theme-pack)](https://marketplace.visualstudio.com/items?itemName=grikomsn.nostromo-theme-pack)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

${marketplaceReadme}

---

📖 **[Full Documentation](https://github.com/grikomsn/vscode-nostromo-theme#readme)** • 
🐛 **[Report Issues](https://github.com/grikomsn/vscode-nostromo-theme/issues)**
`;

// Write marketplace README
fs.writeFileSync(readmePath, marketplaceReadme);
console.log('✓ Generated marketplace README.md');
console.log('  - Extracted content between MARKETPLACE markers');
console.log('  - Added shields badges');
console.log('  - Added documentation links');
