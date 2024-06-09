export interface Dataset {
  help: string;
  success: boolean;
  result: Result;
}

export interface Result {
  include_total: boolean;
  resource_id: string;
  fields: Field[];
  records_format: string;
  records: Record[];
  limit: number;
  filters: Filters;
  _links: Links;
  total: number;
}

export interface Links {
  start: string;
  next: string;
}

export interface Field {
  type: Type;
  id: string;
}

export enum Type {
  Numeric = "numeric",
  Text = "text",
  Timestamp = "timestamp",
}

export interface Filters {}

export interface Record {
  idtipohorario: number;
  latitud: number | null;
  empresa: string;
  provincia: Provincia;
  idempresabandera: number;
  cuit: string;
  producto: Producto;
  idempresa: number;
  region: Region;
  precio: number;
  geojson: string;
  direccion: string;
  fecha_vigencia: Date;
  idproducto: number;
  indice_tiempo: IndiceTiempo;
  tipohorario: Tipohorario;
  empresabandera: Empresabandera;
  localidad: string;
  longitud: number | null;
}

export enum Empresabandera {
  "AXION" = "AXION",
  "BLANCA" = "BLANCA",
  "DAPSA S.A." = "DAPSA",
  "GULF" = "GULF",
  "OIL COMBUSTIBLES S.A." = "OIL",
  "PUMA" = "PUMA",
  "REFINOR" = "REFINOR",
  "SHELL C.A.P.S.A." = "SHELL",
  "SIN EMPRESA BANDERA" = "SIN EMPRESA BANDERA",
  "VOY" = "VOY",
  "YPF" = "YPF",
}

// export enum Empresabandera {
//   "26" = "AXION",
//   "1" = "BLANCA",
//   "6" = "DAPSA S.A.",
//   "29" = "GULF",
//   "24" = "OIL COMBUSTIBLES S.A.",
//   "28" = "PUMA",
//   "8" = "REFINOR",
//   "4" = "SHELL C.A.P.S.A.",
//   "-1" = "SIN EMPRESA BANDERA",
//   "30" = "VOY",
//   "2" = "YPF",
// }

export enum IndiceTiempo {
  The201606 = "2016-06",
  The201608 = "2016-08",
  The201701 = "2017-01",
  The201702 = "2017-02",
  The201703 = "2017-03",
  The201704 = "2017-04",
  The201705 = "2017-05",
  The201706 = "2017-06",
  The201707 = "2017-07",
  The201710 = "2017-10",
  The201711 = "2017-11",
  The201712 = "2017-12",
  The201801 = "2018-01",
  The201802 = "2018-02",
  The201803 = "2018-03",
  The201804 = "2018-04",
  The201805 = "2018-05",
  The201806 = "2018-06",
  The201807 = "2018-07",
  The201808 = "2018-08",
  The201809 = "2018-09",
  The201810 = "2018-10",
  The201811 = "2018-11",
  The201812 = "2018-12",
  The201903 = "2019-03",
  The201904 = "2019-04",
  The201905 = "2019-05",
  The201906 = "2019-06",
  The201907 = "2019-07",
  The201908 = "2019-08",
  The201909 = "2019-09",
  The201910 = "2019-10",
  The201911 = "2019-11",
  The201912 = "2019-12",
  The202001 = "2020-01",
  The202008 = "2020-08",
  The202009 = "2020-09",
  The202010 = "2020-10",
  The202012 = "2020-12",
  The202101 = "2021-01",
  The202102 = "2021-02",
  The202103 = "2021-03",
  The202104 = "2021-04",
  The202105 = "2021-05",
  The202106 = "2021-06",
  The202107 = "2021-07",
  The202108 = "2021-08",
  The202111 = "2021-11",
  The202112 = "2021-12",
  The202202 = "2022-02",
  The202203 = "2022-03",
  The202204 = "2022-04",
  The202205 = "2022-05",
  The202206 = "2022-06",
  The202207 = "2022-07",
  The202208 = "2022-08",
  The202209 = "2022-09",
  The202210 = "2022-10",
  The202211 = "2022-11",
  The202212 = "2022-12",
  The202301 = "2023-01",
  The202302 = "2023-02",
  The202303 = "2023-03",
  The202304 = "2023-04",
  The202305 = "2023-05",
  The202306 = "2023-06",
  The202307 = "2023-07",
  The202308 = "2023-08",
  The202309 = "2023-09",
  The202310 = "2023-10",
  The202311 = "2023-11",
  The202312 = "2023-12",
  The202401 = "2024-01",
  The202402 = "2024-02",
  The202403 = "2024-03",
  The202404 = "2024-04",
  The202405 = "2024-05",
}

export enum Producto {
  "Gas Oil Grado 2" = "Gasoil °2",
  "Gas Oil Grado 3" = "Gasoil °3",
  "GNC" = "GNC",
  "Nafta (premium) de más de 95 Ron" = "Nafta Premium",
  "Nafta (súper) entre 92 y 95 Ron" = "Nafta Súper",
}

export enum Provincia {
  "BUENOS AIRES" = "BUENOS AIRES",
  "CAPITAL FEDERAL" = "CAPITAL FEDERAL",
  "CATAMARCA" = "CATAMARCA",
  "CHACO" = "CHACO",
  "CHUBUT" = "CHUBUT",
  "CORDOBA" = "CORDOBA",
  "CORRIENTES" = "CORRIENTES",
  "ENTRE RIOS" = "ENTRE RIOS",
  "FORMOSA" = "FORMOSA",
  "JUJUY" = "JUJUY",
  "LA PAMPA" = "LA PAMPA",
  "LA RIOJA" = "LA RIOJA",
  "MENDOZA" = "MENDOZA",
  "MISIONES" = "MISIONES",
  "NEUQUEN" = "NEUQUEN",
  "RIO NEGRO" = "RIO NEGRO",
  "SAN JUAN" = "SAN JUAN",
  "SAN LUIS" = "SAN LUIS",
  "SALTA" = "SALTA",
  "SANTA CRUZ" = "SANTA CRUZ",
  "SANTA FE" = "SANTA FE",
  "SANTIAGO DEL ESTERO" = "SANTIAGO DEL ESTERO",
  "TIERRA DEL FUEGO" = "TIERRA DEL FUEGO",
  "TUCUMAN" = "TUCUMAN",
}

export enum Region {
  Centro = "CENTRO",
  Cuyo = "CUYO",
  Empty = "",
  Nea = "NEA",
  Noa = "NOA",
  Pampeana = "PAMPEANA",
  Patagonia = "PATAGONIA",
}

export enum Tipohorario {
  Diurno = "Diurno",
  Nocturno = "Nocturno",
}
