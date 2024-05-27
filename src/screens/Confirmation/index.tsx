import React from 'react';
import { useWindowDimensions, StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';

import BrandSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg'

import {
    Container,
    Content, 
    Title, 
    Message,
    Footer
} from './styles';

import { ConfirmButton } from '../../components/ConfirmButton';
import { ProfileScreenNavigationProps } from '../../routes/stack.routes';

interface Params{
    data:{
        title: string,
        message: string,
        nextScreenRoute: string
    }
}


export function Confirmation(){
    const { width } = useWindowDimensions();
    const navigation  = useNavigation<ProfileScreenNavigationProps>();
    const route = useRoute();
    const { data } = route.params as Params;

    function handleConfirm(){
        navigation.navigate(data.nextScreenRoute as any);
    }
    return(
        <Container>
            <StatusBar
                barStyle='light-content'
                translucent
                backgroundColor='transparent'
            />
            <BrandSvg width={width}/>
            <Content>
                
                <DoneSvg width={80} height={80}/>
                <Title>{data.title}</Title>
                <Message>
                    {data.message}
                </Message>
            </Content>
            <Footer>
                <ConfirmButton title='OK' onPress={handleConfirm}/>
            </Footer>
        </Container>
    );
}