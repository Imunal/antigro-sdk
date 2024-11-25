import { describe, it } from 'vitest';
import { handlersErrors } from '../../mocks/handlers-errors';
import { AntigroHttpClientService } from './antigro-http-client.service';

import { server } from '../../mocks/node';

describe('AntigroHttpClientService', () => {
  describe('getClientDesign', () => {
    //
    it('should throw an axios error, when using "prod" mode on network related problem', async ({
      expect,
    }) => {
      // use for test errors handlers
      server.use(...handlersErrors);

      //
      const client = new AntigroHttpClientService('api_secret_key', 'prod');

      const payload = {
        designId: '123-123',
      };

      //
      await expect(() => client.getClientDesign(payload)).rejects.toThrow(
        `getClientDesign request failed: Network error`,
      );
    });

    //
    it('should throw an axios error, when using "dev" mode on network related problem', async ({
      expect,
    }) => {
      // use for test errors handlers
      server.use(...handlersErrors);

      //
      const client = new AntigroHttpClientService('api_secret_key', 'dev');

      const payload = {
        designId: '123-123',
      };

      //
      await expect(() => client.getClientDesign(payload)).rejects.toThrow(
        `getClientDesign request failed: Network error`,
      );
    });

    //
    it('should throw an zod error with provided schema is invalid', async ({
      expect,
    }) => {
      //
      const client = new AntigroHttpClientService('api_secret_key', 'dev');

      //make invalid payload
      const payload = {
        designId: 123,
      };

      //@ts-expect-error
      await expect(() => client.getClientDesign(payload)).rejects.toThrow(
        `Schema validation errored in getClientDesign:`,
      );
    });
  });
});
