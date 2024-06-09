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

{#if records}
  <Table hoverable={true} class="dark w-full" shadow>
    <TableHead>
      <TableHeadCell class="text-center">#</TableHeadCell>
      <TableHeadCell class="text-center">ID</TableHeadCell>
      <TableHeadCell>Empresa</TableHeadCell>
      <TableHeadCell class="text-center">Fecha</TableHeadCell>
      <TableHeadCell>Producto</TableHeadCell>
      <TableHeadCell class="text-center">Precio</TableHeadCell>
      <TableHeadCell>Provincia</TableHeadCell>
      <TableHeadCell>Localidad</TableHeadCell>
      <TableHeadCell>Dirección</TableHeadCell>
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
