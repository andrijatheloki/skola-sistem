import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'
import { Box, Button, TextField } from '@mui/material';
export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
    } else {
      navigate('/Pocetna')
      }

      if (error.message === 'Invalid login credentials') {
          setError('Pogresan email ili lozinka')
    }

    
    }

    return (

        <Box //background Box
            sx={{
                margin: '0',
                padding: '0',
                height: '100vh',
                backgroundImage: 'url(https://cdn.pixabay.com/photo/2016/04/30/14/58/music-1363069_1280.jpg)',
                backgroundSize: 'cover',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',



            } }
            >

        <Box //login box
            sx={{

                maxWidth: 500,
                    bgcolor: '#FFFFFF',
                    mx: 'auto',
                alignItems: 'center',
                mt: 2,
                p: 4,
                border: '2px solid #ccc',
                borderRadius: 4,
                boxShadow: 2,
            }}
        >
         <div style={{ padding: '2rem' }}>
            <h2>Portal za Muzicke Skole</h2>
                <form onSubmit={handleLogin}>

       <TextField
                        fullWidth
                        label="Email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                    />

                    <TextField
                        fullWidth
                        label="Lozinka"
                        type="password"
                        placeholder="Lozinka"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
       
                    <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            type="submit"
                            sx={{ mt: 2 }}
                    >
                        Prijavi se
                        </Button>
               {error && <p style={{ color: 'red' }}>{error}   </p>}

                       

       
      </form>
    </div>

            </Box>

        </Box>

  )
}
