import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { format } from 'date-fns';

import ArrowSvg from '../../assets/arrow.svg'

import {
    Container,
    Header,
    Title,
    RentalPeriod,
    DateInfo,
    DateTitle,
    DateValueBorder,
    DateValue, 
    Content,
    Footer
} from './styles';


import { Button } from '../../components/Button';
import { Calendar, DayProps, generateInterval, MarkedDatesProps } from '../../components/Calendar';
import { BackButton } from '../../components/BackButton';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { ProfileScreenNavigationProps } from '../../routes/stack.routes';
import { CarDTO } from '../../dtos/CarDTO';

interface RentalPeriod{
    startFormatted: string,
    endFormatted: string,
    numberOfDays: number
}

interface Params{
    car: CarDTO;
}


export function Scheduling(){
    const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
    const [markedDate, setMarkedDates] = useState<MarkedDatesProps>({} as MarkedDatesProps);
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

    const theme = useTheme();
    const route = useRoute();
    const { car } = route.params as Params;
    const navigation  = useNavigation<ProfileScreenNavigationProps>();

    
    function handleSchedulingDetails(){
        navigation.navigate('SchedulingDetails', {
            car,
            dates: Object.keys(markedDate)
        });
    }
    function handleGoBack(){
        navigation.goBack();
    }

    function handleChangeDate(date: DayProps){
        let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
        let end = date;

        if(start.timestamp > end.timestamp){
            start = end;
            end = start;
        }

        setLastSelectedDate(end);
        const interval = generateInterval(start, end);
        setMarkedDates(interval);

        const firstDate = Object.keys(interval)[0];
        const lastDate = Object.keys(interval)[Object.keys(interval).length -1];

        setRentalPeriod({
            startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
            endFormatted: format(getPlatformDate(new Date(lastDate)), 'dd/MM/yyyy'),
            numberOfDays: Object.keys(interval).length
        })
    }
    return(
        <Container>
            <StatusBar
                barStyle='light-content'
                translucent
                backgroundColor='tranparent'
            />
            <Header>
                <BackButton  color={theme.colors.shape} onPress={handleGoBack}/>
                <Title>
                    Escolha uma {'\n'}
                    data de início e{'\n'}
                    fim do aluguel
                </Title>
                <RentalPeriod>
                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValueBorder selected={!rentalPeriod.startFormatted}>
                            <DateValue>{rentalPeriod.startFormatted}</DateValue>
                        </DateValueBorder>
                    </DateInfo>
                    <ArrowSvg/>
                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValueBorder selected={!rentalPeriod.endFormatted}>
                            <DateValue>{rentalPeriod.endFormatted}</DateValue>
                        </DateValueBorder>
                    </DateInfo>
                </RentalPeriod>                
            </Header>
            <Content>
                <Calendar
                    markedDates={markedDate}
                    onDayPress={handleChangeDate}
                />
            </Content>
            <Footer>
                <Button title='Confirmar' onPress={handleSchedulingDetails} enabled={!!rentalPeriod.startFormatted}/>
            </Footer>
        </Container>
    );
}