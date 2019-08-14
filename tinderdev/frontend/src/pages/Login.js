/**
 * WE ARE USING REACT HOOKS HERE -> useState
 */
import React, { useState } from 'react';
import api from '../services/api'

import logo from '../assets/logo.svg';
import './Login.css';

export default function Login({ history }) {
    // useState funtion receives the initial value as parameter
    // and returns an array with two positions, first is the value itself, second is a function which change this state variable
    const [ username, setUsername ] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await api.post('/devs', {
            username
        });

        const { _id } = response.data;
        
        history.push(`/dev/${_id}`)
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Tindev" />
                { /* And here we are using the state without a class component */ }
                <input value={username} onChange={ e => setUsername(e.target.value)} placeholder="Digite seu usuário do Github" />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}
