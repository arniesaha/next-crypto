import React from 'react';
import gql from 'graphql-tag'
import { compose, graphql } from "react-apollo";
import { graphqlMutation } from 'aws-appsync-react' 
import { buildSubscription } from 'aws-appsync';
import { Auth } from 'aws-amplify';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

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

const SubscribeCoins = gql`
subscription{
  onCreateCoin{
    id
    name
    price_usd
    rank
    symbol
    fav
    notes
  }
  onUpdateCoin{
    id
    name
    price_usd
    rank
    symbol
    fav
    notes
  }
}`

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
        {this.createCoinFromAPI(this.props.coins)}
      </React.Fragment>
    );
  }
}

class Coins extends React.Component {
  state = {
    editing: {},
    edits: {}
  };

  componentDidMount(){
    this.props.data.subscribeToMore(
      buildSubscription(SubscribeCoins, listCoinDynamo)
    );
  }

  handleEditClick = (coin, e) => {
    const { editing, edits } = this.state;

    editing[coin.id] = true;
    edits[coin.id] = { ...coin };

    this.setState({ editing, edits });
  }

  handleCancelClick = (id, e) => {
    const { editing } = this.state;

    delete editing[id];

    this.setState({ editing });
  }

  handleSaveClick = (coinId) => {
    const { edits: { [coinId]: data }, editing } = this.state;
    
    const { id, name, price_usd, rank, symbol, fav, notes } = data;  
    
    this.props.updateCoin ({
      id,
      name,
      price_usd,
      rank,
      symbol,
      fav,
      notes
    });

    delete editing[coinId];

    this.setState({ editing });
  }

  // handleDeleteClick = (coinId, e) => {
  //   e.preventDefault();
  //   e.stopPropagation();

  //   if (!global.confirm('Are you sure?')) {
  //     return;
  //   }

  //   this.props.deleteCoin({ id: coinId });
  // }

  onChange(coin, field, event) {
    const { edits } = this.state;

    edits[coin.id] = edits[coin.id] || {};

    let value;

    switch (field) {
      case 'fav':
        value = event.target.checked;
        break;
      default:
        value = event.target.value;
        break;
    }

    edits[coin.id][field] = value;

    this.setState({ edits });
  }

  renderCoin = (coin) => {
    const { editing, edits } = this.state;

    const isEditing = editing[coin.id];
    const currValues = edits[coin.id];

    return (
      isEditing ?
      <Paper style={{maxWidth: '600px', marginTop: '100px'}}>
        <div id={coin.id} style={{display: 'flex', justifyContent: 'center'}}>
          <input type="text" value={currValues.notes || ''} onChange={this.onChange.bind(this, coin, 'notes')} placeholder="Notes"/>
          <FormControlLabel style={{display: 'flex', justifyContent: 'center'}}
            control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" checked={currValues.fav === true} onChange={this.onChange.bind(this, coin, 'fav') }/>}
          />
          <button onClick={this.handleSaveClick.bind(this, coin.id)}>Save</button>
          <button onClick={this.handleCancelClick.bind(this, coin.id)}>Cancel</button>
        </div></Paper>
        :
        <Paper style={{maxWidth: '600px', marginTop: '100px'}}>
        <div id={coin.id} onClick={this.handleEditClick.bind(this, coin)} style={{justifyContent: 'center'}}>
          <h4 style={{display: 'flex', justifyContent: 'center'}}>{coin.name}</h4>
          <h4 style={{display: 'flex', justifyContent: 'center'}}>{coin.symbol}</h4>
          <h4 style={{display: 'flex', justifyContent: 'center'}}>{coin.price_usd}</h4>
          <h4 style={{display: 'flex', justifyContent: 'center'}}>{coin.rank}</h4>
          <h4 style={{display: 'flex', justifyContent: 'center'}}>{coin.notes}</h4>
          <FormControlLabel style={{display: 'flex', justifyContent: 'center'}}
            control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" checked={coin.fav === true} onChange={this.onChange.bind(this, coin, 'fav') }/>}
          />
        </div>
        </Paper>);
  }


  render() {
    const { listCoins, refetch } = this.props.data;
    return (

        <React.Fragment>
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <ul>{listCoins && [...listCoins.items].sort((a, b) => a.name.localeCompare(b.name)).map(this.renderCoin)}</ul>
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <button onClick={() => refetch()}>Refresh</button> 
        </div>
        
      </React.Fragment>
    )
  }
}

const AllCoinsWithData = compose(
  graphql(listCoinDynamo),
  graphqlMutation(UpdateCoin, listCoinDynamo, 'Coin')
 )(Coins);

export default compose(
  graphqlMutation(NewCoin, listCoinDynamo, 'Coin'),
  graphql(listCoins, {
    options: {
      fetchPolicy: 'cache-and-restart'
    },
    props: props => ({
      coins: props.data.listCoinsAPI
    })
  })
)(App);