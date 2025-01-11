import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { serialize } from "cookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: "Authorization code not found" });
  }

  try {
    // Exchange authorization code for tokens
    // This endpoint is responsible for exchanging the authorization code
    // for an access token. The access token is then used to make requests
    // to the Spotify API on behalf of the user.
    const response = await axios.post("https://accounts.spotify.com/api/token", null, {
      // Set the Authorization header to Basic Authentication
      // with the client ID and client secret
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
        // Set the Content-Type header to application/x-www-form-urlencoded
        // as required by the Spotify API
        "Content-Type": "application/x-www-form-urlencoded",
      },
      // Set the query parameters to include the grant type
      // (authorization_code) and the authorization code itself
      params: {
        grant_type: "authorization_code",
        code,
        // Set the redirect URI to the environment variable
        // SPOTIFY_REDIRECT_URI
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
      },
    });

    const { access_token, refresh_token, expires_in } = response.data;

    // Set cookies for the tokens
    // The access token is set to expire after the specified number of
    // seconds, and the refresh token is set to expire after 30 days
    // This flag ensures that the cookie is not accessible via JavaScript,
    // which helps protect it from cross-site scripting (XSS) attacks.
    res.setHeader("Set-Cookie", [
      serialize("spotify_access_token", access_token, {
        httpOnly: true, // Make the cookie HTTP-only for security
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        maxAge: expires_in, // in seconds
        path: "/", // Make the cookie available across the entire domain
      }),
      serialize("spotify_refresh_token", refresh_token, {
        httpOnly: true, // Make the cookie HTTP-only for security
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/", // Make the cookie available across the entire domain
      }),
    ]);

    // Redirect to the dashboard after login
    // This will redirect the user to the dashboard page
    // after they have been successfully authenticated
    res.redirect("/user/dashboard");
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) { // if error is an instance of an Axios error
      console.error("Error exchanging authorization code:", error.response?.data || error.message);
    } else {
      console.error("Error exchanging authorization code:", error);
    }
    res.status(500).json({ error: "Failed to exchange authorization code" });
  }
}
