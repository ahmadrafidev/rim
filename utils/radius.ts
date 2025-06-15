/**
 * Calculates the outer radius based on inner radius and padding
 * This approach is more intuitive - set your desired inner radius first,
 * then add padding, and the outer radius adjusts automatically
 */
export function calculateOuterRadius(innerRadius: number, padding: number): number {
  // Outer radius = inner radius + padding
  return innerRadius + padding;
}
