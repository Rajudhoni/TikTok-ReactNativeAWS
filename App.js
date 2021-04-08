import React, {useEffect} from 'react'
import { View, Text, SafeAreaView, StatusBar } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';


import 'react-native-gesture-handler';
import RootNavigation from './src/navigation';

import { withAuthenticator } from 'aws-amplify-react-native'
import {Auth, API, graphqlOperation} from 'aws-amplify';

import {createUser} from './src/graphql/mutations';
import { getUser } from './src/graphql/queries';


const randomImages = [
  'https://i.ytimg.com/vi/dOniLUwxu40/maxresdefault.jpg',
  'https://www.allwikidetails.com/wp-content/uploads/Mahendra-Singh-Dhoni-Profile.jpg',
  'https://www.celebrityborn.com/admin/assets/images/people/gOn69hnF23A5caobD3hI_2016_08_30.JPG',
  'https://upload.wikimedia.org/wikipedia/commons/6/6e/A._P._J._Abdul_Kalam.jpg'
]

const getRandomImage = () => {
  return randomImages[Math.floor(Math.random() * randomImages.length)]
}

const App = () => {


    useEffect(()=> {
      const fetchUser = async ()=> {
        //get currently authenticated user
        const userInfo = await Auth.currentAuthenticatedUser({bypassCache: true})

        
        if(!userInfo){
          return;
        }
        //check if the user exist in database
        const getUserResponse = await API.graphql(
                          graphqlOperation(
                            getUser,
                            {id:userInfo.attributes.sub}
                            
                          )
                          
                      );

        if(getUserResponse.data.getUser){
          console.log("User already exists in database");
          return ;
        }

        //if it doesn't (it's newly registered user)
        //then, create a new user in database

        const newUser = {
          id: userInfo.attributes.sub,
          userName: userInfo.username,
          email: userInfo.attributes.email,
          imageUri: getRandomImage(),
        }
        console.log("New User info...", newUser);
        
        await API.graphql(graphqlOperation(createUser, {input: newUser}))

      }

      fetchUser();
   
      
    }, [])

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
