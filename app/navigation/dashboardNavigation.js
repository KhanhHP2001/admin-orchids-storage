import React from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import DashboardHomeScreen from '../screens/DashboardHomeScreen'
import Icon from 'react-native-vector-icons/MaterialIcons'
import colors from '../config/colors'
import DashboardHomeScreen2 from '../screens/DashboardHomeScreen2'
import UserList from '../screens/UserList'
import FoodList from '../screens/FoodList'
import IngredientList from '../screens/IngredientList'

const Tab = createBottomTabNavigator()

const DashboardNavigation = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        activeTintColor: colors.primary,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardHomeScreen2}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ color }) => (
            <Icon name="home-filled" color={color} size={28} />
          ),
          tabBarStyle: { backgroundColor: colors.graylight, borderTopWidth: 0 },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="FoodsScreen"
        component={FoodList}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="fastfood" color={color} size={28} />
          ),
          tabBarStyle: { backgroundColor: colors.graylight, borderTopWidth: 0 },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="IngredientsScreen"
        component={IngredientList}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="shopping-bag" color={color} size={28} />
          ),
          tabBarStyle: { backgroundColor: colors.graylight, borderTopWidth: 0 },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="UserList"
        component={UserList}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="person" color={color} size={28} />
          ),
          tabBarStyle: { backgroundColor: colors.graylight, borderTopWidth: 0 },
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  )
}

export default DashboardNavigation
