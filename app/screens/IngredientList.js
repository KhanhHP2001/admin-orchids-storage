import React, { useState, useEffect } from 'react'
import SPACING from '../config/SPACING'
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import colors from '../config/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import IngredientListItem from '../components/IngredientListItem'

const IngredientList = ({ navigation }) => {
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
    return <IngredientListItem custom />
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
          Ingredient list screen
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

export default IngredientList
