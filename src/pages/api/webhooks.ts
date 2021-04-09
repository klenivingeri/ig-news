import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res:NextApiResponse) => {
    console.log('evento recebido')
    res.status(200).json({ ok: true});
}


/**
 * ) instalando Webhooks do stripe windows, pelo prompt
 *  https://stripe.com/docs/stripe-cli#install

 */