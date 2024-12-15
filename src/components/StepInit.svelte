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
  let zone = $appStatusInfo.zone;

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    loading = true;

    // get form data
    const formData = new FormData();
    formData.append("producto", selectedProducto);
    formData.append("empresabandera", selectedBandera);
    formData.append("provincia", selectedProvincia);
    formData.append("zone", document.getElementById("zone-input").value);

    // get data from formData
    const zone = formData.get("zone");

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
      const url = `/api/prices?${searchParams.toString()}`; // ?${searchParams.toString()}

      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al consultar los precios");
      }

      const data = await response.json();

      setAppStatusLoaded({
        selectedProducto,
        selectedBandera,
        selectedProvincia,
        zone,
        records: data.result.records,
        total: data.result.total,
        page: data.result.page,
        limit: data.result.limit,
        time: data.time,
      });

      const info = $appStatusInfo;
    } catch (error) {
      console.error(error);
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

  const records = $appStatusInfo.records;
  const time = $appStatusInfo.time;
</script>

<form
  class="w-full p-4 mb-4 rounded-lg sticky top-4 bg-gray-700 shadow-xl border border-slate-600 z-20"
  on:submit={handleSubmit}
  id="form-init"
>
  <div class="flex justify-between gap-4">
    <div class="mb-6 dark">
      <Label>
        Banderas
        <MultiSelect
          placeholder="Seleccione una o varias..."
          class="mt-2 min-w-60 bg-gray-900"
          items={banderas}
          bind:value={selectedBandera}
        />
      </Label>
    </div>
    <div class="mb-4 dark">
      <Label>
        Combustibles
        <MultiSelect
          placeholder="Seleccione uno o varios..."
          class="mt-2 min-w-60 bg-gray-900"
          items={productos}
          bind:value={selectedProducto}
        />
      </Label>
    </div>
    <div class="mb-6 dark">
      <Label>
        Provincias
        <MultiSelect
          placeholder="Seleccione una o varias..."
          class="mt-2 min-w-60 bg-gray-900"
          items={provincias}
          bind:value={selectedProvincia}
        />
      </Label>
    </div>
    <div class="mb-6">
      <Label for="zone-input" class="block mb-2">Zona</Label>
      <Input
        id="zone-input"
        name="zone-input"
        class="mt-2 min-w-60 bg-slate-900 border-slate-600"
        placeholder="min Lng, min Lat, max Lng, max Lat"
        bind:value={zone}
      />
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
        <Badge color="blue">
          {selectedBandera?.length > 0
            ? selectedBandera
                ?.map((el) => {
                  return Empresabandera[el];
                })
                .join(", ")
            : "Todas las banderas"}
        </Badge>
        <Badge color="blue">
          {selectedProducto?.length > 0
            ? selectedProducto
                ?.map((el) => {
                  return Producto[el];
                })
                .join(", ")
            : "Todos los combustibles"}
        </Badge>
        <Badge color="blue">
          {selectedProvincia?.length > 0
            ? selectedProvincia?.join(", ")
            : "Todas las provincias"}
        </Badge>
        <Badge color="blue">
          {records.length} registros
        </Badge>
        <Badge color="blue">
          {(time / 60).toLocaleString("es-AR", { minimumFractionDigits: 2 })} segundos
        </Badge>
      {/if}
    </div>
  </div>
</form>
