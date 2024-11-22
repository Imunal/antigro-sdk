import axios, { AxiosError } from 'axios';
import { ZodError } from 'zod';

//schemas

import {
  type GetClientDesignRequest,
  GetClientDesignRequestSchema,
  type GetClientDesignResponse,
  GetClientDesignResponseSchema,
} from '../schemas/get-client-design.schema';

export class AntigroHttpClientService {
  constructor(
    private api_secret_key: string,
    private api_type: 'prod' | 'dev',
  ) {}

  //api env
  private readonly PROD_API_URL = 'https://designer.antigro.com';
  private readonly DEV_API_URL = 'https://designer-test.antigro.com';

  //endpoints
  private readonly GET_CLIENT_DESIGN_ENDPOINT = '/api/partner-backend/designs';

  /**
   * @function getClientDesign
   * @description Function which is responsible to call getClientDesign endpoint in Antigro API, parse, and returns valid.
   * @param data
   * @returns Promise<GetClientDesignResponse>
   */
  public async getClientDesign(
    data: GetClientDesignRequest,
  ): Promise<GetClientDesignResponse> {
    try {
      //validate data before sending request.
      const safe_data = GetClientDesignRequestSchema.parse(data);

      //call endpoint
      const response = await this.sendRequest({
        endpoint: `${this.GET_CLIENT_DESIGN_ENDPOINT}/${safe_data.designId}`,
        method: 'get',
      });

      //return parsed response payload
      return GetClientDesignResponseSchema.parse(response);
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof AxiosError) {
        throw new Error(`getClientDesign request failed: ${error.message}`);
      } else if (error instanceof ZodError) {
        throw new Error(
          `Schema validation errored in getClientDesign: ${error.errors}`,
        );
      }
      throw new Error(`Something went wrong: ${error}`);
    }
  }

  /**
   * @function sendRequest
   * @param method
   * @param endpoint
   * @param params
   * @param data
   * @protected
   */
  protected async sendRequest<T>({
    method,
    endpoint,
    params,
    data,
  }: {
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    endpoint: string;
    params?: T;
    data?: T;
  }) {
    const api_endpoint = this.getApiType();
    const axios_config = {
      method,
      url: `${api_endpoint}/${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${this.api_secret_key}`,
      },
      params,
      data,
    };

    const response = await axios(axios_config);
    return response.data;
  }

  /**
   * @function getApiType
   * @description Just specify api_type and return the environment it is assigned to
   * @protected
   */
  protected getApiType() {
    return this.api_type === 'prod' ? this.PROD_API_URL : this.DEV_API_URL;
  }
}
