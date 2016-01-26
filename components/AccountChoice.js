var React = require('react-native');
var TweetPage = require('./TweetPage.js');

var {
	StyleSheet,
	Text,
	View,
	ListView,
	ScrollView,
	TouchableHighlight,
} = React;

var AccountChoice = React.createClass({

	goToTweetPage: function (id) {
		console.log(id)
		this.props.navigator.push({
        	component: TweetPage,
        	title: 'Account Management',
        	passProps: {
        		username: this.props.username,
        		password: this.props.password,
        		twitterAccounts: this.props.twitterAccounts,
        		currentAccount: this.props.currentAccount,
        		saveId: this.props.saveId
        	}
      	})

	},

	render: function () {
		return (
			<View style={styles.container}>

				<View style={styles.introTextCont}>
					<Text>Hello {this.props.username}!</Text>
					<Text style={styles.introText}>Which Account Do You Want To Manage?</Text>
				</View>

				<View>
					<ScrollView
						automaticallyAdjustContentInsets={false}
						onScroll={function(){console.log('scrolling!')}} 
						scrollEventThrottle={200}
						>
						{this.props.twitterAccounts.map(function (acct) {
							return <TouchableHighlight onPress={this.goToTweetPage, this.props.saveId} style={styles.listItem}><Text>{acct.name}</Text></TouchableHighlight>
						}.bind(this))}
					</ScrollView>
					
				</View>
			</View>
		)
	}
})

var styles = StyleSheet.create({
	container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

    scrollView: {
	    backgroundColor: '#6A85B1',
	    height: 300
	},

	horizontalScrollView: {
	    height: 120,
	},

	introTextCont: {
		marginTop: 150,
		marginBottom: 30
	},

	introText: {
		fontSize: 20,
		fontStyle: 'italic'
	},

	listItem: {
		width: 400,
		height: 40,
		backgroundColor: 'lightblue',
		borderBottomColor: 'lightblue',
		justifyContent: 'center',
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		borderRadius: 5,
		marginBottom: 10,
		paddingLeft: 5
	}
})

module.exports = AccountChoice;