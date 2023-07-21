import React, { useState, useEffect } from 'react'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native'
import SPACING from '../config/SPACING'
import SearchField from '../components/SearchField'
import Categories from '../components/Categories'
import { BlurView } from 'expo-blur'
import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import colors from '../config/colors'
import axiosInstance from '../../util/axiosWrapper'
import AsyncStorage from '@react-native-async-storage/async-storage'

const DashboardHomeScreen = ({ navigation }) => {
  const isFocused = useIsFocused()

  const avatar = require('../../assets/avatar.jpg')

  const { width } = Dimensions.get('window')

  useFocusEffect(
    React.useCallback(() => {
      // Add listener for tab press
      const unsubscribe = navigation.addListener(
        'tabPress',
        () => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Dashboard' }],
          })
        },
        [isFocused]
      )

      return unsubscribe
    }, [navigation, isFocused])
  )
  const [foodData, setFoodData] = useState([])
  const [ingreData, setIngreData] = useState([])
  const [activeCategoryId, setActiveCategoryId] = useState(null)
  const [userInfo, setUserInfo] = useState({})
  const [dataFav, setDataFav] = useState([])

  // Get data from storage
  const getFromStorage = async () => {
    try {
      const data = await AsyncStorage.getItem('favorite')
      setDataFav(data ? JSON.parse(data) : [])
    } catch (error) {
      console.error('Error getting data from storage:', error)
    }
  }

  // Set data to storage
  const setDataToStorage = async (food) => {
    try {
      const updatedData = [...dataFav, food]
      await AsyncStorage.setItem('favorite', JSON.stringify(updatedData))
      setDataFav(updatedData)
    } catch (error) {
      console.error('Error setting data to storage:', error)
    }
  }

  // Remove data from storage
  const removeDataFromStorage = async (itemId) => {
    try {
      const list = dataFav.filter((item) => item.food_id !== itemId)
      await AsyncStorage.setItem('favorite', JSON.stringify(list))
      setDataFav(list)
    } catch (error) {
      console.error('Error removing data from storage:', error)
    }
  }

  const getFoodData = async () => {
    try {
      const res = await axiosInstance.get(`/foods`)
      setFoodData(res?.data?.foods)
    } catch (error) {
      console.log(error)
    }
  }

  const getIngreData = async () => {
    try {
      const res = await axiosInstance.get(`/ingredients`)
      setIngreData(res?.data?.ingredients)
    } catch (error) {
      console.log(error)
    }
  }
  const getUserFromStorage = async () => {
    try {
      const user = await AsyncStorage.getItem('userData')
      setUserInfo(JSON.parse(user))
    } catch (error) {
      console.error('Error getting user data from storage:', error)
    }
  }
  const getCategoryData = async () => {
    try {
      const res = await axiosInstance.get(
        '/categories_detail?cate_id=6e3f5b3b-df19-4776-a7cc-92b0a0a3ce1d'
      )
      setCategoryData(res?.data?.categories_detail?.rows)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getFoodData()
    getIngreData()
    getUserFromStorage()
    getCategoryData()
  }, [])

  const navigationToUserProfile = () => {
    navigation.navigate('UserProfile')
  }

  return (
    <SafeAreaView style={{ backgroundColor: colors.graylight, flex: 1 }}>
      <StatusBar backgroundColor={colors.primary} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingVertical: 10,
          marginTop: 25,
        }}
      >
        <View
          style={{
            width: SPACING * 15,
            height: SPACING * 4,
            overflow: 'hidden',
            marginTop: SPACING / 2,
            borderRadius: 3,
          }}
        >
          <Text style={{ color: colors.dark, fontSize: SPACING * 1.8 }}>
            Wellcome to Dashboard
          </Text>
        </View>
        <View
          style={{
            width: SPACING * 4,
            height: SPACING * 4,
            overflow: 'hidden',
            borderRadius: SPACING,
          }}
        >
          <BlurView
            style={{
              height: '100%',
              padding: SPACING / 2,
            }}
          >
            <TouchableOpacity onPress={navigationToUserProfile}>
              <Image
                style={{
                  height: '100%',
                  width: '100%',
                  borderRadius: SPACING,
                }}
                source={{ uri: userInfo?.user?.avatar }}
              />
            </TouchableOpacity>
          </BlurView>
        </View>
      </View>
      <Text
        style={{
          color: colors.dark,
          fontSize: 20,
          fontWeight: 'bold',
          marginTop: 20,
          marginLeft: 10,
        }}
      >
        Overview
      </Text>
      <ScrollView style={{ flex: 1 }} horizontal={true}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              borderRadius: 20,
              margin: 20,
              backgroundColor: colors.primary,
              height: 100,
            }}
          >
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderColor: 'gray',
              }}
            >
              <Text style={{ color: colors.white }}>
                Có {foodData.length} công thức nấu ăn
              </Text>
              <BlurView
                intensity={90}
                tint="light"
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 40,
                  marginTop: 5,
                }}
              >
                <Ionicons
                  name="fast-food-outline" //fast-food-outline
                  size={20}
                  color={colors.primary}
                />
              </BlurView>
            </View>
          </View>
          <View
            style={{
              borderRadius: 20,
              margin: 20,
              backgroundColor: colors.primary,
              height: 100,
            }}
          >
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderColor: 'gray',
              }}
            >
              <Text style={{ color: colors.white }}>
                Có {ingreData.length} nguyên liệu nấu ăn
              </Text>
              <BlurView
                intensity={90}
                tint="light"
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 40,
                  marginTop: 5,
                }}
              >
                <Ionicons
                  name="md-restaurant" //fast-food-outline
                  size={20}
                  color={colors.primary}
                />
              </BlurView>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: colors.dark,
            fontSize: SPACING * 1.8,
            fontWeight: 'bold',
            marginBottom: SPACING,
            marginLeft: 10,
          }}
        >
          Top treding food
        </Text>
        <FlatList
          data={foodData?.sort((a, b) => b.price - a.price).slice(0, 4)}
          keyExtractor={(item) => item.food_id.toString()}
          renderItem={({ item }) => (
            <View
              key={item.food_id}
              style={{
                width: width / 2 - SPACING * 2,
                marginBottom: SPACING,
                borderRadius: SPACING * 2,
                overflow: 'hidden',
                marginRight: 10,
              }}
            >
              <BlurView
                tint="dark"
                intensity={95}
                style={{
                  padding: SPACING,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('OrchidDetail', {
                      orchidId: item.food_id,
                    })
                  }
                  style={{
                    height: 150,
                    width: '100%',
                  }}
                >
                  <Image
                    source={{ uri: item.food_image[0].image }}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: SPACING * 2,
                    }}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      right: 0,
                      borderBottomStartRadius: SPACING * 3,
                      borderTopEndRadius: SPACING * 2,
                      overflow: 'hidden',
                    }}
                  >
                    <BlurView
                      tint="dark"
                      intensity={70}
                      style={{
                        flexDirection: 'row',
                        padding: SPACING - 2,
                      }}
                    >
                      <Ionicons
                        style={{
                          marginLeft: SPACING / 2,
                        }}
                        name="star"
                        color={colors.primary}
                        size={SPACING * 1.7}
                      />
                      <Text
                        style={{
                          color: colors.white,
                          marginLeft: SPACING / 2,
                        }}
                      >
                        {item.rating}
                      </Text>
                    </BlurView>
                  </View>
                </TouchableOpacity>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    color: colors.white,
                    fontWeight: '600',
                    fontSize: SPACING * 1.7,
                    marginTop: SPACING,
                    marginBottom: SPACING / 2,
                  }}
                >
                  {item.food_name}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ color: colors.secondary, fontSize: SPACING * 1.2 }}
                >
                  {item.food_cate_detail.cate_detail_name}
                </Text>
                <View
                  style={{
                    marginVertical: SPACING / 2,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <Text
                      style={{
                        color: colors.primary,
                        marginRight: SPACING / 2,
                        fontSize: SPACING * 1.6,
                      }}
                    >
                      $
                    </Text>
                    <Text
                      style={{ color: colors.white, fontSize: SPACING * 1.6 }}
                    >
                      {item.price}
                    </Text>
                  </View>
                </View>
              </BlurView>
            </View>
          )}
          numColumns={2}
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: SPACING }}
        />
      </View>
    </SafeAreaView>
  )
}

export default DashboardHomeScreen
