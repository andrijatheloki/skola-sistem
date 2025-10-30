import React, { useEffect, useState } from 'react';
import { Box, Typography, Chip, Link } from '@mui/material';
import { supabase } from '../lib/supabaseClient';
import { useParams } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';


// Profil nastavnika stranica /components/nastavnici
import ProfilBox from '../components/Nastavnici/ProfilBox.jsx';
import StatusPlanaBox from '../components/Nastavnici/StatusPlanaBox.jsx';
import ListaUcenikaBox from '../components/Nastavnici/ListaUcenikaBox.jsx';



import ListaUcenikaNastavnika from '../components/ListaUcenikaOdNastavnika.jsx';

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
        <Box sx={{ flexGrow: 1, mt: 4, px: 3 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <ProfilBox nastavnik={nastavnik} />
                </Grid>

                <Grid item xs={12} md={4}>
                    <ListaUcenikaBox nastavnik={id} />
                </Grid>

                <Grid item xs={12} md={4}>
                    <StatusPlanaBox status={nastavnik.status} link={nastavnik.plan_link} />
                </Grid>
            </Grid>
        </Box>
        
               
    );
}
