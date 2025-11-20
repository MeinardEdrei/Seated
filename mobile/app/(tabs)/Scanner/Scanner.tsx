import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Upload } from 'lucide-react-native';
import Header from '../../../components/Header';
import ScannerFrame from '../../../components/ScannerFrame';

export default function Scanner() {
  const [scanned, setScanned] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const handleBarcodeScanned = ({ type, data }: { type: string; data: string }) => {
    if (scanned) return;
    
    setScanned(true);

    Alert.alert(
      'QR Code Scanned',
      `Data: ${data}`,
      [
        {
          text: 'OK',
          onPress: () => setScanned(false),
        },
      ]
    );

    console.log('QR Code Type:', type);
    console.log('QR Code Data:', data);
  };

  const handleUploadQR = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Please enable photo library access to upload QR codes.',
          [{ text: 'OK' }]
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        Alert.alert(
          'Image Selected',
          'QR code uploaded successfully. Processing...',
          [{ text: 'OK' }]
        );
        
        console.log('Selected image URI:', result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to upload image. Please try again.');
    }
  };

  const handleAttendance = () => {
    console.log('See Attendance List pressed');
    // TODO: Navigate to attendance list page
  };

  React.useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission();
    }
  }, [permission]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <Header showSettings={false} />

        <View style={styles.mainContent}>
          <View style={styles.scannerContainer}>
            <Text style={styles.caption}>Find a code to scan</Text>
            
            <Text style={styles.infoText}>
              Position the QR code within the frame to scan
            </Text>

            {/* Scanner Frame with Camera inside */}
            <ScannerFrame isScanning={scanned} cornerColor="#FFE2A3">
              {permission?.granted ? (
                <CameraView
                  style={styles.camera}
                  facing="back"
                  onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
                  barcodeScannerSettings={{
                    barcodeTypes: ['qr'],
                  }}
                />
              ) : (
                <View style={{ flex: 1, backgroundColor: 'rgba(82, 82, 82, 0.2)', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: '#525252', fontFamily: 'Poppins-Regular', fontSize: 12 }}>
                    Camera permission required
                  </Text>
                </View>
              )}
            </ScannerFrame>


            {/* See Attendance List Button */}
            <TouchableOpacity 
              style={styles.attendanceButton} 
              activeOpacity={0.8}
              onPress={handleAttendance}
            >
              <Text style={styles.attendanceButtonText}>See Attendance List</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    paddingTop: 70,
  },
  scannerContainer: {
    flex: 1,
    alignItems: 'center',
    width: 280,
  },
  caption: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1C1C1C',
    marginBottom: 4,
  },
  infoText: {
    color: '#525252',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 16,
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
    opacity: 0.3,
    width: '100%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#525252',
  },
  dividerText: {
    color: '#1C1C1C',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginHorizontal: 11,
  },
  uploadButton: {
    backgroundColor: '#941418',
    width: '100%',
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#1C1C1C',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  uploadButtonText: {
    color: '#FFE2A3',
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
  },
  attendanceButton: {
    backgroundColor: '#941418',
    width: '100%',
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
    shadowColor: '#1C1C1C',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  attendanceButtonText: {
    color: '#FFE2A3',
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
  },
});
