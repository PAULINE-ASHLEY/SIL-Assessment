import PropTypes from 'prop-types';
import { NavigationBar, Footer } from 'components';

/**
 * PageWrapper layout component
 * - Renders a consistent layout with navigation, main content, and footer.
 * - Used to wrap individual pages for a uniform look across the app.
 */
function PageWrapper({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <nav className="py-2 text-white bg-black">
        <NavigationBar />
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow w-full box-border min-h-[75vh]">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-20 bg-black">
        <div className="py-8">
          <Footer />
        </div>
      </footer>
    </div>
  );
}

PageWrapper.propTypes = {
  children: PropTypes.node, // node is stricter than "any"
};

export default PageWrapper;
