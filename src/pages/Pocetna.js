import React from 'react';
import { Typography, Box } from '@mui/material';

function Pocetna() {
    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
                Dobrodosli u Skolski Sistem
            </Typography>
            <Typography>
                Ovde Mozete upravljati ucenicima, ocenama, prisustvima i jos mnogo toga.
            </Typography>
        </Box>
    );
}

export default Pocetna;