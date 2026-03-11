import type { Actions } from "./$types";
import { API_URL } from "$env/static/private";
import { fail, redirect } from "@sveltejs/kit";

export const actions: Actions = {
  add: async ({ request, fetch, cookies }) => {
    if (!cookies.get("token")) {
      throw redirect(302, "/auth");
    }

    const formData = await request.formData();
    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      level: Number.parseInt(formData.get("level")?.toString() ?? ""),
    };
    // TODO: Validation

    const res = await fetch(`${API_URL}/todo/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      // Unauthorized, token expirou, devo deslogar
      if (res.status === 401) {
        cookies.delete("token", { path: "/" });
        throw redirect(302, "/auth");
      }
      const errorBody = await res.json();
      console.error("ERROR", errorBody);
      return fail(res.status, { message: "Algo de errado aconteceu!" });
    }

    throw redirect(302, "/dashboard/todos");
  },
};
