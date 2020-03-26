import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import api from './../../services/api';

import './styles.css'

export default function Profile() {
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    useEffect(() => {
        api.get('profile', { headers: { Authorization: ongId } }).then(respose => {
            setIncidents(respose.data);
        });
    }, [ongId]);

    async function hanldeDeleteIncident(id) {
        try {
            console.log(id, ongId);
            await api.delete(`incidents/${id}`, { headers: { Authorization: ongId } });
            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the hero" />
                <span>Bem vindo, {ongName}</span>
                <Link className="button" to="/incidents/new">Cadastrar Novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#e02031" />
                </button>
            </header>
            <h1>Casos Cadastrados</h1>
            <ul>
                {
                    incidents.map(incident => (
                        <li key={incident.id}>
                            <strong>CASO:</strong>
                            <p>{incident.title}</p>

                            <strong>DESCIÇÃO:</strong>
                            <p>{incident.description}</p>

                            <strong>VALOR:</strong>
                            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>
                            <button type="button" onClick={() => hanldeDeleteIncident(incident.id)}>
                                <FiTrash2 size={20} color="#a8a8a3" />
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div >
    );
}