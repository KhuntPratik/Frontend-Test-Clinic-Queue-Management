import { useState } from 'react'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

export default function AdminHome() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        role: 'doctor',
    })


    const authHeaders = () => {
        const token = localStorage.getItem('auth_token')
        return token ? { Authorization: `Bearer ${token}` } : {}
    }

    const handleCreateUser = async (event) => {
        event.preventDefault()
        setSuccess('')
        try {
            const payload = {
                name: form.name,
                email: form.email,
                password: form.password,
                role: form.role,
            }
            await axios.post(`${BASE_URL}/admin/users`, payload, {
                headers: authHeaders(),
            })
            setForm({ name: '', email: '', password: '', role: 'doctor' })
            setSuccess('User created successfully.')
        } catch (err) {
            const data = err?.response?.data
            const message =
                data?.message ||
                (typeof data === 'string' ? data : '') ||
                err?.message ||
                'Failed to create user'
        }
    }

    return (
        <div className="min-vh-100 bg-light d-flex align-items-center">
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-5">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h1 className="h5 mb-3">Create user</h1>


                              

                                <form onSubmit={handleCreateUser}>
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input
                                            className="form-control"
                                            value={form.name}
                                            onChange={(event) =>
                                                setForm((prev) => ({ ...prev, name: event.target.value }))
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={form.email}
                                            onChange={(event) =>
                                                setForm((prev) => ({ ...prev, email: event.target.value }))
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={form.password}
                                            onChange={(event) =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    password: event.target.value,
                                                }))
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Role</label>
                                        <select
                                            className="form-select"
                                            value={form.role}
                                            onChange={(event) =>
                                                setForm((prev) => ({ ...prev, role: event.target.value }))
                                            }
                                        >
                                            <option value="doctor">Doctor</option>
                                            <option value="receptionist">Receptionist</option>
                                            <option value="patient">Patient</option>
                                        </select>
                                    </div>
                                    <button className="btn btn-success w-100">Create user</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
