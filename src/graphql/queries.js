/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listCoins = /* GraphQL */ `
  query ListCoins($limit: Int, $start: Int) {
    listCoins(limit: $limit, start: $start) {
      symbol
      name
      rank
      price_usd
      notes
      fav
    }
  }
`;
export const listCoinsJson = /* GraphQL */ `
  query ListCoinsJson {
    listCoinsJSON
  }
`;
