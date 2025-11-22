// api 
import api from '../utils/api';

// hook
import useFlashMessage from './useFlashMessage';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useAuth() {
    const { setFlashMessage } = useFlashMessage();
    const [authenticated, setAuthenticated] = useState(false);

    // Hook correto para navegação (React Router v6+)
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            setAuthenticated(true);
        }
    }, []);


    async function register(user) {
        let msgText = 'Cadastro realizado com sucesso!';
        let msgType = 'success';
        
        try {
            const data = await api.post('/users/register', user).then((response) => {
                return response.data;
            });

            await authUser(data);

        } catch (error) {
            console.log(error);
            msgText = error.response?.data?.message || 'Erro ao cadastrar';
            msgType = 'error';
        }

        setFlashMessage(msgText, msgType);
    }

    async function authUser(data) {
        setAuthenticated(true);
        localStorage.setItem('token', JSON.stringify(data.token));

        // Forma correta no React Router v6
        navigate('/');
    }

    return { authenticated, register };
}
