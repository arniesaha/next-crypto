import gql from 'graphql-tag';

export default gql`mutation createCoin(
  $id: ID
  $name: String
  $price_usd: String
  $rank: String
  $symbol: String
  $fav: Boolean
  $notes: String
) {
      createCoin(input:{id:$id name:$name price_usd:$price_usd rank:$rank symbol:$symbol fav: $fav notes: $notes})
      {
        id
        name
        price_usd
        rank
        symbol
        fav
        notes
      }
}`;