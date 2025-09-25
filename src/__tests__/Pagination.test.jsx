import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/pagination/Pagination';

// Setups helper function to render component with default and custom props
describe('Pagination component', () => {
  const setup = (props = {}) => {
    const defaultProps = {
      currentPage: 1,
      totalItems: 50,
      itemsPerPage: 5,
      onPageChange: vi.fn(),
    };
    return render(<Pagination {...defaultProps} {...props} />);
  };

  // renders nothing when there is only one page
  it('renders nothing when there is only one page', () => {
    setup({ totalItems: 5, itemsPerPage: 5 });

    expect(screen.queryByText('1')).not.toBeInTheDocument();
  });

  // renders correct visible pages
  it('renders correct visible pages', () => {
    setup({ currentPage: 1, totalItems: 50, itemsPerPage: 5 });

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  //calls onpagechange when a page number is clicked
  it('calls onPageChange when a page number is clicked', () => {
    const onPageChange = vi.fn();
    setup({ onPageChange, currentPage: 1 });

    fireEvent.click(screen.getByText('2'));

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  //disables previous on first page
  it('disables Previous on first page', () => {
    setup({ currentPage: 1 });

    expect(screen.getByText('Previous')).toBeDisabled();
  });

  //disables next on last page
  it('disables Next on last page', () => {
    setup({ currentPage: 10, totalItems: 50, itemsPerPage: 5 });

    expect(screen.getByText('Next')).toBeDisabled();
  });

  //shows ellipsis when pages are skipped
  it('shows ellipsis when pages are skipped', () => {
    setup({ currentPage: 5, totalItems: 100, itemsPerPage: 5 });

    expect(screen.getAllByText('...').length).toBeGreaterThan(0);
  });
});
