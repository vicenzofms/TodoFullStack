<script lang="ts">
  import { goto } from "$app/navigation";

  function navAdicionar() {
    goto("/dashboard/add");
  }
</script>

<div class="p-8 flex flex-col">
  <header class="bg-zinc-700 rounded-lg p-4 flex justify-between items-center">
    <div>
      <a href="/dashboard/todos" class="text-lg text-amber-300 font-bold"
        >Goat TO-DO's</a
      >
    </div>
    <div class="flex gap-3">
      <button
        class="p-2 bg-green-300 hover:bg-green-500 cursor-pointer text-zinc-800 px-8 rounded-md transition-all font-semibold"
        onclick={navAdicionar}>Adicionar</button
      >
      <button
        class="p-2 bg-amber-300 hover:bg-amber-500 cursor-pointer text-zinc-800 px-4 rounded-md transition-all font-semibold"
        >Sair</button
      >
    </div>
  </header>
  <slot />
</div>
