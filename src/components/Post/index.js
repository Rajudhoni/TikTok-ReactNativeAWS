/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react'
import { View, Text, Image, StyleSheet, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import Video from 'react-native-video';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Fontisto from 'react-native-vector-icons/Fontisto';

const index = (props) => {
   
    const [post, setPost] = useState(props.post.item);
    const [isLiked, setIsLiked] = useState(false);

    const [paused, setPaused] = useState(false);


    console.log("aws props...", post);


    const onPlayPausePress = ()=> {
        console.warn('Post');
        setPaused(!paused);
    }

    const onLikePress = () => {
        const likesToAdd = isLiked ? -1 : 1;
        setPost({
            ...post,
            likes: post.likes + likesToAdd,
        });
        setIsLiked(!isLiked)
    }
    return (
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={onPlayPausePress}>  
          {/* style={styles.videoPlayButton} */}
            <View>

          
            <Video 
                source={{uri: post.videoUri}}
                style={styles.video}
                resizeMode="cover"
                onError={(e) => console.log(e)}
                repeat={false}
                paused={paused}
            />

            <View style={styles.uiContainer}>
                <View style={styles.rightContainer}>
                    <View style={styles.profilePictureConainer}>
                        <Image style={styles.profilePicture} source={{uri: post.user.imageUri}} />
                    </View>
                            <TouchableOpacity style={styles.iconContainer} onPress={onLikePress}>
                                <AntDesign name={'heart'} size={40} color={isLiked ? 'red' : 'white'} />
                                <Text style={styles.statsLabel}>{post.likes}</Text>
                            </TouchableOpacity>
                            <View style={styles.iconContainer}>
                                <FontAwesome name={'commenting'} size={40} color="white" />
                                <Text style={styles.statsLabel}>{post.comments}</Text>
                            </View>
                            <View style={styles.iconContainer}>
                                <Fontisto name={'share-a'} size={35} color="white" />
                                <Text style={styles.statsLabel}>{post.shares}</Text>
                            </View>

                    
                </View>
                <View style={styles.bottomContainer}>

                    <View>
                        <Text style={styles.handle}>@{post.user.userName}</Text>
                        <Text style={styles.description}>{post.description}</Text>
                        <View style={styles.songRow}>
                            <Entypo name={'beamed-note'} size={24} color='white' />
                            <Text style={styles.songName} >
                                {post.song.name}
                            </Text>
                        </View>
                    </View>
                    <Image style={styles.songImage} source={{uri: post.song.imageUri}} />

                </View>
            </View>
            </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default index

const styles = StyleSheet.create({
    container: {
        width: '100%', 
        height: Dimensions.get('window').height - 130
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }, 
    uiContainer: {
        height: '100%',
        justifyContent: 'flex-end',
        
    },

    bottomContainer: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'

    }, 
    handle: {
        color: '#fff', 
        fontSize: 16, 
        fontWeight: '700',
        marginBottom: 10,
    }, 
    description: {
        color: '#fff',
        fontSize: 16, 
        fontWeight: '300',
        marginBottom: 5
    }, 
    songRow: {
        flexDirection: 'row',
        alignItems: 'center'

    },
    songName: {
        color: '#fff',
        fontSize: 16, 
        marginLeft: 5,
    },
    songImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 5,
        borderColor: '#4c4c4c',
    },
    rightContainer: {
        alignSelf: 'flex-end',
        height: 300,
        justifyContent: 'space-between',
        marginRight: 5
    },
    profilePicture: {
        width: 50, 
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#fff'
    },
    iconContainer: {
        alignItems: 'center'
    },
    statsLabel: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginTop: 5,
    }
})
