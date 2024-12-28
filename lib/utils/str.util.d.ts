/**
 * Utility class for string operations
 */
export default class Str {
    /**
     * Converts a string to Title Case
     * @param {string | null} text - The input text
     * @returns {string | null} - The converted text, or null if input is invalid
     */
    static title(text: string | null): string | null;
    /**
     * Converts a string to lowercase
     * @param {string | null} text - The input text
     * @returns {string | null} - The lowercase text, or null if input is invalid
     */
    static lower(text: string | null): string | null;
    /**
     * Converts an object into a structured attributes format.
     * @param {Record<string, any> | null} data - The input data.
     * @returns {{ attributes: Record<string, any> } | null} - The formatted attributes or null.
     */
    static attributes(data?: Record<string, any> | null): {
        attributes: Record<string, any>;
    } | null;
}
