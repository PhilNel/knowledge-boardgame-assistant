KNOWLEDGE_BUCKET_NAME := boardgame-assistant-knowledge-dev-eu-west-1

.PHONY: help
help:
	@echo "Available commands:"
	@echo "  make sync        - Sync knowledge base to S3"
	@echo "  make sync-dry-run - Sync knowledge base to S3 (dry run)"
	@echo "  make validate    - Validate knowledge base structure and content"
	@echo "  make lint        - Lint markdown files"
	@echo "  make format      - Format markdown files"
	@echo "  make help        - Show this help message"

.PHONY: sync
sync:
	KNOWLEDGE_S3_BUCKET=$(KNOWLEDGE_BUCKET_NAME) npm run sync

.PHONY: sync-dry-run
sync-dry-run:
	npm run sync:dry-run

.PHONY: validate
validate:
	npm run validate

.PHONY: lint
lint:
	npm run lint

.PHONY: format
format:
	npm run format 