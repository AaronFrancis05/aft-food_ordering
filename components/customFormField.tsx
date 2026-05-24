import {View, Text, TextInput} from 'react-native'
import React, {useState} from 'react'
import {CustomInputProps} from "@/type";
import cn from "clsx";


const CustomFormField = ({label,value,onChangeText,secureTextEntry,keyboardType,placeholder}:CustomInputProps) => {
    const [onFocus, setOnFocus] = useState(false)
    return (
        <View className={"w-full my-3"}>
            <Text className={"font-quicksand-bold text-xl"}>{label}</Text>
            <TextInput
            value={value}
            placeholder={placeholder}
            placeholderTextColor={"#878787"}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            className={cn("border  shadow-2xl shadow-gray-300 rounded-lg p-2 mt-3",onFocus?"border-primary":"border-gray-200")}
            onFocus={()=>setOnFocus(true)}
            onBlur={()=>setOnFocus(false)}
            />
        </View>
    )
}
export default CustomFormField
