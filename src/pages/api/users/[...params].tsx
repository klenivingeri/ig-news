import {NextApiRequest, NextApiResponse } from 'next'
export default (request:NextApiRequest, response:NextApiResponse) =>{

    console.log(request.query)
    const users =[
        {id:1, name:'Erick'},
        {id:2, name:'Paul'},
        {id:3, name:'Andrade'},
        {id:4, name:'Kleniving'},
    ]

    return response.json(users);
}
