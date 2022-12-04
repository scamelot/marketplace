import NewShopForm from "../components/NewShopForm";
import {getAccessToken} from '@auth0/nextjs-auth0'
import {gql, useQuery} from '@apollo/client'
import {useUser} from '@auth0/nextjs-auth0/client'
import ShopsList from "../components/ShopsList";
 
const GET_SHOPS_BY_OWNER = gql`
    query getShopsByOwnerID($ownerID: String!) {
        getShopsByOwnerID(ownerID: $ownerID) {
          data {
            _id
            name
          } 
        }
    }
`

export default function ManageShops(props: any) {
    const {user} = useUser()
    const {data} = useQuery(GET_SHOPS_BY_OWNER, {
        variables: { ownerID: user?.sub}
    })

    return (
    <>
    <NewShopForm accessToken={props.accessToken} />
    {
        data ? (
            <ShopsList shops={data.getShopsByOwnerID.data} accessToken={props.accessToken} />
        ) : <div>Loading...</div>
    }
    </>
    )
}

export async function getServerSideProps(ctx: any) {
    const { accessToken } = await getAccessToken(ctx.req, ctx.res)

    return {
        props: {
            accessToken,
        }
    }
}