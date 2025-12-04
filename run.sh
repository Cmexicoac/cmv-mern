#!/bin/bash

# CMV-MERN Development Runner
# Usage:
#   ./run.sh          - Start only client and server (default)
#   ./run.sh --all    - Start all services including MongoDB
#   ./run.sh --build  - Rebuild and start client and server
#   ./run.sh --mongo  - Start only MongoDB

set -e

case "$1" in
    --all)
        echo "Starting all services (client, server, mongo)..."
        docker compose up --build
        ;;
    --build)
        echo "Rebuilding and starting client and server..."
        docker compose up --build client server
        ;;
    --mongo)
        echo "Starting only MongoDB..."
        docker compose up mongo_db
        ;;
    --down)
        echo "Stopping all services..."
        docker compose down
        ;;
    --help|-h)
        echo "CMV-MERN Development Runner"
        echo ""
        echo "Usage: ./run.sh [option]"
        echo ""
        echo "Options:"
        echo "  (no option)  Start client and server only (default)"
        echo "  --all        Start all services including MongoDB"
        echo "  --build      Rebuild and start client and server"
        echo "  --mongo      Start only MongoDB"
        echo "  --down       Stop all services"
        echo "  --help, -h   Show this help message"
        ;;
    *)
        echo "Starting client and server (without MongoDB)..."
        echo "Use './run.sh --all' to include MongoDB"
        docker compose up client server
        ;;
esac
