

import {Client, Account, ID, Models, Databases, Avatars, Storage, Query} from 'react-native-appwrite';
import React, { useState } from 'react';
import {CreateUserParams, SignInParams} from "@/type";

export const config={
    endpoint:process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    project:process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform:process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!,
    databaseId:process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
    userCollectionId:process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
}

export const client = new Client();
client
    .setEndpoint(config.endpoint)
    .setProject(config.project)   // Your Project ID
    .setPlatform(config.platform);
// Your package name / bundle identifier
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);

export const createUser = async ({ email, password, name }: CreateUserParams) => {
    try {
        const newAccount = await account.create({userId: ID.unique(), email, password, name})
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
        const session = await account.createEmailPasswordSession({email, password});
        return session
    } catch (e) {
        throw new Error(e as string);
    }
}
export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal("userId", currentAccount.$id)]
        );

        if (!currentUser.documents.length) {
            return null;
        }

        return currentUser.documents[0];

    } catch (e) {
        console.log("getCurrentUser error:", e);
        return null;
    }
};

export const signOut = async () => {
    try {
          // Check if session exists
          const user = await account.get();

          if (user) {
              await account.deleteSession("current");
          }

          return true;
  }catch (e) {
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

