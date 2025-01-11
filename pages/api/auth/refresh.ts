import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { parse, serialize } from "cookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // This API route is responsible for refreshing the user's access token
  // whenever it expires. The refresh token is stored in an HTTP-only cookie
  // and is sent in the request headers to this endpoint.

  // Parse the cookies to retrieve the refresh token
  // which is stored in the cookie under the name "spotify_refresh_token"
  const cookies = parse(req.headers.cookie || "");
  const refreshToken = cookies.spotify_refresh_token;

  if (!refreshToken) {
    // If the refresh token is missing, redirect to the login page
    // This could happen if the user has cleared their cookies or
    // if the cookie has expired
    return res.redirect(307, "/api/auth/login");
  }

  try {
    // Call Spotify's /api/token endpoint to get a new access token
    // using the refresh token.
    // See https://developer.spotify.com/documentation/general/guides/authorization-guide/#refreshing-an-access-token
    const response = await axios.post("https://accounts.spotify.com/api/token", null, {
      headers: {
        // Use Basic Authentication with client ID and client secret
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
        // Set the Content-Type to application/x-www-form-urlencoded
        // as required by the Spotify API
        "Content-Type": "application/x-www-form-urlencoded",
      },
      // Set the query parameters to include the grant type
      // (refresh_token) and the refresh token itself
      params: {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      },
    });

    // Extract the new access token and its expiration time in seconds
    const { access_token, expires_in } = response.data;

    // Update the access token cookie to include the new access token
    // and set the expiration time to match the token's lifetime
    res.setHeader("Set-Cookie", [
      serialize("spotify_access_token", access_token, {
        httpOnly: true, // Make the cookie HTTP-only for security
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        maxAge: expires_in, // in seconds
        path: "/", // Make the cookie available across the entire domain
      }),
    ]);

    // Redirect to the app (e.g., homepage or dashboard)
    res.redirect(302, "/");
  } catch (error: unknown) {
    // Handle any errors that occur when refreshing the token
    if (axios.isAxiosError(error)) {
      console.error(
        "Error refreshing token: ",
        error.response?.data || error.message
      );
      res.status(error.response?.status || 500).json({
        error: "Failed to refresh token",
      });
    } else {
      console.error("Unexpected error: ", error);
      res.status(500).json({ error: "Failed to refresh token" });
    }
  }
}
