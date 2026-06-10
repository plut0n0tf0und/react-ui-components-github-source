/**
 * Common utilities for data operations.
 */

export function checkTypeOfData(val, type) {
  if (type === "string") {
    return typeof val === "string";
  }
  if (type === "number") {
    return typeof val === "number" && !isNaN(val);
  }
  return typeof val === type;
}
