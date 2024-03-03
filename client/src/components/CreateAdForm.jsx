// CreateAdForm.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAd } from '../redux/actions';

const CreateAdForm = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [img, setImg] = useState('');
    const [message, setMessage] = useState('');

    const handleCreateAd = () => {
        dispatch(createAd({ title, description, img }))
            .then(response => {
                setMessage(response.payload);
                setTitle('')
                setDescription('')
                setImg('')
            })
            .catch(error => {
                setMessage(error.payload);
            });
    };

    return (
        <div>
            <h2>Create Advertisement</h2>
            <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
            <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
            <input type="text" placeholder="Image URL" value={img} onChange={e => setImg(e.target.value)} />
            <button onClick={handleCreateAd}>Create Ad</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateAdForm;
