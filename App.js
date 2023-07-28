import { useState } from "react";
import { StyleSheet, ImageBackground, View, SafeAreaView } from "react-native";
import Colors from "./constants/colors";
//import { LienarGradient} form 'expo-linear-gradient';  no pude instalar el paquete con expo install expo-linar-gradient
// import { useFonts } from 'expo-font'; no pude instalar el paquete con expo
// import AppLoading from 'expo-app-loading'; no pude instalar el paquete con expo
import { StatusBar } from "expo-status-bar";

import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  //en caso de que los paquetes de fuente esten instalados:
  /*
  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if(!fontsLoaded){
    return <AppLoading/>;
  }
  */

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }

  function sartNewGameHandler() {
    setUserNumber(null);
    setGuessRounds(0);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }

  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onStartNewGame={sartNewGameHandler}
      />
    );
  }

  return (
    <>
    <StatusBar style="dark"/>
    {/* no pude instalar expo-linear-gradient */}
    {/*<linearGradient colors={["#4e0329", "#ddb52f"]} style={styles.rootScreen}> */}
    <View style={styles.rootScreen}>
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </View>
    {/* </linearGradient> */}
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    //backgroundColor: Colors.accent500,
  },
  backgroundImage: {
    opacity: 0.5,
  },
});
