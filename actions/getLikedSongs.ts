import { Song } from "@/types";
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

const getLikedSongs = async (): Promise<Song[]> => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Song>({
    cookies: () => cookieStore
  });

  const { data: {session}, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) {
    console.error("Error retrieving session:", sessionError);
    return [];
  }

  const { data, error } = await supabase 
    .from('liked_songs')
    .select("*, songs(*)")
    .eq('user_id', session?.user?.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error retrieving liked songs:", error);
    return [];
  }

  if (!data) return [];

  return data.map((item) => ({
    ...item.songs
  }));
};

export default getLikedSongs;
