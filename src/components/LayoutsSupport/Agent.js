import React from 'react';
import { CometChat } from '@cometchat-pro/chat';
import ResponsiveDrawer from '../LayoutsSupport/index';
import config from '../../utils/config';

const agentUID = config.agentUID;
const AGENT_MESSAGE_LISTENER_KEY = 'agent-listener'
const limit = 30;

class Agent extends React.Component {
	state = {
		customers: [],
		selectedCustomer: '',
		chat: [],
		chatIsLoading: false,
		customerIsLoading:true
	  }
	
	  componentDidMount(){
		this.fetchAuthToken(agentUID).then(
		  authToken => {
			console.log('auth token fetched', authToken);
			CometChat.login(authToken)
			.then( user => {
			  console.log("Login successfully:", { user });
			  this.fetchUsers().then(result => {
				this.setState({
				  customers: result,
				  customerIsLoading: false
				})
			  });
			  
			  CometChat.addMessageListener(
				AGENT_MESSAGE_LISTENER_KEY,
				new CometChat.MessageListener({
				  onTextMessageReceived: message => {
					let {customers, selectedCustomer, chat} = this.state;
					console.log("Incoming Message Log", { message });
					if(selectedCustomer === message.sender.uid){
					  chat.push(message);
					  this.setState({
						chat
					  })
					} else {
					  let aRegisteredCustomer = customers.filter( customer => { return customer.uid === message.sender.uid }); 
					  if(!aRegisteredCustomer.length){
						customers.push(message.sender)
						this.setState({
						  customers
						})
					  }
					}
				  }
				})
			  );
		   })
		  },
		  error => {
			console.log('Initialization failed with error:', error);
		  }
		);
	  }
	
	  fetchAuthToken = async uid => {
		const response = await fetch(`/api/auth?uid=${uid}`)
		const result = await response.json()
		return result.authToken;
	  }
	
	  fetchUsers = async () => {
		const response = await fetch(`/api/users`)
		const result = await response.json()
		return result;
	  }
	
	  handleSubmit = event => {
		event.preventDefault();
		let message = this.refs.message.value;
	
		var textMessage = new CometChat.TextMessage(
		  this.state.selectedCustomer,
		  message,
		  CometChat.MESSAGE_TYPE.TEXT,
		  CometChat.RECEIVER_TYPE.USER
		);
	
		CometChat.sendMessage(textMessage).then(
		  message => {
			let {chat} = this.state;
			console.log('Message sent successfully:', message);
			chat.push(message);
			this.setState({
			  chat
			})
		  },
		  error => {
			console.log('Message sending failed with error:', error);
		  }
		);
		this.refs.message.value='';
	  }
	
	  componentWillUnmount(){
		CometChat.removeMessageListener(AGENT_MESSAGE_LISTENER_KEY);
		CometChat.logout();
	  }
	
	  selectCustomer = uid => {
		this.setState({
		  selectedCustomer: uid
		}, ()=> {this.fetchPreviousMessage(uid)})
	  }
	
	  fetchPreviousMessage = uid => {
		this.setState({
		  chat: [],
		  chatIsLoading: true
		}, () => {
		  var messagesRequest = new CometChat.MessagesRequestBuilder()
		  .setUID(uid)
		  .setLimit(limit)
		  .build();
	
		  messagesRequest.fetchPrevious().then(
			messages => {
			  console.log("Message list fetched:", messages);
			  this.setState({
				chat: messages,
				chatIsLoading: false
			  })
			},
			error => {
			  console.log("Message fetching failed with error:", error);
			}
		  );
		});
	  }

	render() {
		return (
			<ResponsiveDrawer
				{...this.state}
				selectCustomer={this.selectCustomer}
				onSubmit={(message) => this.handleSubmit(message)}
			/>
		);
	}
}

export default Agent;
