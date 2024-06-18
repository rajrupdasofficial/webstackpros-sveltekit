<script>
	import Navbar from "@/components/ui/navbar/navbar.svelte";
import "../app.css";
import { ModeWatcher } from "mode-watcher";
import Footer from "@/components/ui/footer/+footer.svelte";
</script>
<ModeWatcher />
<Navbar/>
<slot></slot>
<Footer/>