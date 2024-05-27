import React, { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Animated , {
    Extrapolate,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue
}
from 'react-native-reanimated';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

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
    About,
    Accessories,
    Footer
} from './styles';
import { Button } from '../../components/Button';
import { CarDTO } from '../../dtos/CarDTO';
import { ProfileScreenNavigationProps } from '../../routes/stack.routes';
import { StatusBar, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useTheme } from 'styled-components';

interface Params{
    car: CarDTO;
}


export function CarDetails(){
    const navigation  = useNavigation<ProfileScreenNavigationProps>();
    const route = useRoute();
    const { car } = route.params as Params;

    const theme  = useTheme();

    const scrollY = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler(event =>{
        scrollY.value = event.contentOffset.y;
    });

    const headerStyleAnimation = useAnimatedStyle(() => {
        return {
            height: interpolate(
                scrollY.value,
                [0, 200],
                [200, 70],
                Extrapolate.CLAMP
            )
        }
    });

    const sliderCarsStyleAnimation = useAnimatedStyle(() => {
        return{
            opacity: interpolate(
                scrollY.value,
                [0, 150],
                [1, 0],
                Extrapolate.CLAMP
            )
        }
    })

    function handleScheduling(){
        navigation.navigate('Scheduling', { car });
    }
    function handleGoBack(){
        navigation.goBack();
    }
    return(
        <Container>
            <StatusBar
                barStyle="dark-content"
                translucent
                backgroundColor="transparent"
            />
            <Animated.View
                style={[headerStyleAnimation, 
                    styles.header,
                    {backgroundColor: theme.colors.background_secondary}
                ]}
            >
                <Header>
                    <BackButton onPress={handleGoBack}/>
                </Header>
                <CarImages>
                    <Animated.View style={sliderCarsStyleAnimation}>
                        <ImageSlider
                            imagesUrl={car.photos}
                        />
                    </Animated.View>
                </CarImages>
            </Animated.View>
            <Animated.ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 24, 
                    paddingVertical: getStatusBarHeight() + 160,
                    alignItems: 'center'
                }}
                showsVerticalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            >
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>
                    <Rent>
                        <Period>{car.period}</Period>
                        <Price>R$ ${car.price}</Price>
                    </Rent>
                </Details>
                <Accessories>
                    {car.accessories.map(accessory => (
                        <Accessory 
                            key={accessory.type} 
                            name={accessory.name} 
                            icon={getAccessoryIcon(accessory.type)}
                        />
                    ))
                    }
                </Accessories>
                <About>
                    {car.about}
                    {car.about}
                    {car.about}
                    {car.about}
                    {car.about}
                    {car.about}
                    {car.about}
                    {car.about}
                    {car.about}
                </About>
            </Animated.ScrollView>
            <Footer>
                <Button title='Escolher período do aluguel' onPress={handleScheduling}/>
            </Footer>
        </Container>
    );
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        overflow: 'hidden',
        zIndex:2
    },
})