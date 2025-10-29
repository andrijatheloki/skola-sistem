import React, { useEffect, useState } from 'react';
import { Box, Typography, Chip, Link } from '@mui/material';
import { supabase } from '../lib/supabaseClient';
import { useParams } from 'react-router-dom';

export default function ProfilNastavnika() {
	const { id } = useParams(); // uzima id iz url-a
	const [ucenik, setUcenik] = useState(null);

	useEffect(() => {
		const fetchUcenik = async () => {
			const { data, error } = await supabase
				.from('ucenici')
				.select('*')
				.eq('id', id)
				.single();

			if (error) {
				console.error('Greska pri ucitavanju:', error.message);
			} else {
				setUcenik(data);
			}

		};

		fetchUcenik();
	}, [id]);

	if (!ucenik) return <div>Ucitavanje...</div>

    return (
        <Box
            sx={{
                maxWidth: 1000,
                mx: 'auto',
                mt: 4,
                p: 3,
                border: '2px solid #ccc',
                borderRadius: 2,
                boxShadow: 2,
                backgroundColor: '#fff',
            }}
        >
            <Typography variant="h5" gutterBottom>
                ProfilUcenika:
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
                <Typography variant="h6">{ucenik.ime}</Typography>
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
                <Typography variant="h6">{ucenik.instrument}</Typography>
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
                <Typography variant="h6">{ucenik.kontakt}</Typography>
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
                <Typography variant="h6">{ucenik.email}</Typography>
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
                <Typography variant="h6">{ucenik.jmbg}</Typography>
            </Box>

            

            <Box mt={2}>
                <Typography><strong>Status ucenika:</strong></Typography>
                <Chip label={ucenik.status || 'Aktivan'} color={ucenik.status === 'Aktivan' ? 'success' : 'error'} />
            </Box>

            
        </Box>
    );
}
