import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

const SearchScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "green", alignItems: "center" }}>
      <StatusBar style="light"/>
      <Text style={{ margin: 90, fontSize: 35 }}>Search Screen</Text>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
