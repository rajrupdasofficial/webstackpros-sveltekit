<script lang="ts">
import { onMount } from 'svelte';
let user;
onMount(async()=>{
    const response = await fetch('/api/auth/verifyauth',{
        credentials:'include'
    });

    if(response.status===401 || response.status===500 || response.status===404 || response.status==403){
        window.location.href="/auth/login"
    }else{
    const user = response.headers.get('user-status');
    const parsedata = JSON.parse(user)
    const isadmin = parsedata.isadmin;
    if(isadmin===false){
        window.location.href="/"
    }else if(isadmin===null){
        window.location.href="/"
    }else{
        console.log("error");
    }
}
   
})
</script>

<svelte:head>
    <title>webstackpros | Admin Dashboard</title>
</svelte:head>
<h1>Welcome to admin Dashboard</h1>

