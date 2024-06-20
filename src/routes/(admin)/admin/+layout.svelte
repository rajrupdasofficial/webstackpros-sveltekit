<script lang="ts">
import Adminnavbar from "@/components/ui/admin/navbar/+adminnavbar.svelte";
import { ModeWatcher } from "mode-watcher";
import "./admin.css"
</script>
<ModeWatcher/>
<Adminnavbar/>

<slot></slot>