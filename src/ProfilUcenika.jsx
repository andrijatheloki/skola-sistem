import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button} from '@mui/material';

	
function ProfilUcenika() {

	const navigate = useNavigate();
	const ucenici = [
		{ id: 1, ime: 'Marko Markovic', razred: 5 },
		{ id: 2, ime: 'Jovana JOvanovic', razred: 6 },
		{ id: 3, ime: 'Petar petrovic', razred: 7 },


	];


	const { id } = useParams();

	const ucenik = ucenici.find(u => u.id === Number(id));

	if (!ucenik) {
		return <div>Ucenik nije pronadjen.	</div>;
	}




	return (
		<Box
			sx={{
				maxWidth: 500,
				mx: 'auto',
				mt: 8,
				p: 4,
				border: '2px solid #ccc',
				borderRadius: 4,
				boxShadow: 2,
			}}
		>

		<div>
			<h2>{ucenik.ime}</h2>
			<p>Razred: {ucenik.razred}	</p>
			<p>ID: {ucenik.id}</p>

			</div>

			<Button
				variant="contained"
				color="secondary"
				fullWidth
				onClick={()=> navigate(-1) }
				sx={{ mt: 2 }}
			>
				Nazad na Listu Ucenika
			</Button>



		></Box>


	);

}



export default ProfilUcenika;



