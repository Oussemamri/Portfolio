import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

const ROUTES = [
  '/',
  '/skills',
  '/services',
  '/experience',
  '/work',
  '/about',
  '/languages',
  '/contact',
];

// PageMeta renders <Helmet>, which needs a HelmetProvider ancestor — in
// production index.js supplies it; here we wrap it the same way.
const renderApp = () =>
  render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );

describe('App routing', () => {
  test.each(ROUTES)('renders %s without crashing', async (route) => {
    window.history.pushState({}, '', route);
    renderApp();

    // The header logo image is present (and unique) on every route once
    // React has hydrated past the Suspense fallback.
    expect(await screen.findByAltText('OA')).toBeInTheDocument();
  });

  test('renders the branded 404 page for an unknown route', async () => {
    window.history.pushState({}, '', '/this-route-does-not-exist');
    renderApp();

    expect(await screen.findByText(/this page doesn't exist/i)).toBeInTheDocument();
  });
});
