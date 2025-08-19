<script lang="ts">
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
  const selectedDate = $appStatusInfo.selectedDate;

  // Sorting state
  let sortKey:
    | "idempresa"
    | "empresa"
    | "fecha"
    | "producto"
    | "precio"
    | "provincia"
    | "localidad"
    | "direccion"
    | null = null;
  let sortDir: "asc" | "desc" = "asc";

  const toggleSort = (key) => {
    if (sortKey === key) {
      sortDir = sortDir === "asc" ? "desc" : "asc";
    } else {
      sortKey = key;
      sortDir = "asc";
    }
  };

  // Helper function to check if a record matches the selected date
  const matchesDateFilter = (record) => {
    if (!selectedDate) return true;
    const recordDate = new Date(record.fecha_vigencia);
    const filterDate = new Date(selectedDate);
    
    // Compare only the date part (ignore time)
    return recordDate.toDateString() === filterDate.toDateString();
  };

  // Filter records by date first, then sort
  $: filteredRecords = (() => {
    if (!records || !Array.isArray(records)) return [];
    return records.filter(matchesDateFilter);
  })();

  // Derived sorted records
  $: sortedRecords = (() => {
    if (!filteredRecords || !Array.isArray(filteredRecords) || !sortKey) return filteredRecords;
    const factor = sortDir === "asc" ? 1 : -1;
    const arr = [...filteredRecords];
    arr.sort((a, b) => {
      const getVal = (r) => {
        switch (sortKey) {
          case "idempresa":
            return Number(r.idempresa ?? 0);
          case "empresa":
            return String(r.empresa ?? "").toLowerCase();
          case "fecha":
            return new Date(r.fecha_vigencia).getTime();
          case "producto":
            return String(Producto[r.producto] ?? "").toLowerCase();
          case "precio":
            return Number(r.precio ?? 0);
          case "provincia":
            return String(r.provincia ?? "").toLowerCase();
          case "localidad":
            return String(r.localidad ?? "").toLowerCase();
          case "direccion":
            return String(r.direccion ?? "").toLowerCase();
          default:
            return 0;
        }
      };
      const va = getVal(a);
      const vb = getVal(b);
      if (va < vb) return -1 * factor;
      if (va > vb) return 1 * factor;
      return 0;
    });
    return arr;
  })();
</script>

<!-- <div class="sticky top-0"> -->
{#if records}
  <Table hoverable={true} class="relative dark w-full" shadow>
    <TableHead>
      <TableHeadCell class="sticky top-0 text-center">#</TableHeadCell>
      <TableHeadCell
        class="sticky top-0 text-center cursor-pointer select-none"
        on:click={() => toggleSort("idempresa")}
        aria-label="Ordenar por ID"
      >
        ID {sortKey === "idempresa" ? (sortDir === "asc" ? "▲" : "▼") : ""}
      </TableHeadCell>
      <TableHeadCell
        class="sticky top-0 cursor-pointer select-none"
        on:click={() => toggleSort("empresa")}
        aria-label="Ordenar por Empresa"
      >
        Empresa {sortKey === "empresa" ? (sortDir === "asc" ? "▲" : "▼") : ""}
      </TableHeadCell>
      <TableHeadCell
        class="sticky top-0 text-center cursor-pointer select-none"
        on:click={() => toggleSort("fecha")}
        aria-label="Ordenar por Fecha"
      >
        Fecha {sortKey === "fecha" ? (sortDir === "asc" ? "▲" : "▼") : ""}
      </TableHeadCell>
      <TableHeadCell
        class="sticky top-0 cursor-pointer select-none"
        on:click={() => toggleSort("producto")}
        aria-label="Ordenar por Producto"
      >
        Producto {sortKey === "producto" ? (sortDir === "asc" ? "▲" : "▼") : ""}
      </TableHeadCell>
      <TableHeadCell
        class="sticky top-0 text-center cursor-pointer select-none"
        on:click={() => toggleSort("precio")}
        aria-label="Ordenar por Precio"
      >
        Precio {sortKey === "precio" ? (sortDir === "asc" ? "▲" : "▼") : ""}
      </TableHeadCell>
      <TableHeadCell
        class="sticky top-0 cursor-pointer select-none"
        on:click={() => toggleSort("provincia")}
        aria-label="Ordenar por Provincia"
      >
        Provincia {sortKey === "provincia"
          ? sortDir === "asc"
            ? "▲"
            : "▼"
          : ""}
      </TableHeadCell>
      <TableHeadCell
        class="sticky top-0 cursor-pointer select-none"
        on:click={() => toggleSort("localidad")}
        aria-label="Ordenar por Localidad"
      >
        Localidad {sortKey === "localidad"
          ? sortDir === "asc"
            ? "▲"
            : "▼"
          : ""}
      </TableHeadCell>
      <TableHeadCell
        class="sticky top-0 cursor-pointer select-none"
        on:click={() => toggleSort("direccion")}
        aria-label="Ordenar por Dirección"
      >
        Dirección {sortKey === "direccion"
          ? sortDir === "asc"
            ? "▲"
            : "▼"
          : ""}
      </TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
      {#each sortedRecords as record, i}
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
