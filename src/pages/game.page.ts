import { Router } from '@vaadin/router';
import { LitElement, html, css } from 'lit-element';

export class GamePage extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
    }
  `;

  render() {
    return html`
      <article>
        <section>
          <header>
            <p>Usuario <span>vianam</span></p>
            <p>Puntos: <small>20</small></p>
            <p>Max de puntos: <small>50</small></p>
          </header>
        </section>
        <section>
          <button> < </button>
          <p>Semáforo</p>
          <button> > </button>
        </section>
        <section>
          <button @click=${() => Router.go("/")}>Salir</button>
        </section>
      </article>
    `;
  }
}

customElements.define('game-page', GamePage);
