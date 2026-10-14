# socialfi-widget — drop-in SocialFi widgets for any site

[![npm](https://img.shields.io/npm/v/socialfi-widget.svg)](https://www.npmjs.com/package/socialfi-widget) [![ci](https://github.com/CabalSpy/socialfi-widget/actions/workflows/ci.yml/badge.svg)](https://github.com/CabalSpy/socialfi-widget/actions/workflows/ci.yml) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**socialfi-widget** puts the CabalSpy ID SocialFi widgets on any website or React app: the "Sign in with CabalSpy ID" button (login with X + verified wallets, KOL badge, avatar menu) and the token theses widget (holders' theses with their real position and live PnL, replies, reactions). Designs come from your dashboard and can be overridden per widget.

Part of **[CabalSpy ID](https://id.cabalspy.xyz)** — the SocialFi layer for crypto apps. [Website](https://www.cabalspy.xyz/cabalspy-id/) · [Docs](https://docs.cabalspy.xyz/cabalspy-id) · [API dashboard](https://apidashboard.cabalspy.xyz) · [Full SDK: cabalspy-id](https://github.com/CabalSpy/cabalspy-id-js)

```bash
npm install socialfi-widget
```

**Any website**

```ts
import { mountLoginButton, mountTheses } from 'socialfi-widget';

mountLoginButton('#login', {
  clientId: 'csid_...',
  shape: 'pill',
  scope: ['openid', 'profile', 'thesis'],
  onLogin: ({ idToken }) => fetch('/api/session', { method: 'POST', body: JSON.stringify({ idToken }) }),
});

const theses = mountTheses('#theses', { chain: 'solana', mint, clientId: 'csid_...', theme: 'dark', compact: true });
theses.update({ theme: 'light' });
```

**React**

```tsx
import { CabalSpyLogin, CabalSpyTheses, useCabalSpyID } from 'socialfi-widget/react';

<CabalSpyLogin clientId="csid_..." onLogin={({ idToken }) => sendToBackend(idToken)} />
<CabalSpyTheses chain="solana" mint={mint} clientId="csid_..." accent="#3ddc84" showSentiment />
```

No bundler? Use the script tag directly: `<div data-csid-login data-client-id="csid_..."></div><script src="https://id.cabalspy.xyz/widget.js" async></script>`.

Options: login button — `clientId`, `theme`, `color`, `textColor`, `shape`, `size`, `label`, `fullWidth`, `showLogo`, `href`, `redirectUri`, `scope`, `user`, `logoutHref`; theses widget — `chain`, `mint`, `clientId`, `theme`, `scope`, `sort`, `font`, `radius`, `bg`, `card`, `text`, `muted`, `border`, `accent`, `accentText`, `bull`, `bear`, `showHeader`, `showSentiment`, `compact`, `height`, `accessToken`.

Always verify the `idToken` on your backend (e.g. with [socialfi-api](https://github.com/CabalSpy/socialfi-api): `CabalSpyIDAuth.verifyIdToken`).

Contents: the `cabalspy-id/widget` entry point and `cabalspy-id/widget/react`.

## Packages

| Package | npm | PyPI |
|---|---|---|
| [cabalspy-id](https://github.com/CabalSpy/cabalspy-id-js) (everything) | `cabalspy-id` | `cabalspy-id` |
| [socialfi-api](https://github.com/CabalSpy/socialfi-api) | `socialfi-api` | `socialfi-api` |
| [socialfi-thesis](https://github.com/CabalSpy/socialfi-thesis) | `socialfi-thesis` | `socialfi-thesis` |
| [socialfi-widget](https://github.com/CabalSpy/socialfi-widget) | `socialfi-widget` | – |

Versions follow `cabalspy-id`: 0.5.0 depends on `cabalspy-id` 0.5.0. This package contains no code of its own — it re-exports part of `cabalspy-id`, so behaviour, fixes and types are always the same.

## Releasing

Publish a GitHub release (any tag, e.g. `v0.5.0`) after the matching `cabalspy-id` version is on npm; the publish workflow uses npm trusted publishing.

## License

MIT
