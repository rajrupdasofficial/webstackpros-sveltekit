<script lang="ts">
import Herosection from "@/components/ui/herosection/+herosection.svelte";
import Pricingtable from "@/components/ui/pricingtable/+pricingtable.svelte";
import Webstitecarousel from "@/components/ui/website/+webstitecarousel.svelte";
import Appoffer from "@/components/ui/appoffer/+appoffer.svelte"
import Ourservices from "@/components/ui/ourservices/+ourservices.svelte";	
	import Portfolio from "@/components/ui/portfolio/+portfolio.svelte";
</script>

<!-- header carousel section -->
<div class="lg:ml-[70px] lg:mt-[60px] sm:ml[10px]">
    <Webstitecarousel/>
</div>
<!-- hero section -->
<div class="mt-[-140px]">
<Herosection/>
</div>
<!-- pricing section -->
<div class="flex justify-center items-center min-h-screen">
    <div class="max-w-screen-2xl w-full px-4">
        <Pricingtable />
    </div>
</div>
<!-- app offer -->
<div class="flex justify-center items-center min-h-screen lg:mt-[-330px]">
    <div class="max-w-screen-2xl w-full px-4">
        <Appoffer/>
    </div>
</div>

<!-- our services -->
 <div class="flex justify-center items-center min-h-screen lg:mt-[-650px]">
    <div class="max-w-screen-2xl w-full px-4">
        <Ourservices/>
    </div>
 </div>
 <!-- Our portfolio -->
  <div class="flex justify-center items-center min-h-screen ">
    <div class="max-w-screen-2xl w-full px-4">
        <h3 class="text-5xl flex justify-center items-center mb-10 font-bold text-slate-900 dark:text-white">Our Portfolio</h3>
        <Portfolio/>
    </div>
  </div>
 