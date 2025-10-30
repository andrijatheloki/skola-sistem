import React from 'react';
import { Box, Typography, Chip, Link } from '@mui/material';
import ListaUcenikaNastavnika from '../ListaUcenikaOdNastavnika';



export default function ProfilBox({ nastavnik}) {
    return ( 
    <Box
            sx={{
                maxWidth: 700,
                mx: 3,
                mt: 4,
                pl: 1,
                p: 3,
                border: '2px solid #ccc',
                borderRadius: 2,
                boxShadow: 2,
                backgroundColor: '#fff',
            }}
        >
            <Typography variant="h5" gutterBottom>
                Profil nastavnika:
            </Typography>

            <Box
                sx={{
                    backgroundColor: '#f9f9f9',
                    borderRadius: 2,
                    p: 1,
                    mb: 2,
                    boxShadow: 1,
                }}
            >
                <Typography variant="subtitle2" color="text.secondary">
                    Ime i prezime
                </Typography>
                <Typography variant="h6">{nastavnik.ime}</Typography>
            </Box>

            <Box
                sx={{
                    backgroundColor: '#f9f9f9',
                    borderRadius: 2,
                    p: 1,
                    mb: 1,
                    boxShadow: 1,
                }}
            >
                <Typography variant="subtitle2" color="text.secondary">
                    Instrument
                </Typography>
                <Typography variant="h6">{nastavnik.instrument}</Typography>
            </Box>

            <Box
                sx={{
                    backgroundColor: '#f9f9f9',
                    borderRadius: 2,
                    p: 1,
                    mb: 1,
                    boxShadow: 1,
                }}
            >
                <Typography variant="subtitle2" color="text.secondary">
                    Kontakt
                </Typography>
                <Typography variant="h6">{nastavnik.kontakt}</Typography>
            </Box>

            <Box
                sx={{
                    backgroundColor: '#f9f9f9',
                    borderRadius: 2,
                    p: 1,
                    mb: 1,
                    boxShadow: 1,
                }}
            >
                <Typography variant="subtitle2" color="text.secondary">
                    Email:
                </Typography>
                <Typography variant="h6">{nastavnik.email}</Typography>
            </Box>

            <Box
                sx={{

                    maxWidth: 300,
                    backgroundColor: '#f9f9f9',
                    borderRadius: 2,
                    p: 1,
                    mb: 1,
                    boxShadow: 1,
                }}
            >
                <Typography variant="subtitle2" color="text.secondary">
                    JMBG:
                </Typography>
                <Typography variant="h6">{nastavnik.jmbg}</Typography>
            </Box>





           
              

            </Box>
    );
}