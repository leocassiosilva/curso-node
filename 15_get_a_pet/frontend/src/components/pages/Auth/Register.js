import { useState, useContext} from "react";
import Input from "../../form/Input"; 
import {Link} from 'react-router-dom';

/* contexts */
import { Context } from '../../../context/UserContext'; 



import styles from '../../form/Form.module.css'
function Register() {
    const [user, setUser] = useState({});
    const { register } = useContext(Context)


    
    function handleOnChange(e) {
        console.log(e.target.value);
        setUser({...user, [e.target.name]: e.target.value});
    }



    function handleSubmit(e) {
    e.preventDefault();
    console.log(user);
    // depois você pode enviar para o backend
    register(user)

    }


    return (
        <section className={styles.form_container}>
            <h1>Registrar</h1>
            <form onSubmit={handleSubmit}>
                <Input 
                    type="text" 
                    text="Nome"
                    name="name" 
                    placeholder="Digite seu nome" 
                    handleOnChange={handleOnChange}
                />
                <Input 
                    type="text" 
                    text="Telefone"
                    name="phone" 
                    placeholder="Digite seu telefone" 
                    handleOnChange={handleOnChange}
                />
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
                <Input 
                    type="password" 
                    text="Confirmação de Senha"
                    name="confirmpassword" 
                    placeholder="Confirme a sua senha" 
                    handleOnChange={handleOnChange}
                />
                <input type="submit" value="Cadastrar" />
            </form>
            <p>Já tem uma conta? <Link to="/login">Clique aqui</Link> para entrar.</p>
        </section>
    );
}

export default Register;
