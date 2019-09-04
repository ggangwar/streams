import React from "react";

class GoogleAuth extends React.Component {
  state = {
    isSignedIn: null
  };
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
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(()=>{this.onAuthChange()});
        });
    });
  }
  onAuthChange = () => {
      this.setState({isSignedIn:this.auth.isSignedIn.get()});
  }
  render() {
    return <div>{this.renderOfButton()}</div>;
  }

  onSignInClick = () => {
    this.auth.signIn();
  }

  onSignOutClick = () => {
    this.auth.signOut();
}
  renderOfButton() {
    if (this.state.isSignedIn == null) {
      return null;//<div> don't know </div>;
    } else if (this.state.isSignedIn) {
      return <button onClick={this.onSignOutClick} className='ui red google button '>
          <i className='google icon'/>
          Sign Out
          </button>
    } else {
      return <button onClick={this.onSignIn} className='ui red google button '>
      <i className='google icon'/>
      Sign In with Google
      </button>
    }
  }
}

export default GoogleAuth;
