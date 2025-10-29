import { useState, useEffect } from 'react';
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
    const [nastavnici, setNastavnici] = useState([]);
    const [izabraniNastavnik, setIzabraniNastavnik] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchNastavnici = async () => { // Ucitavanje nastavnika za padajucu listu
            const { data, error } = await supabase.from('nastavnici').select('*');
            if (error) {
                console.error('Greška pri učitavanju:', error.message);
            } else {
                setNastavnici(data);
            }

        };

        fetchNastavnici();
    }, []);


    const handleSubmit = async (e) => { // Ucitavanje ucenika iz baze
        e.preventDefault();

        const { data, error } = await supabase
            .from('ucenici')
            .insert([{ ime, prezime, instrument, nastavnik_uuid: izabraniNastavnik, jmbg,email, kontakt, razred: parseInt(razred) }]);

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
                    label="Ime i Prezime"
                    fullWidth
                    margin="normal"
                    value={ime}
                    onChange={(e) => setIme(e.target.value)}
                    required
                />
                {/* <TextField
                    label="Prezime"
                    fullWidth
                    margin="normal"
                    value={prezime}
                    onChange={(e) => setPrezime(e.target.value)}
                    required
                /> */}
                
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

                <FormControl fullWidth margin="normal" required>
                    <InputLabel>Nastavnik</InputLabel>
                    <Select
                        value={izabraniNastavnik}
                        onChange={(e) => setIzabraniNastavnik(e.target.value)}
                        label="Nastavnik"
                    >
                        {nastavnici.map((nast) => (
                            <MenuItem key={nast.id} value={nast.id}>
                                {nast.ime}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>



                <TextField
                    label="JMBG"
                    fullWidth
                    margin="normal"
                    value={jmbg}
                    onChange={(e) => setJMBG(e.target.value)}
                    required

                />


                <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required

                />

                <TextField
                    label="Kontakt Telefon:"
                    fullWidth
                    margin="normal"
                    value={kontakt}
                    onChange={(e) => setKontakt(e.target.value)}
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
