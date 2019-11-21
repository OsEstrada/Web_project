import React from 'react';
import API from '../../utils/apiUrlBase';
import CardAccount from './CardUsers'
import {Typography, Divider} from '@material-ui/core';

export default class Views extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_list: []
    };
  }

  componentDidMount() {
    let options = {
      headers: {
        Accept: "application/json"
      }
    };
    fetch(`${API.baseURL}/users`, options)
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        this.setState({ user_list: this.state.user_list.concat(data) });
      })
      .catch(err => console.log("Ocurrio un error en la conexion"));
  }

  /* No se si el super usuario puede editar usuarios
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
  */

  handleDelete(account) {
    let options = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      },

      body: JSON.stringify({ id: account._id })
    };

    fetch(`${API.baseURL}/accounts/delete`, options)
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);

        let element = this.state.account_list.find(value => {
          return value._id === account._id;
        });

        let buffer_list = this.state.account_list.slice();

        let index = buffer_list.indexOf(element);

        buffer_list.splice(index, 1);

        this.setState({
          account_list: buffer_list
        });
      })
      .catch(err => console.log("Ocurrio un error en la conexion"));
  }

  render() {
    return (
      <div>
      <Typography variant ="h1" style={{
        fontSize:'1.75em',
        textAlign:'center',
        marginBottom:'1em'
      }}
      >Usuarios registrados</Typography>
       <Divider />
        <div
          style={{
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "center"
          }} >
          {this.state.user_list.map(element => {
            return (
              <CardAccount
                key={element._id}
                user={element}
                onDelete={() => {
                  this.handleDelete(element);
                }}
              />
            );
          })}
        </div>
        <Divider/>
      </div>
    );
  }
}
