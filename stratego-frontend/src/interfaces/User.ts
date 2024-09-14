/* Interface for Login and Register endpoint call response */
export interface LoginRegisterResponse {
  userId: string;
  username: string;
  token: string;
}

/* Interface for Login and Register endpoint call request */
export interface LoginRegisterRequest {
  username: string;
  password: string;
}