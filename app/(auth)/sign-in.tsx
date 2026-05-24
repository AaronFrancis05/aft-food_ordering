import {View, Text} from 'react-native'
import React, {useState} from 'react'
import CustomFormField from '@/components/customFormField';
import CustomButton from "@/components/customButton";
import {Link, router} from "expo-router";
import {getCurrentUser, signIn,} from "@/lib/appwrite";
import {useGlobalContext} from "@/lib/UseGlobalState";
const SignIn = () => {
    const [users, setUsers] = useState({
        email:"",
        password:"",
    })
    const {email,password}=users;
    const [isLoading, setIsLoading] = useState(false);
    const {setIsLoggedIn,setUser}=useGlobalContext();

    const submitHandler = async () => {
        if(!users.email || !users.password) return alert("Please fill all the fields");
        try {
            setIsLoading(true);

            await signIn({email, password});

            const currentUser = await getCurrentUser();

            if (currentUser) {
                setUser({
                    $id: currentUser.userId,
                    name: currentUser.name,
                    email: currentUser.email,
                    avatarUrl: currentUser.avatarUrl
                });

                setIsLoggedIn(true);

                router.replace("/");

            }
        }catch(e){
                console.log(e)
                throw new Error(e as string);
            }finally {
                setUsers({
                    email:"",
                    password:"",
                })
        }
    }
    return (
        <View className={"flex-1   mt-2 px-8"}>
            {/*<Text className={"font-quicksand-bold "}>SignIn</Text>*/}

            <CustomFormField
                label="Email"
                placeholder="Enter your email"
                value={users.email}
                onChangeText={(text:string)=>setUsers({...users,email:text})}
                secureTextEntry={false}
                keyboardType={"email-address"}
            />
            <CustomFormField
                label="Password"
                placeholder="Enter your password"
                value={users.password}
                onChangeText={(text:string)=>setUsers({...users,password:text})}
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
