# Kosuke & Kokoro Wedding Invitation — Apps Script fetch build

This build sends RSVP data to the deployed Google Apps Script Web App using a cross-origin simple POST (`fetch(..., { mode: 'no-cors' })`).

Endpoint:
https://script.google.com/macros/s/AKfycbzmPoQ2GLJ4zpcSHlB23nRYGbuokp4lCOhm65v8TPjQN6ArcJ-dsfkKQlrzgrP95-kJxQ/exec

## Important
- Google Form direct POST is not used.
- Hidden iframe submission is not used.
- The Apps Script `doPost(e)` should appear in Apps Script Executions whenever the website's final submit button is pressed.
- Popup/modal is intentionally not included in this diagnostic build.

## Test
1. Publish this build.
2. Fill RSVP and reach confirmation.
3. Press `この内容で回答する` once.
4. Check Apps Script > Executions. `doPost` should appear.
5. Confirm the response appears in the Google Form.
