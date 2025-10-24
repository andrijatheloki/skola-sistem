import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

function DodajUcenika() {
    const [ime, setIme] = useState('');
    const [prezime, setPrezime] = useState('');
    const [razred, setRazred] = useState('');
    const [godiste, setGodiste] = useState('');

    const handleSubmit = () => {
        alert(`Uneto: ${ime} ${prezime}, razred: ${razred}`);
        // Ovde kasnije ide slanje u bazu (Supabase)
    };

    return (
        <Box
            sx={{
                maxWidth: 500,
                mx: 'auto',
                mt: 8,
                p: 4,
                border: '2px solid #ccc',
                borderRadius: 4,
                boxShadow: 2,
            }}
        >
            <Typography variant="h5" gutterBottom>
                Dodaj učenika
            </Typography>

            <TextField
                fullWidth
                label="Ime"
                value={ime}
                onChange={(e) => setIme(e.target.value)}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Prezime"
                value={prezime}
                onChange={(e) => setPrezime(e.target.value)}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Razred"
                type="number"
                value={razred}
                onChange={(e) => setRazred(e.target.value)}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Godiste"
                type="number"
                value={godiste}
                onChange={(e) => setGodiste(e.target.value)}
                margin="normal"
            />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit}
                sx={{ mt: 2 }}
            >
                Sačuvaj
            </Button>
        </Box>
    );
}

export default DodajUcenika;
