#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { glob } = require('glob');

async function validateGame(gameDir) {
  const gameName = path.basename(gameDir);
  console.log(`\n🎲 Validating ${gameName}...`);
  
  let errors = [];
  let warnings = [];
  
  // Check if README.md exists
  const readmePath = path.join(gameDir, 'README.md');
  if (!await fs.pathExists(readmePath)) {
    errors.push('Missing README.md file');
  }
  
  // Get all markdown files in the game directory
  const mdFiles = await glob('**/*.md', { cwd: gameDir });
  
  if (mdFiles.length === 0) {
    errors.push('No markdown files found');
    return { errors, warnings };
  }
  
  // Check each markdown file
  for (const file of mdFiles) {
    const filePath = path.join(gameDir, file);
    const content = await fs.readFile(filePath, 'utf8');
    
    // Basic checks
    if (content.trim().length === 0) {
      warnings.push(`${file} is empty`);
      continue;
    }
    
    // Check for main heading
    if (!content.match(/^# .+/m)) {
      warnings.push(`${file} missing main heading (# Title)`);
    }
    
    // Check for source attribution (optional but recommended)
    if (!content.includes('**Source**') && !content.includes('> **Source**')) {
      warnings.push(`${file} missing source attribution`);
    }
    
    // Check for basic markdown structure
    const lines = content.split('\n');
    let hasContent = false;
    for (const line of lines) {
      if (line.trim() && !line.startsWith('#')) {
        hasContent = true;
        break;
      }
    }
    
    if (!hasContent) {
      warnings.push(`${file} appears to only have headings`);
    }
  }
  
  return { errors, warnings };
}

async function main() {
  console.log('🔍 Board Game Rules Validator');
  console.log('============================');
  
  const gamesDir = path.join(__dirname, '..', 'games');
  
  if (!await fs.pathExists(gamesDir)) {
    console.error('❌ Games directory not found!');
    process.exit(1);
  }
  
  const gameDirectories = await fs.readdir(gamesDir);
  const gameDirs = [];
  
  for (const dir of gameDirectories) {
    const fullPath = path.join(gamesDir, dir);
    const stat = await fs.stat(fullPath);
    if (stat.isDirectory()) {
      gameDirs.push(fullPath);
    }
  }
  
  if (gameDirs.length === 0) {
    console.log('📝 No games found to validate.');
    return;
  }
  
  let totalErrors = 0;
  let totalWarnings = 0;
  
  for (const gameDir of gameDirs) {
    const { errors, warnings } = await validateGame(gameDir);
    
    totalErrors += errors.length;
    totalWarnings += warnings.length;
    
    if (errors.length > 0) {
      console.log('  ❌ Errors:');
      errors.forEach(error => console.log(`    - ${error}`));
    }
    
    if (warnings.length > 0) {
      console.log('  ⚠️  Warnings:');
      warnings.forEach(warning => console.log(`    - ${warning}`));
    }
    
    if (errors.length === 0 && warnings.length === 0) {
      console.log('  ✅ All good!');
    }
  }
  
  console.log('\n📊 Summary:');
  console.log(`   Games validated: ${gameDirs.length}`);
  console.log(`   Total errors: ${totalErrors}`);
  console.log(`   Total warnings: ${totalWarnings}`);
  
  if (totalErrors > 0) {
    console.log('\n❌ Validation failed! Please fix the errors above.');
    process.exit(1);
  } else {
    console.log('\n✅ Validation passed!');
  }
}

main().catch(console.error); 