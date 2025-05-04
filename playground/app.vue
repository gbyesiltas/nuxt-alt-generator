<template>
  <div>
    <nav>
      <NuxtLink to="/ssr">SSR</NuxtLink>
      <NuxtLink to="/csr">CSR</NuxtLink>
      <NuxtLink to="/local">Local</NuxtLink>
    </nav>
    <NuxtPage />
  </div>
</template>

<style>
body {
  background: black;
  color: lightgray;
}

nav {
  display: flex;
  gap: 1rem;
}
</style>
