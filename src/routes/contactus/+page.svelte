<script lang="ts">
	import { enhance } from "$app/forms";


let username = '';
let email = '';
let phone = '';
let message = '';


const handleSubmit = async (event: Event) => {
		event.preventDefault();

		const formData = new FormData();
		formData.append('username', username);
		formData.append('email', email);
		formData.append('phone', phone);
		formData.append('message', message);

		try {
			const response = await fetch('/api/contact/', {
				method: 'POST',
				body: formData
			});

			if (response.ok) {
				// Form submission was successful
				console.log('Form data sent to the server');
			} else {
				// Handle the error
				console.error('Error sending form data to the server');
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

</script>

<div class="flex justify-center items-center" >

    <section class="bg-gray-100" style="background-image: url('https://picsum.photos/2000/800')">
        <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div class="lg:col-span-2 lg:py-12">
              <p class="max-w-xl text-lg text-white">
                If you have any queries feel free to contact with us!
                We are 24 * 7 open to provide help to you
              </p>
      
              <div class="mt-8">
                <a href="/" class="text-2xl font-bold text-blue-800"> info@webstackpros.net </a>
      
                <address class="mt-2 not-italic text-white">Kolkata Sector v Kolkata 700064</address>
              </div>
            </div>
      
            <div class="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
              <form  class="space-y-4" method="POST" enctype="multipart/form-data" use:enhance>
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
                    Send Enquiry
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
</div>