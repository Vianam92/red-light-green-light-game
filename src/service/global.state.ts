class GlobalState {
  static instance: GlobalState;

  userData: UserData = {
    username: "", points: 0, maxPoints: 0
  };

  constructor() {}

  static getInstance(): GlobalState {
    if (!GlobalState.instance) {
      GlobalState.instance = new GlobalState();
    }
    return GlobalState.instance;
  }

  setUserData(userData: UserData) {
    this.userData = userData;
  }

  getUserData(){
    return this.userData;
  }
}

export const globalState = GlobalState.getInstance();

export interface UserData{
    username: string;
    points: number;
    maxPoints: number
}