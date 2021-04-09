import React from 'react';
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
  const camera = React.useRef();
  const [state, setState] = React.useState({
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    autoFocusPoint: {
      normalized: {x: 0.5, y: 0.5}, // normalized values required for autoFocusPointOfInterest
      drawRectPosition: {
        x: width * 0.5 - 32,
        y: height * 0.5 - 32,
      },
    },
    depth: 0,
    type: 'back',
    whiteBalance: 'auto',
    ratio: '16:9',
    recordOptions: {
      mute: false,
      maxDuration: 5,
      quality: RNCamera.Constants.VideoQuality['288p'],
    },
    isRecording: false,
    canDetectFaces: false,
    canDetectText: false,
    canDetectBarcode: false,
    faces: [],
    textBlocks: [],
    barcodes: [],
  });

  const onRecord = async () => {
    const {isRecording} = state;
    if (camera && !isRecording) {
      try {
        const promise = camera.current.recordAsync(state.recordOptions);

        if (promise) {
          setState({...state, isRecording: true});
          const data = await promise;
          console.warn('takeVideo', data);
        }
      } catch (e) {
        console.error(e);
      }
    }
  };
  const stopVideo = async () => {
    await camera.current.stopRecording();
    setState({...state, isRecording: false});
  };
  const action = state.isRecording ? stopVideo : onRecord;

  return (
    <View styles={styles.container}>
      <RNCamera
        ref={camera}
        style={styles.preview}
        type={RNCamera.Constants.Type.front}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        height={height}
        
      />

      <View
        style={{
          backgroundColor: 'transparent',
          height: height,
          position: 'absolute',
          width: '100%',
        }}>
        <TouchableOpacity
          onPress={action}
          style={[
            styles.button,
            {backgroundColor: state.isRecording ? 'red' : 'green'},
          ]}></TouchableOpacity>
      </View>
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
  button: {
    marginVertical: 10,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 60,
  },
});
