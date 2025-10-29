import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Button } from '@mui/material';

export default function LogoutButton() {
    const navigate = useNavigate()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        navigate('/Logout')


    }


    return (
        

        <Button onClick={handleLogout} variant="outlined" color="primary" sx={{ mr: 2 }}>
            Logout


        </Button>


    )

}
