import React from "react";
import {signIn, signOut} from '../actions';
import {connect} from 'react-redux';

class GoogleAuth extends React.Component {
  
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "1059465545116-lup1uv7c0jljp22vk65jp50s83gv9476.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(()=>this.onAuthChange(this.auth.isSignedIn.get()));
        });
    });
  }
  onAuthChange = (isSignedIn) => {
      if(isSignedIn){
          this.props.signIn(this.auth.currentUser.get().getId());
      } else {
          this.props.signOut();
      }
  }
  render() {
    console.log(this.props.signedIn);
    return <div>{this.renderOfButton()}</div>;
  }

  onSignInClick = () => {
    this.auth.signIn();
  }

  onSignOutClick = () => {
    this.auth.signOut();
}
  renderOfButton() {
    if (this.props.signedIn == null) {
      return null;//<div> don't know </div>;
    } else if (this.props.signedIn) {
      return <button onClick={this.onSignOutClick} className='ui red google button '>
          <i className='google icon'/>
          Sign Out
          </button>
    } else {
      return <button onClick={this.onSignInClick} className='ui red google button '>
      <i className='google icon'/>
      Sign In with Google
      </button>
    }
  }
}

const mapStateToProps = (state) => {
    return {
        signedIn: state.auth.signedIn
    }
}
export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);
