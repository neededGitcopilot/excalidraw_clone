import { UserModel } from '@repo/db/model';

/**
 * AUTH SERIALIZER
 * Controls what the frontend sees
 */
export class AuthSerializer {
  static login(user: UserModel, accessToken: string) {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      accessToken,
    };
  }

  static register(user: UserModel, magicLink: string) {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      magicLink,
    };
  }
}