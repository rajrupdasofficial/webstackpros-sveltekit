<script lang="ts">
    let sliderFiles: File[] = []; // Array to store selected files
  
    const handleFileUpload = async (event: Event) => {
      event.preventDefault();
      console.log('Uploaded files:', sliderFiles);
      // Perform any upload logic here
    };
  
    const handleChange = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files) {
        // Convert FileList to array and update sliderFiles
        sliderFiles = Array.from(input.files);
      }
    };
  </script>
  
  <section class="relative flex flex-wrap lg:h-screen lg:items-center">
    <div class="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
      <div class="mx-auto max-w-lg text-center">
        <h1 class="text-2xl font-bold sm:text-3xl">Create Slider</h1>
        <p class="mt-4 text-gray-500">Upload Images for Slider</p>
      </div>
  
      <form class="mx-auto mb-0 mt-8 max-w-md space-y-4">
        <div>
          <label for="slider" class="sr-only">Upload images</label>
          <div class="relative">
            <input
              type="file"
              class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Upload Images"
              name="slider"
              id="slider"
              multiple
              on:change={handleChange}
            />
            <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </span>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <button
            type="submit"
            class="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            on:click|preventDefault={handleFileUpload}
          >
            Create Slider
          </button>
        </div>
      </form>
    </div>
  
    <!-- Image preview -->
    <div class="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
      {#each sliderFiles as file, index}
        <img
          alt=""
          src={URL.createObjectURL(file)}
          class="absolute inset-0 h-full w-full object-cover"
        />
      {/each}
    </div>
  </section>
  