require("@testing-library/jest-dom");

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
// Mock the `next/navigation` module for Jest tests


import { ApolloClient, InMemoryCache } from '@apollo/client';

beforeEach(() => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL,
    cache: new InMemoryCache(),
  });
  client.clearStore();
});

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));
