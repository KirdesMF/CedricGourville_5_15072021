module.exports = {
   transform: {
      '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',
   },
   coverageReporters: ['text-summary', 'html', 'text'],
   coverageDirectory: './docs',
   testEnvironment: 'jsdom',
   verbose: true,
   automock: false,
   setupFiles: ['./setupJest.js', 'dotenv/config'],
};
