#!/bin/bash

# VALIDATION WRAPPER SCRIPT
# Easy-to-use validation commands for pre-deployment and SEO checks

set -e  # Exit on error

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

show_help() {
  echo ""
  echo "${BLUE}🛡️  Premier Party Cruises - Validation Scripts${NC}"
  echo ""
  echo "Usage: ./scripts/validate.sh [command]"
  echo ""
  echo "Commands:"
  echo "  pre-deploy    - Run pre-deployment checks (React Refresh, schemas, SSR, bundles)"
  echo "  seo-prod      - Validate SEO on production site"
  echo "  seo-local     - Validate SEO on local dev server (must be running)"
  echo "  all           - Run all validations (pre-deploy + SEO local)"
  echo "  help          - Show this help message"
  echo ""
  echo "Examples:"
  echo "  ./scripts/validate.sh pre-deploy    # Before publishing"
  echo "  ./scripts/validate.sh seo-prod      # Check live site SEO"
  echo "  ./scripts/validate.sh all           # Full validation"
  echo ""
}

case "$1" in
  pre-deploy)
    echo -e "${BLUE}🔍 Running pre-deployment validation...${NC}"
    npm run build
    node scripts/pre-deploy-check.js
    ;;
  
  seo-prod)
    echo -e "${BLUE}🔍 Validating SEO on production site...${NC}"
    node scripts/seo-validation.js https://premierpartycruises.com
    ;;
  
  seo-local)
    echo -e "${BLUE}🔍 Validating SEO on local server...${NC}"
    node scripts/seo-validation.js http://localhost:5000
    ;;
  
  all)
    echo -e "${BLUE}🔍 Running full validation suite...${NC}\n"
    
    echo -e "${YELLOW}Step 1/2: Pre-deployment checks${NC}"
    npm run build
    node scripts/pre-deploy-check.js
    
    echo -e "\n${YELLOW}Step 2/2: SEO validation (local)${NC}"
    echo -e "${YELLOW}Note: Make sure dev server is running first!${NC}\n"
    node scripts/seo-validation.js http://localhost:5000
    
    echo -e "\n${GREEN}✅ All validations complete!${NC}\n"
    ;;
  
  help|--help|-h|"")
    show_help
    ;;
  
  *)
    echo -e "${YELLOW}Unknown command: $1${NC}"
    show_help
    exit 1
    ;;
esac
