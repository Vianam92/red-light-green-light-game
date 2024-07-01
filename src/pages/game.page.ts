import { LitElement, html, css } from 'lit-element';

export class GamePage extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      background-color: lightgray;
    }
  `;

  render() {
    return html`
      <h1>Hello, LitElement!</h1>
    `;
  }
}

customElements.define('game-page', GamePage);
