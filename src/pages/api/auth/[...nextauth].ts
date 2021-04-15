
import { query as q } from 'faunadb'

import NextAuth from 'next-auth'
import { session } from 'next-auth/client'
import Providers from 'next-auth/providers'

import { fauna } from '../../../services/fauna'


export default NextAuth({
  // Configure one or more authentication providers
  providers: [ //1
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope:'read:user'
    }),
  ],
  callbacks:{
 
      async session(session){
        try{
          const userActiveSubscription = await fauna.query(
            q.Get(
              q.Intersection([
                q.Match(
                  q.Index('subscriptions_by_user_ref'),
                  q.Select(
                    "ref",
                    q.Get(
                      q.Match(
                        q.Index('users_by_email'),
                        q.Casefold(session.user.email)
                      )
                    )
                  )
                ),
                q.Match(
                  q.Index('subscriptions_by_status'),
                  "active"
                )
              ])
            )
          )
  
          return {
            ...session,
            activeSubscription: userActiveSubscription
          }
        } catch{
          return {
            ...session,
            activeSubscription: null
          }
        }
        
      },



    async signIn(user, account, profile) {
      //console.log(user)
      const { image, name, email } = user

     try {
      await fauna.query( //2
        q.If(
          q.Not(
            q.Exists(
              q.Match(
                q.Index('users_by_email'),
                q.Casefold(user.email)
              )
            )
          ),
          q.Create(
            q.Collection('users'),
            { data: {email} }
          ),
          q.Get( //select
            q.Match(
              q.Index('users_by_email'),
              q.Casefold(user.email)
            )
          )
        )
      )
      return true
    } catch {
      return false
     }


    }
  }

})

/**
 *  q.Se( q.não( q.existir (q.encontro( q.local(),))) 
 */






  // A database is optional, but required to persist accounts in a database
  //database: process.env.DATABASE_URL, ativar se for salvar dados de usuario no banco

/**
 * 1 )
 * scope:'read:user'
 * https://docs.github.com/pt/developers/apps/scopes-for-oauth-apps
 * caso precise passar mais parametros
 * scope:'read:user,outros,scope'
 * 
 * 2) 
 * https://docs.fauna.com/fauna/current/api/fql/cheat_sheet
 * 
 * 
 */