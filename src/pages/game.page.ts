import { LitElement, html, css } from "lit-element";
import "../ui/game.ui";

export class GamePage extends LitElement {
  static styles = css`
    :host {
      padding: 16px;
      width:100%;
      max-width:650px;
    }
  `;

  render() {
    return html` <game-ui></game-ui> `;
  }
}

customElements.define("game-page", GamePage);
