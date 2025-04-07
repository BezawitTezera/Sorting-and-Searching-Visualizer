// Constants
export const DEFAULT_ARRAY_SIZE = 50;
export const DEFAULT_ANIMATION_SPEED = 50;
export const MIN_VALUE = 5;
export const MAX_VALUE = 500;

// Generate a random array of given size
export function generateRandomArray(size) {
  const newArray = [];
  for (let i = 0; i < size; i++) {
    newArray.push(
      Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1)) + MIN_VALUE
    );
  }
  return newArray;
}

// Animate sorting process
export const animateSort = async (
  animations,
  setArray,
  setComparingIndices,
  setSwappingIndices,
  animationSpeed
) => {
  for (let i = 0; i < animations.length; i++) {
    const { type, indices, newArray } = animations[i];

    if (type === "compare") {
      setComparingIndices(indices);
    } else if (type === "swap") {
      setSwappingIndices(indices);
      setArray(newArray);
    }

    // Wait for the specified animation speed
    await new Promise((resolve) => setTimeout(resolve, 101 - animationSpeed));
  }

  // Clear visual indicators at the end
  setComparingIndices([]);
  setSwappingIndices([]);
};

// Animate searching process
export const animateSearch = async (
  animations,
  setComparingIndices,
  setFoundIndex,
  animationSpeed
) => {
  for (let i = 0; i < animations.length; i++) {
    const { type, index } = animations[i];

    if (type === "compare") {
      setComparingIndices([index]);
    } else if (type === "found") {
      setFoundIndex(index);
    }

    // Wait for the specified animation speed
    await new Promise((resolve) => setTimeout(resolve, 101 - animationSpeed));
  }

  // If the last animation wasn't a 'found' type, it means the value wasn't found
  if (
    animations.length > 0 &&
    animations[animations.length - 1].type !== "found"
  ) {
    // Indicate not found by flashing all bars temporarily
    setComparingIndices(Array.from({ length: animations.length }, (_, i) => i));
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  // Clear visual indicators after a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  setComparingIndices([]);
  setFoundIndex(-1);
};

// Get bar color based on its state
export function getBarColor(
  index,
  foundIndex,
  swappingIndices,
  comparingIndices,
  isDarkMode
) {
  if (foundIndex === index) {
    return isDarkMode ? "#10B981" : "#34D399"; // Green for found
  } else if (swappingIndices.includes(index)) {
    return isDarkMode ? "#EF4444" : "#F87171"; // Red for swapping
  } else if (comparingIndices.includes(index)) {
    return isDarkMode ? "#F59E0B" : "#FBBF24"; // Yellow for comparing
  } else {
    return isDarkMode ? "#3B82F6" : "#60A5FA"; // Blue for normal
  }
}

// Get bar class name based on its state
export function getBarClassName(index, foundIndex) {
  if (foundIndex === index) {
    return "animate-pulse";
  }
  return "";
}
