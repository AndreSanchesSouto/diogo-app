import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../(tabs)/home';
import LoginScreen from '../(tabs)/login';
import ProductScreen from '../(tabs)/product';

export type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    ProductDetails: { productId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
    return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{
                            title: 'Início',
                        }}
                    />
                    <Stack.Screen
                        name="Product"
                        component={ProductScreen}
                        options={{
                            title: 'Produto',
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
    );
}

export default function AppContainer() {
    return <AppNavigator />;
}