import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Layout/Navbar'
import CampMahoganyForm from './components/Form/CampMahoganyForm'
import QRGenerator from './components/QR/QRGenerator'
import Dashboard from './components/Dashboard/Dashboard'
import Home from './components/Home/Home'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/register"  element={<CampMahoganyForm />} />
        <Route path="/admin/qr"  element={<QRGenerator />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="*"          element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
