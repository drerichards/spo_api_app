import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";

/**
 * This API endpoint is responsible for fetching an access token from the cookies
 * and returning it in the response body. The access token is stored in a cookie
 * named "spotify_access_token".
 *
 * @param req - The Next.js request object.
 * @param res - The Next.js response object.
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  /**
   * Parse the cookies from the request headers.
   */
  const cookies = parse(req.headers.cookie || "");

  /**
   * Extract the access token from the cookies.
   */
  const accessToken = cookies.spotify_access_token;

  /**
   * If the access token is missing, return a 401 Unauthorized response
   * with an error message.
   */
  if (!accessToken) {
    return res.status(401).json({ error: "Access token is missing" });
  }

  /**
   * Return the access token in the response body.
   */
  res.status(200).json({ accessToken });
}
