import React from 'react';
import gql from 'graphql-tag'
import { compose, graphql } from "react-apollo";
import { graphqlMutation } from 'aws-appsync-react' 
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Coins from './Coins';


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

const listCoinDynamo = gql`
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

const NewCoin = gql`mutation createCoin(
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

const UpdateCoin = gql`
mutation(
  $id: ID! 
  $name: String
  $price_usd: String
  $rank: String
  $symbol: String
  $fav: Boolean
  $notes: String) {
  updateCoin(input:{
    id: $id
    name: $name
    price_usd: $price_usd
    rank: $rank
    symbol: $symbol
    fav: $fav
    notes: $notes
  }){
    id
    name
    price_usd
    rank
    symbol
    fav
    notes
  }
}`

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {userInfo: null};
    Auth.currentUserInfo().then(info => {
      this.setState({userInfo: info});
    })
  }
  // createCoinFromAPI = (coins) => {
  //   // console.log(coins);
    
  //   coins.map((coin) => {

  //     const coinItem = {
  //         id: parseInt(coin.id),
  //         name: coin.name,
  //         price_usd: coin.price_usd,
  //         rank: parseInt(coin.rank),
  //         symbol: coin.symbol,
  //         fav: false,
  //         notes: ''
  //     }

  //     // console.log(coinItem);
  //     // this.props.createCoin(coinItem);
    
  //   })        
  // }

  render() {
    return (
     <React.Fragment>
        <CssBaseline/>
        <AppBar position="fixed" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit" style={{flex: 1}}>
              Crypto Notes
            </Typography>
            <Typography variant="subheading" style={{margin: "0 10px"}}>
            </Typography>
            <Button onClick={() => {
              Auth.signOut().then(() => location.reload());
            }}>
              Sign Out
            </Button>
          </Toolbar>
        </AppBar>
        <AllCoinsWithData />
        {/* {this.createCoinFromAPI(this.props.coins)} */}
      </React.Fragment>
    );
  }
}

const AllCoinsWithData = compose(
  graphql(listCoinDynamo),
  graphqlMutation(UpdateCoin, listCoinDynamo, 'Coin')
 )(Coins);

export default withAuthenticator(App);
// export default compose(
//   graphqlMutation(NewCoin, listCoinDynamo, 'Coin'),
//   graphql(listCoins, {
//     options: {
//       fetchPolicy: 'cache-and-restart'
//     },
//     props: props => ({
//       coins: props.data.listCoinsAPI
//     })
//   })
// )(App);