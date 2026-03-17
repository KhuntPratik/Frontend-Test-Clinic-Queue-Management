import { useEffect, useState } from 'react'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

export default function AdminUsers() {
  const [users, setUsers] = useState([])

  const authHeaders = () => {
    const token = localStorage.getItem('auth_token')
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  const handleFetchUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/users`, {
        headers: authHeaders(),
      })
      setUsers(response.data?.users || response.data || [])
    } catch (err) {
      const data = err?.response?.data
    } finally {
    }
  }

  useEffect(() => {
    handleFetchUsers()
  }, [])

  return (
    <div className="min-vh-100 bg-light">
      <div className="container py-4">
        

        <div className="card">
          <div className="card-body">
            {users.length ? (
              <div className="table-responsive">
                <table className="table table-sm align-middle">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={user.id || user._id || index}>
                        <td>{user.name || user.fullName || '-'}</td>
                        <td>{user.email || '-'}</td>
                        <td className="text-capitalize">{user.role || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-secondary mb-0">
                 'Loading users...' : 'No users found.'
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
