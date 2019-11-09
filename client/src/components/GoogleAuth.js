import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '36996259131-vtonknsi7ni2st14k185gr6e9g3pd9e1.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.OAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.OAuthChange);
            });
        });
    }

    OAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    onSignOutClick = () => {
        this.auth.signOut();
    }

    onSignInClick = () => {
        this.auth.signIn({ prompt: 'select_account' });
    }

    renderAuthButton = () => {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button className="ui red google button" onClick={this.onSignOutClick}>
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        } else {
            return (
                <button className="ui red google button" onClick={this.onSignInClick}>
                    <i className="google icon" />
                    Sign In
                </button>
            );
        }
    }


    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        );
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };

}
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);