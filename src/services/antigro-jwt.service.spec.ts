import {describe, it } from 'vitest';
import { AntigroServiceJWT } from './antigro-jwt.service';

describe('AntigroServiceJWT', () => {
  describe('generateJWT', () => {
    //
    it('should throw an error if passed secretKey is not a valid string', ({expect}) => {
      const jwtService = new AntigroServiceJWT();
      //@ts-expect-error
      expect(() => jwtService.generateJWT({secretKey: 123})).rejects.toThrow('secretKey must be a string');
    })

    it('should throw an error if passed secretKey is undefined', ({expect}) => {
      const jwtService = new AntigroServiceJWT();
      //@ts-expect-error
      expect(() => jwtService.generateJWT({secretKey: undefined})).rejects.toThrow('Missing secretKey');
    })

    it('should throw an error if passed secretKey is null', ({expect}) => {
      const jwtService = new AntigroServiceJWT();
      //@ts-expect-error
      expect(() => jwtService.generateJWT({secretKey: null})).rejects.toThrow('Missing secretKey');
    })

    //
    it('should generate JWT with correct secretKey', async ({expect}) => {
      const jwtService = new AntigroServiceJWT();
      const jwtSigned = await jwtService.generateJWT({secretKey: '123'})
      expect(typeof jwtSigned).toBe("string");
    })
  })
})