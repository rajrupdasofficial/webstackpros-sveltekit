<script lang="ts">
  import Autoplay from "embla-carousel-autoplay";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import { onMount } from 'svelte';

  let allsliders: any[] = [];

  onMount(async () => {
    const res = await fetch('/api/admin/details/slider_handel/');
    const result = res.headers.get('all-sliders') ?? '[]';
    allsliders = JSON.parse(result);
    console.log('Parsed sliders:', allsliders);
  });
</script>

<Carousel.Root class="lg:w-[1700px] sm:w-[600px] md:w-[800px]"
  plugins={[
    Autoplay({
      delay: 4700,
    }),
  ]}>
  <Carousel.Content>
    {#each allsliders as slider}
      <Carousel.Item>
        <Card.Root class="w-full h-full">
          <Card.Content class="flex flex-col h-full justify-center items-center p-6">
            <img src={slider.imageUrl} alt="finnestsliderimages" class="lg:h-[300px] md:h-[200px] sm:h-[100px]"/>
          </Card.Content>
        </Card.Root>
      </Carousel.Item>
    {/each}
  </Carousel.Content>
  <Carousel.Previous class="absolute top-1/2 left-0 transform -translate-y-1/2" />
  <Carousel.Next class="absolute top-1/2 right-0 transform -translate-y-1/2" />
</Carousel.Root>