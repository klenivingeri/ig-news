import {NextApiRequest, NextApiResponse } from 'next'
export default (request:NextApiRequest, response:NextApiResponse) =>{

    const users =[
        {id:1, name:'Erick'},
        {id:2, name:'Paul'},
        {id:3, name:'Andrade'},
        {id:4, name:'Kleniving'},
    ]

    return response.json(users);
}



/** APIs root - 
 * 
 *  Tudo que estiver na pasta API funcionar como uma rota do servidor
 * 
 *  Serverless - sobe e desce as rotas conforme for chamadas, as ela não fica ouvindo 24s
 *  apenas na hora que é chamado
 * 
 * **Estratégias de autenticação
 *  JNT( Storage)
 *  Next Auth (Social)
 *  Cognito, Auth0, trabalha com o next
 * 
 * https://next-auth.js.org/
 */