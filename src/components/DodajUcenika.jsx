import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Box, TextField, Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import Instrumenti from '../components/Instrumenti';

export default function DodajUcenika() {
    const [ime, setIme] = useState('');
    const [prezime, setPrezime] = useState('');
    const [razred, setRazred] = useState('');
    const [instrument, setInstrument] = useState('');
    const [jmbg, setJMBG] = useState('');
    const [klasa, setKlasa] = useState('');
    const [kontakt, setKontakt] = useState('');
    const [poruka, setPoruka] = useState('');
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase
            .from('ucenici')
            .insert([{ ime, prezime, instrument, kontakt, jmbg , klasa, razred: parseInt(razred) }]);

        if (error) {
            console.error(error.message);
            setPoruka('Greska: ' + error.message);


        } else {
            setPoruka('Ucenik uspesno dodat!');
            setIme('');
            setRazred('');

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
            <h2>Dodaj Učenika</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Ime"
                    fullWidth
                    margin="normal"
                    value={ime}
                    onChange={(e) => setIme(e.target.value)}
                    required
                />
                <TextField
                    label="Prezime"
                    fullWidth
                    margin="normal"
                    value={prezime}
                    onChange={(e) => setPrezime(e.target.value)}
                    required
                />
                <TextField
                    label="Kontakt"
                    fullWidth
                    margin="normal"
                    value={kontakt}
                    onChange={(e) => setKontakt(e.target.value)}
                    required
                />
                <FormControl fullWidth margin="normal" required>
                    <InputLabel>Instrument</InputLabel>
                    <Select
                        value={instrument}
                        onChange={(e) => setInstrument(e.target.value)}
                        label="Instrument"
                    >
                        {Instrumenti.map((inst) => (
                            <MenuItem key={inst} value={inst}>
                                {inst}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                
                <TextField
                    label="Klasa"
                    fullWidth
                    margin="normal"
                    value={klasa}
                    onChange={(e) => setKlasa(e.target.value)}
                    required

                />
                <TextField
                    label="JMBG"
                    fullWidth
                    margin="normal"
                    value={jmbg}
                    onChange={(e) => setJMBG(e.target.value)}
                    required

                />

                <TextField
                    select
                    label="Razred"
                    fullWidth
                    margin="normal"
                    value={razred}
                    onChange={(e) => setRazred(e.target.value)}
                    required
                >
                    {[3, 4, 5, 6, 7].map((r) => (
                        <MenuItem key={r} value={r}>
                            {r}. razred
                        </MenuItem>
                    ))}
                </TextField>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Sačuvaj
                </Button>
            </form>

            {poruka && <p style={{ marginTop: '1rem', color: 'green' }}>{poruka}</p>}
        </Box>
    );
}
