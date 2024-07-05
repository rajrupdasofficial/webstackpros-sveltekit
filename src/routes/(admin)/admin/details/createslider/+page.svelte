<script lang="ts">
  import { onMount } from 'svelte';
  onMount(async () => {
    const response = await fetch('/api/auth/verifyauth', {
      credentials: 'include'
    });
    if ([401, 500, 404, 403].includes(response.status)) {
      window.location.href = '/auth/login';
    } else {
      const user = response.headers.get('user-status') ?? '';
      const parsedata = JSON.parse(user);
      const isadmin = parsedata.isadmin;
      if (isadmin === false || isadmin === null) {
        window.location.href = '/';
      } else {
        console.log('Authenticated');
      }
    }
  });

  let sliderFiles: File[] = [];
  let uploadProgress: { [key: string]: number } = {};
  let isProcessing = false;
  let showAlert = false;
  let showErrorAlert = false;

  const uploadFile = async (file: File, index: number) => {
    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/admin/details/slider_handel/');

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        uploadProgress[index] = Math.round((event.loaded / event.total) * 100);
        uploadProgress = { ...uploadProgress };
      }
    };

    return new Promise((resolve, reject) => {
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject(xhr.statusText);
        }
      };
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send(formData);
    });
  };

  const handleFileUpload = async () => {
    isProcessing = true;
    showAlert = false;
    showErrorAlert = false;

    const batchSize = 3; // Adjust this value based on your needs
    const batches = [];

    for (let i = 0; i < sliderFiles.length; i += batchSize) {
      batches.push(sliderFiles.slice(i, i + batchSize));
    }

    try {
      for (const batch of batches) {
        await Promise.all(batch.map((file, index) => uploadFile(file, index)));
      }

      console.log('Files uploaded successfully');
      showAlert = true;
    } catch (error) {
      console.error('Error uploading files:', error);
      showErrorAlert = true;
    } finally {
      isProcessing = false;
    }
  };

  const handleChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      sliderFiles = Array.from(input.files);
      uploadProgress = {};
      sliderFiles.forEach((_, index) => {
        uploadProgress[index] = 0;
      });
    }
  };
</script>

<section class="relative flex flex-wrap lg:h-screen lg:items-center">
  <div class="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
    <div class="mx-auto max-w-lg text-center">
      <h1 class="text-2xl font-bold sm:text-3xl">Create Slider</h1>
      <p class="mt-4 text-gray-500">Upload Images for Slider</p>
    </div>
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
            <strong class="block font-medium text-gray-900">File upload success</strong>
            <p class="mt-1 text-sm text-gray-700">Files have been uploaded successfully to firebase</p>
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

    {#if showErrorAlert}
      <div role="alert" class="rounded border-s-4 border-red-500 bg-red-50 p-4">
        <strong class="block font-medium text-red-800">Error: Something went wrong</strong>
        <p class="mt-2 text-sm text-red-700">
          There was an error uploading the files. Please try again.
        </p>
        <button
          class="text-gray-500 transition hover:text-gray-600"
          on:click={() => (showErrorAlert = false)}
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
    {/if}

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
          {#if isProcessing}
            <div class="flex items-center justify-center">
              <div class="mr-2 animate-spin rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"></div>
              Processing...
            </div>
          {:else}
            Upload files
          {/if}
        </button>
      </div>
    </form>
  </div>

  <!-- Image preview -->
  <div class="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
    {#each sliderFiles as file, index}
      <div class="relative mb-4">
        <img
          alt=""
          src={URL.createObjectURL(file)}
          class="h-32 w-full object-cover"
        />
        <div class="absolute bottom-0 left-0 w-full px-4 py-2">
          <div class="bg-white rounded-full overflow-hidden">
            <div
              class="bg-blue-500 h-2 rounded-full"
              style="width: {uploadProgress[index]}%"
            ></div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</section>