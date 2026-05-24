import {View, Text, Dimensions, Image, KeyboardAvoidingView, ScrollView, Platform} from 'react-native'
import React, {useEffect} from 'react'
import {router, Slot} from "expo-router";

import {SafeAreaView} from "react-native-safe-area-context";
import {images} from "@/lib/constants";
import {useGlobalContext} from "@/lib/UseGlobalState";

export default function AuthLayout() {
    const {isLoading,user,isLoggedIn} = useGlobalContext();
    useEffect(() => {
        if (isLoggedIn && user) {
            router.replace("/");
        }
    }, [isLoggedIn, user]);
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView className="bg-white h-full" keyboardShouldPersistTaps="handled">
                <SafeAreaView className={"h-full bg-white"}>
                    <View
                        className={"relative "}
                        style={{height:Dimensions.get("screen").height/2.25}}>
                        <Image source={images.loginGraphic} resizeMode={"stretch"} className={"w-full h-full rounded-b-lg"}/>
                        <Image source={images.logo} resizeMode={"contain"} className={"self-center size-48 absolute -bottom-16 z-10"}/>
                    </View>
                    <Slot screenOptions={{headerShown:false}} />
                </SafeAreaView>
            </ScrollView>
        </KeyboardAvoidingView>

)
}

