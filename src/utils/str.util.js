/**
 * Utility class for string operations
 */
export default class Str {
  /**
   * Converts a string to Title Case
   * @param {string | null} text - The input text
   * @returns {string | null} - The converted text, or null if input is invalid
   */
  static title(text) {
    if (!text) {
      return null
    }
    return text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())
  }

  /**
   * Converts a string to lowercase
   * @param {string | null} text - The input text
   * @returns {string | null} - The lowercase text, or null if input is invalid
   */
  static lower(text) {
    if (!text) {
      return null
    }
    return text.toLowerCase()
  }
  /**
   * Converts an object into a structured attributes format.
   * @param {Record<string, any> | null} data - The input data.
   * @returns {{ attributes: Record<string, any> } | null} - The formatted attributes or null.
   */
  static attributes(data = null) {
    // Periksa jika data null atau undefined
    if (data === null || data === undefined) {
      return null
    }

    // Pastikan data adalah objek, jika tidak return null
    if (typeof data !== 'object' || Array.isArray(data)) {
      return null
    }

    // Periksa apakah ada setidaknya satu properti valid
    const hasValidProperties = Object.values(data).some(
      (value) => value !== undefined && value !== null
    )
    if (!hasValidProperties) {
      return null
    }

    return {
      attributes: { ...data },
    }
  }
}
