import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {Link} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {images, offers} from "@/lib/constants";
import cn from "clsx";
import HeaderComponent from "@/components/HeaderComponent";

export default function Index() {
  return (
      <SafeAreaView className={"flex-1 bg-white-100 px-4 h-full"}>
          <FlatList
              data={offers}
              keyExtractor={(item)=>String(item.id)}
              ListHeaderComponent={()=>
                  <HeaderComponent />
          }
              renderItem={({item,index})=> {
                  const isEven = index % 2===0;
                  return (
                      <TouchableOpacity className={"flex-1 items-center justify-center w-full h-[120px] gap-2 my-4 rounded-3xl "} style={{backgroundColor: item.color}}>
                          <View className={cn(" px-4  justify-between items-center gap-4 w-full h-full",isEven?"flex-row":"flex-row-reverse")} >
                              <View className={cn("h-full w-1/2 flex justify-center p-2 ",)}>
                                  <Image
                                      source={item.image}
                                      className={"w-full h-full overflow-hidden"}
                                      resizeMode={"contain"}
                                  />
                              </View>

                              <View className={cn("flex-col  w-1/2 h-full p-2  justify-center",)}>
                                  <Text className={"font-quicksand-bold text-white text-xl"}>
                                      {item.title}
                                  </Text>
                                  <Image source={images.arrowRight} className={"size-10"} resizeMode={"contain"} />
                              </View>

                          </View>
                      </TouchableOpacity>
                  )
              }
              }

          />
      </SafeAreaView>
  );
}
