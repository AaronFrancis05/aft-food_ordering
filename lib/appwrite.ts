

import {Client, Account, ID, Models, Databases, Avatars,Storage} from 'react-native-appwrite';
import React, { useState } from 'react';
import {CreateUserParams, SignInParams} from "@/type";

export const config={
    endpoint:process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    project:process.env.EXPO_PUBLIC_APPWRITE_PROJECT!,
    platform:process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!,
    databaseId:process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
    userCollectionId:process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
}

export const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(config.project)   // Your Project ID
    .setPlatform("com.aft.foodordering");
// Your package name / bundle identifier
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);

export const createUser = async ({ email, password, name }: CreateUserParams) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name)
        if(!newAccount) throw Error;

        await signIn({ email, password });

        const avatarUrl = avatars.getInitialsURL(name);

        return await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            { userId: newAccount.$id, email, name,avatarUrl }
        );
    } catch (e) {
        throw new Error(e as string);
    }
}

export const signIn = async ({ email, password }: SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
    } catch (e) {
        throw new Error(e as string);
    }
}


//     async function login(email: string, password: string) {
//         await account.createEmailPasswordSession({
//             email,
//             password
//         });
//         setLoggedInUser(await account.get());
//     }
//
//     async function register(email: string, password: string, name: string) {
//         await account.create({
//             userId: ID.unique(),
//             email,
//             password,
//             name
//         });
//         await login(email, password);
//         setLoggedInUser(await account.get());
//     }
//     return (
//         // ... Implement your UI here
//     );
// }

// });

