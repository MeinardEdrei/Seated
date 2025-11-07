import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { signOutUser } from '../../auth/authService'
import { useAuth } from '../../context/AuthContext'

export default function Home() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleSignOut = async () => {
    console.log("Sign out button pressed!")
    try {
      setIsSigningOut(true)
      await signOutUser()
      router.replace("/Login/login")
    } catch (error) {
      console.error("Error during sign out:", error)
      setIsSigningOut(false)
    }
  }

  if (loading || isSigningOut) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#941418" />
          <Text style={{ marginTop: 10 }}>
            {isSigningOut ? "Signing out..." : "Loading..."}
          </Text>
        </View>
      </SafeAreaView>
    )
  }

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Not signed in</Text>
          <TouchableOpacity 
            style={styles.signOutButton}
            onPress={() => router.replace("/Login/login")}
          >
            <Text style={styles.signOutButtonText}>Go to Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Profile Picture */}
        {user.photoURL && (
          <Image 
            source={{ uri: user.photoURL }}
            style={styles.profileImage}
          />
        )}

        {/* User Info */}
        <View style={styles.userInfo}>
          <Text style={styles.title}>
            {user.displayName || 'User'}
          </Text>
          <Text style={styles.email}>{user.email}</Text>
          
          {/* Additional Firebase Info */}
          <View style={styles.infoCard}>
            <InfoRow label="User ID" value={user.uid} />
            <InfoRow label="Email Verified" value={user.emailVerified ? '✓ Yes' : '✗ No'} />
            <InfoRow 
              label="Account Created" 
              value={user.metadata.creationTime 
                ? new Date(user.metadata.creationTime).toLocaleDateString() 
                : 'N/A'
              } 
            />
            <InfoRow 
              label="Last Sign In" 
              value={user.metadata.lastSignInTime
                ? new Date(user.metadata.lastSignInTime).toLocaleDateString()
                : 'N/A'
              } 
            />
            {user.phoneNumber && (
              <InfoRow label="Phone" value={user.phoneNumber} />
            )}
          </View>
        </View>
        
        {/* Sign Out Button */}
        <TouchableOpacity 
          style={styles.signOutButton}
          onPress={handleSignOut}
          activeOpacity={0.8}
        >
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

// Helper component for info rows
const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}:</Text>
    <Text style={styles.infoValue} numberOfLines={1}>{value}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#941418',
  },
  userInfo: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    width: '100%',
    marginTop: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: '#666',
    flex: 2,
    textAlign: 'right',
  },
  signOutButton: {
    backgroundColor: '#ff4444',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 20,
  },
  signOutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})


