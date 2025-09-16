import { useAuth } from '../../context/AuthContext';

function NavigationBar() {
  const { user, logout } = useAuth();
  return (
    <nav>
      <h2>SIL App</h2>
      {user && <button onClick={logout}>Logout</button>}
    </nav>
  );
}

export default NavigationBar;
