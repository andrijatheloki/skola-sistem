// components/PrivateRoute.jsx
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

export default function PrivateRoute({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Provera da li postoji ulogovan korisnik
        supabase.auth.getUser().then(({ data }) => {
            setUser(data.user)
            setLoading(false)
        })
    }, [])

    if (loading) {
        return <p>Učitavanje...</p> // da ne baci odmah redirect dok proverava
    }

    // Ako postoji user, prikazuj stranicu
    if (user) {
        return children
    }

    // Ako nema usera, šalji na login
    return <Navigate to="/Login" />
}
