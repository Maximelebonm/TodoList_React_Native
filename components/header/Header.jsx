import { Image, Text } from 'react-native';
import {s} from './Header.style';
import HeaderLogo from '../../assets/logo.png';

export const Header =()=> {
    return (
    <>
    <Image style={s.img} source={HeaderLogo} resizeMode="contain"/>
    <Text style={s.subtitle}>Tu as probablement un truc à faire</Text>
    </>
    )
}