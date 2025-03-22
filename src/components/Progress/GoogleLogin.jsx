import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode"; // To decode the JWT token

const clientId = "940186236550-1v7bf92e24n91lv2ll8pcr80imtce0sb.apps.googleusercontent.com";

const GoogleLoginButton = () => {
  const handleSuccess = async (response) => {
    console.log("Google Login Success:", response);

    // Decode the token (This only gives user details, NOT access to Fitness API)
    const decodedToken = jwt_decode(response.credential);
    console.log("Decoded User Info:", decodedToken);

    // 🔹 Instead of sending `response.credential`, get OAuth access token first
    const googleUser = google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: "https://www.googleapis.com/auth/fitness.activity.read",
      callback: async (tokenResponse) => {
        console.log("Google OAuth Token:", tokenResponse.access_token);

        // Send correct access token to backend
        fetch("http://localhost:5000/fetchFitnessData", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessToken: tokenResponse.access_token }),
        })
          .then((res) => res.json())
          .then((data) => console.log("Fitness Data:", data))
          .catch((err) => console.error("Error fetching fitness data:", err));
      },
    });

    // Request OAuth token
    googleUser.requestAccessToken();
  };

  const handleError = () => {
    console.log("Google Login Failed");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="google-login">
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;