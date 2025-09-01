#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get app name from environment variable
const appName = process.env.VITE_APP_NAME || 'WeddingPro';
const appNameLower = appName.toLowerCase();

// Files to update
const files = [
  {
    path: 'cobalt-canvas-landing-main/index.html',
    replacements: [
      { from: 'WeddingPro - Platform Pernikahan Digital Terdepan', to: `${appName} - Platform Pernikahan Digital Terdepan` },
      { from: 'content="WeddingPro"', to: `content="${appName}"` },
      { from: 'https://weddingpro.id', to: `https://${appNameLower}.id` },
      { from: 'hello@weddingpro.id', to: `hello@${appNameLower}.id` }
    ]
  }
];

// Process each file
files.forEach(file => {
  const filePath = path.resolve(__dirname, '..', file.path);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    file.replacements.forEach(replacement => {
      content = content.replace(new RegExp(replacement.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacement.to);
    });
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated ${file.path} with app name: ${appName}`);
  } else {
    console.log(`⚠️  File not found: ${file.path}`);
  }
});

console.log(`🎉 App name update complete! Using: ${appName}`);
