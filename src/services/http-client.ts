import axios from 'axios';

/**
 * @class
 */
export class HttpClient {
  constructor(
    private api_secret_key: string,
    private api_type: 'prod' | 'dev',
  ) {
  }

  //api env
  private readonly PROD_API_URL = 'https://designer.antigro.com';
  private readonly DEV_API_URL = 'https://designer-test.antigro.com';

  /**
   * sendRequest
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
   * getApiType
   * @remarks Just specify api_type and return the environment it is assigned to
   * @protected
   */
  protected getApiType() {
    return this.api_type === 'prod' ? this.PROD_API_URL : this.DEV_API_URL;
  }
}