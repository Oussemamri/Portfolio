import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

const renderHeader = (initialRoute = '/') =>
  render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Header theme="light" toggleTheme={() => {}} />
    </MemoryRouter>
  );

describe('Header navigation', () => {
  test('renders a link for every route', () => {
    renderHeader();
    ['Home', 'Skills', 'Services', 'Experience', 'Work', 'About', 'Contact'].forEach((label) => {
      expect(screen.getAllByText(label)[0]).toBeInTheDocument();
    });
  });

  test('marks the current route as active', () => {
    renderHeader('/skills');
    const skillsLinks = screen.getAllByText('Skills');
    const activeLink = skillsLinks[0].closest('a');
    expect(activeLink).toHaveAttribute('aria-current', 'page');
  });

  test('clicking a nav link updates the href to the target route', async () => {
    const user = userEvent.setup();
    renderHeader('/');
    const workLink = screen.getAllByText('Work')[0].closest('a');
    expect(workLink).toHaveAttribute('href', '/work');
    await user.click(workLink);
  });

  test('theme toggle button reflects current theme', () => {
    render(
      <MemoryRouter>
        <Header theme="dark" toggleTheme={() => {}} />
      </MemoryRouter>
    );
    // Desktop pill + mobile bottom nav each render their own toggle button.
    const toggles = screen.getAllByLabelText('Switch to light mode');
    expect(toggles.length).toBeGreaterThan(0);
    toggles.forEach((btn) => expect(btn).toBeInTheDocument());
  });
});
