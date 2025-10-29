import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { DataGrid } from '@mui/x-data-grid';
import { TextField,Box } from '@mui/material';
import { Chip } from '@mui/material';
import { Link } from 'react-router-dom';


export default function ListaNastavnika() {
    const [nastavnici, setNastavnici] = useState([]);
    const [search, setSearch] = useState('');
  

    // Ucitavanje iz baze kad se stranica otvori
    useEffect(() => {
        const fetchNastavnici = async () => {
            const { data, error } = await supabase.from('nastavnici').select('*');
            if (error) {
                console.error('Greška pri učitavanju:', error.message);
            } else {
                setNastavnici(data);
            }
        };

        fetchNastavnici();
    }, []);

    const filteredRows = nastavnici.filter((row) =>
        row.ime.toLowerCase().includes(search.toLowerCase())
    );

    const columns = [
        {
            field: 'ime', headerName: 'Ime i Prezime', flex: 1,
            renderCell: (params) => (
                <Link to={`/profil-nastavnika/${params.row.id}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
                    {params.value}
                </Link>
            )

        },
       
        { field: 'instrument', headerName: 'Instrument', flex: 1.5 },
        { field: 'email', headerName: 'Email: ', flex: 1 },
        { field: 'kontakt', headerName: 'Kontakt: ', flex: 1 },
        { field: 'jmbg', headerName: 'JMBG: ', flex: 1 },
        {
            
            field: 'status',
            headerName: 'Status Plana',
            flex: 1,
            renderCell: (params) => {
                let color = 'error';
                let label = 'Nije Spreman';

                if (params.value) {
                    label = params.value;
                    switch (params.value) {
                        case 'Spreman':
                            color = 'success';
                            break;

                        case 'Nije Spreman':
                            color = 'error';

                            break;
                        default: color = 'error';
                    }
                }
               
                return <Chip label={label} color={color} />;



            }
        
        }
        
    ];

    return (
        <Box sx={{ pl: 1, pr: 4, pt: 4, ml: '50px' }}>
            <h2>Lista Nastavnika</h2>

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
        </Box>
    );
}
