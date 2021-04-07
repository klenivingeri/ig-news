import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope:'read:user'
    }),
    // ...add more providers here
  ],

  // A database is optional, but required to persist accounts in a database
  //database: process.env.DATABASE_URL, ativar se for salvar dados de usuario no banco
})


/**
 * scope:'read:user'
 * https://docs.github.com/pt/developers/apps/scopes-for-oauth-apps
 * caso precise passar mais parametros
 * scope:'read:user,outros,scope'
 */