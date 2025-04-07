// Linear Search
export function linearSearch(arr, target) {
  const animations = [];

  for (let i = 0; i < arr.length; i++) {
    // Add comparison animation
    animations.push({
      type: "compare",
      index: i,
    });

    if (arr[i] === target) {
      // Add found animation
      animations.push({
        type: "found",
        index: i,
      });

      return animations;
    }
  }

  return animations;
}

// Binary Search
export function binarySearch(arr, target) {
  const animations = [];
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    // Add comparison animation
    animations.push({
      type: "compare",
      index: mid,
    });

    if (arr[mid] === target) {
      // Add found animation
      animations.push({
        type: "found",
        index: mid,
      });

      return animations;
    }

    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return animations;
}
