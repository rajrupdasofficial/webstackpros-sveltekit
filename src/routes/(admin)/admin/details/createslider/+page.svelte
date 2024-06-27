<script lang="ts">
  import { onMount } from 'svelte';

  interface CustomRequestInit extends RequestInit {
    onprogress?: (event: ProgressEvent<XMLHttpRequestEventTarget>) => void;
  }

  onMount(async () => {
    const response = await fetch('/api/auth/verifyauth', {
      credentials: 'include'
    });

    if (
      response.status === 401 ||
      response.status === 500 ||
      response.status === 404 ||
      response.status == 403
    ) {
      window.location.href = '/auth/login';
    } else {
      const user = response.headers.get('user-status') ?? '';
      const parsedata = JSON.parse(user);
      const isadmin = parsedata.isadmin;
      if (isadmin === false) {
        window.location.href = '/';
      } else if (isadmin === null) {
        window.location.href = '/';
      } else {
        console.log('Authenticated');
      }
    }
  });

  let sliderFiles: File[] = [];
  let uploadProgress: number[] = [];
  let uploadedFiles: number = 0;

  const handleFileUpload = async (event: Event) => {
    event.preventDefault();

    const formData = new FormData();
    sliderFiles.forEach((file, index) => {
      formData.append('files', file);
      uploadProgress[index] = 0; // Initialize progress for each file
    });

    try {
      const fetchOptions: CustomRequestInit = {
        method: 'POST',
        body: formData,
        onprogress: (event: ProgressEvent<XMLHttpRequestEventTarget>) => {
          if (event.lengthComputable) {
            const xhr = event.target as XMLHttpRequest;
            const fileIndex = parseInt(xhr.responseURL.split('/').pop() || '0');
            uploadProgress[fileIndex] = Math.round((event.loaded / event.total) * 100);
            uploadedFiles++;
            // Update the progress bar for the corresponding file
            sliderFiles = [...sliderFiles];
          }
        }
      };

      const response = await fetch('/api/admin/details/slider_handel/', fetchOptions);

      if (response.ok) {
        console.log('Files uploaded successfully');
      } else {
        console.error('Error uploading files');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    }

    console.log('Uploaded files:', sliderFiles);
  };

  const handleChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      sliderFiles = Array.from(input.files);
      uploadProgress = new Array(sliderFiles.length).fill(0); // Initialize progress for each file
      uploadedFiles = 0;
      console.log(sliderFiles);
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
      <div class="absolute bottom-0 left-0 w-full px-4 py-2">
        <div class="bg-white rounded-full overflow-hidden">
          <div
            class="bg-blue-500 h-2 rounded-full"
            style="width: {uploadProgress[index]}%;"
          ></div>
        </div>
      </div>
    {/each}
  </div>
</section>
