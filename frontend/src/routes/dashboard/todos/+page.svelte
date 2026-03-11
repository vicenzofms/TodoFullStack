<script lang="ts">
  import { page } from "$app/state";

  console.log(page.data.todos);
</script>

<div class="flex flex-col overflow-y-scroll h-full gap-4 items-center py-10">
  {#each page.data.todos as todo}
    <div
      class="bg-zinc-700 w-3/5 p-4 rounded-lg shadow-2xl hover:scale-105 transition-all"
    >
      <div class="flex justify-between">
        <h1
          class="jetbrains {todo.done
            ? 'text-green-400'
            : 'text-amber-300'} font-bold"
        >
          {todo.title}
          {#if todo.done}
            <span class="text-green-400/50 text-xs">(feito!)</span>
          {/if}
        </h1>
        <span class="text-zinc-400"
          >Criado em: {new Date(todo.createdAt).toLocaleDateString(
            "pt-BR",
          )}</span
        >
      </div>
      <div class="flex items-end pt-2 gap-2">
        <p class="font-semibold grow">{todo.description}</p>
        <button
          class="p-2 bg-red-400 hover:bg-red-500 text-zinc-800 font-bold transition-all rounded-full h-6 w-6 text-xs cursor-pointer flex items-center justify-center"
          >D</button
        >
        {#if !todo.done}
          <button
            class="p-2 bg-blue-400 hover:bg-blue-500 text-zinc-800 font-bold transition-all rounded-full h-6 w-6 text-xs cursor-pointer flex items-center justify-center"
            >C</button
          >
        {/if}
      </div>
    </div>
  {/each}
</div>
