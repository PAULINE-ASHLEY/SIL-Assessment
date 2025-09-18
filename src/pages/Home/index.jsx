import { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { fetchUsers } from '../../utils/api';
import Pagination from '../../components/pagination/Pagination';

const Home = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Memoize the fetch function with useCallback
  const fetchFn = useCallback(() => fetchUsers(), []);
  const { data: users, loading, error } = useFetch(fetchFn);

  useEffect(() => {
    setCurrentPage(1);
  }, [users]);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!users || users.length === 0) return <div>No users found.</div>;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Users</h1>

      <div className="space-y-3">
        {currentUsers.map((user) => (
          <div
            key={user.id}
            onClick={() => navigate(`/user/${user.id}`)}
            className="border border-gray-200 p-4 rounded-md cursor-pointer hover:bg-gray-50"
          >
            <div className="flex items-center">
              {user.image && (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
              )}
              <div>
                <h2 className="font-semibold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={users.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Home;
