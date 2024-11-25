import { describe, it, beforeEach } from 'vitest';
import { Antigro } from '../antigro';
import { validGetDesignResponse, validPatchDesignResponse, validPostDesignResponse } from '../../mocks/handlers';

describe('Antigro', () => {
  let antigro: Antigro;
  beforeEach(() => {
    antigro = new Antigro('123-123', 'prod');
  });

  //
  describe('constructor', () => {
    it('should throw an error if api type is not defined', ({ expect }) => {
      //@ts-expect-error
      expect(() => new Antigro('123-123', null)).toThrow('API type is missing');
    });

    it('should throw an error if secret key is not defined', ({ expect }) => {
      //@ts-expect-error
      expect(() => new Antigro(null, 'prod')).toThrow('Secret key is missing');
    });
  });

  //
  describe('createToken', () => {
    it('should return jwt token as string', async ({ expect }) => {
      const result = await antigro.createToken('123');
      expect(typeof result).toBe('string');
    });
  });

  //
  describe('getClientDesign', () => {
    it('should return design data', async ({ expect }) => {
      const result = await antigro.getClientDesign('123');
      expect(result).toEqual(validGetDesignResponse);
    });
  });

  //
  describe('createClientDesign', () => {
    it('should return created design data', async ({ expect }) => {
      const result = await antigro.createClientDesign({
        sellerId: '123-123',
        productCode: '123-123',
        returnUrl: 'http://test.com',
      });
      expect(result).toEqual(validPostDesignResponse);
    });
  });

  //
  describe('updateClientDesign', () => {
    it('should return updated design data', async ({ expect }) => {
      const result = await antigro.updateClientDesign({
        designId: '123-123',
      });
      expect(result).toBeTruthy();
    });
  });
});