import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TailwindProvider } from 'tailwind-rn';
import utilities from './tailwind.json';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigator/RootNavigator';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';



const client = new ApolloClient({
  uri: 'https://dashboard.stepzen.com/explorer?endpoint=api%2Fflailing-seastar',
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    //@ts-ignore
    <TailwindProvider utilities={utilities}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </TailwindProvider>
  );
}

