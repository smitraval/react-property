import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import LoginModal from './LoginModal';
import * as syncActions from '../../redux/actions/Sync.action';
import * as asyncApi from "../../api/Async.api";

class Header extends Component{
  constructor(props) {
    super(props);
    this.state = {
      totalProperties : ''
    }

    this.logout = this.logout.bind(this);
  }

  componentDidMount(){
    asyncApi.getPropertyCount()
    .then((r) =>{
      r = r.data;
      if(r.code && r.code == 200){
        this.setState({
          totalProperties: r.data
        })
      }else{
        toast.error('something went wrong.');
      }
    })
    .catch((e) => { toast.error('something went wrong.'); });
  }

  logout(){
    asyncApi.logoutCustomer({token:this.props.userReducer.userToken})
    .then((r)=> { 
      r = r.data;
      if(r.code && r.code == 200){
        this.props.dispatch(syncActions.userLoggedIn(false));
        this.props.dispatch(syncActions.userTokenData(""));
        this.props.history.push("/");
        toast.success('LoggedOut successfully.');
      }else{
        toast.error('something went wrong.');
      }
    })
    .catch((e) => { toast.error('something went wrong.'); });
  }
  
  render (){
    const { userReducer } = this.props;
    const isUserLoggedIn = userReducer.isLoggedin;
    const userProfile = userReducer.userProfileDetails[0];
    if(isUserLoggedIn){
      return (
         <header className="header-sec">
         <div className="container-fluid">
             <div className="row xs-mb-5">
                 <div className="mr-auto pl-3 login-wrap">
                    <Link to="/user-profile" className="log-btn">
                         <img src="images/profile.png" alt="" />
                         Hello, {userProfile.first_name} {userProfile.last_name}
                        { isUserLoggedIn &&
                          <i className="icon-logout fa fa-sign-out" onClick={this.logout} />
                        }
                     </Link>
                     <LoginModal />
                 </div>    
                 <div className="mx-auto logo-area">
                 <Link to="/"><img src="images/logo.svg" alt="" /></Link>
                 </div>
                 <div className="ml-auto pr-3 key-wrap">
                   {this.state.totalProperties} 
                   <img src="images/key.svg" alt="" />
                 </div>
             </div>
         </div>
         </header>
      );
    }else{
      return (
          <header className="header-sec">
          <div className="container-fluid">
              <div className="row xs-mb-5">
                  <div className="mr-auto pl-3 login-wrap">
                    <button type="button" className="log-btn" data-toggle="modal" data-target="#smallShoes">
                          <img src="images/profile.png" alt="" />
                          Hello, Guest
                      </button>
                      <LoginModal />
                     </div> 
                  <div className="mx-auto logo-area">
                  <Link to="/"><img src="images/logo.svg" alt="" /></Link>
                  </div>
                  <div className="ml-auto pr-3 key-wrap">
                    {this.state.totalProperties} 
                    <img src="images/key.svg" alt="" />
                  </div>
              </div>
          </div>
          </header>
      );
    }
  }
}
const select = state => state;
export default connect(select)(Header);