import styles from './Profile.module.css';
import formStyles from '../../form/Form.module.css';
import Input from '../../form/Input';
import {useState, useEffect} from 'react';
import api from '../../../utils/api';
import useFlashMessage from '../../../hooks/useFlashMessage';
import RoundedImage from '../../layout/RoundedImage';

function Profile() {
    const [user, setUser] = useState({});
    const [preview, setPreview] = useState('');
    const [token] = useState(localStorage.getItem('token') || '');
    const {setFlashMessage} = useFlashMessage();

    useEffect(() => {
        api.get('/users/checkuser', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setUser(response.data);
        });
    }, [token]);

    function onFileChange(e) {
        const file = e.target.files[0];
        setPreview(URL.createObjectURL(file));
        setUser({...user, image: file});
    }

    function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value});
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let msgType = 'success';

        const formData = new FormData();

        // Preenche o FormData corretamente
        for (const key in user) {
            if (key === 'image' && user.image) {
                formData.append('image', user.image);
            } else {
                formData.append(key, user[key]);
            }
        }

        try {
            const response = await api.patch(`/users/edit/${user._id}`, formData, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setFlashMessage(response.data.message, 'success');
        } catch (error) {
            msgType = 'error';
            console.log('ERRO COMPLETO:', error.response);

            setFlashMessage(
                error.response?.data?.message || 'Erro ao atualizar usuário',
                msgType
            );
        }
    }

    return (
        <section>
            <div className={styles.profile_header}>
                <h1>Perfil</h1>

                {(preview || user.image) && (
                    <RoundedImage 
                        src={preview || `${process.env.REACT_APP_API}/images/users/${user.image}`}
                        alt={user.name}
                    />
                )}
            </div>

            <form onSubmit={handleSubmit} className={formStyles.form_container}>
                <Input
                    text="Imagem"
                    type="file"
                    name="image"
                    handleOnChange={onFileChange}
                />

                <Input
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite o seu e-mail"
                    handleOnChange={handleChange}
                    value={user.email || ''}
                />

                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite o seu nome"
                    handleOnChange={handleChange}
                    value={user.name || ''}
                />

                <Input
                    text="Telefone"
                    type="text"
                    name="phone"
                    placeholder="Digite o seu telefone"
                    handleOnChange={handleChange}
                    value={user.phone || ''}
                />

                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite a sua senha"
                    handleOnChange={handleChange}
                />

                <Input
                    text="Confirmação de Senha"
                    type="password"
                    name="confirmpassword"
                    placeholder="Confirme a sua senha"
                    handleOnChange={handleChange}
                />

                <input type="submit" value="Salvar"/>
            </form>
        </section>
    );
}

export default Profile;
