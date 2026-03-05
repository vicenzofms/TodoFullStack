import type { PageServerLoad } from "./$types";
import { API_URL } from "$env/static/private";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ fetch, cookies }) => {
  console.log(cookies.get("token"));
  if (!cookies.get("token")) {
    throw redirect(302, "/auth");
  }
  const resAuth = await fetch(`${API_URL}/auth/about-me`, {
    headers: { Authorization: `Bearer ${cookies.get("token")}` },
  });

  if (!resAuth.ok) throw redirect(302, "/auth");

  const firstLoadRes = await fetch(`${API_URL}/todo/all`, {
    headers: { Authorization: `Bearer ${cookies.get("token")}` },
  });

  if (firstLoadRes.ok) return { todos: await firstLoadRes.json() };

  return {};
};
