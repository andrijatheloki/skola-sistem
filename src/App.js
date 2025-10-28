import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext';

import Pocetna from './pages/Pocetna';
import ListaUcenika from './pages/ListaUcenika';
import ProfilUcenika from './ProfilUcenika';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import Dokumenti from './pages/Dokumenti';
import DodajUcenika from './components/DodajUcenika';
import ListaUcenikaV2 from './pages/ListaUcenikaV2';
import DodajNastavnika from './components/DodajNastavnika';
import ListaNastavnika from './pages/ListaNastavnika';
import ProfilNastavnika from './pages/ProfilNastavnika';
import MojProfil from './pages/MojProfil';
import ResetPassword from './pages/resetpassword';
import ZaboravljenaSifra from './pages/zaboravljenasifra';

import Sidebar from './components/Sidebar'; // sidebar sa menijem

// Wrapper da koristimo `useLocation` unutar App
function AppContent() {
    const location = useLocation();
    const currentPath = location.pathname;
    const { role, loading } = useUser();

    if (loading) return null; // ili loading spinner

    return (
        <>
            {currentPath !== "/Login" && <Sidebar />}

            <div style={{ marginLeft: currentPath !== "/Login" ? 260 : 0, padding: 20 }}>
                <Routes>
                    <Route path="/Login" element={<Login />} />
                    <Route path="/" element={<PrivateRoute><Pocetna /></PrivateRoute>} />
                    <Route path="/Pocetna" element={<PrivateRoute><Pocetna /></PrivateRoute>} />
                    <Route path="/DodajUcenika" element={<PrivateRoute><DodajUcenika /></PrivateRoute>} />
                    <Route path="/ListaUcenika" element={<PrivateRoute><ListaUcenika /></PrivateRoute>} />
                    <Route path="/ListaUcenikaV2" element={<PrivateRoute><ListaUcenikaV2 /></PrivateRoute>} />
                    <Route path="/ucenik/:id" element={<PrivateRoute><ProfilUcenika /></PrivateRoute>} />
                    <Route path="/Dokumenti" element={<PrivateRoute><Dokumenti /></PrivateRoute>} />
                    <Route path="/DodajNastavnika" element={<PrivateRoute><DodajNastavnika /></PrivateRoute>} />
                    <Route path="/ListaNastavnika" element={<PrivateRoute><ListaNastavnika /></PrivateRoute>} />
                    <Route path="/profil-nastavnika/:id" element={<PrivateRoute><ProfilNastavnika /></PrivateRoute>} />
                    <Route path="/MojProfil" element={<PrivateRoute><MojProfil /></PrivateRoute>} />
                    <Route path="/resetpassword" element={<PrivateRoute><ResetPassword /></PrivateRoute>} />
                    <Route path="/ZaboravljenaSifra" element={<ZaboravljenaSifra />} />
                </Routes>
            </div>
        </>
    );
}

export default function App() {
    return (
        <UserProvider>
            
                <AppContent />
            
        </UserProvider>
    );
}
