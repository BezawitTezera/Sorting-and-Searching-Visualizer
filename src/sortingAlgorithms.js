// Bubble Sort
export function bubbleSort(arr) {
  const animations = [];
  const n = arr.length;
  const arrCopy = [...arr];

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Add comparison animation
      animations.push({
        type: "compare",
        indices: [j, j + 1],
        newArray: [...arrCopy],
      });

      if (arrCopy[j] > arrCopy[j + 1]) {
        // Swap elements
        [arrCopy[j], arrCopy[j + 1]] = [arrCopy[j + 1], arrCopy[j]];

        // Add swap animation
        animations.push({
          type: "swap",
          indices: [j, j + 1],
          newArray: [...arrCopy],
        });
      }
    }
  }

  return animations;
}

// Selection Sort
export function selectionSort(arr) {
  const animations = [];
  const n = arr.length;
  const arrCopy = [...arr];

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    for (let j = i + 1; j < n; j++) {
      // Add comparison animation
      animations.push({
        type: "compare",
        indices: [minIdx, j],
        newArray: [...arrCopy],
      });

      if (arrCopy[j] < arrCopy[minIdx]) {
        minIdx = j;
      }
    }

    // Swap the found minimum element with the first element
    if (minIdx !== i) {
      [arrCopy[i], arrCopy[minIdx]] = [arrCopy[minIdx], arrCopy[i]];

      // Add swap animation
      animations.push({
        type: "swap",
        indices: [i, minIdx],
        newArray: [...arrCopy],
      });
    }
  }

  return animations;
}

// Insertion Sort
export function insertionSort(arr) {
  const animations = [];
  const n = arr.length;
  const arrCopy = [...arr];

  for (let i = 1; i < n; i++) {
    const key = arrCopy[i];
    let j = i - 1;

    // Add comparison animation
    animations.push({
      type: "compare",
      indices: [i, j],
      newArray: [...arrCopy],
    });

    while (j >= 0 && arrCopy[j] > key) {
      arrCopy[j + 1] = arrCopy[j];

      // Add swap animation
      animations.push({
        type: "swap",
        indices: [j, j + 1],
        newArray: [...arrCopy],
      });

      j--;

      if (j >= 0) {
        // Add comparison animation for the next iteration
        animations.push({
          type: "compare",
          indices: [i, j],
          newArray: [...arrCopy],
        });
      }
    }

    arrCopy[j + 1] = key;
  }

  return animations;
}

// Merge Sort
export function mergeSortAnimations(arr) {
  const animations = [];
  const arrCopy = [...arr];
  const tempArray = [...arr];

  function mergeSortHelper(array, temp, left, right) {
    if (left >= right) return;

    const middle = Math.floor((left + right) / 2);
    mergeSortHelper(array, temp, left, middle);
    mergeSortHelper(array, temp, middle + 1, right);
    merge(array, temp, left, middle, right);
  }

  function merge(array, temp, left, middle, right) {
    // Copy both parts into the temporary array
    for (let i = left; i <= right; i++) {
      temp[i] = array[i];
    }

    let i = left;
    let j = middle + 1;
    let k = left;

    // Merge the two parts back into the original array
    while (i <= middle && j <= right) {
      // Add comparison animation
      animations.push({
        type: "compare",
        indices: [i, j],
        newArray: [...arrCopy],
      });

      if (temp[i] <= temp[j]) {
        array[k] = temp[i];
        i++;
      } else {
        array[k] = temp[j];
        j++;
      }

      // Update the copy for visualization
      arrCopy[k] = array[k];

      // Add swap animation
      animations.push({
        type: "swap",
        indices: [k],
        newArray: [...arrCopy],
      });

      k++;
    }

    // Copy the remaining elements
    while (i <= middle) {
      array[k] = temp[i];
      arrCopy[k] = array[k];

      // Add swap animation
      animations.push({
        type: "swap",
        indices: [k],
        newArray: [...arrCopy],
      });

      k++;
      i++;
    }

    while (j <= right) {
      array[k] = temp[j];
      arrCopy[k] = array[k];

      // Add swap animation
      animations.push({
        type: "swap",
        indices: [k],
        newArray: [...arrCopy],
      });

      k++;
      j++;
    }
  }

  mergeSortHelper(arrCopy, tempArray, 0, arrCopy.length - 1);
  return animations;
}

// Quick Sort
export function quickSortAnimations(arr) {
  const animations = [];
  const arrCopy = [...arr];

  function partition(array, low, high) {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      // Add comparison animation
      animations.push({
        type: "compare",
        indices: [j, high],
        newArray: [...arrCopy],
      });

      if (array[j] < pivot) {
        i++;

        // Swap array[i] and array[j]
        [array[i], array[j]] = [array[j], array[i]];

        // Update the copy for visualization
        [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];

        // Add swap animation
        animations.push({
          type: "swap",
          indices: [i, j],
          newArray: [...arrCopy],
        });
      }
    }

    // Swap array[i+1] and array[high] (put the pivot in its correct position)
    [array[i + 1], array[high]] = [array[high], array[i + 1]];

    // Update the copy for visualization
    [arrCopy[i + 1], arrCopy[high]] = [arrCopy[high], arrCopy[i + 1]];

    // Add swap animation
    animations.push({
      type: "swap",
      indices: [i + 1, high],
      newArray: [...arrCopy],
    });

    return i + 1;
  }

  function quickSortHelper(array, low, high) {
    if (low < high) {
      const pi = partition(array, low, high);

      // Recursively sort the sub-arrays
      quickSortHelper(array, low, pi - 1);
      quickSortHelper(array, pi + 1, high);
    }
  }

  quickSortHelper(arrCopy, 0, arrCopy.length - 1);
  return animations;
}

// Heap Sort
export function heapSortAnimations(arr) {
  const animations = [];
  const arrCopy = [...arr];
  const n = arrCopy.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arrCopy, n, i);
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    [arrCopy[0], arrCopy[i]] = [arrCopy[i], arrCopy[0]];

    // Add swap animation
    animations.push({
      type: "swap",
      indices: [0, i],
      newArray: [...arrCopy],
    });

    // Call max heapify on the reduced heap
    heapify(arrCopy, i, 0);
  }

  function heapify(array, size, rootIndex) {
    let largest = rootIndex;
    const left = 2 * rootIndex + 1;
    const right = 2 * rootIndex + 2;

    // Compare with left child
    if (left < size) {
      animations.push({
        type: "compare",
        indices: [largest, left],
        newArray: [...arrCopy],
      });

      if (array[left] > array[largest]) {
        largest = left;
      }
    }

    // Compare with right child
    if (right < size) {
      animations.push({
        type: "compare",
        indices: [largest, right],
        newArray: [...arrCopy],
      });

      if (array[right] > array[largest]) {
        largest = right;
      }
    }

    // If largest is not root
    if (largest !== rootIndex) {
      [array[rootIndex], array[largest]] = [array[largest], array[rootIndex]];

      // Add swap animation
      animations.push({
        type: "swap",
        indices: [rootIndex, largest],
        newArray: [...arrCopy],
      });

      // Recursively heapify the affected sub-tree
      heapify(array, size, largest);
    }
  }

  return animations;
}
