import api from '../../../utils/api';
import { useState, useEffect } from 'react';
import styles from './AddPet.module.css';
import PetForm from '../../form/PetForm';
import { useParams } from 'react-router-dom';


/* hooks*/
import useFLashMessage from '../../../hooks/useFlashMessage';


function EditPet() {
    const [pet, setPet] = useState({});
    const [token] = useState(localStorage.getItem('token') || '');
    const {id} = useParams();
    const {setFlashMessage} = useFLashMessage();

    useEffect(() => {
        api.get(`/pets/${id}`, {
            Authorization: `Bearer ${JSON.parse(token)}`
        }).then((response) => {
            console.log(response.data.pet);
            setPet(response.data.pet);

        })   
    }, [token,id]);

    async function updatePet(pet){}


    return (
        <section>
            <div className={styles.addpet_header}>
            <h2>Bem-vindo ao Get a Pet: {pet.name}</h2>

            {pet.name &&
                <PetForm handleSubmit={updatePet} btnText="Atualiar" petData={pet}/>
            }
            </div>
        </section>
    );
}

export default EditPet;
