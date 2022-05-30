import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { selectAllAuthors } from '../authors/authorsSlice';
import { postBook } from './booksSlice';
import jwt_decode from 'jwt-decode';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const BooksCreate = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [genre, setGenre] = useState('NO')
    const [pages, setPages] = useState('0')
    const [date, setDate] = useState('')
    const [author, setAuthor] = useState('');
    const [user, setUser] = useState(localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')): null);
    const [addRequestStatus, setAddRequestStatus] = useState('idle')    

    const authors = useSelector(selectAllAuthors);

    const onTitleChanged = (e) => setTitle(e.target.value);
    const onContentChanged = (e) => setContent(e.target.value);
    const onGenreChanged = (e) => setGenre(e.target.value);
    const onPagesChanged = (e) => setPages(e.target.value);
    const onDateChanged = (e) => setDate(e.target.value);
    const onAuthorChanged = (e) => setAuthor(e.target.value);

    const canSave = [title, content, genre, pages, date, author].every(Boolean) && addRequestStatus === 'idle';

    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending');

                // try to get user_id from jwt token in local storage
                dispatch(postBook({
                    author,
                    title,
                    description: content,
                    genre,
                    pages,
                    published: date,
                    created_by: user.user_id
                })).unwrap();

                setTitle('');
                setContent('');
                setGenre('NO');
                setPages('0');
                setDate('');
                setAuthor('');
                setUser(null);
                navigate('/book');
            } catch (err) {
                console.log('Failed to post new book!', err);
            } finally {
                setAddRequestStatus('idle');
            }
        }
    };

    const authorsOptions = authors.authors.map((author) => (
        <option key={author.id} value={author.id}>
            {author.first_name} {author.last_name}
        </option>
    ));

    return(
        <section className="create-book-section">
            <h2>Add a new book</h2>
            <form>
                <label htmlFor="postTitle">Title:</label>
                <input type="text" id="postTitle" name="postTitle" value={title} onChange={onTitleChanged} />
                <label htmlFor="postDescription">Description:</label>
                <textarea id="postDescription" name="postDescription" value={content} onChange={onContentChanged} />
                <label htmlFor="postGenre">Genre:</label>
                <select id="postGenre" name="postGenre" value={genre} onChange={onGenreChanged}>
                    <option value="CR">Crime</option>
                    <option value="ED">Education</option>
                    <option value="FA">Fantasy</option>
                    <option value="FI">Fiction</option>
                    <option value="NO">No genre</option>
                    <option value="NF">Non fiction</option>
                    <option value="RO">Romance</option>
                    <option value="TH">Thriller</option>
                </select>
                <label htmlFor="postPage">Pages:</label>
                <input type="number" id="postPage" name="postPage" min="0" value={pages} onChange={onPagesChanged} />
                <label htmlFor="postPublished">Published:</label>
                <input type="date" value={date} onChange={onDateChanged} />
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" name="postAuthor" value={author} onChange={onAuthorChanged} >
                    <option value=""></option>
                    {authorsOptions}
                </select>
                <Stack sx={{ my: "1rem" }} spacing={2} direction="row">
                    <Button variant="contained" onClick={onSavePostClicked} disabled={!canSave} >Create Book</Button>
                </Stack>
            </form>
        </section>
    )
};

export default BooksCreate;