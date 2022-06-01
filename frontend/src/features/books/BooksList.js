import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks, selectAllBooks } from './booksSlice';

const BooksList = () => {

    const dispatch = useDispatch();
    
    const books = useSelector(selectAllBooks);

    useEffect(() => {
        dispatch(getBooks());
    }, [dispatch]);

    return(
        <>
            <Stack sx={{ maxWidth: "80%", mx: "auto", mt: "2rem" }} spacing={2} direction="row">
                <Button variant="contained">
                    <Link className="link-create-book" to="create">Create Book</Link>
                </Button>
            </Stack>
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
                        { books.books && books.books.map(item => (
                            <TableRow
                                key={item.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{item.title}</TableCell>
                                <TableCell align="right">{item.description.slice(0, 30)}...</TableCell>
                                <TableCell align="right">{item.full_author_name}</TableCell>
                                <TableCell align="right">{item.genre}</TableCell>
                                <TableCell align="right">{item.pages}</TableCell>
                                <TableCell align="right">{item.published}</TableCell>
                            </TableRow>
                        )) }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
};

export default BooksList;