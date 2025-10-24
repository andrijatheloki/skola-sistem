import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Pocetna from './pages/Pocetna';
import DodajUcenika from './pages/DodajUcenika';
import ListaUcenika from './pages/ListaUcenika';
import ProfilUcenika from './ProfilUcenika';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import { Button } from '@mui/material';

function App() {
    return (
        <Router>
            <nav style={{ padding: 20, background: '#f0f0f0' }}>
                <Button component={Link} to="/Pocetna" variant="outlined" color="primary" sx={{ mr: 2 }}>
                    Pocetna
                </Button>
                <Button component={Link} to="/Dodaj" variant="outlined" color="primary" sx={{ mr: 2 }}>
                    Dodaj Ucenika
                </Button>
                <Button component={Link} to="/ListaUcenika" variant="outlined" color="primary" sx={{ mr: 2 }}>
                    Lista Ucenika
                </Button>
            </nav>

            <Routes>
                <Route path="/Login" element={<Login />} />
                <Route path="/" element={<PrivateRoute><Pocetna /></PrivateRoute>} />
                <Route path="/Pocetna" element={<PrivateRoute><Pocetna /></PrivateRoute>} />
                <Route path="/Dodaj" element={<PrivateRoute><DodajUcenika /></PrivateRoute>} />
                <Route path="/ListaUcenika" element={<PrivateRoute><ListaUcenika /></PrivateRoute>} />
                <Route path="/ucenik/:id" element={<PrivateRoute><ProfilUcenika /></PrivateRoute>} />
            </Routes>
        </Router>
    )
}

export default App;
