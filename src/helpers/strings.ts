export const toCamelCase = (input: string): string => {
    return input
      .toLowerCase() // Convert to lowercase
      .replace(/[^a-zA-Z0-9]+(.)/g, (match, char) => char.toUpperCase());
  }