export interface JwtConfig {
  secret: string;
  expiresIn: number;
}

export interface DbConfig {
  type: any;
  port: number;
  database: string;
  username: string;
  password: string;
  host: string;
  synchronize: boolean;
}
