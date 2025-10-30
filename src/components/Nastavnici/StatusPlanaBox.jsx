
import { Chip, Typography, Box, Link } from '@mui/material';

export default function StatusPlanaBox({ status, link }) {
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
                <Typography variant="h5">Status plana</Typography>

                <Typography>Status:</Typography>
                <Chip label={status || 'Nije Spreman'} color={status === 'Spreman' ? 'success' : 'error'} />

                <Box mt={2}>
                    <Typography>Plan i program:</Typography>
                    {status === 'Spreman' ? (
                        <Link href={link} target="_blank">Otvori plan</Link>
                    ) : (
                        <Typography>Nije dostupan</Typography>
                    )}
                </Box>
            </Box>

        </Box>
    );
}
