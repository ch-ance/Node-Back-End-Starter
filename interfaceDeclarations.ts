export interface Credentials {
  username: string;
  password: string;
}

export interface User extends Credentials {
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface returnedUser extends User {
  id: number;
}

export interface userPasswordHidden extends Omit<returnedUser, "password"> {
  password: undefined;
}
