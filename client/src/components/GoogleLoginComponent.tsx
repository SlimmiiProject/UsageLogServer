import { Dispatch, FC, SetStateAction, useEffect } from "react";
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import { IOUtil } from "../util/IOUtil";
import { I18n } from "../util/language/I18n";

const CLIENT_ID = "221342809801-g72s252qo6fqssr1taughcq32er2o6dh.apps.googleusercontent.com";

export type UserInfo = {
    email: string;
    name: string;
    familyName: string;
}

export type GoogleLoginProps = {
    isLoggedIn: boolean;
    setLoggedIn: Dispatch<SetStateAction<boolean>>
    auth: Dispatch<SetStateAction<boolean>>;
}

export const GoogleLoginComponent: FC<GoogleLoginProps> = ({ auth, isLoggedIn, setLoggedIn }) => {

    useEffect(() => {
        const initClient = () => gapi.client.init({ clientId: CLIENT_ID, scope: '' });
        gapi.load('client:auth2', initClient);
    }, []);

    const responseGoogleSuccess = async (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        const onlineResponse = response as GoogleLoginResponse;
        if (onlineResponse !== undefined) {
            const res = await IOUtil.loginGoogle(onlineResponse.tokenId);
            setLoggedIn(res);
            auth(res);
        };
    }

    const responseGoogleError = (response: any) => console.error(response);

    const logout = async () => {
        if (await IOUtil.logoutUser()) setLoggedIn(false);
    };

    return (<>
        {isLoggedIn ? (
            <GoogleLogout
                clientId={CLIENT_ID}
                buttonText={I18n.t("googlelogincomponent.logout")}
                onLogoutSuccess={logout}
            ></GoogleLogout>
        ) : (
            <GoogleLogin
                clientId={CLIENT_ID}
                buttonText={I18n.t("googlelogincomponent.signIn")}
                onSuccess={responseGoogleSuccess}
                onFailure={responseGoogleError}
                isSignedIn={true}
                cookiePolicy={"single_host_origin"}
            />
        )}
    </>)
} 