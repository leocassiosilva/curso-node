// api 
import api from '../utils/api';

// hook
import useFlashMessage from './useFlashMessage';


export default function useAuth() {
    const {setFlashMessage} = useFlashMessage();


    async function register(user) {
        let msgText = 'Cadastro realizado com sucesso!';
        let msgType = 'success';
        
        try{
            const data = await api.post('/users/register', user).then((response) => {
                return response.data
            })
        } catch (error) {
            console.log(error);
            msgText = error.response.data.message;
            msgType = 'error';
        }

        setFlashMessage(msgText, msgType);
    }
    return {register};
}