import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { API_URL } from "$env/static/private";

export const actions: Actions = {
  login: async ({ request, fetch, cookies }) => {
    // handle form validation
    const data = await request.formData();
    const email = data.get("email");
    const password = data.get("senha");

    let errors = [];
    if (!email) {
      errors.push({ error: "E-Mail é obrigatório" });
    }
    if (!password) {
      errors.push({ error: "Senha é obrigatória" });
    }
    if (password && password.toString().length <= 3) {
      errors.push({ error: "Senha precisa ter pelo menos 4 dígitos" });
    }

    if (errors.length > 0) return fail(400, { errors });

    // form has been validated
    // making backend call
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const resData = await res.json();

    if (!res.ok) {
      return fail(res.status, resData);
    }

    // setting JWT cookie
    cookies.set("token", resData.token, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "lax",
    });

    throw redirect(302, "/dashboard/todos");
  },

  signup: async (event) => {
    // handle signup
  },
};
