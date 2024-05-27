import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import {
    Container,
    IconContainer,
    InputText,
    
} from './styles';
import { BorderlessButton } from 'react-native-gesture-handler';


interface Props extends TextInputProps{
    iconName: React.ComponentProps<typeof Feather>['name'],
    value?: string
}

export function PasswordInput({iconName, value, ...rest}: Props){
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const theme = useTheme();

    function handleInpuFocused(){
        setIsFocused(true);
    }

    function handleInputBlur(){
        setIsFocused(false);
        setIsFilled(!!value);
    }   

    function handleChangePasswordVisibility(){
        setIsPasswordVisible(prevState => !prevState);
    }

    return(
        <Container >
            <IconContainer isFocused={isFocused}>
                <Feather
                    name={iconName}
                    size={24}
                    color={(isFocused || isFilled)  ? theme.colors.main : theme.colors.text_detail}
                />
            </IconContainer>
            <InputText 
                {...rest} 
                onFocus={handleInpuFocused}
                onBlur={handleInputBlur}
                secureTextEntry={isPasswordVisible}
                isFocused={isFocused}
            />
            <BorderlessButton onPress={handleChangePasswordVisibility}>
                <IconContainer isFocused={isFocused}>
                    <Feather
                        name={isPasswordVisible ? 'eye' : 'eye-off'}
                        size={24}
                        color={theme.colors.text_detail}
                    />
                </IconContainer>
            </BorderlessButton>
        </Container>
    );
}