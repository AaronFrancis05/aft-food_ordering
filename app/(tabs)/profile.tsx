import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {getCurrentUser, signOut} from "@/lib/appwrite";
import {useGlobalContext} from "@/lib/UseGlobalState";
import {images} from "@/lib/constants";

const Profile = () => {
    const {user} =  useGlobalContext();
    return (
        <SafeAreaView className={"flex-1 h-full px-5"}>
            <ScrollView contentContainerClassName={"flex-1 "}>
                <View className={"flex-row justify-between items-center "}>
                    <Text className={"font-quicksand-bold text-2xl text-primary"}>Profile</Text>

                    <TouchableOpacity onPress={()=>signOut()}  className={" justify-center rounded-2xl px-2 py-2"}>
                        <Image source={images.logout} resizeMode={"contain"} className={"size-10"}/>
                    </TouchableOpacity>

                </View>

                <View className={"flex-col items-center justify-center gap-2 mt-10"}>
                    <View className={"rounded-full relative p-3"}>
                            <Image source={{uri:user?.avatarUrl}} resizeMode={"contain"} className={"size-20 rounded-full"} />
                            <Image source={images.pencil} className={"absolute bottom-0 right-0 size-6"} resizeMode={"contain"} tintColor={"#000"} />
                    </View>
                    <View className={"flex-col items-center justify-center gap-2"}>
                        <Text className={"font-quicksand-bold text-xl"}>{user?.name}</Text>
                        <Text className={"text-gray-500"}>{user?.email}</Text>
                    </View>

                </View>
                {/*<TouchableOpacity onPress={()=>signOut()}  className={"bg-red-500 items-center w-1/2 mx-auto justify-center rounded-2xl py-2 mt-4"}>*/}
                {/*    <Text>Logout</Text>*/}
                {/*</TouchableOpacity>*/}
            </ScrollView>
        </SafeAreaView>
    )
}
export default Profile
