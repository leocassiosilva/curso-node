/**
 * Importações
 */

import { useState, useContext } from "react";
import styles from '../../form/Form.module.css';

import Input from '../../form/Input';
import { Link } from 'react-router-dom';

/*context */
import { Context } from '../../../context/UserContext';




function Login() {
    const [user, setUser] = useState({});
    const { login } = useContext(Context);

    function handleOnChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        login(user);
    }

    return (
        <section className={styles.form_container}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <Input 
                    type="email" 
                    text="Email"
                    name="email" 
                    placeholder="Digite seu email"
                    handleOnChange={handleOnChange}
                />
                <Input
                    type="password"
                    text="Senha"
                    name="password"
                    placeholder="Digite sua senha"
                    handleOnChange={handleOnChange}

                />
                <input type="submit" value="Entrar"/>
            </form>
            <p>Ainda não possui uma conta ? <Link to="/register">Clique aqui</Link> para se cadastrar.</p>
        </section>
    );
}

export default Login;
