import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import colors from '../config/colors'
import axiosInstance from '../../util/axiosWrapper'
import { useNavigation } from '@react-navigation/native'

const IngredientListItem = () => {
  const navigation = useNavigation()
  const [ingreData, setIngreData] = useState([])

  const getIngreData = async () => {
    try {
      const res = await axiosInstance.get(`/ingredients`)
      console.log(res?.data)
      setIngreData(res?.data?.ingredients)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getIngreData()
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
        source={{ uri: item.ingredient_image[0]?.image }}
        style={{ width: 30, height: 30, borderRadius: 10 }}
      />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={{ fontWeight: 'bold' }}>{item.ingredient_name}</Text>
        <Text>{item?.quantitative}</Text>
      </View>
      {/* Active */}
      <View
        style={{ flexDirection: 'row', height: '100%', alignItems: 'center' }}
      >
        <Text>{item?.ingredient_store?.store_user.user_name}</Text>
      </View>
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
      <Text style={{ fontSize: 20 }}>Ingredient List</Text>
      <FlatList
        contentContainerStyle={{ marginTop: 10 }}
        scrollEnabled={false}
        data={ingreData}
        renderItem={renderItem}
        keyExtractor={(item) => item.ingredient_id}
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

export default IngredientListItem
