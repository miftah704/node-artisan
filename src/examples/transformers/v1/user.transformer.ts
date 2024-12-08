import { Transformer, Str as Attr } from 'nodejs-artisan'

export default class UserTransformer extends Transformer {
  /**
   * Override the protected _format method
   * @param {any} data - The input data
   * @param {string} [_lang] - Optional language parameter
   * @returns {Record<string, any> | null} - The formatted result
   */
  static override _format(data: any, _lang?: string): Record<string, any> | null {
    return Attr.attributes({
      // Transformer data here
    });
  }
}