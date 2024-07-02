class GlobalState {
  static instance: GlobalState;

  userData: UserData[] = [];

    user: string | undefined;

  constructor() {}

  static getInstance(): GlobalState {
    if (!GlobalState.instance) {
      GlobalState.instance = new GlobalState();
    }
    return GlobalState.instance;
  }

  setUserData(userData: UserData[]) {
    this.userData.push(...userData);
  }

  setUser(user: string){
    this.user = user;
  }

  getUser(){
    return this.user;
  }

  getUserData(){
    return this.userData;
  }
}

export const globalState = GlobalState.getInstance();

export interface UserData{
    username?: string;
    score?: number;
    maxPoints?: number
}