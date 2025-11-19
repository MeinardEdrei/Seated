import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface ScannerFrameProps {
  size?: number;
  cornerColor?: string;
  borderRadius?: number;
  children?: React.ReactNode;
  isScanning?: boolean; 
}

export default function ScannerFrame({
  size = 280,
  cornerColor = '#1C1C1C',
  borderRadius = 20,
  children,
  isScanning = false,
}: ScannerFrameProps) {
  const cornerAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isScanning) {
      Animated.spring(cornerAnimation, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(cornerAnimation, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: false,
      }).start();
    }
  }, [isScanning]);

  const cornerOffset = cornerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 60], 
  });

  const dynamicStyles = StyleSheet.create({
    scannerFrame: {
      width: size,
      height: size,
      borderRadius: borderRadius,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: 'transparent',
    },
    corner: {
      position: 'absolute',
      width: 28,
      height: 28,
      borderColor: cornerColor,
      borderWidth: 3,
      zIndex: 10,
    },
    topLeft: {
      borderTopLeftRadius: 10,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    topRight: {
      borderTopRightRadius: 10,
      borderLeftWidth: 0,
      borderBottomWidth: 0,
    },
    bottomLeft: {
      borderBottomLeftRadius: 10,
      borderRightWidth: 0,
      borderTopWidth: 0,
    },
    bottomRight: {
      borderBottomRightRadius: 10,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
  });

  return (
    <View style={dynamicStyles.scannerFrame}>
      {children}
      
      <Animated.View 
        style={[
          dynamicStyles.corner, 
          dynamicStyles.topLeft,
          { top: cornerOffset, left: cornerOffset }
        ]} 
      />
      <Animated.View 
        style={[
          dynamicStyles.corner, 
          dynamicStyles.topRight,
          { top: cornerOffset, right: cornerOffset }
        ]} 
      />
      <Animated.View 
        style={[
          dynamicStyles.corner, 
          dynamicStyles.bottomLeft,
          { bottom: cornerOffset, left: cornerOffset }
        ]} 
      />
      <Animated.View 
        style={[
          dynamicStyles.corner, 
          dynamicStyles.bottomRight,
          { bottom: cornerOffset, right: cornerOffset }
        ]} 
      />
    </View>
  );
}
