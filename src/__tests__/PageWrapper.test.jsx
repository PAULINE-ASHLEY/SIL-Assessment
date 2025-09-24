import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import PageWrapper from '../components/layout/PageWrapper';

// Mocks NavigationBar component to isolate PageWrapper testing
vi.mock('components', () => ({
  NavigationBar: () => <div data-testid="mock-nav">Mock NavigationBar</div>,
}));

describe('PageWrapper', () => {
  // Verifies that children content is properly rendered
  it('renders children content inside the main area', () => {
    render(
      <BrowserRouter>
        <PageWrapper>
          <p>Test Child</p>
        </PageWrapper>
      </BrowserRouter>
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  // Verifies that NavigationBar component is rendered
  it('renders the NavigationBar', () => {
    render(
      <BrowserRouter>
        <PageWrapper>
          <p>Child</p>
        </PageWrapper>
      </BrowserRouter>
    );

    expect(screen.getByTestId('mock-nav')).toBeInTheDocument();
    expect(screen.getByText('Mock NavigationBar')).toBeInTheDocument();
  });

  // Verifies that correct layout classes are applied
  it('applies layout structure with main tag', () => {
    render(
      <BrowserRouter>
        <PageWrapper>
          <p>Child</p>
        </PageWrapper>
      </BrowserRouter>
    );

    const wrapper = screen.getByRole('main');

    expect(wrapper).toHaveClass('flex-1');
    expect(wrapper).toHaveClass('overflow-y-auto');
    expect(wrapper).toHaveClass('bg-[#f2f5f7]');
  });
});
