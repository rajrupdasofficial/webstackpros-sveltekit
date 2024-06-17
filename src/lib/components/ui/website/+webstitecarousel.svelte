<script lang="ts">
  import Autoplay from "embla-carousel-autoplay";;
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Carousel from "$lib/components/ui/carousel/index.js";
</script>

<Carousel.Root class="lg:w-[1700px] sm:w-[600px] md:[800px]"  plugins={[
  Autoplay({
    delay: 4700,
  }),
]}>
  <Carousel.Content>
    {#each Array(5) as _, i (i)}
      <Carousel.Item>
        <div class="p-1">
          <Card.Root class="w-full h-full">
            <Card.Content class="flex flex-col h-full justify-center items-center p-6">
              <img src={`https://robohash.org/${5}?size=300x300`} alt="cutest kitten" />
              <span class="text-3xl font-bold text-white">Title</span>
            </Card.Content>
          </Card.Root>
        </div>
      </Carousel.Item>
    {/each}
  </Carousel.Content>
  <Carousel.Previous class="absolute top-1/2 left-0 transform -translate-y-1/2" />
  <Carousel.Next class="absolute top-1/2 right-0 transform -translate-y-1/2" />
</Carousel.Root>