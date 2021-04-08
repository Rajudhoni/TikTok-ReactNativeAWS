import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import BottomTabs from './homeBottomTabNavigator';
import CreatePost from '../screens/CreatePost';

const Stack = createStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={BottomTabs} />
        <Stack.Screen 
              options={{
                  headerShown: true,
                  title: 'Post'
              }}
              name="CreatePost" 
              component={CreatePost} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
