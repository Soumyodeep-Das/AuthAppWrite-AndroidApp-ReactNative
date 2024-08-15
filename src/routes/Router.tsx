import { View, Text } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'

import { NavigationContainer } from '@react-navigation/native'

import AppwriteContext from '../appwrite/AppwriteContext'

import Login from '../screens/Login'

//Routes
import AppStack from './AppStack'
import AuthStack from './AuthStack'
import Loading from '../components/Loading'

const Router = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const {appwrite, isLoggedIn, setIsLoggedIn} = useContext(AppwriteContext)

    useEffect(() => {
      appwrite
      .getCurrentUser()
      .then(response => {
        setIsLoading(false)
        if (response){
            setIsLoggedIn(true)
        }
      })
      .catch(_ => {
        setIsLoading(false)
        setIsLoggedIn(false)
      })
    }, [appwrite, setIsLoggedIn])

    if (isLoading){
        return <Loading />
    }
    
  return (
    <NavigationContainer>
        {isLoggedIn ? <AppStack/> : <AuthStack/>}
    </NavigationContainer>
  )
}

export default Router