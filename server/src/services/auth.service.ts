import {Injectable} from '@nestjs/common';

@Injectable()
export class AuthService {
  // API Server performs specific JWT validation logic
  validateToken(token: string) {
    // TODO: just validate the token whether is a JWT or not,
    // rather than validate using secret

    return !!token;
  }
}
