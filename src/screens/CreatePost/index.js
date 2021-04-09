import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { v4 as uuid } from 'uuid';

import {useRoute, useNavigation} from '@react-navigation/native';

import  { Storage, API, graphqlOperation, Auth } from 'aws-amplify';
import {createPost } from '../../graphql/mutations';


const CreatePost = () => {
    const [description, setDescription] = useState("");
    const [videoKey, setVideoKey] = useState(null);
    const route = useRoute();
    const navigation = useNavigation();

  


    const uploadToStorage = async (imagePath) => {
        try {
            const response = await fetch(imagePath);

            const blob = await response.blob();

            const filename = `${uuid()}.mp4`;

            const s3Response = await Storage.put(filename, blob);
            
            setVideoKey(s3Response.key);
            console.log("s3 storage response.....:", s3Response);
           
        }catch(e){
            console.error(e);
        }
    }

    useEffect(()=> {
        uploadToStorage(route.params.videoUri)
    }, [])

    

    const onPublish = async () => {

            if(!videoKey){
                console.warn('Video is not yet uploaded !');
            }


            //create post in the database (API)
            try{
                const userInfo = await Auth.currentAuthenticatedUser();

                const newPost = {
                    videoUri: videoKey,
                    description: description,
                    userID: userInfo.attributes.sub,
                    songID: "49425073-eff6-48f8-aa6b-0a29756d02c6",
                }


                    const response = await API.graphql(
                            graphqlOperation(
                                createPost,
                                {input: newPost}
                            )
                    )
                    navigation.navigate("Home", {screen: "Home"})

            }catch(e){
                console.error(e);
            }

    }

    return (
        <View style={styles.container}>
            <TextInput
                value={description}
                onChangeText={text => setDescription(text)}
                style={styles.textInput}
                numberOfLines={5}
                placeholder="Description"

            />
       
            <TouchableOpacity onPress={onPublish} >  
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Publish</Text>
                 </View>
            </TouchableOpacity>
        </View>
    );
};

export default CreatePost;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    textInput: {
        margin: 10,
        width: '100%',
        height: 150,
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: '#ff4747',
        textAlign: 'center',
        margin: 10,
        height: 60, 
        justifyContent: 'center'
        
    },
    buttonText: {
        color: "white", 
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'

    }

});





