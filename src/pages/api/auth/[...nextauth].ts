
import { query as q } from 'faunadb'

import NextAuth from 'next-auth'
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
    async signIn(user, account, profile) {
      const { image, name } = user

     try {
      await fauna.query( //2
        q.Create(
          q.Collection('users'),
          { data: {image,name} }
        )
      )
      return true
     } catch {
       return false
     }


    }
  }

})







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