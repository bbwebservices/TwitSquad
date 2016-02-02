var React = require('react-native');

var {
	StyleSheet,
	Text,
	View,
	ListView,
	ScrollView,
	TouchableHighlight,
	TextInput
} = React;

var TweetPage = React.createClass({
	
	render: function () {
		console.log('props', this.props)

		// create terms list
		var keyNum = 0;
		var terms = this.props.currentAccount.terms.map(function (element) {
			keyNum++;
			return (
				<View key={keyNum} style={styles.term}>
					<Text>{element.body}</Text>
					<TouchableHighlight>
						<Text>{element.count}</Text>
					</TouchableHighlight>
					<TouchableHighlight onPress={function(){this.props.removeTerm(element.id)}.bind(this)}>
						<Text>X</Text>
					</TouchableHighlight>
				</View>
			)
		}.bind(this))

		return (
			<View style={styles.container}>
				<Text style={styles.accountName}>{this.props.currentAccount.name}</Text>
				<View> 
					<Text>Terms:</Text> 
					{terms} 
				</View>
				<Text style={{marginTop: 20}}>Term:</Text>
				<TextInput style={{height: 40, borderColor: 'grey', borderWidth: 1}} onChangeText={function (text) {this.props.addTerm(text)}.bind(this)}/>

				<Text style={{marginTop: 10}}>Count:</Text>
				<TextInput style={{height: 40, borderColor: 'grey', borderWidth: 1}} onChangeText={function (text) {this.props.addCount(text)}.bind(this)}/>

				<TouchableHighlight onPress={this.props.saveTerm}>
					<Text>Add Term</Text>
				</TouchableHighlight>
			</View>
		)
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
        flexDirection: 'column',
		justifyContent: 'center',
		padding: 10
	},
	term: {
		flexDirection: 'row',
		borderColor: 'black',
		borderBottomWidth: 1
	},
	accountName: {
		fontStyle: 'italic',
		fontSize: 30
	}
});

module.exports = TweetPage;
