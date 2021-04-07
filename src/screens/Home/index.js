/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useEffect} from 'react'
import { View, Text, FlatList,Dimensions} from 'react-native';
import Post from '../../components/Post';



import {listPosts} from '../../graphql/queries'

import {API, graphqlOperation} from 'aws-amplify';





const index = () => {
    const [posts, setPosts] = useState([]);


    useEffect(()=> {
        const fetchPost = async () => {
            try{
                const response = await API.graphql(graphqlOperation(listPosts));
                setPosts(response.data.listPosts.items)
            }catch(e){
                console.log(e);
            }
        }

        fetchPost();
    }, []);

    return (
        <View>
            
            <FlatList 
                data={posts}
                renderItem={(item)=> <Post post={item} />}
                showsVerticalScrollIndicator={false}
                snapToInterval={ Dimensions.get('window').height - 130}
                snapToAlignment={'start'}
                decelerationRate={'fast'}

            />
        </View>
    )
}

export default index
