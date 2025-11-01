import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Box, TextField, Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import Instrumenti from '../components/Instrumenti';
import { useParams } from 'react-router-dom';

export default function DodajUcenika() {
    const [ime, setIme] = useState('');
    const [prezime, setPrezime] = useState('');
    const [razred, setRazred] = useState('');
    const [instrument, setInstrument] = useState('');
    const [jmbg, setJMBG] = useState('');
    const [kontakt, setKontakt] = useState('');
    const [poruka, setPoruka] = useState('');
    const [nastavnici, setNastavnici] = useState([]);
    const [izabraniNastavnik, setIzabraniNastavnik] = useState('');
    const [email, setEmail] = useState('');
    const [predmet, setPredmet] = useState([]);
    const [izabraniPredmet, setIzabraniPredmet] = useState('');
    const [veze,setVeze] = useState([]);

    const { id } = useParams();  // uzima id unika iz url-a za edit


    useEffect(() => {

        const fetchNastavnici = async () => { // Ucitavanje nastavnika za padajucu listu
            const { data, error } = await supabase.from('nastavnici').select('*');
            if (error) {
                console.error('Greška pri učitavanju:', error.message);
            } else {
                setNastavnici(data);
            }

        };

        const fetchPredmeti = async () => { // Ucitavanje predmeta za padajucu listu
            const { data: predmetData, error: predmetError } = await supabase.from('predmet_razred').select('*');
            if (predmetError) {
                console.error('Greška pri učitavanju:', predmetError.message);
            } else {
                setPredmet(predmetData);
            }
            console.log("Fetched predmet data:", predmetData);

        };

        const fetchVeze = async () => {
            const { data: vezeData, error: vezeError } = await supabase
            .from('uceniknastavnikveza')
            .select(`id,
                    ucenici (id, ime, razred, instrument, kontakt, jmbg, email),
                    nastavnici (id, ime),
                    predmet_razred (id, predmet, razred )
                `)
            .eq('ucenik_id', id);

            if (vezeError) {
                console.error('Greška pri učitavanju veza:', vezeError.message);
            } else {
                setVeze(vezeData);
                const veza = vezeData;
                setIme(veza.ucenici?.ime || '');
                setRazred(veza.predmet_razred?.razred || '');
                setInstrument(veza.predmet_razred?.predmet || '');
                setJMBG(veza.ucenici?.jmbg || '');
                setEmail(veza.ucenici?.email || '');
                setKontakt(veza.ucenici?.kontakt || '');
                setIzabraniNastavnik(veza.nastavnici?.id || null);
                setIzabraniPredmet(veza.predmet_razred?.id || null);

                console.log("Fetched ucenik data for edit:", uceniciData);





                console.log("Fetched veze data for edit:", vezeData);
            }
            

        // const fetchUcenici = async () => {
        //     const { data: uceniciData, error: uceniciError } = await supabase
        //         .from('uceniknastavnikveza')
        //         .select(`id,
        //             ucenici (id, ime, razred, instrument, kontakt, jmbg, email),
        //             nastavnici (id, ime),
        //             predmet_razred (id, predmet, razred )
        //         `)
        //         .eq('ucenik_id', id)
                

        //     if (uceniciError) {
        //         console.error('Greška pri učitavanju:', uceniciError.message);
        //     } else {

        //         const veza = uceniciData;
        //         setIme(veza.ucenici?.ime || '');
        //         setRazred(veza.predmet_razred?.razred || '');
        //         setInstrument(veza.predmet_razred?.predmet || '');
        //         setJMBG(veza.ucenici?.jmbg || '');
        //         setEmail(veza.ucenici?.email || '');
        //         setKontakt(veza.ucenici?.kontakt || '');
        //         setIzabraniNastavnik(veza.nastavnici?.id || null);
        //         setIzabraniPredmet(veza.predmet_razred?.id || null);

        //         console.log("Fetched ucenik data for edit:", uceniciData);

        //     }
        // }






        fetchUcenici();
        fetchNastavnici();
        fetchPredmeti();
        fetchVeze();

    }, []);


    const handleSubmit = async (e) => { // Upisivanje ucenika u bazu
        e.preventDefault();


        const { data, error } = await supabase
            .from('ucenici')
            .update([{ ime, prezime, instrument, jmbg, email, kontakt, razred: parseInt(razred) }])
            .eq('id', id)
            .select();

        if (error) {
            console.error(error.message);
            setPoruka('Greska: ' + error.message);


        } else {
            setPoruka('Ucenik uspesno izmenjen!');
            setIme('');
            setRazred('');
            setInstrument('');
            setJMBG('');
            setKontakt('');
            setEmail('');
            setIzabraniNastavnik('');
            setIzabraniPredmet('');

        }

        const noviUcenik_id = data[0].id;

        const { data: UcenikNastavnikData, error: UcenikNastavnikError } = await supabase
            .from('uceniknastavnikveza')
            .update([{ nastavnik_id: izabraniNastavnik, predmet_razred_id: izabraniPredmet }])
            .eq('ucenik_id', id)


        if (UcenikNastavnikError) {
            console.error(UcenikNastavnikError.message);
        } else {
            console.log('Ucenik-nastavnik-predmet veza uspesno kreirana:', UcenikNastavnikData);
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
                    <InputLabel>Predmet</InputLabel>
                    <Select
                        value={izabraniPredmet}
                        onChange={(e) => setIzabraniPredmet(e.target.value)}
                        label="Predmet"
                    >
                        {predmet.map((predm) => (
                            <MenuItem key={predm.id} value={predm.id}>
                                {`${predm.predmet} – ${predm.razred}. razred`}
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
