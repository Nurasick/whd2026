# Mail webhook (Google Apps Script)

`Code.gs` emails the 6-digit login codes. The site calls it from
`src/lib/auth.server.ts` whenever both `GAS_URL` and `GAS_SECRET` are set;
otherwise codes are only printed to the server console.

Mail goes out **from the Google account that deploys the script**. A Google
Workspace account (e.g. a university account) can send about 1,500 emails a day;
a personal Gmail about 100. Check what is left by opening the `/exec` URL.

## Deploy

1. Go to <https://script.google.com> → **New project**, and paste `Code.gs` in.
2. **Project Settings → Script Properties → Add property**:
   `GAS_SECRET` = a long random string (`openssl rand -base64 32`).
3. In the editor, choose `testSendToMe` and click **Run**. Approve the
   permissions; you should receive a test code (`123456`).
4. **Deploy → New deployment → Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**

   Copy the URL ending in `/exec`.
5. Open that URL in a browser — it should show `{"ok":true,...}`.

## Connect the site

Local (`.dev.vars`), then restart `npm run dev`:

```
GAS_URL=https://script.google.com/macros/s/.../exec
GAS_SECRET=<the same value as the script property>
```

Production:

```
npx wrangler secret put GAS_URL
npx wrangler secret put GAS_SECRET
```

After editing `Code.gs`, use **Deploy → Manage deployments → Edit → New
version**; the `/exec` URL stays the same.
