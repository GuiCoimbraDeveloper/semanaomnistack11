import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import './styles.css'

import api from './../../services/api';

export default function NewIncidents() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const hisotry = useHistory();
    const ongId = localStorage.getItem('ongId');

    async function hanldeNewIncident(e) {
        e.preventDefault();
        const data = { title, description, value };

        try {
            await api.post('incidents', data, { headers: { Authorization: ongId } });
            hisotry.push('/profile');
        } catch (err) {
            alert('Deu erro ao inserir');
        }
    }
    return (
        <div className="new-incident-container">
            <div className="div content">
                <section>
                    <img src={logoImg} alt="Be the hero" />
                    <h1>Cadastrar novo caso</h1>
                    <p>
                        Descreva o caso detalhadamente para encontrar um heroi para resovler isso.
                    </p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={hanldeNewIncident}>
                    <input placeholder="titulo do caso" value={title} onChange={e => setTitle(e.target.value)} />
                    <textarea placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} />
                    <input placeholder="Valor em reais" value={value} onChange={e => setValue(e.target.value)} />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}