// components/ListaUcenikaNastavnika.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

export default function ListaUcenikaOdNastavnika({ nastavnik_id }) {
  const [ucenici, setUcenici] = useState([]);

  useEffect(() => {
    if (!nastavnik_id) return;

    const fetchUcenici = async () => {
      const { data, error } = await supabase
        .from('uceniknastavnikveza')
        .select(`
          id,
          ucenici (id, ime, instrument),
          nastavnici (id)
          `)
        .eq('nastavnik_id', nastavnik_id);

      if (error) {
        console.error(error);
      } else {
        const formattedUcenici = data.map((ucenik) => ({
          id: ucenik.ucenici?.id || ucenik.id,
          ime: ucenik.ucenici?.ime || 'Nepoznat',

          
        }));

      setUcenici(formattedUcenici);
      }
     
  };

  console.log("Fetching students for teacher ID:", nastavnik_id);
  console.log("Fetched students:", ucenici);

  fetchUcenici();
}, [nastavnik_id]);

return (
  <div style={{ height: 400 }}>


    <DataGrid
      rows={ucenici}
      columns={[
         {
            field: 'ime', headerName: 'Ime i Prezime', flex: 1,
            renderCell: (params) => (
                <Link to={`/ProfilUcenika/${params.row.id}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
                    {params.value}
                </Link>
            )

        },

        { field: 'instrument', headerName: 'Instrument', flex: 1 },
      ]}
      getRowId={(row) => row.id}
    />
  </div>
);
}
