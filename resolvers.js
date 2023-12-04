
import { quotes, users } from "./fakeData.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const User = mongoose.model("User");
const KEY = process.env.SECRETE_KEY;
export const resolvers = {
    Query: {
      greets: () => "Hello World!",
      users: () => users,
      quotes: () => quotes,
      user: (_, args) => users.find((u) => u.id == args.id),
      quote: (_, {user_id}) => quotes.filter(q => q.user_id == user_id)
    },
    User:{
      greets:(parent) => `Hi ${parent.name}!`,
      quotes: (parent) => quotes.filter((q) => q.user_id === parent.id)
    },
    Mutation: {
        createUser: async (_,{newUser}) => {
            const usr = await User.findOne({email: newUser?.email});
            if(usr){
              throw Error('Email already in use');
            }
            const hashPassword = await bcrypt.hash(newUser?.password, 12);
            const userNew = new User({
              ...newUser,
              password: hashPassword
            })
            return  await userNew.save();
        },
        signin: async (_, {userSignin}) => {
          const user = await User.findOne({email: userSignin.email})
          if(!user || !await bcrypt.compare(userSignin.password, user.password)){
            throw Error('Invalid email or password')
          }
          const token = jwt.sign({_id: user?._id}, KEY);
          return  {
            _id: user?._id,
            name: user?.name,
            email: user?.email,
            role: user?.role,
            token
          }
        }
    }
    
};