import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';

import {
    Container,
    Header,
    CarImages,
    Content, 
    Details,
    Description, 
    Brand,
    Name,
    Rent,
    Period,
    Price,
    Accessories,
    RentalPeriod,
    CalendarIcon,
    DateInfo, 
    DateTitle,
    DateValue,
    RentalPrice,
    RentalPriceLabel,
    RentalPriceDetails,
    RentalPriceQuota,
    RentalPriceTotal,
    Footer
} from './styles';

import { Button } from '../../components/Button';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { MarkedDatesProps } from '../../components/Calendar';
import { ProfileScreenNavigationProps } from '../../routes/stack.routes';
import { api } from '../../services/api';
import { format } from 'date-fns';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { Alert } from 'react-native';

interface Params{
    car: CarDTO,
    dates: string[]
}

interface RentalPeriod {
    start: string,
    end: string
}

export function SchedulingDetails(){
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
    const [loading, setLoading] = useState(false);

    const theme = useTheme();
    const navigation  = useNavigation<ProfileScreenNavigationProps>();
    const route = useRoute();
    const { car, dates } = route.params as Params;

    async function handleSchedulingComplete(){
        setLoading(true);
        const schedulingByCar = await api.get(`/schedules_bycars/${car.id}`);
        const unavailable_dates = [
            ...schedulingByCar.data.unavailable_dates,
            ...dates
        ]
        api.post('schedules_byuser', {
            user_id: 1,
            car,
            startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
            endDate:format(getPlatformDate(new Date(dates[dates.length -1])), 'dd/MM/yyyy')
        })

        api.put(`schedules_bycars/${car.id}`, {id: car.id, unavailable_dates})
        .then(response => navigation.navigate('Confirmation', {
            data: {
                title: 'Carro alugado!',
                message: `Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel!`,
                nextScreenRoute: 'Home'
            }
        }))
        .catch(() => {
            setLoading(false)
            Alert.alert('Não foi possivel confirmar o agendamento!')
        })

        
    }
    function handleGoBack(){
        navigation.goBack();
    }

    useEffect(() => {
        setRentalPeriod({
            start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
            end:format(getPlatformDate(new Date(dates[dates.length -1])), 'dd/MM/yyyy')
        });
    }, [])
    return(
        <Container>
            <Header>
                <BackButton  onPress={handleGoBack}/>
            </Header>
            <CarImages>
                <ImageSlider
                    imagesUrl={car.photos}
                />
            </CarImages>
            <Content>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>
                    <Rent>
                        <Period>{car.rent.period}</Period>
                        <Price>R$ {car.rent.price}</Price>
                    </Rent>
                </Details>
                <Accessories>
                    {
                        car.accessories.map(accessory => 
                            <Accessory 
                                key={accessory.type}
                                name={accessory.name} 
                                icon={getAccessoryIcon(accessory.type)}
                            />
                        )
                    }
                </Accessories>
                <RentalPeriod>
                    <CalendarIcon>
                        <Feather
                            name='calendar'
                            size={RFValue(24)}
                            color={theme.colors.shape}    
                        />
                    </CalendarIcon>
                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue>{rentalPeriod.start}</DateValue>
                    </DateInfo>
                    <Feather
                        name='chevron-right'
                        size={RFValue(10)}
                        color={theme.colors.text}    
                    />
                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue>{rentalPeriod.end}</DateValue>
                    </DateInfo>
                </RentalPeriod>
                <RentalPrice>
                    <RentalPriceLabel>TOTAL</RentalPriceLabel>
                    <RentalPriceDetails>
                        <RentalPriceQuota>R$ {car.rent.price} x{dates.length} diárias</RentalPriceQuota>
                        <RentalPriceTotal>R$ {car.rent.price * dates.length}</RentalPriceTotal>
                    </RentalPriceDetails>
                </RentalPrice>
            </Content>
            <Footer>
                <Button 
                    title='Alugar Agora' 
                    color={theme.colors.success} 
                    onPress={handleSchedulingComplete}
                    enabled={!loading}
                    loading={loading}
                />
            </Footer>
        </Container>
    );
}