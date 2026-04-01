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

// Write marketplace README
fs.writeFileSync(readmePath, marketplaceReadme);
console.log('✓ Generated marketplace README.md');
console.log('  - Extracted content between MARKETPLACE markers');
