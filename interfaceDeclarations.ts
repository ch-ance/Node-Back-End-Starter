export interface Credentials {
  username: string;
  password: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface returnedUser extends Credentials {
  id: number;
}
