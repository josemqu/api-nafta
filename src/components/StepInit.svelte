<script>
  import { APP_STATUS, appStatus, setAppStatusLoaded } from "../store.ts";
  import { Label, Input, Select } from "flowbite-svelte";
  import { appStatusInfo, setAppStatusError } from "../store";
  import { Button, Spinner } from "flowbite-svelte";

  let loading = false;
  let selectedProvince;
  let selectedFuel;

  const handleSubmit = async (event) => {
    event.preventDefault();
    loading = true;
    console.log("Form submitted");

    const searchParams = new URLSearchParams();
    if (!!selectedProvince) searchParams.append("province", selectedProvince);
    if (!!selectedFuel) searchParams.append("fuel", selectedFuel);

    try {
      const url = `/api/prices?${searchParams.toString()}`;
      console.log({ url });

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error al consultar los precios");
      }

      const data = await response.json();

      console.log(data.result.records);

      appStatusInfo({
        message: "Precios consultados correctamente",
        data: data.result.records,
      });
      setAppStatusLoaded();
    } catch (error) {
      setAppStatusError();
    } finally {
      loading = false;
    }
  };

  let provinces = [
    { value: "caba", name: "Capital Federal" },
    { value: "buenos-aires", name: "Buenos Aires" },
    { value: "catamarca", name: "Catamarca" },
    { value: "chaco", name: "Chaco" },
    { value: "chubut", name: "Chubut" },
    { value: "cordoba", name: "Córdoba" },
    { value: "corrientes", name: "Corrientes" },
    { value: "entre-rios", name: "Entre Ríos" },
    { value: "formosa", name: "Formosa" },
    { value: "jujuy", name: "Jujuy" },
    { value: "la-pampa", name: "La Pampa" },
    { value: "la-rioja", name: "La Rioja" },
    { value: "mendoza", name: "Mendoza" },
    { value: "misiones", name: "Misiones" },
    { value: "neuquen", name: "Neuquén" },
  ];

  let fuels = [
    { value: "gnc", name: "GNC" },
    { value: "gasoil", name: "Gasoil" },
    { value: "premium", name: "Premium" },
    { value: "comun", name: "Común" },
  ];
</script>

<form class="max-w-80 w-full" on:submit={handleSubmit} id="form-init">
  <div class="mb-6 dark">
    <Label>
      Seleccione una provincia
      <Select
        placeholder="Seleccione una provincia..."
        class="mt-2"
        items={provinces}
        bind:value={selectedProvince}
      />
    </Label>
  </div>
  <div class="mb-6 dark">
    <Label>
      Seleccione un combustible
      <Select
        placeholder="Seleccione un combustible..."
        class="mt-2"
        items={fuels}
        bind:value={selectedFuel}
      />
    </Label>
  </div>
  <Button color="dark" type="submit" disabled={loading}>
    {#if $appStatus === APP_STATUS.LOADING}
      <Spinner class="me-3" size="4" />Loading ...
    {:else}
      Consultar
    {/if}
  </Button>
</form>
