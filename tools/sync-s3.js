#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const { glob } = require('glob');

// Configuration
const BUCKET_NAME = process.env.KNOWLEDGE_S3_BUCKET || process.env.S3_BUCKET;
const AWS_PROFILE = process.env.AWS_PROFILE;
const DRY_RUN = process.argv.includes('--dry-run');

function checkRequirements() {
  if (!BUCKET_NAME) {
    console.error('❌ S3 bucket name not specified!');
    console.error('   Set KNOWLEDGE_S3_BUCKET or S3_BUCKET environment variable');
    process.exit(1);
  }

  try {
    execSync('aws --version', { stdio: 'ignore' });
  } catch (error) {
    console.error('❌ AWS CLI not found!');
    console.error('   Please install AWS CLI: https://aws.amazon.com/cli/');
    process.exit(1);
  }
}

async function getFilesToSync() {
  const gamesDir = path.join(__dirname, '..', 'games');
  
  if (!await fs.pathExists(gamesDir)) {
    console.error('❌ Games directory not found!');
    process.exit(1);
  }

  // Get all markdown files
  const mdFiles = await glob('**/*.md', { cwd: gamesDir });
  
  if (mdFiles.length === 0) {
    console.warn('⚠️  No markdown files found to sync');
    return [];
  }

  const files = [];
  for (const file of mdFiles) {
    const fullPath = path.join(gamesDir, file);
    const stats = await fs.stat(fullPath);
    const content = await fs.readFile(fullPath, 'utf8');
    
    // Skip empty files
    if (content.trim().length === 0) {
      console.warn(`⚠️  Skipping empty file: ${file}`);
      continue;
    }

    files.push({
      localPath: fullPath,
      s3Key: `games/${file}`,
      size: stats.size,
      tokens: Math.ceil(content.length / 4) // rough estimate
    });
  }

  return files;
}

function formatBytes(bytes) {
  const sizes = ['B', 'KB', 'MB'];
  if (bytes === 0) return '0 B';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}

async function syncToS3(files) {
  const profileFlag = AWS_PROFILE ? `--profile ${AWS_PROFILE}` : '';
  const dryRunFlag = DRY_RUN ? '--dryrun' : '';
  
  console.log(`\n📤 Syncing to S3 bucket: ${BUCKET_NAME}`);
  if (AWS_PROFILE) {
    console.log(`🔑 Using AWS profile: ${AWS_PROFILE}`);
  }
  if (DRY_RUN) {
    console.log('🧪 DRY RUN - No files will be uploaded');
  }

  const gamesDir = path.join(__dirname, '..', 'games');
  
  try {
    const command = [
      'aws s3 sync',
      `"${gamesDir}"`,
      `s3://${BUCKET_NAME}/games/`,
      '--delete', // Remove files that no longer exist locally
      '--exclude "*"', // Exclude everything first
      '--include "*.md"', // Then include only markdown files
      profileFlag,
      dryRunFlag
    ].filter(Boolean).join(' ');

    console.log(`\n🚀 Running: ${command}\n`);
    
    const output = execSync(command, { 
      encoding: 'utf8',
      stdio: 'pipe'
    });
    
    if (output.trim()) {
      console.log(output);
    } else if (!DRY_RUN) {
      console.log('✅ No changes needed - all files are up to date');
    }
    
  } catch (error) {
    console.error('❌ Sync failed:', error.message);
    if (error.stdout) console.log('STDOUT:', error.stdout);
    if (error.stderr) console.error('STDERR:', error.stderr);
    process.exit(1);
  }
}

async function main() {
  console.log('📦 Board Game Knowledge S3 Sync');
  console.log('=================================');
  
  checkRequirements();
  
  const files = await getFilesToSync();
  
  if (files.length === 0) {
    console.log('📝 No files to sync.');
    return;
  }

  // Show summary
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  const totalTokens = files.reduce((sum, file) => sum + file.tokens, 0);
  
  console.log(`\n📊 Sync Summary:`);
  console.log(`   Files to sync: ${files.length}`);
  console.log(`   Total size: ${formatBytes(totalSize)}`);
  console.log(`   Estimated tokens: ~${totalTokens.toLocaleString()}`);
  console.log(`   Target bucket: s3://${BUCKET_NAME}/games/`);

  // Show file breakdown by game
  const gameFiles = {};
  files.forEach(file => {
    const gameName = file.s3Key.split('/')[1]; // games/nemesis/file.md -> nemesis
    if (!gameFiles[gameName]) gameFiles[gameName] = [];
    gameFiles[gameName].push(file);
  });

  console.log(`\n🎲 Files by game:`);
  Object.entries(gameFiles).forEach(([game, gameFileList]) => {
    const gameTokens = gameFileList.reduce((sum, f) => sum + f.tokens, 0);
    console.log(`   ${game}: ${gameFileList.length} files (~${gameTokens} tokens)`);
  });

  await syncToS3(files);
  
  if (!DRY_RUN) {
    console.log('\n✅ Sync completed successfully!');
    console.log('💡 Your RAG system should now have the latest knowledge base');
  } else {
    console.log('\n🧪 Dry run completed - add --sync flag to actually upload');
  }
}

// Handle command line arguments
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
Board Game Knowledge S3 Sync Tool

Usage: node tools/sync-s3.js [options]

Options:
  --dry-run    Show what would be synced without uploading
  --help, -h   Show this help message

Environment Variables:
  KNOWLEDGE_S3_BUCKET  S3 bucket name (required)
  S3_BUCKET           Alternative bucket name variable
  AWS_PROFILE         AWS profile to use (optional)

Examples:
  KNOWLEDGE_S3_BUCKET=my-rag-bucket node tools/sync-s3.js
  KNOWLEDGE_S3_BUCKET=my-rag-bucket node tools/sync-s3.js --dry-run
  AWS_PROFILE=myprofile KNOWLEDGE_S3_BUCKET=my-bucket node tools/sync-s3.js
`);
  process.exit(0);
}

main().catch(console.error);
