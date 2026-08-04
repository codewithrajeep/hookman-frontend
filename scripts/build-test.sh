#!/bin/bash

set -e

echo "Staring build validation..."
START_TIME=$(date +%s)

run_steps() {
    local name="$1"
    local command="$2"

    echo ""
    echo "▶ $name"

    if eval "$command"; then
        echo "✅ $name passed"
    else
        echo "❌ $name failed"
        exit 1
    fi
}

run_steps "Lint" "pnpm lint"
run_steps "Type Check" "pnpm typecheck"
run_steps "Build" "pnpm build"

END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))
echo ""
echo "⏱️  Completed in ${DURATION}s"
echo "✅ Build validation completed successfully"
