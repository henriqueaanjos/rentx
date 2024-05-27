import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { 
    Alert,
    Keyboard, 
    KeyboardAvoidingView, 
    TouchableWithoutFeedback 
} from 'react-native';
import * as Yup from 'yup';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { ProfileScreenNavigationProps } from '../../../routes/stack.routes';

import {
    Container,
    Header,
    Steps,
    Title,
    Subtitle,
    Form,
    FormTitle
} from './styles';

export function SignUpFirstStep(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState(''); 
    const [driverLicense, setDriverLicense] = useState('');

    const navigation = useNavigation<ProfileScreenNavigationProps>();

    function handleGoBack(){
        navigation.goBack();
    }

    async function handleGoNextStep(){
        try {
            const schema = Yup.object().shape({
                driverLicense: Yup.string().required('CNH é Obrigatória!'),
                email: Yup.string().email('E-mail inválido!').required('E-mail é Obrigatório!'),
                name: Yup.string().required('Nome é Obrigatório!'),
            });

            const data = { name, email, driverLicense };

            await schema.validate(data);

            navigation.navigate('SignUpSecondStep', {user: data});
        } catch (error) {
            if(error instanceof Yup.ValidationError){
                Alert.alert('Opa', error.message)
            }
        }
    }

    return(
        <KeyboardAvoidingView behavior='position' enabled >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <BackButton  onPress={handleGoBack}/>
                        <Steps>
                            <Bullet active/>
                            <Bullet />
                        </Steps>
                    </Header>
                    <Title>Crie sua{'\n'}conta</Title>
                    <Subtitle>Faça seu cadasto de{'\n'}forma rápida e fácil.</Subtitle>
                    <Form>
                        <FormTitle>1. Dados</FormTitle>
                        <Input
                            iconName='user'
                            placeholder='Nome'
                            value={name}
                            onChangeText={setName}
                        />
                        <Input
                            iconName='mail'
                            placeholder='E-mail'
                            keyboardType='email-address'
                            autoCorrect={false}
                            autoCapitalize='none'
                            value={email}
                            onChangeText={setEmail}
                        />
                        <Input
                            iconName='credit-card'
                            placeholder='CNH'
                            keyboardType='numeric'
                            value={driverLicense}
                            onChangeText={setDriverLicense}
                        />
                    </Form>
                    <Button 
                        title='Próximo'
                        onPress={handleGoNextStep}
                    />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}