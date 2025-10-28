import React from 'react';
import { Drawer, List, ListItemButton, ListItemText, ListSubheader, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';



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




    const { role } = useUser();
    const location = useLocation();

    const [openAdmin, setOpenAdmin] = React.useState(false);

    const toggleAdmin = () => setOpenAdmin(!openAdmin);

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
                <ListItemButton component={Link} to="/Pocetna" selected={location.pathname === "/Pocetna"} sx={navButtonStyle(location.pathname, "/Pocetna")}>
                    <ListItemText primary="Pocetna" />
                </ListItemButton>




                <ListItemButton component={Link} to="/MojProfil" selected={location.pathname === "/MojProfil"} sx={navButtonStyle(location.pathname, "/MojProfil")}>
                    <ListItemText primary="Moj Profil" />
                </ListItemButton>

                {role !== 'admin' && (
                    <>
                        <ListItemButton component={Link} to="/ListaUcenikaV2" selected={location.pathname === "/ListaUcenikaV2"} sx={navButtonStyle(location.pathname, "/ListaUcenikaV2")}>
                            <ListItemText primary="Moji Učenici" />
                        </ListItemButton>
                        <ListItemButton component={Link} to="/Dokumenti" selected={location.pathname === "/Dokumenti"} sx={navButtonStyle(location.pathname, "/Dokumenti")}>
                            <ListItemText primary="Moji Planovi" />
                        </ListItemButton>
                    </>
                )}

                {role === 'admin' && (
                    <>
                        <ListItemButton onClick={toggleAdmin}>
                            <ListItemText primary="Administracija" />
                            {openAdmin ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>

                        <Collapse in={openAdmin} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding sx={{ pl: 2 }}>
                                <ListItemButton component={Link} to="/ListaNastavnika" selected={location.pathname === "/ListaNastavnika"} sx={navButtonStyle(location.pathname, "/ListaNastavnika")} >
                                    <ListItemText primary="Lista nastavnika" />
                                </ListItemButton>
                                <ListItemButton component={Link} to="/DodajNastavnika" selected={location.pathname === "/DodajNastavnika"}>
                                    <ListItemText primary="Dodaj nastavnika" />
                                </ListItemButton>
                                <ListItemButton component={Link} to="/ListaUcenika" selected={location.pathname === "/ListaUcenika"}>
                                    <ListItemText primary="Lista učenika" />
                                </ListItemButton>
                                <ListItemButton component={Link} to="/DodajUcenika" selected={location.pathname === "/DodajUcenika"}>
                                    <ListItemText primary="Dodaj učenika" />
                                </ListItemButton>
                                <ListItemButton component={Link} to="/Dokumenti" selected={location.pathname === "/Dokumenti"}>
                                    <ListItemText primary="Dokumenti" />
                                </ListItemButton>
                            </List>
                        </Collapse>
                    </>
                )}
            </List>
        </Drawer>
    );
}
