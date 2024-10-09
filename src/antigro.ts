import { AntigroHttpClientService } from './services/antigro-http-client.service';
import { AntigroServiceJWT } from './services/antigro-jwt.service';

export class Antigro {
  private antigroHttpClientService: AntigroHttpClientService;
  private antigroJwtService: AntigroServiceJWT;

  constructor() {
    this.antigroHttpClientService = new AntigroHttpClientService();
    this.antigroJwtService = new AntigroServiceJWT();
  }

  /**
   * Function which generate JWT token, used for authentication with Antigro API.
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
   * Functions returns information about design
   */
  public async getClientDesign({
    designId,
    jwtToken,
  }: {
    designId: string;
    jwtToken: string;
  }) {
    return await this.antigroHttpClientService.getClientDesign();
  }

  public async createClientDesign({ jwtToken }: { jwtToken: string }) {}

  public async updateClientDesign() {}
}
