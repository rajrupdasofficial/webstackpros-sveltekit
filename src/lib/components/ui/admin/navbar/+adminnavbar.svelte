<script lang="ts">
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import Sun from "lucide-svelte/icons/sun";
  import Moon from "lucide-svelte/icons/moon";
 
  import { toggleMode } from "mode-watcher";
  import { Button } from "$lib/components/ui/button/index.js";

</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger class="text-lg font-bold dark:text-white text-slate-900">Menu</DropdownMenu.Trigger>
  <DropdownMenu.Content class="bg-white dark:bg-slate-950 shadow-md rounded-md w-full max-w-md p-4">
    <DropdownMenu.Group class="flex flex-col">
      <DropdownMenu.Label class="text-lg font-bold text-gray-800 dark:text-white">My Admin Dashboard</DropdownMenu.Label>
      <DropdownMenu.Separator class="h-px bg-gray-200 dark:bg-slate-600 my-2" />
      <DropdownMenu.Item class="text-lg text-gray-600 hover:text-gray-900">
        <Button on:click={toggleMode} variant="outline" size="icon">
          <Sun
            class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <Moon
            class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
          <span class="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenu.Item>
      <DropdownMenu.Item class="text-lg text-gray-600 hover:text-gray-900">
        <a href="/admin/details/allcontacts">
        All Contacts
        </a>
      </DropdownMenu.Item>
      <DropdownMenu.Item class="text-lg text-gray-600 hover:text-gray-900">All Blog Posts</DropdownMenu.Item>
      <DropdownMenu.Item class="text-lg text-gray-600 hover:text-gray-900">All User</DropdownMenu.Item>
      <DropdownMenu.Item class="text-lg text-gray-600 hover:text-gray-900">Others</DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>