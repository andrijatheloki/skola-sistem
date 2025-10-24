import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Button } from '@mui/material';
import { useState } from 'react';
import { Chip } from '@mui/material';




    const rows = [
        { id: 1, ime: 'Marko Markovic', razred: 5, instrument: 'Gitara', klasa: 'Petar Petrovic', kontakt: '064111100', JMBG: '1234567890123',status: 'Aktivan' },
        { id: 2, ime: 'Jovana Jovanovic', razred: 6, instrument: 'Klavir', klasa: 'Ana Nikolic', kontakt: '064111101', JMBG: '1234567890124', status: 'Aktivan' },
        { id: 3, ime: 'Petar Petrovic', razred: 7, instrument: 'Harmonika', klasa: 'Milan Rakic', kontakt: '064111102', JMBG: '1234567890125', status: 'Aktivan' },
        { id: 4, ime: 'Ivana Ilic', razred: 4, instrument: 'Violina', klasa: 'Jelena Maric', kontakt: '064111103', JMBG: '1234567890126', status: 'Aktivan' },
        { id: 5, ime: 'Nikola Nikolic', razred: 5, instrument: 'Gitara', klasa: 'Petar Petrovic', kontakt: '064111104', JMBG: '1234567890127', status: 'Aktivan' },
        { id: 6, ime: 'Ana Anic', razred: 6, instrument: 'Klavir', klasa: 'Ana Nikolic', kontakt: '064111105', JMBG: '1234567890128', status: 'Aktivan' },
        { id: 7, ime: 'Milos Milic', razred: 7, instrument: 'Harmonika', klasa: 'Milan Rakic', kontakt: '064111106', JMBG: '1234567890129', status: 'Aktivan' },
        { id: 8, ime: 'Teodora Todorovic', razred: 3, instrument: 'Violina', klasa: 'Jelena Maric', kontakt: '064111107', JMBG: '1234567890130', status: 'Aktivan' },
        { id: 9, ime: 'Filip Filipovic', razred: 4, instrument: 'Gitara', klasa: 'Petar Petrovic', kontakt: '064111108', JMBG: '1234567890131', status: 'Aktivan' },
        { id: 10, ime: 'Sara Saric', razred: 5, instrument: 'Klavir', klasa: 'Ana Nikolic', kontakt: '064111109', JMBG: '1234567890132', status: 'Aktivan' },
        { id: 11, ime: 'Lazar Lazic', razred: 6, instrument: 'Harmonika', klasa: 'Milan Rakic', kontakt: '064111110', JMBG: '1234567890133', status: 'Aktivan' },
        { id: 12, ime: 'Milica Milenkovic', razred: 7, instrument: 'Violina', klasa: 'Jelena Maric', kontakt: '064111111', JMBG: '1234567890134', status: 'Aktivan' },
        { id: 13, ime: 'Nenad Nenic', razred: 3, instrument: 'Gitara', klasa: 'Petar Petrovic', kontakt: '064111112', JMBG: '1234567890135', status: 'Aktivan' },
        { id: 14, ime: 'Katarina Katavic', razred: 4, instrument: 'Klavir', klasa: 'Ana Nikolic', kontakt: '064111113', JMBG: '1234567890136', status: 'Aktivan' },
        { id: 15, ime: 'Vuk Vukovic', razred: 5, instrument: 'Harmonika', klasa: 'Milan Rakic', kontakt: '064111114', JMBG: '1234567890137', status: 'Aktivan' },
        { id: 16, ime: 'Jelena Jelic', razred: 6, instrument: 'Violina', klasa: 'Jelena Maric', kontakt: '064111115', JMBG: '1234567890138', status: 'Aktivan' },
        { id: 17, ime: 'Andrej Andric', razred: 7, instrument: 'Gitara', klasa: 'Petar Petrovic', kontakt: '064111116', JMBG: '1234567890139', status: 'Aktivan' },
        { id: 18, ime: 'Marina Marinovic', razred: 3, instrument: 'Klavir', klasa: 'Ana Nikolic', kontakt: '064111117', JMBG: '1234567890140', status: 'Ispisuje se' },
        { id: 19, ime: 'Stefan Stevic', razred: 4, instrument: 'Harmonika', klasa: 'Milan Rakic', kontakt: '064111118', JMBG: '1234567890141', status: 'Ispisuje se' },
        { id: 20, ime: 'Tijana Tijanic', razred: 5, instrument: 'Violina', klasa: 'Jelena Maric', kontakt: '064111119', JMBG: '1234567890142', status: 'Aktivan' },
        { id: 21, ime: 'Damir Damjanovic', razred: 6, instrument: 'Gitara', klasa: 'Petar Petrovic', kontakt: '064111120', JMBG: '1234567890143', status: 'Aktivan' },
        { id: 22, ime: 'Milena Milosevic', razred: 7, instrument: 'Klavir', klasa: 'Ana Nikolic', kontakt: '064111121', JMBG: '1234567890144', status: 'Aktivan' },
        { id: 23, ime: 'Bogdan Bogicevic', razred: 3, instrument: 'Harmonika', klasa: 'Milan Rakic', kontakt: '064111122', JMBG: '1234567890145', status: 'Ispisuje se' },
        { id: 24, ime: 'Danica Danilovic', razred: 4, instrument: 'Violina', klasa: 'Jelena Maric', kontakt: '064111123', JMBG: '1234567890146', status: 'Ispisan' },
        { id: 25, ime: 'Uros Urosevic', razred: 5, instrument: 'Gitara', klasa: 'Petar Petrovic', kontakt: '064111124', JMBG: '1234567890147', status: 'Aktivan' },
        { id: 26, ime: 'Natalija Novakovic', razred: 6, instrument: 'Klavir', klasa: 'Ana Nikolic', kontakt: '064111125', JMBG: '1234567890148', status: 'Aktivan' },
        { id: 27, ime: 'Dusan Djuric', razred: 7, instrument: 'Harmonika', klasa: 'Milan Rakic', kontakt: '064111126', JMBG: '1234567890149', status: 'Aktivan' },
        { id: 28, ime: 'Aleksandra Aleksic', razred: 3, instrument: 'Violina', klasa: 'Jelena Maric', kontakt: '064111127', JMBG: '1234567890150', status: 'Aktivan' },
        { id: 29, ime: 'Branko Brankovic', razred: 4, instrument: 'Gitara', klasa: 'Petar Petrovic', kontakt: '064111128', JMBG: '1234567890151', status: 'Ispisuje se' },
        { id: 30, ime: 'Isidora Ilic', razred: 5, instrument: 'Klavir', klasa: 'Ana Nikolic', kontakt: '064111129', JMBG: '1234567890152', status: 'Ispisan' },
    ];
const columns = [
    { field: 'ime', headerName: 'Ime i Prezime', flex: 1 },
    { field: 'razred', headerName: 'Razred', flex: 0.5 },
    { field: 'instrument', headerName: 'Instrument', flex: 1 },
    { field: 'kontakt', headerName: 'Kontakt Telefon', flex: 1 },
    { field: 'JMBG', headerName: 'JMBG', flex: 1 },
    { field: 'klasa', headerName: 'Klasa Prof:', flex: 1 },
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

export default function ListaUcenika() {

    const [search, setSearch] = useState('');
    const filteredRows = rows.filter((row) =>
        row.ime.toLowerCase().includes(search.toLowerCase()) ||
        row.instrument.toLowerCase().includes(search.toLowerCase()) ||
        row.klasa.toLowerCase().includes(search.toLowerCase()) 
    );

        return (
            <div style={{ height: 400, width: '100%', bgcolor: '#f5f5f5',  padding: '2rem' }}>

               

                <h2>Lista Ucenika</h2>
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
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    autoHeight
                />
                </div>
        );

}

