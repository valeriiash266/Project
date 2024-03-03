// AdList.jsx

import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import AdItem from './AdItem';
import {deleteAd, fetchAds} from '../redux/actions.js';
import {InputGroup, Form, Button} from "react-bootstrap";
import '../styles/adList.css'
import {NavLink} from "react-router-dom";

const AdList = () => {
    const ads = useSelector(state => state.ads);
    const dispatch = useDispatch();
    const darkTheme = useSelector(state => state.darkTheme);
    const [search, setSearch] = useState('');

    useEffect(() => {
        dispatch(fetchAds());
    }, [ads]);

    const handleDeleteAd = (id) => {
        dispatch(deleteAd(id));
    };

    const filteredAds = ads.filter(ad => ad.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className={darkTheme ? 'adList adList--dark' : 'adList adList--white'}>
            <div className="adList__container container">
                <h2 className={darkTheme ? 'adList__title adList__title--dark' : 'adList__title adList__title--light'}>popular
                    ads</h2>
                <div className="adList__search">
                    <InputGroup className="mb-3">
                        <Form.Control
                            className={'adList__searchInp'}
                            value={search} placeholder={'Search...'}
                            onChange={(e) => setSearch(e.target.value)}
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                        />
                        <Button variant="outline-secondary" id="button-addon2">
                            Button
                        </Button>
                    </InputGroup>
                </div>
                <div className="adList__add">
                    <NavLink to='/createAd'>
                        <Button variant="primary">Add new ad</Button>
                    </NavLink>
                </div>
                <ul className='adList__list'>
                    {filteredAds.map((ad) => (
                        <li className='adList__item' key={ad.id}>
                            <AdItem darkTheme={darkTheme} handleDeleteAd={handleDeleteAd} adId={ad.id} title={ad.title}
                                    description={ad.description} img={ad.img}/>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdList;
