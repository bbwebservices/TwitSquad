/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
 
var React = require('react-native');
var AccountChoice = require('./components/AccountChoice.js');
var Login = require('./components/Login.js')
 
var {
    AppRegistry,
    TextInput,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    AlertIOS,
    Navigator
} = React;
 
var SuperTwitBotBeta = React.createClass({

    getInitialState: function () {
      return {
        username: '',
        password: '',
        current_route: null,
        twitter_accounts: null,
        current_account_token: null
      }
    },

    componentWillMount: function () {
      fetch('https://damp-wave-78637.herokuapp.com/accounts')
        .then((response) => response.json())
        .then((responseData) => {
          console.log('responseData: ', responseData);
          this.setState({
            twitter_accounts: responseData
          })
          console.log('state: ', this.state);
        })
        .done();
    },

    saveId: function (id) {
      var currAcct = this.state.twitter_accounts.filter(function (element) {
        if(element.name === id){
          return true;
        }
        return false;
      })

      console.log('current account', currAcct());
    },

    setUser: function (input) {
      this.setState({username: input});
    },

    setPassword: function (input) {
      this.setState({password: input});
    },

    checkCreds: function () {  
    // need to update this for correct routes    
      fetch('/accounts.json', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      })

    },

    getAccts: function () {

      console.log('get accts');

    },

    setCurrentAccount: function () {

    },
  
    _onPressButtonTWEET: function() {
        fetch("http://localhost:3000/accounts/1/send_tweet", {method: "GET"})
        .then((response) => response.json())
        .then((responseData) => {
            AlertIOS.alert(
                "GET Response",
                "Search Query -> " + responseData
            )
        })
        .done();
    }, 
    _onPressButtonFAVE: function() {
        fetch("http://localhost:3000/accounts/1/favorite_tweet", {method: "GET"})
        .then((response) => response.json())
        .then((responseData) => {
            AlertIOS.alert(
                "GET Response",
                "Search Query -> " + responseData
            )
        })
        .done();
    },
    _onPressButtonRETWEET: function() {
        fetch("http://localhost:3000/accounts/1/retweets", {method: "GET"})
        .then((response) => response.json())
        .then((responseData) => {
            AlertIOS.alert(
                "GET Response",
                "Search Query -> " + responseData.search
            )
        })
        .done();
    },
 
    _onPressButtonFOLLOW: function() {
        fetch("http://localhost:3000/accounts/1/follow_tweeters", {method: "GET"})
        .then((response) => response.json())
        .then((responseData) => {
            AlertIOS.alert(
                "GET Response",
                "Search Query -> " + responseData.search
            )
        })
        .done();
    },

    _renderScene: function (route, navigator) {

      var Component = route.component;
      var username = this.state.username;
      var password = this.state.password;
      var twitterAccounts = this.state.twitter_accounts;

      return (
        <Component name={route.name} 
                   setUser={this.setUser}
                   setPassword={this.setPassword}
                   checkCreds={this.checkCreds}
                   username={this.state.username}
                   password={this.state.password} 
                   twitterAccounts={this.state.twitter_accounts}
                   currentAccount={this.state.current_account}
                   saveId={this.saveId}
                   getAccts={this.getAccts} 
                   {...route.props} 
                   navigator={navigator} 
                   route={route} />
      )
    },
 
    render: function() {
        return (
              <Navigator
                  initialRoute={{name: 'Login', component: Login, index: 0}}
                  renderScene={this._renderScene} />
        );
    }
});

var placeHolders = {
  username: 'username',
  password: 'password'
}

AppRegistry.registerComponent('SuperTwitBotBeta', () => SuperTwitBotBeta);
