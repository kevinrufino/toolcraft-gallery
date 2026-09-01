# Toolcraft Gallery

A live gallery for Kevin Rufino's Toolcraft explorations. Each card opens the complete experiment in an isolated full-screen canvas while keeping every lab's original controls and behavior intact.

## Included experiments

- Pixel Trail
- Orbit Loom
- Liquid Navigation
- Glyph Channel
- Spider Lab

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

The publisher builds the Vite app at the correct nested asset path, copies it into the gallery, and updates the card catalog. Commit and deploy the gallery to publish the new exploration.
