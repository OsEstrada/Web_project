import React from 'react';
import API from '../../utils/apiUrlBase';
import AddAccount from './AddAccount';
import RegisterCard from './RegisterCard';

export default class Views extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			account_list: []
		};
	}

	// componentDidMount() {
	//   let options = {
	//     headers: {
	//       Accept: 'application/json'
	//     }
	//   };
	//   fetch(`${API.baseURL}/accounts`, options)
	//     .then((res) => {
	//       return res.json();
	//     })
	//     .then((data) => {
	//       console.log(data);
	//       data.map((element) => this.state.account_list.push(element));
	//     })
	//     .then(console.log(this.state.account_list))
	//     .catch((err) => console.log('Ocurrio un error en la conexion'));
	// }

	componentDidMount() {
		let options = {
			headers: {
				Accept: 'application/json'
			}
		};
		fetch(`${API.baseURL}/accounts`, options)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				console.log(data);
				data.map((element) => this.state.account_list.push(element));
			})
			.catch((err) => console.log('Ocurrio un error en la conexion'));
	}

	handleSubmit(account) {
		let options = {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
				Accept: 'application/json'
			},

			body: JSON.stringify(account)
		};

		fetch(`${API.baseURL}/accounts/create`, options)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				console.log(data);
				let list = this.state.account_list.slice();

				this.setState({
					account_list: list.concat([ data.account ])
				});
			})
			.catch((err) => console.log('Ocurrio un error en la conexion'));
  }
  
  handleDelete(account){

    let options ={
        method : "DELETE",
        headers : {
            "Content-type" : "application/json",
            Accept: "application/json"
        },

        body :  JSON.stringify({id:account._id})
    }

    fetch(`${API.baseURL}/accounts/delete`,options)
    .then(res =>{return res.json()})
    .then(data=>{
        console.log(data);

        let index = this.state.account_list.find(value=>{
            return value._id === account._id;
        })

        let buffer_list = this.state.account_list.slice();
        buffer_list.splice(index, 1);

        this.setState({
            account_list: buffer_list
        });
    })
    .catch(err => console.log("Ocurrio un error en la conexion"))
}

	render() {
		return (
			<div style={{ width: '100%' }}>
				<AddAccount
					onSubmit={(account) => {
						this.handleSubmit(account);
					}}
				/>

        <div style={{display:'flex', flexFlow: 'row wrap', justifyContent: 'center'}}>
          {this.state.account_list.map((element) => {
            return <RegisterCard key={element._id} account={element} onDelete= {()=>{
                    this.handleDelete(element);
                }} />;
          })}
        </div>
			</div>
		);
	}
}
