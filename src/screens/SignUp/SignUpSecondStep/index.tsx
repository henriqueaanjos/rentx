import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { 
    Alert,
    Keyboard, 
    KeyboardAvoidingView, 
    TouchableWithoutFeedback 
} from 'react-native';
import { useTheme } from 'styled-components';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { PasswordInput } from '../../../components/PasswordInput';
import { ProfileScreenNavigationProps } from '../../../routes/stack.routes';
import { api } from '../../../services/api';

import {
    Container,
    Header,
    Steps,
    Title,
    Subtitle,
    Form,
    FormTitle
} from './styles';

interface Params{
    user: {
        name: string,
        email: string,
        driverLicense: string
    }
}

export function SignUpSecondStep(){
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const navigation = useNavigation<ProfileScreenNavigationProps>();
    const route = useRoute();

    const { user } = route.params as Params
    const theme = useTheme();

    function handleGoBack(){
        navigation.goBack();
    }

    async function handleRegister(){
        if(!password || !passwordConfirm){
            return Alert.alert('Informe a senha e a confirmação.')
        }
        if(password != passwordConfirm){
            return Alert.alert('As senhas não são iguais.')
        }

        await api.post('/users', {
            name: user.name,
            email: user.email,
            driver_license: user.driverLicense,

            password,
        }).then(() => {
            navigation.navigate('Confirmation', {
                data:{
                    title: 'Conta criada!',
                    message: `Agora é só fazer login\ne aproveitar`,
                    nextScreenRoute: 'SignIn'
                }
            });
        }).catch((error) => {
            console.log(error);
            Alert.alert("Opa", "Não foi possível cadastrar");
        });
        
    }

    return(
        <KeyboardAvoidingView behavior='position' enabled >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <BackButton  onPress={handleGoBack}/>
                        <Steps>
                            <Bullet />
                            <Bullet active/>
                        </Steps>
                    </Header>
                    <Title>Crie sua{'\n'}conta</Title>
                    <Subtitle>Faça seu cadasto de{'\n'}forma rápida e fácil.</Subtitle>
                    <Form>
                        <FormTitle>2. Senha</FormTitle>
                        <PasswordInput
                            iconName='lock'
                            placeholder='Senha'
                            onChangeText={setPassword}
                            value={password}
                        />
                        <PasswordInput
                            iconName='lock'
                            placeholder='Repetir Senha'
                            onChangeText={setPasswordConfirm}
                            value={passwordConfirm}
                        />
                    </Form>
                    <Button 
                        title='Cadastrar'
                        color={theme.colors.success}
                        onPress={handleRegister}
                    />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}