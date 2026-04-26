import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BASE_URL } from '@/constants/urls';
import { WebViewScreen } from '@/screens/WebViewScreen';

export type RootStackParamList = {
  WebView: { uri: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="WebView"
          component={WebViewScreen}
          options={{ headerShown: false }}
          initialParams={{ uri: BASE_URL }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
