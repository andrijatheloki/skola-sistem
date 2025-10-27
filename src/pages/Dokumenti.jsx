import React from 'react';
import { TextField,Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';

const rows = [
    {
        id: 1, naziv: 'Ugovor o radu', opis: 'Za zaposlenog Marka', link:' https://drive.google.com/file/d/0BywwXUpD0-HgODBiWWptT2pnYkJldHNaV2taLTJPaHFwbkc0/view?usp=sharing&resourcekey=0-cZnaG3ze18N6bCm_kPaVXg' },
    { id: 2, naziv: 'Upisnica', opis: 'Učenik Petar', link: '/docs/upisnica-petar.pdf' },
    { id: 3, naziv: 'Rešenje o prijemu', opis: 'Zaposleni Jovana', link: '/docs/resenje-jovana.pdf' },
    { id: 4, naziv: 'Zapisnik sa sednice', opis: 'Savet nastavnika, mart 2023', link: '/docs/zapisnik-mart.pdf' },
    { id: 5, naziv: 'Izveštaj o radu', opis: 'Godina 2022/23', link: '/docs/izvestaj-2022.pdf' },
    { id: 6, naziv: 'Izjava o saglasnosti', opis: 'Roditelj učenika Laze', link: '/docs/izjava-laza.pdf' },
    { id: 7, naziv: 'Plan i program', opis: 'Razred I-2', link: '/docs/plan-i2.pdf' },
    { id: 8, naziv: 'Ugovor o volontiranju', opis: 'Volonter Stefan', link: '/docs/ugovor-volonter.pdf' },
    { id: 9, naziv: 'Dnevnik rada', opis: 'Nastavnik Ana', link: '/docs/dnevnik-ana.pdf' },
    { id: 10, naziv: 'Rešenje o odmoru', opis: 'Letnji raspust', link: '/docs/odmor-2023.pdf' },
    { id: 11, naziv: 'Potvrda o zaposlenju', opis: 'Zaposleni Ivana', link: '/docs/potvrda-ivana.pdf' },
    { id: 12, naziv: 'Pravilnik o ponašanju', opis: 'Ažurirano izdanje', link: '/docs/pravilnik-ponasanje.pdf' },
    { id: 13, naziv: 'Upitnik za roditelje', opis: 'Anketa mart 2023', link: '/docs/upitnik-roditelji.pdf' },
    { id: 14, naziv: 'Odobrenje za izlet', opis: 'Ekskurzija Fruška Gora', link: '/docs/izlet-fruska.pdf' },
    { id: 15, naziv: 'Izveštaj sa takmičenja', opis: 'Muzičko takmičenje 2022', link: '/docs/takmicenje.pdf' },
    { id: 16, naziv: 'Nalog za službeni put', opis: 'Nastavnik Milan', link: '/docs/put-milan.pdf' },
    { id: 17, naziv: 'Zapisnik o incidentu', opis: 'Dogadjaj u holu', link: '/docs/incident-hol.pdf' },
    { id: 18, naziv: 'Rešenje o disciplini', opis: 'Učenik D.P.', link: '/docs/disciplinarno.pdf' },
    { id: 19, naziv: 'Saglasnost za snimanje', opis: 'Učenici 3. razreda', link: '/docs/snimanje-3razred.pdf' },
    { id: 20, naziv: 'Potvrda o školovanju', opis: 'Učenik Luka', link: '/docs/skolovanje-luka.pdf' },
    { id: 21, naziv: 'Interni dopis', opis: 'Sekretarijat', link: '/docs/dopis.pdf' },
    { id: 22, naziv: 'Zahtev za refundaciju', opis: 'Putni troškovi', link: '/docs/refundacija.pdf' },
    { id: 23, naziv: 'Tabela prisustva', opis: 'Nastavnici februar', link: '/docs/prisustvo-feb.pdf' },
    { id: 24, naziv: 'Anketa o ishrani', opis: 'Učenici i roditelji', link: '/docs/ishrana.pdf' },
    { id: 25, naziv: 'Pozivnica za koncert', opis: 'Priredba decembar', link: '/docs/koncert.pdf' },
    { id: 26, naziv: 'Upisna lista', opis: 'Generacija 2023', link: '/docs/upisna-2023.pdf' },
    { id: 27, naziv: 'Radni nalog', opis: 'Tehničko osoblje', link: '/docs/radni-nalog.pdf' },
    { id: 28, naziv: 'Rešenje o produženju', opis: 'Ugovor nastavnika', link: '/docs/produzenje.pdf' },
    { id: 29, naziv: 'Zahtev za opremu', opis: 'Muzički instrumenti', link: '/docs/oprema-zahtev.pdf' },
    { id: 30, naziv: 'Kalendar školske godine', opis: '2023/24', link: '/docs/kalendar-2023.pdf' },
];




const columns = [
    

    { field: 'naziv', headerName: 'Naziv dokumenta', flex: 1 },
    { field: 'opis', headerName: 'Opis', flex: 2 },
    {
        field: 'akcije',
        headerName: 'Akcije',
        sortable: false,
        renderCell: (params) => (
            <>
                <Button
                    size="small"
                    variant="outlined"
                    onClick={() => window.open(params.row.link, '_blank')}
                    sx={{ mr: 1 }}
                >
                    Otvori
                </Button>
                <Button
                    size="small"
                    variant="outlined"
                    color="success"
                    onClick={() => window.print()}
                    sx={{ mr: 1 }}
                >
                    Štampaj
                </Button>
                <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={() => downloadFile(params.row.link)}
                >
                    Preuzmi
                </Button>
            </>
        ),
        flex: 2,
    },
];

const downloadFile = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export default function Dokumenti() {

    const [search, setSearch] = useState('');
    const filteredRows = rows.filter((row) =>
        row.naziv.toLowerCase().includes(search.toLowerCase()) ||
        row.opis.toLowerCase().includes(search.toLowerCase())
    );



    return (
        <div style={{ height: 400, width: '100%', padding: '2rem' }}>
            <Button
                size="small"
                variant="outlined"
                color="primary"
                onClick={() => setSearch("ugovor")}
            >
                Ugovori
            </Button>

            <h2>Svi Dokumenti</h2>
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
