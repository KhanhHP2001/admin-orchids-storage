import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native'
import { BlurView } from 'expo-blur'
import { Ionicons } from '@expo/vector-icons'

import colors from '../config/colors'
import SPACING from '../config/SPACING'
import dummyData from '../config/dummy'
import axiosInstance from '../../util/axiosWrapper'

const background = require('../../assets/backgroundmobile.jpg')
const { width } = Dimensions.get('window')

const DashboardHomeScreen2 = ({ navigation }) => {
  const [foodData, setFoodData] = useState([])
  const [ingreData, setIngreData] = useState([])
  const [treding, setTreding] = useState(dummyData.tredingFood)

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

  useEffect(() => {
    getFoodData()
    getIngreData()
  }, [])

  function renderHeader() {
    const renderItem = ({ item, index }) => (
      <TouchableOpacity
        style={{
          width: 180,
          height: 180,
          paddingVertical: 10,
          paddingHorizontal: 10,
          marginLeft: 0,
          marginRight: 10,
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
        {/* currency */}
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
              {item.currency}
            </Text>
            <Text
              style={{ color: colors.red, fontSize: 12, fontWeight: 'bold' }}
            >
              HOT!
            </Text>
            <View>
              <Image
                source={item.image}
                resizeMode="cover"
                style={{
                  marginTop: 10,
                  width: 140,
                  height: 120,
                  borderRadius: 4,
                }}
              />
            </View>
          </View>
          {/* Value */}
        </View>
      </TouchableOpacity>
    )

    return (
      <View
        style={{
          width: '100%',
          height: 290,
          //   ...styles.shadow,
        }}
      >
        <ImageBackground
          source={background}
          resizeMode="cover"
          style={{ flex: 1, alignItems: 'center' }}
        >
          {/* Header Bar */}
          <View
            style={{
              marginTop: SPACING * 2,
              width: '100%',
              alignItems: 'flex-end',
              paddingHorizontal: SPACING,
            }}
          >
            <TouchableOpacity
              style={{
                width: 35,
                height: 35,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => console.log('Notification on pressed')}
            >
              <Ionicons
                name="notifications"
                resizeMode="contain"
                style={{ flex: 1, color: colors.white, fontSize: 20 }}
              />
            </TouchableOpacity>
          </View>
          {/* title */}
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text>Wellcome to Dashboard</Text>
            <Text>Have a good time with App</Text>
            <Text></Text>
          </View>
          {/* treding */}
          <View
            style={{
              position: 'absolute',
              bottom: '-30%',
            }}
          >
            <Text style={{ marginLeft: 10, color: colors.white, fontSize: 20 }}>
              Treding
            </Text>
            <FlatList
              contentContainerStyle={{ marginTop: 10 }}
              data={treding}
              renderItem={renderItem}
              keyExtractor={(item) => `${item.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </ImageBackground>
      </View>
    )
  }
  function renderNotice() {
    return (
      <View
        style={{
          marginTop: 110,
          marginHorizontal: 10,
          padding: 20,
          borderRadius: 5,
          backgroundColor: colors.primary,
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
        <Text style={{ color: colors.white, fontWeight: 'bold' }}>
          Cooking Safely
        </Text>
        <Text style={{ color: colors.white, fontSize: 13 }}>
          Whenever you have a hard time cooking, remember to always have us by
          your side
        </Text>
      </View>
    )
  }

  return (
    <ScrollView>
      <View style={{ flex: 1, paddingBottom: 20 }}>
        {renderHeader()}
        {renderNotice()}
      </View>
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
                backgroundColor: colors.darkLight,
              }}
            >
              <BlurView
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
                  style={{ color: colors.light2, fontSize: SPACING * 1.2 }}
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
    </ScrollView>
  )
}

export default DashboardHomeScreen2
