require("@testing-library/jest-dom");

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
// Mock the `next/navigation` module for Jest tests
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));
