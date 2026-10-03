import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MealsProvider } from './src/hooks/useMeals';
import { TabNavigator } from './src/navigation/TabNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <MealsProvider>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </MealsProvider>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
