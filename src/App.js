import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Pocetna from './pages/Pocetna';
import DodajUcenika from './pages/DodajUcenika';
import ListaUcenika from './pages/ListaUcenika';
import ProfilUcenika from './ProfilUcenika';
import { Button } from '@mui/material';

function App() {
    return (
        <Router>
            <nav style={{ padding: 20, background: '#f0f0f0' }}>
                <Button
                    component={Link}
                    to="/Pocetna"
                    variant="outlined"
                    color="primary"
                    sx={{mr:2} }

                >
            Pocetna 
                </Button>

                <Button
                    component={Link}
                    to="/Dodaj"
                    variant="outlined"
                    color="primary"
                    sx={{ mr: 2 }}
                    label = "Dodaj Ucenika"
                >
                    Dodaj Ucenika
                </Button>

                <Button
                    component={Link}
                    to="/ListaUcenika"
                    variant="outlined"
                    color="primary"
                    sx={{ mr: 2 }}
                    label=""
                >
                    Lista Ucenika
                </Button>


            </nav>
            <Routes>
                <Route path="/Pocetna" element={<Pocetna />} />
                <Route path="/Dodaj" element={<DodajUcenika />} />
                <Route path="/ListaUcenika" element={<ListaUcenika />} />
                <Route path="/ucenik/:id" element={<ProfilUcenika /> } />
            </Routes>

        </Router>

    );
}

export default App;