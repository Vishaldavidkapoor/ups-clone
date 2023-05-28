import { View, Text, ActivityIndicator } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';
import { useTailwind } from 'tailwind-rn/dist';
import useOrders from '../hooks/useOrders';
import { ScrollView } from 'react-native';
import { Button, Image } from '@rneui/themed';
import OrderCard from '../components/OrderCard';


export type OrderScreenNavigationProp = CompositeNavigationProp<BottomTabNavigationProp<TabStackParamList, "Orders">, NativeStackNavigationProp<RootStackParamList>>;


const OrdersScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<OrderScreenNavigationProp>();
  const { loading, error, orders } = useOrders();
  const [ascending, setAscending] = useState<boolean>(false);


  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      tabBarLabel: ({ focused, color }) => (
        <Text style={{ color: focused ? "#EB6A7C" : color, fontSize: 10 }}>Orders</Text>
      ),
    });
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "#EB6A7C" }}>
      <Image source={{ uri: 'https://links.papareact.com/m51' }}
        containerStyle={tw("w-full h-64")}
        PlaceholderContent={<ActivityIndicator />}
      />
      <View>
        <Button
          color={'pink'}
          titleStyle={{ color: 'gray', fontWeight: '400' }}
          style={tw("py-2 px-5")}
          onPress={() => setAscending(!ascending)}
        >
          {ascending ? "Showing Older First" : "Showing Newer First"}
        </Button>
        {
            orders?.sort((a, b) => {
              if (ascending) {
                return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
              } else {
                return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
              }
            }).map((order) =>  {
              return (<OrderCard key={order.trackingId} item={order} />)
            })
          }
          
      </View>
    </ScrollView>
  )
}

export default OrdersScreen