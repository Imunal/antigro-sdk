import { SignJWT } from 'jose';

export class AntigroServiceJWT {
  /**
   * Function which generate JWT token, used for authentication with Antigro API.
   * @param secretKey base64 secret key obtained from Antigro
   * @param expirationTime - token expiration date, defaults to 10m
   * @returns Promise<string>
   */
  public async generateJWT({
    secretKey,
    expirationTime = '10m',
  }: {
    secretKey: string;
    expirationTime?: string;
  }): Promise<string> {
    if (!secretKey) throw new Error('Missing JWT secret');

    return await new SignJWT()
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' }) //Set header
      .setExpirationTime(expirationTime) // Set exp date
      .sign(Buffer.from(secretKey, 'base64')); // Sign message
  }
}
