import { BrowserRouter } from 'react-router-dom';
import RouterConfig from './navigation/RouterConfig';

// App entry point
// - Wraps RouterConfig with BrowserRouter for navigation
// - Could later wrap with Redux Provider or Context API
function App() {
  return (
    <div className="App font-sans">
      <BrowserRouter>
        <RouterConfig />
      </BrowserRouter>
    </div>
  );
}

export default App;
