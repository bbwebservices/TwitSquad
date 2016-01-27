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

var url1 = 'http://localhost:3000'
var url2 = 'https://damp-wave-78637.herokuapp.com'
 
var SuperTwitBotBeta = React.createClass({

    getInitialState: function () {
      return {
        username: '',
        password: '',
        user_headers: null,
        current_route: null,
        twitter_accounts: null,
        current_account: null,
        current_account_token: null,
        term_to_add: null,
        count_to_add: null
      }
    },

    componentWillMount: function () {
      fetch('https://damp-wave-78637.herokuapp.com/accounts')
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            twitter_accounts: responseData
          })
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
      this.setState({
        current_account: currAcct[0]
      })
      console.log('current account state', this.state);
    },

    setUser: function (input) {
      this.setState({username: input});
    },

    setPassword: function (input) {
      this.setState({password: input});
    },

    checkCreds: function () {  
      fetch("http://damp-wave-78637.herokuapp.com/auth/sign_in?email="+this.state.username+"&password="+this.state.password+"", {method: "Post"})
        .then((response) => {
          this.setState({
            user_headers: response.headers
          })
          console.log('user_headers ', this.state.user_headers.map);

        })
        .then((responseData) => {
            console.log('State: ', this.state.user_headers.map['access-token'][0]);
            this.getAccts();
        })
        .done();
    },

    getAccts: function () {
      console.log('get accts');
      fetch('https://damp-wave-78637.herokuapp.com/accounts', {
        method: 'GET',
        headers: this.state.user_headers.map 
      })
            .then((response) => response.json())
            .then((responseData) => {
              this.setState({
                twitter_accounts: responseData
              })
            })
            .done();
      console.log('twitter accts: ', this.state.twitter_accounts)
    },

    setHeaders: function () {
      fetch("http://damp-wave-78637.herokuapp.com/auth/sign_in?email="+this.state.username+"&password="+this.state.password+"", {method: "Post"})
        .then((response) => {
          this.setState({
            user_headers: response.headers
          })
          console.log('user_headers ', this.state.user_headers.map);

        })
        .then((responseData) => {
            console.log('State: ', this.state.user_headers.map['access-token'][0]);
        })
        .done();
    },


    setCurrentAccount: function () {

    },

    addTerm: function (text) {
      this.setState({
        term_to_add: text
      })
    },

     addCount: function (text) {
      this.setState({
        count_to_add: text
      })
    },

    saveTerm: function () {
      if(this.state.count_to_add && this.state.term_to_add) {
        console.log(this.state.current_account)
        console.log('term: ', this.state.term_to_add);
        console.log('count: ', this.state.count_to_add);

        fetch('https://damp-wave-78637.herokuapp.com/accounts/'+this.state.current_account.route+'/add_term?utf8=%E2%9C%93&body='+this.state.term_to_add+'&count='+this.state.count_to_add+'&commit=Add', {
          method: 'GET',
          headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Content-Type': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',

          }
        })
      }
      else {
        console.log('pls add text');
      }
    },

    removeTerm: function (id) {
      fetch('https://damp-wave-78637.herokuapp.com/accounts/'+this.state.current_account.route+'/destroy_term?term_id='+id+'', {
        method: 'GET',
        headers: {
          'Accept': 'text/html, application/xhtml+xml, application/xml',
          'Content-Type': 'text/html, application/xhtml+xml, application/xml'
        }
      })
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
        fetch("https://damp-wave-78637.herokuapp.com/accounts/1/follow_tweeters", {method: "GET"})
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
                   addTerm={this.addTerm}
                   addCount={this.addCount}
                   saveTerm={this.saveTerm}
                   removeTerm={this.removeTerm}
                   checkCreds={this.checkCreds}
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
