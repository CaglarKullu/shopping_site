export function textEllipsis(
  str: string,
  maxLength: number,
  { side = "end", ellipsis = "..." } = {}
): string {
  // If the string is shorter than or equal to the maximum allowed length, return it as is.
  if (str.length <= maxLength) return str;

  // Calculate the available characters for content after considering the ellipsis.
  const availableLength = maxLength - ellipsis.length;

  // Ensure availableLength is positive
  if (availableLength <= 0) return ellipsis;

  if (side === "start") {
    // Get the last part of the string that fits within the available length.
    let truncated = str.slice(str.length - availableLength);

    // Attempt to find the first space in the truncated string.
    const spaceIndex = truncated.indexOf(" ");
    if (spaceIndex !== -1 && spaceIndex < truncated.length - 1) {
      // Cut after the space so that we do not start in the middle of a word.
      truncated = truncated.slice(spaceIndex + 1);
    }
    return ellipsis + truncated;
  } else {
    // Default and "end": take the beginning slice of the string.
    let truncated = str.slice(0, availableLength);

    // Attempt to find the last space in the truncated string.
    const spaceIndex = truncated.lastIndexOf(" ");
    if (spaceIndex !== -1) {
      // Cut at the last space so that we do not end in the middle of a word.
      truncated = truncated.slice(0, spaceIndex);
    }
    return truncated + ellipsis;
  }
}
