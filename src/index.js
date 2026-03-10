/**
 * Demo module — simple utilities for GitHub Actions demo
 */

/**
 * Greet by name
 * @param {string} name
 * @returns {string}
 */
export function greet(name) {
  return `Hello, ${name}!`;
}

/**
 * Add two numbers
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export function add(a, b) {
  return a + b;
}

/**
 * Get current timestamp string (for demo artifact)
 * @returns {string}
 */
export function getTimestamp() {
  return new Date().toISOString();
}
