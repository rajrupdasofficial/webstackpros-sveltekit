<script lang="ts">
   import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  let mounted = false;

  onMount(() => {
    mounted = true;
  });
</script>
<svelte:head>

    <title>Webstackpros | About us - learn more about us and our company</title>
    <meta name="description" content="Welcome to our digital canvas, where innovation and creativity converge. With a keen eye for aesthetics and a mastery of code, our portfolio showcases a diverse collection of projects that reflect our commitment to excellence.">
    
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-4xl font-bold text-center mb-8">About WebStackPros</h1>
  
  {#if mounted}
    <div in:fade="{{ duration: 1000 }}" class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div>
        <img src="team.png" alt="WebStackPros Team" class="w-full rounded-lg shadow-lg">
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-4">Your Digital Success Partner</h2>
        <p class="text-gray-700 mb-4">
          Welcome to WebStackPros, where innovation meets expertise in the digital realm. Since our inception in 2015, we've been on a mission to empower businesses with cutting-edge web solutions that drive growth, enhance online presence, and streamline operations.
        </p>
        <p class="text-gray-700 mb-4">
          Our journey began with a simple yet powerful idea: to bridge the gap between complex technology and business needs. Today, we stand proud as a full-service digital partner, offering a comprehensive suite of services that cover every aspect of your online journey.
        </p>
      </div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <img src="webdevelopment.png" alt="Web Development" class="w-full rounded-lg mb-4">
        <h3 class="text-xl font-semibold mb-2">Web Development</h3>
        <p class="text-gray-700">From responsive websites to complex web applications, our development team crafts digital experiences that captivate and convert. We leverage the latest technologies and frameworks to ensure your web presence is not just current, but ahead of the curve.</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md">
        <img src="webhosting.png" alt="Web Hosting" class="w-full rounded-lg mb-4">
        <h3 class="text-xl font-semibold mb-2">Web Hosting</h3>
        <p class="text-gray-700">Our robust hosting solutions provide the foundation for your online success. With state-of-the-art infrastructure and 24/7 monitoring, we ensure your website stays fast, secure, and always accessible to your audience.</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md">
        <img src="itconsultency.png" alt="IT Consultancy" class="w-full rounded-lg mb-4">
        <h3 class="text-xl font-semibold mb-2">IT Consultancy</h3>
        <p class="text-gray-700">Navigate the complex world of technology with confidence. Our seasoned consultants provide strategic guidance, helping you make informed decisions that align with your business goals and keep you ahead in the digital race.</p>
      </div>
    </div>
    
    <div class="text-center mb-8">
      <h2 class="text-2xl font-semibold mb-4">Why Choose WebStackPros?</h2>
      <ul class="text-gray-700 mb-8">
        <li>✓ 8+ years of industry experience</li>
        <li>✓ Tailored solutions for your unique needs</li>
        <li>✓ Cutting-edge technology and best practices</li>
        <li>✓ Dedicated support and maintenance</li>
        <li>✓ Competitive pricing and flexible plans</li>
      </ul>
    </div>
    
    <div class="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
      <h2 class="text-2xl font-semibold mb-4">Our Approach</h2>
      <p class="text-gray-700 mb-4">
        At WebStackPros, we believe in a collaborative approach. We don't just work for you; we work with you. Our process begins with a deep dive into your business, understanding your goals, challenges, and vision. This allows us to craft solutions that are not just technically sound, but strategically aligned with your objectives.
      </p>
      <p class="text-gray-700 mb-4">
        We pride ourselves on our agility and adaptability. In the fast-paced world of technology, staying still means falling behind. That's why we're constantly learning, evolving, and incorporating new technologies and methodologies into our work. This ensures that our clients always benefit from the latest innovations in the digital space.
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div>
        <h2 class="text-2xl font-semibold mb-4">Our Commitment to Quality</h2>
        <p class="text-gray-700 mb-4">
          Quality is at the heart of everything we do. From the code we write to the strategies we develop, we maintain the highest standards of excellence. Our team undergoes regular training and certification to stay at the forefront of industry best practices.
        </p>
        <p class="text-gray-700 mb-4">
          We also believe in the power of testing and iteration. Every solution we deliver goes through rigorous quality assurance processes to ensure it meets our exacting standards and your specific requirements.
        </p>
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-4">Looking to the Future</h2>
        <p class="text-gray-700 mb-4">
          As we look to the future, we're excited about the possibilities that emerging technologies like AI, machine learning, and blockchain present. We're actively exploring how these can be integrated into our services to provide even more value to our clients.
        </p>
        <p class="text-gray-700 mb-4">
          Our vision is to continue growing, innovating, and leading in the digital space, always with our clients' success as our primary focus. We're not just building websites or providing IT solutions; we're helping build the digital future, one client at a time.
        </p>
      </div>
    </div>
    
    <div class="text-center">
      <a href="/contactus" class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300">Start Your Digital Journey</a>
    </div>
  {/if}
</div>

