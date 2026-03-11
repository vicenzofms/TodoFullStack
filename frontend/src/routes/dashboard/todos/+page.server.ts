import type { PageServerLoad } from "./$types";
import { API_URL } from "$env/static/private";
import { fail, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ fetch, cookies }) => {
  if (!cookies.get("token")) {
    throw redirect(302, "/auth");
  }

  const res = await fetch(`${API_URL}/todo/all`, {
    headers: { Authorization: `Bearer ${cookies.get("token")}` },
  });

  if (!res.ok) {
    // Unauthorized, token expirou, devo deslogar
    if (res.status === 401) {
      cookies.delete("token", { path: "/" });
      throw redirect(302, "/auth");
    }
    return fail(res.status, { message: "Algo de errado aconteceu!" });
  }

  const todos = await res.json();
  console.log("todos:", todos);

  return { todos };
};
