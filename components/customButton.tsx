import {View, Text, Pressable, ActivityIndicator} from 'react-native'
import React from 'react'
import {CustomButtonProps} from "@/type";
import cn from "clsx";
import {Link} from "expo-router";

const CustomButton = ({isLoading,title,onPress,textStyle}:CustomButtonProps) => {
    return (
        <>
        <Pressable className={"bg-primary items-center justify-center rounded-2xl py-2 mt-4"}
        onPress={onPress}>
            {isLoading?<ActivityIndicator size={"small"}  />:<Text className={cn(textStyle,)}>{title}</Text>}
        </Pressable>

        </>
    )
}
export default CustomButton
