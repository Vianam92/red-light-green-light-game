import { Router } from "@vaadin/router";
import { LitElement, html, css } from "lit-element";
import { UserData, globalState } from "../service/global.state";
import "../components/header";
import "../components/semáforo.component";

export class GameUI extends LitElement {
  static styles = css`
    :host {
      padding: 16px;
    }
    .container-game{
      width:100%;
      display:flex;
      justify-content:center;
      align-items:center;
      text-align:center;
      margin-top:100px;
      .section-game{
      display:flex;
      justify-content:space-around;
      align-items:center;
      max-width:500px;
      width:100%;
      button{
        height:50px;
        width:50px;
        font-size:1.2rem;
      }
    }
    }
    footer{
      position:fixed;
      bottom:0;
      right:0;
      padding:2rem;
      button{
        width:100px;
        height:30px;
        border-radius:8px;
        border:none;
        background-color: #064d5fea;
        color:white;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      }
    }
   
  `;

  userData: UserData[];
  lightClass: string;
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

    if (this.user) {
      this.score = this.user.score ?? 0;
      this.maxPoints = this.user.maxPoints ?? 0;
    }

    this.changeLight();
  }

  constructor() {
    super();
    this.userData = globalState.getUserData();
    this.lightClass = "red";
    this.score = 0;
    this.maxPoints = 0;
  }

  changeLight() {
    if (this.user) {
      const greenLightDuration =
        Math.max(10000 - this.score * 100, 2000) +
        this.randomVariation(-1500, 1500);
      if (this.lightClass === "red") {
        this.lightClass = "green";
        setTimeout(() => this.changeLight(), greenLightDuration);
      } else {
        this.lightClass = "red";
        setTimeout(() => this.changeLight(), 3000);
      }
    }

    this.requestUpdate();
  }

  randomVariation(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  incrementPoints(button: string) {
    if (this.lightClass === "red") {
      this.score = 0;
    } else {
      if (this.lastButtonPressed === button) {
        this.score -= 1;
      } else {
        this.score += 1;
      }
    }
    this.lastButtonPressed = button;
    this.user = { ...this.user, score: this.score };

    this.requestUpdate();
  }

  saveData() {
    if (this.user) {
      this.user.score = this.score;
      this.user.maxPoints = Math.max(this.user.maxPoints ?? 0, this.score);
      globalState.setUserData([this.user]);
    }
    Router.go("/");
  }

  render() {
    return html`
      <header-component .user=${this.user}></header-component>
      <main class="container-game">
        <section class="section-game">
          <button @click=${() => this.incrementPoints("left")}><</button>
          <semaforo-component .lightClass=${this.lightClass}></semaforo-component>
          <button @click=${() => this.incrementPoints("right")}>></button>
        </section>
      </main>
      <footer>
        <button @click=${() => this.saveData()}>Salir</button>
      </footer>
    `;
  }
}

customElements.define("game-ui", GameUI);
