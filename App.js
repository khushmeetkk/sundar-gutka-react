import React from "react";
import { StyleSheet } from "react-native";
import { StackNavigator, TabNavigator } from "react-navigation";
import { Header } from "react-native-elements";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import Icon from "react-native-vector-icons/FontAwesome";
import GLOBAL from './utils/globals';
import HomeScreen from "./screens/Home";
import FolderBaniScreen from "./screens/FolderBani";
import SettingsScreen from "./screens/Settings";
import EditBaniOrderScreen from "./screens/EditBaniOrder";
import AboutScreen from "./screens/About";
import ReaderScreen from "./screens/Reader";
import BookmarksScreen from "./screens/Bookmarks";
import createStore from "./config/store";
import { setBaniOrder } from "./actions/actions";
import { defaultBaniOrderArray } from "./utils/helpers";

const FolderNavigation = TabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      header: (
        <Header
        backgroundColor={GLOBAL.COLOR.DARK_BLUE}
          centerComponent={{
            text: "suMdr gutkw",
            style: [
              styles.headerBarStyle,
              { fontFamily: "GurbaniAkharHeavySG", fontSize: 24 }
            ]
          }}
          rightComponent={
            <Icon
              name="cog"
              color="#fff"
              size={30}
              onPress={() => navigation.navigate("Settings")}
            />
          }
        />
      ),
      tabBarVisible: false,
      swipeEnabled: false
    })
  },
  FolderBani: {
    screen: FolderBaniScreen,
    navigationOptions: ({ navigation }) => ({
      header: (
        <Header
        backgroundColor={GLOBAL.COLOR.DARK_BLUE}
          leftComponent={
            <Icon
              name="arrow-left"
              color="#fff"
              size={30}
              onPress={() => navigation.goBack()}
            />
          }
          centerComponent={{
            text: "suMdr gutkw",
            style: [
              styles.headerBarStyle,
              { fontFamily: "GurbaniAkharHeavySG", fontSize: 24 }
            ]
          }}
          rightComponent={
            <Icon
              name="cog"
              color="#fff"
              size={30}
              onPress={() => navigation.navigate("Settings")}
            />
          }
        />
      ),
      tabBarVisible: false,
      swipeEnabled: false
    })
  }
});

const RootStack = StackNavigator({
  BaniList: {
    screen: FolderNavigation
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: ({ navigation }) => ({
      header: (
        <Header
          backgroundColor={GLOBAL.COLOR.YELLOW}
          leftComponent={
            <Icon
              name="arrow-left"
              color="#fff"
              size={30}
              onPress={() => navigation.goBack()}
              underlayColor={GLOBAL.COLOR.LIGHT_BLUE}
            />
          }
          centerComponent={{ text: "Settings", style: styles.headerBarStyle }}
        />
      )
    })
  },
  Reader: {
    screen: ReaderScreen,

    navigationOptions: {
      header: null
    }
  },
  Bookmarks: {
    screen: BookmarksScreen,
    navigationOptions: ({ navigation }) => ({
      header: (
        <Header
          backgroundColor={GLOBAL.COLOR.YELLOW}
          leftComponent={
            <Icon
              name="arrow-left"
              color="#fff"
              size={30}
              onPress={() => navigation.goBack()}
              underlayColor={GLOBAL.COLOR.LIGHT_BLUE}
            />
          }
          centerComponent={{ text: "Bookmarks", style: styles.headerBarStyle }}
        />
      )
    })
  },
  EditBaniOrder: {
    screen: EditBaniOrderScreen,
    navigationOptions: ({ navigation }) => ({
      header: (
        <Header
          backgroundColor={GLOBAL.COLOR.DARK_GREEN}
          leftComponent={
            <Icon
              name="arrow-left"
              color="#fff"
              size={30}
              onPress={() => navigation.goBack()}
              underlayColor={GLOBAL.COLOR.LIGHT_BLUE}
            />
          }
          centerComponent={{
            text: "Edit Bani Order",
            style: styles.headerBarStyle
          }}
          rightComponent={
            <Icon
              name="refresh"
              color="#fff"
              size={30}
              onPress={() =>
                store.dispatch(setBaniOrder(defaultBaniOrderArray))
              }
              underlayColor={GLOBAL.COLOR.LIGHT_BLUE}
            />
          }
        />
      )
    })
  },
  About: {
    screen: AboutScreen,
    navigationOptions: ({ navigation }) => ({
      header: (
        <Header
          backgroundColor={GLOBAL.COLOR.DARK_GREEN}
          leftComponent={
            <Icon
              name="arrow-left"
              color="#fff"
              size={30}
              onPress={() => navigation.goBack()}
              underlayColor={GLOBAL.COLOR.LIGHT_BLUE}
            />
          }
          centerComponent={{ text: "About", style: styles.headerBarStyle }}
        />
      )
    })
  }
});

const styles = StyleSheet.create({
  headerBarStyle: {
    color: "#fff",
    fontSize: 18
  }
});

const { store, persistor } = createStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootStack />
        </PersistGate>
      </Provider>
    );
  }
}
