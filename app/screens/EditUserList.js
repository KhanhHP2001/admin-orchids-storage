import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { Ionicons } from '@expo/vector-icons'
import SPACING from '../config/SPACING'
import colors from '../config/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axiosInstance from '../../util/axiosWrapper'

const EditUserList = ({ navigation, route }) => {
  const { userId } = route.params

  const [dataUser, setDataUser] = useState()
  const [dataUserById, setdataUserById] = useState()
  const [roles, setRoles] = useState([])
  const [selectedRole, setSelectedRole] = useState(
    dataUserById?.user_role.role_name
  )
  const [status, setStatus] = useState(dataUserById?.status || 'Active')

  const getRoles = async () => {
    try {
      const response = await axiosInstance.get('/roles')
      setRoles(response?.data?.roles?.rows || [])
    } catch (error) {
      console.log(error)
    }
  }

  const getDataUserById = async (userId) => {
    try {
      const res = await axiosInstance.get(`/users/${userId}`)
      console.log(res?.data)
      setdataUserById(res.data.user)
    } catch (error) {
      console.log(error)
    }
  }

  const getDataUser = async () => {
    const data = await AsyncStorage.getItem('userData')
    const userData = JSON.parse(data)
    setDataUser(userData)
  }

  const handleSaveChanges = async () => {
    try {
      const response = await axiosInstance.put('/users', {
        user_id: dataUserById?.user_id,
        role_id: dataUserById?.user_role.role_id,
        status: status,
      })
      setdataUserById(response.data.user)
      console.log(response?.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (userId) {
      getDataUserById(userId), getDataUser(), getRoles()
    }
  }, [userId])

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}
    >
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 30,
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
          Edit User
        </Text>
      </View>

      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            marginVertical: 22,
          }}
        >
          <TouchableOpacity>
            <Image
              source={{ uri: dataUserById?.avatar }}
              style={{
                height: 150,
                width: 150,
                borderRadius: 85,
                borderWidth: 2,
                borderColor: colors.dark,
              }}
            />

            <View
              style={{
                position: 'absolute',
                bottom: 0,
                right: 10,
                zIndex: 9999,
              }}
            >
              <Ionicons name="camera" size={32} color={colors.dark} />
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <View
            style={{
              flexDirection: 'column',
              marginBottom: 6,
              marginLeft: 30,
            }}
          >
            <Text style={{ fontSize: SPACING * 1.5 }}>Role</Text>
            <View
              style={{
                height: 43,
                width: '90%',
                borderColor: colors.grey,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: 'center',
                paddingLeft: 8,
              }}
            >
              <Picker
                selectedValue={selectedRole}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedRole(itemValue)
                }
              >
                {roles.map((role) => (
                  <Picker.Item
                    key={role.role_id}
                    label={role.role_name}
                    value={role.role_name}
                  />
                ))}
              </Picker>
              {/* <TextInput
                value={dataUserById?.user_role.role_name}
                onChangeText={(text) => {
                  setDataUser((prevData) => ({
                    ...prevData,
                    user: { ...prevData.user, role_name: text },
                  }))
                }}
              /> */}
            </View>
          </View>

          <View
            style={{
              flexDirection: 'column',
              marginBottom: 6,
              marginLeft: 30,
            }}
          >
            <Text style={{ fontSize: SPACING * 1.5 }}>Status</Text>
            <View
              style={{
                height: 44,
                width: '90%',
                borderColor: colors.grey,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: 'center',
                paddingLeft: 8,
              }}
            >
              <Picker
                selectedValue={status}
                onValueChange={(itemValue, itemIndex) => setStatus(itemValue)}
              >
                <Picker.Item label="Active" value="Active" />
                <Picker.Item label="Deactive" value="Deactive" />
              </Picker>
            </View>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              height: 44,
              width: '80%',
              borderRadius: 6,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 38,
              marginVertical: 20,
            }}
            onPress={handleSaveChanges}
          >
            <Text
              style={{
                size: 24,
                color: colors.white,
              }}
            >
              Save Changes
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default EditUserList
