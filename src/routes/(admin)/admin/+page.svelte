<script lang="ts">
import { onMount } from 'svelte';
let user;
onMount(async()=>{
    const response = await fetch('/api/auth/verifyauth',{
        credentials:'include'
    });
    const user = response.headers.get('user-status');
    const parsedata = JSON.parse(user)
    const isadmin = parsedata.isadmin;
    console.log(isadmin)
    if(isadmin===false){
        window.location.href="/"
    }
})
</script>

<svelte:head>
    <title>webstackpros | Admin Dashboard</title>
</svelte:head>
<h1>Welcome to admin Dashboard</h1>

