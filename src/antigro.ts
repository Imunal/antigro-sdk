import { AntigroHttpClientService } from './services/antigro-http-client.service';
import { AntigroServiceJWT } from './services/antigro-jwt.service';

export class Antigro {
  constructor(
    private antigroHttpClientService: AntigroHttpClientService,
    private antigroJwtService: AntigroServiceJWT,
  ) {}

  /**
   * @function createToken
   * @description Function which generate JWT token, used for authentication with Antigro API.
   * @param secretKey base64 secret key obtained from Antigro
   * @param expirationTime - token expiration date, defaults to 10m
   * @returns Promise<string>
   */
  public async createToken(secretKey: string, expirationTime?: string) {
    return await this.antigroJwtService.generateJWT({
      secretKey,
      expirationTime,
    });
  }

  /**
   * @function getClientDesign
   * @description Functions returns information about design
   * @param designId
   * @param jwtToken
   */
  public async getClientDesign(designId: string, jwtToken: string) {
    const payload = {
      designId,
      jwtToken,
    };
    return await this.antigroHttpClientService.getClientDesign(payload);
  }

  public async createClientDesign({ jwtToken }: { jwtToken: string }) {}

  public async updateClientDesign() {}
}
