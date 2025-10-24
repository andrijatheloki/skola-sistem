import React from 'react';

import { Link } from 'react-router-dom';




const ListaUcenika = () => {

    const ucenici = [
        {id:1, ime: 'Marko Markovic', razred: 5 },
        {id:2, ime: 'Jovana JOvanovic', razred: 6 },
        {id:3, ime: 'Petar petrovic', razred: 7 },


    ];

    return (
        
        <div style={{ padding: 20 }}>
        <h2>Lista Ucenika</h2>
            <ul>
                {ucenici.map((u, index) => (
                    <li key={index}>
                        <Link to={`/ucenik/${u.id}`} > {u.ime}{u.prezime}{u.razred } 
                            
                        </Link>
                </li>
             ))}

            </ul>

        </div>
       



    )








}

export default ListaUcenika;