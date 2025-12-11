export type Language = 'javascript' | 'python';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  inputFormat: string;
  outputFormat: string;
  examples: { input: string; output: string; explanation?: string }[];
  difficulty: Difficulty;
  tags: string[];
  language: Language;
  chapter: string;
  starterCode: string;
  testCases: TestCase[];
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  icon: string;
  problems: Problem[];
}

export interface LanguageData {
  id: Language;
  name: string;
  icon: string;
  chapters: Chapter[];
}

// JavaScript Problems
const jsProblems: Problem[] = [
  {
    id: 'js-var-1',
    title: 'Hello World',
    description: `# Hello World

Write a function that returns the string "Hello, World!".

This is the classic first program that every programmer writes. It introduces you to the basic syntax of JavaScript functions.

## Task
Complete the function \`helloWorld\` that returns the greeting string.`,
    inputFormat: 'No input required',
    outputFormat: 'A string: "Hello, World!"',
    examples: [
      { input: 'None', output: '"Hello, World!"', explanation: 'The function simply returns the greeting string.' }
    ],
    difficulty: 'easy',
    tags: ['basics', 'strings'],
    language: 'javascript',
    chapter: 'variables',
    starterCode: `function helloWorld() {
  // Write your code here
  
}

// Do not modify below this line
console.log(helloWorld());`,
    testCases: [
      { id: 't1', input: '', expectedOutput: 'Hello, World!', isHidden: false },
    ]
  },
  {
    id: 'js-var-2',
    title: 'Sum Two Numbers',
    description: `# Sum Two Numbers

Write a function that takes two numbers as arguments and returns their sum.

## Task
Complete the function \`sum\` that accepts two parameters and returns their addition.`,
    inputFormat: 'Two integers a and b',
    outputFormat: 'An integer representing the sum of a and b',
    examples: [
      { input: 'sum(2, 3)', output: '5', explanation: '2 + 3 = 5' },
      { input: 'sum(-1, 1)', output: '0', explanation: '-1 + 1 = 0' }
    ],
    difficulty: 'easy',
    tags: ['basics', 'math'],
    language: 'javascript',
    chapter: 'variables',
    starterCode: `function sum(a, b) {
  // Write your code here
  
}

// Test cases
console.log(sum(2, 3));
console.log(sum(-1, 1));
console.log(sum(100, 200));`,
    testCases: [
      { id: 't1', input: '2, 3', expectedOutput: '5', isHidden: false },
      { id: 't2', input: '-1, 1', expectedOutput: '0', isHidden: false },
      { id: 't3', input: '100, 200', expectedOutput: '300', isHidden: true },
    ]
  },
  {
    id: 'js-var-3',
    title: 'Variable Swap',
    description: `# Variable Swap

Write a function that swaps the values of two variables and returns them as an array.

## Task
Complete the function \`swap\` that takes two values and returns them in reversed order as an array [b, a].`,
    inputFormat: 'Two values a and b',
    outputFormat: 'An array with values swapped [b, a]',
    examples: [
      { input: 'swap(1, 2)', output: '[2, 1]' },
      { input: 'swap("hello", "world")', output: '["world", "hello"]' }
    ],
    difficulty: 'easy',
    tags: ['basics', 'arrays'],
    language: 'javascript',
    chapter: 'variables',
    starterCode: `function swap(a, b) {
  // Write your code here
  
}

console.log(swap(1, 2));
console.log(swap("hello", "world"));`,
    testCases: [
      { id: 't1', input: '1, 2', expectedOutput: '[2, 1]', isHidden: false },
      { id: 't2', input: '"hello", "world"', expectedOutput: '["world", "hello"]', isHidden: true },
    ]
  },
  {
    id: 'js-loop-1',
    title: 'Count to N',
    description: `# Count to N

Write a function that prints numbers from 1 to n, each on a new line.

## Task
Complete the function \`countToN\` that takes a number n and logs each number from 1 to n.`,
    inputFormat: 'A positive integer n',
    outputFormat: 'Numbers from 1 to n, each on a new line',
    examples: [
      { input: 'countToN(5)', output: '1\n2\n3\n4\n5' }
    ],
    difficulty: 'easy',
    tags: ['loops', 'basics'],
    language: 'javascript',
    chapter: 'loops',
    starterCode: `function countToN(n) {
  // Write your code here
  
}

countToN(5);`,
    testCases: [
      { id: 't1', input: '5', expectedOutput: '1\n2\n3\n4\n5', isHidden: false },
      { id: 't2', input: '3', expectedOutput: '1\n2\n3', isHidden: true },
    ]
  },
  {
    id: 'js-loop-2',
    title: 'Sum of Array',
    description: `# Sum of Array

Write a function that calculates the sum of all numbers in an array.

## Task
Complete the function \`sumArray\` that takes an array of numbers and returns their total.`,
    inputFormat: 'An array of integers',
    outputFormat: 'The sum of all integers in the array',
    examples: [
      { input: 'sumArray([1, 2, 3, 4, 5])', output: '15' },
      { input: 'sumArray([-1, 0, 1])', output: '0' }
    ],
    difficulty: 'easy',
    tags: ['loops', 'arrays'],
    language: 'javascript',
    chapter: 'loops',
    starterCode: `function sumArray(arr) {
  // Write your code here
  
}

console.log(sumArray([1, 2, 3, 4, 5]));
console.log(sumArray([-1, 0, 1]));`,
    testCases: [
      { id: 't1', input: '[1, 2, 3, 4, 5]', expectedOutput: '15', isHidden: false },
      { id: 't2', input: '[-1, 0, 1]', expectedOutput: '0', isHidden: false },
      { id: 't3', input: '[100, 200, 300]', expectedOutput: '600', isHidden: true },
    ]
  },
  {
    id: 'js-loop-3',
    title: 'FizzBuzz',
    description: `# FizzBuzz

Write a function that prints numbers from 1 to n. For multiples of 3, print "Fizz". For multiples of 5, print "Buzz". For multiples of both, print "FizzBuzz".

## Task
Complete the classic FizzBuzz challenge!`,
    inputFormat: 'A positive integer n',
    outputFormat: 'Numbers or Fizz/Buzz/FizzBuzz from 1 to n',
    examples: [
      { input: 'fizzBuzz(15)', output: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz' }
    ],
    difficulty: 'easy',
    tags: ['loops', 'conditionals'],
    language: 'javascript',
    chapter: 'loops',
    starterCode: `function fizzBuzz(n) {
  // Write your code here
  
}

fizzBuzz(15);`,
    testCases: [
      { id: 't1', input: '15', expectedOutput: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz', isHidden: false },
      { id: 't2', input: '5', expectedOutput: '1\n2\nFizz\n4\nBuzz', isHidden: true },
    ]
  },
  {
    id: 'js-arr-1',
    title: 'Find Maximum',
    description: `# Find Maximum

Write a function that finds the largest number in an array.

## Task
Complete the function \`findMax\` that returns the maximum value from an array of numbers.`,
    inputFormat: 'An array of integers',
    outputFormat: 'The largest integer in the array',
    examples: [
      { input: 'findMax([1, 5, 3, 9, 2])', output: '9' },
      { input: 'findMax([-5, -1, -10])', output: '-1' }
    ],
    difficulty: 'easy',
    tags: ['arrays', 'searching'],
    language: 'javascript',
    chapter: 'arrays',
    starterCode: `function findMax(arr) {
  // Write your code here
  
}

console.log(findMax([1, 5, 3, 9, 2]));
console.log(findMax([-5, -1, -10]));`,
    testCases: [
      { id: 't1', input: '[1, 5, 3, 9, 2]', expectedOutput: '9', isHidden: false },
      { id: 't2', input: '[-5, -1, -10]', expectedOutput: '-1', isHidden: true },
    ]
  },
  {
    id: 'js-arr-2',
    title: 'Reverse Array',
    description: `# Reverse Array

Write a function that reverses an array without using the built-in reverse method.

## Task
Complete the function \`reverseArray\` that returns a new array with elements in reverse order.`,
    inputFormat: 'An array of any type',
    outputFormat: 'A new array with elements reversed',
    examples: [
      { input: 'reverseArray([1, 2, 3, 4, 5])', output: '[5, 4, 3, 2, 1]' }
    ],
    difficulty: 'easy',
    tags: ['arrays', 'manipulation'],
    language: 'javascript',
    chapter: 'arrays',
    starterCode: `function reverseArray(arr) {
  // Write your code here - don't use .reverse()!
  
}

console.log(reverseArray([1, 2, 3, 4, 5]));`,
    testCases: [
      { id: 't1', input: '[1, 2, 3, 4, 5]', expectedOutput: '[5, 4, 3, 2, 1]', isHidden: false },
      { id: 't2', input: '["a", "b", "c"]', expectedOutput: '["c", "b", "a"]', isHidden: true },
    ]
  },
  {
    id: 'js-func-1',
    title: 'Factorial',
    description: `# Factorial

Write a function that calculates the factorial of a number. The factorial of n (written as n!) is the product of all positive integers less than or equal to n.

## Task
Complete the function \`factorial\` using recursion or loops.`,
    inputFormat: 'A non-negative integer n',
    outputFormat: 'The factorial of n',
    examples: [
      { input: 'factorial(5)', output: '120', explanation: '5! = 5 × 4 × 3 × 2 × 1 = 120' },
      { input: 'factorial(0)', output: '1', explanation: '0! = 1 by definition' }
    ],
    difficulty: 'medium',
    tags: ['functions', 'recursion', 'math'],
    language: 'javascript',
    chapter: 'functions',
    starterCode: `function factorial(n) {
  // Write your code here
  
}

console.log(factorial(5));
console.log(factorial(0));`,
    testCases: [
      { id: 't1', input: '5', expectedOutput: '120', isHidden: false },
      { id: 't2', input: '0', expectedOutput: '1', isHidden: false },
      { id: 't3', input: '10', expectedOutput: '3628800', isHidden: true },
    ]
  },
  {
    id: 'js-func-2',
    title: 'Fibonacci',
    description: `# Fibonacci

Write a function that returns the nth Fibonacci number. The Fibonacci sequence is: 0, 1, 1, 2, 3, 5, 8, 13, 21...

## Task
Complete the function \`fibonacci\` that returns the nth number in the sequence (0-indexed).`,
    inputFormat: 'A non-negative integer n',
    outputFormat: 'The nth Fibonacci number',
    examples: [
      { input: 'fibonacci(0)', output: '0' },
      { input: 'fibonacci(6)', output: '8' }
    ],
    difficulty: 'medium',
    tags: ['functions', 'recursion', 'math'],
    language: 'javascript',
    chapter: 'functions',
    starterCode: `function fibonacci(n) {
  // Write your code here
  
}

console.log(fibonacci(0));
console.log(fibonacci(6));
console.log(fibonacci(10));`,
    testCases: [
      { id: 't1', input: '0', expectedOutput: '0', isHidden: false },
      { id: 't2', input: '6', expectedOutput: '8', isHidden: false },
      { id: 't3', input: '10', expectedOutput: '55', isHidden: true },
    ]
  },
  {
    id: 'js-str-1',
    title: 'Palindrome Check',
    description: `# Palindrome Check

Write a function that checks if a string is a palindrome (reads the same forwards and backwards).

## Task
Complete the function \`isPalindrome\` that returns true if the string is a palindrome, false otherwise. Ignore case and spaces.`,
    inputFormat: 'A string',
    outputFormat: 'Boolean (true or false)',
    examples: [
      { input: 'isPalindrome("racecar")', output: 'true' },
      { input: 'isPalindrome("hello")', output: 'false' }
    ],
    difficulty: 'easy',
    tags: ['strings', 'manipulation'],
    language: 'javascript',
    chapter: 'strings',
    starterCode: `function isPalindrome(str) {
  // Write your code here
  
}

console.log(isPalindrome("racecar"));
console.log(isPalindrome("hello"));
console.log(isPalindrome("A man a plan a canal Panama"));`,
    testCases: [
      { id: 't1', input: '"racecar"', expectedOutput: 'true', isHidden: false },
      { id: 't2', input: '"hello"', expectedOutput: 'false', isHidden: false },
      { id: 't3', input: '"A man a plan a canal Panama"', expectedOutput: 'true', isHidden: true },
    ]
  },
  {
    id: 'js-str-2',
    title: 'Count Vowels',
    description: `# Count Vowels

Write a function that counts the number of vowels (a, e, i, o, u) in a string.

## Task
Complete the function \`countVowels\` that returns the count of vowels. Case-insensitive.`,
    inputFormat: 'A string',
    outputFormat: 'Integer count of vowels',
    examples: [
      { input: 'countVowels("Hello World")', output: '3' }
    ],
    difficulty: 'easy',
    tags: ['strings', 'counting'],
    language: 'javascript',
    chapter: 'strings',
    starterCode: `function countVowels(str) {
  // Write your code here
  
}

console.log(countVowels("Hello World"));
console.log(countVowels("AEIOU"));`,
    testCases: [
      { id: 't1', input: '"Hello World"', expectedOutput: '3', isHidden: false },
      { id: 't2', input: '"AEIOU"', expectedOutput: '5', isHidden: true },
    ]
  },
  {
    id: 'js-ds-1',
    title: 'Two Sum',
    description: `# Two Sum

Given an array of integers and a target sum, return the indices of two numbers that add up to the target.

## Task
Complete the function \`twoSum\` that returns an array of two indices. Assume exactly one solution exists.`,
    inputFormat: 'An array of integers and a target integer',
    outputFormat: 'Array of two indices [i, j]',
    examples: [
      { input: 'twoSum([2, 7, 11, 15], 9)', output: '[0, 1]', explanation: 'Because nums[0] + nums[1] = 2 + 7 = 9' }
    ],
    difficulty: 'medium',
    tags: ['arrays', 'hash-map', 'searching'],
    language: 'javascript',
    chapter: 'data-structures',
    starterCode: `function twoSum(nums, target) {
  // Write your code here
  
}

console.log(twoSum([2, 7, 11, 15], 9));
console.log(twoSum([3, 2, 4], 6));`,
    testCases: [
      { id: 't1', input: '[2, 7, 11, 15], 9', expectedOutput: '[0, 1]', isHidden: false },
      { id: 't2', input: '[3, 2, 4], 6', expectedOutput: '[1, 2]', isHidden: true },
    ]
  },
];

// Python Problems
const pyProblems: Problem[] = [
  {
    id: 'py-var-1',
    title: 'Hello World',
    description: `# Hello World

Write a function that prints "Hello, World!".

This is the classic first program that every programmer writes. It introduces you to the basic syntax of Python functions.

## Task
Complete the function \`hello_world\` that prints the greeting string.`,
    inputFormat: 'No input required',
    outputFormat: 'Print: Hello, World!',
    examples: [
      { input: 'None', output: 'Hello, World!' }
    ],
    difficulty: 'easy',
    tags: ['basics', 'strings'],
    language: 'python',
    chapter: 'variables',
    starterCode: `def hello_world():
    # Write your code here
    pass

# Do not modify below this line
hello_world()`,
    testCases: [
      { id: 't1', input: '', expectedOutput: 'Hello, World!', isHidden: false },
    ]
  },
  {
    id: 'py-var-2',
    title: 'Sum Two Numbers',
    description: `# Sum Two Numbers

Write a function that takes two numbers and returns their sum.

## Task
Complete the function \`add\` that accepts two parameters and returns their sum.`,
    inputFormat: 'Two integers a and b',
    outputFormat: 'An integer representing the sum',
    examples: [
      { input: 'add(2, 3)', output: '5' }
    ],
    difficulty: 'easy',
    tags: ['basics', 'math'],
    language: 'python',
    chapter: 'variables',
    starterCode: `def add(a, b):
    # Write your code here
    pass

# Test cases
print(add(2, 3))
print(add(-1, 1))`,
    testCases: [
      { id: 't1', input: '2, 3', expectedOutput: '5', isHidden: false },
      { id: 't2', input: '-1, 1', expectedOutput: '0', isHidden: true },
    ]
  },
  {
    id: 'py-loop-1',
    title: 'Count to N',
    description: `# Count to N

Write a function that prints numbers from 1 to n, each on a new line.

## Task
Complete the function \`count_to_n\` that prints numbers from 1 to n.`,
    inputFormat: 'A positive integer n',
    outputFormat: 'Numbers from 1 to n, each on a new line',
    examples: [
      { input: 'count_to_n(5)', output: '1\n2\n3\n4\n5' }
    ],
    difficulty: 'easy',
    tags: ['loops', 'basics'],
    language: 'python',
    chapter: 'loops',
    starterCode: `def count_to_n(n):
    # Write your code here
    pass

count_to_n(5)`,
    testCases: [
      { id: 't1', input: '5', expectedOutput: '1\n2\n3\n4\n5', isHidden: false },
      { id: 't2', input: '3', expectedOutput: '1\n2\n3', isHidden: true },
    ]
  },
  {
    id: 'py-loop-2',
    title: 'Sum of List',
    description: `# Sum of List

Write a function that calculates the sum of all numbers in a list without using the built-in sum function.

## Task
Complete the function \`sum_list\` that returns the total.`,
    inputFormat: 'A list of integers',
    outputFormat: 'The sum of all integers',
    examples: [
      { input: 'sum_list([1, 2, 3, 4, 5])', output: '15' }
    ],
    difficulty: 'easy',
    tags: ['loops', 'lists'],
    language: 'python',
    chapter: 'loops',
    starterCode: `def sum_list(arr):
    # Write your code here - don't use sum()!
    pass

print(sum_list([1, 2, 3, 4, 5]))
print(sum_list([-1, 0, 1]))`,
    testCases: [
      { id: 't1', input: '[1, 2, 3, 4, 5]', expectedOutput: '15', isHidden: false },
      { id: 't2', input: '[-1, 0, 1]', expectedOutput: '0', isHidden: true },
    ]
  },
  {
    id: 'py-loop-3',
    title: 'FizzBuzz',
    description: `# FizzBuzz

Write a function that prints numbers from 1 to n. For multiples of 3, print "Fizz". For multiples of 5, print "Buzz". For multiples of both, print "FizzBuzz".

## Task
Complete the classic FizzBuzz challenge in Python!`,
    inputFormat: 'A positive integer n',
    outputFormat: 'Numbers or Fizz/Buzz/FizzBuzz from 1 to n',
    examples: [
      { input: 'fizz_buzz(15)', output: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz' }
    ],
    difficulty: 'easy',
    tags: ['loops', 'conditionals'],
    language: 'python',
    chapter: 'loops',
    starterCode: `def fizz_buzz(n):
    # Write your code here
    pass

fizz_buzz(15)`,
    testCases: [
      { id: 't1', input: '15', expectedOutput: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz', isHidden: false },
    ]
  },
  {
    id: 'py-list-1',
    title: 'Find Maximum',
    description: `# Find Maximum

Write a function that finds the largest number in a list without using the built-in max function.

## Task
Complete the function \`find_max\` that returns the maximum value.`,
    inputFormat: 'A list of integers',
    outputFormat: 'The largest integer',
    examples: [
      { input: 'find_max([1, 5, 3, 9, 2])', output: '9' }
    ],
    difficulty: 'easy',
    tags: ['lists', 'searching'],
    language: 'python',
    chapter: 'lists',
    starterCode: `def find_max(arr):
    # Write your code here - don't use max()!
    pass

print(find_max([1, 5, 3, 9, 2]))
print(find_max([-5, -1, -10]))`,
    testCases: [
      { id: 't1', input: '[1, 5, 3, 9, 2]', expectedOutput: '9', isHidden: false },
      { id: 't2', input: '[-5, -1, -10]', expectedOutput: '-1', isHidden: true },
    ]
  },
  {
    id: 'py-func-1',
    title: 'Factorial',
    description: `# Factorial

Write a function that calculates the factorial of a number.

## Task
Complete the function \`factorial\` using recursion or loops.`,
    inputFormat: 'A non-negative integer n',
    outputFormat: 'The factorial of n',
    examples: [
      { input: 'factorial(5)', output: '120' }
    ],
    difficulty: 'medium',
    tags: ['functions', 'recursion', 'math'],
    language: 'python',
    chapter: 'functions',
    starterCode: `def factorial(n):
    # Write your code here
    pass

print(factorial(5))
print(factorial(0))`,
    testCases: [
      { id: 't1', input: '5', expectedOutput: '120', isHidden: false },
      { id: 't2', input: '0', expectedOutput: '1', isHidden: true },
    ]
  },
  {
    id: 'py-str-1',
    title: 'Palindrome Check',
    description: `# Palindrome Check

Write a function that checks if a string is a palindrome.

## Task
Complete the function \`is_palindrome\` that returns True or False. Ignore case and spaces.`,
    inputFormat: 'A string',
    outputFormat: 'Boolean (True or False)',
    examples: [
      { input: 'is_palindrome("racecar")', output: 'True' }
    ],
    difficulty: 'easy',
    tags: ['strings', 'manipulation'],
    language: 'python',
    chapter: 'strings',
    starterCode: `def is_palindrome(s):
    # Write your code here
    pass

print(is_palindrome("racecar"))
print(is_palindrome("hello"))`,
    testCases: [
      { id: 't1', input: '"racecar"', expectedOutput: 'True', isHidden: false },
      { id: 't2', input: '"hello"', expectedOutput: 'False', isHidden: true },
    ]
  },
  {
    id: 'py-ds-1',
    title: 'Two Sum',
    description: `# Two Sum

Given a list of integers and a target sum, return the indices of two numbers that add up to the target.

## Task
Complete the function \`two_sum\` that returns a list of two indices.`,
    inputFormat: 'A list of integers and a target integer',
    outputFormat: 'List of two indices',
    examples: [
      { input: 'two_sum([2, 7, 11, 15], 9)', output: '[0, 1]' }
    ],
    difficulty: 'medium',
    tags: ['lists', 'dict', 'searching'],
    language: 'python',
    chapter: 'data-structures',
    starterCode: `def two_sum(nums, target):
    # Write your code here
    pass

print(two_sum([2, 7, 11, 15], 9))
print(two_sum([3, 2, 4], 6))`,
    testCases: [
      { id: 't1', input: '[2, 7, 11, 15], 9', expectedOutput: '[0, 1]', isHidden: false },
      { id: 't2', input: '[3, 2, 4], 6', expectedOutput: '[1, 2]', isHidden: true },
    ]
  },
];

// Chapter definitions
const jsChapters: Chapter[] = [
  {
    id: 'variables',
    title: 'Variables & Basics',
    description: 'Learn the fundamentals of JavaScript variables and data types',
    icon: '📦',
    problems: jsProblems.filter(p => p.chapter === 'variables'),
  },
  {
    id: 'loops',
    title: 'Loops & Iteration',
    description: 'Master for loops, while loops, and iteration patterns',
    icon: '🔄',
    problems: jsProblems.filter(p => p.chapter === 'loops'),
  },
  {
    id: 'arrays',
    title: 'Arrays',
    description: 'Work with arrays and array methods',
    icon: '📚',
    problems: jsProblems.filter(p => p.chapter === 'arrays'),
  },
  {
    id: 'functions',
    title: 'Functions',
    description: 'Understand functions, closures, and recursion',
    icon: '⚡',
    problems: jsProblems.filter(p => p.chapter === 'functions'),
  },
  {
    id: 'strings',
    title: 'Strings',
    description: 'String manipulation and pattern matching',
    icon: '🔤',
    problems: jsProblems.filter(p => p.chapter === 'strings'),
  },
  {
    id: 'data-structures',
    title: 'Data Structures',
    description: 'Objects, Maps, Sets, and complex data handling',
    icon: '🏗️',
    problems: jsProblems.filter(p => p.chapter === 'data-structures'),
  },
];

const pyChapters: Chapter[] = [
  {
    id: 'variables',
    title: 'Variables & Basics',
    description: 'Learn Python variables and data types',
    icon: '📦',
    problems: pyProblems.filter(p => p.chapter === 'variables'),
  },
  {
    id: 'loops',
    title: 'Loops & Iteration',
    description: 'Master for and while loops in Python',
    icon: '🔄',
    problems: pyProblems.filter(p => p.chapter === 'loops'),
  },
  {
    id: 'lists',
    title: 'Lists',
    description: 'Work with Python lists and comprehensions',
    icon: '📚',
    problems: pyProblems.filter(p => p.chapter === 'lists'),
  },
  {
    id: 'functions',
    title: 'Functions',
    description: 'Functions, decorators, and generators',
    icon: '⚡',
    problems: pyProblems.filter(p => p.chapter === 'functions'),
  },
  {
    id: 'strings',
    title: 'Strings',
    description: 'String manipulation and formatting',
    icon: '🔤',
    problems: pyProblems.filter(p => p.chapter === 'strings'),
  },
  {
    id: 'data-structures',
    title: 'Data Structures',
    description: 'Dictionaries, sets, and tuples',
    icon: '🏗️',
    problems: pyProblems.filter(p => p.chapter === 'data-structures'),
  },
];

export const languagesData: LanguageData[] = [
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: '🟨',
    chapters: jsChapters,
  },
  {
    id: 'python',
    name: 'Python',
    icon: '🐍',
    chapters: pyChapters,
  },
];

export const getAllProblems = (): Problem[] => {
  return [...jsProblems, ...pyProblems];
};

export const getProblemById = (id: string): Problem | undefined => {
  return getAllProblems().find(p => p.id === id);
};

export const getChapterProblems = (language: Language, chapterId: string): Problem[] => {
  const langData = languagesData.find(l => l.id === language);
  const chapter = langData?.chapters.find(c => c.id === chapterId);
  return chapter?.problems || [];
};
