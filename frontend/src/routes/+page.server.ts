import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ cookies }) => {
  if (cookies.get("token")) {
    throw redirect(302, "/dashboard/todos");
  }

  throw redirect(302, "/auth");
};
