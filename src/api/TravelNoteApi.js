const axios = require("axios");
import React from "react";
import {BaseUrl} from "@api/Url";
import { AsyncStorage } from "react-native";
export default class PostApi extends React.Component {
  getAllTravelNote = async (page) => {
    // alert(page);
    var access_token = await AsyncStorage.getItem("access_token");
    var user_id =  await AsyncStorage.getItem("userid");
    let bodyParam = {
        start_date: new Date(),
        end_date: new Date(),
        page:page,
        userId:user_id,
        status:"all"
    };
    return axios.post(
   BaseUrl+"getHistory",
      bodyParam,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + access_token,
        },
      }
    );
  };
}