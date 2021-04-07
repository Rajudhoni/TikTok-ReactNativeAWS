import React from 'react'
import { View, Text, FlatList,Dimensions} from 'react-native';
import Post from '../../components/Post';
import posts from '../../assets/data/posts';




const index = () => {
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
