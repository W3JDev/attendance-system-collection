import '@testing-library/jest-dom';
import { TextDecoder, TextEncoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock window.fs for file system operations
global.window.fs = {
  readFile: jest.fn(),
  writeFile: jest.fn(),
};

// Mock the media devices
Object.defineProperty(window, 'navigator', {
  value: {
    mediaDevices: {
      getUserMedia: jest.fn().mockResolvedValue({}),
    },
  },
  writable: true,
});