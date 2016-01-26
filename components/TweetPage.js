var React = require('react-native');

var {
	StyleSheet,
	Text,
	View,
	ListView,
	ScrollView,
	TouchableHighlight,
} = React;

var TweetPage = React.createClass({
	render: function () {
		return (
			<View style={styles.container}>
				<Text>Name: yoooo </Text>
				<Text>Profile: hey </Text>
			</View>
		)
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
        flexDirection: 'column',
		justifyContent: 'center'
	}
});

module.exports = TweetPage;
