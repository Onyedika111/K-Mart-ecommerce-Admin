import clientPromise from '@/lib/mongodb'
import { MongoDBAdapter } from '@auth/mongodb-adapter'

import NextAuth from "next-auth/react"
import GoogleProvider from 'next-auth/providers/google'

const adminEmails = ['onyxunusual@gmail.com']

 const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ],
    adapter: MongoDBAdapter(clientPromise)
    // callbacks: {
    //     session: ({ session, token, user }) => {
    //         if (adminEmails.includes(session?.user?.email)) {
    //             return session
    //         } else {
    //             return false
               
               
    //         }
            
    //     }
    // }
     
})


export { handler as GET, handler as POST }


// export async function isAdminRequest(req) {

//     if (!adminEmails.includes(authOptions.callbacks.session?.user?.email)) {
      
//       throw new Error('not an admin');
//     }
//   }

//SECOND TRIAL

// const adminEmails = ['onyxunusual@gmail.com']

// export const authOptions = {
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_ID,
//             clientSecret: process.env.GOOGLE_SECRET
//         })
//     ],
//     adapter: MongoDBAdapter(clientPromise),
//     callbacks: {
//         session: ({ session, token, user }) => {
//             if (adminEmails.includes(session?.user?.email)) {
//                 return session
//             } else {
//                 return false
//             }
            
//         }
//     }
// }

// const handler = NextAuth(authOptions)


// export async function isAdminRequest(req,res) {
//     const session = await getServerSession(req,res,authOptions);
//     if (!adminEmails.includes(session?.user?.email)) {
//       res.status(401);
//       res.end();
//       throw 'not an admin';
//     }
//   }


// export { handler as GET, handler as POST }
