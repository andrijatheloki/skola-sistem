import { useEffect,useState  } from 'react';
import { Button, Box, TextField } from '@mui/material';
import { supabase } from '../lib/supabaseClient';


export default function ResetPassword() {

    const [ password, setPassword ] = useState('')
    const [ poruka, setPoruka ]  = useState('')



    const handleSubmit = async (e) => {
        e.preventDefault();
            const { data, error } = await supabase.auth.updateUser({password: password})

    if (data) {

   setPoruka('Uspesno Promenjena Sifra ');
    console.log(data)
}
        if (error) {

            setPoruka('Greska: ' + error.message);
    console.log(error)
    }


    }


    return (
        <Box
            sx={{
                maxWidth: 500,
                mx: 'auto',
                mt: 8,
                p: 4,
                border: '1px solid #ccc',
                borderRadius: 4,
                boxShadow: 2,
                backgroundColor: '#fff',
            }}
        >
            <h2>PasswordReset</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="NewPassword"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Sačuvaj
                </Button>


                {poruka && <p style={{ marginTop: '1rem', color: 'green' }}>{poruka}</p>}

            </form>
        </Box>





    );
}





