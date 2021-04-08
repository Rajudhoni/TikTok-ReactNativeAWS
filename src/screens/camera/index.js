/* eslint-disable react/self-closing-comp */
import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {RNCamera} from 'react-native-camera';

const {width, height} = Dimensions.get('window');

const CameraPage = props => {
    const [isRecording, setRecording] = useState(false);
    const camera = useRef();
  
  const onRecord = async () => {
      if(isRecording){
          camera.current.stopRecording();
      }else{
         
          const data = await camera.current.recordAsync();
          console.log("Recording Data: ", data);
      }
    
  };
  return (
    <View style={styles.container}>
      <RNCamera
        ref={camera}
        style={styles.preview}
        type={RNCamera.Constants.Type.front}
        height={height - 120}

        onRecordingStart={()=> setRecording(!isRecording)}
        onRecordingEnd={()=> setRecording(!isRecording)}
      />

      
        <TouchableOpacity
          onPress={onRecord}
          style={
            isRecording ? styles.buttonStop : styles.buttonRecord 
          }
        >
              
          </TouchableOpacity>

    </View>
  );
};

export default CameraPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    //alignItems: 'center'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonRecord: {
    marginVertical: 10,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignSelf: 'center',
    justifyContent: 'flex-end',
   backgroundColor: '#ff4343',
  },

  buttonStop: {
    marginVertical: 20,
    height: 30,
    width: 30,
    borderRadius: 3,
    alignSelf: 'center',
    justifyContent: 'flex-end',
   backgroundColor: '#ff4343',
  },


});
