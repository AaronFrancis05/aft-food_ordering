import {View, Text, Dimensions, Image, KeyboardAvoidingView, ScrollView, Platform} from 'react-native'
import React from 'react'
export default function AuthLayout() {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView className="bg-white h-full" keyboardShouldPersistTaps="handled">
                <SafeAreaView className={"h-full bg-white"}>
                    <View
                        className={"relative "}
                        style={{height:Dimensions.get("screen").height/2}}>
                        <Image source={images.loginGraphic} resizeMode={"stretch"} className={"w-full h-full rounded-b-lg"}/>
                        <Image source={images.logo} resizeMode={"contain"} className={"self-center size-48 absolute -bottom-16 z-10"}/>
                    </View>
                    <Slot screenOptions={{headerShown:false}} />
                </SafeAreaView>
            </ScrollView>
        </KeyboardAvoidingView>

)
}
import {Slot} from "expo-router";

import {SafeAreaView} from "react-native-safe-area-context";
import {images} from "@/lib/constants";
