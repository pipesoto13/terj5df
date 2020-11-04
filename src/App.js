import React, { Component } from 'react';

class App extends Component {

  constructor() {
    super();

    this.state = {
      name: '',
      lastName: '',
      rows: []
    };
  }

    updateName(e){
      this.setState({
        name: e.target.value
      })
    }
    
    updatelastName(e){
      this.setState({
        lastName: e.target.value
      })
    }

    addGuest(e){
      e.preventDefault();
      const guest = {
        name: this.state.name,
        lastName: this.state.lastName
      }
      const oldRows = this.state.rows;
      const newRows = oldRows.concat(guest);
      this.setState({
        rows: newRows,
        name: '',
        lastName: '',
      });
    }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <form onSubmit={this.addGuest.bind(this)}>
              <div className="form-group">
                <label htmlFor="first-name">Nombre</label>
                <input type="text" className="form-control" name="first-name" value={this.state.name} onChange={this.updateName.bind(this)}/>
              </div>

              <div className="form-group">
                <label htmlFor="last-name">Apellido</label>
                <input type="text" className="form-control" name="last-name" value={this.state.lastName} onChange={this.updatelastName.bind(this)}/>
              </div>

              <div className="action">
                <button type="submit" className="btn btn-primary">Agregar Invitado</button>
              </div>
            </form>

            <table className="table bordered-table table-striped">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                </tr>              
              </thead>
              <tbody>
                {this.state.rows.map((row, index) => <tr key={index}><td>{row.name}</td><td>{row.lastName}</td></tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default App


