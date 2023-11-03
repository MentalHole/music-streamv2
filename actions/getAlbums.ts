import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Song } from "@/types";

const getAlbums = async () => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  const accessToken = session?.access_token;

  try {
    const response = await fetch(
      "https://api.spotify.com/v1/me/top/tracks",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        // Construct URL based on seed tracks
        // For instance:
        // params: new URLSearchParams({ seed_tracks: seedTracks.join(',') })
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
  }
};

export default getAlbums;
