<script lang="ts">
  import { page } from "$app/state";

  console.log(page.data.todos);
</script>

<div class="p-8 flex flex-col">
  <header class="bg-zinc-700 rounded-lg p-4 flex justify-between items-center">
    <div>
      <span class="text-lg text-amber-300 font-bold">Goat TO-DO's</span>
    </div>
    <div class="flex gap-3">
      <button
        class="p-2 bg-green-300 hover:bg-green-500 cursor-pointer text-zinc-800 px-8 rounded-md transition-all font-semibold"
        >Adicionar</button
      >
      <button
        class="p-2 bg-amber-300 hover:bg-amber-500 cursor-pointer text-zinc-800 px-8 rounded-md transition-all font-semibold"
        >Sair</button
      >
    </div>
  </header>
  <div class="flex flex-col overflow-y-scroll h-full gap-4 items-center py-10">
    {#each page.data.todos as todo}
      <div
        class="bg-zinc-700 w-3/5 p-4 rounded-lg shadow-2xl hover:scale-105 transition-all"
      >
        <div class="flex justify-between">
          <h1 class="jetbrains text-amber-300 font-bold">{todo.title}</h1>
          <span class="text-zinc-400"
            >Criado em: {new Date(todo.createdAt).toLocaleDateString()}</span
          >
        </div>
        <div class="flex items-end pt-2">
          <p class="font-semibold grow">{todo.description}</p>
          <button
            class="p-2 bg-red-400 hover:bg-red-500 text-zinc-800 font-bold transition-all rounded-full h-6 w-6 text-xs cursor-pointer flex items-center justify-center"
            >D</button
          >
        </div>
      </div>
    {/each}
  </div>
</div>
