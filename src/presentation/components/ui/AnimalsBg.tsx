import { useContext } from "react";
import { Image,ImageStyle,StyleProp, Text, View,ViewStyle } from "react-native"
import { ThemeContext } from "../../context/ThemeContext";

interface Props{
    style?:StyleProp<ImageStyle>;
}
export const AnimalsBg = ({style}:Props) => {

    const {isDark} = useContext(ThemeContext);

    const animalsImg = isDark
        ? require('../../../assets/animals_light.png')
        : require('../../../assets/animals_dark.png');
    return (
        <Image 
            source={animalsImg} 
            style={[
                {
                    width: 300,
                    height: 300,                    
                    opacity:0.3,
                },
                style,
            ]}
        />
    )
}