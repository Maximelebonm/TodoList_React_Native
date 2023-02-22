import { TouchableOpacity,Text } from 'react-native';
import {s} from './ButtonAdd.style';

export const ButtonAdd = ({onPress}) =>{
    return (
    <TouchableOpacity style={s.btn} onPress={onPress}>
        <Text style={s.txt}>Ajouter une tâche</Text>
    </TouchableOpacity>
    )
}