import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from '../../services/stripe';
import { getSession } from 'next-auth/client';


export default async (req: NextApiRequest, res:NextApiResponse) => {


    if(req.method == 'POST') {
        const session = await getSession({ req })

        const stripeCustomer = await stripe.customers.create({
            email: session.user.email,
            //metadata
        })



        const stripeCheckoutSession = await stripe.checkout.sessions.create({
            customer: stripeCustomer.id, // cria id no stripe
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            line_items: [
                { price: 'price_1IdEk1IA6LvOAWiPFVCarI09', quantity: 1 }
            ],
            mode: 'subscription',
            allow_promotion_codes:true,
            success_url: process.env.STRIPE_SUCCESS_URL,
            cancel_url: process.env.STRIPE_CANCEL_URL
        })

        return res.status(200).json({sessionId: stripeCheckoutSession.id})
    }else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not Allowed')
    }

}

//billing_address_collection: 'auto' não precisa preencher o endereço