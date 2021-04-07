import React from 'react'
import { View, Text, SafeAreaView, StatusBar } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';


import 'react-native-gesture-handler';
import RootNavigation from './src/navigation';

import { withAuthenticator } from 'aws-amplify-react-native'

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

export default withAuthenticator(App);
