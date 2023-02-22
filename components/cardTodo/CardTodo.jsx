import { Image, Text, TouchableOpacity, View } from "react-native";
import {s} from './CardTodo.style';
import iconeTcheck from '../../assets/check.png'

export const CardTodo = ({todo, onPress, onLongPress}) => {

    return (
        <TouchableOpacity onPress={()=>onPress(todo)} onLongPress={()=>{onLongPress(todo)}} style={s.container}>
            <Text style={[s.text, todo.isCompleted && {textDecorationLine:"line-through"}]}>
                {todo.name}
            </Text>
            {todo.isCompleted && <Image style={s.icone} source={iconeTcheck} resizeMode='contain'/>}
        </TouchableOpacity>
    )
}