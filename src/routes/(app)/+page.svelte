<script lang="ts">
import Herosection from "@/components/ui/herosection/+herosection.svelte";
import Pricingtable from "@/components/ui/pricingtable/+pricingtable.svelte";
import Webstitecarousel from "@/components/ui/website/+webstitecarousel.svelte";
import Appoffer from "@/components/ui/appoffer/+appoffer.svelte"
import Ourservices from "@/components/ui/ourservices/+ourservices.svelte";	
import Portfolio from "@/components/ui/portfolio/+portfolio.svelte";
import { websiteMetadata } from "@/components/ui/website/websitemetadata";


export const metadata = {
  metadataBase: new URL("https://www.webstackpros.net"),
  title: websiteMetadata.title,
  description:
    websiteMetadata.description,
  other: { "p:domain_verify": "7f562b83bb6b61abb8204072b470b756" },
  openGraph: {
    title: websiteMetadata.title,
    description: websiteMetadata.description,
    url: websiteMetadata.siteUrl,
    siteName: websiteMetadata.title,
    images: [websiteMetadata.socialBanner],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: websiteMetadata.title,
    images: [websiteMetadata.socialBanner],
  },

};



</script>

<svelte:head>
<title>{metadata.title}</title>
<meta name="description" content={metadata.description}>
<meta name="keywords" content="webstackpros, best web development company,best web development company in kolkata, Domain purchase,web hosting,Web development , andorid development, best IT company for web development, best IT company from android development, best web hosting ">
<meta property="og:title" content={metadata.title} />
<meta property="og:description" content={metadata.description} />
<meta property="og:image" content={websiteMetadata.socialBanner} />
<meta name="robots" content="index,follow" />
<meta name="googlebot" content="index, follow" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={metadata.title} />
<meta name="twitter:description" content={metadata.description} />
<meta name="twitter:image" content={websiteMetadata.socialBanner} />
<script
    async
    src="https://www.googletagmanager.com/gtag/js?id=G-B9MHZ1HXV0">
  </script>
  <script>
    window.dataLayer = window.dataLayer || []

    function gtag() {
      dataLayer.push(arguments)
    }

    gtag('js', new Date())
    gtag('config', 'G-B9MHZ1HXV0')
  </script>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4377761625773230"
  crossorigin="anonymous"></script>
  <script>
    (function(c,l,a,r,i,t,y){
                c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
                t=l.createElement(r);
                t.async=1;
                t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];
                y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "j9zlm6r4eh");
  </script>
</svelte:head>


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
 