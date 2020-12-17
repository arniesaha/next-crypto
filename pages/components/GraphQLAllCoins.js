import gql from 'graphql-tag';

export default gql`
query {
    listCoins {
        items{
            price_usd
            name
            symbol
            notes
            rank
            id
            fav
        } 
    }
}`

