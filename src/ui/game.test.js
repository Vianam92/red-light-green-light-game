import { fixture, html } from '@open-wc/testing';
import { expect } from 'chai';
import "./game.ui";

describe('GameUI', () => {
  it('renders correctly', async () => {
    const el = await fixture(html`<game-ui></game-ui>`);
    expect(el.shadowRoot).to.exist;
    const header = await fixture(html`<header-component></header-component>`);
    expect(header.shadowRoot).to.exist;
  });
});
