import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import useCustomerOrders from '../hooks/useCustomerOrders';
import { useTailwind } from 'tailwind-rn/dist';
import { useNavigation } from '@react-navigation/native';
import { CustomersScreenNavigationProp } from '../screens/CustomersScreen';
import { Card } from '@rneui/themed';


type Props = {
    userId: string;
    name: string;
    email: string;
}

const CustomerCard = ({ email, name, userId }: Props) => {


    const { loading, error, orders } = useCustomerOrders(userId);
    const tw = useTailwind();
    const navigation = useNavigation<CustomersScreenNavigationProp>();

    return (
        <TouchableOpacity style={{flex:1}}>
            <Card containerStyle={tw('p-5 rounded-lg')}>
                <View>
                    <Text>{name}</Text>    
                    <Text>ID: {userId}</Text>
                </View>
            </Card>
        </TouchableOpacity>
    )
}

export default CustomerCard