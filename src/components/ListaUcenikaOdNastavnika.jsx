// components/ListaUcenikaNastavnika.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { DataGrid } from '@mui/x-data-grid';

export default function ListaUcenikaOdNastavnika({ nastavnik_id }) {
  const [ucenici, setUcenici] = useState([]);

  useEffect(() => {
    if (!nastavnik_id) return;

    const fetchUcenici = async () => {
      const { data, error } = await supabase
        .from('uceniknastavnikpredmet')
        .select('*')
        .eq('nastavnik_id', nastavnik_id);

      if (error) console.error(error);
      else setUcenici(data);
    };

    fetchUcenici();
  }, [nastavnik_id]);

  return (
    <div style={{ height: 400 }}>
        
        
      <DataGrid
        rows={ucenici}
        columns={[
          { field: 'id', headerName: 'Ime', flex: 1 },
          { field: 'instrument', headerName: 'Instrument', flex: 1 },
        ]}
        getRowId={(row) => row.id}
      />
    </div>
  );
}
