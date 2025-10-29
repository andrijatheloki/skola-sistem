import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { DataGrid } from '@mui/x-data-grid';
import { TextField } from '@mui/material';


export default function ListaUcenika() {
    const [ucenici, setUcenici] = useState([]);
    const [search, setSearch] = useState('');
  

    // Ucitavanje iz baze kad se stranica otvori
    useEffect(() => {
        const fetchUcenici = async () => {
            const { data, error } = await supabase.from('ucenici').select('*');
            if (error) {
                console.error('Greška pri učitavanju:', error.message);
            } else {
                setUcenici(data);
            }
        };

        fetchUcenici();
    }, []);

    const filteredRows = ucenici.filter((row) =>
        row.ime.toLowerCase().includes(search.toLowerCase())
    );

    const columns = [
        { field: 'ime', headerName: 'Ime i Prezime', flex: 1 },
        { field: 'razred', headerName: 'Razred', flex: 0.5 },
        { field: 'instrument', headerName: 'Instrument', flex: 1 },
        { field: 'klasa', headerName: 'Klasa Prof: ', flex: 1 },
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
