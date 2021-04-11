import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from 'stream'
import Stripe from "stripe";
import { stripe } from "../../services/stripe";

async function buffer(readable: Readable) {
    const chunks = [];

    for await ( const chunk of readable) { // aguarda novos chunks,armazena no array
        chunks.push(
            typeof chunk == "string" ? Buffer.from(chunk) : chunk
        );
    }

    return Buffer.concat(chunks);
}

export const config = { //2
    api:{
        bodyParser: false
    }
}
const relevantEvents = new Set([ //3
    'checkout.session.completed'
])


export default async (req: NextApiRequest, res:NextApiResponse) => {

    if ( req.method == 'POST' ) {
        const buf = await buffer(req)// todos os dados que precisa da requisição
        const secret = req.headers['stripe-signature']

        let event: Stripe.Event;

        try{
            event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOKS_SECRET);
        } catch(err){
            return res.status(400).send (`Webhook error: ${err.message}`)
        }

        const { type } = event //4

        if ( relevantEvents.has(type)) {
            try{
                switch(type) {
                    case 'checkout.session.completed':
                        break;
                    default:
                            throw new Error('Unhandle event.')
                }
            }catch(err) {
                return res.json({ error: 'Webhooks Hundler fils'})
            }

        }

        res.status(200).json({ oreceived: true});
    }else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not Allowed -webhoocks');
    }
}


/**
 * ) instalando Webhooks do stripe windows, pelo prompt
 *  https://stripe.com/docs/stripe-cli#install
 * 
 * webhooks no formato de stream
 * req é readable por padrão
 * 
 * 2 )  https://nextjs.org/docs/api-routes/api-middlewares
 * 
 * 3 ) Cria um array e não deixa os valores se repetir
 * 
 * 4 ) todos os eventos retornadors
 */