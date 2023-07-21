import React, { useState, useEffect } from 'react'
import SPACING from '../config/SPACING'
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import {
  useNavigation,
  useFocusEffect,
  useIsFocused,
} from '@react-navigation/native'
import { BlurView } from 'expo-blur'
import { Ionicons } from '@expo/vector-icons'
import colors from '../config/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import UserListItem from '../components/UserListItem'

const { width } = Dimensions.get('window')

const UserList = ({ navigation }) => {
  const isFocused = useIsFocused()
  const [userInfo, setUserInfo] = useState({})

  const getUserFromStorage = async () => {
    try {
      const user = await AsyncStorage.getItem('userData')
      setUserInfo(JSON.parse(user))
    } catch (error) {
      console.error('Error getting user data from storage:', error)
    }
  }
  useEffect(() => {
    getUserFromStorage()
  }, [isFocused])

  function renderUserList() {
    return <UserListItem custom />
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          marginTop: 30,
          marginHorizontal: 12,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            left: 0,
          }}
        >
          <Ionicons name="arrow-back" size={24} color={colors.dark} />
        </TouchableOpacity>
        <Text style={{ fontSize: SPACING * 2, color: colors.dark }}>
          User list screen
        </Text>
      </View>
      <ScrollView>
        <View
          style={{
            flex: 1,
            paddingBottom: 100,
          }}
        >
          {renderUserList()}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default UserList
