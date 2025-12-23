# @payloadcms/live-preview Bug Reproduction

## Issue

`@payloadcms/live-preview@3.69.0` fails to import in frontend-only projects because it imports from `payload/shared`, which is a backend-only package.

## Error

```
[plugin:vite:import-analysis] Failed to resolve import "payload/shared" from
"node_modules/@payloadcms/live-preview/dist/index.js". Does the file exist?

import { formatAdminURL } from "payload/shared";
                               ^
```

## Expected Behavior

Per the [documentation](https://payloadcms.com/docs/live-preview/client), the `subscribe`, `unsubscribe`, and `ready` functions should work in any frontend framework without requiring the full `payload` package.

From the docs:
> "The implementation is written in a way that is very composable, enabling support for any front-end framework, not just React."

## Steps to Reproduce

1. Clone this repo
2. `npm install`
3. `npm run dev`
4. Open browser → Error appears

## Workaround

Downgrade to `@payloadcms/live-preview@3.60.0` which doesn't have this import.

## Environment

- @payloadcms/live-preview: 3.69.0
- Vite: 6.x
- Node: 22.x

## Root Cause

In `node_modules/@payloadcms/live-preview/dist/mergeData.js`:

```javascript
import { formatAdminURL } from "payload/shared";
```

This import runs at module load time, before any function is called, causing the failure even when only using the client-side functions.
