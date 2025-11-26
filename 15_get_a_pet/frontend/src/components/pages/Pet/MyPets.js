import { Link } from "react-router-dom";
import {useState, useEffect} from "react";


function MyPets() {
    const [pets, setPets] = useState([]);

    return (
        <section>
            <div>
                <h1>My Pets</h1>
                <Link to="/pet/add">Cadastrar Pet</Link>
            </div>
            <div>
                {MyPets.length > 0 && <p>Meus Pets cadastrados</p>}
                {MyPets.length === 0 && <p>Você ainda não cadastrou nenhum pet!</p>}
            </div>
        </section>
    )
}
export default MyPets;