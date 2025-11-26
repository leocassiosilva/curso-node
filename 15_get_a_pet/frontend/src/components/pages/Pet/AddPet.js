import api from '../../../utils/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useHistory } from 'react-router-dom';

import styles from './AddPet.module.css';
import PetForm from '../../form/PetForm';

/*hooks*/
import useFlashMessage from '../../../hooks/useFlashMessage';


function AddPet() {
    return (
        <section className={styles.addpet_header}>
            <div>
                <h1>Adicionar um Pet</h1>
                <p>Depois ele ficará disponível para adoção</p>
            </div>
            <p>Formulário de adição de pet aqui</p>
            <PetForm btnText="Cadastrar Pet"/>
        </section>
    );
}

export default AddPet;