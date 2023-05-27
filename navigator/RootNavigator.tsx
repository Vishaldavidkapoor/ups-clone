import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import ModalScreen from '../screens/ModalScreen';

export type RootStackParamList = {
    Home: undefined,
    MyModal: { userId: string, name: string },
    Order: { order: any },
}

const RootNavigator = () => {

    const RootStack = createNativeStackNavigator<RootStackParamList>();
    return (
        <RootStack.Navigator>
            <RootStack.Group>
                <RootStack.Screen name="Home" component={TabNavigator} />
            </RootStack.Group>

            <RootStack.Group screenOptions={
                {
                    presentation: "modal"
                }
            }>
                <RootStack.Screen options={{headerShown:false}} name="MyModal" component={ModalScreen} />
            </RootStack.Group>

        </RootStack.Navigator>
    )
}

export default RootNavigator