import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import colors from '../config/colors'
import axiosInstance from '../../util/axiosWrapper'
import { useNavigation } from '@react-navigation/native'

const FoodListItem = () => {
  const navigation = useNavigation()
  const [userListData, setUserListData] = useState([])
  const [foodData, setFoodData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getFoodData = async () => {
    setIsLoading(true)
    try {
      const res = await axiosInstance.get('/foods')
      setFoodData(res?.data?.foods)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getFoodData()
  }, [])
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
      }}
    >
      <Image
        source={{ uri: item.food_image[0]?.image }}
        style={{ width: 30, height: 30, borderRadius: 10 }}
      />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={{ fontWeight: 'bold' }}>{item.food_name}</Text>
        <Text>{item?.food_cate_detail?.cate_detail_name}</Text>
      </View>
      {/* Active */}
      <View
        style={{ flexDirection: 'row', height: '100%', alignItems: 'center' }}
      ></View>
    </TouchableOpacity>
  )

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
      <Text style={{ fontSize: 20 }}>Food List</Text>
      <FlatList
        contentContainerStyle={{ marginTop: 10 }}
        scrollEnabled={false}
        data={foodData}
        renderItem={renderItem}
        keyExtractor={(item) => item.food_id}
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

export default FoodListItem
