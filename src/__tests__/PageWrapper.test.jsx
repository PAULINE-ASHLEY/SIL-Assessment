import { render, screen } from '@testing-library/react';
import PageWrapper from '../components/layout/PageWrapper';

// Mock NavigationBar and Footer for Vitest
vi.mock('../components', () => ({
  NavigationBar: () => <div data-testid="navbar">Mock NavigationBar</div>,
  Footer: () => <div data-testid="footer">Mock Footer</div>,
}));

describe('PageWrapper', () => {
  it('renders the NavigationBar', () => {
    render(
      <PageWrapper>
        <p>Child Content</p>
      </PageWrapper>
    );
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  it('renders the Footer', () => {
    render(
      <PageWrapper>
        <p>Child Content</p>
      </PageWrapper>
    );
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('renders child content inside main', () => {
    render(
      <PageWrapper>
        <p>Test Child</p>
      </PageWrapper>
    );
    expect(screen.getByText(/test child/i)).toBeInTheDocument();
  });
});
