// RegisterForm.js

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/actions';
import { Button, Form } from 'react-bootstrap';
import '../styles/registerForm.css';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const message = useSelector(state => state.auth.message);
    const darkTheme = useSelector(state => state.darkTheme);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (message === 'User registered successfully') {
            navigate('/login');
        }
    }, [message, navigate]);

    const handleRegister = () => {
        dispatch(registerUser(username, password));
    };

    return (
        <div className={darkTheme ? 'register register--dark' : 'register register--white'}>
            <div className="register__container">
                <h1 className="register__title">Register</h1>
                <Form className="register__form">
                    <Form.Group className="mb-3" controlId="formGroupLogin">
                        <Form.Label>Username</Form.Label>
                        <Form.Control value={username} onChange={e => setUsername(e.target.value)} type="email" placeholder="Username" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
                    </Form.Group>
                </Form>
                <Button className="register__btn" onClick={handleRegister} variant="success">
                    Register
                </Button>
            </div>
        </div>
    );
};

export default RegisterForm;
