#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");
const { glob } = require("glob");

// Configuration for RAG optimization
const MIN_CHUNK_TOKENS = 150; // minimum tokens per chunk
const MAX_CHUNK_TOKENS = 900; // maximum tokens per chunk

// Rough token estimation: ~4 characters per token for English
function estimateTokens(text) {
  return Math.ceil(text.length / 4);
}

async function validateGame(gameDir) {
  const gameName = path.basename(gameDir);
  console.log(`\n🎲 Validating ${gameName}...`);

  let errors = [];
  let warnings = [];

  const mdFiles = await glob("**/*.md", { cwd: gameDir });

  if (mdFiles.length === 0) {
    errors.push("No markdown files found");
    return { errors, warnings };
  }

  for (const file of mdFiles) {
    const filePath = path.join(gameDir, file);
    const content = await fs.readFile(filePath, "utf8");

    const isEmpty = content.trim().length === 0;
    if (isEmpty) {
      warnings.push(`${file} is empty`);
      continue;
    }

    const mainHeadingMissing = !content.match(/^# .+/m);
    if (mainHeadingMissing) {
      warnings.push(`${file} missing main heading (# Title)`);
    }

    const fileTokens = estimateTokens(content);

    const isTooLarge = fileTokens > MAX_CHUNK_TOKENS;
    if (isTooLarge) {
      errors.push(
        `${file} is ~${fileTokens} tokens (should be ≤${MAX_CHUNK_TOKENS}). Consider splitting into separate files.`
      );
    }

    const isTooSmall =
      fileTokens < MIN_CHUNK_TOKENS && content.trim().length > 100;
    if (isTooSmall) {
      warnings.push(
        `${file} is ~${fileTokens} tokens (should be ≥${MIN_CHUNK_TOKENS}). Consider combining with related content.`
      );
    }
  }

  return { errors, warnings };
}

async function main() {
  console.log("🔍 Board Game Rules Validator (RAG Optimized)");
  console.log("===============================================");
  console.log(`📏 Chunk size: ${MIN_CHUNK_TOKENS}-${MAX_CHUNK_TOKENS} tokens`);

  const gamesDir = path.join(__dirname, "..", "games");

  if (!(await fs.pathExists(gamesDir))) {
    console.error("❌ Games directory not found!");
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
    console.log("📝 No games found to validate.");
    return;
  }

  let totalErrors = 0;
  let totalWarnings = 0;

  for (const gameDir of gameDirs) {
    const { errors, warnings } = await validateGame(gameDir);

    totalErrors += errors.length;
    totalWarnings += warnings.length;

    if (errors.length > 0) {
      console.log("  ❌ Errors:");
      errors.forEach((error) => console.log(`    - ${error}`));
    }

    if (warnings.length > 0) {
      console.log("  ⚠️  Warnings:");
      warnings.forEach((warning) => console.log(`    - ${warning}`));
    }

    if (errors.length === 0 && warnings.length === 0) {
      console.log("  ✅ All good!");
    }
  }

  console.log("\n📊 Summary:");
  console.log(`   Games validated: ${gameDirs.length}`);
  console.log(`   Total errors: ${totalErrors}`);
  console.log(`   Total warnings: ${totalWarnings}`);

  if (totalErrors > 0) {
    console.log("\n❌ Validation failed! Please fix the errors above.");
    console.log("\n💡 RAG Optimization Tips:");
    console.log("   • Split large files into focused, single-topic files");
    console.log(
      `   • Keep each file between ${MIN_CHUNK_TOKENS}-${MAX_CHUNK_TOKENS} tokens (~${MIN_CHUNK_TOKENS * 4}-${MAX_CHUNK_TOKENS * 4} characters)`
    );
    console.log("   • Use descriptive filenames that match common questions");
    console.log("   • Each file should cover one specific rule or concept");
    process.exit(1);
  } else {
    console.log("\n✅ Validation passed!");
  }
}

main().catch(console.error);
