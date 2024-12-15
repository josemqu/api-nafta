<script>
  import {
    APP_STATUS,
    appStatus,
    appStatusInfo,
    setAppStatusLoaded,
  } from "../store.ts";

  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from "flowbite-svelte";

  import { Producto, Provincia, Empresabandera } from "../utils/types.ts";

  const records = $appStatusInfo.records;
</script>

<!-- <div class="sticky top-0"> -->
{#if records}
  <Table hoverable={true} class="relative dark w-full" shadow>
    <TableHead>
      <TableHeadCell class="sticky top-0 text-center">#</TableHeadCell>
      <TableHeadCell class="sticky top-0 text-center">ID</TableHeadCell>
      <TableHeadCell class="sticky top-0">Empresa</TableHeadCell>
      <TableHeadCell class="sticky top-0 text-center">Fecha</TableHeadCell>
      <TableHeadCell class="sticky top-0">Producto</TableHeadCell>
      <TableHeadCell class="sticky top-0 text-center">Precio</TableHeadCell>
      <TableHeadCell class="sticky top-0">Provincia</TableHeadCell>
      <TableHeadCell class="sticky top-0">Localidad</TableHeadCell>
      <TableHeadCell class="sticky top-0">Dirección</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
      {#each records as record, i}
        <TableBodyRow>
          <TableBodyCell class="text-center">{i + 1}</TableBodyCell>
          <TableBodyCell class="text-center">{record.idempresa}</TableBodyCell>
          <TableBodyCell>{Empresabandera[record.empresabandera]}</TableBodyCell>
          <TableBodyCell class="text-center">
            {new Date(record.fecha_vigencia).toLocaleString("es-AR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </TableBodyCell>
          <TableBodyCell>{Producto[record.producto]}</TableBodyCell>
          <TableBodyCell class="text-right max-w-10">
            <div class="flex justify-between">
              <span>$</span>
              <span>
                {record.precio.toLocaleString("es-AR", {
                  minimumFractionDigits: 2,
                  localeMatcher: "lookup",
                  style: "decimal",
                })}
              </span>
            </div>
          </TableBodyCell>
          <TableBodyCell>{record.provincia}</TableBodyCell>
          <TableBodyCell>{record.localidad}</TableBodyCell>
          <TableBodyCell>{record.direccion}</TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
{/if}

{#if $appStatus === APP_STATUS.ERROR}
  <span class="text-red-500">Error</span>
{/if}

{#if $appStatus === APP_STATUS.LOADING}
  <span class="text-yellow-500">Cargando...</span>
{/if}

<!-- </div> -->

<style>
</style>
