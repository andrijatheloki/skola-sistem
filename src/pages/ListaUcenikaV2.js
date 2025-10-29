import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { DataGrid } from '@mui/x-data-grid';
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';


export default function ListaUcenika() {
    const [ucenici, setUcenici] = useState([]);
    const [search, setSearch] = useState('');


    // Ucitavanje iz baze kad se stranica otvori
    useEffect(() => {
        const fetchUcenici = async () => {
            const { data: uceniciData, error: uceniciError } = await supabase.from('ucenici').select('*');
            if (uceniciError) {
                console.error('Greška pri učitavanju:', uceniciError.message);
            } else {
                setUcenici(uceniciData);
            }


            const { data: nastavniciData, error: nastavniciError } = await supabase.from('nastavnici').select('id, ime');

            if (uceniciError || nastavniciError) {
                console.error('Greška pri učitavanju:', nastavniciError?.message || uceniciError?.message);
            }

            const povezani = uceniciData.map((ucenik) => {
                const nastavnik = nastavniciData.find(n => n.id === ucenik.nastavnik_uuid);
                return {
                    ...ucenik, // sve iz baze ostaje
                    nastavnik_ime: nastavnik ? nastavnik.ime : 'Nepoznat', // ovo je novo polje
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
                <Link to={`/profil-nastavnika/${params.row.nastavnik_uuid}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
                    {params.value}
                </Link>
            )

        },
        { field: 'kontakt', headerName: 'Kontakt ', flex: 1 },
        { field: 'jmbg', headerName: 'JMBG: ', flex: 1 },
    ];

    return (
        <div style={{ height: 500, width: '100%', padding: '2rem' }}>
            <h2>Lista Učenika</h2>

            <TextField
                label="Pretraga"
                variant="outlined"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ mb: 2 }}
            />

            <DataGrid
                rows={filteredRows}
                columns={columns}
                getRowId={(row) => row.id} // veoma važno za Supabase ID
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
                autoHeight
            />
        </div>
    );
}
