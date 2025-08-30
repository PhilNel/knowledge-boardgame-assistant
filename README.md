# Board Game Rules Knowledge Base

A community-driven, open-source repository of structured board game rules in markdown format. This knowledge base is designed to power AI assistants that can provide accurate rule clarifications during gameplay.

## Project Goals

- **Structured Knowledge**: Break down complex board game rules into easily digestible, AI-processable markdown files
- **Community Driven**: Open-source repository where gamers can contribute and improve rule documentation
- **AI-Ready**: Optimized format for AI systems to understand and answer rules questions
- **Comprehensive**: Cover edge cases, clarifications, and character-specific rules

## Current Games

- **Nemesis** - Complete implementation (in progress)
- More games coming soon!

## Getting Started

### For Contributors
1. Read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines
2. Look at existing games (like `nemesis/`) for formatting examples
3. Create a new game folder or improve existing content
4. Submit a pull request

## Repository Structure

```
board-game-rules-knowledge/
├── games/                    # Individual game rule sets
|  ...
│   └── nemesis/             # Nemesis board game rules
├── tools/                   # Development and validation tools
```

## Development Tools

### Recommended VS Code Extensions
- **Markdown All in One** - Enhanced markdown editing
- **markdownlint** - Markdown linting and validation
- **Prettier** - Code formatting

### Validation Tools
- `tools/validate.js` - Markdown validation script (Node.js)

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines on:
- Adding new games
- Improving existing content
- Formatting standards
- Review process

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Related Repositories

- [`go-boardgame-assistant`](https://github.com/PhilNel/go-boardgame-assistant) - Collection of Lambdas used to process the knowledge base and provide an API to the Board Game Assistant project.

- [`infra-boardgame-assistant`](https://github.com/PhilNel/infra-boardgame-assistant) - Terraform configuration for deploying the infrastructure and managing Lambda permissions, S3 buckets, etc.

- [`pulumi-boardgame-assistant`](https://github.com/PhilNel/pulumi-boardgame-assistant) - Pulumi repository for adding references/citations used by by knowledge base.

- [`vue-boardgame-assistant`](https://github.com/PhilNel/vue-boardgame-assistant) - The frontend Vue website that is used to interact with the Board Game Assistant functionality.

