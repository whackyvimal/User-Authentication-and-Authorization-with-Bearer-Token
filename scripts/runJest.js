// Small runner to invoke Jest programmatically to avoid shell path parsing issues on Windows
// Ensure test environment is set so app.js doesn't auto-connect to real MongoDB
process.env.NODE_ENV = process.env.NODE_ENV || 'test';
const jest = require('jest');

const argv = process.argv.slice(2);
// ensure runInBand for predictable single-process execution in CI/limited envs
argv.push('--runInBand');

jest.run(argv);
