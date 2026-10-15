import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { test } from 'node:test';

import * as core from 'cabalspy-id/widget';
import * as coreReact from 'cabalspy-id/widget/react';

import * as pkg from '../index.js';
import * as pkgReact from '../react.js';

const require = createRequire(import.meta.url);

test('re-exports cabalspy-id/widget as the same objects', () => {
  assert.deepEqual(Object.keys(pkg).sort(), Object.keys(core).sort());
  for (const name of Object.keys(core)) assert.equal(pkg[name], core[name], name);
  for (const name of ['mountLoginButton', 'mountTheses', 'setThesisAccessToken', 'loadCabalSpyIDWidget']) {
    assert.equal(typeof pkg[name], 'function', name);
  }
});

test('socialfi-widget/react re-exports the React components', () => {
  assert.deepEqual(Object.keys(pkgReact).sort(), Object.keys(coreReact).sort());
  assert.equal(pkgReact.CabalSpyLogin, coreReact.CabalSpyLogin);
  assert.equal(pkgReact.CabalSpyTheses, coreReact.CabalSpyTheses);
  assert.equal(require('../react.cjs').useCabalSpyID, require('cabalspy-id/widget/react').useCabalSpyID);
});

test('attribute mapping', () => {
  const attrs = pkg.thesisWidgetAttributes({ chain: 'solana', mint: 'M', clientId: 'csid_x', accentText: '#fff', compact: true });
  assert.equal(attrs['data-accent-text'], '#fff');
  assert.equal(attrs['data-compact'], 'true');
  assert.equal(require('../index.cjs').loginButtonAttributes({ clientId: 'c' })['data-client-id'], 'c');
});

// Trade Feed widgets (cabalspy-id 0.6.0+): checked when the installed cabalspy-id has them.
test('Trade Feed widgets', { skip: !('mountTradeFeed' in core) && 'cabalspy-id < 0.6.0' }, () => {
  for (const name of ['mountTradeFeedButton', 'mountTradeFeed', 'tradeFeedButtonAttributes', 'tradeFeedWidgetAttributes', 'setTradeFeedAccessToken']) {
    assert.equal(typeof pkg[name], 'function', name);
  }
  assert.equal(pkgReact.TradeFeedButton, coreReact.TradeFeedButton);
  assert.equal(pkgReact.TradeFeed, coreReact.TradeFeed);
  const attrs = pkg.tradeFeedButtonAttributes({ trader: 'alice', clientId: 'csid_x', size: 'sm' });
  assert.equal(attrs['data-csid-trade-feed-button'], '');
  assert.equal(attrs['data-trader'], 'alice');
  assert.equal(require('../index.cjs').tradeFeedWidgetAttributes({ clientId: 'csid_x', filter: 'buys' })['data-filter'], 'buys');
  assert.throws(() => pkg.tradeFeedWidgetAttributes({}), /client_id/);
});
