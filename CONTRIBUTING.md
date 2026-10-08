# Contributing

Issues and pull requests are welcome.

## Setup

```sh
npm install
npm test
npm run lint
```

Node 22 or later. There are no runtime dependencies.

## Changes to the look

A change that claims to match ERCOT's screens more closely needs public evidence: a link to an ERCOT document,
presentation or web page, with the page or slide. Do not attach screenshots of a live or test market system;
they can show confidential market data. If the value can be measured from a public image, add it to
`scripts/verify-provenance.mjs` and mark the token `sampled`.

## Pull requests

- Follow [AGENTS.md](AGENTS.md); its rules apply to people too.
- Run `npm run build`, `npm test` and `npm run lint` before pushing. CI runs the same.
- Keep each pull request to one change, and say in the description how you checked it in a browser.
