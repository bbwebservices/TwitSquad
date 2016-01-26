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
		
      	this.props.navigator.push({
            component: AccountChoice,
            title: 'Account Choice'
        })

    },

    componentWillUnmount: function () {
    	
    },

	render: function () {
		return (
            <View style={styles.container}>

              <Text style={styles.introText}>Welcome to Super Twitter Bot Beta!</Text>
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

                <TouchableHighlight style={styles.button} onPress={ this.props.getAccts, this.goToAccountsPage }>
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
        marginRight: 5,
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
        width: 200,
        borderColor: 'lightblue',
        borderWidth: 2,
        marginBottom: 20,
        padding: 5,
        justifyContent: 'center',
        color: 'blue',
        backgroundColor: '#ffffff'
    },
    introText: {
        marginTop: 200,
        fontStyle: 'italic',
        fontSize: 19,
        color: 'blue'
    },
    intoSubText: {
        fontSize: 14,
        marginBottom: 30,
        color: 'grey'
    }
});

module.exports = Login;