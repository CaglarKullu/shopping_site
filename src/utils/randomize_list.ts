
export function randomizeList<T>(list: T[]): T[] {
    // Create a shallow copy of the list to avoid mutating the original array.
    const array = [...list];
  
    // Loop from the end of the array to the beginning.
    for (let i = array.length - 1; i > 0; i--) {
      // Generate a random index between 0 and i (inclusive).
      const j = Math.floor(Math.random() * (i + 1));
  
      // Swap elements at indices i and j.
      [array[i], array[j]] = [array[j], array[i]];
    }
  
    return array;
  }
  