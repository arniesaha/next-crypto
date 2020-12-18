import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import React from 'react';
import gql from 'graphql-tag'
import { buildSubscription } from 'aws-appsync';

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

export default Coins;