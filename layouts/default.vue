<script setup>
import "@vueform/vueform/themes/vueform/css/index.min.css";
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">CNLTHĐ</a>

          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item d-flex align-items-center">
                <NuxtLink class="nav-item text-decoration-none" to="/"
                  >Trang chủ</NuxtLink
                >
              </li>
              <li class="nav-item d-flex align-items-center">
                <NuxtLink class="nav-item text-decoration-none" to="/ads"
                  >Biển quảng cáo</NuxtLink
                >
              </li>
              <li class="nav-item d-flex align-items-center">
                <NuxtLink class="nav-item text-decoration-none" to="/ads/create"
                  >Tạo biển quảng cáo</NuxtLink
                >
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>
  <div class="mt-5">
    <slot />
  </div>
</template>

<style>
body {
  margin: 50px;
  font-family: "Montserrat", sans-serif;
}
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
