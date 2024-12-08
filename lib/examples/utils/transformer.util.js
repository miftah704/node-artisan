/**
 * Base class for transforming data with caching and customization
 */
export default class Transformer {
  /**
   * A cache for storing transformation results
   * @type {Map<string, any>}
   */
  static cache = new Map();

  /**
   * Transform data by checking the cache before processing.
   * @param {any} data - The input data to transform
   * @param {string} [lang] - Optional language parameter
   * @returns {any | null} - The transformed data or null if input is invalid
   */
  static transform(data, lang) {
    if (!data) return null;

    // Handle array
    if (Array.isArray(data)) {
      return data.map(item => this.transformSingle(item, lang));
    }

    // Handle single object
    return this.transformSingle(data, lang);
  }

  /**
   * Process a single data item with caching.
   * @param {any} data - The input data
   * @param {string} [lang] - Optional language parameter
   * @returns {any | null} - The transformed data or null if input is invalid
   */
  static transformSingle(data, lang) {
    const hash = this.generateHash(data, lang);

    // Return cached result if available
    if (this.cache.has(hash)) {
      return this.cache.get(hash) || null;
    }

    // Process and cache the result
    const result = this._format(data, lang); // Call protected method
    this.cache.set(hash, result);
    return result;
  }

  /**
   * Generate a hash from the data and language.
   * @param {any} data - The input data
   * @param {string} [lang] - Optional language parameter
   * @returns {string} - A unique hash for the input
   */
  static generateHash(data, lang) {
    return JSON.stringify(data); // Simple hashing using JSON.stringify
  }

  /**
   * Protected method for formatting data.
   * Subclasses must override this.
   * @param {any} data - The input data
   * @param {string} [lang] - Optional language parameter
   * @returns {any} - The formatted result
   * @throws {Error} - If the method is not overridden
   */
  static _format(data, lang) {
    throw new Error('The _format method must be implemented in subclasses.');
  }
}