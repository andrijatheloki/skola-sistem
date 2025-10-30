// components/ListaUcenikaNastavnika.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { DataGrid } from '@mui/x-data-grid';

export default function ListaUcenikaNastavnika({ nastavnik_uuid }) {
  const [ucenici, setUcenici] = useState([]);

  useEffect(() => {
    if (!nastavnik_uuid) return;

    const fetchUcenici = async () => {
      const { data, error } = await supabase
        .from('ucenici')
        .select('*')
        .eq('nastavnik_uuid', nastavnik_uuid);

      if (error) console.error(error);
      else setUcenici(data);
    };

    fetchUcenici();
  }, [nastavnik_uuid]);

  return (
    <div style={{ height: 400 }}>
        
        
      <DataGrid
        rows={ucenici}
        columns={[
          { field: 'ime', headerName: 'Ime', flex: 1 },
          { field: 'instrument', headerName: 'Instrument', flex: 1 },
        ]}
        getRowId={(row) => row.id}
      />
    </div>
  );
}
