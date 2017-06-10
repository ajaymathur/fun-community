import React, { Component } from "react";
import UpComingBirthdays from "./components/upComingBirthdays";
import Budget from './components/budget';
import { TabNavigator } from "react-navigation";


export default TabNavigator(
  {
    Birthday: {
      screen: UpComingBirthdays
    },
    Budget: {
      screen: Budget
    },
  },
  {
    lazy: true,
    tabBarOptions: {
      style: {
        backgroundColor: '#004aff',
      },
      indicatorStyle: {
        backgroundColor: '#3595ff',
      },
      showIcon: true,
      showLabel: false,
    }
  }
);
