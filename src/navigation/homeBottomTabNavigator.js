import React from 'react';
import {Image } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import plusIconImage from '../assets/images/plus-icon.png';
import Camera from '../screens/camera';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return(
        <Tab.Navigator
            tabBarOptions={{
                tabStyle: {
                    backgroundColor: '#000'
                }, 
                activeTintColor: '#fff',
            }}
        >
            <Tab.Screen 
                    name="Home" 
                    component={Home} 
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color, size }) => (
                          <Entypo name="home" color={color} size={size} />
                        ),
                    }}
            />
            <Tab.Screen name="Search" 
                        component={Home} 
                        options={{
                            tabBarLabel: 'Search',
                            tabBarIcon: ({ color, size }) => (
                              <AntDesign name="search1" color={color} size={size} />
                            ),
                        }}
                        
            />
            <Tab.Screen name="Upload" 
                        component={Camera} 
                        options={{
                            tabBarLabel: () => null,
                            tabBarIcon: ({ color, size }) => (
                              <Image source={plusIconImage} style={{height: 35, resizeMode: 'contain'}} />
                            ),
                        }}
            />
            <Tab.Screen name="Inbox" 
                        component={Home} 
                        options={{
                            tabBarIcon: ({ color, size }) => (
                              <MaterialCommunityIcons name="message-minus-outline" color={color} size={size} />
                            ),
                        }}
            />
            <Tab.Screen name="Profile"
                        component={Home} 
                        options={{
                            tabBarIcon: ({ color, size }) => (
                              <Ionicons name="person-outline" color={color} size={size} />
                            ),
                        }}
            />
        </Tab.Navigator>
    )
}


export default BottomTabs;