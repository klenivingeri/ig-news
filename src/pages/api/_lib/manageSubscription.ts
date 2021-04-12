import { query as q } from 'faunadb';
import { fauna } from "../../../services/fauna";
import { stripe } from '../../../services/stripe';

export async function saveSubstription(
    subscriptionId: string,
    customerId: string,
    createAction:boolean
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

    //console.log(subscription ,' verificanso dados')
    const subscriptionData = {
        id: subscription.id,
        userId: userRef,
        status: subscription.status,
        price_id: subscription.items.data[0].price.id
    }


    if (createAction) {
        await fauna.query(
            q.Create(
                q.Collection('subscriptions'),
                { data: subscriptionData}
            )
        )
    }else{
        await fauna.query( //1
            q.Replace(
                q.Select(
                    "ref",
                    q.Get(
                        q.Match(
                            q.Index('subscriptions_by_id'),
                            subscriptionId,
                        )
                    )
                ),
                { data: subscriptionData}
            )
        )

    }

    


    // Salvar os dados da substription no FaunaDB

}

/*busca usuario
q.Get(
    q.Match(
        q.Index('user_by_stripe_customer_id'),
        customerId
    )
)

 para comsumir menos trafego possivel , precisamos retornar apenas  oque é necessário 


    1 ) Atualiza dados no banco

 */