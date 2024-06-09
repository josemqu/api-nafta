<script>
  import {
    APP_STATUS,
    appStatus,
    appStatusInfo,
    setAppStatusError,
    setAppStatusLoaded,
  } from "../store.ts";
  import { Label, Input, Select, MultiSelect, Badge } from "flowbite-svelte";
  import { Button, Spinner } from "flowbite-svelte";
  import { Producto, Provincia, Empresabandera } from "../utils/types.ts";

  let loading = false;
  let selectedProvincia = $appStatusInfo.selectedProvincia;
  let selectedProducto = $appStatusInfo.selectedProducto;
  let selectedBandera = $appStatusInfo.selectedBandera;

  console.log({
    selectedProducto,
    selectedBandera,
    selectedProvincia,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    loading = true;
    console.log("Form submitted");

    // reset app status
    appStatus.set(APP_STATUS.LOADING);

    appStatusInfo.set({
      ...$appStatusInfo,
      selectedProducto,
      selectedBandera,
      selectedProvincia,
    });

    const searchParams = new URLSearchParams();
    if (!!selectedProducto) searchParams.append("producto", selectedProducto);
    if (!!selectedBandera)
      searchParams.append("empresabandera", selectedBandera);
    if (!!selectedProvincia)
      searchParams.append("provincia", selectedProvincia);

    try {
      const url = `/api/prices?${searchParams.toString()}`;
      console.log({ url });

      const response = await fetch(url);
      // console.log({ response });
      if (!response.ok) {
        throw new Error("Error al consultar los precios");
      }

      const data = await response.json();

      setAppStatusLoaded({
        selectedProducto,
        selectedBandera,
        selectedProvincia,
        records: data.result.records,
        total: data.result.total,
        page: data.result.page,
        limit: data.result.limit,
      });

      const info = $appStatusInfo;
      console.log({ info });
    } catch (error) {
      console.error(error);
      console.log("catched error");
      setAppStatusError();
    } finally {
      loading = false;
    }
  };

  // get provincias from Provincia type
  let provincias = Object.keys(Provincia).map((key) => ({
    value: key,
    name: Provincia[key],
  }));

  // get productos from Producto type
  let productos = Object.keys(Producto).map((key) => ({
    value: key,
    name: Producto[key],
  }));

  // get banderas from Empresabandera type
  let banderas = Object.keys(Empresabandera).map((key) => ({
    value: key,
    name: Empresabandera[key],
  }));

  console.log({ provincias, productos, banderas });

  const records = $appStatusInfo.records;
</script>

<form class="w-full mb-4" on:submit={handleSubmit} id="form-init">
  <div class="flex justify-between gap-4">
    <div class="mb-4 dark">
      <Label>
        Seleccione un combustible
        <MultiSelect
          placeholder="Seleccione un combustible..."
          class="mt-2 min-w-96 bg-slate-900"
          items={productos}
          bind:value={selectedProducto}
          on:change={handleSubmit}
        />
      </Label>
    </div>
    <div class="mb-6 dark">
      <Label>
        Seleccione una bandera
        <MultiSelect
          placeholder="Seleccione una bandera..."
          class="mt-2 min-w-96 bg-slate-900"
          items={banderas}
          bind:value={selectedBandera}
        />
      </Label>
    </div>
    <div class="mb-6 dark">
      <Label>
        Seleccione una provincia
        <MultiSelect
          placeholder="Seleccione una provincia..."
          class="mt-2 min-w-96 bg-slate-900"
          items={provincias}
          bind:value={selectedProvincia}
          on:change={handleSubmit}
        />
      </Label>
    </div>
  </div>
  <div class="flex justify-between align-middle">
    <div>
      <Button color="dark" type="submit" disabled={loading} class="h-10 mr-4">
        {#if $appStatus === APP_STATUS.LOADING}
          <Spinner class="me-3" size="4" />Loading ...
        {:else}
          Consultar
        {/if}
      </Button>
    </div>
    <div class="flex justify-center items-center gap-4">
      {#if records.length > 0}
        <Badge color="green">
          {selectedProducto?.length > 0
            ? selectedProducto
                ?.map((el) => {
                  return Producto[el];
                })
                .join(", ")
            : "Todos"}
        </Badge>
        <Badge color="green">
          {selectedBandera?.length > 0
            ? selectedBandera
                ?.map((el) => {
                  return Empresabandera[el];
                })
                .join(", ")
            : "Todas"}
        </Badge>
        <Badge color="green">
          {selectedProvincia?.length > 0
            ? selectedProvincia?.join(", ")
            : "Todas"}
        </Badge>
        <Badge color="green">
          {records.length} registros
        </Badge>
      {/if}
    </div>
  </div>
</form>
