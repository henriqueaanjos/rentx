import React, { useState } from 'react';
import { 
    StatusBar,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native'
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import * as Yup from 'yup'

import {
    Container,
    Header,
    Title,
    SubTitle,
    Form,
    Footer
} from './styles';
import { ProfileScreenNavigationProps } from '../../routes/stack.routes';



export function SignIn(){
    const theme = useTheme();
    const navigation = useNavigation<ProfileScreenNavigationProps>();
    const { signIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSignIn(){
        try{
            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail Obrigatório!').email('Digite um e-mail válido!'),
                password: Yup.string().required('A Senha é obrigatória')
            })

            await schema.validate({email, password})
            signIn({email, password});
        }catch (err){
            if(err instanceof Yup.ValidationError){
                 Alert.alert('Opa', err.message)
            }else{
                Alert.alert(
                    'Erro na Autenticação',
                    'Ocorreu um erro ao fazer Login, verifique as credenciais'
                )
            }
        }
    }

    function handleSignUp(){
        navigation.navigate('SignUpFirstStep');
    }

    return(
        <KeyboardAvoidingView behavior='position' enabled >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <StatusBar 
                        barStyle='dark-content'
                        backgroundColor='tranparent'
                        translucent
                    />
                    <Header>
                        <Title>Estamos{'\n'}quase lá.</Title>
                        <SubTitle>
                            Faça seu login para começar{'\n'}
                            uma experiência incrível.
                        </SubTitle>
                    </Header>

                    <Form>
                        <Input 
                            iconName='mail'
                            placeholder='E-mail'
                            keyboardType='email-address'
                            autoCorrect={false}
                            autoCapitalize='none'
                            value={email}
                            onChangeText={setEmail}
                        />
                        <PasswordInput
                            iconName='lock'
                            placeholder='Senha'
                            value={password}
                            onChangeText={setPassword}
                        />
                    </Form>

                    <Footer>
                        <Button 
                            title='Login'
                            onPress={handleSignIn}
                            enabled={true}
                            loading={false}
                        />
                        <Button 
                            title='Criar conta gratuita'
                            onPress={handleSignUp}
                            enabled={true}
                            loading={false}
                            color={theme.colors.background_secondary}
                            light
                        />
                    </Footer>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}