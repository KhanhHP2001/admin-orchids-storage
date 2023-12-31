import React, { useState, useEffect, useContext } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import colors from '../config/colors'
import axiosInstance from '../../util/axiosWrapper'
import {
  useNavigation,
  useFocusEffect,
  useIsFocused,
} from '@react-navigation/native'
import { AuthContext } from '../context/AuthContext'

const UserListItem = () => {
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  useFocusEffect(
    React.useCallback(() => {
      // Add listener for tab press
      const unsubscribe = navigation.addListener('tabPress', (e) => {
        // Prevent default behavior of tab press
        e.preventDefault()

        // Reset the navigation state to the initial route of the stack
        navigation.reset({
          index: 0,
          routes: [{ name: 'UserListItem' }],
        })
      })
      // Cleanup the listener when the screen loses focus or unmounts
      return unsubscribe
    }, [])
  )
  const { isLoading } = useContext(AuthContext)
  const [userListData, setUserListData] = useState([])

  const getUserListData = async () => {
    try {
      const res = await axiosInstance.get(`/users`)
      setUserListData(res?.data?.user_paging?.rows)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      getUserListData()
    }, 6000)
  }, [isFocused])

  const renderItem = ({ item }) => {
    let statusTextColor =
      item.status && (item.status === 'Active' || item.status === 'Deactive')
        ? item.status === 'Active'
          ? 'green'
          : 'red'
        : 'black'
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('EditUserList', { userId: item.user_id })
        }
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 10,
        }}
      >
        <Image
          source={{ uri: item.avatar }}
          style={{ width: 30, height: 30, borderRadius: 10 }}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>{item.user_name}</Text>
          <Text>{item?.user_role?.role_name}</Text>
        </View>
        {/* Active */}
        <View
          style={{ flexDirection: 'row', height: '100%', alignItems: 'center' }}
        >
          <Text style={{ color: statusTextColor }}>{item.status}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <View
      style={{
        marginTop: 10,
        marginHorizontal: 10,
        padding: 20,
        borderRadius: 10,
        backgroundColor: colors.white,
        shadowColor: colors.dark,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      <Text style={{ fontSize: 20 }}>User List</Text>
      <FlatList
        contentContainerStyle={{ marginTop: 10 }}
        scrollEnabled={false}
        data={userListData}
        renderItem={renderItem}
        keyExtractor={(item) => item.user_id}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: colors.light,
              }}
            ></View>
          )
        }}
      />
    </View>
  )
}

export default UserListItem
