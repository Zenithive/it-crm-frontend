import "@testing-library/jest-dom";

// Mock the `next/navigation` module for Jest tests
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));
