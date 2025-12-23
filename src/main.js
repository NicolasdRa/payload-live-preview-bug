/**
 * Minimal reproduction for @payloadcms/live-preview bug
 *
 * Issue: The package imports from "payload/shared" which doesn't exist
 * in frontend-only projects.
 *
 * Per the docs (https://payloadcms.com/docs/live-preview/client),
 * the subscribe, unsubscribe, and ready functions should be usable
 * in any frontend framework without requiring the full payload package.
 */

// This import fails with:
// "Failed to resolve import 'payload/shared' from '@payloadcms/live-preview'"
import { subscribe, unsubscribe, ready } from '@payloadcms/live-preview';

// Simple usage as documented
const subscription = subscribe({
  callback: (data) => {
    console.log('Live preview data:', data);
  },
  depth: 1,
  initialData: { title: 'Test' },
  serverURL: 'http://localhost:3000',
});

ready({ serverURL: 'http://localhost:3000' });

console.log('If you see this, the import worked!');
