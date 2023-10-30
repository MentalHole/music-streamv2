import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

const getLikedSongs = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient();

  const { data: session, error: sessionError } = await supabase.auth.getSession();

  if (sessionError) {
    console.error("Error retrieving session:", sessionError);
    return [];
  }

  console.log("Session:", session);
  const userId = session?.user?.id;

  const { data, error } = await supabase 
    .from('liked_songs')
    .select('*, songs(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error retrieving liked songs:", error);
    return [];
  }

  console.log("Liked songs:", data);

  if (!data) return [];

  return data.map((item) => ({
    ...item.songs
  }));
};

export default getLikedSongs;
