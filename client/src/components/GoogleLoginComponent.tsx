import React, { useEffect, useState } from "react";
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import { IOUtil } from "../util/IOUtil";

const CLIENT_ID = "221342809801-g72s252qo6fqssr1taughcq32er2o6dh.apps.googleusercontent.com";

export interface UserInfo {
    email: string;
    name: string;
    familyName: string;
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

    const responseGoogleSuccess = async (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        const onlineResponse = response as GoogleLoginResponse;

        if (onlineResponse !== undefined) {
            setLoggedIn(true);
            await IOUtil.LoginGoogle(onlineResponse.tokenId);
        }
    };

    const responseGoogleError = (response: any) => {
        console.error(response);
    };

    const logout = async () => {
        setLoggedIn(false);
        await IOUtil.logoutUser();
    };

    return (<>
        {loggedIn ? (
            <GoogleLogout
                clientId={CLIENT_ID}
                buttonText={"Logout"}
                onLogoutSuccess={logout}
            ></GoogleLogout>
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