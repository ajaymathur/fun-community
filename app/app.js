import React, { Component } from "react";
import UpComingBirthdays from "./components/upComingBirthdays";
import Suggestions from './components/suggestions';
import { TabNavigator } from "react-navigation";


export default TabNavigator(
  {
    Home: {
      screen: UpComingBirthdays
    },
    Suggestions: {
      screen: Suggestions
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
