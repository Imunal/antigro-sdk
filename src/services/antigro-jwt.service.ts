import { SignJWT } from 'jose';

export class AntigroServiceJWT {
  /**
   * @description Function which generate JWT token, used for authentication with Antigro API.
   * @param {string} secretKey base64 secret key obtained from Antigro
   * @param {string} expirationTime - token expiration date, defaults to 10m
   * @returns Promise<string>
   * @throws Will throw an error if argument secretKey is null.
   */
  public async generateJWT({
    secretKey,
    expirationTime = '10m',
  }: {
    secretKey: string;
    expirationTime?: string;
  }): Promise<string> {
    //Check if secretKey is passed.
    if (!secretKey) throw new Error('Missing secretKey');

    //Check if secretKey is valid
    if(typeof secretKey !== 'string') throw new Error('secretKey must be a string');

    return await new SignJWT()
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' }) //Set header
      .setExpirationTime(expirationTime) // Set exp date
      .sign(Buffer.from(secretKey, 'base64')); // Sign message
  }
}
