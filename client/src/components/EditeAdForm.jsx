// EditeAdForm.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateAd } from '../redux/actions';

const EditeAdForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const adId = parseInt(id);
    const ads = useSelector(state => state.ads);
    const ad = ads.find(ad => ad.id === adId);

    const [formData, setFormData] = useState({
        title: ad ? ad.title : '',
        description: ad ? ad.description : '',
        img: ad ? ad.img : ''
    });

    const [message, setMessage] = useState('');

    useEffect(() => {
        if (ad) {
            setFormData({
                title: ad.title,
                description: ad.description,
                img: ad.img
            });
        }
    }, [ad]);

    const handleUpdateAd = () => {
        dispatch(updateAd(adId, formData))
            .then(response => {
                navigate('/adList');
                setMessage(response.payload);
            })
            .catch(error => {
                setMessage(error.payload);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div>
            <h2>Edit</h2>
            <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
            <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
            <input type="text" name="img" placeholder="Img" value={formData.img} onChange={handleChange} />
            <button onClick={handleUpdateAd}>Update</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default EditeAdForm;
