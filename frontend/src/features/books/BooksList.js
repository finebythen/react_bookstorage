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
import { getBooks } from './booksSlice';

const BooksList = () => {

    const dispatch = useDispatch();

    const { books } = useSelector((state) => state.books);

    useEffect(() => {
        dispatch(getBooks());
    }, [dispatch]);

    return(
        <TableContainer sx={{ maxWidth: "80%", mx: "auto", mt: "2rem" }} component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell align="right">Description</TableCell>
                        <TableCell align="right">Author</TableCell>
                        <TableCell align="right">Genre</TableCell>
                        <TableCell align="right">Pages</TableCell>
                        <TableCell align="right">Published</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {books.map((item) => (
                        <TableRow
                            key={item.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">{item.title}</TableCell>
                            <TableCell align="right">{item.description}</TableCell>
                            <TableCell align="right">{item.full_author_name}</TableCell>
                            <TableCell align="right">{item.genre}</TableCell>
                            <TableCell align="right">{item.pages}</TableCell>
                            <TableCell align="right">{item.published}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default BooksList;