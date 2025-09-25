import PropTypes from 'prop-types';
import { NavigationBar } from 'components';

/*
 * Renders a consistent layout with navigation and main content.
 * Used to wrap individual pages for a uniform look across the app.
 */
function PageWrapper({ children }) {
  return (
    <div className="relative min-h-screen md:h-screen lg:h-screen xl:h-screen 2xl:h-screen flex flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row bg-white">
      {/* Sidebar */}
      <NavigationBar />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-[#f2f5f7]">
        <div className="2xl:p-10 xl:p-10 lg:p-10 md:p-10 p-4">{children}</div>
      </main>
    </div>
  );
}

PageWrapper.propTypes = {
  children: PropTypes.node,
};

export default PageWrapper;
