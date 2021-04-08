import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'

const CreatePost = () => {
    const [description, setDescription] = useState("");
    const onPublish = () => {

    }

    return (
        <View style={styles.container}>
            <TextInput
                value={description}
                onChangeText={setDescription}
                style={styles.textInput}
                numberOfLines={5}
                placeholder="Description"

            />
            <TouchableOpacity  onPress={onPublish}>
                <View style={styles.button}>
                    <Text>Publish</Text>
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
        height: '150',
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

    }

});







