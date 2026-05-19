import {View, Text} from 'react-native'
import React, {useState} from 'react'
import CustomFormField from '@/components/customFormField';
import CustomButton from "@/components/customButton";
import {Link} from "expo-router";
const SignIn = () => {
    const [user, setUser] = useState({
        email:"",
        password:"",
    })
    const [isLoading, setIsLoading] = useState(false);

    const submitHandler = () => {}
    return (
        <View className={"flex-1   mt-2 px-8"}>
            {/*<Text className={"font-quicksand-bold "}>SignIn</Text>*/}

            <CustomFormField
                label="Email"
                placeholder="Enter your email"
                value={user.email}
                onChangeText={(text:string)=>setUser({...user,email:text})}
                secureTextEntry={false}
                keyboardType={"email-address"}
            />
            <CustomFormField
                label="Password"
                placeholder="Enter your password"
                value={user.email}
                onChangeText={(text:string)=>setUser({...user,password:text})}
                secureTextEntry={true}
                keyboardType={"default"}
            />
            <CustomButton
            isLoading={isLoading}
            onPress={submitHandler}
            title="Submit"
            textStyle={"text-white font-quicksand-bold text-xl"}
            />
            <View className={"flex-row justify-center items-center mt-8 text-gray-500"}>
                <Text className={"mr-2"}>Don't have an account?</Text>
                <Link href={"/sign-up"}>Sign Up</Link>
            </View>

        </View>
    );
}
export default SignIn
