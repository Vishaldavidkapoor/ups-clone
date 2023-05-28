import { View, Text } from 'react-native'
import React from 'react'
import { Card, Divider, Icon } from '@rneui/themed'
import { useTailwind } from 'tailwind-rn/dist'
import MapView, { Marker } from 'react-native-maps'

type Props = {
    order: Order
}

const DeliveryCard = ({ order }: Props) => {

    const tw = useTailwind();
    return (
        <Card containerStyle={[tw("rounded-lg my-2"), {
            padding: 0,
            paddingTop: 16,
            shadowColor: "black",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            backgroundColor: "#59C1CC"
        }]}>
            <View>
                <Icon
                    name="box"
                    type="entypo"
                    size={50}
                    color={"white"}
                />

                <View>
                    <Text style={tw("text-xs text-center uppercase text-white font-bold")}>
                        {order.carrier} - {order.trackingId}
                    </Text>
                    <Text style={tw("text-lg text-center text-white font-bold")}>Expected Delivery: {new Date(order.createdAt).toLocaleDateString()}</Text>
                    <Divider color='white' />
                    <View style={{ padding: 15 }}>
                        <Text style={tw("text-sm text-center text-white")}>
                            Address: {order.Address}, {order.City}
                        </Text>
                        <Text style={tw("text-sm text-center  text-white")}>Shipping Cost: {order.shippingCost} $</Text>
                    </View>
                </View>
            </View>
            <Divider color='white' />
            <View style={tw("p-5")}>
                {
                    order.trackingItems.items.map((item) => (
                        <View style={tw("flex-row justify-between items-center ")}>
                            <Text style={tw("text-sm italic text-white")}>{item.name}</Text>
                            <Text style={tw("text-xl  text-white")}>X {item.quantity}</Text>
                        </View>
                    ))
                }
            </View>

            <MapView initialRegion={{
                latitude: order.Lat,
                longitude: order.Lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
                style={[tw("w-full"), { height: 200 }]}
            >
                {
                    order.Lat && order.Lng && (
                        <Marker
                            coordinate={{
                                latitude: order.Lat,
                                longitude: order.Lng
                            }}
                            title='Delivery Location'
                            description={order.Address}
                            identifier='destination'
                        />
                    )
                }
            </MapView>

        </Card>

    )
}

export default DeliveryCard