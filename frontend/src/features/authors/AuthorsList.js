import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthors } from './authorsSlice';

const AuthorsList = () => {

    const dispatch = useDispatch();

    const { authors } = useSelector((state) => state.authors);

    useEffect(() => {
        dispatch(getAuthors());
    }, [dispatch]);

    return (        
        <TableContainer sx={{ maxWidth: '80%', mx: "auto", mt: "2rem" }} component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Gender</TableCell>
                        <TableCell align="right">Age</TableCell>
                        <TableCell align="right">Born</TableCell>
                        <TableCell align="right">Died</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {authors.length > 0 && 
                        authors.map((item) => (
                            <TableRow
                                key={item.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{item.first_name} {item.last_name}</TableCell>
                                <TableCell align="right">{item.gender}</TableCell>
                                <TableCell align="right">{item.age}</TableCell>
                                <TableCell align="right">{item.born}</TableCell>
                                <TableCell align="right">{item.died}</TableCell>

                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default AuthorsList;