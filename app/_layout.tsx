import {SplashScreen, Stack} from "expo-router";
import "@/global.css";
import {useFonts} from "expo-font";
import {useEffect} from "react";
import GlobalProvider from "@/lib/UseGlobalState";
export default function RootLayout() {

  const [fontsLoaded,error]=useFonts({
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "Quicksand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
  })
  // console.log(fontsLoaded,error);
  useEffect(()=>{
    if(error) throw error;
    if(fontsLoaded) SplashScreen.hideAsync();
  },[fontsLoaded,error])
  return <GlobalProvider>
            <Stack screenOptions={{headerShown:false}}/>
        </GlobalProvider>

}
