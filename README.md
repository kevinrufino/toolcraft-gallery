# Toolcraft Gallery

A live gallery for Kevin Rufino's Toolcraft explorations. Each card opens the complete experiment in an isolated full-screen canvas while keeping every lab's original controls and behavior intact.

## Included experiments

- Pixel Trail
- Orbit Loom
- Liquid Navigation
- Glyph Channel
- Spider Lab
- Silk Lab

## Run locally

```bash
npm install
npm run dev
```

## Publish another experiment

Install the experiment's dependencies, then run:

```bash
npm run publish:experiment -- /absolute/path/to/experiment my-experiment \
  --title "My Experiment" \
  --category "Motion / Canvas" \
  --description "A short, useful explanation." \
  --source "https://github.com/kevinrufino/my-experiment" \
  --accent "#2145ff"
```

The publisher builds the Vite app at the correct nested asset path, copies it into the gallery, and updates the card catalog.

Apps generated from newer Toolcraft templates route under their Vite base path (`/experiments/<slug>/`) and show "Not Found" from the flat `.html` entry. Pass `--folder-route` for those (Silk Lab needs it); the flat entry then renames its URL to the folder before the app boots. Leave `--source` out when the experiment has no public repo yet and the card hides its Source link. Commit and deploy the gallery to publish the new exploration.
