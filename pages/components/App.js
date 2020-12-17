import React from 'react';
import gql from 'graphql-tag'
// import { graphql } from 'react-apollo'
import { compose, graphql } from "react-apollo";
import ListCoins from './GraphQLAllCoins';
import NewCoin from './GraphQLNewCoin';
import { graphqlMutation } from 'aws-appsync-react' 


const listCoins = gql`
  query listCoins {
    listCoinsAPI {
      id
      price_usd
      name
      symbol
      rank
    }
  }
`

class App extends React.Component {

  createCoinFromAPI = (coins) => {
    // console.log(coins);
    
    coins.map((coin) => {

      const coinItem = {
          id: parseInt(coin.id),
          name: coin.name,
          price_usd: coin.price_usd,
          rank: parseInt(coin.rank),
          symbol: coin.symbol,
          fav: false,
          notes: ''
      }

      // console.log(coinItem);
      // this.props.createCoin(coinItem);
    
    })        
  }
  render() {
    return (
      <div className="App">
        
        <AllCoinsWithData />
        {/* {this.createCoinFromAPI(this.props.coins)} */}
      </div>
     
    );
  }
}

class Coins extends React.Component {
  render() {
    const { listCoins, refetch } = this.props.data;
    return (
      <div>
        <button onClick={() => refetch()}>Refresh</button>
        <ul>{listCoins && listCoins.items.map(coin => <li key={coin.id}>{'id: ' + coin.id + ' name: ' + coin.name + ' price: ' + coin.price_usd}</li>)}</ul>
      </div>
    )
  }
}

// const AddCoinsOffline = graphql(NewCoin, ListCoins, 'Coin')(Coins);
const AllCoinsWithData = graphql(ListCoins)(Coins);

// class AddCoin extends React.Component {
//   state = { id: '', name: '', price_usd: '' }

//   onChange(event, type) {
//     this.setState({
//       [type]: event.target.value
//     })
//   }

//   render() {
//     return (
//       <div>
//         <input onChange={(event) => this.onChange(event, "id")} />
//         <input onChange={(event) => this.onChange(event, "name")} />
//         <input onChange={(event) => this.onChange(event, "price_usd")} />
//         <button onClick={() => this.props.createCoin({
//             id: this.state.id,
//             name: this.state.name,
//             price_usd: this.state.price_usd
//           })}>
//           Add
//       </button>
//       </div>
//     );
//   }
// }
// const AddCoinsOffline = graphql(NewCoin, ListCoins, 'Coin')(AddCoin);
// const AddCoinsOffline = graphqlMutation(NewCoin, ListCoins, 'Coin')(App);
// export default graphql(listCoins, {
//   options: {
//     fetchPolicy: 'cache-and-network'
//   },
//   props: props => ({
//     coins: props.data.listCoinsAPI })
// })(App)


export default compose(
  graphqlMutation(NewCoin, ListCoins, 'Coin'),
  graphql(listCoins, {
    options: {
      fetchPolicy: 'cache-and-restart'
    },
    props: props => ({
      coins: props.data.listCoinsAPI
    })
  })
)(App);