import React from 'react'
import { View, Text, SafeAreaView, StatusBar } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';


import 'react-native-gesture-handler';
import RootNavigation from './src/navigation';

const App = () => {
  return (
    <>
    <StatusBar barStyle="light-content" />
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>

      <RootNavigation />

    </SafeAreaView>
    </>
  )
}

export default App
