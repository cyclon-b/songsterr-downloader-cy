# Songsterr Downloader

A web app that converts Songsterr tabs to Guitar Pro (.gp7) files using alphaTab.

See how I built it [here!](https://www.youtube.com/watch?v=SsIMY8xmDNY)

## How it works

1. User pastes a Songsterr URL
2. Server parses the page state to get song metadata and track info
3. Fetches per-track revision JSON payloads from Songsterr's CDN
4. Converts all tracks into an alphaTab score model
5. Exports as GP7 and triggers a client-side download

## Conversion features

See [CONVERTER.md](src/lib/server/services/converter/CONVERTER.md) for full details.

## How to run

1. Clone the repo
2. Install [Node.js](https://nodejs.org/) 24.x (npm is included)
3. `npm install`
4. `npm run dev`

## Running tests

```
npm run test:unit -- --run
```
