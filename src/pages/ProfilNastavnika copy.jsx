import React, { useEffect, useState } from 'react';
import { Box, Typography, Chip, Link } from '@mui/material';
import { supabase } from '../lib/supabaseClient';
import { useParams } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';

import ListaUcenikaNastavnika from '../components/ListaUcenikaOdNastavnika';

export default function ProfilNastavnika() {
    const { id } = useParams(); // uzima id iz url-a
    
    const [nastavnik, setNastavnik] = useState(null);

    useEffect(() => {
        const fetchNastavnik = async () => {
            const { data, error } = await supabase
                .from('nastavnici')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Greska pri ucitavanju:', error.message);
            } else {
                setNastavnik(data);
            }

        };

        fetchNastavnik();
    }, [id]);

    if (!nastavnik) return <div>Ucitavanje...</div>
    

    return (
        
        <Box
            sx={{
                maxWidth: 700,
                mx: 3,
                mt: 4,
                pl: 1,
                p: 3,
                border: '2px solid #ccc',
                borderRadius: 2,
                boxShadow: 2,
                backgroundColor: '#fff',
            }}
        >
            <Typography variant="h5" gutterBottom>
                Profil nastavnika:
            </Typography>

            <Box
                sx={{
                    backgroundColor: '#f9f9f9',
                    borderRadius: 2,
                    p: 1,
                    mb: 2,
                    boxShadow: 1,
                }}
            >
                <Typography variant="subtitle2" color="text.secondary">
                    Ime i prezime
                </Typography>
                <Typography variant="h6">{nastavnik.ime}</Typography>
            </Box>

            <Box
                sx={{
                    backgroundColor: '#f9f9f9',
                    borderRadius: 2,
                    p: 1,
                    mb: 1,
                    boxShadow: 1,
                }}
            >
                <Typography variant="subtitle2" color="text.secondary">
                    Instrument
                </Typography>
                <Typography variant="h6">{nastavnik.instrument}</Typography>
            </Box>

            <Box
                sx={{
                    backgroundColor: '#f9f9f9',
                    borderRadius: 2,
                    p: 1,
                    mb: 1,
                    boxShadow: 1,
                }}
            >
                <Typography variant="subtitle2" color="text.secondary">
                    Kontakt
                </Typography>
                <Typography variant="h6">{nastavnik.kontakt}</Typography>
            </Box>

            <Box
                sx={{
                    backgroundColor: '#f9f9f9',
                    borderRadius: 2,
                    p: 1,
                    mb: 1,
                    boxShadow: 1,
                }}
            >
                <Typography variant="subtitle2" color="text.secondary">
                    Email:
                </Typography>
                <Typography variant="h6">{nastavnik.email}</Typography>
            </Box>

            <Box
                sx={{

                    maxWidth: 300,
                    backgroundColor: '#f9f9f9',
                    borderRadius: 2,
                    p: 1,
                    mb: 1,
                    boxShadow: 1,
                }}
            >
                <Typography variant="subtitle2" color="text.secondary">
                    JMBG:
                </Typography>
                <Typography variant="h6">{nastavnik.jmbg}</Typography>
            </Box>





            <Box mt={2}>
                <Typography><strong>Status plana:</strong></Typography>
                <Chip label={nastavnik.status || 'Nije Spreman'} color={nastavnik.status === 'Spreman' ? 'success' : 'error'} />
            </Box>

            <Box mt={2}>
                <Typography><strong>Plan i program:</strong></Typography>

                {nastavnik.status === 'Nije Spreman' || !nastavnik.status ? (
                    <Typography variant="h7" gutterBottom>
                        Nije Spreman Plan.
                    </Typography>

                ) : (
                    <Link href={nastavnik.plan_link || '#'} target="_blank">
                        Otvori plan
                    </Link>
                )



                }

            </Box>
              <ListaUcenikaNastavnika nastavnik_uuid={id} />

            </Box>        
    );
}
