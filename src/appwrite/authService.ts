import {
  account,
  databases,
  DATABASE_ID,
  COLLECTION_ID,
  tables_ID,
} from "./appwriteConfig";
import { ID, Query } from "appwrite";

export const registerUser = async (data: any) => {
  const {
    firstname,
    lastname,
    email,
    password,
    phone,
    age,
    gender,
    weight,
    goal,
  } = data;

  // Create auth user
  const user = await account.create(
    ID.unique(),
    email,
    password,
    `${firstname} ${lastname}`
  );

  // Save in USERS collection
  await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
    firstname,
    lastname,
    email,
    gender,
    age,
    phone,
    weight,
    goal,
    role: "user",
  });

  //  Save in MEMBERS collection
  await databases.createDocument(
    DATABASE_ID,
    tables_ID.MEMBERS,
    ID.unique(),
    {
      name: `${firstname} ${lastname}`,
      email,
      phone,
      status: "active",
      source: "user",
    }
  );

  return user;
};


export const loginUser = async (email: string,) => {
  try {
    const existingUser = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.equal("email", email)],
    );
    console.log("existing user", existingUser);
      if (existingUser.total === 0) {
      throw new Error("User not found!");
    }

    return existingUser.documents[0];

  } catch (error: any) {
    console.error("Login Error:", error.message);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await account.deleteSession("current"); // 🔥 this logs out user
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const user = await account.get();
    console.log(user);
    return user;
  } catch (error) {
    return null;
  }
};
