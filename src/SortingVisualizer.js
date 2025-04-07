import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Check, Search } from "lucide-react";

// Import sorting algorithms
import {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSortAnimations,
  quickSortAnimations,
  heapSortAnimations,
} from "./sortingAlgorithms";

// Import searching algorithms
import { linearSearch, binarySearch } from "./searchingAlgorithms";

// Import utilities
import {
  DEFAULT_ARRAY_SIZE,
  DEFAULT_ANIMATION_SPEED,
  MIN_VALUE,
  MAX_VALUE,
  generateRandomArray,
  animateSort,
  animateSearch,
  getBarColor,
  getBarClassName,
} from "./visualizerUtils";

// Main component
const SortingVisualizer = () => {
  // State variables
  const [array, setArray] = useState([]);
  const [sortedArray, setSortedArray] = useState([]);
  const [arraySize, setArraySize] = useState(DEFAULT_ARRAY_SIZE);
  const [animationSpeed, setAnimationSpeed] = useState(DEFAULT_ANIMATION_SPEED);
  const [currentAlgorithm, setCurrentAlgorithm] = useState("bubbleSort");
  const [searchAlgorithm, setSearchAlgorithm] = useState("linearSearch");
  const [searchValue, setSearchValue] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSorting, setIsSorting] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [foundIndex, setFoundIndex] = useState(-1);
  const [comparingIndices, setComparingIndices] = useState([]);
  const [swappingIndices, setSwappingIndices] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Generate a new random array
  const handleGenerateArray = () => {
    const newArray = generateRandomArray(arraySize);
    setArray(newArray);
    setSortedArray([...newArray].sort((a, b) => a - b));
    resetVisualState();
  };

  // Reset visual state
  const resetVisualState = () => {
    setComparingIndices([]);
    setSwappingIndices([]);
    setFoundIndex(-1);
  };

  // Initialize the array when component mounts or array size changes
  useEffect(() => {
    handleGenerateArray();
  }, [arraySize]);

  // Handle array size change
  const handleArraySizeChange = (e) => {
    const size = parseInt(e.target.value);
    setArraySize(size);
  };

  // Handle animation speed change
  const handleSpeedChange = (e) => {
    const speed = parseInt(e.target.value);
    setAnimationSpeed(speed);
  };

  // Handle algorithm selection change
  const handleAlgorithmChange = (e) => {
    setCurrentAlgorithm(e.target.value);
  };

  // Handle search algorithm selection change
  const handleSearchAlgorithmChange = (e) => {
    setSearchAlgorithm(e.target.value);
  };

  // Handle search value change
  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  // Start sorting animation
  const startSorting = async () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setIsSorting(true);
    resetVisualState();

    // Clone the array to avoid modifying the original
    const arrCopy = [...array];

    let animations = [];
    switch (currentAlgorithm) {
      case "bubbleSort":
        animations = bubbleSort(arrCopy);
        break;
      case "selectionSort":
        animations = selectionSort(arrCopy);
        break;
      case "insertionSort":
        animations = insertionSort(arrCopy);
        break;
      case "mergeSort":
        animations = mergeSortAnimations(arrCopy);
        break;
      case "quickSort":
        animations = quickSortAnimations(arrCopy);
        break;
      case "heapSort":
        animations = heapSortAnimations(arrCopy);
        break;
      default:
        animations = bubbleSort(arrCopy);
    }

    await animateSort(
      animations,
      setArray,
      setComparingIndices,
      setSwappingIndices,
      animationSpeed
    );

    setIsAnimating(false);
    setIsSorting(false);
  };

  // Start searching animation
  const startSearching = async () => {
    if (isAnimating || searchValue === "") return;

    setIsAnimating(true);
    setIsSearching(true);
    resetVisualState();

    const target = parseInt(searchValue);

    let animations = [];
    switch (searchAlgorithm) {
      case "linearSearch":
        animations = linearSearch(array, target);
        break;
      case "binarySearch":
        // For binary search, we need a sorted array
        const sortedArr = [...array].sort((a, b) => a - b);
        setArray(sortedArr); // Update the displayed array to sorted
        animations = binarySearch(sortedArr, target);
        break;
      default:
        animations = linearSearch(array, target);
    }

    await animateSearch(
      animations,
      setComparingIndices,
      setFoundIndex,
      animationSpeed
    );

    setIsAnimating(false);
    setIsSearching(false);
  };

  // Reset the array and visualization
  const resetArray = () => {
    if (isAnimating) return;
    handleGenerateArray();
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`flex flex-col h-screen p-4 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <header className="mb-4">
        <h1 className="text-2xl font-bold mb-2">
          Sorting & Searching Visualizer
        </h1>
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={resetArray}
            disabled={isAnimating}
            className={`flex items-center px-3 py-1 rounded ${
              isDarkMode
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white font-medium disabled:opacity-50`}
          >
            <RotateCcw size={16} className="mr-1" /> Reset
          </button>

          <button
            onClick={startSorting}
            disabled={isAnimating}
            className={`flex items-center px-3 py-1 rounded ${
              isDarkMode
                ? "bg-green-600 hover:bg-green-700"
                : "bg-green-500 hover:bg-green-600"
            } text-white font-medium disabled:opacity-50`}
          >
            {isAnimating && isSorting ? (
              <Pause size={16} className="mr-1" />
            ) : (
              <Play size={16} className="mr-1" />
            )}
            Sort
          </button>

          <div className="flex items-center">
            <select
              value={currentAlgorithm}
              onChange={handleAlgorithmChange}
              disabled={isAnimating}
              className={`px-3 py-1 rounded mr-4 ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-300"
              } border`}
            >
              <option value="bubbleSort">Bubble Sort</option>
              <option value="selectionSort">Selection Sort</option>
              <option value="insertionSort">Insertion Sort</option>
              <option value="mergeSort">Merge Sort</option>
              <option value="quickSort">Quick Sort</option>
              <option value="heapSort">Heap Sort</option>
            </select>
          </div>

          <div className="flex items-center ml-4">
            <label className="mr-2">Size:</label>
            <input
              type="range"
              min="10"
              max="100"
              value={arraySize}
              onChange={handleArraySizeChange}
              disabled={isAnimating}
              className="w-32"
            />
            <span className="ml-2">{arraySize}</span>
          </div>

          <div className="flex items-center ml-4">
            <label className="mr-2">Speed:</label>
            <input
              type="range"
              min="1"
              max="100"
              value={animationSpeed}
              onChange={handleSpeedChange}
              className="w-32"
            />
            <span className="ml-2">{animationSpeed}</span>
          </div>

          <button
            onClick={toggleDarkMode}
            className={`ml-auto px-3 py-1 rounded ${
              isDarkMode
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-gray-600 hover:bg-gray-700 text-white"
            }`}
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center">
            <select
              value={searchAlgorithm}
              onChange={handleSearchAlgorithmChange}
              disabled={isAnimating}
              className={`px-3 py-1 rounded mr-2 ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-300"
              } border`}
            >
              <option value="linearSearch">Linear Search</option>
              <option value="binarySearch">Binary Search</option>
            </select>

            <input
              type="number"
              value={searchValue}
              onChange={handleSearchValueChange}
              placeholder="Value to search"
              disabled={isAnimating}
              className={`px-3 py-1 rounded mr-2 w-32 ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-300"
              } border`}
            />

            <button
              onClick={startSearching}
              disabled={isAnimating || searchValue === ""}
              className={`flex items-center px-3 py-1 rounded ${
                isDarkMode
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "bg-purple-500 hover:bg-purple-600"
              } text-white font-medium disabled:opacity-50`}
            >
              <Search size={16} className="mr-1" /> Search
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        <div className="flex h-full items-end relative">
          {array.map((value, idx) => (
            <div
              key={idx}
              className={`w-full mx-px ${getBarClassName(idx, foundIndex)}`}
              style={{
                height: `${(value / MAX_VALUE) * 100}%`,
                backgroundColor: getBarColor(
                  idx,
                  foundIndex,
                  swappingIndices,
                  comparingIndices,
                  isDarkMode
                ),
                transition: "height 0.1s ease",
              }}
            ></div>
          ))}
        </div>
      </main>

      <footer className="mt-4 text-sm text-center">
        <div className="flex justify-center gap-4 mb-2">
          <div className="flex items-center">
            <div
              className={`w-4 h-4 ${
                isDarkMode ? "bg-blue-500" : "bg-blue-400"
              } mr-1`}
            ></div>
            <span>Normal</span>
          </div>
          <div className="flex items-center">
            <div
              className={`w-4 h-4 ${
                isDarkMode ? "bg-yellow-500" : "bg-yellow-400"
              } mr-1`}
            ></div>
            <span>Comparing</span>
          </div>
          <div className="flex items-center">
            <div
              className={`w-4 h-4 ${
                isDarkMode ? "bg-red-500" : "bg-red-400"
              } mr-1`}
            ></div>
            <span>Swapping</span>
          </div>
          <div className="flex items-center">
            <div
              className={`w-4 h-4 ${
                isDarkMode ? "bg-green-500" : "bg-green-400"
              } mr-1`}
            ></div>
            <span>Found</span>
          </div>
        </div>
              <p>Bezawit Tezera 2025 </p>
        <p>© 2025 Sorting Visualizer</p>
      </footer>
    </div>
  );
};

export default SortingVisualizer;
