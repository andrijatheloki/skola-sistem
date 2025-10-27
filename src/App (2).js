import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Pocetna from './pages/Pocetna';
import ListaUcenika from './pages/ListaUcenika';
import ProfilUcenika from './ProfilUcenika';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import { Button } from '@mui/material';
import LogoutButton from './components/LogoutButton';
import { useLocation } from 'react-router-dom';
import Dokumenti from './pages/Dokumenti';
import DodajUcenika from './components/DodajUcenika';
import ListaUcenikaV2 from './pages/ListaUcenikaV2';
import DodajNastavnika from './components/DodajNastavnika';
import ListaNastavnika from './pages/ListaNastavnika';
import ProfilNastavnika from './pages/ProfilNastavnika';
import MojProfil from './pages/MojProfil';



function App() {

    const location = useLocation()
    const currentPath = location.pathname

    return (
       
        <>
       
            {currentPath !== "/Login" &&(
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

                    <Button component={Link} to="/Dokumenti" variant="outlined" color="primary" sx={{ mr: 2 }}>
                        Dokumenti
                    </Button>

                    <Button component={Link} to="/ListaUcenikaV2" variant="outlined" color="primary" sx={{ mr: 2 }}>
                        ListaUcenika V2
                    </Button>

                    <Button component={Link} to="/DodajNastavnika" variant="outlined" color="primary" sx={{ mr: 2 }}>
                        Dodaj Nastavnika
                    </Button>

                    <Button component={Link} to="/ListaNastavnika" variant="outlined" color="primary" sx={{ mr: 2 }}>
                        Lista Nastavnika
                    </Button>

                    <Button
                        component={Link}
                        to="/mojprofil"
                        variant="contained"
                        color="primary"
                        sx={{
                            position: 'fixed',
                            top: 20,
                            right: 20,
                            zIndex: 9999, // da bude iznad svega
                            borderRadius: '20px',
                            boxShadow: 3
                        }}
                    >
                        Moj Profil
                    </Button>

                    

                    <LogoutButton />
                </nav>
                )}

           

            <Routes>
                <Route path="/Login" element={<Login />} />
                <Route path="/" element={<PrivateRoute><Pocetna /></PrivateRoute>} />
                <Route path="/Pocetna" element={<PrivateRoute><Pocetna /></PrivateRoute>} />
                <Route path="/Dodaj" element={<PrivateRoute><DodajUcenika /></PrivateRoute>}  />
                <Route path="/ListaUcenika" element={<PrivateRoute><ListaUcenika /></PrivateRoute>} />
                <Route path="/ListaUcenikaV2" element={<PrivateRoute><ListaUcenikaV2 /></PrivateRoute>} />
                <Route path="/ucenik/:id" element={<PrivateRoute><ProfilUcenika /></PrivateRoute>} />
                <Route path="/Dokumenti" element={<PrivateRoute><Dokumenti /></PrivateRoute>} />
                <Route path="/DodajNastavnika" element={<PrivateRoute><DodajNastavnika /></PrivateRoute>} />
                <Route path="/ListaNastavnika" element={<PrivateRoute><ListaNastavnika /></PrivateRoute>} />
                <Route path="/profil-nastavnika/:id" element={<PrivateRoute><ProfilNastavnika /></PrivateRoute>} />
                <Route path="/MojProfil" element={<PrivateRoute><MojProfil /></PrivateRoute>} />

            </Routes>

        </>

        
    )
}

export default App;
