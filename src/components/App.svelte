<script>
  import { Alert } from "flowbite-svelte";
  import { APP_STATUS, appStatus } from "../store.ts";
  import StepInit from "./StepInit.svelte";
  import StepLoading from "./StepLoading.svelte";
  import StepLoaded from "./StepLoaded.svelte";
</script>

{#if $appStatus === APP_STATUS.INIT}
  <StepInit />
{:else if $appStatus === APP_STATUS.LOADING}
  <StepInit />
  <StepLoading />
{:else if $appStatus === APP_STATUS.LOADED}
  <StepInit />
  <StepLoaded />
{:else if $appStatus === APP_STATUS.ERROR}
  <StepInit />
  <Alert class="dark">
    <span>Algo malo ha pasado. Hay un error en la aplicación</span>
  </Alert>
{:else}
  <Alert>
    <span>Estado desconocido</span>
  </Alert>
{/if}
