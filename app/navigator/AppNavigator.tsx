import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../(tabs)/home';
import LoginScreen from '../(tabs)/login';

const Stack = createNativeStackNavigator();

export function AppNavigator() {
    return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                    />
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{
                            title: 'Minha App',
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
    );
}

export default function AppContainer() {
    return <AppNavigator />;
}