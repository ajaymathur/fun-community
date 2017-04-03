import React, { Component } from "react";
import UpComingBirthdays from "./components/upComingBirthdays";
import Budget from './components/budget';
import { TabNavigator } from "react-navigation";


export default TabNavigator(
  {
    Home: {
      screen: UpComingBirthdays
    },
    Budget: {
      screen: Budget
    },
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: '#004aff',
      }
    }
  }
);
