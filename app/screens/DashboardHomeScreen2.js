import React, { useState, useEffect, useContext } from 'react'
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
  Alert,
} from 'react-native'
import { BlurView } from 'expo-blur'
import { Ionicons } from '@expo/vector-icons'
import {
  useNavigation,
  useFocusEffect,
  useIsFocused,
} from '@react-navigation/native'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  StackedBarChart,
} from 'react-native-chart-kit'
import colors from '../config/colors'
import SPACING from '../config/SPACING'
import dummyData from '../config/dummy'
import axiosInstance from '../../util/axiosWrapper'
import { AuthContext } from '../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

const background = require('../../assets/backgroundmobile.jpg')
const { width } = Dimensions.get('window')
const DashboardHomeScreen2 = ({ navigation }) => {
  const navigationn = useNavigation()
  const { logout } = useContext(AuthContext)

  useFocusEffect(
    React.useCallback(() => {
      // Add listener for tab press
      const unsubscribe = navigation.addListener('tabPress', (e) => {
        // Prevent default behavior of tab press
        e.preventDefault()

        // Reset the navigation state to the initial route of the stack
        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        })
      })

      // Cleanup the listener when the screen loses focus or unmounts
      return unsubscribe
    }, [])
  )
  const [foodData, setFoodData] = useState([])
  const [ingreData, setIngreData] = useState([])
  const [treding, setTreding] = useState(dummyData.tredingFood)
  const [usersNumber, setUsersNumber] = useState([])
  const [foodsNumber, setFoodsNumber] = useState([])
  const [goiNumber, setGoiNumber] = useState([])
  const [comTamNumber, setcomTamNumber] = useState([])
  const [phoNumber, setPhoNumber] = useState([])
  const [canhNumber, setCanhNumber] = useState([])
  const [lauNumber, setLauNumber] = useState([])
  const [chienXuNumber, setchienXuNumber] = useState([])
  const [damNumber, setDamNumber] = useState([])
  const [thitNumber, setThitNumber] = useState([])
  const [caNumber, setcaNumber] = useState([])
  const [rauNumber, setrauNumber] = useState([])
  const [blogsNumber, setBlogsNumber] = useState([])
  const [showComponent, setShowComponent] = useState(false)

  const getFoodData = async () => {
    try {
      const res = await axiosInstance.get(`/foods`)
      const resgoi = await axiosInstance.get(
        `/foods?cate_detail_id=44d064e2-0637-4a8d-8a51-4f3910c7989e`
      )
      const resgoilist = resgoi?.data.foods || []
      const rescomtam = await axiosInstance.get(
        `/foods?cate_detail_id=6757e9e6-6bf3-40e6-9d80-3f83ee197cdb`
      )
      const rescomtamlist = rescomtam?.data.foods || []
      const respho = await axiosInstance.get(
        `/foods?cate_detail_id=8cb8714f-6d8d-4f7f-9e96-beef41618eae`
      )
      const respholist = respho?.data.foods || []
      const rescanh = await axiosInstance.get(
        `/foods?cate_detail_id=a8194d41-f31e-42e1-99a0-86374e85cb0d`
      )
      const rescanhlist = rescanh?.data.foods || []
      const reslau = await axiosInstance.get(
        `/foods?cate_detail_id=6f7167b2-ba18-41c2-9081-1bd4a35e2574`
      )
      const reslaulist = reslau?.data.foods || []
      const reschienxu = await axiosInstance.get(
        `/foods?cate_detail_id=56759594-09d2-4882-acb5-7871219deae7`
      )
      const reschienxulist = reschienxu?.data.foods || []
      setFoodData(res?.data?.foods)
      setGoiNumber(resgoilist.length)
      setcomTamNumber(rescomtamlist.length)
      setPhoNumber(respholist.length)
      setCanhNumber(rescanhlist.length)
      setLauNumber(reslaulist.length)
      setchienXuNumber(reschienxulist.length)
    } catch (error) {
      console.log(error)
    }
  }

  const getUserData = async () => {
    try {
      const res = await axiosInstance.get(`/users`)
      const usersList = res?.data?.user_paging.rows || []
      console.log(usersList.length)
      setUsersNumber(usersList.length)
    } catch (error) {
      console.log(error)
    }
  }

  const getBlogData = async () => {
    try {
      const res = await axiosInstance.get(`/blogs`)
      const usersList = res?.data?.blogs || []
      console.log(usersList.length)
      setBlogsNumber(usersList.length)
    } catch (error) {
      console.log(error)
    }
  }

  const getIngreData = async () => {
    try {
      const res = await axiosInstance.get(`/ingredients`)
      const resdam = await axiosInstance.get(
        `/ingredients?cate_detail_id=5e6f8de8-55f6-490a-946c-d2d83587bff5`
      )
      const resdamlist = resdam?.data.ingredients || []

      const resthit = await axiosInstance.get(
        `/ingredients?cate_detail_id=dc72947d-e5ec-484b-acd9-b9dad823666f`
      )
      const resthitlist = resthit?.data.ingredients || []
      const resca = await axiosInstance.get(
        `/ingredients?cate_detail_id=cf901804-a786-4b96-81d4-f2736d2667bc`
      )
      const rescalist = resca?.data.ingredients || []
      const resrau = await axiosInstance.get(
        `/ingredients?cate_detail_id=ca6dea7c-1a4c-43a1-a51d-810dca2b1e43`
      )
      const resraulist = resrau?.data.ingredients || []

      setIngreData(res?.data?.ingredients)
      setDamNumber(resdamlist.length)
      setThitNumber(resthitlist.length)
      setrauNumber(resraulist.length)
      setcaNumber(rescalist.length)
    } catch (error) {
      console.log(error)
    }
  }

  const data = [
    {
      name: 'Gỏi',
      population: goiNumber,
      color: 'rgba(131, 167, 234, 1)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Cơm tấm',
      population: comTamNumber,
      color: '#F00',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Phở',
      population: phoNumber,
      color: '#33FF33',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Canh',
      population: canhNumber,
      color: '#ffffff',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Lẩu',
      population: lauNumber,
      color: 'rgb(0, 0, 255)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Chiên xù',
      population: chienXuNumber,
      color: 'rgb(255, 255, 102)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ]

  const dataIngre = [
    {
      name: 'Đạm thực vật',
      population: damNumber,
      color: 'rgba(131, 167, 234, 1)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Thịt',
      population: thitNumber,
      color: '#F00',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Cá',
      population: caNumber,
      color: '#33FF33',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Rau củ',
      population: rauNumber,
      color: 'rgb(255, 255, 102)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ]

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userInfo')
  }

  useEffect(() => {
    getFoodData()
    getIngreData()
    getUserData()
    getBlogData()
  }, [])

  useEffect(() => {
    // Set the timeout to show the component after 2000 milliseconds (2 seconds)
    const timeout = setTimeout(() => {
      setShowComponent(true)
    }, 7000)

    // Clean up the timeout when the component unmounts or when the effect re-runs
    return () => clearTimeout(timeout)
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
            {/* <Text
              style={{ color: colors.red, fontSize: 12, fontWeight: 'bold' }}
            >
              HOT!
            </Text> */}
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
                marginTop: SPACING * 3,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {handleLogout(), navigation.navigate('LoginScreen')}}
            >
              <Ionicons
                name="power"
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
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Wellcome to Dashboard
            </Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Have a good time with App
            </Text>
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
              Manage
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
          Figures
        </Text>

        {showComponent && (
          <View>
            <LineChart
              data={{
                labels: ['May', 'June', 'July', 'August', 'September'],
                datasets: [
                  {
                    data: [5.0, 5.0, 6.0, usersNumber, 0.0],
                  },
                ],
              }}
              width={Dimensions.get('window').width - SPACING * 2} // from react-native
              height={220}
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: '#606060',
                backgroundGradientFrom: '#606060',
                backgroundGradientTo: '#606060',
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },
              }}
              bezier
              style={{
                marginVertical: SPACING,
                borderRadius: SPACING,
                marginHorizontal: SPACING,
              }}
            />
            <Text
              style={{
                color: colors.dark,
                fontSize: SPACING * 1.8,
                marginBottom: SPACING,
                marginLeft: 10,
                textAlign: 'center',
              }}
            >
              Number of users in application
            </Text>

            <PieChart
              data={data}
              width={Dimensions.get('window').width - SPACING * 2}
              height={225}
              chartConfig={{
                backgroundGradientFrom: '#1E2923',
                backgroundGradientFromOpacity: 0,
                backgroundGradientTo: '#08130D',
                backgroundGradientToOpacity: 0.5,
                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                strokeWidth: 2, // optional, default 3
                barPercentage: 0.5,
                useShadowColorFromDataset: false, // optional
              }}
              accessor={'population'}
              backgroundColor={'transparent'}
              paddingLeft={'15'}
              absolute
            />
            {/* <BarChart
            data={{
              labels: ['Gỏi', 'Cơm Tấm', 'Phở', 'Canh', 'Lẩu', 'Chiên xù'],
              datasets: [
                {
                  data: [goiNumber, comTamNumber, phoNumber, canhNumber, lauNumber, chienXuNumber],
                },
              ],
            }}
            width={Dimensions.get('window').width - SPACING * 2} // from react-native
            height={220}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(224, 224, 224, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(224, 224, 224, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            style={{
              marginVertical: SPACING,
              borderRadius: SPACING,
              marginHorizontal: SPACING,
            }}
          /> */}
            <Text
              numberOfLines={2}
              style={{
                color: colors.dark,
                fontSize: SPACING * 1.8,
                marginBottom: SPACING,
                marginLeft: 10,
                textAlign: 'center',
              }}
            >
              Number of each recipe type in application
            </Text>
            <LineChart
              data={{
                labels: ['May', 'June', 'July', 'August', 'September'],
                datasets: [
                  {
                    data: [0.0, 0.0, 0.0, blogsNumber, 0.0],
                  },
                ],
              }}
              width={Dimensions.get('window').width - SPACING * 2} // from react-native
              height={220}
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: '#606060',
                backgroundGradientFrom: '#606060',
                backgroundGradientTo: '#606060',
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(224, 224, 224, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(224, 224, 224, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },
              }}
              bezier
              style={{
                marginVertical: SPACING,
                borderRadius: SPACING,
                marginHorizontal: SPACING,
              }}
            />
            <Text
              style={{
                color: colors.dark,
                fontSize: SPACING * 1.8,
                marginBottom: SPACING,
                marginLeft: 10,
                textAlign: 'center',
              }}
            >
              Number of blogs in application
            </Text>
            <PieChart
              data={dataIngre}
              width={Dimensions.get('window').width - SPACING * 2}
              height={225}
              chartConfig={{
                backgroundGradientFrom: '#1E2923',
                backgroundGradientFromOpacity: 0,
                backgroundGradientTo: '#08130D',
                backgroundGradientToOpacity: 0.5,
                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                strokeWidth: 2, // optional, default 3
                barPercentage: 0.5,
                useShadowColorFromDataset: false, // optional
              }}
              accessor={'population'}
              backgroundColor={'transparent'}
              paddingLeft={'15'}
              absolute
            />
            {/* <BarChart
            data={{
              labels: ['Đạm thực vật', 'Thịt', 'Cá', 'Rau củ'],
              datasets: [
                {
                  data: [damNumber, thitNumber, caNumber, rauNumber],
                },
              ],
            }}
            width={Dimensions.get('window').width - SPACING * 2} // from react-native
            height={220}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(224, 224, 224, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(224, 224, 224, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            style={{
              marginVertical: SPACING,
              borderRadius: SPACING,
              marginHorizontal: SPACING,
            }}
          /> */}
            <Text
              numberOfLines={2}
              style={{
                color: colors.dark,
                fontSize: SPACING * 1.8,
                marginBottom: SPACING,
                marginLeft: 10,
                textAlign: 'center',
              }}
            >
              Number of each ingredient type in application
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  )
}

export default DashboardHomeScreen2
