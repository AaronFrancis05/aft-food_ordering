import {View, Text} from 'react-native'
import React, {useState} from 'react'
import CustomFormField from '@/components/customFormField';
import CustomButton from "@/components/customButton";
import {Link,router} from "expo-router";
import {createUser} from "@/lib/appwrite";
const SignUp = () => {
    const [user, setUser] = useState({
        name:"",
        email:"",
        password:"",
    })
    const [isLoading, setIsLoading] = useState(false);

    const submitHandler = async() => {
        const {name,email,password}=user;
        if (!user.name || !user.email || !user.password) return alert("Please fill all the fields");
        setIsLoading(true);
        try {
            const response = await createUser({ name, email, password });
            if(!response) throw Error;
            alert("User created successfully");
            setIsLoading(false);
            router.replace("/");
        }catch (e: any) {
            console.log(e);
            throw new Error(e.message);
        }finally {
            setUser({
                name:"",
                email:"",
                password:"",
            })
        }
    }
    return (
        <View className={"flex-1 px-8"}>
            {/*<Text className={"font-quicksand-bold "}>SignIn</Text>*/}
            <CustomFormField
                label="Username"
                placeholder="Enter your username"
                value={user.name}
                onChangeText={(text:string)=>setUser({...user,name:text})}
                secureTextEntry={false}
                keyboardType={"email-address"}
            />
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
                value={user.password}
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
                <Text className={"mr-2"}>Already have an account?</Text>
                <Link href={"/sign-in"}>Sign In</Link>
            </View>

        </View>
    );
}
export default SignUp
