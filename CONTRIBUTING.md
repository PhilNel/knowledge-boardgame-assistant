# Contributing to Board Game Rules Knowledge Base

Thanks for helping build the best board game rules resource! Here's how to contribute:

## What We Need

- **Accurate rule documentation** for board games
- **Clear, structured markdown** that's easy to read
- **Source references** so we can verify information
- **Edge case clarifications** from BGG, FAQs, etc.

## How to Add a New Game

1. **Create a folder** in `games/` with your game's name (lowercase, use hyphens)
2. **Add markdown files** breaking down the rules into logical sections
3. **Include a README.md** in the game folder explaining what's covered
4. **Submit a pull request** with your changes

## Suggested File Structure

Look at the `nemesis/` folder for examples, but generally include a folder for each mechanic of your game. For example, the Nemesis rules include specific sections on how to setup the game and victory conditions.

**Note**: Every game is different! Use whatever structure makes sense for your game.

## Writing Guidelines

### Markdown Formatting

- Use `#` for main sections, `##` for subsections
- Bold important terms: **Action Points**, **Line of Sight**

### Be Clear and Specific

- Write for someone learning the game
- Include examples where helpful
- Explain edge cases and exceptions
- Cross-reference related rules

## Citation System

All rules must include citations using our structured reference format with double square brackets:

**Format**: `[[SOURCE-IDENTIFIER]]`

We will be using the Nemesis game as an example of how the citations work.

### Source Types:

- **R1** - Official Nemesis Rulebook
- **R2** - Official FAQ/Errata
- **BGG1** - BoardGameGeek community discussion if no official rule can be used to answer directly

### Examples:

- **Movement rule**: `[[R1-BASIC-ACTION]]` - Rulebook section on basic actions
- **FAQ clarification**: `[[R2-MOVEMENT]]` - Official FAQ about movement
- **Community resolution**: `[[BGG1-MOVEMENT]]` - BGG thread resolving ambiguity

### Why citations matter:

- Enables AI systems to provide source references in answers
- Allows verification of rule interpretations
- Helps contributors track where information comes from
- Supports automated validation of rule accuracy

## Tools

### Validation

Run `npm run validate` to check your markdown formatting.

## Git Workflow

1. Fork this repository
2. Create a branch for your game: `git checkout -b add-wingspan-rules`
3. Add your files and commit changes
4. Push and create a pull request
5. We'll review and merge!

## Review Process

- We check for accuracy and completeness
- Formatting should be consistent with existing games
- Source references must be included
- We may ask for clarifications or additional examples

## Tips

- Start small - you don't need to document everything at once
- Focus on the most confusing rules first
- Check BoardGameGeek for common questions and clarifications
- Ask in issues if you're unsure about structure or formatting
