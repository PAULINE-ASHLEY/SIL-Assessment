import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/pagination/Pagination';

describe('Pagination component', () => {
  // Setup helper function to render component with default and custom props
  const setup = (props = {}) => {
    const defaultProps = {
      currentPage: 1,
      totalItems: 50,
      itemsPerPage: 5,
      onPageChange: vi.fn(),
    };
    // Merge default props with any custom props passed in
    return render(<Pagination {...defaultProps} {...props} />);
  };

  it('renders nothing when there is only one page', () => {
    // Setup with data that results in only 1 page (5 items ÷ 5 per page = 1 page)
    setup({ totalItems: 5, itemsPerPage: 5 });

    // Assert that no page number is rendered (component returns null)
    expect(screen.queryByText('1')).not.toBeInTheDocument();
  });

  it('renders correct visible pages', () => {
    // Setup with 50 items, 5 per page = 10 total pages, starting on page 1
    setup({ currentPage: 1, totalItems: 50, itemsPerPage: 5 });

    // Assert that the first 4 pages are visible (pagination shows 4 pages at a time)
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('calls onPageChange when a page number is clicked', () => {
    const onPageChange = vi.fn(); // Create mock function
    setup({ onPageChange, currentPage: 1 }); // Pass mock function and current page

    // Simulate user clicking on page 2
    fireEvent.click(screen.getByText('2'));

    // Assert that the callback was called with the correct page number
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('disables Previous on first page', () => {
    setup({ currentPage: 1 }); // Start on first page

    // Assert that Previous button has disabled attribute
    expect(screen.getByText('Previous')).toBeDisabled();
  });

  it('disables Next on last page', () => {
    // Setup to be on last page (page 10 with 50 items ÷ 5 per page)
    setup({ currentPage: 10, totalItems: 50, itemsPerPage: 5 });

    // Assert that Next button has disabled attribute
    expect(screen.getByText('Next')).toBeDisabled();
  });

  it('shows ellipsis when pages are skipped', () => {
    // Setup with many pages (100 items ÷ 5 per page = 20 pages), current page in middle
    setup({ currentPage: 5, totalItems: 100, itemsPerPage: 5 });

    // Assert that ellipsis (...) elements are present indicating skipped pages
    expect(screen.getAllByText('...').length).toBeGreaterThan(0);
  });
});
