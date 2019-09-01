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
  password: "n/a";
}
