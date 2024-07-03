import { LitElement, html, css } from "lit-element";
import "../ui/game.ui";

export class GamePage extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
    }
  `;

  render() {
    return html` <game-ui></game-ui> `;
  }
}

customElements.define("game-page", GamePage);
