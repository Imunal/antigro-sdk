import { describe, it } from 'vitest';
import { AntigroServiceJWT } from './antigro-jwt.service';

describe('AntigroServiceJWT', () => {
  describe('generateJWT', () => {
    //
    it('should throw an error if passed secretKey is not a valid string', async ({
      expect,
    }) => {
      const jwtService = new AntigroServiceJWT();
      await expect(() =>
        //@ts-expect-error
        jwtService.generateJWT({ secretKey: 123 }),
      ).rejects.toThrow('secretKey must be a string');
    });

    it('should throw an error if passed secretKey is undefined', async ({
      expect,
    }) => {
      const jwtService = new AntigroServiceJWT();
      await expect(() =>
        //@ts-expect-error
        jwtService.generateJWT({ secretKey: undefined }),
      ).rejects.toThrow('Missing secretKey');
    });

    it('should throw an error if passed secretKey is null', async ({
      expect,
    }) => {
      const jwtService = new AntigroServiceJWT();
      await expect(() =>
        //@ts-expect-error
        jwtService.generateJWT({ secretKey: null }),
      ).rejects.toThrow('Missing secretKey');
    });

    //
    it('should generate JWT with correct secretKey', async ({ expect }) => {
      const jwtService = new AntigroServiceJWT();
      const jwtSigned = await jwtService.generateJWT({ secretKey: '123' });
      expect(typeof jwtSigned).toBe('string');
    });
  });
});
