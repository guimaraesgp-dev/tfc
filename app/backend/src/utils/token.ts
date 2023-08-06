import { verify, sign } from 'jsonwebtoken';

class Token<T> {
  private secret = process.env.JWT_SECRET || 'jwt_secret';

  generate = (params: T): string => {
    const token = sign(JSON.stringify(params), this.secret);
    return token;
  };

  verify = (token: string): T => {
    const data = verify(token, this.secret) as T;
    return data;
  };
}

export default Token;
