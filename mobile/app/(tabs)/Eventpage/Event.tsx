import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Upload } from "lucide-react-native";

import Header from "../../../components/Header";
import ScannerFrame from "../../../components/ScannerFrame";

export default function EventPage() {
  const router = useRouter();
  const [scanned, setScanned] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const handleViewEvent = () => {
    router.push("/Eventpage/components/ViewEvent");
  };

  const handleBarcodeScanned = ({ type, data }: { type: string; data: string }) => {
    if (scanned) return;
    
    setScanned(true);

    Alert.alert(
      'QR Code Scanned',
      `Event Data: ${data}`,
      [
        {
          text: 'View Details',
          onPress: () => {
            setScanned(false);
            handleViewEvent();
          },
        },
        {
          text: 'Scan Again',
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
          'QR code uploaded successfully. Processing event data...',
          [{ text: 'OK' }]
        );
        
        console.log('Selected image URI:', result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to upload image. Please try again.');
    }
  };

  // Request camera permission on mount
  React.useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission();
    }
  }, [permission]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFFFFF",
    },
    mainContent: {
      flex: 1,
      alignItems: "center",
      width: "100%",
      top: 70,
    },
    eventcontainer: {
      flex: 1,
      alignItems: "center",
      width: 280,
    },
    caption: {
      fontFamily: "Poppins-SemiBold",
      fontSize: 16,
      color: "#1C1C1C",
    },
    infoText: {
      color: "#525252",
      fontFamily: "Poppins-Regular",
      fontSize: 12,
      textAlign: "center",
      marginBottom: 16,
    },
    camera: {
      width: '100%',
      height: '100%',
    },
    dividerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 32,
      opacity: 0.3,
      width: "100%",
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: "#525252",
    },
    dividerText: {
      color: "#1C1C1C",
      fontFamily: "Poppins-Regular",
      fontSize: 14,
      marginHorizontal: 11,
    },
    photoButton: {
      backgroundColor: "#941418",
      width: "100%",
      height: 50,
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      shadowColor: "#1C1C1C",
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 1,
      shadowRadius: 4,
      elevation: 2,
    },
    photoButtonText: {
      color: "#FFE2A3",
      fontFamily: "Poppins-Bold",
      fontSize: 14,
    },
    tempButton: {
      backgroundColor: "#151515",
      width: "100%",
      height: 50,
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      marginTop: 50,
      shadowColor: "#1C1C1C",
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 1,
      shadowRadius: 4,
      elevation: 2,
    },
    tempButtonText: {
      color: "#FFFFFF",
      fontFamily: "Poppins-Bold",
      fontSize: 14,
    },
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <Header />

        <View style={styles.mainContent}>
          <View style={styles.eventcontainer}>
            <Text style={styles.caption}>Find a code to scan</Text>
            
            <Text style={styles.infoText}>
              Position the QR code within the frame to scan
            </Text>

            {/* Scanner Frame with Camera inside */}
            <ScannerFrame isScanning={scanned}>
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

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Upload QR Code Button */}
            <TouchableOpacity 
              style={styles.photoButton} 
              activeOpacity={0.8}
              onPress={handleUploadQR}
            >
              <Upload size={20} strokeWidth={2.5} color="#FFE2A3" />
              <Text style={styles.photoButtonText}>Upload QR Code</Text>
            </TouchableOpacity>

            {/* Temp Button for ViewEvent */}
            <TouchableOpacity
              style={styles.tempButton}
              onPress={handleViewEvent}
              activeOpacity={0.8}
            >
              <Text style={styles.tempButtonText}>View Event (Temp)</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
