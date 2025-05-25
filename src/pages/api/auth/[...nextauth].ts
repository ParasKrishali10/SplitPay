import bcrypt from "bcrypt"
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import connectToDatabase from "@/app/lib/mongodb";
import User from "@/model/User";
import Account from "@/model/Account";
export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text", placeholder: "John Doe" },
        username: { label: "Email", type: "email", placeholder: "your-email@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try{
          console.log("connecting to database")
            await connectToDatabase();
            console.log("connect to db")
            console.log("Checking up for user in db")
            const existing_user=await User.findOne({
              email:credentials?.username
            })
            console.log("Checking done ")
            if(!existing_user)
            {
              console.log("User not found inndb ")
              const hashedPassword=await bcrypt.hash(credentials?.password ||"",10)
              const newUser=await User.create({
                name:credentials?.name,
                email:credentials?.username,
                password:hashedPassword,
              })
              console.log("User created successfully")
              console.log("Creating new account")
              await Account.create({
                userId:newUser._id
              })
              console.log("Account created successfully for the user");
              return {name:credentials?.name,email:credentials?.username}

            }
            const isPasswordValid=await bcrypt.compare(
              credentials?.password || "",
              existing_user.password
            )
            if(!isPasswordValid)
            {
              throw new Error("Invalid email or password")
            }
            return existing_user
        }catch(error)
        {
          console.error("Error in authentication",error)
          return null;
        }

      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "",
  callbacks:{
    async signIn({user,profile})
    {
      try{
        console.log("Connecting to database")
      await connectToDatabase();
      console.log("Connect to db")
      console.log("Checking if user exist in your db")
      const existing_user=await User.findOne({
        email:user.email
      })
      if(!existing_user)
      {

        console.log("user not found so we are creating a new user")
          const newUser=await User.create({
            name:profile?.name||user.name,
            email:user.email,
            password:"12345678"
          })
          console.log("user created successfully")
          console.log("Creating new account")
              await Account.create({
                userId:newUser._id
              })
              console.log("Account created successfully for the user");

          return true;
      }
      console.log("User already present in db")
      }catch(error)
      {
        console.log("Error while authentication",error)
        return false;
      }
      return true;
    },
    async redirect()
    {

        return "/picture"

    },
    async session({session})
    {
      return session
    }
  }
});
