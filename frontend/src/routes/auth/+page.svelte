<script lang="ts">
  // import { goto } from "$app/navigation";
  $: loginMode = true;
  $: actionForm = loginMode ? "?/login" : "?/signup";

  export let form;
  $: console.log(form);

  function toggleLogin() {
    loginMode = !loginMode;
  }
</script>

<div class="flex flex-col p-40 justify-center items-center">
  <h1 class="text-6xl font-bold pb-4 text-center">
    Bem vindo a <span
      class="jetbrains text-amber-300 hover:bg-amber-300 hover:text-zinc-800 transition-all cursor-pointer"
      >Goat TODO's!</span
    >
  </h1>
  <p class="text-md font-semibold pb-10">
    O melhor gerenciador de to-do's que existe no mercado!
  </p>
  <h2 class="text-4xl text-center font-semibold">
    {loginMode ? "Faça login agora!" : "Registre-se agora!"}
    <br />
    <button
      onclick={toggleLogin}
      class="text-amber-300 hover:text-amber-400 transition-all underline cursor-pointer text-lg"
      >{loginMode ? "Ainda não tem uma conta?" : "Já tem uma conta?"}</button
    >
  </h2>
  <form class="flex flex-col w-3/5 py-10 gap-4" method="post" action="?/login">
    <input
      type="email"
      id="emailInput"
      name="email"
      placeholder="Digite seu email..."
      class="bg-zinc-700 jetbrains rounded-lg p-2 px-4"
    />
    <input
      type="password"
      id="senhaInput"
      name="senha"
      placeholder="Digite sua senha..."
      class="bg-zinc-700 jetbrains rounded-lg p-2 px-4"
    />
    {#if !loginMode}
      <input
        type="text"
        id="nomeInput"
        name="nome"
        placeholder="Digite seu nome..."
        class="bg-zinc-700 jetbrains rounded-lg p-2 px-4"
      />
    {/if}
    <div class="flex justify-end">
      <button
        type="submit"
        class="bg-amber-300 rounded-lg text-zinc-800 font-bold w-32 py-2 cursor-pointer hover:bg-amber-400 transition-all"
        >{loginMode ? "Entrar" : "Registrar"}</button
      >
    </div>
  </form>
</div>
