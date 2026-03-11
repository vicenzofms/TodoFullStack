<div class="p-8 flex flex-col items-center">
  <h1 class="text-2xl text-amber-300 font-bold">
    Adicione um novo <span
      class="jetbrains underline hover:-translate-y-1 transition-all inline-block"
      >To-Do</span
    > na sua lista!
  </h1>
  <form
    action="?/add"
    method="POST"
    class="flex w-full items-center flex-col gap-4 py-4"
  >
    <input
      type="text"
      name="title"
      placeholder="Título do To-Do..."
      class="p-2 px-4 rounded-lg bg-zinc-700 w-3/5"
      required
    />

    <textarea
      name="description"
      placeholder="Breve descrição..."
      rows="4"
      class="p-2 px-4 rounded-lg bg-zinc-700 resize-none w-3/5"
    ></textarea>

    <select
      name="level"
      id="level"
      class="p-2 px-4 rounded-lg bg-zinc-700 resize-none w-3/5"
      required
    >
      <option value="1">Baixa Importância</option>
      <option value="2">Média Importância</option>
      <option value="3">Alta Importância</option>
    </select>
  </form>
  <div class="flex justify-end w-3/5">
    <button
      type="submit"
      class="bg-amber-300 rounded-lg text-zinc-800 font-bold w-32 py-2 cursor-pointer hover:bg-amber-400 transition-all"
      >Adicionar</button
    >
  </div>
</div>
