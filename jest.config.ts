import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules'],
};

export default config;
