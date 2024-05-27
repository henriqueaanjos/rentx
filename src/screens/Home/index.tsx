import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, BackHandler } from 'react-native'  
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/core';
import { Ionicons } from '@expo/vector-icons'

import Animated,{
    useAnimatedStyle,
    useSharedValue,
    useAnimatedGestureHandler,
    withSpring
} from 'react-native-reanimated';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import {
    Container,
    Header,
    TotalCars,
    CarList,
} from './styles';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';
import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { ProfileScreenNavigationProps } from '../../routes/stack.routes';
import { useTheme } from 'styled-components';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';

export function Home(){
    const [cars, setCars] = useState<CarDTO[]>([]);
    const [loading, setLoading] = useState(true);

    const theme  = useTheme();
    const navigation = useNavigation<ProfileScreenNavigationProps>();

    const positionY = useSharedValue(0);
    const positionX = useSharedValue(0);

    const MyCarsButtonStyle = useAnimatedStyle(() =>{
        return{
            transform: [
                { translateX: positionX.value },
                { translateY: positionY.value },    
            ]
        }
    });

    const onGestureEvent = useAnimatedGestureHandler({
        onStart(_, ctx: any){
            ctx.positionX = positionX.value;
            ctx.positionY = positionY.value;
        },
        onActive(event, ctx: any){
            positionX.value = ctx.positionX + event.translationX;
            positionY.value = ctx.positionY + event.translationY;
        },
        onEnd(){
            positionX.value = withSpring(0);
            positionY.value = withSpring(0);
        }
    });

    function handleCarDetails(car: CarDTO){
        navigation.navigate('CarDetails', { car });
    }

    function handleMyCars(){
        navigation.navigate('MyCars');
    }

    useEffect(() => {
        async function fetchCars(){
            try{
                const response = await api.get('/cars');
                setCars(response.data);
            }catch (error){
                console.log(error)
            }finally{
                setLoading(false);
            }
        }
        fetchCars();
    }, [])

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
        })
    }, [])

    return(
        <Container>
            <StatusBar 
                barStyle='light-content'
                backgroundColor='transparent'
                translucent
            />
            <Header>
                <Logo 
                    width={RFValue(108)}
                    height={RFValue(12)}
                />
                {!loading && 
                    <TotalCars>
                        Total de {cars.length} carros
                    </TotalCars>
                }
            </Header>
            {loading ? <LoadAnimation /> :
                <CarList 
                    data={cars}
                    keyExtractor={item => String(item.id)}
                    renderItem={({item}) => 
                        <Car 
                            data={item}
                            onPress={() => handleCarDetails(item)}
                        />
                    }
                />
            }
            <PanGestureHandler onGestureEvent={onGestureEvent}>
                <Animated.View
                    style={[MyCarsButtonStyle, styles.myCarsButton, {backgroundColor: theme.colors.main}]}
                >
                    <ButtonAnimated onPress={handleMyCars}>
                        <Ionicons 
                            name="ios-car-sport" 
                            size={32}
                            color={theme.colors.shape}
                        />
                    </ButtonAnimated>
                </Animated.View>
            </PanGestureHandler>
        </Container>
    );
}

const styles = StyleSheet.create({
    myCarsButton:{
        width: 60,
        height: 60,

        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        position: 'absolute',
        bottom: 13,
        right: 22,
    }
})