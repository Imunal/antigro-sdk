/**
 * @class
 * @extends {Error}
 */
export class AntigroError extends Error {
  constructor(
    message: string,
    public readonly type: 'VALIDATION' | 'NETWORK' | 'UNKNOWN',
  ) {
    super(message);
    this.name = 'AntigroError';
  }
}