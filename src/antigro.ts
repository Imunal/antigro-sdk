import { AntigroHttpClientService } from './services/antigro-http-client.service';
import { AntigroServiceJWT } from './services/antigro-jwt.service';
import type { CreateClientDesignRequest, CreateClientDesignResponse } from './schemas/create-client-design.schema';
import type { UpdateClientDesignRequest } from './schemas/update-client-design.schema';
import type { GetClientDesignResponse } from './schemas/get-client-design.schema';


/**
 * @class
 */
export class Antigro {
  private antigroHttpClient: AntigroHttpClientService;
  private antigroJwtService: AntigroServiceJWT;

  /**
   * Creates an instance of the Antigro API client.
   * @param api_secret_key - The API secret key for authentication.
   * @param api_type - The environment type, either 'prod' or 'dev'.
   * @param antigroJwtService - (Optional) The service for generating JWT tokens.
   * @param antigroHttpClient - (Optional) The service for communicating with the Antigro API.
   */
  constructor(
    private api_secret_key: string,
    private api_type: 'prod' | 'dev',
    antigroJwtService?: AntigroServiceJWT,
    antigroHttpClient?: AntigroHttpClientService,
  ) {
    if (!this.api_secret_key) {
      throw new Error('Secret key is missing');
    }

    if (!this.api_type) {
      throw new Error('API type is missing');
    }

    this.antigroJwtService = antigroJwtService ?? new AntigroServiceJWT();
    this.antigroHttpClient = antigroHttpClient ?? new AntigroHttpClientService(api_secret_key, api_type);
  }


  /**
   *  createToken
   *  @remarks Function which generate JWT token, used for authentication with Antigro API.
   *  @example
   *  ```ts
   *  const antigro = new Antigro();
   *  const jwt_token = await antigro.createToken('123-123');
   *  ```
   *  @param secretKey base64 secret key obtained from Antigro
   *  @param expirationTime - token expiration date, defaults to 10m
   *  @returns Promise<string>
   */
  public async createToken(secretKey: string, expirationTime?: string): Promise<string> {
    return await this.antigroJwtService.generateJWT({
      secretKey,
      expirationTime,
    });
  }

  /**
   *  getClientDesign
   *  @remarks Functions returns information about design
   *  @example
   *  ```ts
   *  const antigro = new Antigro('123-123', 'prod');
   *  const design = await antigro.getClientDesign('1234-1234');
   *  ```
   *  @param designId - The update request containing the design ID and new properties.
   *  @returns Promise<GetClientDesignResponse>
   */
  public async getClientDesign(designId: string): Promise<GetClientDesignResponse> {
    return await this.antigroHttpClient.getClientDesign(designId);
  }

  /**
   *  createClientDesign
   *  @remarks Functions creating new design
   *  @example
   *  ```ts
   *  const antigro = new Antigro('123-123', 'prod');
   *  const design = await antigro.createClientDesign(data);
   *  ```
   *  @param data - The update request containing the design ID and new properties.
   *  @returns Promise<CreateClientDesignResponse>
   */
  public async createClientDesign(data: CreateClientDesignRequest): Promise<CreateClientDesignResponse> {
    return await this.antigroHttpClient.createClientDesign(data);
  }

  /**
   *  updateClientDesign
   *  @remarks Function updates an existing design.
   *  @example
   *  ```ts
   *  const antigro = new Antigro('123-123', 'prod');
   *  const design = await antigro.updateClientDesign(data);
   *  ```
   *  @param data - The update request containing the design ID and updated properties.
   *  @returns Promise<boolean>
   */
  public async updateClientDesign(data: UpdateClientDesignRequest): Promise<boolean> {
    return await this.antigroHttpClient.updateClientDesign(data);
  }
}
