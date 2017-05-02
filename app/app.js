import React, { Component } from "react";
import UpComingBirthdays from "./components/upComingBirthdays";
import Budget from './components/budget';
import { TabNavigator } from "react-navigation";


export default TabNavigator(
  {
    Budget: {
      screen: Budget
    },
    Home: {
      screen: UpComingBirthdays
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
