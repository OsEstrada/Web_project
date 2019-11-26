import React from 'react';
import { connect } from 'react-redux';
import Principal from './Principal';
import userActions from '../../actions/user.actions';

class Home extends React.Component {

	componentDidMount() {
		this.props.getUsers();
	}

	render() {
		const {user} = this.props;

		return (
			<Principal user={user}/>
		);
	}
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
}

const connectedHomePage = connect(mapState, actionCreators)(Home);
export { connectedHomePage as Home };