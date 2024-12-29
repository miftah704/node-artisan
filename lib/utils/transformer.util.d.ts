/**
 * Base class for transforming data with caching and customization
 */
export default class Transformer {
    /**
     * A cache for storing transformation results
     * @type {Map<string, any>}
     */
    static cache: Map<string, any>;
    /**
     * Transform data by checking the cache before processing.
     * @param {any} data - The input data to transform
     * @param {string} [lang] - Optional language parameter
     * @returns {any | null} - The transformed data or null if input is invalid
     */
    static transform(data: any, lang?: string): any | null;
    /**
     * Process a single data item with caching.
     * @param {any} data - The input data
     * @param {string} [lang] - Optional language parameter
     * @returns {any | null} - The transformed data or null if input is invalid
     */
    static transformSingle(data: any, lang?: string): any | null;
    /**
     * Generate a hash from the data and language.
     * @param {any} data - The input data
     * @param {string} [lang] - Optional language parameter
     * @returns {string} - A unique hash for the input
     */
    static generateHash(data: any, lang?: string): string;
    /**
     * Check if the data is a Collection.
     * @param {any} data - The input data
     * @returns {boolean} - True if the data is a Collection
     */
    static isCollection(data: any): boolean;
    /**
     * Protected method for formatting data.
     * Subclasses must override this.
     * @param {any} data - The input data
     * @param {string} [lang] - Optional language parameter
     * @returns {any} - The formatted result
     * @throws {Error} - If the method is not overridden
     */
    static _format(data: any, lang?: string): any;
}
