import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

interface DateValueProps{
    selected: boolean
}

export const Container = styled.View`
    flex: 1;
    background-color:  ${({ theme }) => theme.colors.background_secondary};
`;

export const Header = styled.View`
    width: 100%;
    height: 325px;
    background-color:  ${({ theme }) => theme.colors.header};

    justify-content: center;
    padding: 25px;
    padding-top: ${getStatusBarHeight() + 32}PX;
`;

export const Title = styled.Text`
    font-family:  ${({ theme }) => theme.fonts.secondary_600};
    font-size: ${RFValue(30)}px;
    color:  ${({ theme }) => theme.colors.shape};

    margin-top: 24px;

`;

export const RentalPeriod = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin: 32px 0;
`;

export const DateInfo = styled.View`
    width: 30%;
`;

export const DateTitle = styled.Text`
    font-family:  ${({ theme }) => theme.fonts.secondary_500};
    font-size: ${RFValue(10)}px;
    color:  ${({ theme }) => theme.colors.text}; 
`;

export const DateValueBorder = styled.View<DateValueProps>`
    align-items: center;
    justify-content: center;
    ${({selected, theme}) => selected && css`
        border-bottom-width: 1px;
        border-bottom-color:  ${theme.colors.text};
        padding-bottom: 5px;
    `};
`;


export const DateValue  = styled.Text`
    font-family:  ${({ theme }) => theme.fonts.primary_500};
    font-size: ${RFValue(15)}px;
    color:  ${({ theme }) => theme.colors.shape};
`;

export const Content = styled.ScrollView.attrs({
    contentContainerStyle: {
        paddingBottom: 24 
    },
    showsVerticalScrollIndicator: false
})`

`;

export const Footer = styled.View`
    padding: 24px;
`;
