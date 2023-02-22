import { Text, TouchableOpacity, View } from "react-native"
import {s} from './TabBottomMenu.style';
export const TabBottomMenu = ({todoList, selectedTabName, onPress}) => {
    function getTexteSelected(tabName){
        return {fontWeight:"bold", color : tabName===selectedTabName ? '#2F76E5' : 'black'}
    }

    const taskCount = todoList.reduce((accumulator, currentItem)=>{
        currentItem.isCompleted ? accumulator.done++ : accumulator.inProgress++
        return accumulator
    },{All:todoList.length, inProgress:0,done:0})
    return (
        <View style={s.container}>
            <TouchableOpacity onPress={()=>{onPress('all')}}>
                <Text style={getTexteSelected('all')}>All ({taskCount.All})</Text>
                </TouchableOpacity>
            <TouchableOpacity onPress={()=>{onPress('inProgress')}}>
                <Text style={getTexteSelected('inProgress')}>In Progress({taskCount.inProgress})</Text>
                </TouchableOpacity>
            <TouchableOpacity onPress={()=>{onPress('done')}}>
                <Text style={getTexteSelected('done')}>Done({taskCount.done})</Text>
                </TouchableOpacity>
        </View>
    )
}