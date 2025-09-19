import PropTypes from 'prop-types';
import { NavigationBar } from 'components';

/**
 * PageWrapper layout component
 * - Renders a consistent layout with navigation, main content, and footer.
 * - Used to wrap individual pages for a uniform look across the app.
 */
function PageWrapper({ children }) {
  return (
    <div className="h-screen flex bg-white ">
      <div className="w-[20%]">
        <NavigationBar />
      </div>

      <div className="w-[80%]">
        <div className="p-10">{children}</div>
      </div>
    </div>
  );
}

PageWrapper.propTypes = {
  children: PropTypes.node, // node is stricter than "any"
};

export default PageWrapper;
