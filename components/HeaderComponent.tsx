import {View, Text, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import {images} from "@/lib/constants";

const HeaderComponent = () => {
    return (
        <View className={"h-20 bg-white-100 flex-row items-center justify-between px-2 rounded-2xl"}>
            <View className={"flex-col items-center justify-start gap-2"}>
                <Text className={"font-quicksand-bold text-xl"}>Deliver To:</Text>
               <View className={"flex-row items-center justify-center gap-1"} >
                   <Text className={"font-quicksand-medium text-sm"}>Kampala</Text>
                   <Image  source={images.arrowDown}  resizeMode={"contain"} className={"size-5"}/>

               </View>
             </View>

           <TouchableOpacity className={"relative rounded-full bg-black p-2"}>
               <Image source={images.bag} resizeMode={"contain"} tintColor={"#"} className={"size-8 "}/>
               <View className={"absolute -top-2 -right-2 bg-primary items-center justify-center rounded-full size-5"}>
                   <Text className={"text-white text-md font-quicksand-bold"}>2</Text>
               </View>

           </TouchableOpacity>
        </View>
    )
}
export default HeaderComponent
