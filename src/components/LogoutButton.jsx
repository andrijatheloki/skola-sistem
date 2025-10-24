import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function LogoutButton() {
    const navigate = useNavigate()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        navigate ('/Login')
    }


    return (
        <button onClick={handleLogout}>
        Logout
        </button>


    )

}
