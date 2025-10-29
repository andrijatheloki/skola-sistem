import React from 'react';
import { useUser } from '../context/UserContext';
import ListaUcenikaNastavnika from '../components/ListaUcenikaNastavnika';

export default function MojiUcenici() {
  const { user } = useUser();

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Moji učenici</h2>
      <ListaUcenikaNastavnika nastavnik_uuid={user?.id} />
    </div>
  );
}
