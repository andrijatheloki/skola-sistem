import React from 'react';
import { Drawer, List, ListItemButton, ListItemText, ListSubheader, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

import { supabase } from '../lib/supabaseClient';



export default function Sidebar() {
    const navButtonStyle = (current, path) => ({
        borderRadius: 2,
        mx: 1,
        my: 0.5,
        color: current === path ? 'white' : 'primary.main',
        bgcolor: current === path ? 'primary.main' : 'secondary',
        '&:hover': {
            bgcolor: 'primary.light',
            color: 'white'
        }
    });

    const navigate = useNavigate();


    const { role } = useUser();
    const location = useLocation();
    const handleLogout = async () => {
        await supabase.auth.signOut()
        navigate('/Login')
    }


    const [openAdmin, setOpenAdmin] = React.useState(true);
    const [openUcenici, setOpenUcenici] = React.useState(false);
    const [openNastavnici, setOpenNastavnici] = React.useState(false);

    const toggleAdmin = () => setOpenAdmin(!openAdmin);
    const toggleUcenici = () => setOpenUcenici(!openUcenici);
    const toggleNastavnici = () => setOpenNastavnici(!openNastavnici);


    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    bgcolor: '#f0f0f0', // ⬅️ ovde menjaš pozadinu sidebar-a
                    boxShadow: 3
                }
            }}
        >





            <List component="nav" subheader={<ListSubheader>Pozdrav!</ListSubheader>}>



                {role === 'nastavnik' && (

                    <>
                        <ListItemButton component={Link} to="/Pocetna" selected={location.pathname === "/Pocetna"} sx={navButtonStyle(location.pathname, "/Pocetna")}>
                            <ListItemText primary="Pocetna" />
                        </ListItemButton>

                        <ListItemButton component={Link} to="/MojProfil" selected={location.pathname === "/MojProfil"} sx={{ ...navButtonStyle(location.pathname, "/MojProfil"), pl: 2 }}>
                            <ListItemText primary="Moj Profil" />
                        </ListItemButton>

                        <ListItemButton component={Link} to="/MojiUcenici" selected={location.pathname === "/MojiUcenici"} sx={navButtonStyle(location.pathname, "/ListaUcenikaV2")}>
                            <ListItemText primary="Moji Učenici" />
                        </ListItemButton>
                        <ListItemButton component={Link} to="/Dokumenti" selected={location.pathname === "/Dokumenti"} sx={navButtonStyle(location.pathname, "/Dokumenti")}>
                            <ListItemText primary="Moji Planovi" />
                        </ListItemButton>
                        
                        <ListItemButton onClick={handleLogout} variant="outlined" color="primary" sx={navButtonStyle(location.pathname, "")}>
                            <ListItemText primary="Logout" />

                        </ListItemButton>
                    </>



                )}


                {/* Removed empty block for role !== 'admin' */}

                {role === 'admin' && (
                    <>
                        <ListItemButton component={Link} to="/PocetnaAdmin" selected={location.pathname === "/PocetnaAdmin"} sx={navButtonStyle(location.pathname, "/PocetnaAdmin")}>
                            <ListItemText primary="Pocetna" />
                        </ListItemButton>



                        <ListItemButton onClick={toggleAdmin} sx={navButtonStyle(location.pathname, "")}>
                            <ListItemText primary="Administracija" />
                            {openAdmin ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>

                        <Collapse in={openAdmin} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding sx={{ pl: 2 }}>

                                <ListItemButton onClick={toggleUcenici} sx={navButtonStyle(location.pathname, "")}>
                                    <ListItemText primary="Ucenici" />
                                    {openUcenici ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>

                                <Collapse in={openUcenici} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding sx={{ pl: 2 }}>
                                        <ListItemButton component={Link} to="/ListaUcenikaV2" selected={location.pathname === "/ListaUcenikaV2"} sx={navButtonStyle(location.pathname, "/ListaUcenika")}>
                                            <ListItemText primary="Lista učenika" />
                                        </ListItemButton>
                                        <ListItemButton component={Link} to="/DodajUcenika" selected={location.pathname === "/DodajUcenika"} sx={navButtonStyle(location.pathname, "/DodajUcenika")}>
                                            <ListItemText primary="Dodaj učenika" />
                                        </ListItemButton>
                                    </List>
                                </Collapse>

                                <ListItemButton onClick={toggleNastavnici} sx={navButtonStyle(location.pathname, "")}>
                                    <ListItemText primary="Nastavnici" />
                                    {openNastavnici ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>

                                <Collapse in={openNastavnici} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding sx={{ pl: 2 }}>
                                        <ListItemButton component={Link} to="/ListaNastavnika" selected={location.pathname === "/ListaNastavnika"} sx={navButtonStyle(location.pathname, "/ListaNastavnika")} >
                                            <ListItemText primary="Lista nastavnika" />
                                        </ListItemButton>
                                        <ListItemButton component={Link} to="/DodajNastavnika" selected={location.pathname === "/DodajNastavnika"} sx={navButtonStyle(location.pathname, "/DodajNastavnika")}>
                                            <ListItemText primary="Dodaj nastavnika" />
                                        </ListItemButton>


                                    </List>
                                </Collapse>


                                <ListItemButton component={Link} to="/Dokumenti" selected={location.pathname === "/Dokumenti"} sx={navButtonStyle(location.pathname, "/Dokumenti")}>
                                    <ListItemText primary="Dokumenti" />
                                </ListItemButton>
                            </List>
                        </Collapse>
                        <ListItemButton onClick={handleLogout} variant="outlined" color="primary" sx={navButtonStyle(location.pathname, "")}>
                            <ListItemText primary="Logout" />

                        </ListItemButton>
                    </>
                )}





            </List>
        </Drawer>
    );
}
