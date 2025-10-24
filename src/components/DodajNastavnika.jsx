import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Box, TextField, Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import Instrumenti from '../components/Instrumenti';

export default function DodajNastavnika() {
    const [ime, setIme] = useState('');
    const [prezime, setPrezime] = useState('');
    const [instrument, setInstrument] = useState('');
    const [jmbg, setJMBG] = useState('');
    const [email, setEmail] = useState('');
    const [napomena, setNapomena] = useState('');
    const [kontakt, setKontakt] = useState('');
    const [status, setStatus] = useState('');
    const [poruka, setPoruka] = useState('');
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase
            .from('nastavnici')
            .insert([{ ime, prezime, instrument, jmbg, email, kontakt,status,napomena}]);

        if (error) {
            console.error(error.message);
            setPoruka('Greska: ' + error.message);


        } else {
            setPoruka('Ucenik uspesno dodat!');
            setIme('');
            setPrezime('');
            setInstrument('');
            setJMBG('');
           

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
            <h2>Dodaj Nastavnika</h2>
            <form onSubmit={handleSubmit}>
                <TextField // IME NASTAVNIKA
                    label="Ime"
                    fullWidth
                    margin="normal"
                    value={ime}
                    onChange={(e) => setIme(e.target.value)}
                    required
                />
                <TextField // PREZIME NASTAVNIKA
                    label="Prezime"
                    fullWidth
                    margin="normal"
                    value={prezime}
                    onChange={(e) => setPrezime(e.target.value)}
                    required
                />
                
                <FormControl fullWidth margin="normal" required >
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

                <TextField // KONTAKT
                    label="Kontakt"
                    fullWidth
                    margin="normal"
                    value={kontakt}
                    onChange={(e) => setKontakt(e.target.value)}
                    required
                />
                
                <TextField // EMAIL NASTAVNIKA
                    label="Email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                
                
                <TextField // JMBG
                    label="JMBG"
                    fullWidth
                    margin="normal"
                    value={jmbg}
                    onChange={(e) => setJMBG(e.target.value)}
                    required

                />
                <TextField // Napomena
                    label="Napomena"
                    fullWidth
                    margin="normal"
                    value={napomena}
                    onChange={(e) => setNapomena(e.target.value)}
                   
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
            </form>

            {poruka && <p style={{ marginTop: '1rem', color: 'green' }}>{poruka}</p>}
        </Box>
    );
}
