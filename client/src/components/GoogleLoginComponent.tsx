import React, { useEffect, useState } from "react";
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline, GoogleLogout } from "react-google-login";
import {gapi} from "gapi-script";

const CLIENT_ID = "221342809801-g72s252qo6fqssr1taughcq32er2o6dh.apps.googleusercontent.com";

export interface UserInfo {
    email: string;
    name: string;
}

export const GoogleLoginComponent = () => {

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
            clientId: CLIENT_ID,
            scope: ''
          });
       };
       gapi.load('client:auth2', initClient);
    });

    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<UserInfo>({
        name: "",
        email: ""
    });

    const responseGoogleSuccess = (response: any/*GoogleLoginResponse | GoogleLoginResponseOffline*/) => {
        console.log("Logged in");
        let userInfo: UserInfo = {
            name: response.profileObj.name,
            email: response.profileObj.email,
        };

        setLoggedIn(true);
        setUserInfo(userInfo);
    };

    const responseGoogleError = (response: any) => {
        console.log(response);
    };

    const logout = (): void => {
        let userInfo: UserInfo = {
            name: "",
            email: "",
        };

        setLoggedIn(false);
        setUserInfo(userInfo);
    };

    return (<>
        {loggedIn ? (
            <div>
                <h1>Welcome, {userInfo.name}</h1>

                <GoogleLogout
                    clientId={CLIENT_ID}
                    buttonText={"Logout"}
                    onLogoutSuccess={logout}
                ></GoogleLogout>
            </div>
        ) : (
            <GoogleLogin
                clientId={CLIENT_ID}
                buttonText="Sign In with Google"
                onSuccess={responseGoogleSuccess}
                onFailure={responseGoogleError}
                isSignedIn={true}
                cookiePolicy={"single_host_origin"}
            />
        )}
    </>)
} 