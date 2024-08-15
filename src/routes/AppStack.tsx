import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from '../screens/Home'
import { NavigationContainer } from '@react-navigation/native'

export type AppStackParamList = {
    Home: undefined
}

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{
        headerTitleAlign: 'center',
        headerBackTitleVisible: false
    }}>
        <Stack.Screen name='Home' component={Home} />
    </Stack.Navigator>
  )
}

export default AppStack