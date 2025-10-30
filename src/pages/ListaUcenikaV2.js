import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { DataGrid } from '@mui/x-data-grid';
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { Chip } from '@mui/material';
import { Box } from '@mui/material';

export default function ListaUcenika() {
    const [ucenici, setUcenici] = useState([]);
    const [search, setSearch] = useState('');


    // Ucitavanje iz baze kad se stranica otvori
    useEffect(() => {
        const fetchUcenici = async () => { // Ucenici
            const { data: uceniciData, error: uceniciError } = await supabase.from('ucenici').select('*');
            if (uceniciError) {
                console.error('Greška pri učitavanju:', uceniciError.message);
            } else {
                setUcenici(uceniciData);
            }


            const { data: nastavniciData, error: nastavniciError } = await supabase.from('nastavnici').select('id, ime'); // Nastavnici

            const { data: UcenikNastavnikData, error: UcenikNastavnikError } = await supabase.from('uceniknastavnikpredmet').select('ucenik_id, nastavnik_id'); // predmet izmedju ucenika i nastavnika


            if (uceniciError || nastavniciError) {
                console.error('Greška pri učitavanju:', nastavniciError?.message || uceniciError?.message);
            }

            const povezani = uceniciData.map((ucenik) => {
                const veza = UcenikNastavnikData.find(v => v.ucenik_id === ucenik.id);
                const nastavnik = nastavniciData.find(n => n.id === veza?.nastavnik_id);

                return {
                    ...ucenik, // sve iz baze ostaje
                    nastavnik_ime: nastavnik ? nastavnik.ime : 'Nepoznat', // ovo je novo polje
                    nastavnik_id: nastavnik ? nastavnik.id : null 
                };
            });


            setUcenici(povezani);



        };


        fetchUcenici();
    }, []);

    const filteredRows = ucenici.filter((row) =>
        row.ime.toLowerCase().includes(search.toLowerCase())
    );

    const columns = [
        {
            field: 'ime', headerName: 'Ime i Prezime', flex: 1,
            renderCell: (params) => (
                <Link to={`/ProfilUcenika/${params.row.id}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
                    {params.value}
                </Link>
            )

        },
        { field: 'razred', headerName: 'Razred', flex: 0.5 },
        { field: 'instrument', headerName: 'Instrument', flex: 1 },
        {
            field: 'nastavnik_ime', headerName: 'Nastavnik: ', flex: 1,
            renderCell: (params) => (
                <Link to={`/profil-nastavnika/${params.row.nastavnik_id}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
                    {params.value}
                </Link>
            )

        },
        { field: 'kontakt', headerName: 'Kontakt ', flex: 1 },
        { field: 'jmbg', headerName: 'JMBG: ', flex: 1 },
        {
            field: 'status',
            headerName: 'Status učenika',
            flex: 1,
            renderCell: (params) => {
                let color = 'black';
                switch (params.value) {
                    case 'Aktivan':
                        color = 'success';
                        break;
                    case 'Ispisuje se':
                        color = 'warning';
                        break;
                    case 'Ispisan':
                        color = 'error';
                        break;
                    default: color = 'normal';
                }
                return <Chip label={params.value} color={color} />;



            }
        }
    ];

    return (
        <Box sx={{ pl: 1, pr: 4, pt: 4, ml: '50px' }}>
            <h2>Lista Učenika</h2>

            <TextField
                label="Pretraga"
                variant="outlined"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ mb: 2 }}
            />

            <Box sx={{ overflowX: 'auto' }}>
                <DataGrid
                    rows={filteredRows}
                    columns={columns}
                    getRowId={(row) => row.id}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    disableSelectionOnClick
                    autoHeight
                />
            </Box>
        </Box>
    );
}
