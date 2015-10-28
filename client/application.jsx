// Provider component from redux-react (https://github.com/gaearon/react-redux)
// Provider is a React Component designed to be used as a wrapper of your application's root component.
// Its purpose is to provide your redux instance to all of your application's components.

import React from 'react'
import Home from './home'
import { Provider } from 'react-redux'

export default class Application extends React.Component {
  render () {
    return (
      // As explained above, the Provider must wrap your application's Root component. This way,
      // this component and all of its children (even deeply nested ones) will have access to your
      // Redux store. Of course, to allow Provider to do that, you must give it the store
      // you built previously (via a "store" props).
      <Provider store={ this.props.store }>
        <Home />
      </Provider>
    )
  }
}
