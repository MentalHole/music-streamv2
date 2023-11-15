import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

const getTopTracks = async () => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const accessToken = session?.provider_token;
    
    const response = await fetch("https://api.spotify.com/v1/me/top/tracks", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
