import HomePosts from "@/components/HomePosts";
import {createClient} from "@/lib/supabase/serverClient";
import { getHomePosts } from "@/lib/supabase/queries";

export const revalidate = 600;

export default async function Home() {
  const supabase = await createClient()
  const {data, error} = await getHomePosts(supabase)

  return (
    <div className="w-full m-4 max-w-[730px] mx-auto">
      {data && <HomePosts posts={data} />}
    </div>
  );
}
