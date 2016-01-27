var React = require('react-native');
var AccountChoice = require('./AccountChoice.js');

var {
    AppRegistry,
    TextInput,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    AlertIOS,
} = React;

var Login = React.createClass({
	
	goToAccountsPage: function () {
	// **********THIS IS WHERE WE NEED TO CHECK THE CREDS**********

		var p1 = new Promise(function(){
			this.props.checkCreds(); 
		}.bind(this)).then(function (value) {
			
				console.log('in nav');
				this.props.navigator.push({
		            component: AccountChoice,
		            title: 'Account Choice'
		        })
		       
		        // Add route id to each Account
		        var routeNum = 1
		        this.props.twitterAccounts.forEach(function (element) {
		        	element.route = routeNum;
		        	routeNum++;
		        })
		        return;
			
		}.bind(this)).catch(function (err) {
			console.log('error: ', err)
		})
		 
      
    },

    componentWillUnmount: function () {
    	
    },

	render: function () {
		return (
            <View style={styles.container}>

              <Text style={styles.introText}>Welcome to TwitSquad Beta!</Text>
              <Text style={styles.intoSubText}>to continue, please enter your username and password</Text>

              <Text>Username:</Text>
              <TouchableHighlight>
                <TextInput style={styles.textInput} onChangeText={this.props.setUser} />    
              </TouchableHighlight>

              <Text>Password:</Text>
              <TouchableHighlight>
                <TextInput style={styles.textInput} onChangeText={this.props.setPassword} />    
              </TouchableHighlight>

              <View style={styles.buttonCont}>
                
                <TouchableHighlight style={styles.button}>
                 <Text>Sign Up</Text>  
                </TouchableHighlight>

                <TouchableHighlight style={styles.button} onPress={ this.goToAccountsPage }>
                 <Text>Login</Text>  
                </TouchableHighlight>

              </View>

            </View>
        )
	}
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',

    },
    button: {
        backgroundColor: 'lightblue',
        padding: 10,
        marginRight: 10,
        marginLeft: 5,
        borderColor: '#b6b6b6',
        borderWidth: 1

    },
    buttonCont: {
        flexDirection: 'row',
        marginTop: 20
    },
    textInput: {
        height: 40,
        width: 300,
        borderColor: 'lightblue',
        borderWidth: 2,
        marginBottom: 30,
        padding: 5,
        justifyContent: 'center',
        color: 'blue',
        backgroundColor: '#ffffff'
    },
    introText: {
        marginTop: 200,
        marginBottom: 10,
        fontStyle: 'italic',
        fontSize: 25,
        color: 'blue'
    },
    intoSubText: {
        fontSize: 15,
        marginBottom: 40,
        color: 'grey'
    }
});

module.exports = Login;