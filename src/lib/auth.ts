import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { NextAuthOptions, getServerSession } from "next-auth";
import { db } from "./db";
import GoogleProvider from 'next-auth/providers/google'
import { fetchRedis } from "@/helpers/redis";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET!,
    adapter: UpstashRedisAdapter(db),
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/sign-in'
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    callbacks: {
        async jwt({token, user}) {
            const dbUserFetched = (await fetchRedis('get', `user:${token.id}`)) as |string | null
            
            if(!dbUserFetched) {
                if(user) {
                    token.id = user!.id
                }

                return token
            }

            const dbUser = JSON.parse(dbUserFetched) as User

            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image
            }
        },
        async session({session, token}) {
            if(token) {
                session.user.id = token.id
                session.user.name = token.name
                session.user.email = token.email
                session.user.image = token.picture
            }

            return session
        },
        redirect() {
            return '/'
        }
    }
}