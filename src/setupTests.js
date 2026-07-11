import '@testing-library/jest-dom';

// jsdom doesn't implement IntersectionObserver (used by useScrollReveal)
// or matchMedia (used by useTheme's prefers-color-scheme check).
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver = MockIntersectionObserver;

window.matchMedia = window.matchMedia || function matchMedia(query) {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  };
};

window.scrollTo = window.scrollTo || (() => {});
