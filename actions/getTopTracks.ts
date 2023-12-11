import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

interface TokenRefreshResponse {
  access_token: string;
  expires_in: number;
  // Include any other relevant fields in the response
}

const refreshAccessToken = async (refreshToken: string): Promise<string> => {
  // Make a request to the token refresh endpoint of the authentication provider
  // Replace 'TOKEN_REFRESH_ENDPOINT', 'YOUR_CLIENT_ID', and 'YOUR_CLIENT_SECRET' with actual values

  const refreshEndpoint = 'https://posnnzqenxahwidzddbh.supabase.co/auth/v1/refresh';
  const clientId = 'e9c89f94247c40a8bd52dfbb2b722686';
  const clientSecret = '2deb142c2ab04b3a816e92911d335552';

  try {
    const response = await fetch(refreshEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    if (!response.ok) {
      throw new Error(`Token refresh failed: ${response.statusText}`);
    }

    const data: TokenRefreshResponse = await response.json();
    const newAccessToken: string = data.access_token;
    return newAccessToken;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
};

const getTopTracks = async () => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const accessToken = session?.provider_token;
    const refreshToken = session?.provider_refresh_token
    const newAccessToken = await refreshAccessToken(refreshToken ?? "")
    const response = await fetch("https://api.spotify.com/v1/me/top/tracks", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${newAccessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Top Tracks:", data);
    return data;
  } catch (error) {
    console.error("Error fetching top tracks:", error);
  }
};

export default getTopTracks;
