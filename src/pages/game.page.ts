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

  userData: UserData[];
  ligtClass: string;
  userName: string | undefined;
  user: UserData | undefined;
  score: number;
  maxPoints: number;
  lastButtonPressed: string | null = null;

  connectedCallback(): void {
    super.connectedCallback();

    this.userName = globalState.getUser();

    const userExist = globalState
      .getUserData()
      .some((user) => user.username === this.userName);

    if (!userExist) {
      globalState.setUserData([
        {
          username: this.userName,
          score: 0,
          maxPoints: 0,
        },
      ]);
    }

    this.user = globalState
      .getUserData()
      .find((x) => x.username === this.userName);

    if(this.user?.score){
      this.score = this.user.score;
    }

    console.log(globalState.getUserData())

    this.changeLight();
  }

  constructor() {
    super();
    this.userData = globalState.getUserData();
    this.ligtClass = "red";
    this.score = 0;
    this.maxPoints = 0;
  }

  changeLight() {
    if (this.user) {
      const greenLightDuration =
        Math.max(10000 - this.score * 100, 2000) +
        this.randomVariation(-1500, 1500);
      if (this.ligtClass === "red") {
        this.ligtClass = "green";
        setTimeout(() => this.changeLight(), greenLightDuration);
      } else {
        this.ligtClass = "red";
        setTimeout(() => this.changeLight(), 3000);
      }
    }

    this.requestUpdate();
  }

  randomVariation(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  incrementPoints(button: string) {
    if (this.ligtClass === "red") {
      this.score = 0;
    } else {
      if (this.lastButtonPressed === button) {
        this.score -= 1;
      } else {
        this.score += 1;
      }
    }
    this.lastButtonPressed = button;
    this.user = { ...this.user, score: this.score};

    this.requestUpdate();
  }

  saveData() {
    Router.go("/");
    this.user = {
      ...this.user,
    };
    console.log(this.user);
    globalState.setUserData([this.user]);
  }

  render() {
    return html`
      <article class="container-game">
        <section>
          <header>
            <p>Usuario: <span>${this.user?.username}</span></p>
            <p>Puntos: <small>${this.user?.score}</small></p>
            <p>Max de puntos: <small>${this.user?.maxPoints}</small></p>
          </header>
        </section>
        <section class="section-game">
          <button @click=${() => this.incrementPoints("left")}><</button>
          <p class="${`semaforo ${this.ligtClass}`}">Semáforo</p>
          <button @click=${() => this.incrementPoints("right")}>></button>
        </section>
        <section>
          <button @click=${() => this.saveData()}>Salir</button>
        </section>
      </article>
    `;
  }
}

customElements.define("game-page", GamePage);
