import React from 'react';
import {createNativeStackNavigator, NativeStackScreenProps} from '@react-navigation/native-stack'

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { Confirmation } from '../screens/Confirmation';
import { MyCars } from '../screens/MyCars';
import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep';
import { SignUpSecondStep } from '../screens/SignUp/SignUpSecondStep';

import { CarDTO } from '../dtos/CarDTO';
import { MarkedDatesProps } from '../components/Calendar';

interface UserData{
    name: string,
    email: string,
    driverLicense: string
}
interface ConfirmationData{
    title: string,
    message: string,
    nextScreenRoute: string
}

type RootStackParamList = {
    SignIn: undefined,
    SignUpFirstStep: undefined,
    SignUpSecondStep: {
        user: UserData
    },
    Splash: undefined,
    Home: undefined,
    CarDetails: {
        car: CarDTO
    },
    Scheduling: {
        car: CarDTO
    },
    SchedulingDetails: {
        car: CarDTO,
        dates: string[]
    },
    Confirmation: {
        data: ConfirmationData
    },
    MyCars: undefined
}
type Props = NativeStackScreenProps<RootStackParamList>;
export type ProfileScreenNavigationProps = Props['navigation'];
const {Navigator, Screen} = createNativeStackNavigator<RootStackParamList>();

export function StackRoutes(){
    return (
       <Navigator screenOptions={{
            headerShown: false
           }}
            initialRouteName='Home'
           >
            <Screen
                name='SignIn'
                component={SignIn}
            />
            <Screen
                name='SignUpFirstStep'
                component={SignUpFirstStep}
            />
            <Screen
                name='SignUpSecondStep'
                component={SignUpSecondStep}
            />
           <Screen
                name='Home'
                component={Home}
                options={{
                    gestureEnabled: false
                }}
            />
            <Screen
                name='CarDetails'
                component={CarDetails}
            />
            <Screen
                name='Scheduling'
                component={Scheduling}
            />
            <Screen
                name='SchedulingDetails'
                component={SchedulingDetails}
            />
            <Screen
                name='Confirmation'
                component={Confirmation}
            />
            <Screen
                name='MyCars'
                component={MyCars}
            />
       </Navigator> 
    )
}