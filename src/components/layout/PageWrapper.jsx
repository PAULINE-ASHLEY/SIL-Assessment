import PropTypes from 'prop-types';
import { NavigationBar } from 'components';

/**
 * PageWrapper layout component
 * - Renders a consistent layout with navigation, main content, and footer.
 * - Used to wrap individual pages for a uniform look across the app.
 */
function PageWrapper({ children }) {
  return (
    <div className="min-h-screen md:h-screen lg:h-screen xl:h-screen 2xl:h-screen flex flex-col 2xl:flex-row xl:flex-row lg:flex-row md:flex-row bg-white">
      <div className="2xl:w-[20%] xl:w-[20%] lg:w-[20%] md:w-[30%] bg-white">
        <NavigationBar />
      </div>

      <div className="2xl:[80%] xl:w-[80%] lg:w-[80%] md:w-[70%] overflow-y-auto bg-[#f2f5f7]">
        <div className="2xl:p-10 xl:p-10 lg:p-10 md:p-10 p-4">{children}</div>
      </div>
    </div>
  );
}

PageWrapper.propTypes = {
  children: PropTypes.node, // node is stricter than "any"
};

export default PageWrapper;
