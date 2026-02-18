DOCKER_USERNAME ?= honarino

COMPOSE=docker compose
BASE=-f docker-compose.yml

ENV_FILE=config/.ghcr.env

# Frontend Variables
FRONTEND_DIR=frontend
FRONTEND_DOCKER_IMAGE ?= $(DOCKER_USERNAME)/frontend

# Backend Variables
BACKEND_DIR=backend
BACKEND_DOCKER_IMAGE ?= $(DOCKER_USERNAME)/backend

ifneq ("$(wildcard $(ENV_FILE))","")
    include $(ENV_FILE)
    export $(shell sed 's/=.*//' $(ENV_FILE))
endif

.PHONY: start start-dev down logs ps clean

.PHONY: init
init:
	@echo "Logging in to Docker Hub..."
	@echo "$$TOKEN" | docker login -u $(DOCKER_USERNAME) --password-stdin
	@echo "Initialization Complated."

check-login:
	@docker info >/dev/null 2>&1 || { \
		echo "Docker login required. Run 'make init' first."; \
		exit 1; \
	}

.PHONY: frontend
frontend: check-login
	@cd $(FRONTEND_DIR) && \
	if [ -z "$(TAG)" ]; then \
		TAG=latest; \
	fi && \
	echo "Building $(FRONTEND_DOCKER_IMAGE):$$TAG ..." && \
	docker build -t $(FRONTEND_DOCKER_IMAGE):$$TAG .

.PHONY: backend
backend: check-login
	@cd $(BACKEND_DIR) && \
	if [ -z "$(TAG)" ]; then \
		TAG=latest; \
	fi && \
	echo "Building $(BACKEND_DOCKER_IMAGE):$$TAG ..." && \
	docker build -t $(BACKEND_DOCKER_IMAGE):$$TAG .

run: check-login
	$(COMPOSE) $(BASE) up --build

run-prod: check-login
	$(COMPOSE) $(BASE) up --build -d

down: check-login
	$(COMPOSE) $(BASE) down

logs: check-login
	$(COMPOSE) $(BASE) logs -f

ps: check-login
	$(COMPOSE) $(BASE) ps

clean: check-login
	docker compose down -v --remove-orphans
	docker system prune -f
