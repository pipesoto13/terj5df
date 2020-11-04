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

/* 
Nuestra solucion es la siguiente:

class App extends Component {
  constructor() {
    super()
    this.state = {
      guests: [],
      errors: {
        firstName: false,
        lastName: false
      }
    }
  }
  validateForm(firstName, lastName) {
    if (!firstName || !lastName) {
      this.setState({
        errors: {
          firstName: !firstName,
          lastName: !lastName
        }
      })
      return false
    }
    return true
  }
  addGuest(event) {
    event.preventDefault()
    const firstName = event.target['first-name'].value
    const lastName = event.target['last-name'].value
    if (this.validateForm(firstName, lastName)) {
      const newGuest = {
        firstName: firstName,
        lastName: lastName,
      }
      this.setState({
        guests: [...this.state.guests, newGuest],
        errors: {
          firstName: false,
          lastName: false
        }
      })
      event.target.reset()
    }
  }
  renderGuest(guest, index) {
    return (
      <tr key={index}>
        <td>{guest.firstName}</td>
        <td>{guest.lastName}</td>
      </tr>
    )
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <form onSubmit={this.addGuest.bind(this)}>
              <div className={`form-group ${this.state.errors.firstName ? 'has-error' : null}`}>
                <label htmlFor="first-name">Nombre</label>
                <input type="text" className="form-control" name="first-name" />
              </div>

              <div className={`form-group ${this.state.errors.lastName ? 'has-error' : null}`}>
                <label htmlFor="last-name">Apellido</label>
                <input type="text" className="form-control" name="last-name" />
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
                {this.state.guests.map(this.renderGuest)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}
Lo primero que hacemos es encapsular un poco de JSX dentro del metodo renderGuest para crear la fila de cada invitado:

  renderGuest(guest, index) {
    return (
      <tr key={index}>
        <td>{guest.firstName}</td>
        <td>{guest.lastName}</td>
      </tr>
    )
  }
esa función la usamos dentro del map que hacemos en el metodo render

{this.state.guests.map(this.renderGuest)}
Luego de tener esto listo le agregamos al formulario el evento onSubmit para que dispare la función addGuest.

addGuest se ve de la siguiente manera:

addGuest(event) {
  event.preventDefault()
  const firstName = event.target['first-name'].value
  const lastName = event.target['last-name'].value
  if (this.validateForm(firstName, lastName)) {
    const newGuest = {
      firstName: firstName,
      lastName: lastName,
    }
    this.setState({
      guests: [...this.state.guests, newGuest],
      errors: {
        firstName: false,
        lastName: false
      }
    })
    event.target.reset()
  }
}
En esta función es donde esta la mayor parte de la funcionalidad, acá lo que estamos haciendo es primero tomando los valores de los inputs, luego hacemos una validación de si estos valores son aceptables, si si lo son creamos el objeto newGuest y luego nos disponemos a actualizar el estado en donde ahora guest va a ser un nuevo arreglo que contenga todos los guest actuales mas el newGuest. Por ultimo reseteamos el formulario.

Validaciones
Para hacer las validaciones lo que hicimos fue:

Al estado le agregamos las siguiente propiedades:
errors: {
  firstName: false,
  lastName: false
}
Esto nos va a permitir en todo momento saber si hay errores o no y en que input están.

A cada input le agregamos este operador ternario
className={`form-group ${this.state.errors.lastName ? 'has-error' : null}`}
Este mira en el estado si hay errores o no. Si los hay agrega la clase has-error al input.

Creamos el metodo validateForm, el cual se evalúa siempre antes de intentar crear un invitado:
validateForm(firstName, lastName) {
  if (!firstName || !lastName) {
    this.setState({
      errors: {
        firstName: !firstName,
        lastName: !lastName
      }
    })
    return false
  }
  return true
}
este metodo recibe los valores de los inputs, y modifica el estado de errors para indicar en que input puede haber un error y devuelve false si lo hay o true si no lo hay.
 */