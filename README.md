# S/4HANA · PP

Classic Fiori-style launchpad and compact PP transaction screens. Public sample persona GOD, sample password Genesis1!. Client 001, system QAS. No real authentication or SAP connection.

## Run
Serve `dist/` as static files. `node test_pp.cjs` validates the production-order model.

## Transactions
CO01 create, CO02 change/release/check availability, CO03 display, CO11N partial/final confirmation, MMBE stock overview, MB51 filtered material document list/export, CS03 BOM, CA03 routing, CR03 work center.

State is local to the browser. Confirmation posts linked simulated 261 and 101 material-document items. Opening stock is 3 SEA flour. The model reserves remaining requirements for released open orders and blocks shortages and overdelivery. Final underdelivery is supported. Statuses distinguish PCNF, CNF and DLV. Reset and JSON export are under the GOD menu.

## Boundaries
Independent simulation, not SAP software. No backend, MRP, costing, financial postings, cancellation or reversal processing. The custom control key ZP01 denotes the demo backflush/automatic goods receipt configuration. SEA is a custom unit with no modern-unit conversion. English by default; Hebrew field labels and right-to-left content are selectable at logon. Technical master data, codes and status messages remain in English.

## Content separation
Only `dist/` is deployed. Previous implementations are retained in `archive/legacy/`. LinkedIn editorial files are retained in `editorial/` and are not served by the app. No personal credits, biblical branding, lessons or editorial text appear in the application.

## Guided practice
The shell `?` button starts the Vayera PP walkthrough. Small anchored cards follow actual order state through CO01, availability/release in CO02, confirmation in CO11N, document review in MB51 and stock review in MMBE. Hebrew and English guidance follow the logon language. Incorrect postings cannot advance the order-based steps.

Practice uses simulated client 002 with its own browser storage; client 001 remains unchanged. Starting a new practice explicitly resets only 002. Pause keeps practice available for free navigation, `?` resumes, and Exit/Finish returns to 001. Refresh retains the guide and current practice within the same tab. The introduction distinguishes Genesis 18:6 from scenario-specific SAP master data and configuration.

Validation: model regression tests passed; browser walkthrough verified full completion, rejected overdelivery, persisted refresh, pause/resume, original-client preservation, and 390px mobile popover placement. This is browser-local simulation, not a provisioned SAP client.

Launch readiness: a dedicated Start Guided Practice tile makes the walkthrough discoverable; the demo logon explains that sample credentials are prefilled. Completion shows the actual order result and offers replay with a partial-confirmation challenge. No registration or shared business-data backend is used.

Guided practice now starts automatically after demo Log On. Existing active practice is resumed without resetting its data; pausing remains respected on refresh. A new login starts a fresh practice when no guide is active.

Business briefing now maps the source story to production demand, materials, units and work center, and explains all nine transaction tiles. Guidance distinguishes planning/release from goods movement, configured backflush from automatic goods receipt, and receipt into stock from serving the guests. Source links are included. A creator credit is visible in logon and the status footer. Native date inputs are constrained in RTL grids, use LTR editing, and default/post using browser-local dates. Verified at 390px in Chromium; native iOS Safari rendering was not directly available for testing.
