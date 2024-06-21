<script lang="ts">
import { onMount } from 'svelte';
let user;
let allcontacts: string[] = [];

onMount(async()=>{
    const response = await fetch('/api/auth/verifyauth',{
        credentials:'include'
    });

    if(response.status===401 || response.status===500 || response.status===404 || response.status==403){
        window.location.href="/auth/login"
    }else{
    const user = response.headers.get('user-status')??'';
    const parsedata = JSON.parse(user)
    const isadmin = parsedata.isadmin;
    if(isadmin===false){
        window.location.href="/"
    }else if(isadmin===null){
        window.location.href="/"
    }else{
        console.log("Authenticated");
    }
}
   
  const res= await fetch('/api/admin/details/allcontacts/')
    let result = res.headers.get('all-contacts')?? '';
  
    allcontacts = JSON.parse(result);

})


</script>

<div class="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
    <table
      class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm dark:divide-gray-700 dark:bg-gray-900"
    >
      <thead class="ltr:text-left rtl:text-right">
        <tr>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">ID</th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Name</th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Email</th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Phone</th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Message</th>
       
        </tr>
      </thead>
  
      <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          {#each allcontacts as contact}
          <tr>
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
              {contact.$id}
            </td>
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
              {contact.name}
            </td>
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
              {contact.email}
            </td>
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
              {contact.phone}
            </td>
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
              {contact.message}
            </td>
          </tr>
          {/each}
    
        </tbody>
    </table>
  </div>
  