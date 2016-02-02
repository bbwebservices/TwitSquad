/**
 * Sample React Native App
 * http://github.com/facebook/react-native
 */
'use strict';
 
var React = require('react-native');
var AccountChoice = require('./components/AccountChoice.js');
var Login = require('./components/Login.js');
 
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
var url2 = 'http://damp-wave-78637.herokuapp.com'
 
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
        count_to_add: null,
        access_token: null,
        expiry: null,
        uid: null,
        client: null,
        token_type: null,
        accounts_retrieved: false,
        account_denied: false,
        animating: false,
        firstAttempt: true
      }
    },

    startLoader: function (value) {

      this.setState({
        animating: value
      })

    },

    isFirstAttempt: function (value) {
      this.setState({
        firstAttempt: false
      })
    },

    isAccountDenied: function (value) {
      this.setState({
        account_denied: value,
      });
    },

    clean: function () {
      this.replaceState(this.getInitialState());
      console.log("cleaned up: ", this.state);

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

    checkCreds: function (func) {

      // Do i really need this Promise?
      var p1 = new Promise(
        function (resolve, reject) {
          fetch("http://damp-wave-78637.herokuapp.com/auth/sign_in?email="+this.state.username+"&password="+this.state.password+"", {method: "Post"})
          .then((response) => {
            if(!response.headers.map.client) {
              this.isAccountDenied(true);
            } else {
              this.setState({
                account_denied: false,
                user_headers: response.headers
              })
            }
            console.log('heads: ', this.state.user_headers);
            
          })
          .done(function () {
              resolve(this.setHead(this.state.user_headers, func));
            
          }.bind(this));
        }.bind(this)
      )
      .then(function (data) {
       
      })
    },

    setHead: function (arr, func) {
      
      var p1 = new Promise(
        function (resolve, reject) {
          console.log('arr: ', arr);
          var headers = {};
          if(arr){
            this.setState({
              access_token: arr.map['access-token'][0],
              client: arr.map['client'][0],
              expiry: arr.map['expiry'][0],
              token_type: arr.map['token-type'][0],
              uid: arr.map['uid'][0]
            })
          }
          headers = { ['access-token']: this.state.access_token, 
                      ['client']: this.state.client, 
                      ['expiry']: this.state.expiry, 
                      ['token-type']: this.state.token_type,
                      ['uid']: this.state.uid 
                    }
          
          console.log('HEADERS! ', this.state.access_token, this.state.client, this.state.expiry, this.state.token_type, this.state.uid);
          this.setState({
            user_headers: headers
          });
          resolve(headers)
        }.bind(this)
      )
      .then(function (value) {
        console.log('in head prom', value);
        this.getAccts( value, func );
      }.bind(this))

    },

    getAccts: function ( value, func ) {
      
      console.log('get accts', value);
      fetch('http://damp-wave-78637.herokuapp.com/accounts', {
        method: 'GET',
        headers: value
      })
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            twitter_accounts: responseData
          })
          console.log('ACCTS: ', this.state.twitter_accounts);

        })
        .done(function () {
          console.log('ACCTS: ', this.state.twitter_accounts);
          this.setState({
            accounts_retrieved: true
          })
          func()
        }.bind(this));
        
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

        fetch('http://damp-wave-78637.herokuapp.com/accounts/'+this.state.current_account.route+'/add_term?utf8=%E2%9C%93&body='+this.state.term_to_add+'&count='+this.state.count_to_add+'&commit=Add', {
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
      fetch('http://damp-wave-78637.herokuapp.com/accounts/'+this.state.current_account.route+'/destroy_term?term_id='+id+'', {
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
        fetch("http://damp-wave-78637.herokuapp.com/accounts/1/follow_tweeters", {method: "GET"})
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
                   accessToken={this.state.access_token}
                   accountsRetrieved={this.state.accounts_retrieved}
                   isLoading={this.startLoader}
                   animating={this.state.animating}
                   accountDenied={this.state.account_denied}
                   isAccountDenied={this.isAccountDenied}
                   clean={this.clean}
                   isFirstAttempt={this.isFirstAttempt}
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
