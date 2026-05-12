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

  // 1️⃣ Create auth user
  const user = await account.create(
    ID.unique(),
    email,
    password,
    `${firstname} ${lastname}`
  );

  // 2️⃣ Save in USERS collection
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

  // 3️⃣ 🔥 Save in MEMBERS collection
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
    // await account.deleteSessions() 
    // await account.createEmailPasswordSession( email: data.email, password: data.password, });     
    // const row = existingUser.rows[0];     
    // const user = { userId: row.userId, name: row.name, email: row.email, role: row.role, };    
    // return { success: true, message: "Login Successfull", user,   };   
    // await account.createEmailPasswordSession(email, password);
    // return await account.get();
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
