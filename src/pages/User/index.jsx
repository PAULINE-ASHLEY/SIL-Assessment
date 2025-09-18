import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { fetchUsers } from '../../utils/api';
import Pagination from '../../components/pagination/Pagination';

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  const fetchFn = useCallback(() => fetchUsers(), []);
  const { data: users, loading, error } = useFetch(fetchFn);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!users || users.length === 0) return <div>No users found.</div>;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Users</h1>

      <div className="space-y-3">
        {currentUsers.map((user) => (
          <div key={user.id} className="border border-gray-200 p-4 rounded-md">
            <div className="flex items-center justify-between">
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
                  {user.company && (
                    <p className="text-gray-500">{user.company.name}</p>
                  )}
                </div>
              </div>
              <Link
                to={`/user/${user.id}/albums`}
                className="bg-black text-white px-4 py-2 rounded-md"
              >
                View Albums
              </Link>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={users.length}
        itemsPerPage={usersPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Users;
