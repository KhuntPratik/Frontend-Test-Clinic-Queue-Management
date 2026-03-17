import { useEffect, useState } from 'react'
import axios from 'axios'
import AppointmentsDetails from './AppointmentsDetails'

const BASE_URL = import.meta.env.VITE_API_URL

const formatDate = (value) => {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([])
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const authHeaders = () => {
    const token =
      localStorage.getItem('auth_token') || localStorage.getItem('token')
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  const handleListAppointments = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/appointments/my`, {
        headers: authHeaders(),
      })
      setAppointments(response.data?.appointments || response.data || [])
    } catch (err) {
      const data = err?.response?.data
 
    }
  }

  const handleViewDetails = async (appointment) => {
    try {
      const id = appointment?.id || appointment?._id
      if (!id) {
        setSelectedAppointment(appointment)
        return
      }
      const response = await axios.get(`${BASE_URL}/appointments/${id}`, {
        headers: authHeaders(),
      })
      setSelectedAppointment(response.data?.appointment || response.data)
    } catch (err) {
      const data = err?.response?.data
     
    } 


  }

  useEffect(() => {
    handleListAppointments()
  }, [])

  return (
    <div className="min-vh-100 bg-light">
      <div className="container py-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h1 className="h4 mb-0">My Appointments</h1>
        </div>

       


        {selectedAppointment ? (
          <AppointmentsDetails
            appointment={selectedAppointment}
            onBack={() => setSelectedAppointment(null)}
          />
        ) : appointments.length ? (
          <div className="card">
            <div className="card-body">
              <div className="table-responsive bg-white rounded-3 shadow-sm p-2">
                <table className="table table-borderless align-middle mb-0">
                  <thead>
                    <tr>
                      <th className="text-uppercase text-secondary small">Date</th>
                      <th className="text-uppercase text-secondary small">Time</th>
                      <th className="text-uppercase text-secondary small">Token</th>
                      <th className="text-uppercase text-secondary small">Status</th>
                      <th className="text-uppercase text-secondary small">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appt, index) => (
                      <tr key={appt.id || appt._id || index} className="border-top">
                        <td>{formatDate(appt.appointmentDate || appt.date)}</td>
                        <td>{appt.timeSlot || appt.time || '-'}</td>
                        <td>
                          {appt.queueEntry?.tokenNumber ||
                            appt.token ||
                            appt.tokenNumber ||
                            '-'}
                        </td>
                        <td>
                          <span className="badge text-bg-warning text-uppercase">
                            {appt.queueEntry?.status || appt.status || 'waiting'}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => handleViewDetails(appt)}
                         
                          >
                            Medicines &amp; report
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-secondary mb-0">No appointments loaded yet.</p>
        )}
      </div>
    </div>
  )
}
