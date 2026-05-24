import {View, Text, Image} from 'react-native'
import React from 'react'
import {Tabs,Redirect} from "expo-router";
import {images} from "@/lib/constants";
import {TabBarIconProps} from "@/type";
import cn from "clsx"
import {useGlobalContext} from "@/lib/UseGlobalState";
export default function TabsLayout() {
    const {isLoading,user,isLoggedIn} = useGlobalContext();
    if(!isLoggedIn && !user){return <Redirect href={"/sign-in"} />}
    const TabIcon = ({title,icon,focused}:TabBarIconProps) => {
        return (
            <View className={"tab-icon"}>
                <Image source={icon} resizeMode="contain" className="size-7" tintColor={focused?"#FE8C00":"#878787"}  />
                <Text className={cn('text-sm font-bold',focused?"text-primary":"text-gray-100", )}>{title}</Text>
            </View>
        )
    }
    return (
        <Tabs screenOptions={{
            headerShown:false,
            tabBarShowLabel:false,
            tabBarItemStyle: {
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
            },
            tabBarStyle:{
                backgroundColor: 'white',
                shadowColor: '#1a1a1a',
                borderRadius:50,
                borderTopWidth:0,
                height:80,
                marginHorizontal:15,
                bottom:40,
                position:"absolute",
                justifyContent: 'center',
                alignItems: 'center',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 5
            },

            tabBarLabelStyle:{
                fontSize:8,
                fontWeight:"bold",
            },

        }}>
            <Tabs.Screen name="index" options={{
                headerShown:false,
                title:"Home",
                tabBarIcon:({focused})=>(
                    <TabIcon focused={focused} title={"Home"} icon={images.home} />
                )
            }}
          />
            <Tabs.Screen name="search" options={{
                headerShown:false,
                title:"Search",
                tabBarIcon:({focused})=>(
                    <TabIcon focused={focused} title={"Search"} icon={images.search} />
                )
            }}
            />
            <Tabs.Screen name="cart" options={{
                headerShown:false,
                title:"Cart",
                tabBarIcon:({focused})=>(
                    <TabIcon focused={focused} title={"Cart"} icon={images.bag} />
                )
            }}
            />
            <Tabs.Screen name="profile" options={{
                headerShown:false,
                title:"Profile",
                tabBarIcon:({focused})=>(
                    <TabIcon focused={focused} title={"Profile"} icon={images.person} />
                )
            }}
            />
        </Tabs>
    )
}
