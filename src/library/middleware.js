import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Middleware extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let RenderThis = this.props.component;
    if(this.props.userReducer.isLoggedin) {
        if(this.props.onlyLoggedout == true){
          return (
            <Redirect to="/" push />
          )
        }else{
          return (
            <RenderThis {...this.props} />
          )
        }
    } else {
      if(this.props.onlyLoggedout == true){
          return (
            <RenderThis {...this.props} />
          )
        }else{
          return (
            <Redirect to="/" push />
          )
        }
    }
    
  }
}

const store = select => select;
export default connect(store)(Middleware);