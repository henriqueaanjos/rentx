import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { AntDesign } from '@expo/vector-icons'

import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import { CarDTO } from '../../dtos/CarDTO';

import { api } from '../../services/api';

import {
    Container,
    Header,
    Title,
    Subtitle,
    Content,
    Appointments,
    AppointmentsTitle,
    AppointmentsQuantity,
    CarWrapper,
    CarFooter,
    CarFooterTitle,
    CarFooterPeriod,
    CarFooterDate,
} from './styles';


interface CarProps{
    id: string,
    user_id: string,
    car: CarDTO,
    startDate: string,
    endDate: string,
}

export function MyCars(){
    const [cars, setCars] = useState<CarProps[]>([]);
    const [loading, setLoading] = useState(true);

    const theme  = useTheme();
    const navigation = useNavigation();

    function handleGoBack(){
        navigation.goBack();
    }

    useEffect(() => {
        async function fetchCars(){
            try{
                const response = await api.get('/schedules_byuser?user_id=1');
                setCars(response.data);
            }catch(error){
                console.log(error);
            }finally{
                setLoading(false);
            }
        }
        fetchCars();
    }, [])
    return(
        <Container>
            <Header>
                <StatusBar
                    barStyle='light-content'
                    translucent
                    backgroundColor='tranparent'
                />
                <BackButton  color={theme.colors.shape} onPress={handleGoBack}/>
                <Title>
                    Seus agendamentos,{'\n'}
                    estão aqui.
                </Title>
                <Subtitle>
                    Conforto, Segurança e Praticidade.
                </Subtitle>
            </Header>
            <Content>
                <Appointments>
                    <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
                    <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
                </Appointments>
                {loading ? <LoadAnimation /> :
                    <FlatList
                        data={cars}
                        keyExtractor={item => String(item.id)}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => (
                            <CarWrapper>
                                <Car data={item.car}/>
                                <CarFooter>
                                    <CarFooterTitle>Período</CarFooterTitle>
                                    <CarFooterPeriod>
                                        <CarFooterDate>{item.startDate}</CarFooterDate>
                                        <AntDesign
                                            name="arrowright"
                                            size={20}
                                            color={theme.colors.text_detail}
                                            style={{marginHorizontal: 10}}
                                        />
                                        <CarFooterDate>{item.endDate}</CarFooterDate>
                                    </CarFooterPeriod>
                                </CarFooter>
                            </CarWrapper>
                        )}
                    />
                }
            </Content>
        </Container>
    );
}