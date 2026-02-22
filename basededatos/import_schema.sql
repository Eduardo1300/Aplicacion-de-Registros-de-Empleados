--
-- PostgreSQL database dump
--

\restrict CwuwtQgFhpu8KdxFNzTrico3WsyMmGub8FCY8wmtMCj5iq9MWaYVx21uS9UELps

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: asistencias_estado_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.asistencias_estado_enum AS ENUM (
    'PRESENTE',
    'TARDANZA',
    'AUSENTE'
);

-- Crear esquema
CREATE SCHEMA IF NOT EXISTS registro_empleados;
SET search_path TO registro_empleados, public;



ALTER TYPE public.asistencias_estado_enum OWNER TO postgres;

--
-- Name: roles_nombre_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.roles_nombre_enum AS ENUM (
    'ADMIN',
    'EMPLEADO'
);


ALTER TYPE public.roles_nombre_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: asistencias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.asistencias (
    id integer NOT NULL,
    empleado_id integer,
    observaciones text,
    "fechaAsistencia" date NOT NULL,
    "minutosTardanza" integer,
    "fechaCreacion" timestamp without time zone DEFAULT now() NOT NULL,
    estado public.asistencias_estado_enum NOT NULL,
    hora_entrada time without time zone,
    hora_salida time without time zone
);


ALTER TABLE public.asistencias OWNER TO postgres;

--
-- Name: asistencias_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.asistencias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.asistencias_id_seq OWNER TO postgres;

--
-- Name: asistencias_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.asistencias_id_seq OWNED BY public.asistencias.id;


