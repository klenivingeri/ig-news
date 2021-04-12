import { query as q } from 'faunadb';
import { fauna } from "../../../services/fauna";
import { stripe } from '../../../services/stripe';

export async function saveSubstription(
    subscriptionId: string,
    customerId: string
){
    // Buscando o Usuário no banco do FaunaDB pelo ID

    const userRef = await fauna.query(
        q.Select(
            "ref",
            q.Get(
                q.Match(
                    q.Index('user_by_stripe_customer_id'),
                        customerId
                )
            )
        )
    )

    const subscription = await stripe.subscriptions.retrieve(subscriptionId)

    console.log(subscription ,' verificanso dados')
    const subscriptionData = {
        id: subscription.id,
        userId: userRef,
        status: subscription.status,
        price_id: subscription.items.data[0].price.id
    }


    console.log(subscriptionData)
    await fauna.query(
        q.Create(
            q.Collection('subscriptions'),
            { data: subscriptionData}
        )
    )



    // Salvar os dados da substription no FaunaDB

}

/*busca usuario
q.Get(
    q.Match(
        q.Index('user_by_stripe_customer_id'),
        customerId
    )
)
*/