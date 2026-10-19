<script lang="ts">
  import '../app.css';
  import { SvelteToast } from '@zerodevx/svelte-toast';
  import Header from '$lib/components/Header.svelte';
  import favicon from '$lib/assets/favicon.ico';

  let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<SvelteToast />

<header class="mt-12 mb-4">
  <Header />
</header>
{@render children()}
