import { describe, it } from 'vitest';
import { handlersErrors } from '../../mocks/handlers-errors';
import { AntigroHttpClientService } from './antigro-http-client.service';

import { server } from '../../mocks/node';
import { validGetDesignResponse, validPostDesignResponse } from '../../mocks/handlers';

describe('AntigroHttpClientService', () => {
  describe('getClientDesign', () => {
    //
    it('should return valid and parsed response from API on prod mode', async ({ expect }) => {
      const client = new AntigroHttpClientService('api_secret_key', 'prod');

      const result = await client.getClientDesign('123-123');

      //
      expect(result).toEqual(validGetDesignResponse);
    });

    //
    it('should return valid and parsed response from API on dev mode', async ({ expect }) => {
      const client = new AntigroHttpClientService('api_secret_key', 'dev');

      const result = await client.getClientDesign('123-123');

      //
      expect(result).toEqual(validGetDesignResponse);
    });

    //
    it('should throw an axios error, when using "prod" mode on network related problem', async ({
                                                                                                  expect,
                                                                                                }) => {
      // use for test errors handlers
      server.use(...handlersErrors);

      //
      const client = new AntigroHttpClientService('api_secret_key', 'prod');

      //
      await expect(() => client.getClientDesign('123-123')).rejects.toThrow(
        `Network error in getClientDesign: Network error`,
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

      //
      await expect(() => client.getClientDesign('123-123')).rejects.toThrow(
        `Network error in getClientDesign: Network error`,
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
        `Validation error in getClientDesign:`,
      );
    });
  });

  //
  describe('createClientDesign', () => {
    //
    it('should return valid and parsed response from API on prod mode', async ({ expect }) => {
      const client = new AntigroHttpClientService('api_secret_key', 'prod');

      const payload = {
        sellerId: '123-123',
        productCode: '123-123',
        returnUrl: 'http://test.com',
      };

      const result = await client.createClientDesign(payload);

      //
      expect(result).toEqual(validPostDesignResponse);
    });

    it('should return valid and parsed response from API on dev mode', async ({ expect }) => {
      const client = new AntigroHttpClientService('api_secret_key', 'dev');

      const payload = {
        sellerId: '123-123',
        productCode: '123-123',
        returnUrl: 'http://test.com',
      };

      const result = await client.createClientDesign(payload);

      //
      expect(result).toEqual(validPostDesignResponse);
    });

    it('should throw an axios error, when using "prod" mode on network related problem', async ({
                                                                                                  expect,
                                                                                                }) => {
      // use for test errors handlers
      server.use(...handlersErrors);

      //
      const client = new AntigroHttpClientService('api_secret_key', 'prod');

      const payload = {
        sellerId: '123-123',
        productCode: '123-123',
        returnUrl: 'http://test.com',
      };

      //
      await expect(() => client.createClientDesign(payload)).rejects.toThrow(
        `Network error in createClientDesign: Network error`,
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
        sellerId: '123-123',
        productCode: '123-123',
        returnUrl: 'http://test.com',
      };

      //
      await expect(() => client.createClientDesign(payload)).rejects.toThrow(
        `Network error in createClientDesign: Network error`,
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
        sellerId: 123,
        productCode: '123-123',
        returnUrl: 'http://test.com',
      };

      //@ts-expect-error
      await expect(() => client.createClientDesign(payload)).rejects.toThrow(
        `Validation error in createClientDesign:`,
      );
    });
  });

  //
  describe('updateClientDesign', () => {
    it('should return valid and parsed response from API on prod mode', async ({ expect }) => {
      const client = new AntigroHttpClientService('api_secret_key', 'prod');

      const payload = {
        designId: '123-123',
      };

      const result = await client.updateClientDesign(payload);

      //
      expect(result).toBeTruthy();
    });

    it('should return valid and parsed response from API on dev mode', async ({ expect }) => {
      const client = new AntigroHttpClientService('api_secret_key', 'dev');

      const payload = {
        designId: '123-123',
      };

      const result = await client.updateClientDesign(payload);

      //
      expect(result).toBeTruthy();
    });

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
      await expect(() => client.updateClientDesign(payload)).rejects.toThrow(
        `Network error in updateClientDesign: Network error`,
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
      await expect(() => client.updateClientDesign(payload)).rejects.toThrow(
        `Network error in updateClientDesign: Network error`,
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
      await expect(() => client.updateClientDesign(payload)).rejects.toThrow(
        `Validation error in updateClientDesign:`,
      );
    });
  });
});
