<script lang="ts">
  import { onMount } from 'svelte';
  import Sun from "lucide-svelte/icons/sun";
  import Moon from "lucide-svelte/icons/moon";
 
  import { toggleMode } from "mode-watcher";
  import { Button } from "$lib/components/ui/button/index.js";

  let isNavbarOpen = false;

  onMount(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  });

  function handleDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.nav-button')) {
      isNavbarOpen = false;
    }
  }

  function toggleNavbar() {
    isNavbarOpen = !isNavbarOpen;
  }
  
</script>

<header class="bg-white dark:bg-gray-900">
  <div class="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
     
<Button on:click={toggleMode} variant="outline" size="icon">
  <Sun
    class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
  />
  <Moon
    class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
  />
  <span class="sr-only">Toggle theme</span>
</Button>
    <a class="block text-teal-600 dark:text-teal-300" href="/">
      <span class="sr-only">Home</span>
      <!-- <img src="" alt="logo"> -->
      Webstackpros
    </a>

    <div class="flex flex-1 items-center justify-end md:justify-between">
      <nav aria-label="Global" class="{isNavbarOpen ? 'block' : 'hidden'} md:block absolute sm:top-[80px] md:top-5 lg:top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-md mt-2 md:mt-0 md:relative md:shadow-none z-10">
        <ul class="flex flex-col items-start md:flex-row md:items-center md:gap-6 text-sm">
          <li>
            <a
              class="block py-2 px-4 text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
              href="/about"
            >
              About
            </a>
          </li>
          <li>
            <a
              class="block py-2 px-4 text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
              href="https://webstackpros.net"
            >
              Careers
            </a>
          </li>
          <li>
            <a
              class="block py-2 px-4 text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
              href="https://webstackpros.net"
            >
              Services
            </a>
          </li>
          <li>
            <a
              class="block py-2 px-4 text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
              href="https://webstackpros.net"
            >
              Projects
            </a>
          </li>
          <li>
            <a
              class="block py-2 px-4 text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
              href="https://webstackpros.net"
            >
              Blog
            </a>
          </li>
          <li>
            <a
              class="block py-2 px-4 text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
              href="/contactus"
            >
              Contact
            </a>
          </li>
          <li>
            <a
              class="block py-2 px-4 text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
              href="/checkout"
            >
              Checkout
            </a>
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-4">
        <div class="sm:flex sm:gap-4">
          <!-- <a
            class="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 dark:hover:bg-teal-500"
            href="https://webstackpros.net"
          >
            Login
          </a> -->
          <!-- <a
            class="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
            href="https://webstackpros.net"
          >
            Register
          </a> -->
        </div>

        <button
          class="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden dark:bg-gray-800 dark:text-white dark:hover:text-white/75 nav-button"
          on:click={toggleNavbar}
        >
          <span class="sr-only">Toggle menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</header>
