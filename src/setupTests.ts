require('dotenv').config({ path: '.env.local' });
import '@testing-library/jest-dom';

global.ResizeObserver = class ResizeObserver {
  observe() {
    // do nothing
  }

  unobserve() {
    // do nothing
  }

  disconnect() {
    // do nothing
  }
};
