# 05 - Userscript to browser extension

## Goal

Work out when a userscript has grown out of "personal helper" and into
"browser-installed thing that needs review before it starts wearing a blazer".

The lab packages a userscript into an extension-shaped folder. You don't need
live Vertec access for it.

## What participants build

- A migration note: userscript vs extension.
- A permissions review in plain English.
- A generated `manifest.json` and `content-script.js`.
- A checklist for a small internal pilot.

## Run it

```sh
npm run build:extension
npm run dev
```

Open:

```text
http://127.0.0.1:5173/prototypes/runner.html?demo=v5
```

Expected result:

- `dist-extension/vertec-helper/manifest.json` exists.
- `dist-extension/vertec-helper/content-script.js` exists.
- The v5 panel prints the manifest review JSON.
- Permissions are empty in the demo.

## Inspect

Open:

```text
scripts/build-extension.mjs
dist-extension/vertec-helper/manifest.json
dist-extension/vertec-helper/content-script.js
public/prototypes/v5/extension-review.user.js
```

Check:

- The generated manifest is Manifest V3.
- `content_scripts.matches` is narrow.
- The userscript and extension examples use `https://vertec.zuehlke.com/webapp/*`.
- The workshop still runs against a local workshop copy; the match pattern is
  there because this is the real internal target, not because the demo writes
  live data.
- There is no `<all_urls>`.
- There are no powerful permissions unless someone can defend them in front of
  another adult.
- If the packaged helper fetches public GOV.UK bank holidays, that is the only
  thing the request needs to send.

## Metadata contrast

Userscript shape:

```text
// @match https://vertec.zuehlke.com/webapp/*
// @grant none
```

Extension shape:

```json
{
  "manifest_version": 3,
  "content_scripts": [
    {
      "matches": ["https://vertec.zuehlke.com/webapp/*"],
      "js": ["content-script.js"],
      "run_at": "document_idle"
    }
  ],
  "permissions": []
}
```

## Prompt on screen

```text
We have a browser userscript for a Vertec Services helper.

Compare:
- Keeping it as a Tampermonkey userscript
- Packaging it as a Chrome extension content script

For each option, list:
- Page scope
- Permissions
- Update/deployment path
- Review burden
- Failure mode
- Who approves a pilot

Assume the real allowed URL would be:
https://vertec.zuehlke.com/webapp/*
Do not use broad host permissions.
```

## References

- [Tampermonkey documentation](https://www.tampermonkey.net/documentation.php)
- [Chrome Extensions: get started](https://developer.chrome.com/docs/extensions/get-started)
- [Chrome Extensions: content scripts](https://developer.chrome.com/docs/extensions/reference/manifest/content-scripts)
- [Chrome Extensions: permissions](https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions)

## Notes

- Browser extensions can read powerful page context, so keep the host match
  narrow.
- Treat generated extension output as draft review material. It is not approved
  software yet.

## Pros

- Permissions become visible.
- Packaging and review are repeatable.
- The script can move toward managed deployment.

## Cons

- Review and IT involvement increase.
- A bad extension scales risk faster than a bad local note.
- Manifest files look official even when the idea is still half cooked.

## Checklist

- [ ] Host match is narrow.
- [ ] Permissions are justified or absent.
- [ ] Generated files are readable in the workshop.
- [ ] The pilot approver is named.
- [ ] Participants can explain when a userscript is still the better answer.
