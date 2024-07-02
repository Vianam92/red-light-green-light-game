import { Router } from "@vaadin/router";
import { LitElement, html, css } from "lit-element";
import { UserData, globalState } from "../service/global.state";

export class GamePage extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
    }
    .container-game {
      .section-game {
        .semaforo {
          font-size: 2rem;
          font-weight: 600;
        }
        .semaforo.red {
          color: red;
        }
        .semaforo.green {
          color: green;
        }
      }
    }
  `;

  userData: UserData;
  ligtClass: string;

  connectedCallback(): void {
    super.connectedCallback();

    this.changeLight();
  }

  constructor() {
    super();
    this.userData = globalState.getUserData();
    this.ligtClass = "red";
  }

  
  changeLight() {
    const greenLightDuration = Math.max(10000 - this.userData.points * 100, 2000) + this.randomVariation(-1500, 1500);

    if(this.ligtClass === "red"){
      this.ligtClass = "green";
      setTimeout(() => this.changeLight(), greenLightDuration);
    }else{
       this.ligtClass = "red";
       setTimeout(() => this.changeLight(), 3000);
    }
    this.requestUpdate();
  }

  randomVariation(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  render() {
    return html`
      <article class="container-game">
        <section>
          <header>
            <p>Usuario: <span>${this.userData.username}</span></p>
            <p>Puntos: <small>${this.userData.points}</small></p>
            <p>Max de puntos: <small>${this.userData.maxPoints}</small></p>
          </header>
        </section>
        <section class="section-game">
          <button><</button>
          <p class="${`semaforo ${this.ligtClass}`}">Semáforo</p>
          <button>></button>
        </section>
        <section>
          <button @click=${() => Router.go("/")}>Salir</button>
        </section>
      </article>
    `;
  }
}

customElements.define("game-page", GamePage);
