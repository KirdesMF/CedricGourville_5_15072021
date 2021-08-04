module.exports = {
   transform: {
      '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',
   },
   coverageReporters: ['text-summary', 'html', 'text'],
   testEnvironment: 'jsdom',
   verbose: true,
};
