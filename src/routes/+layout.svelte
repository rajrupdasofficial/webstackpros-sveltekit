<script>
	import Navbar from "@/components/ui/navbar/navbar.svelte";
import "../app.css";
import { ModeWatcher } from "mode-watcher";
</script>
<ModeWatcher />
<Navbar/>
<slot></slot>