--
-- Name: cargos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cargos (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    descripcion text,
    "fechaCreacion" timestamp without time zone DEFAULT now() NOT NULL,
    "fechaActualizacion" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.cargos OWNER TO postgres;

--
-- Name: cargos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cargos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cargos_id_seq OWNER TO postgres;

--
-- Name: cargos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cargos_id_seq OWNED BY public.cargos.id;


--
-- Name: departamentos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.departamentos (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    descripcion text,
    "fechaCreacion" timestamp without time zone DEFAULT now() NOT NULL,
    "fechaActualizacion" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.departamentos OWNER TO postgres;

--
-- Name: departamentos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.departamentos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.departamentos_id_seq OWNER TO postgres;

--
-- Name: departamentos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.departamentos_id_seq OWNED BY public.departamentos.id;


--
-- Name: empleados; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.empleados (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    apellido character varying(255) NOT NULL,
    correo character varying(255),
    telefono character varying(20),
    estado character varying(50) DEFAULT 'Activo'::character varying NOT NULL,
    departamento_id integer,
    cargo_id integer,
    "fechaIngreso" date NOT NULL,
    "fechaCreacion" timestamp without time zone DEFAULT now() NOT NULL,
    "fechaActualizacion" timestamp without time zone DEFAULT now() NOT NULL,
    dni character varying(255) NOT NULL,
    password_hash character varying(255),
    dias_vacaciones integer DEFAULT 15 NOT NULL,
    dias_vacaciones_usados integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.empleados OWNER TO postgres;

--
-- Name: empleados_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.empleados_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.empleados_id_seq OWNER TO postgres;

--
-- Name: empleados_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.empleados_id_seq OWNED BY public.empleados.id;


--
-- Name: permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.permissions (
    id integer NOT NULL,
    resource character varying(100) NOT NULL,
    action character varying(100) NOT NULL,
    descripcion character varying(255),
    "fechaCreacion" timestamp without time zone DEFAULT now() NOT NULL,
    "fechaActualizacion" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.permissions OWNER TO postgres;

--
-- Name: permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.permissions_id_seq OWNER TO postgres;

--
-- Name: permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.permissions_id_seq OWNED BY public.permissions.id;


--
-- Name: role_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role_permissions (
    id integer NOT NULL,
    "fechaCreacion" timestamp without time zone DEFAULT now() NOT NULL,
    rol_id integer,
    permission_id integer
);


ALTER TABLE public.role_permissions OWNER TO postgres;

--
-- Name: role_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.role_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.role_permissions_id_seq OWNER TO postgres;

--
-- Name: role_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.role_permissions_id_seq OWNED BY public.role_permissions.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    descripcion character varying(255),
    nombre public.roles_nombre_enum NOT NULL,
    "fechaCreacion" timestamp without time zone DEFAULT now() NOT NULL,
    "fechaActualizacion" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_seq OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: saldos_licencia; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.saldos_licencia (
    id integer NOT NULL,
    empleado_id integer,
    tipo_licencia_id integer,
    anio integer NOT NULL,
    "diasDisponibles" integer NOT NULL,
    "diasUsados" integer DEFAULT 0 NOT NULL,
    "fechaCreacion" timestamp without time zone DEFAULT now() NOT NULL,
    "fechaActualizacion" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.saldos_licencia OWNER TO postgres;

--
-- Name: saldos_licencia_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.saldos_licencia_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.saldos_licencia_id_seq OWNER TO postgres;

--
-- Name: saldos_licencia_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.saldos_licencia_id_seq OWNED BY public.saldos_licencia.id;


--
-- Name: solicitudes_licencia; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.solicitudes_licencia (
    id integer NOT NULL,
    empleado_id integer,
    tipo_licencia_id integer,
    razon text,
    estado character varying(50) DEFAULT 'PENDIENTE'::character varying NOT NULL,
    usuario_aprobador_id integer,
    observaciones text,
    "fechaInicio" date NOT NULL,
    "fechaFin" date NOT NULL,
    "diasSolicitados" integer,
    "documentoAdjunto" character varying(255),
    "afectaSaldo" boolean DEFAULT true NOT NULL,
    "fechaSolicitud" timestamp without time zone DEFAULT now() NOT NULL,
    "fechaRespuesta" timestamp without time zone
);


ALTER TABLE public.solicitudes_licencia OWNER TO postgres;

--
-- Name: solicitudes_licencia_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.solicitudes_licencia_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.solicitudes_licencia_id_seq OWNER TO postgres;

--
-- Name: solicitudes_licencia_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.solicitudes_licencia_id_seq OWNED BY public.solicitudes_licencia.id;


--
-- Name: tipos_licencia; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipos_licencia (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    descripcion text,
    remunerada boolean DEFAULT true NOT NULL,
    "diasAnuales" integer DEFAULT 0 NOT NULL,
    "fechaCreacion" timestamp without time zone DEFAULT now() NOT NULL,
    "fechaActualizacion" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.tipos_licencia OWNER TO postgres;

--
-- Name: tipos_licencia_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipos_licencia_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tipos_licencia_id_seq OWNER TO postgres;

--
-- Name: tipos_licencia_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipos_licencia_id_seq OWNED BY public.tipos_licencia.id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    clave character varying(255) NOT NULL,
    activo boolean DEFAULT true NOT NULL,
    rol_id integer,
    empleado_id integer,
    "nombreUsuario" character varying(255) NOT NULL,
    "fechaCreacion" timestamp without time zone DEFAULT now() NOT NULL,
    "fechaActualizacion" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: asistencias id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asistencias ALTER COLUMN id SET DEFAULT nextval('public.asistencias_id_seq'::regclass);


--
-- Name: cargos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cargos ALTER COLUMN id SET DEFAULT nextval('public.cargos_id_seq'::regclass);


--
-- Name: departamentos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departamentos ALTER COLUMN id SET DEFAULT nextval('public.departamentos_id_seq'::regclass);


--
-- Name: empleados id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleados ALTER COLUMN id SET DEFAULT nextval('public.empleados_id_seq'::regclass);


--
-- Name: permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions ALTER COLUMN id SET DEFAULT nextval('public.permissions_id_seq'::regclass);


--
-- Name: role_permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permissions ALTER COLUMN id SET DEFAULT nextval('public.role_permissions_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: saldos_licencia id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saldos_licencia ALTER COLUMN id SET DEFAULT nextval('public.saldos_licencia_id_seq'::regclass);


--
-- Name: solicitudes_licencia id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitudes_licencia ALTER COLUMN id SET DEFAULT nextval('public.solicitudes_licencia_id_seq'::regclass);


--
-- Name: tipos_licencia id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipos_licencia ALTER COLUMN id SET DEFAULT nextval('public.tipos_licencia_id_seq'::regclass);


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: asistencias; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.asistencias (id, empleado_id, observaciones, "fechaAsistencia", "minutosTardanza", "fechaCreacion", estado, hora_entrada, hora_salida) FROM stdin;
28	22	\N	2026-02-01	\N	2026-02-02 01:55:36.881773	TARDANZA	19:55:36	\N
\.


--
-- Data for Name: cargos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cargos (id, nombre, descripcion, "fechaCreacion", "fechaActualizacion") FROM stdin;
1	Gerente	Gerente de Departamento	2026-01-04 02:36:29.252081	2026-01-04 02:36:29.252081
2	Jefe de Equipo	Jefe de Equipo	2026-01-04 02:36:29.252081	2026-01-04 02:36:29.252081
3	Analista	Analista	2026-01-04 02:36:29.252081	2026-01-04 02:36:29.252081
4	Especialista	Especialista	2026-01-04 02:36:29.252081	2026-01-04 02:36:29.252081
5	TÃ©cnico	TÃ©cnico	2026-01-04 02:36:29.252081	2026-01-04 02:36:29.252081
6	Asistente	Asistente	2026-01-04 02:36:29.252081	2026-01-04 02:36:29.252081
7	Coordinador	Coordinador	2026-01-04 02:36:29.252081	2026-01-04 02:36:29.252081
8	Gerente	Gerente de Departamento	2026-01-04 02:37:30.43143	2026-01-04 02:37:30.43143
9	Jefe de Equipo	Jefe de Equipo	2026-01-04 02:37:30.43143	2026-01-04 02:37:30.43143
10	Analista	Analista	2026-01-04 02:37:30.43143	2026-01-04 02:37:30.43143
11	Especialista	Especialista	2026-01-04 02:37:30.43143	2026-01-04 02:37:30.43143
12	TÃ©cnico	TÃ©cnico	2026-01-04 02:37:30.43143	2026-01-04 02:37:30.43143
13	Asistente	Asistente	2026-01-04 02:37:30.43143	2026-01-04 02:37:30.43143
14	Coordinador	Coordinador	2026-01-04 02:37:30.43143	2026-01-04 02:37:30.43143
15	Gerente	Gerente de Departamento	2026-01-04 02:38:09.265659	2026-01-04 02:38:09.265659
16	Jefe de Equipo	Jefe de Equipo	2026-01-04 02:38:09.265659	2026-01-04 02:38:09.265659
17	Analista	Analista	2026-01-04 02:38:09.265659	2026-01-04 02:38:09.265659
18	Especialista	Especialista	2026-01-04 02:38:09.265659	2026-01-04 02:38:09.265659
19	TÃ©cnico	TÃ©cnico	2026-01-04 02:38:09.265659	2026-01-04 02:38:09.265659
20	Asistente	Asistente	2026-01-04 02:38:09.265659	2026-01-04 02:38:09.265659
21	Coordinador	Coordinador	2026-01-04 02:38:09.265659	2026-01-04 02:38:09.265659
22	Director	Director de Departamento	2026-02-22 00:41:08.679362	2026-02-22 00:41:08.679362
23	Supervisor	Supervisor de Área	2026-02-22 00:41:08.679362	2026-02-22 00:41:08.679362
24	Auxiliar	Auxiliar	2026-02-22 00:41:08.679362	2026-02-22 00:41:08.679362
25	Practikante	Practicante	2026-02-22 00:41:08.679362	2026-02-22 00:41:08.679362
26	Director	Director de Departamento	2026-02-22 00:50:15.998878	2026-02-22 00:50:15.998878
27	Supervisor	Supervisor de Área	2026-02-22 00:50:15.998878	2026-02-22 00:50:15.998878
28	Auxiliar	Auxiliar	2026-02-22 00:50:15.998878	2026-02-22 00:50:15.998878
29	Practicante	Practicante	2026-02-22 00:50:15.998878	2026-02-22 00:50:15.998878
30	Director	Director de Departamento	2026-02-22 00:51:06.588403	2026-02-22 00:51:06.588403
31	Supervisor	Supervisor de Área	2026-02-22 00:51:06.588403	2026-02-22 00:51:06.588403
32	Auxiliar	Auxiliar	2026-02-22 00:51:06.588403	2026-02-22 00:51:06.588403
33	Practicante	Practicante	2026-02-22 00:51:06.588403	2026-02-22 00:51:06.588403
\.


--
-- Data for Name: departamentos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.departamentos (id, nombre, descripcion, "fechaCreacion", "fechaActualizacion") FROM stdin;
6	Recursos Humanos	Departamento de Recursos Humanos	2026-01-04 02:37:30.428829	2026-01-04 02:37:30.428829
7	Sistemas	Departamento de Sistemas e InformÃ¡tica	2026-01-04 02:37:30.428829	2026-01-04 02:37:30.428829
8	Contabilidad	Departamento de Contabilidad	2026-01-04 02:37:30.428829	2026-01-04 02:37:30.428829
9	Ventas	Departamento de Ventas	2026-01-04 02:37:30.428829	2026-01-04 02:37:30.428829
10	LogÃ­stica	Departamento de LogÃ­stica	2026-01-04 02:37:30.428829	2026-01-04 02:37:30.428829
11	Recursos Humanos	Departamento de Recursos Humanos	2026-01-04 02:38:09.263106	2026-01-04 02:38:09.263106
12	Sistemas	Departamento de Sistemas e InformÃ¡tica	2026-01-04 02:38:09.263106	2026-01-04 02:38:09.263106
13	Contabilidad	Departamento de Contabilidad	2026-01-04 02:38:09.263106	2026-01-04 02:38:09.263106
14	Ventas	Departamento de Ventas	2026-01-04 02:38:09.263106	2026-01-04 02:38:09.263106
15	LogÃ­stica	Departamento de LogÃ­stica	2026-01-04 02:38:09.263106	2026-01-04 02:38:09.263106
16	Marketing	Departamento de Marketing y Publicidad	2026-02-22 00:41:08.649667	2026-02-22 00:41:08.649667
17	Atención al Cliente	Departamento de Atención al Cliente	2026-02-22 00:41:08.649667	2026-02-22 00:41:08.649667
18	Producción	Departamento de Producción	2026-02-22 00:41:08.649667	2026-02-22 00:41:08.649667
19	Compras	Departamento de Compras y Abastecimiento	2026-02-22 00:41:08.649667	2026-02-22 00:41:08.649667
20	Legal	Departamento Legal y Compliance	2026-02-22 00:41:08.649667	2026-02-22 00:41:08.649667
21	Marketing	Departamento de Marketing y Publicidad	2026-02-22 00:50:15.982723	2026-02-22 00:50:15.982723
22	Atención al Cliente	Departamento de Atención al Cliente	2026-02-22 00:50:15.982723	2026-02-22 00:50:15.982723
23	Producción	Departamento de Producción	2026-02-22 00:50:15.982723	2026-02-22 00:50:15.982723
24	Compras	Departamento de Compras y Abastecimiento	2026-02-22 00:50:15.982723	2026-02-22 00:50:15.982723
25	Legal	Departamento Legal y Compliance	2026-02-22 00:50:15.982723	2026-02-22 00:50:15.982723
26	Marketing	Departamento de Marketing y Publicidad	2026-02-22 00:51:06.586732	2026-02-22 00:51:06.586732
27	Atención al Cliente	Departamento de Atención al Cliente	2026-02-22 00:51:06.586732	2026-02-22 00:51:06.586732
28	Producción	Departamento de Producción	2026-02-22 00:51:06.586732	2026-02-22 00:51:06.586732
29	Compras	Departamento de Compras y Abastecimiento	2026-02-22 00:51:06.586732	2026-02-22 00:51:06.586732
30	Legal	Departamento Legal y Compliance	2026-02-22 00:51:06.586732	2026-02-22 00:51:06.586732
1	Recursos Humanos	Departamento de Recursos Humanos	2026-01-04 02:36:29.238137	2026-01-04 02:36:29.238137
2	Sistemas	Departamento de Sistemas e Informatica	2026-01-04 02:36:29.238137	2026-01-04 02:36:29.238137
3	Contabilidad	Departamento de Contabilidad	2026-01-04 02:36:29.238137	2026-01-04 02:36:29.238137
4	Ventas	Departamento de Ventas	2026-01-04 02:36:29.238137	2026-01-04 02:36:29.238137
5	Logistica	Departamento de Logistica	2026-01-04 02:36:29.238137	2026-01-04 02:36:29.238137
\.


--
-- Data for Name: empleados; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.empleados (id, nombre, apellido, correo, telefono, estado, departamento_id, cargo_id, "fechaIngreso", "fechaCreacion", "fechaActualizacion", dni, password_hash, dias_vacaciones, dias_vacaciones_usados) FROM stdin;
34	Jorge	Reyes Ortega	jorge.reyes@empresa.com	951623456	Activo	3	3	2023-12-15	2026-02-22 00:41:08.68161	2026-02-22 00:41:08.68161	66667777	$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy	15	0
35	Isabel	Herrera Peña	isabel.herrera@empresa.com	951723456	Activo	3	6	2024-01-10	2026-02-22 00:41:08.68161	2026-02-22 00:41:08.68161	77778888	$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy	15	0
43	Lorena	Castro Delgado	lorena.castro@empresa.com	951123461	Inactivo	4	6	2024-04-15	2026-02-22 00:41:08.68161	2026-02-22 00:41:08.68161	60606060	$2a$10$rVqKkHLqKJKJHJhKJHKJHeuKJHKKJHKJHKJHKJHKJH0e	15	0
23	María	López Hernández	maria.lopez@empresa.com	912345678	Inactivo	1	2	2024-03-20	2026-02-02 01:53:59.346714	2026-02-22 01:04:34.643882	87654321	$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy	15	2
24	Carlos	Rodríguez Fernández	carlos.rodriguez@empresa.com	923456789	Activo	1	3	2024-02-10	2026-02-02 01:53:59.347333	2026-02-19 06:20:50.837254	11223344	$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy	15	0
22	Juandasdas	Pérez García	juan.perez@empresa.com	987654321	Activo	1	1	2222-02-22	2026-02-02 01:53:59.341354	2026-02-22 00:18:55.060361	12345678	$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy	15	0
29	Sofia	Ramírez Torres	sofia.ramirez@empresa.com	951123456	Activo	2	1	2023-10-01	2026-02-22 00:41:08.68161	2026-02-22 00:41:08.68161	11112222	$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy	15	0
31	Carmen	Vega Mendoza	carmen.vega@empresa.com	951323456	Activo	2	4	2023-11-01	2026-02-22 00:41:08.68161	2026-02-22 00:41:08.68161	33334444	$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy	15	0
33	Patricia	Luna Rivera	patricia.luna@empresa.com	951523456	Activo	2	5	2023-12-01	2026-02-22 00:41:08.68161	2026-02-22 00:41:08.68161	55556666	$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy	15	0
30	Miguel	Torres Sánchez	miguel.torres@empresa.com	951223456	Activo	2	3	2023-10-15	2026-02-22 00:41:08.68161	2026-02-22 00:41:08.68161	22223333	$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy	15	0
32	Luis	Mendoza Castro	luis.mendoza@empresa.com	951423456	Activo	2	2	2023-11-15	2026-02-22 00:41:08.68161	2026-02-22 00:41:08.68161	44445555	$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy	15	0
47	Jessica	Huanca Layme	jessica.huanca@empresa.com	951123465	Activo	5	2	2024-06-15	2026-02-22 00:41:08.68161	2026-02-22 00:41:08.68161	12121212	$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy	15	0
44	Walter	Vargas Sánchez	walter.vargas@empresa.com	951123462	Activo	5	5	2024-05-01	2026-02-22 00:41:08.68161	2026-02-22 00:41:08.68161	70707070	$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy	15	0
48	Kevin	Choquehuanca	kevin.choquehuanca@empresa.com	951123466	Activo	5	5	2024-07-01	2026-02-22 00:41:08.68161	2026-02-22 00:41:08.68161	23232323	$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy	15	0
45	Adriana	Quispe Flores	adriana.quispe@empresa.com	951123463	Activo	5	3	2024-05-15	2026-02-22 00:41:08.68161	2026-02-22 00:41:08.68161	80808080	$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy	15	0
46	Marco	Condori Mamani	marco.condori@empresa.com	951123464	Activo	5	4	2024-06-01	2026-02-22 00:41:08.68161	2026-02-22 00:41:08.68161	90909090	$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy	15	0
38	Alberto	Cortés Vargas	alberto.cortes@empresa.com	951023456	Activo	3	2	2024-02-15	2026-02-22 00:41:08.68161	2026-02-22 00:41:08.68161	10101010	$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy	15	0
36	Ricardo	Navarro Soto	ricardo.navarro@empresa.com	951823456	Activo	3	4	2024-01-20	2026-02-22 00:41:08.68161	2026-02-22 00:41:08.68161	88889999	$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy	15	0
37	Monica	Escobar Ruiz	monica.escobar@empresa.com	951923456	Activo	3	3	2024-02-05	2026-02-22 00:41:08.68161	2026-02-22 00:41:08.68161	99990000	$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy	15	0
40	Sergio	Aguilar Reyes	sergio.aguilar@empresa.com	951123458	Activo	4	6	2024-03-10	2026-02-22 00:41:08.68161	2026-02-22 00:41:08.68161	30303030	$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy	15	0
42	Fernando	García Huamán	fernando.garcia@empresa.com	951123460	Activo	4	4	2024-04-01	2026-02-22 00:41:08.68161	2026-02-22 00:41:08.68161	50505050	$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy	15	0
39	Claudia	Mora Jiménez	claudia.mora@empresa.com	951123457	Activo	4	5	2024-03-01	2026-02-22 00:41:08.68161	2026-02-22 00:41:08.68161	20202020	$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy	15	0
41	Diana	Santos Molina	diana.santos@empresa.com	951123459	Activo	4	3	2024-03-20	2026-02-22 00:41:08.68161	2026-02-22 00:41:08.68161	40404040	$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy	15	0
\.


--
-- Data for Name: permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.permissions (id, resource, action, descripcion, "fechaCreacion", "fechaActualizacion") FROM stdin;
\.


--
-- Data for Name: role_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role_permissions (id, "fechaCreacion", rol_id, permission_id) FROM stdin;
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, descripcion, nombre, "fechaCreacion", "fechaActualizacion") FROM stdin;
1	Administrador del sistema	ADMIN	2026-01-04 02:33:13.787617	2026-01-04 02:33:13.787617
\.


--
-- Data for Name: saldos_licencia; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.saldos_licencia (id, empleado_id, tipo_licencia_id, anio, "diasDisponibles", "diasUsados", "fechaCreacion", "fechaActualizacion") FROM stdin;
47	23	1	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
48	24	1	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
49	22	1	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
50	29	1	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
51	30	1	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
52	31	1	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
53	32	1	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
54	33	1	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
55	34	1	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
56	35	1	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
57	36	1	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
58	37	1	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
59	38	1	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
60	39	1	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
61	40	1	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
62	41	1	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
63	42	1	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
64	43	1	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
65	44	1	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
66	45	1	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
67	46	1	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
68	47	1	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
69	48	1	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
70	23	2	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
71	24	2	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
72	22	2	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
73	29	2	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
74	30	2	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
75	31	2	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
76	32	2	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
77	33	2	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
78	34	2	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
79	35	2	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
80	36	2	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
81	37	2	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
82	38	2	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
83	39	2	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
84	40	2	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
85	41	2	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
86	42	2	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
87	43	2	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
88	44	2	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
89	45	2	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
90	46	2	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
91	47	2	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
92	48	2	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
93	23	3	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
94	24	3	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
95	22	3	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
96	29	3	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
97	30	3	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
98	31	3	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
99	32	3	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
100	33	3	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
101	34	3	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
102	35	3	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
103	36	3	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
104	37	3	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
105	38	3	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
106	39	3	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
107	40	3	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
108	41	3	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
109	42	3	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
110	43	3	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
111	44	3	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
112	45	3	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
113	46	3	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
114	47	3	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
115	48	3	2026	0	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
116	23	4	2026	90	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
117	24	4	2026	90	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
118	22	4	2026	90	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
119	29	4	2026	90	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
120	30	4	2026	90	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
121	31	4	2026	90	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
122	32	4	2026	90	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
123	33	4	2026	90	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
124	34	4	2026	90	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
125	35	4	2026	90	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
126	36	4	2026	90	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
127	37	4	2026	90	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
128	38	4	2026	90	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
129	39	4	2026	90	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
130	40	4	2026	90	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
131	41	4	2026	90	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
132	42	4	2026	90	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
133	43	4	2026	90	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
134	44	4	2026	90	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
135	45	4	2026	90	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
136	46	4	2026	90	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
137	47	4	2026	90	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
138	48	4	2026	90	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
139	23	5	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
140	24	5	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
141	22	5	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
142	29	5	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
143	30	5	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
144	31	5	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
145	32	5	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
146	33	5	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
147	34	5	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
148	35	5	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
149	36	5	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
150	37	5	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
151	38	5	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
152	39	5	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
153	40	5	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
154	41	5	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
155	42	5	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
156	43	5	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
157	44	5	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
158	45	5	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
159	46	5	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
160	47	5	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
161	48	5	2026	30	0	2026-02-22 00:51:06.602101	2026-02-22 00:51:06.602101
\.


--
-- Data for Name: solicitudes_licencia; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.solicitudes_licencia (id, empleado_id, tipo_licencia_id, razon, estado, usuario_aprobador_id, observaciones, "fechaInicio", "fechaFin", "diasSolicitados", "documentoAdjunto", "afectaSaldo", "fechaSolicitud", "fechaRespuesta") FROM stdin;
43	22	1	Vacaciones de fin de año	APROBADA	3	\N	2026-02-01	2026-02-05	5	\N	t	2026-02-22 00:52:10.699666	2026-01-21 00:00:00
44	23	2	Cita con el médico	APROBADA	3	\N	2026-02-10	2026-02-11	1	\N	t	2026-02-22 00:52:10.699666	2026-01-26 00:00:00
45	24	3	Asuntos familiares	PENDIENTE	\N	\N	2026-02-15	2026-02-16	2	\N	f	2026-02-22 00:52:10.699666	\N
46	29	1	Vacaciones programadas	PENDIENTE	\N	\N	2026-03-01	2026-03-10	8	\N	t	2026-02-22 00:52:10.699666	\N
47	30	2	Exámenes médicos	APROBADA	3	\N	2026-02-20	2026-02-21	2	\N	t	2026-02-22 00:52:10.699666	2026-02-11 00:00:00
48	31	3	Mudanza	PENDIENTE	\N	\N	2026-02-25	2026-02-28	4	\N	f	2026-02-22 00:52:10.699666	\N
49	32	1	Vacaciones	PENDIENTE	\N	\N	2026-03-15	2026-03-20	6	\N	t	2026-02-22 00:52:10.699666	\N
50	33	2	Chequeo médico	APROBADA	3	\N	2026-02-18	2026-02-19	1	\N	t	2026-02-22 00:52:10.699666	2026-02-13 00:00:00
51	34	3	Permiso personal	RECHAZADA	3	\N	2026-03-01	2026-03-03	3	\N	f	2026-02-22 00:52:10.699666	2026-02-21 00:00:00
52	35	1	Vacaciones de Semana Santa	PENDIENTE	\N	\N	2026-04-01	2026-04-10	10	\N	t	2026-02-22 00:52:10.699666	\N
53	36	2	Emergencia familiar	APROBADA	3	\N	2026-02-22	2026-02-22	1	\N	t	2026-02-22 00:52:10.699666	2026-02-19 00:00:00
54	37	3	Trámites legales	PENDIENTE	\N	\N	2026-03-10	2026-03-12	3	\N	f	2026-02-22 00:52:10.699666	\N
55	38	1	Vacaciones por festividad	PENDIENTE	\N	\N	2026-05-01	2026-05-05	5	\N	t	2026-02-22 00:52:10.699666	\N
56	39	2	Consulta médica especializada	APROBADA	3	\N	2026-03-05	2026-03-06	2	\N	t	2026-02-22 00:52:10.699666	2026-02-26 00:00:00
57	40	3	Motivos personales	PENDIENTE	\N	\N	2026-04-15	2026-04-18	4	\N	f	2026-02-22 00:52:10.699666	\N
58	41	1	Vacaciones de medio año	PENDIENTE	\N	\N	2026-06-01	2026-06-15	15	\N	t	2026-02-22 00:52:10.699666	\N
\.


--
-- Data for Name: tipos_licencia; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipos_licencia (id, nombre, descripcion, remunerada, "diasAnuales", "fechaCreacion", "fechaActualizacion") FROM stdin;
1	Vacaciones	Licencia de vacaciones	t	30	2026-01-04 02:37:57.400576	2026-01-04 02:37:57.400576
2	Enfermedad	Licencia por enfermedad	t	0	2026-01-04 02:37:57.400576	2026-01-04 02:37:57.400576
3	Personal	Licencia personal	f	0	2026-01-04 02:37:57.400576	2026-01-04 02:37:57.400576
4	Maternidad	Licencia de maternidad	t	90	2026-01-04 02:37:57.400576	2026-01-04 02:37:57.400576
5	Paternidad	Licencia de paternidad	t	30	2026-01-04 02:37:57.400576	2026-01-04 02:37:57.400576
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, clave, activo, rol_id, empleado_id, "nombreUsuario", "fechaCreacion", "fechaActualizacion") FROM stdin;
3	$2b$10$ftXRIg3313Sc0DjEwHparerq7HUdJxUUvebd2aKuIFR3m8d1yhGjq	t	1	\N	admin	2026-02-19 05:46:19.758188	2026-02-19 05:46:19.758188
\.


--
-- Name: asistencias_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.asistencias_id_seq', 29, true);


--
-- Name: cargos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cargos_id_seq', 33, true);


--
-- Name: departamentos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.departamentos_id_seq', 30, true);


--
-- Name: empleados_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.empleados_id_seq', 88, true);


--
-- Name: permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.permissions_id_seq', 1, false);


--
-- Name: role_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.role_permissions_id_seq', 1, false);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 2, true);


--
-- Name: saldos_licencia_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.saldos_licencia_id_seq', 161, true);


--
-- Name: solicitudes_licencia_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.solicitudes_licencia_id_seq', 58, true);


--
-- Name: tipos_licencia_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipos_licencia_id_seq', 5, true);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 4, true);


--
-- Name: role_permissions PK_84059017c90bfcb701b8fa42297; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT "PK_84059017c90bfcb701b8fa42297" PRIMARY KEY (id);


--
-- Name: permissions PK_920331560282b8bd21bb02290df; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY (id);


--
-- Name: permissions UQ_89456a09b598ce8915c702c5283; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT "UQ_89456a09b598ce8915c702c5283" UNIQUE (resource);


--
-- Name: usuarios UQ_a263b94b107a7aa7bb71f951c92; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT "UQ_a263b94b107a7aa7bb71f951c92" UNIQUE (empleado_id);


--
-- Name: roles UQ_a5be7aa67e759e347b1c6464e10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "UQ_a5be7aa67e759e347b1c6464e10" UNIQUE (nombre);


--
-- Name: empleados UQ_afc994b391d9f1326400c803eed; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleados
    ADD CONSTRAINT "UQ_afc994b391d9f1326400c803eed" UNIQUE (dni);


--
-- Name: usuarios UQ_b948c9bc89671151c8ab12d409d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT "UQ_b948c9bc89671151c8ab12d409d" UNIQUE ("nombreUsuario");


--
-- Name: asistencias asistencias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asistencias
    ADD CONSTRAINT asistencias_pkey PRIMARY KEY (id);


--
-- Name: cargos cargos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cargos
    ADD CONSTRAINT cargos_pkey PRIMARY KEY (id);


--
-- Name: departamentos departamentos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departamentos
    ADD CONSTRAINT departamentos_pkey PRIMARY KEY (id);


--
-- Name: empleados empleados_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleados
    ADD CONSTRAINT empleados_pkey PRIMARY KEY (id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: saldos_licencia saldos_licencia_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saldos_licencia
    ADD CONSTRAINT saldos_licencia_pkey PRIMARY KEY (id);


--
-- Name: solicitudes_licencia solicitudes_licencia_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitudes_licencia
    ADD CONSTRAINT solicitudes_licencia_pkey PRIMARY KEY (id);


--
-- Name: tipos_licencia tipos_licencia_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipos_licencia
    ADD CONSTRAINT tipos_licencia_pkey PRIMARY KEY (id);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: solicitudes_licencia FK_023c56b8139a902e67f0a28a000; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitudes_licencia
    ADD CONSTRAINT "FK_023c56b8139a902e67f0a28a000" FOREIGN KEY (tipo_licencia_id) REFERENCES public.tipos_licencia(id);


--
-- Name: role_permissions FK_17022daf3f885f7d35423e9971e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT "FK_17022daf3f885f7d35423e9971e" FOREIGN KEY (permission_id) REFERENCES public.permissions(id) ON DELETE CASCADE;


--
-- Name: asistencias FK_37a14c1b1fc674a43e56652eb75; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asistencias
    ADD CONSTRAINT "FK_37a14c1b1fc674a43e56652eb75" FOREIGN KEY (empleado_id) REFERENCES public.empleados(id);


--
-- Name: usuarios FK_9e519760a660751f4fa21453d3e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT "FK_9e519760a660751f4fa21453d3e" FOREIGN KEY (rol_id) REFERENCES public.roles(id);


--
-- Name: usuarios FK_a263b94b107a7aa7bb71f951c92; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT "FK_a263b94b107a7aa7bb71f951c92" FOREIGN KEY (empleado_id) REFERENCES public.empleados(id);


--
-- Name: solicitudes_licencia FK_a8d846c7f42d0d82301009227d6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitudes_licencia
    ADD CONSTRAINT "FK_a8d846c7f42d0d82301009227d6" FOREIGN KEY (usuario_aprobador_id) REFERENCES public.usuarios(id);


--
-- Name: saldos_licencia FK_a9160eed4f2c18a5d552f792a65; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saldos_licencia
    ADD CONSTRAINT "FK_a9160eed4f2c18a5d552f792a65" FOREIGN KEY (empleado_id) REFERENCES public.empleados(id);


--
-- Name: role_permissions FK_bc89d03c0064739735ac156d90d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT "FK_bc89d03c0064739735ac156d90d" FOREIGN KEY (rol_id) REFERENCES public.roles(id) ON DELETE CASCADE;


--
-- Name: empleados FK_bdbc708c1823caeb6d68a4be47b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleados
    ADD CONSTRAINT "FK_bdbc708c1823caeb6d68a4be47b" FOREIGN KEY (departamento_id) REFERENCES public.departamentos(id);


--
-- Name: empleados FK_e2df7632b45fe9b705cbae1fee7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleados
    ADD CONSTRAINT "FK_e2df7632b45fe9b705cbae1fee7" FOREIGN KEY (cargo_id) REFERENCES public.cargos(id);


--
-- Name: saldos_licencia FK_e371e9e5ff257188d4515c9761f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saldos_licencia
    ADD CONSTRAINT "FK_e371e9e5ff257188d4515c9761f" FOREIGN KEY (tipo_licencia_id) REFERENCES public.tipos_licencia(id);


--
-- Name: solicitudes_licencia FK_f6966937256a41ac0ca574f18fa; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitudes_licencia
    ADD CONSTRAINT "FK_f6966937256a41ac0ca574f18fa" FOREIGN KEY (empleado_id) REFERENCES public.empleados(id);


--
-- PostgreSQL database dump complete
--

\unrestrict CwuwtQgFhpu8KdxFNzTrico3WsyMmGub8FCY8wmtMCj5iq9MWaYVx21uS9UELps

