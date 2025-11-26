# RCade

The RCade project is a custom-built arcade machine at [The Recurse Center](https://recurse.com).  This repo contains the software that powers the RCade cabinet and ecosystem.

## Overview

RCade is a monorepo containing:

- **web/** - SvelteKit web app deployed to Cloudflare Workers used to discover and manage games.
- **client/** - Electron desktop application for running games on the RCade cabinet.
- **cli/** - Command-line tool for scaffolding new games and managing the RCade ecosystem.
