# SAP Parasha - complete current website source

## Run locally
Install Python 3, extract this archive and run from this folder:

    python3 -m http.server 8000 --directory dist

On Windows you can use `py -m http.server 8000 --directory dist`.
Open http://localhost:8000 and click Log On. Demo credentials are prefilled.
No npm packages, build step, API keys or backend are required.

## Tests
With Node.js installed:

    node test_pp.cjs

## Files
- dist/index.html: application entry and shell
- dist/system.css: launchpad, transaction and responsive styles
- dist/system.js: transactions, language and browser storage
- dist/pp-model.js: order, confirmation and stock logic
- dist/guide.js: automatic guided practice
- dist/business-brief.js: biblical/business mapping and transaction effects
- dist/icon.svg: favicon
- test_pp.cjs: model tests
- README.md: implementation notes and limits

Client 001 and practice client 002 are stored locally in the browser. GOD is a demo persona, not real authentication. This is an independent browser simulation, not SAP S/4HANA software. To host elsewhere, publish the contents of dist/ with a static hosting service.

This export includes all source needed for the CURRENT live website. Older abandoned versions, publication credentials, repository metadata and account-specific hosting configuration are not needed and are not included.

Creator credit: © כל הזכויות שמורות לטל יצחייק
