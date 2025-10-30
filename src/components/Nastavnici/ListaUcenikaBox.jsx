import ListaUcenikaOdNastavnika from '../ListaUcenikaOdNastavnika';
import { Box, Typography } from '@mui/material';
import React from 'react';

export default function ListaUcenikaBox({ nastavnik }) {
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
            <Box sx={{ flexGrow: 1, mt: 4, px: 3 }}>
                <Typography variant="h5">Učenici</Typography>
                <ListaUcenikaOdNastavnika nastavnik_id={nastavnik} />
            </Box>
        </Box>
    );
}
