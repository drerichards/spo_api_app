import { NextApiRequest, NextApiResponse } from "next";

/**
 * This API route is responsible for handling the login process.
 *
 * When a user visits the login page, this route is called, and it redirects the user
 * to the Spotify authorization URL. The URL is constructed with the client ID,
 * response type, redirect URI, and scopes.
 *
 * The scopes are:
 *
 * - `user-read-private`: allows the app to read user profile information
 * - `user-read-email`: allows the app to read the user's email address
 *
 * The redirect URI is set to the `SPOTIFY_REDIRECT_URI` environment variable.
 *
 * @param req The Next.js request object.
 * @param res The Next.js response object.
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Create a string of scopes to request from Spotify
  const scopes = [
    // Read user profile information
    "user-read-private",
    // Read the user's email address
    "user-read-email",
  ].join(" ");

  // Construct the query parameters for the authorization URL
  const queryParams = new URLSearchParams({
    // The client ID from the Spotify Developer Dashboard
    client_id: process.env.SPOTIFY_CLIENT_ID || "",
    // The response type is a code, which will be exchanged for an access token
    response_type: "code",
    // The redirect URI to send the user back to after authorization
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI || "",
    // The scopes to request from Spotify
    scope: scopes,
  });

  // Redirect the user to the Spotify authorization URL
  res.redirect(`https://accounts.spotify.com/authorize?${queryParams.toString()}`);
}
