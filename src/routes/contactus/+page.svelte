<script lang="ts">
  import { enhance } from "$app/forms";
  import { Contact } from "lucide-svelte";
  import * as Alert from "$lib/components/ui/alert";

  let username = "";
  let email = "";
  let phone = "";
  let message = "";
  let showAlert = false;
  let isProcessing = false;

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    isProcessing = true;

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("message", message);

    try {
      const response = await fetch("/api/contact/", {
        method: "POST",
        body: formData,
      });

      if (response.status == 200) {
        showAlert = true;
      } else {
        // Handle the error
        console.error("Error sending form data to the server");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      isProcessing = false;
    }
  };
</script>

<svelte:head>
  <title>Webstackpros | conatct us | Thank you for Contact us</title>
</svelte:head>

<div class="flex justify-center items-center">
  <section class="bg-gray-100" style="background-image: url('https://picsum.photos/2000/800')">
    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
        <div class="lg:col-span-2 lg:py-12">
          <p class="max-w-xl text-lg text-white">
            If you have any queries feel free to contact with us! We are 24 * 7 open to provide help to you
          </p>

          <div class="mt-8">
            <a href="/" class="text-2xl font-bold text-blue-800"> info@webstackpros.net </a>

            <address class="mt-2 not-italic text-white">Kolkata Sector v Kolkata 700064</address>
          </div>
        </div>

        <div class="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
          {#if showAlert}
            <div role="alert" class="rounded-xl border border-gray-100 bg-white p-4">
              <div class="flex items-start gap-4">
                <span class="text-green-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>

                <div class="flex-1">
                  <strong class="block font-medium text-gray-900"> Thank you for contact us </strong>

                  <p class="mt-1 text-sm text-gray-700">We will get back to shrotly</p>
                </div>

                <button
                  class="text-gray-500 transition hover:text-gray-600"
                  on:click={() => (showAlert = false)}
                >
                  <span class="sr-only">Dismiss popup</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-6 w-6"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          {/if}

          <form class="space-y-4" method="POST" enctype="multipart/form-data" use:enhance>
            <div>
              <label class="sr-only" for="name">Name</label>
              <input
                class="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Name"
                type="text"
                id="username"
                name="username"
                bind:value={username}
              />
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="sr-only" for="email">Email</label>
                <input
                  class="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Email address"
                  type="email"
                  id="email"
                  bind:value={email}
                />
              </div>

              <div>
                <label class="sr-only" for="phone">Phone</label>
                <input
                  class="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Phone Number"
                  type="tel"
                  id="phone"
                  bind:value={phone}
                />
              </div>
            </div>
            <div>
              <label class="sr-only" for="message">Message</label>

              <textarea
                class="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Message"
                rows="8"
                id="message"
                bind:value={message}
              ></textarea>
            </div>

            <div class="mt-4">
              <button
                type="submit"
                class="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                on:click={handleSubmit}
              >
                {#if isProcessing}
                  <div class="flex items-center justify-center">
                    <div class="mr-2 animate-spin rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"></div>
                    Processing...
                  </div>
                {:else}
                  Send Enquiry
                {/if}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</div>
