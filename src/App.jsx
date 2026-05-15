import React, { useState } from "react";

const P='#0A3D62',A='#B5451B',G='#276749',W='#B7791F',R='#9B2C2C';
const BB1='#C8902A',BB2='#B87848',BB3='#A86040',BB4='#D4B478',BB5='#C0A060';
const BBCB='#F5EDE0',BBCS='#EAD8C0';
const BG='#F0F7FF',CA='#FFF',MU='#4A6E8A',BO='#C0D8F0',LI='#DFF0FF';
const MESES_S1=['enero','febrero','marzo','abril','mayo','junio'];
const MESES_S2=['agosto','septiembre','octubre','noviembre','diciembre'];
const MESES=['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
const MESES_FULL=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
const MESES_SEM=(function(){var d=new Date();return d.getMonth()<6?MESES_S1:MESES_S2;})();
const PCOL={'1':R,'2':W,'3':'#1A6FA8','4':G};
const AREAS_SUG=['Vida de oración personal','Lectura bíblica','Seguimiento a Curso de Enseñanza Comunitaria','Vivencia y fidelidad a los compromisos de la Alianza','Fidelidad al Grupo Pastoral (asistencia, puntualidad, participación, sigilo, relaciones sanas, fraternidad, vida a la luz)','Participación en el culto comunitario','Fortalecimiento del carácter masculino / femenino','Vida familiar y relaciones','Servicio comunitario','Discernimiento vocacional'];
const PPC_GOALS_DEFAULT=['Asegurar el adecuado Cuidado Pastoral de todos los miembros de la Comunidad.','Fortalecer nuestro Modo de Vida.'];
function semLabel(s){if(!s)return s;var y=(s||'').split('-')[0];return(s||'').endsWith('S1')?'enero – junio '+y:'julio – diciembre '+y;}
const SERVICIOS_LIST=['Administrador','CIM','Consejo de Hombres — Sector Nazaret (CDH SN)','Consejo de Hombres — Sector San Miguel (CDHS)','Consejo de la Comunidad (CDC)','Equipo de Liderazgo Femenino — Sector Nazaret (ELF SN)','Equipo de Liderazgo Femenino — Sector San Miguel (ELF SSM)','Kairós','Kerygma','MANÁ','MCU','Ministerio de Intercesión','Ministerio de Música','Ministerio de Servicios (EDS)','Moderadora de GP','MPC','Responsable Pastoral (RP)','Shemá','Sin servicio','Sión','Supervisor/a de programa o movimiento','Supervisor/a Pastoral'];

const TIPOS_SUP=[
  {id:'sup_rp', label:'Supervisión al RP',   icon:'👤',color:A,        desc:'RP presenta informe pastoral al Supervisor/a'},
  {id:'sup_gp', label:'Supervisión al GP',   icon:'👥',color:P,        desc:'Supervisor/a visita una reunión del Grupo Pastoral'},
  {id:'retro1', label:'Retroalimentación 1', icon:'🔄',color:G,        desc:'CdS + RS + Supervisor/a ofrecen pautas pastorales'},
  {id:'retro2', label:'Retroalimentación 2', icon:'📋',color:'#1A6FA8',desc:'Supervisor/a comunica pautas al RP'},
  {id:'sup_cds',label:'Supervisión al CdS',  icon:'🎯',color:'#C53030',desc:'Supervisor CdS supervisa al Coordinador de Sector'},
];

const SECCIONES_PPP=[
  {key:'relDios',title:'I. Relación Personal con Dios',items:['Oración Personal','Lectura Biblia','Estudio (Libro del año)','Eucaristía dominical','Reconciliación','Contribución económica']},
  {key:'relPers',title:'II. Relaciones Personales',sub:'(amor, respeto, corrección fraterna)',items:['Cónyuge','Hijos','Hermanos del GP','Hermanos de la Comunidad','Padres y hermanos','Prójimo (laboral, estudio)']},
  {key:'vidaCom',title:'III. Vida Comunitaria',sub:'(fidelidad, puntualidad, participación)',items:['Reunión de Grupo Pastoral','Reunión con Responsable Pastoral','Reuniones y eventos Comunidad','Cursos Comunitarios','Elementos Membresía en Buen Orden','Perfil de hombre o mujer de Dios','Servicio comunitario']},
  {key:'patron', title:'IV. Patrón de Vida Familiar',sub:'Solteros: pasar al punto siguiente',items:['Roles: esposo–esposa–padres–hijos','Oración de pareja y oración familiar','Evangelización de los hijos','Tiempo con los hijos','Noche de pareja','CADS Familiar o grupal']},
  {key:'perfil', title:'V. Perfil y Carácter',items:['Hombre / Mujer moral','Testigo de Cristo – Evangelización','Buen miembro de familia','Trabajo y sociedad','Cuidado personal','Carácter']},
];

// ── Supervisión al RP — Parte A: evaluación del RP ───────────────────────────
const SECCIONES_SUPRP_A=[
  {key:'conocHab',title:'I.  Conocimientos y habilidades',items:['¿Conoces tu Plan Pastoral Personal?','¿Conoces el Plan Pastoral Comunitario?','¿Conoces el Plan Pastoral de tu Sector?','¿Conoces cómo funciona la Cadena Pastoral y la Supervisión de tu Sector?','¿Puedes explicar el Núcleo Común Irreductible de la EDE?']},
  {key:'conocGP', title:'II.  Conocimiento de tu GP',items:['¿Conoces bien a los hermanos/as de tu GP (situación personal, familiar y espiritual)?','¿Oras por cada uno de ellos/as y por sus necesidades específicas?','¿Los hermanos/as de tu GP saben que pueden contar contigo?','¿Haces tu labor pastoral con alegría, amor y entrega?','¿Llevas una bitácora o registro de los eventos de tu grupo?']},
  {key:'apertura',title:'III.  Apertura con tu Supervisor/a',items:['¿Vives en la luz con tu Supervisor/a (le confías dificultades en el servicio)?','¿Comunicas oportunamente las situaciones especiales de tus hermanos/as?','¿Evitas justificar las fallas de tus ovejas ante tu Supervisor/a?','¿Eres abierto/a a recibir orientación y corrección de tu Supervisor/a?','¿Pones en práctica los compromisos adquiridos en la Supervisión?']},
  {key:'manejoPlanes',title:'IV.  Manejo de Planes Pastorales (PPG y PPP)',items:['¿Elaboraste y compartiste adecuadamente el PPG con los hermanos/as de tu Grupo?','¿Elaboraste los PPP de manera individual para cada hermano/a y se lo presentaste a cada uno/a?','¿Haces seguimiento activo al PPG y los PPP durante el semestre?']},
];
// ── Supervisión al RP — Parte B: reporte del GP ───────────────────────────────
const SECCIONES_SUPRP_B=[
  {key:'identidad',title:'I.  Identidad EDE y Emmanuel',items:['¿Los hermanos/as de tu GP conocen la profecía del Baluarte?','¿Conocen nuestra profecía fundacional?','¿Conocen el Plan Pastoral Comunitario (PPC)?']},
  {key:'planGP',   title:'II.  Plan Pastoral del Grupo',items:['¿Tu grupo tiene un Plan Pastoral (PPG)?','¿Revisan el avance del Plan Pastoral entre todos?','¿Poseen una programación semestral de reuniones del GP?','¿Cada miembro del grupo posee un Plan Pastoral Personal (PPP)?','¿Cada hermano/a conoce su PPP?']},
  {key:'sincoEses',title:'III.  Las 5 S\'s del Grupo',es5S:true,items:[
    {id:'semanalidad',  label:'Semanalidad',   desc:'Asistencia y puntualidad de los miembros a las reuniones del GP y a las reuniones comunitarias'},
    {id:'sinceridad',   label:'Sinceridad',    desc:'Nivel de participación, apertura y profundidad en el compartir del grupo'},
    {id:'seriedad',     label:'Seriedad',      desc:'Capacidad de tomar las cosas con seriedad sin menoscabar la naturalidad y la fraternidad'},
    {id:'sigilo',       label:'Sigilo',        desc:'Lealtad mutua: lo que sucede y se comparte en el GP no se comenta fuera de él'},
    {id:'subordinacion',label:'Subordinación', desc:'Respuesta personal de los miembros a las orientaciones y la dirección del RP'},
  ]},
  {key:'relaciones',title:'IV.  Relaciones entre los miembros del Grupo',items:['¿Las relaciones entre los hermanos/as del grupo son cordiales y fraternas?','¿Los hermanos/as del GP se animan unos a otros?','¿Tienen actividades que fomentan la fraternidad dentro del grupo?','¿Hay sigilo y confidencialidad entre los hermanos/as de tu grupo?','¿Los hermanos/as del GP comparten lo que está pasando en su vida?']},
  {key:'vidaCristo',title:'V.  Vida en Cristo del Grupo',items:['¿Los hermanos/as de tu GP reconocen a nuestro Señor Jesús como su Señor y Salvador?','¿En tu grupo los hermanos/as interceden unos por otros?','¿Se motivan unos a otros en la Fe?','¿Los hermanos/as de tu GP conocen la Palabra de Dios, la estudian y la usan en sus vidas?','¿En situaciones de crisis hacen batalla espiritual?']},
  {key:'fidelidad',title:'VI.  Fidelidad del Grupo',items:['¿Asisten puntualmente a las reuniones del grupo?','¿Asisten puntualmente a las reuniones comunitarias?','¿Se cumplen los compromisos adquiridos como grupo?']},
  {key:'formacion',title:'VII.  Formación del Grupo',items:['¿Todos los miembros de tu Grupo asisten fielmente a los cursos comunitarios?','¿Das seguimiento en tu Grupo a los cursos comunitarios?']},
  {key:'finanzas', title:'VIII.  Finanzas',items:['¿Son los hermanos/as de tu grupo fieles y honestos con la contribución económica?','¿Posee cada miembro de tu grupo un presupuesto personal?','¿Son fieles a ese presupuesto?']},
];
// ── Supervisión al GP — Visita cualitativa ────────────────────────────────────
const SECCIONES_SUPVISITA=[
  {key:'distribucion',title:'1.  Distribución del tiempo de la reunión',items:['Hora de inicio de la reunión','Tiempo de Alabanza y Oración — manera de dirigirla, espiritualidad de la guía','Tiempo de compartir','Seguimiento de enseñanza y/o cursos comunitarios','Otros momentos de la reunión']},
  {key:'manejoRP',    title:'2.  Manejo del grupo por el RP',items:['¿Cómo dirigió la oración inicial?','¿Tomó en cuenta la guía del Señor?','¿Cómo se relaciona con los miembros del grupo?','¿Hay aceptación del RP por parte de los miembros del grupo?','¿Cómo se percibe el manejo y conducción del grupo?','¿Es clara la enseñanza que maneja (seguimiento de cursos u otros)?','¿Tiene manejo de la Palabra de Dios?']},
  {key:'percepcion',  title:'3.  Percepción del grupo',items:['¿La oración es en voz alta y con manifestaciones carismáticas? ¿Hay apertura a los dones del Espíritu Santo?','¿Se nota respeto y subordinación hacia el RP?','¿El comportamiento individual es abierto, buscando estar a la luz?','¿Se nota la relación de amistad y hermandad entre los miembros del grupo?','¿Hay participación activa de todos los miembros del grupo?']},
];
const PSUP_COL={'1':R,'2':W,'3':'#718096','4':G,'5':'#1A6FA8'};
const PSUP_LBL={'':'Seleccionar','1':'1 — Pésimo','2':'2 — Malo','3':'3 — Regular','4':'4 — Bueno','5':'5 — Excelente'};

const ROLE_OPTIONS=[
  {id:'coordinador_mayor', label:'Coordinador Mayor',     roles:['coordinador_mayor','supervisor_cds']},
  {id:'coordinador_sector',label:'Coordinador de Sector', roles:['coordinador_sector']},
  {id:'responsable_sector',label:'Responsable de Sector', roles:['coordinador','responsable_sector']},
  {id:'consejo',           label:'Consejo / Sup. CdS',    roles:['consejo','supervisor_cds']},
  {id:'servidor_mayor',    label:'Servidor Mayor',        roles:['servidor_mayor']},
  {id:'supervisor',        label:'Supervisor/a',          roles:['supervisor']},
  {id:'responsable',       label:'Responsable Pastoral',  roles:['responsable']},
];

const USERS=[
  // ── NIVEL 1: COORDINADORES ─────────────────────────────────────────────────
  {id:'u_rene',  nombre:'René Solano',         pin:'0000',roles:['coordinador_mayor','supervisor_cds'],sector:null,        genero:'M',supId:'u_alejo', activo:true},
  {id:'u_german',nombre:'Germán Castellanos',  pin:'0000',roles:['coordinador_sector'],               sector:'Nazaret',   genero:'M',supId:'u_alejo', activo:true},
  {id:'u_carlos',nombre:'Carlos Andrés Solano',pin:'0000',roles:['coordinador_sector'],               sector:'San Miguel',genero:'M',supId:'u_alejo', activo:true},
  {id:'u_david', nombre:'David Gómez',         pin:'0000',roles:['coordinador','responsable_sector'], sector:'Nazaret',   genero:'M',supId:'u_german',activo:true},
  {id:'u_wilson',nombre:'Wilson Contreras',    pin:'0000',roles:['coordinador','responsable_sector'], sector:'San Miguel',genero:'M',supId:'u_carlos',activo:true},
  {id:'u_alejo', nombre:'Alejandro Velosa',    pin:'0000',roles:['consejo','supervisor_cds','responsable'],sector:'Nazaret',   genero:'M',supId:'u_antonio_h', activo:true},
  {id:'u_oscar', nombre:'Oscar Estrada',       pin:'0000',roles:['servidor_mayor'],                   sector:null,        genero:'M',supId:'u_carlos',activo:true},

  // ── SUPERVISORES — NAZARET HOMBRES ─────────────────────────────────────────
  {id:'u_antonio_h',  nombre:'Antonio Henao',    pin:'0000',roles:['supervisor','responsable'],sector:'Nazaret',genero:'M',supId:'u_david',      activo:true},
  {id:'u_fer_andrade',nombre:'Fernando Andrade', pin:'0000',roles:['supervisor','responsable'],sector:'Nazaret',genero:'M',supId:'u_antonio_h',  activo:true},
  {id:'u_fer_caceres',nombre:'Fernando Cáceres', pin:'0000',roles:['supervisor','responsable'],sector:'Nazaret',genero:'M',supId:'u_fer_andrade', activo:true},

  // ── SUPERVISORAS — NAZARET MUJERES ─────────────────────────────────────────
  {id:'u_liliana_c',nombre:'Liliana de Cáceres', pin:'0000',roles:['supervisor','responsable'],sector:'Nazaret',genero:'F',activo:true},
  {id:'u_susana_h', nombre:'Susana de Herrán',   pin:'0000',roles:['supervisor','responsable'],sector:'Nazaret',genero:'F',activo:true},

  // ── RPs — NAZARET HOMBRES ───────────────────────────────────────────────────
  {id:'u_mauricio_s',nombre:'Mauricio Silva',      pin:'0000',roles:['responsable'],sector:'Nazaret',genero:'M',supId:'u_fer_caceres', activo:true},
  {id:'u_hector_g',  nombre:'Héctor Gallego',      pin:'0000',roles:['responsable'],sector:'Nazaret',genero:'M',supId:'u_antonio_h',  activo:true},
  {id:'u_jp_vergara',nombre:'Juan Pablo Vergara',  pin:'0000',roles:['responsable'],sector:'Nazaret',genero:'M',supId:'u_fer_caceres', activo:true},

  // ── RPs — NAZARET MUJERES ───────────────────────────────────────────────────
  {id:'u_zoraida',   nombre:'Zoraida de Domínguez',       pin:'0000',roles:['responsable'],sector:'Nazaret',genero:'F',supId:'u_liliana_c',activo:true},
  {id:'u_ana_milena',nombre:'Ana Milena de Castellanos',  pin:'0000',roles:['responsable'],sector:'Nazaret',genero:'F',supId:'u_liliana_c',activo:true},
  {id:'u_luz_maria', nombre:'Luz María de Ascuntar',      pin:'0000',roles:['responsable'],sector:'Nazaret',genero:'F',supId:'u_susana_h', activo:true},
  {id:'u_liliana_h', nombre:'Liliana de Hernández',       pin:'0000',roles:['responsable'],sector:'Nazaret',genero:'F',supId:'u_susana_h', activo:true},
  {id:'u_zorayda_q', nombre:'Zorayda de Quintero',        pin:'0000',roles:['responsable'],sector:'Nazaret',genero:'F',supId:'u_liliana_c',activo:true},
  {id:'u_alexandra', nombre:'Alexandra de Neira',         pin:'0000',roles:['responsable'],sector:'Nazaret',genero:'F',supId:'u_liliana_c',activo:true},
  {id:'u_carolina_v',nombre:'Carolina de Vergara',        pin:'0000',roles:['responsable'],sector:'Nazaret',genero:'F',supId:'u_susana_h', activo:true},

  // ── SUPERVISORAS — SAN MIGUEL MUJERES ─────────────────────────────────────
  {id:'u_angelica',  nombre:'Angélica Nuñez',    pin:'0000',roles:['supervisor','responsable'],sector:'San Miguel',genero:'F',activo:true},
  {id:'u_veronica_i',nombre:'Verónica Iglesias',  pin:'0000',roles:['supervisor','responsable'],sector:'San Miguel',genero:'F',supId:'u_angelica', activo:true},

  // ── RPs — SAN MIGUEL HOMBRES ───────────────────────────────────────────────
  {id:'u_luis_fe',   nombre:'Luis Felipe Manzano',pin:'0000',roles:['responsable'],sector:'San Miguel',genero:'M',supId:'u_wilson',   activo:true},

  // ── RPs — SAN MIGUEL MUJERES ───────────────────────────────────────────────
  {id:'u_pilar_r',   nombre:'Pilar Rivera',        pin:'0000',roles:['responsable'],sector:'San Miguel',genero:'F',supId:'u_angelica', activo:true},
  {id:'u_leidy_e',   nombre:'Leidy Emperador',     pin:'0000',roles:['responsable'],sector:'San Miguel',genero:'F',supId:'u_veronica_i',activo:true},
];

const GROUPS=[
  // ══ NAZARET — HOMBRES ══════════════════════════════════════════════════════
  // GP1 · Alejandro Velosa (Liderazgo)
  {id:'gnh1',rpId:'u_alejo',      sector:'Nazaret',nombre:'GP Liderazgo',miembros:[
    {id:'nzh101',nombre:'René Solano'},
    {id:'nzh102',nombre:'Carlos Andrés Solano', rpOverride:'u_german'},
    {id:'nzh103',nombre:'David Gómez',          rpOverride:'u_german'},
    {id:'nzh104',nombre:'Germán Castellanos'},
    {id:'nzh105',nombre:'Wilson Contreras'},
    {id:'nzh106',nombre:'Manuel Castro',        rpOverride:'u_alejo'},  // PP a cargo de Alejandro; asiste al GP de Fernando Andrade
  ]},
  // GP2 · David Gómez
  {id:'gnh2',rpId:'u_david',      sector:'Nazaret',nombre:'GP David Gómez',miembros:[
    {id:'nzh200',nombre:'Alejandro Velosa',    rpOverride:'u_david',userId:'u_alejo'},
    {id:'nzh201',nombre:'Antonio Henao'},
    {id:'nzh202',nombre:'Carlos Bustamante'},
    {id:'nzh203',nombre:'Ernesto Rebolledo'},
    {id:'nzh204',nombre:'Fernando Cáceres'},
    {id:'nzh205',nombre:'Fernando Vélez'},
    {id:'nzh206',nombre:'Rodrigo Maca'},
  ]},
  // GP3 · Antonio Henao
  {id:'gnh3',rpId:'u_antonio_h',  sector:'Nazaret',nombre:'GP Antonio Henao',miembros:[
    {id:'nzh301',nombre:'Alejandro Domínguez'},
    {id:'nzh302',nombre:'Fernando Andrade'},
  ]},
  // GP4 · Fernando Andrade
  {id:'gnh4',rpId:'u_fer_andrade',sector:'Nazaret',nombre:'GP Fernando Andrade',miembros:[
    {id:'nzh401',nombre:'Jairo Nel Hernández'},
    {id:'nzh402',nombre:'Jorge Domínguez'},
    {id:'nzh403',nombre:'Juan Pablo Vergara'},
    {id:'nzh404',nombre:'Manuel Castro',        rpOverride:'u_alejo'},  // PP a cargo de Alejandro
    {id:'nzh405',nombre:'Mauricio Silva'},
  ]},
  // GP5 · Mauricio Silva
  {id:'gnh5',rpId:'u_mauricio_s', sector:'Nazaret',nombre:'GP Mauricio Silva',miembros:[
    {id:'nzh501',nombre:'Gustavo Pottes'},
    {id:'nzh502',nombre:'Hernando Fernández'},
    {id:'nzh503',nombre:'Juan Fernando Neira'},
    {id:'nzh504',nombre:'Luis Ascuntar'},
  ]},
  // GP6 · Héctor Gallego
  {id:'gnh6',rpId:'u_hector_g',   sector:'Nazaret',nombre:'GP Héctor Gallego',miembros:[
    {id:'nzh601',nombre:'Andrés Laguna'},
    {id:'nzh602',nombre:'Juan Pablo Muñoz'},
    {id:'nzh603',nombre:'Néstor Cubides'},
  ]},
  // GP7 · Fernando Cáceres
  {id:'gnh7',rpId:'u_fer_caceres',sector:'Nazaret',nombre:'GP Fernando Cáceres',miembros:[
    {id:'nzh701',nombre:'Andrés B. Manzano'},
    {id:'nzh702',nombre:'Carlos A. Herrán'},
    {id:'nzh703',nombre:'Rafael Moreno'},
    {id:'nzh704',nombre:'Andrés F. Quiñónez'},
    {id:'nzh705',nombre:'Eduardo Echeverry'},
  ]},
  // GP8 · Juan Pablo Vergara
  {id:'gnh8',rpId:'u_jp_vergara', sector:'Nazaret',nombre:'GP Juan Pablo Vergara',miembros:[
    {id:'nzh801',nombre:'Camilo Peña'},
    {id:'nzh802',nombre:'Carlos Yépez'},
    {id:'nzh803',nombre:'César Acosta'},
    {id:'nzh804',nombre:'Fabián Figueroa'},
  ]},

  // ══ NAZARET — MUJERES ══════════════════════════════════════════════════════
  // GP9 · Zoraida de Domínguez
  {id:'gnm1',rpId:'u_zoraida',    sector:'Nazaret',nombre:'GP Zoraida de Domínguez',miembros:[
    {id:'nzm101',nombre:'Gloria de Concha'},
    {id:'nzm102',nombre:'Martha de Velosa'},
    {id:'nzm103',nombre:'Olga Lucía de Cuenca'},
    {id:'nzm104',nombre:'Piedad de Gómez'},
  ]},
  // GP10 · Ana Milena de Castellanos
  {id:'gnm2',rpId:'u_ana_milena', sector:'Nazaret',nombre:'GP Ana Milena de Castellanos',miembros:[
    {id:'nzm201',nombre:'Adriana de Andrade'},
    {id:'nzm202',nombre:'Gloria Ríos de Cabal'},
    {id:'nzm203',nombre:'Liliana de Solano'},
    {id:'nzm204',nombre:'Mónica de Ramírez'},
  ]},
  // GP11 · Luz María de Ascuntar
  {id:'gnm3',rpId:'u_luz_maria',  sector:'Nazaret',nombre:'GP Luz María de Ascuntar',miembros:[
    {id:'nzm301',nombre:'Alexandra de Neira'},
    {id:'nzm302',nombre:'Carolina de Vergara'},
    {id:'nzm303',nombre:'Diana de Silva'},
    {id:'nzm304',nombre:'Liliana de Hernández'},
    {id:'nzm305',nombre:'Susana de Gallego'},
    {id:'nzm306',nombre:'Yasmin de Fernández'},
  ]},
  // GP12 · Liliana de Cáceres
  {id:'gnm4',rpId:'u_liliana_c',  sector:'Nazaret',nombre:'GP Liliana de Cáceres',miembros:[
    {id:'nzm401',nombre:'Lina de Rebolledo'},
    {id:'nzm402',nombre:'Luz Dary de Henao'},
    {id:'nzm403',nombre:'Luisa de Bustamante'},
    {id:'nzm404',nombre:'Yulena de Vélez'},
  ]},
  // GP13 · Liliana de Hernández
  {id:'gnm5',rpId:'u_liliana_h',  sector:'Nazaret',nombre:'GP Liliana de Hernández',miembros:[
    {id:'nzm501',nombre:'Adriana de Domínguez'},
    {id:'nzm502',nombre:'Angélica de Solano'},
    {id:'nzm503',nombre:'Lorena de Acosta'},
    {id:'nzm504',nombre:'Luz María de Ascuntar'},
    {id:'nzm505',nombre:'Susana Gómez'},
  ]},
  // GP14 · Zorayda de Quintero
  {id:'gnm6',rpId:'u_zorayda_q',  sector:'Nazaret',nombre:'GP Zorayda de Quintero',miembros:[
    {id:'nzm601',nombre:'Aydée de Sandoval'},
    {id:'nzm602',nombre:'Jesucita Herrán de Betancourt'},
    {id:'nzm603',nombre:'Merceditas de Solano'},
    {id:'nzm604',nombre:'Nubia García de Castro'},
    {id:'nzm605',nombre:'Ruth Libreros de Martínez'},
  ]},
  // GP15 · Susana de Herrán
  {id:'gnm7',rpId:'u_susana_h',   sector:'Nazaret',nombre:'GP Susana de Herrán',miembros:[
    {id:'nzm701',nombre:'Andrea de Manzano'},
    {id:'nzm702',nombre:'Carolina Anzola de Echeverry'},
    {id:'nzm703',nombre:'Deysi de Quiñónez'},
    {id:'nzm704',nombre:'Estrellita de Laguna'},
    {id:'nzm705',nombre:'Susana Echeverry de Moreno'},
  ]},
  // GP16 · Alexandra de Neira
  {id:'gnm8',rpId:'u_alexandra',  sector:'Nazaret',nombre:'GP Alexandra de Neira',miembros:[
    {id:'nzm801',nombre:'Lilian Rocío de Muñoz'},
    {id:'nzm802',nombre:'Natalia de Pottes'},
    {id:'nzm803',nombre:'Raquel de Maca'},
    {id:'nzm804',nombre:'Sandra de Cubides'},
  ]},
  // GP17 · Carolina de Vergara
  {id:'gnm9',rpId:'u_carolina_v', sector:'Nazaret',nombre:'GP Carolina de Vergara',miembros:[
    {id:'nzm901',nombre:'Luz Dary de Figueroa'},
    {id:'nzm902',nombre:'Mónica de Peña'},
    {id:'nzm903',nombre:'Mónica de Sánchez'},
  ]},

  // ══ SAN MIGUEL — HOMBRES ══════════════════════════════════════════════════
  // GSM1 · Wilson Contreras (RS + RP, lunes)
  {id:'gsm1',rpId:'u_wilson',   sector:'San Miguel',nombre:'GP Wilson Contreras',miembros:[
    {id:'smh101',nombre:'Luis Felipe Manzano'},
    {id:'smh102',nombre:'José Luis Aguirre'},
    {id:'smh103',nombre:'Julián Mosquera'},
    {id:'smh104',nombre:'Jaime Toro'},
    {id:'smh105',nombre:'Jaime Betancourt'},
  ]},
  // GSM2 · Luis Felipe Manzano (RP, miércoles)
  {id:'gsm2',rpId:'u_luis_fe',  sector:'San Miguel',nombre:'GP Luis Felipe Manzano',miembros:[
    {id:'smh201',nombre:'Jorge Iván Carvajal'},
    {id:'smh202',nombre:'Felipe Llanos'},
    {id:'smh203',nombre:'John Alejandro Montila'},
    {id:'smh204',nombre:'Nelson Cedillo'},
    {id:'smh205',nombre:'Oscar Estrada',        rpOverride:'u_carlos',userId:'u_oscar'},  // Servidor Mayor; asiste este GP pero su RP es Carlos Andrés
  ]},

  // ══ SAN MIGUEL — MUJERES ══════════════════════════════════════════════════
  // GSM3 · Angélica Nuñez (Supervisora + RP, martes)
  {id:'gsm3',rpId:'u_angelica', sector:'San Miguel',nombre:'GP Angélica Nuñez',miembros:[
    {id:'smm301',nombre:'Verónica Iglesias'},
    {id:'smm302',nombre:'Pilar Rivera'},
    {id:'smm303',nombre:'Samantha Sánchez'},
    {id:'smm304',nombre:'Leidy Emperador'},
    {id:'smm305',nombre:'Kathy Juri'},
  ]},
  // GSM4 · Pilar Rivera (RP, lunes)
  // Diana Victoria asiste a este GP pero su PP es responsabilidad de Leidy Emperador (rpOverride)
  {id:'gsm4',rpId:'u_pilar_r',  sector:'San Miguel',nombre:'GP Pilar Rivera',miembros:[
    {id:'smm401',nombre:'Ximena Betancourt'},
    {id:'smm402',nombre:'Mónica Ramos'},
    {id:'smm403',nombre:'Isa Quesada'},
    {id:'smm404',nombre:'Diana Victoria',rpOverride:'u_leidy_e'},
  ]},
  // GSM5 · Verónica Iglesias (Supervisora + RP, miércoles)
  {id:'gsm5',rpId:'u_veronica_i',sector:'San Miguel',nombre:'GP Verónica Iglesias',miembros:[
    {id:'smm501',nombre:'Leydi Portilla'},
    {id:'smm502',nombre:'Francy Vargas'},
    {id:'smm503',nombre:'Eliana Campos'},
    {id:'smm504',nombre:'Johana Quesada'},
  ]},
  // GSM6 · Leidy Emperador (RP — pastorea a Diana Victoria)
  {id:'gsm6',rpId:'u_leidy_e',  sector:'San Miguel',nombre:'GP Leidy Emperador',miembros:[
    {id:'smm601',nombre:'Diana Victoria', rpOverride:'u_leidy_e'},
  ]},
];

const SUBTITLES={
  u_rene:      'Coordinador Mayor · SCSN',
  u_german:    'CdS Sector Nazaret',
  u_carlos:    'CdS Sector San Miguel',
  u_david:     'Resp. Sector · Nazaret',
  u_wilson:    'Resp. Sector · San Miguel',
  u_alejo:     'SCSSM',
  u_oscar:     'Servidor Mayor',
  u_antonio_h: 'Supervisor · Nazaret',
  u_fer_andrade:'Supervisor · Nazaret',
  u_fer_caceres:'Supervisor · Nazaret',
  u_liliana_c:  'Supervisora · Nazaret',
  u_susana_h:   'Supervisora · Nazaret',
  u_angelica:   'Supervisora · San Miguel',
  u_veronica_i: 'Supervisora · San Miguel',
};

const CSEM=(function(){var d=new Date();return d.getFullYear()+'-'+(d.getMonth()<6?'S1':'S2');})();
const TODAY=new Date().toISOString().split('T')[0];
const uid=function(){return '_'+Math.random().toString(36).slice(2,8);};

function fmt(s){
  if(!s)return'—';
  try{return new Date(s+'T12:00:00').toLocaleDateString('es-CO',{day:'2-digit',month:'short',year:'numeric'});}
  catch(e){return s;}
}
function hasR(u,r){return u&&u.roles&&u.roles.includes(r);}
function mrole(u){
  if(hasR(u,'servidor_mayor'))return'servidor_mayor';
  if(hasR(u,'supervisor_cds')||hasR(u,'consejo'))return'admin';
  if(hasR(u,'coordinador_mayor'))return'admin';
  if(hasR(u,'coordinador_sector'))return'cds';
  if(hasR(u,'responsable_sector'))return'cds';
  if(hasR(u,'supervisor'))return'sup';
  return'rp';
}
function isAdmin(u){return hasR(u,'supervisor_cds')||hasR(u,'consejo')||hasR(u,'coordinador_mayor');}
function isSuperAdmin(u){return hasR(u,'supervisor_cds')||hasR(u,'coordinador_sector');}
// Retorna el grupo propio del usuario, o un grupo virtual con los miembros que tiene en rpOverride
function getEffectiveGroup(userId,dynGroups){
  var own=dynGroups.find(function(g){return g.rpId===userId;});
  if(own)return own;
  var overrides=[];
  dynGroups.forEach(function(g){g.miembros.forEach(function(m){if(m.rpOverride===userId)overrides.push(m);});});
  if(overrides.length===0)return null;
  var sec=(dynGroups.find(function(g){return g.miembros.some(function(m){return m.rpOverride===userId;})})||{}).sector||null;
  return{id:'vg_'+userId,rpId:userId,sector:sec,nombre:'Hermanos a mi cargo',miembros:overrides,isVirtual:true};
}
function getRolSimple(u){
  if(hasR(u,'coordinador_mayor'))return'coordinador_mayor';
  if(hasR(u,'coordinador_sector'))return'coordinador_sector';
  if(hasR(u,'responsable_sector'))return'responsable_sector';
  if(hasR(u,'servidor_mayor'))return'servidor_mayor';
  if(hasR(u,'consejo'))return'consejo';
  if(hasR(u,'supervisor'))return'supervisor';
  return'responsable';
}

// Usuarios que no tienen Grupo Pastoral asignado (decisión pastoral)
var NO_GP_USERS=['u_leidy_e'];
// Devuelve miembros en grupos DISTINTOS al propio que tienen rpOverride apuntando a userId
function getCargoMembersExternal(userId,ownGroupId,dynGroups){var arr=[];dynGroups.forEach(function(g){if(g.id!==ownGroupId){g.miembros.forEach(function(m){if(m.rpOverride===userId)arr.push(m);});}});return arr;}
function getAttendingRPNombre(memberNombre,ownGroupId,dynGroups,allUsers){var result=null;dynGroups.forEach(function(g){if(result||g.id===ownGroupId)return;g.miembros.forEach(function(m){if(result)return;if(m.nombre===memberNombre){var rp=allUsers.find(function(u){return u.id===g.rpId;});result=rp?rp.nombre:null;}});});return result;}

// Encuentra el grupo donde un miembro aparece físicamente (diferente al grupo propio, por nombre)
function findActualGroup(memberNombre,ownGroupId,dynGroups){
  var found=null;
  dynGroups.forEach(function(g){
    if(g.id===ownGroupId)return;
    g.miembros.forEach(function(m){if(m.nombre===memberNombre)found={group:g,member:m};});
  });
  return found;
}
// % de asistencia a Reunión del GP para un miembro que asiste físicamente a otro GP
function getExternalGPPct(memberNombre,ownGroupId,dynGroups,allAtt){
  var ref=findActualGroup(memberNombre,ownGroupId,dynGroups);
  if(!ref)return 0;
  var rpAtt=(allAtt[ref.group.rpId]||{eventos:[]});
  var gpEvs=(rpAtt.eventos||[]).filter(function(e){return e.gId===ref.group.id&&e.tipo==='Reunión del Grupo Pastoral';});
  if(!gpEvs.length)return 0;
  return Math.round(gpEvs.filter(function(e){return (e.asistentes||[]).includes(ref.member.id);}).length/gpEvs.length*100);
}

// Helpers para el campo servicios (puede ser array o string legacy)
function fmtServ(s){return Array.isArray(s)?s.join(', '):(s||'');}
function hasServ(s){return Array.isArray(s)?s.length>0:!!(s&&s.trim());}

function buildLoginGroups(users){
  var active=users.filter(function(u){return u.activo!==false;});
  var defs=[
    {label:'Coordinador Mayor',                     fn:function(u){return hasR(u,'coordinador_mayor');}},
    {label:'Coordinadores de Sector',               fn:function(u){return hasR(u,'coordinador_sector');}},
    {label:'Responsables de Sector',                fn:function(u){return hasR(u,'responsable_sector')&&!hasR(u,'coordinador_mayor')&&!hasR(u,'coordinador_sector');}},
    {label:'Consejo y Otros',                       fn:function(u){return (hasR(u,'consejo')||hasR(u,'servidor_mayor'))&&!hasR(u,'coordinador_mayor')&&!hasR(u,'coordinador_sector')&&!hasR(u,'responsable_sector');}},
    {label:'Líderes Mayores y Responsables Mayores',fn:function(u){return hasR(u,'supervisor');}},
    {label:'Responsables Pastorales',               fn:function(u){return hasR(u,'responsable')&&!hasR(u,'supervisor');}},
  ];
  return defs.map(function(d){
    return {label:d.label,ids:active.filter(d.fn).sort(function(a,b){return a.nombre.localeCompare(b.nombre,'es');}).map(function(u){return u.id;})};
  }).filter(function(g){return g.ids.length>0;});
}

// dlHTML: descarga el reporte como archivo .html
var _dlHTMLCb=null;
function regDlHTML(cb){_dlHTMLCb=cb;}
function dlHTML(html,nombre){
  try{
    var blob=new Blob([html],{type:'text/html;charset=utf-8'});
    var url=URL.createObjectURL(blob);
    var a=document.createElement('a');
    a.href=url;
    a.download=(nombre||'reporte')+'.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function(){URL.revokeObjectURL(url);},1500);
  }catch(e){
    if(_dlHTMLCb)_dlHTMLCb(html,nombre);
  }
}

function printPPG(group,ppg,rpNombre,ppcGoalsArg){
  var mb=group?(group.miembros||[]).filter(function(m){return!(m.rpOverride&&m.rpOverride===group.rpId);}):[];
  var integ=ppg.integ||mb.map(function(m){return{id:m.id,nombre:m.nombre,compromiso:'',cumple:'',aniv:'',curso:''};});
  var areas=ppg.areas||[];var prog=ppg.prog||{};var reuniones=ppg.reuniones||[];var mesesP=ppg.mesesProg&&ppg.mesesProg.length?ppg.mesesProg:MESES_SEM;
  var CSS='body{font-family:Arial,sans-serif;font-size:12px;color:#2D3748;margin:22px}h1{color:#0A3D62;font-size:17px;margin:0 0 4px}h2{color:#0A3D62;font-size:13px;border-bottom:2px solid #0A3D62;padding-bottom:3px;margin:16px 0 7px}table{width:100%;border-collapse:collapse;font-size:11px;margin-bottom:12px}th{background:#DFF0FF;color:#0A3D62;padding:5px 6px;text-align:left;border-bottom:1px solid #C0D8F0}td{padding:4px 6px;border-bottom:1px solid #E2E8F0;vertical-align:top}.hdr{border-bottom:2px solid #B5451B;padding-bottom:10px;margin-bottom:14px}.meta{color:#718096;font-size:11px;margin:4px 0 0}.foot{margin-top:22px;text-align:center;border-top:1px solid #E2E8F0;padding-top:10px;color:#718096;font-size:10px}';
  var rows1=integ.map(function(m){return'<tr><td><strong>'+m.nombre+'</strong></td><td>'+(m.compromiso||'—')+'</td><td>'+(m.cumple?fmt(m.cumple):'—')+'</td><td>'+(m.aniv?fmt(m.aniv):'—')+'</td><td>'+(m.curso||'—')+'</td></tr>';}).join('');
  var rows3=areas.filter(function(a){return a.area||a.meta;}).map(function(a,i){return'<tr><td>'+(i+1)+'. <strong>'+(a.area||'')+'</strong></td><td>'+(a.meta||'')+'</td></tr>';}).join('')||'<tr><td colspan="2" style="color:#718096;font-style:italic">Sin áreas registradas</td></tr>';
  var headM='<th>Mes</th>'+mb.map(function(m){return'<th>'+m.nombre.split(' ')[0]+'</th>';}).join('');
  var rows4=mesesP.map(function(mes){return'<tr><td><strong>'+mes.charAt(0).toUpperCase()+mes.slice(1,3)+'</strong></td>'+mb.map(function(m){var mp=prog[m.id]||{};return'<td style="font-size:10px">'+(mp[mes]?fmt(mp[mes]):'—')+'</td>';}).join('')+'</tr>';}).join('');
  var rows5=reuniones.filter(function(r){return r.fecha||r.actividad;}).map(function(r){return'<tr><td>'+fmt(r.fecha)+'</td><td>'+(r.actividad||'')+'</td><td>'+(r.tema||'')+'</td><td>'+(r.comentarios||'')+'</td></tr>';}).join('')||'<tr><td colspan="4" style="color:#718096;font-style:italic">Sin reuniones programadas</td></tr>';
  var H='<!DOCTYPE html><html><head><meta charset="UTF-8"><title>PPG</title><style>'+CSS+'</style></head><body>';
  H+='<div class="hdr"><h1>📋 Plan Pastoral de Grupo</h1><p class="meta"><strong>Grupo:</strong> '+(group?group.nombre:'—')+'&emsp;|&emsp;<strong>RP:</strong> '+(rpNombre||'—')+'&emsp;|&emsp;<strong>Impreso:</strong> '+new Date().toLocaleDateString('es-CO')+'</p></div>';
  H+='<h2>1. Integrantes</h2><table><thead><tr><th>Nombre</th><th>Compromiso</th><th>Cumpleaños</th><th>Aniversario</th><th>Curso</th></tr></thead><tbody>'+rows1+'</tbody></table>';
  H+='<h2>2. Plan Pastoral Comunitario (PPC)</h2><table><thead><tr><th style="width:100%">Metas comunitarias</th></tr></thead><tbody>'+(ppcGoalsArg||PPC_GOALS_DEFAULT).map(function(g,i){return'<tr><td>'+(i+1)+'. '+g+'</td></tr>';}).join('')+'</tbody></table>';
  H+='<h2>3. Áreas de trabajo</h2><table><thead><tr><th>Área</th><th>Metas</th></tr></thead><tbody>'+rows3+'</tbody></table>';
  H+='<h2>4. Programación PP</h2><table><thead><tr><th>Hermano/a</th>'+headM+'</tr></thead><tbody>'+rows4+'</tbody></table>';
  H+='<h2>5. Reuniones del GP</h2><table><thead><tr><th>Fecha</th><th>Actividad</th><th>Tema</th><th>Comentarios</th></tr></thead><tbody>'+rows5+'</tbody></table>';
  H+='<p class="foot">Koinonía · Comunidad Emmanuel · Cali · '+CSEM+'</p></body></html>';
  dlHTML(H,'PPG_'+(group?group.nombre:'grupo').replace(/\s+/g,'_'));
}

function printPPP(miembro,user,group,ppp){
  var info=ppp.info||{};var autoeval=ppp.autoeval||{};var areas=ppp.areas||[];var seguimiento=ppp.seguimiento||[];
  var PCOLP={'1':'#9B2C2C','2':'#B7791F','3':'#1A6FA8','4':'#276749'};
  var PLBP={'1':'1 — Insuf.','2':'2 — Regular','3':'3 — Bueno','4':'4 — Excelente'};
  var criticas=[],importantes=[];
  SECCIONES_PPP.forEach(function(sec){(autoeval[sec.key]||[]).forEach(function(row){if(row.puntaje==='1')criticas.push({sec:sec.title,item:row.item});if(row.puntaje==='2')importantes.push({sec:sec.title,item:row.item});});});
  var CSS='body{font-family:Arial,sans-serif;font-size:11px;color:#2D3748;margin:20px}h1{color:#0A3D62;font-size:16px}h2{color:#0A3D62;font-size:12px;border-bottom:2px solid #0A3D62;padding-bottom:3px;margin:14px 0 6px}table{width:100%;border-collapse:collapse;font-size:10px;margin-bottom:10px}th{background:#DFF0FF;color:#0A3D62;padding:4px 5px;text-align:left}td{padding:3px 5px;border-bottom:1px solid #E2E8F0}.foot{margin-top:20px;text-align:center;border-top:1px solid #E2E8F0;padding-top:8px;color:#718096;font-size:10px}';
  var aeRows='';
  SECCIONES_PPP.forEach(function(sec){var rows=(autoeval[sec.key]||[]).filter(function(r){return r.puntaje;});if(!rows.length)return;aeRows+='<tr style="background:#f0f4f8"><td colspan="3"><strong>'+sec.title+'</strong></td></tr>';rows.forEach(function(row){var bc=PCOLP[row.puntaje];aeRows+='<tr><td>'+row.item+'</td><td><span style="background:'+bc+'22;color:'+bc+';padding:1px 7px;border-radius:10px;font-weight:bold">'+PLBP[row.puntaje]+'</span></td><td style="color:#718096;font-style:italic">'+(row.comentario||'')+'</td></tr>';});});
  var areaRows=areas.filter(function(a){return a.a;}).map(function(a,i){return'<tr><td>'+(i+1)+'</td><td>'+(a.a||'')+'</td><td>'+(a.m||'')+'</td><td>'+(a.ac||'')+'</td></tr>';}).join('')||'<tr><td colspan="4" style="color:#718096;font-style:italic">Sin áreas definidas</td></tr>';
  var segRows=seguimiento.filter(function(s){return s.f||s.n;}).map(function(s,i){return'<tr><td>'+(i+1)+'</td><td>'+fmt(s.f)+'</td><td>'+(s.n||'')+'</td></tr>';}).join('')||'<tr><td colspan="3" style="color:#718096;font-style:italic">Sin seguimiento</td></tr>';
  var H='<!DOCTYPE html><html><head><meta charset="UTF-8"><title>PPP</title><style>'+CSS+'</style></head><body>';
  H+='<h1>📝 Plan Pastoral Personal — '+(miembro?miembro.nombre:'')+'</h1>';
  H+='<h2>Autoevaluación</h2>';if(aeRows){H+='<table><thead><tr><th>Área</th><th>Puntaje</th><th>Comentario</th></tr></thead><tbody>'+aeRows+'</tbody></table>';}
  H+='<h2>Áreas de Pastoreo</h2><table><thead><tr><th>#</th><th>Área</th><th>Metas</th><th>Acciones</th></tr></thead><tbody>'+areaRows+'</tbody></table>';
  H+='<h2>Seguimiento</h2><table><thead><tr><th>#</th><th>Fecha</th><th>Anotaciones</th></tr></thead><tbody>'+segRows+'</tbody></table>';
  H+='<p class="foot">Koinonía · Comunidad Emmanuel · Cali · '+CSEM+'</p></body></html>';
  dlHTML(H,'PPP_'+(miembro?miembro.nombre:'hermano').replace(/\s+/g,'_'));
}

function printReporte(sector,rps,groups,meetings,allPlans,allAtt){
  var semR=meetings.filter(function(m){return m.semestre===CSEM&&m.realizada;});
  var tM=rps.reduce(function(a,rp){var g=groups.find(function(x){return x.rpId===rp.id;});return a+(g?(g.miembros.filter(function(m){return !m.rpOverride;}).length)*4:0);},0);
  var tR=rps.reduce(function(a,rp){return a+semR.filter(function(m){return m.rpId===rp.id;}).length;},0);
  var gP=tM>0?Math.round(tR/tM*100):0;var gC=gP>=80?'#276749':gP>=50?'#B7791F':'#9B2C2C';
  var CSS='body{font-family:Arial,sans-serif;font-size:12px;color:#2D3748;margin:20px}h1{color:#0A3D62;font-size:17px}h2{color:#0A3D62;font-size:13px;border-bottom:2px solid #0A3D62;padding-bottom:3px;margin:16px 0 8px}table{width:100%;border-collapse:collapse;font-size:11px;margin-bottom:10px}th{background:#DFF0FF;color:#0A3D62;padding:5px 6px;text-align:left}td{padding:4px 6px;border-bottom:1px solid #E2E8F0}.foot{margin-top:22px;text-align:center;border-top:1px solid #E2E8F0;padding-top:10px;color:#718096;font-size:10px}';
  var H='<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Reporte '+sector+'</title><style>'+CSS+'</style></head><body>';
  H+='<h1>📊 Reporte Semestral — '+sector+'</h1>';
  H+='<p><strong>Semestre:</strong> '+CSEM+' &emsp;|&emsp; <strong>Generado:</strong> '+new Date().toLocaleDateString('es-CO')+'</p>';
  H+='<h2>Resumen</h2><table><thead><tr><th>Responsables</th><th>Realizadas</th><th>Meta</th><th>Avance</th></tr></thead><tbody><tr><td>'+rps.length+'</td><td><strong style="color:'+gC+'">'+tR+'</strong></td><td>'+tM+'</td><td><strong style="color:'+gC+'">'+gP+'%</strong></td></tr></tbody></table>';
  H+='<h2>Detalle por Responsable</h2>';
  rps.forEach(function(rp){
    var g=groups.find(function(x){return x.rpId===rp.id;});if(!g)return;
    var mb=(g.miembros||[]).filter(function(m){return !m.rpOverride;});var real=semR.filter(function(m){return m.rpId===rp.id;}).length;
    var meta=mb.length*4,pct=meta>0?Math.round(real/meta*100):0;var bc=pct>=100?'#276749':pct>=50?'#B7791F':'#9B2C2C';
    H+='<div style="margin-bottom:12px;padding:10px;background:#EDF2F7;border-left:4px solid #0A3D62;border-radius:0 8px 8px 0">';
    H+='<p style="margin:0 0 4px;font-weight:bold;color:#0A3D62">'+rp.nombre+' — '+g.nombre+'</p>';
    H+='<p style="margin:0;color:'+bc+'">'+real+'/'+meta+' ('+pct+'%)</p></div>';
  });
  H+='<p class="foot">Koinonía · Comunidad Emmanuel · Cali · '+CSEM+'</p></body></html>';
  dlHTML(H,'Reporte_'+sector.replace(/\s+/g,'_')+'_'+CSEM);
}

function initSupSec(items){return items.map(function(it){return{item:typeof it==='string'?it:it.label,puntaje:'',comentario:''};});}
function initSupRP(miembros){
  var secA={};
  SECCIONES_SUPRP_A.forEach(function(s){secA[s.key]=initSupSec(s.items);});
  var secB={};
  SECCIONES_SUPRP_B.forEach(function(s){
    if(s.es5S){secB[s.key]={semanalidad:{puntaje:'',comentario:''},sinceridad:{puntaje:'',comentario:''},seriedad:{puntaje:'',comentario:''},sigilo:{puntaje:'',comentario:''},subordinacion:{puntaje:'',comentario:''}};}
    else{secB[s.key]=initSupSec(s.items);}
  });
  var integ={};
  (miembros||[]).forEach(function(m){integ[m.id]={anotaciones:''};});
  return{pregPersonales:{oracion:'',salud:'',retos:'',alianza:''},secA:secA,sintesis:{areasCrec:'',pautas:'',compromisos:''},secB:secB,integ:integ,acciones:{corregir:'',prevenir:'',fomentar:'',potenciar:'',obsRS:''},reuniones:[],sem:CSEM};
}
function initSupGP(){
  var secs={};
  SECCIONES_SUPVISITA.forEach(function(s){secs[s.key]=s.items.map(function(it){return{aspecto:it,observacion:''};});});
  return{secciones:secs,obsFinales:'',reuniones:[],sem:CSEM};
}
function calcSupAvg(data){
  if(!data||!data.secA)return 0;var total=0,count=0;
  var allSecs=SECCIONES_SUPRP_A.concat(SECCIONES_SUPRP_B);
  allSecs.forEach(function(sec){
    var src=data.secA[sec.key]!==undefined?data.secA:data.secB;
    if(!src)return;
    if(sec.es5S){var s5=src[sec.key]||{};sec.items.forEach(function(it){var v=s5[it.id];if(v&&v.puntaje){total+=parseInt(v.puntaje);count++;}});}
    else if(!sec.esFidelidad){(src[sec.key]||[]).forEach(function(r){if(r.puntaje){total+=parseInt(r.puntaje);count++;}});}
  });
  return count>0?Math.round(total/count*10)/10:0;
}

function printSupervision(rpNombre,groupNombre,supRP,supGP,miembros,sem){
  var CSS='body{font-family:Arial,sans-serif;font-size:11px;color:#2D3748;margin:20px}h1{color:#0A3D62;font-size:16px;margin:0 0 4px}h2{color:#fff;font-size:13px;background:#0A3D62;padding:6px 10px;margin:14px 0 6px}h2.b{background:#1A5276}h3{color:#0A3D62;font-size:11px;margin:9px 0 3px;font-weight:bold}table{width:100%;border-collapse:collapse;font-size:10px;margin-bottom:8px}th{background:#D6EAF8;color:#0A3D62;padding:4px 5px;text-align:left}td{padding:4px 5px;border-bottom:1px solid #E2E8F0}.pill{padding:1px 6px;border-radius:10px;font-weight:bold;font-size:10px}.blk{background:#EDF2F7;border-left:4px solid #0A3D62;padding:7px 10px;border-radius:0 6px 6px 0;margin:5px 0;font-size:10px}.foot{margin-top:18px;text-align:center;border-top:1px solid #E2E8F0;padding-top:8px;color:#718096;font-size:9px}.pp{background:#EDF7FF;border-left:3px solid #AED6F1;padding:5px 10px;margin:3px 0;font-size:10px}';
  var PCOL2={'1':'#9B2C2C','2':'#B7791F','3':'#718096','4':'#276749','5':'#1A6FA8'};
  var PLBL2={'1':'Pésimo','2':'Malo','3':'Regular','4':'Bueno','5':'Excelente'};
  function pill(pv){if(!pv)return'<span style="color:#718096">—</span>';return'<span class="pill" style="background:'+PCOL2[pv]+'22;color:'+PCOL2[pv]+'">'+pv+' — '+PLBL2[pv]+'</span>';}
  function tblSec(rows){var h='<table><thead><tr><th>Pregunta</th><th style="width:22%">Puntaje</th><th style="width:25%">Comentario</th></tr></thead><tbody>';(rows||[]).forEach(function(r){h+='<tr><td>'+r.item+'</td><td>'+pill(r.puntaje)+'</td><td>'+(r.comentario||'—')+'</td></tr>';});return h+'</tbody></table>';}
  var H='<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Supervisión '+rpNombre+'</title><style>'+CSS+'</style></head><body>';
  H+='<h1>📋 Supervisión Semestral — '+rpNombre+'</h1>';
  H+='<p style="font-size:11px"><strong>Grupo:</strong> '+groupNombre+' &emsp;|&emsp;<strong>Semestre:</strong> '+(sem||CSEM)+'&emsp;|&emsp;<strong>Generado:</strong> '+new Date().toLocaleDateString('es-CO')+'</p>';
  // ── SUPERVISIÓN AL RP ─────────────────────────────────────────────────────
  H+='<h2>SUPERVISIÓN AL RESPONSABLE PASTORAL</h2>';
  if(supRP){
    // Parte A
    H+='<h2 class="b">PARTE A — Conocimiento, habilidades y organización</h2>';
    var pp=supRP.pregPersonales||{};
    if(pp.oracion||pp.salud||pp.retos||pp.alianza){
      H+='<h3>Preguntas personales</h3>';
      [['¿Cómo está tu vida de oración y tu relación con el Señor?',pp.oracion],['¿Cómo está tu salud?',pp.salud],['¿Qué retos estás enfrentando en tu vida?',pp.retos],['¿Estás viviendo plenamente tu Alianza?',pp.alianza]].forEach(function(q){if(q[1])H+='<div class="pp"><strong>'+q[0]+'</strong><br>'+q[1]+'</div>';});
    }
    var sA=supRP.secA||{};
    SECCIONES_SUPRP_A.forEach(function(sec){H+='<h3>'+sec.title+'</h3>'+tblSec(sA[sec.key]);});
    var st=supRP.sintesis||{};
    if(st.areasCrec)H+='<div class="blk"><strong>Áreas de crecimiento:</strong> '+st.areasCrec+'</div>';
    if(st.pautas)H+='<div class="blk"><strong>Pautas del Supervisor/a:</strong> '+st.pautas+'</div>';
    if(st.compromisos)H+='<div class="blk"><strong>Compromisos del RP:</strong> '+st.compromisos+'</div>';
    // Parte B
    H+='<h2 class="b">PARTE B — Reporte del Grupo Pastoral</h2>';
    var sB=supRP.secB||{};
    SECCIONES_SUPRP_B.forEach(function(sec){
      H+='<h3>'+sec.title+'</h3>';
      if(sec.es5S){var s5=sB[sec.key]||{};H+='<table><thead><tr><th style="width:16%">S</th><th>Descripción</th><th style="width:18%">Puntaje</th><th style="width:22%">Comentario</th></tr></thead><tbody>';sec.items.forEach(function(it){var sv=s5[it.id]||{};H+='<tr><td><strong>'+it.label+'</strong></td><td style="color:#718096;font-size:9px">'+it.desc+'</td><td>'+pill(sv.puntaje)+'</td><td>'+(sv.comentario||'—')+'</td></tr>';});H+='</tbody></table>';}
      else if(sec.esFidelidad){H+='<table><thead><tr><th>Pregunta</th><th style="width:14%">Sí / No</th><th style="width:30%">Comentario</th></tr></thead><tbody>';(sB[sec.key]||[]).forEach(function(r){H+='<tr><td>'+r.item+'</td><td style="text-align:center;font-weight:bold">'+(r.respuesta||'—')+'</td><td>'+(r.comentario||'—')+'</td></tr>';});H+='</tbody></table>';}
      else{H+=tblSec(sB[sec.key]);}
    });
    var ig=supRP.integ||{};var igKeys=Object.keys(ig);
    if(igKeys.length){H+='<h3>Cuadro de Integrantes</h3><table><thead><tr><th style="width:30%">Hermano/a</th><th>Anotaciones generales</th></tr></thead><tbody>';(miembros||[]).filter(function(m){return !m.rpOverride;}).forEach(function(m){var iv=ig[m.id]||{};H+='<tr><td><strong>'+m.nombre+'</strong></td><td>'+(iv.anotaciones||'—')+'</td></tr>';});H+='</tbody></table>';}
    var ac=supRP.acciones||{};H+='<h3>Acciones</h3><table><tbody>';
    [['🔴 ¿Debes corregir algo?',ac.corregir],['🟡 ¿Debes prevenir algo?',ac.prevenir],['🟢 ¿Debes fomentar algo?',ac.fomentar],['🔵 ¿Qué puedes potenciar en tu GP?',ac.potenciar],['📝 Obs. RS',ac.obsRS]].forEach(function(r){if(r[1])H+='<tr><td style="width:22%;font-weight:bold;color:#0A3D62">'+r[0]+'</td><td>'+r[1]+'</td></tr>';});
    H+='</tbody></table>';
    if(supRP.reuniones&&supRP.reuniones.length){H+='<h3>Reuniones Sup. RP</h3><table><thead><tr><th style="width:22%">Fecha</th><th>Notas</th></tr></thead><tbody>';supRP.reuniones.forEach(function(r){H+='<tr><td>'+fmt(r.fecha)+'</td><td>'+(r.notas||'—')+'</td></tr>';});H+='</tbody></table>';}
  }
  // ── VISITA AL GP ─────────────────────────────────────────────────────────
  if(supGP){
    H+='<h2>VISITA AL GRUPO PASTORAL</h2>';
    var sv=supGP.secciones||{};
    SECCIONES_SUPVISITA.forEach(function(sec){
      H+='<h3>'+sec.title+'</h3><table><thead><tr><th style="width:40%">Aspecto observado</th><th>Observaciones</th></tr></thead><tbody>';
      (sv[sec.key]||[]).forEach(function(r){H+='<tr><td>'+r.aspecto+'</td><td>'+(r.observacion||'—')+'</td></tr>';});
      H+='</tbody></table>';
    });
    if(supGP.obsFinales)H+='<div class="blk"><strong>Observaciones finales:</strong> '+supGP.obsFinales+'</div>';
    if(supGP.reuniones&&supGP.reuniones.length){H+='<h3>Visitas realizadas</h3><table><thead><tr><th style="width:22%">Fecha</th><th>Notas</th></tr></thead><tbody>';supGP.reuniones.forEach(function(r){H+='<tr><td>'+fmt(r.fecha)+'</td><td>'+(r.notas||'—')+'</td></tr>';});H+='</tbody></table>';}
  }
  H+='<p class="foot">Koinonía · Comunidad Emmanuel · Cali · '+(sem||CSEM)+'</p></body></html>';
  dlHTML(H,'Sup_'+rpNombre.replace(/\s+/g,'_')+'_'+(sem||CSEM));
}

// ─── UI Primitivos ───────────────────────────────────────────────────────────
function Logo(p){
  var s=p.size||50,w=p.white,c=w?'#fff':P,f=w?'#ffffffcc':'#1A6FA8';
  return (
    <svg width={s} height={s} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="48" fill="none" stroke={c} strokeWidth="3"/>
      <text x="50" y="18" textAnchor="middle" fontSize="7" fontWeight="bold" fill={c} fontFamily="serif">COMUNIDAD</text>
      <text x="50" y="27" textAnchor="middle" fontSize="8" fontWeight="bold" fill={c} fontFamily="serif">EMMANUEL</text>
      <line x1="15" y1="30" x2="85" y2="30" stroke={c} strokeWidth="0.8"/>
      <circle cx="50" cy="38" r="4" fill={c}/>
      <line x1="50" y1="42" x2="50" y2="58" stroke={c} strokeWidth="2.5"/>
      <line x1="38" y1="47" x2="62" y2="47" stroke={c} strokeWidth="2"/>
      <ellipse cx="32" cy="65" rx="4" ry="4" fill={f}/><rect x="29" y="69" width="6" height="10" rx="2" fill={f}/>
      <ellipse cx="42" cy="63" rx="5" ry="5" fill={f}/><rect x="38" y="68" width="8" height="12" rx="2" fill={f}/>
      <ellipse cx="58" cy="63" rx="5" ry="5" fill={f}/><rect x="54" y="68" width="8" height="12" rx="2" fill={f}/>
      <ellipse cx="68" cy="65" rx="4" ry="4" fill={f}/><rect x="65" y="69" width="6" height="10" rx="2" fill={f}/>
      <line x1="15" y1="82" x2="85" y2="82" stroke={c} strokeWidth="0.8"/>
      <text x="50" y="88" textAnchor="middle" fontSize="5" fill={c} fontFamily="serif">CALI - COLOMBIA</text>
    </svg>
  );
}
function Donut(p){var pct=Math.min(100,Math.round(p.pct)),r=18,ci=2*Math.PI*r,col=pct>=80?G:pct>=50?W:R;return(<div style={{textAlign:'center'}}><svg width="50" height="50" viewBox="0 0 50 50"><circle cx="25" cy="25" r={r} fill="none" stroke={BO} strokeWidth="5"/><circle cx="25" cy="25" r={r} fill="none" stroke={col} strokeWidth="5" strokeDasharray={ci} strokeDashoffset={ci*(1-pct/100)} strokeLinecap="round" transform="rotate(-90 25 25)"/><text x="25" y="29" textAnchor="middle" fontSize="9" fontWeight="bold" fill={col}>{pct}%</text></svg><div style={{fontSize:15,color:MU,marginTop:-4}}>{p.label}</div></div>);}
function Bar(p){return(<div style={{background:BO,borderRadius:20,height:8,overflow:'hidden'}}><div style={{width:Math.min(100,Math.round((p.val/(p.max||1))*100))+'%',height:'100%',background:p.color||G,borderRadius:20}}></div></div>);}
function Card(p){return(<div style={Object.assign({background:CA,borderRadius:12,padding:16,boxShadow:'0 1px 4px #0001',border:'1px solid '+BO},p.style||{})}>{p.children}</div>);}
function Btn(p){
  var v=p.variant||'primary',sm=p.small;
  var base={border:'none',borderRadius:8,cursor:'pointer',fontWeight:600,fontFamily:'inherit',padding:sm?'6px 12px':'10px 20px',fontSize:sm?16:17};
  var vc={primary:{background:P,color:'#fff'},success:{background:G,color:'#fff'},outline:{background:'transparent',color:P,border:'1.5px solid '+P},ghost:{background:'transparent',color:MU},accent:{background:A,color:'#fff'},danger:{background:R,color:'#fff'}};
  return(<button style={Object.assign({},base,vc[v]||vc.primary,p.style||{})} onClick={p.onClick}>{p.children}</button>);
}
function inp(x){return Object.assign({width:'100%',padding:'8px 10px',borderRadius:7,border:'1px solid '+BO,fontSize:17,color:'#071F33',background:CA,fontFamily:'inherit',boxSizing:'border-box'},x||{});}

// ─── LOGIN ───────────────────────────────────────────────────────────────────
function Login(p){
  var dynUsers=p.users||USERS;
  var loginGroups=buildLoginGroups(dynUsers);
  var [sel,setSel]=useState('');
  var [pin,setPin]=useState('');
  var [err,setErr]=useState('');
  var [step,setStep]=useState(1);
  var su=dynUsers.find(function(u){return u.id===sel;});
  function doPin(){if(su&&pin===su.pin){p.onLogin(su);}else{setErr('PIN incorrecto.');setPin('');}}
  return (
    <div style={{minHeight:'100vh',background:'linear-gradient(150deg,#071F33,#0A3D62)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:24,fontFamily:'system-ui'}}>
      <Logo size={140} white={true}/>
      <h1 style={{color:'#fff',fontSize:33,fontWeight:700,margin:'12px 0 2px',textAlign:'center'}}>Koinonía</h1>
      <p style={{color:'#ffffffbb',fontSize:17,margin:'0 0 4px',textAlign:'center',fontStyle:'italic'}}>κοινωνία — Comunión y vida compartida</p>
      <p style={{color:'#ffffff55',fontSize:16,margin:'0 0 24px',textAlign:'center'}}>Comunidad Emmanuel · Cali</p>
      <div style={{background:'#ffffff18',borderRadius:16,padding:24,width:'100%',maxWidth:340,border:'1px solid #ffffff25'}}>
        {step===1&&(
          <div>
            <div style={{fontSize:17,color:'#ffffffcc',fontWeight:600,marginBottom:6}}>¿Quién eres?</div>
            <select value={sel} onChange={function(e){setSel(e.target.value);}} style={{width:'100%',padding:'11px 12px',borderRadius:8,border:'none',fontSize:18,color:'#071F33',background:'#fff',marginBottom:16,fontFamily:'inherit'}}>
              <option value=''>— Selecciona tu nombre —</option>
              {loginGroups.map(function(g){
                var usrs=g.ids.map(function(id){return dynUsers.find(function(u){return u.id===id;});}).filter(Boolean);
                if(!usrs.length)return null;
                return(
                  <optgroup key={g.label} label={g.label}>
                    {usrs.map(function(u){var sub=SUBTITLES[u.id];return <option key={u.id} value={u.id}>{u.nombre}{sub?' — '+sub:''}</option>;})}
                  </optgroup>
                );
              })}
            </select>
            <button onClick={function(){if(sel)setStep(2);}} style={{width:'100%',padding:12,borderRadius:8,border:'none',background:A,color:'#fff',fontWeight:700,fontSize:20,cursor:'pointer',fontFamily:'inherit'}}>Continuar →</button>
          </div>
        )}
        {step===2&&(
          <div>
            <div style={{textAlign:'center',marginBottom:16}}>
              <div style={{fontSize:39,marginBottom:4}}>🔐</div>
              <p style={{color:'#ffffffcc',fontSize:18,margin:0,fontWeight:600}}>{su?su.nombre:''}</p>
              <p style={{color:'#ffffff88',fontSize:16,margin:'4px 0 0'}}>Ingresa tu PIN</p>
            </div>
            <input type='password' maxLength={4} value={pin} onChange={function(e){setPin(e.target.value);setErr('');}} onKeyDown={function(e){if(e.key==='Enter')doPin();}} placeholder='••••' style={{width:'100%',padding:'14px 12px',borderRadius:8,border:err?'2px solid #FC8181':'none',fontSize:31,color:'#071F33',background:'#fff',marginBottom:err?8:16,fontFamily:'inherit',textAlign:'center',letterSpacing:8,boxSizing:'border-box'}}/>
            {err&&<p style={{color:'#FC8181',fontSize:17,margin:'0 0 12px',textAlign:'center'}}>{err}</p>}
            <button onClick={doPin} style={{width:'100%',padding:12,borderRadius:8,border:'none',background:A,color:'#fff',fontWeight:700,fontSize:20,cursor:'pointer',fontFamily:'inherit',marginBottom:8}}>Entrar ✨</button>
            <button onClick={function(){setStep(1);setPin('');setErr('');}} style={{width:'100%',padding:8,borderRadius:8,border:'none',background:'transparent',color:'#ffffffaa',fontSize:17,cursor:'pointer',fontFamily:'inherit'}}>← Volver</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── BOTTOM NAV ──────────────────────────────────────────────────────────────
function BottomNav(p){
  var user=p.user||{};
  var dynGroups=p.groups||GROUPS;
  var isOscar=user.id==='u_oscar';
  var isRP=mrole(user)==='rp';
  var isSup=mrole(user)==='sup';
  var isCds=mrole(user)==='cds'||mrole(user)==='admin';
  var hasOwnGroup=dynGroups.some(function(g){return g.rpId===user.id;});
  var all=[
    {id:'home',   icon:'🏠',lb:'Inicio',     show:true},
    {id:'grupo',  icon:'👥',lb:'Mi Grupo',   show:!isOscar&&(isRP||isSup||isCds||hasOwnGroup)},
    {id:'agendar',icon:'📅',lb:'Agendar',    show:!isOscar&&(isRP||hasOwnGroup)},
    {id:'progreso',icon:'📊',lb:'Progreso',  show:!isOscar&&(isRP||hasOwnGroup)},
    {id:'sup',    icon:'👁',lb:'Supervisión',show:!isOscar&&(isSup||isCds||isRP)},
    {id:'servicios',icon:'🎗',lb:'Servicios',show:isOscar},
  ];
  var items=all.filter(function(it){return it.show;});
  return (
    <nav style={{position:'fixed',bottom:0,left:0,right:0,background:CA,borderTop:'1px solid '+BO,display:'flex',zIndex:100}}>
      {items.map(function(it){return(
        <button key={it.id} onClick={function(){p.go(it.id);}} style={{flex:1,padding:'6px 2px',border:'none',background:'transparent',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:1,color:p.sc===it.id?P:MU}}>
          <span style={{fontSize:21}}>{it.icon}</span>
          <span style={{fontSize:13,fontWeight:p.sc===it.id?700:400}}>{it.lb}</span>
        </button>
      );})}
    </nav>
  );
}

// ─── HOME RP ─────────────────────────────────────────────────────────────────
function HomeRP(p){
  var user=p.user,group=p.group,meetings=p.meetings,go=p.go;
  var SEM=p.sem||CSEM;
  var mb=group?group.miembros:[];
  var mbPP=mb.filter(function(m){return !m.rpOverride;});
  var semR=meetings.filter(function(m){return m.rpId===user.id&&m.semestre===SEM&&m.realizada;});
  var pend=meetings.filter(function(m){return m.rpId===user.id&&!m.realizada&&m.fecha>=TODAY;});
  var thisMo=TODAY.slice(0,7);
  var sinMes=mbPP.filter(function(m){
    var last=meetings.filter(function(x){return x.miembroId===m.id&&x.realizada;})
      .sort(function(a,b){return (b.fechaReal||'').localeCompare(a.fechaReal||'');})[0];
    return !last||(last.fechaReal||'').slice(0,7)!==thisMo;
  });
  var meta=mbPP.length*4,pct=meta>0?Math.round(semR.length/meta*100):0;
  var h=new Date().getHours(),gr=h<12?'Buenos días':h<18?'Buenas tardes':'Buenas noches';
  var miniBtn=function(ic,lb,fn,cl,tc){return(<button onClick={fn} style={{background:cl,border:'1px solid '+cl+'BB',borderRadius:8,padding:'7px 4px',cursor:'pointer',fontSize:16,fontWeight:600,color:tc||'#fff',textAlign:'center'}}>{ic}<div style={{fontSize:15,marginTop:2}}>{lb}</div></button>);};
  var showBanner=p.pendingPeriodId&&!((p.activatedGPs||{})[user.id]);
  return (
    <div style={{padding:'20px 16px 100px',fontFamily:'system-ui'}}>
      {showBanner&&(
        <div style={{background:'linear-gradient(135deg,#071F33,#0A3D62)',borderRadius:12,padding:16,marginBottom:16,color:'#fff',border:'2px solid #1A6FA8'}}>
          <div style={{display:'flex',alignItems:'flex-start',gap:10}}>
            <span style={{fontSize:28,flexShrink:0}}>🔔</span>
            <div style={{flex:1}}>
              <p style={{margin:'0 0 4px',fontWeight:700,fontSize:18}}>Nuevo periodo disponible</p>
              <p style={{margin:'0 0 12px',fontSize:16,opacity:0.9}}><strong>{p.pendingPeriodId}</strong> — Al activar, tu PPG y los PPPs se heredan completos. La programación de pastoreos y las reuniones del GP empezarán en cero. Podrás renovar el PPG desde la pestaña Mi Grupo cuando lo necesites.</p>
              <button onClick={function(){if(p.onActivateGP)p.onActivateGP(user.id);}} style={{background:'#B5451B',border:'none',borderRadius:8,color:'#fff',fontWeight:700,fontSize:17,padding:'8px 18px',cursor:'pointer'}}>✅ Activar mi PPG para {p.pendingPeriodId}</button>
            </div>
          </div>
        </div>
      )}
      <p style={{color:MU,fontSize:18,margin:'0 0 2px'}}>{gr},</p>
      <h2 style={{color:P,fontSize:27,fontWeight:700,margin:'0 0 4px'}}>{user.nombre.split(' ')[0]} 👋</h2>
      <p style={{color:MU,fontSize:17,margin:'0 0 16px'}}>Responsable Pastoral · {user.sector} · {SEM}</p>
      {/* ── MI GRUPO PASTORAL ── */}
      {(function(){var noRealGP=NO_GP_USERS.includes(user.id)||(!!group&&!!group.isVirtual);if(noRealGP)return(<div style={{marginBottom:12}}><p style={{fontSize:18,fontWeight:700,color:P,margin:'0 0 8px',paddingBottom:4,borderBottom:'1px solid '+P+'33'}}>👥 MI GRUPO PASTORAL</p><Card style={{padding:16,textAlign:'center'}}><p style={{margin:0,fontSize:17,color:MU}}>No tienes Grupo Pastoral asignado.</p></Card>{(group&&group.miembros&&group.miembros.length>0)&&(<Btn variant='outline' onClick={function(){go('grupo');}} style={{width:'100%',marginTop:8}}>{user.genero==='F'?'👥 Hermanas que tengo a mi cargo':'👥 Hermanos que tengo a mi cargo'}</Btn>)}</div>);return null;})()}
      {(function(){var noRealGP=NO_GP_USERS.includes(user.id)||(!!group&&!!group.isVirtual);if(noRealGP)return null;return group&&(
        <div style={{marginBottom:4}}>
          <p style={{fontSize:18,fontWeight:700,color:P,margin:'0 0 8px',paddingBottom:4,borderBottom:'1px solid '+P+'33'}}>👥 MI GRUPO PASTORAL</p>
          <Card style={{padding:0,overflow:'hidden',background:P}}>
            <div style={{background:'rgba(255,255,255,0.12)',borderBottom:'1px solid rgba(255,255,255,0.25)',padding:'12px 14px 10px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                <div>
                  <p style={{margin:0,fontWeight:700,fontSize:18,color:'#fff'}}>{group.nombre}</p>
                  <p style={{margin:'3px 0 0',fontSize:16,color:'rgba(255,255,255,0.7)'}}>{group.sector||user.sector} · {mbPP.length} {user.genero==='F'?'hermanas':'hermanos'}</p>
                </div>
                <span style={{background:'rgba(155,44,44,0.75)',color:'#fff',fontSize:16,padding:'3px 8px',borderRadius:20,fontWeight:700,whiteSpace:'nowrap'}}>{pct}%</span>
              </div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',borderBottom:'1px solid rgba(255,255,255,0.2)'}}>
              <div style={{padding:'10px 8px',textAlign:'center',borderRight:'1px solid '+BO,background:'rgba(255,255,255,0.12)',borderRadius:10,margin:'0 4px 0 8px'}}>
                <div style={{fontSize:27,fontWeight:700,color:'#fff'}}>{mbPP.length}</div>
                <div style={{fontSize:15,color:'rgba(255,255,255,0.65)'}}>hermanos</div>
              </div>
              <div style={{padding:'10px 8px',textAlign:'center',borderRight:'1px solid '+BO,background:'rgba(255,255,255,0.12)',borderRadius:10,margin:'0 4px'}}>
                <div style={{fontSize:27,fontWeight:700,color:'#fff'}}>{semR.length}</div>
                <div style={{fontSize:15,color:'rgba(255,255,255,0.65)'}}>Pastoreos realizados</div>
              </div>
              <div style={{padding:'10px 8px',textAlign:'center',background:'rgba(255,255,255,0.12)',borderRadius:10,margin:'0 8px 0 4px'}}>
                <div style={{fontSize:27,fontWeight:700,color:'#fff'}}>{meta}</div>
                <div style={{fontSize:15,color:'rgba(255,255,255,0.65)'}}>meta</div>
              </div>
            </div>
            <div style={{padding:'10px 14px 4px'}}>
              <div style={{background:'rgba(255,255,255,0.2)',borderRadius:20,height:6,overflow:'hidden'}}>
                <div style={{width:Math.min(100,pct)+'%',height:'100%',background:pct>=80?G:pct>=50?W:R,borderRadius:20}}></div>
              </div>
              <p style={{margin:'5px 0 0',fontSize:15,color:'rgba(255,255,255,0.65)',textAlign:'right'}}>{semR.length} de {meta} pastoreos{meta-semR.length>0?' · faltan '+(meta-semR.length):' · ¡meta cumplida! 🎉'}</p>
            </div>
            <div style={{padding:'10px 14px 12px'}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:6,marginBottom:6}}>
                <button onClick={function(){go('grupo');}} style={{background:'rgba(255,255,255,0.95)',border:'none',borderRadius:8,padding:'7px 4px',cursor:'pointer',fontSize:16,fontWeight:600,color:P,textAlign:'center'}}>👥<div style={{fontSize:15,marginTop:2}}>Mi Grupo</div></button>
                <button onClick={function(){go('agendar');}} style={{background:'rgba(255,255,255,0.72)',border:'0.5px solid rgba(255,255,255,0.4)',borderRadius:8,padding:'7px 4px',cursor:'pointer',fontSize:16,fontWeight:600,color:P,textAlign:'center'}}>📅<div style={{fontSize:15,marginTop:2}}>Agendar</div></button>
                <button onClick={function(){go('registrar');}} style={{background:'rgba(255,255,255,0.72)',border:'0.5px solid rgba(255,255,255,0.4)',borderRadius:8,padding:'7px 4px',cursor:'pointer',fontSize:16,fontWeight:600,color:P,textAlign:'center'}}>✅<div style={{fontSize:15,marginTop:2}}>Registrar</div></button>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
                <button onClick={function(){go('progreso');}} style={{background:'rgba(255,255,255,0.72)',border:'0.5px solid rgba(255,255,255,0.4)',borderRadius:8,padding:'7px 4px',cursor:'pointer',fontSize:16,fontWeight:600,color:P,textAlign:'center'}}>📊<div style={{fontSize:15,marginTop:2}}>Progreso</div></button>
                <button onClick={function(){go('sup');}} style={{background:'rgba(255,255,255,0.95)',border:'none',borderRadius:8,padding:'7px 4px',cursor:'pointer',fontSize:16,fontWeight:600,color:P,textAlign:'center'}}>👁<div style={{fontSize:15,marginTop:2}}>Supervisión</div></button>
              </div>
            </div>
          </Card>
        </div>
      );})()}
      {sinMes.length>0&&(<div style={{background:'#FFFBEB',border:'1.5px solid #ECC94B',borderRadius:10,padding:12,marginBottom:10,display:'flex',gap:10}}><span style={{fontSize:27}}>🔔</span><div><p style={{margin:0,fontWeight:700,fontSize:18,color:'#7D5A00'}}>Recordatorio fraterno</p><p style={{margin:'2px 0 4px',fontSize:17,color:'#7D5A00'}}>{sinMes.length===1?sinMes[0].nombre+' aún no ha tenido Pastoreo Personal este mes.':sinMes.length+' '+(user.genero==='F'?'hermanas':'hermanos')+' sin Pastoreo Personal este mes.'}</p><button onClick={function(){go('agendar');}} style={{fontSize:16,color:P,background:'none',border:'none',cursor:'pointer',fontWeight:700,padding:0,textDecoration:'underline'}}>Agendar →</button></div></div>)}
      {pend.length>0&&(<div style={{background:'#F0FFF4',border:'1.5px solid #68D391',borderRadius:10,padding:12,marginBottom:12,display:'flex',gap:10}}><span style={{fontSize:27}}>📅</span><div><p style={{margin:0,fontWeight:700,fontSize:18,color:G}}>Reuniones programadas</p><p style={{margin:'2px 0 0',fontSize:17,color:G}}>Tienes {pend.length} reunión(es) próxima(s).</p></div></div>)}
      
    </div>
  );
}

// ─── HOME SUPERVISOR ──────────────────────────────────────────────────────────
function HomeSup(p){
  var user=p.user,go=p.go,goSup=p.goSup||function(t){go('sup');};
  var dynUsers=p.users||USERS,dynGroups=p.groups||GROUPS;
  var meetings=p.meetings||[],supMtgs=p.supMtgs||[];
  var SEM=p.sem||CSEM;
  var h=new Date().getHours(),gr=h<12?'Buenos días':h<18?'Buenas tardes':'Buenas noches';
  var myRPs=dynUsers.filter(function(u){return u.supId===user.id&&u.activo!==false;});
  var semR=meetings.filter(function(m){return m.semestre===SEM&&m.realizada;});
  var myGroup=getEffectiveGroup(user.id,dynGroups);
  var myGroupMbAll=myGroup?myGroup.miembros:[];
  var myGroupMb=myGroupMbAll.filter(function(m){return !(m.rpOverride&&m.rpOverride===user.id&&findActualGroup(m.nombre,myGroup?myGroup.id:'',dynGroups));}).length;
  var myGroupPP=myGroupMbAll.filter(function(m){return !m.rpOverride;}).length;
  var myGroupReal=semR.filter(function(m){return m.rpId===user.id;}).length;
  var myGroupMeta=myGroupPP*4;
  var myGroupPct=myGroupMeta>0?Math.round(myGroupReal/myGroupMeta*100):0;
  var rpStats=myRPs.map(function(rp){var g=dynGroups.find(function(x){return x.rpId===rp.id;});var mbAll=g?g.miembros:[];var mb=mbAll.filter(function(m){return !m.rpOverride;}).length;var real=semR.filter(function(m){return m.rpId===rp.id;}).length;var meta=mb*4;var pct=meta>0?Math.round(real/meta*100):0;return {rp:rp,g:g,mb:mb,real:real,meta:meta,pct:pct};});
  var tMeta=rpStats.reduce(function(a,s){return a+s.meta;},0);
  var tReal=rpStats.reduce(function(a,s){return a+s.real;},0);
  var gPct=tMeta>0?Math.round(tReal/tMeta*100):0;
  var sinReg=rpStats.filter(function(s){return s.real===0&&s.meta>0;});
  var pendSup=supMtgs.filter(function(m){return m.supId===user.id&&!m.realizada;}).sort(function(a,b){return (a.fecha||'').localeCompare(b.fecha||'');}).slice(0,3);
  var verde=rpStats.filter(function(s){return s.pct>=80;}).length;
  var amarillo=rpStats.filter(function(s){return s.pct>=50&&s.pct<80;}).length;
  var rojo=rpStats.filter(function(s){return s.pct<50;}).length;
  var supDone=supMtgs.filter(function(m){return m.supId===user.id&&m.semestre===SEM&&m.realizada;}).length;
  var supPend=supMtgs.filter(function(m){return m.supId===user.id&&m.semestre===SEM&&!m.realizada;}).length;
  var miniBtn=function(ic,lb,fn,cl,tc){return(<button onClick={fn} style={{background:cl,border:'1px solid '+cl+'BB',borderRadius:8,padding:'7px 4px',cursor:'pointer',fontSize:16,fontWeight:600,color:tc||'#fff',textAlign:'center'}}>{ic}<div style={{fontSize:15,marginTop:2}}>{lb}</div></button>);};
  var secRP={fontSize:18,fontWeight:700,color:P,margin:'16px 0 8px',paddingBottom:4,borderBottom:'1px solid '+P+'33'};
  var secSup={fontSize:18,fontWeight:700,color:'#1A6FA8',margin:'16px 0 8px',paddingBottom:4,borderBottom:'1px solid #1A6FA833'};
  var bigBtn=function(ic,lb,fn,cl){return(<button key={lb} onClick={fn} style={{background:cl+'15',border:'1.5px solid '+cl+'35',borderRadius:12,padding:'14px 8px',cursor:'pointer',textAlign:'center'}}><div style={{fontSize:31,marginBottom:6}}>{ic}</div><div style={{fontSize:16,fontWeight:600,color:cl,lineHeight:1.3}}>{lb}</div></button>);};
  var showBanner=p.pendingPeriodId&&!((p.activatedGPs||{})[user.id]);
  return (
    <div style={{padding:'20px 16px 100px',fontFamily:'system-ui'}}>
      {showBanner&&(
        <div style={{background:'linear-gradient(135deg,#071F33,#0A3D62)',borderRadius:12,padding:16,marginBottom:16,color:'#fff',border:'2px solid #1A6FA8'}}>
          <div style={{display:'flex',alignItems:'flex-start',gap:10}}>
            <span style={{fontSize:28,flexShrink:0}}>🔔</span>
            <div style={{flex:1}}>
              <p style={{margin:'0 0 4px',fontWeight:700,fontSize:18}}>Nuevo periodo disponible</p>
              <p style={{margin:'0 0 12px',fontSize:16,opacity:0.9}}><strong>{p.pendingPeriodId}</strong> — Al activar, tu PPG y los PPPs se heredan completos. La programación de pastoreos y las reuniones del GP empezarán en cero. Podrás renovar el PPG desde la pestaña Mi Grupo cuando lo necesites.</p>
              <button onClick={function(){if(p.onActivateGP)p.onActivateGP(user.id);}} style={{background:'#B5451B',border:'none',borderRadius:8,color:'#fff',fontWeight:700,fontSize:17,padding:'8px 18px',cursor:'pointer'}}>✅ Activar mi PPG para {p.pendingPeriodId}</button>
            </div>
          </div>
        </div>
      )}
      <p style={{color:MU,fontSize:18,margin:'0 0 2px'}}>{gr},</p>
      <h2 style={{color:P,fontSize:27,fontWeight:700,margin:'0 0 4px'}}>{user.nombre.split(' ')[0]} 👋</h2>
      <p style={{color:MU,fontSize:17,margin:'0 0 16px'}}>Líder Mayor · {user.sector} · {SEM}</p>

      {/* ── MI GRUPO PASTORAL ── */}
      {(function(){
        var noRealGP=NO_GP_USERS.includes(user.id)||(!!myGroup&&!!myGroup.isVirtual);
        var extCargo=getCargoMembersExternal(user.id,myGroup&&myGroup.id,dynGroups);
        var selfCargo=myGroup?myGroup.miembros.filter(function(m){return m.rpOverride===user.id&&!m.userId;}):[];
        var cargoKeys={};var allCargo=[];
        selfCargo.concat(extCargo).forEach(function(m){if(!cargoKeys[m.nombre]){cargoKeys[m.nombre]=true;allCargo.push(m);}});
        var showCargoBtn=allCargo.length>0;
        var genHerm=user.genero==='F'?'Hermanas':'Hermanos';
        var cargoBtnLabel=noRealGP?(genHerm+' que tengo a mi cargo'):(genHerm+' que tengo a mi cargo y no están en mi GP');
        if(noRealGP)return(<div style={{marginBottom:12}}><p style={secRP}>👥 MI GRUPO PASTORAL</p><Card style={{padding:16,textAlign:'center'}}><p style={{margin:0,fontSize:17,color:MU}}>No tienes Grupo Pastoral asignado.</p></Card>{showCargoBtn&&(<Btn variant='outline' onClick={function(){go('grupo');}} style={{width:'100%',marginTop:8}}>👥 {cargoBtnLabel}</Btn>)}</div>);
        return myGroup&&(
        <div style={{marginBottom:4}}>
          <p style={secRP}>👥 MI GRUPO PASTORAL</p>
          <Card style={{padding:0,overflow:'hidden',background:P}}>
            <div style={{background:'rgba(255,255,255,0.12)',borderBottom:'1px solid rgba(255,255,255,0.25)',padding:'12px 14px 10px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                <div>
                  <p style={{margin:0,fontWeight:700,fontSize:18,color:'#fff'}}>{myGroup.nombre}</p>
                  <p style={{margin:'3px 0 0',fontSize:16,color:'rgba(255,255,255,0.7)'}}>{myGroup.sector} · {myGroupMb} {user.genero==='F'?'hermanas':'hermanos'}</p>
                </div>
                <span style={{background:'rgba(155,44,44,0.75)',color:'#fff',fontSize:16,padding:'3px 8px',borderRadius:20,fontWeight:700,whiteSpace:'nowrap'}}>{myGroupPct}%</span>
              </div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',borderBottom:'1px solid rgba(255,255,255,0.2)'}}>
              <div style={{padding:'10px 8px',textAlign:'center',borderRight:'1px solid '+BO,background:'rgba(255,255,255,0.12)',borderRadius:10,margin:'0 4px 0 8px'}}>
                <div style={{fontSize:27,fontWeight:700,color:'#fff'}}>{myGroupMb}</div>
                <div style={{fontSize:15,color:'rgba(255,255,255,0.65)'}}>{user.genero==='F'?'hermanas':'hermanos'}</div>
              </div>
              <div style={{padding:'10px 8px',textAlign:'center',borderRight:'1px solid '+BO,background:'rgba(255,255,255,0.12)',borderRadius:10,margin:'0 4px'}}>
                <div style={{fontSize:27,fontWeight:700,color:'#fff'}}>{myGroupReal}</div>
                <div style={{fontSize:15,color:'rgba(255,255,255,0.65)'}}>Pastoreos realizados</div>
              </div>
              <div style={{padding:'10px 8px',textAlign:'center',background:'rgba(255,255,255,0.12)',borderRadius:10,margin:'0 8px 0 4px'}}>
                <div style={{fontSize:27,fontWeight:700,color:'#fff'}}>{myGroupMeta}</div>
                <div style={{fontSize:15,color:'rgba(255,255,255,0.65)'}}>meta</div>
              </div>
            </div>
            <div style={{padding:'10px 14px 4px'}}>
              <div style={{background:'rgba(255,255,255,0.2)',borderRadius:20,height:6,overflow:'hidden'}}>
                <div style={{width:Math.min(100,myGroupPct)+'%',height:'100%',background:myGroupPct>=80?G:myGroupPct>=50?W:R,borderRadius:20}}></div>
              </div>
              <p style={{margin:'5px 0 0',fontSize:15,color:'rgba(255,255,255,0.65)',textAlign:'right'}}>{myGroupReal} de {myGroupMeta} pastoreos{myGroupMeta-myGroupReal>0?' · faltan '+(myGroupMeta-myGroupReal):' · ¡meta cumplida! 🎉'}</p>
            </div>
            <div style={{padding:'10px 14px 12px'}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:6,marginBottom:6}}>
                <button onClick={function(){go('grupo');}} style={{background:'rgba(255,255,255,0.95)',border:'none',borderRadius:8,padding:'7px 4px',cursor:'pointer',fontSize:16,fontWeight:600,color:P,textAlign:'center'}}>👥<div style={{fontSize:15,marginTop:2}}>Mi Grupo</div></button>
                <button onClick={function(){go('agendar');}} style={{background:'rgba(255,255,255,0.72)',border:'0.5px solid rgba(255,255,255,0.4)',borderRadius:8,padding:'7px 4px',cursor:'pointer',fontSize:16,fontWeight:600,color:P,textAlign:'center'}}>📅<div style={{fontSize:15,marginTop:2}}>Agendar</div></button>
                <button onClick={function(){go('registrar');}} style={{background:'rgba(255,255,255,0.72)',border:'0.5px solid rgba(255,255,255,0.4)',borderRadius:8,padding:'7px 4px',cursor:'pointer',fontSize:16,fontWeight:600,color:P,textAlign:'center'}}>✅<div style={{fontSize:15,marginTop:2}}>Registrar Cita</div></button>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
                <button onClick={function(){go('progreso');}} style={{background:'rgba(255,255,255,0.72)',border:'0.5px solid rgba(255,255,255,0.4)',borderRadius:8,padding:'7px 4px',cursor:'pointer',fontSize:16,fontWeight:600,color:P,textAlign:'center'}}>📊<div style={{fontSize:15,marginTop:2}}>Progreso</div></button>
                <button onClick={function(){go('misup');}} style={{background:'rgba(255,255,255,0.95)',border:'none',borderRadius:8,padding:'7px 4px',cursor:'pointer',fontSize:16,fontWeight:600,color:P,textAlign:'center'}}>👁<div style={{fontSize:15,marginTop:2}}>Mis Citas</div></button>
              </div>
            </div>
          </Card>
        </div>
      );})()}

      {/* ── MIS RESPONSABILIDADES DE SUPERVISIÓN ── */}
      <p style={secRP}>🔄 MIS RESPONSABILIDADES DE SUPERVISIÓN</p>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginTop:4}}>
        <button onClick={function(){goSup('panel');}} style={{background:P,border:'none',borderRadius:12,padding:'14px 8px',cursor:'pointer',textAlign:'center'}}><div style={{fontSize:31,marginBottom:6}}>📊</div><div style={{fontSize:16,fontWeight:600,color:'#fff',lineHeight:1.3}}>Panel de Supervisión</div></button>
        <button onClick={function(){goSup('cadena');}} style={{background:P,border:'none',borderRadius:12,padding:'14px 8px',cursor:'pointer',textAlign:'center'}}><div style={{fontSize:31,marginBottom:6}}>🔄</div><div style={{fontSize:16,fontWeight:600,color:'#fff',lineHeight:1.3}}>Ciclo de Supervisión</div></button>
      </div>
    </div>
  );
}


// ─── HOME CDS ─────────────────────────────────────────────────────────────────
function HomeCds(p){
  var user=p.user,go=p.go,goSup=p.goSup||function(t){go('sup');};
  var dynUsers=p.users||USERS,dynGroups=p.groups||GROUPS;
  var meetings=p.meetings||[],supMtgs=p.supMtgs||[];
  var allPlans=p.allPlans||{},allAtt=p.allAtt||{};
  var h=new Date().getHours(),gr=h<12?'Buenos días':h<18?'Buenas tardes':'Buenas noches';
  var sector=user.sector;
  var subtitulo=hasR(user,'coordinador_sector')?'Coordinador de Sector':'Responsable de Sector';
  var rps=dynUsers.filter(function(u){return u.roles&&u.roles.includes('responsable')&&u.sector===sector&&u.activo!==false;});
  var sups=dynUsers.filter(function(u){return u.roles&&u.roles.includes('supervisor')&&u.sector===sector&&u.activo!==false;});
  var semR=meetings.filter(function(m){return m.semestre===CSEM&&m.realizada;});
  var myGroup=getEffectiveGroup(user.id,dynGroups);
  var myGroupMbAll=myGroup?myGroup.miembros:[];
  var myGroupMb=myGroupMbAll.filter(function(m){return !(m.rpOverride&&m.rpOverride===user.id&&findActualGroup(m.nombre,myGroup?myGroup.id:'',dynGroups));}).length;
  var myGroupPP=myGroupMbAll.filter(function(m){return !m.rpOverride;}).length;
  var myGroupReal=semR.filter(function(m){return m.rpId===user.id;}).length;
  var myGroupMeta=myGroupPP*4;
  var myGroupPct=myGroupMeta>0?Math.round(myGroupReal/myGroupMeta*100):0;
  var rpStats=rps.map(function(rp){var g=dynGroups.find(function(x){return x.rpId===rp.id;});var mbAll=g?g.miembros:[];var mb=mbAll.filter(function(m){return !m.rpOverride;}).length;var real=semR.filter(function(m){return m.rpId===rp.id;}).length;var meta=mb*4;var pct=meta>0?Math.round(real/meta*100):0;return {rp:rp,real:real,meta:meta,pct:pct};});
  var tMeta=rpStats.reduce(function(a,s){return a+s.meta;},0);
  var tReal=rpStats.reduce(function(a,s){return a+s.real;},0);
  var gPct=tMeta>0?Math.round(tReal/tMeta*100):0;
  var verde=rpStats.filter(function(s){return s.pct>=80;}).length;
  var amarillo=rpStats.filter(function(s){return s.pct>=50&&s.pct<80;}).length;
  var rojo=rpStats.filter(function(s){return s.pct<50;}).length;
  var supDone=supMtgs.filter(function(m){return m.sector===sector&&m.semestre===CSEM&&m.realizada;}).length;
  var supPend=supMtgs.filter(function(m){return m.sector===sector&&m.semestre===CSEM&&!m.realizada;}).length;
  var rpSinSup=rps.filter(function(rp){return !supMtgs.some(function(m){return m.rpId===rp.id&&m.semestre===CSEM;});});
  var pendCds=supMtgs.filter(function(m){return !m.realizada&&m.supId===user.id;}).sort(function(a,b){return (a.fecha||'').localeCompare(b.fecha||'');}).slice(0,3);
  var miniBtn=function(ic,lb,fn,cl,tc){return(<button onClick={fn} style={{background:cl,border:'1px solid '+cl+'BB',borderRadius:8,padding:'7px 4px',cursor:'pointer',fontSize:16,fontWeight:600,color:tc||'#fff',textAlign:'center'}}>{ic}<div style={{fontSize:15,marginTop:2}}>{lb}</div></button>);};
  var secRP={fontSize:18,fontWeight:700,color:P,margin:'16px 0 8px',paddingBottom:4,borderBottom:'1px solid '+P+'33'};
  var secSup={fontSize:18,fontWeight:700,color:'#1A6FA8',margin:'16px 0 8px',paddingBottom:4,borderBottom:'1px solid #1A6FA833'};
  return (
    <div style={{padding:'20px 16px 100px',fontFamily:'system-ui'}}>
      <p style={{color:MU,fontSize:18,margin:'0 0 2px'}}>{gr},</p>
      <h2 style={{color:P,fontSize:27,fontWeight:700,margin:'0 0 4px'}}>{user.nombre.split(' ')[0]} 👋</h2>
      <p style={{color:MU,fontSize:17,margin:'0 0 16px'}}>{subtitulo} · {sector} · {CSEM}</p>

      {/* ── MI GRUPO PASTORAL ── */}
      {(function(){
        var noRealGP=NO_GP_USERS.includes(user.id)||(!!myGroup&&!!myGroup.isVirtual);
        var extCargo=getCargoMembersExternal(user.id,myGroup&&myGroup.id,dynGroups);
        var selfCargo=myGroup?myGroup.miembros.filter(function(m){return m.rpOverride===user.id&&!m.userId;}):[];
        var cargoKeys={};var allCargo=[];
        selfCargo.concat(extCargo).forEach(function(m){if(!cargoKeys[m.nombre]){cargoKeys[m.nombre]=true;allCargo.push(m);}});
        var showCargoBtn=allCargo.length>0;
        var genHerm=user.genero==='F'?'Hermanas':'Hermanos';
        var cargoBtnLabel=noRealGP?(genHerm+' que tengo a mi cargo'):(genHerm+' que tengo a mi cargo y no están en mi GP');
        if(noRealGP)return(<div style={{marginBottom:12}}><p style={secRP}>👥 MI GRUPO PASTORAL</p><Card style={{padding:16,textAlign:'center'}}><p style={{margin:0,fontSize:17,color:MU}}>No tienes Grupo Pastoral asignado.</p></Card>{showCargoBtn&&(<Btn variant='outline' onClick={function(){go('grupo');}} style={{width:'100%',marginTop:8}}>👥 {cargoBtnLabel}</Btn>)}</div>);
        return myGroup&&(
        <div style={{marginBottom:4}}>
          <p style={secRP}>👥 MI GRUPO PASTORAL</p>
          <Card style={{padding:0,overflow:'hidden',background:P}}>
            <div style={{background:'rgba(255,255,255,0.12)',borderBottom:'1px solid rgba(255,255,255,0.25)',padding:'12px 14px 10px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                <div>
                  <p style={{margin:0,fontWeight:700,fontSize:18,color:'#fff'}}>{myGroup.nombre}</p>
                  <p style={{margin:'3px 0 0',fontSize:16,color:'rgba(255,255,255,0.7)'}}>{myGroup.sector} · {myGroupMb} {user.genero==='F'?'hermanas':'hermanos'}</p>
                </div>
                <span style={{background:'rgba(155,44,44,0.75)',color:'#fff',fontSize:16,padding:'3px 8px',borderRadius:20,fontWeight:700,whiteSpace:'nowrap'}}>{myGroupPct}%</span>
              </div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',borderBottom:'1px solid rgba(255,255,255,0.2)'}}>
              <div style={{padding:'10px 8px',textAlign:'center',borderRight:'1px solid '+BO,background:'rgba(255,255,255,0.12)',borderRadius:10,margin:'0 4px 0 8px'}}>
                <div style={{fontSize:27,fontWeight:700,color:'#fff'}}>{myGroupMb}</div>
                <div style={{fontSize:15,color:'rgba(255,255,255,0.65)'}}>{user.genero==='F'?'hermanas':'hermanos'}</div>
              </div>
              <div style={{padding:'10px 8px',textAlign:'center',borderRight:'1px solid '+BO,background:'rgba(255,255,255,0.12)',borderRadius:10,margin:'0 4px'}}>
                <div style={{fontSize:27,fontWeight:700,color:'#fff'}}>{myGroupReal}</div>
                <div style={{fontSize:15,color:'rgba(255,255,255,0.65)'}}>Pastoreos realizados</div>
              </div>
              <div style={{padding:'10px 8px',textAlign:'center',background:'rgba(255,255,255,0.12)',borderRadius:10,margin:'0 8px 0 4px'}}>
                <div style={{fontSize:27,fontWeight:700,color:'#fff'}}>{myGroupMeta}</div>
                <div style={{fontSize:15,color:'rgba(255,255,255,0.65)'}}>meta</div>
              </div>
            </div>
            <div style={{padding:'10px 14px 4px'}}>
              <div style={{background:'rgba(255,255,255,0.2)',borderRadius:20,height:6,overflow:'hidden'}}>
                <div style={{width:Math.min(100,myGroupPct)+'%',height:'100%',background:myGroupPct>=80?G:myGroupPct>=50?W:R,borderRadius:20}}></div>
              </div>
              <p style={{margin:'5px 0 0',fontSize:15,color:'rgba(255,255,255,0.65)',textAlign:'right'}}>{myGroupReal} de {myGroupMeta} pastoreos{myGroupMeta-myGroupReal>0?' · faltan '+(myGroupMeta-myGroupReal):' · ¡meta cumplida! 🎉'}</p>
            </div>
            <div style={{padding:'10px 14px 12px'}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:6,marginBottom:6}}>
                <button onClick={function(){go('grupo');}} style={{background:'rgba(255,255,255,0.95)',border:'none',borderRadius:8,padding:'7px 4px',cursor:'pointer',fontSize:16,fontWeight:600,color:P,textAlign:'center'}}>👥<div style={{fontSize:15,marginTop:2}}>Mi Grupo</div></button>
                <button onClick={function(){go('agendar');}} style={{background:'rgba(255,255,255,0.72)',border:'0.5px solid rgba(255,255,255,0.4)',borderRadius:8,padding:'7px 4px',cursor:'pointer',fontSize:16,fontWeight:600,color:P,textAlign:'center'}}>📅<div style={{fontSize:15,marginTop:2}}>Agendar</div></button>
                <button onClick={function(){go('registrar');}} style={{background:'rgba(255,255,255,0.72)',border:'0.5px solid rgba(255,255,255,0.4)',borderRadius:8,padding:'7px 4px',cursor:'pointer',fontSize:16,fontWeight:600,color:P,textAlign:'center'}}>✅<div style={{fontSize:15,marginTop:2}}>Registrar Cita</div></button>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
                <button onClick={function(){go('progreso');}} style={{background:'rgba(255,255,255,0.72)',border:'0.5px solid rgba(255,255,255,0.4)',borderRadius:8,padding:'7px 4px',cursor:'pointer',fontSize:16,fontWeight:600,color:P,textAlign:'center'}}>📊<div style={{fontSize:15,marginTop:2}}>Progreso</div></button>
                <button onClick={function(){go('misup');}} style={{background:'rgba(255,255,255,0.95)',border:'none',borderRadius:8,padding:'7px 4px',cursor:'pointer',fontSize:16,fontWeight:600,color:P,textAlign:'center'}}>👁<div style={{fontSize:15,marginTop:2}}>Mis Citas</div></button>
              </div>
            </div>
          </Card>
        </div>
      );})()}

      {/* ── MIS RESPONSABILIDADES DE SUPERVISIÓN ── */}
      <p style={secRP}>🔄 MIS RESPONSABILIDADES DE SUPERVISIÓN</p>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginTop:4}}>
        {[
          {ic:'📊',lb:'Panel de Supervisión',fn:function(){goSup('panel');},cl:P,tc:'#fff'},
          {ic:'🔄',lb:'Ciclo de Supervisión',fn:function(){goSup('cadena');},cl:P,tc:'#fff'},
          {ic:'⬇️',lb:'Reporte Semestral',fn:function(){printReporte(sector,rps,dynGroups,meetings,allPlans,allAtt);},cl:A,tc:'#fff'},
          {ic:'⚙️',lb:'Administración',fn:function(){go('admin');},cl:A,tc:'#fff'},
        ].map(function(a){return(<button key={a.lb} onClick={a.fn} style={{background:a.cl,border:'none',borderRadius:12,padding:'14px 8px',cursor:'pointer',textAlign:'center'}}><div style={{fontSize:31,marginBottom:6}}>{a.ic}</div><div style={{fontSize:16,fontWeight:600,color:a.tc||'#fff',lineHeight:1.3}}>{a.lb}</div></button>);})}
      </div>
    </div>
  );
}


// ─── HOME ADMIN ───────────────────────────────────────────────────────────────
function HomeAdmin(p){
  var user=p.user,go=p.go,goSup=p.goSup||function(t){go('sup');};
  var dynUsers=p.users||USERS,dynGroups=p.groups||GROUPS;
  var meetings=p.meetings||[];
  var h=new Date().getHours(),gr=h<12?'Buenos días':h<18?'Buenas tardes':'Buenas noches';
  var isRene=user.id==='u_rene';
  var subtitulo=isRene?'Coordinador Mayor · SCSN':'Consejo · SCSSM';
  var semR=meetings.filter(function(m){return m.semestre===CSEM&&m.realizada;});
  var myGroup=getEffectiveGroup(user.id,dynGroups);
  var myGroupMbAll=myGroup?myGroup.miembros:[];
  var myGroupMb=myGroupMbAll.filter(function(m){return !(m.rpOverride&&m.rpOverride===user.id&&findActualGroup(m.nombre,myGroup?myGroup.id:'',dynGroups));}).length;
  var myGroupPP=myGroupMbAll.filter(function(m){return !m.rpOverride;}).length;
  var myGroupReal=semR.filter(function(m){return m.rpId===user.id;}).length;
  var myGroupMeta=myGroupPP*4;
  var myGroupPct=myGroupMeta>0?Math.round(myGroupReal/myGroupMeta*100):0;
  var todosRPs=dynUsers.filter(function(u){return u.roles&&u.roles.includes('responsable')&&u.activo!==false&&(isRene||u.sector==='San Miguel');});
  var globalReal=semR.filter(function(m){return todosRPs.some(function(r){return r.id===m.rpId;});}).length;
  var globalMeta=todosRPs.reduce(function(a,rp){var g=dynGroups.find(function(x){return x.rpId===rp.id;});var mb=g?g.miembros.filter(function(m){return !m.rpOverride;}).length:0;return a+mb*4;},0);
  var globalPct=globalMeta>0?Math.round(globalReal/globalMeta*100):0;
  var miniBtn=function(ic,lb,fn,cl,tc){return(<button onClick={fn} style={{background:cl,border:'1px solid '+cl+'BB',borderRadius:8,padding:'7px 4px',cursor:'pointer',fontSize:16,fontWeight:600,color:tc||'#fff',textAlign:'center'}}>{ic}<div style={{fontSize:15,marginTop:2}}>{lb}</div></button>);};
  var secRP={fontSize:18,fontWeight:700,color:P,margin:'16px 0 8px',paddingBottom:4,borderBottom:'1px solid '+P+'33'};
  return (
    <div style={{padding:'20px 16px 100px',fontFamily:'system-ui'}}>
      <p style={{color:MU,fontSize:18,margin:'0 0 2px'}}>{gr},</p>
      <h2 style={{color:P,fontSize:27,fontWeight:700,margin:'0 0 4px'}}>{user.nombre.split(' ')[0]} 👋</h2>
      <p style={{color:MU,fontSize:17,margin:'0 0 16px'}}>{subtitulo} · {CSEM}</p>

      {/* ── Tarjeta global René ── */}
      {isRene&&(<Card style={{marginBottom:14,background:P+'08',border:'1.5px solid '+P+'33'}}><p style={{margin:'0 0 8px',fontWeight:700,fontSize:18,color:P}}>Panorama del Pastoreo Personal — Comunidad Emmanuel</p><div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10,textAlign:'center',marginBottom:8}}><div><div style={{fontSize:33,fontWeight:800,color:globalPct>=80?G:globalPct>=50?W:R}}>{globalPct}%</div><div style={{fontSize:15,color:MU}}>% meta semestral</div></div><div><div style={{fontSize:33,fontWeight:800,color:G}}>{globalReal}</div><div style={{fontSize:15,color:MU}}>PP realizados</div></div><div><div style={{fontSize:33,fontWeight:800,color:A}}>{todosRPs.length}</div><div style={{fontSize:15,color:MU}}>RPs activos</div></div></div><Bar val={globalReal} max={globalMeta||1} color={globalPct>=80?G:globalPct>=50?A:R}/></Card>)}

      {/* ── MI GRUPO PASTORAL ── */}
      {(function(){
        var noRealGP=NO_GP_USERS.includes(user.id)||(!!myGroup&&!!myGroup.isVirtual);
        var extCargo=getCargoMembersExternal(user.id,myGroup&&myGroup.id,dynGroups);
        var selfCargo=myGroup?myGroup.miembros.filter(function(m){return m.rpOverride===user.id&&!m.userId;}):[];
        var cargoKeys={};var allCargo=[];
        selfCargo.concat(extCargo).forEach(function(m){if(!cargoKeys[m.nombre]){cargoKeys[m.nombre]=true;allCargo.push(m);}});
        var showCargoBtn=allCargo.length>0;
        var genHerm=user.genero==='F'?'Hermanas':'Hermanos';
        var cargoBtnLabel=noRealGP?(genHerm+' que tengo a mi cargo'):(genHerm+' que tengo a mi cargo y no están en mi GP');
        if(noRealGP)return(<div style={{marginBottom:12}}><p style={secRP}>👥 MI GRUPO PASTORAL</p><Card style={{padding:16,textAlign:'center'}}><p style={{margin:0,fontSize:17,color:MU}}>No tienes Grupo Pastoral asignado.</p></Card>{showCargoBtn&&(<Btn variant='outline' onClick={function(){go('grupo');}} style={{width:'100%',marginTop:8}}>👥 {cargoBtnLabel}</Btn>)}</div>);
        return myGroup&&(
        <div style={{marginBottom:4}}>
          <p style={secRP}>👥 MI GRUPO PASTORAL</p>
          <Card style={{padding:0,overflow:'hidden',background:P}}>
            <div style={{background:'rgba(255,255,255,0.12)',borderBottom:'1px solid rgba(255,255,255,0.25)',padding:'12px 14px 10px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                <div>
                  <p style={{margin:0,fontWeight:700,fontSize:18,color:'#fff'}}>{myGroup.nombre}</p>
                  <p style={{margin:'3px 0 0',fontSize:16,color:'rgba(255,255,255,0.7)'}}>{myGroup.sector} · {myGroupMb} {user.genero==='F'?'hermanas':'hermanos'}</p>
                </div>
                <span style={{background:'rgba(155,44,44,0.75)',color:'#fff',fontSize:16,padding:'3px 8px',borderRadius:20,fontWeight:700,whiteSpace:'nowrap'}}>{myGroupPct}%</span>
              </div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',borderBottom:'1px solid rgba(255,255,255,0.2)'}}>
              <div style={{padding:'10px 8px',textAlign:'center',borderRight:'1px solid '+BO,background:'rgba(255,255,255,0.12)',borderRadius:10,margin:'0 4px 0 8px'}}>
                <div style={{fontSize:27,fontWeight:700,color:'#fff'}}>{myGroupMb}</div>
                <div style={{fontSize:15,color:'rgba(255,255,255,0.65)'}}>{user.genero==='F'?'hermanas':'hermanos'}</div>
              </div>
              <div style={{padding:'10px 8px',textAlign:'center',borderRight:'1px solid '+BO,background:'rgba(255,255,255,0.12)',borderRadius:10,margin:'0 4px'}}>
                <div style={{fontSize:27,fontWeight:700,color:'#fff'}}>{myGroupReal}</div>
                <div style={{fontSize:15,color:'rgba(255,255,255,0.65)'}}>Pastoreos realizados</div>
              </div>
              <div style={{padding:'10px 8px',textAlign:'center',background:'rgba(255,255,255,0.12)',borderRadius:10,margin:'0 8px 0 4px'}}>
                <div style={{fontSize:27,fontWeight:700,color:'#fff'}}>{myGroupMeta}</div>
                <div style={{fontSize:15,color:'rgba(255,255,255,0.65)'}}>meta</div>
              </div>
            </div>
            <div style={{padding:'10px 14px 4px'}}>
              <div style={{background:'rgba(255,255,255,0.2)',borderRadius:20,height:6,overflow:'hidden'}}>
                <div style={{width:Math.min(100,myGroupPct)+'%',height:'100%',background:myGroupPct>=80?G:myGroupPct>=50?W:R,borderRadius:20}}></div>
              </div>
              <p style={{margin:'5px 0 0',fontSize:15,color:'rgba(255,255,255,0.65)',textAlign:'right'}}>{myGroupReal} de {myGroupMeta} pastoreos{myGroupMeta-myGroupReal>0?' · faltan '+(myGroupMeta-myGroupReal):' · ¡meta cumplida! 🎉'}</p>
            </div>
            <div style={{padding:'10px 14px 12px'}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:6,marginBottom:6}}>
                <button onClick={function(){go('grupo');}} style={{background:'rgba(255,255,255,0.95)',border:'none',borderRadius:8,padding:'7px 4px',cursor:'pointer',fontSize:16,fontWeight:600,color:P,textAlign:'center'}}>👥<div style={{fontSize:15,marginTop:2}}>Mi Grupo</div></button>
                <button onClick={function(){go('agendar');}} style={{background:'rgba(255,255,255,0.72)',border:'0.5px solid rgba(255,255,255,0.4)',borderRadius:8,padding:'7px 4px',cursor:'pointer',fontSize:16,fontWeight:600,color:P,textAlign:'center'}}>📅<div style={{fontSize:15,marginTop:2}}>Agendar</div></button>
                <button onClick={function(){go('registrar');}} style={{background:'rgba(255,255,255,0.72)',border:'0.5px solid rgba(255,255,255,0.4)',borderRadius:8,padding:'7px 4px',cursor:'pointer',fontSize:16,fontWeight:600,color:P,textAlign:'center'}}>✅<div style={{fontSize:15,marginTop:2}}>Registrar Cita</div></button>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
                <button onClick={function(){go('progreso');}} style={{background:'rgba(255,255,255,0.72)',border:'0.5px solid rgba(255,255,255,0.4)',borderRadius:8,padding:'7px 4px',cursor:'pointer',fontSize:16,fontWeight:600,color:P,textAlign:'center'}}>📊<div style={{fontSize:15,marginTop:2}}>Progreso</div></button>
                <button onClick={function(){go('misup');}} style={{background:'rgba(255,255,255,0.95)',border:'none',borderRadius:8,padding:'7px 4px',cursor:'pointer',fontSize:16,fontWeight:600,color:P,textAlign:'center'}}>👁<div style={{fontSize:15,marginTop:2}}>Mis Citas</div></button>
              </div>
            </div>
          </Card>
        </div>
      );})()}

      {/* ── MIS RESPONSABILIDADES DE SUPERVISIÓN ── */}
      <p style={secRP}>🔄 MIS RESPONSABILIDADES DE SUPERVISIÓN</p>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginTop:4}}>
        {[
          {ic:'📊',lb:'Panel de Supervisión',  fn:function(){goSup('panel'); },cl:P,tc:'#fff'},
          {ic:'🔄',lb:'Ciclo de Supervisión',  fn:function(){goSup('cadena');},cl:P,tc:'#fff'},
          {ic:'⬇️',lb:'Reporte Semestral',     fn:function(){printReporte(isRene?'Comunidad Emmanuel':(user.sector||'Sector'),todosRPs,dynGroups,meetings,p.allPlans||{},p.allAtt||{});},cl:A,tc:'#fff'},
          {ic:'⚙️',lb:'Administración',        fn:function(){go('admin');    },cl:A,tc:'#fff'},
        ].map(function(a){return(<button key={a.lb} onClick={a.fn} style={{background:a.cl,border:'none',borderRadius:12,padding:'14px 8px',cursor:'pointer',textAlign:'center'}}><div style={{fontSize:31,marginBottom:6}}>{a.ic}</div><div style={{fontSize:16,fontWeight:600,color:a.tc||'#fff',lineHeight:1.3}}>{a.lb}</div></button>);})}
      </div>
    </div>
  );
}


// ─── HOME OSCAR ───────────────────────────────────────────────────────────────
function printReporteServicios(groups,allPlans,users){
  var pcol={'1':'#9B2C2C','2':'#B7791F','3':'#1A6FA8','4':'#276749'};
  var CSS='body{font-family:Arial,sans-serif;font-size:12px;color:#2D3748;margin:20px}h1{color:#0A3D62;font-size:17px}h2{color:#0A3D62;font-size:13px;border-bottom:2px solid #0A3D62;padding-bottom:3px;margin:18px 0 8px}h3{color:#0A3D62;font-size:12px;margin:14px 0 8px}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:4px}.card{background:#fff;border:1px solid #E2E8F0;border-radius:6px;padding:8px 10px}.card-name{font-weight:700;font-size:12px;color:#2D3748;margin-bottom:5px;border-bottom:1px solid #EDF2F7;padding-bottom:4px}.card-row{font-size:11px;color:#718096;margin:3px 0;display:flex;gap:4px}.card-row strong{color:#2D3748;white-space:nowrap}.sec{margin-bottom:18px;padding:12px;background:#EDF2F7;border-left:4px solid #0A3D62;border-radius:0 8px 8px 0}.foot{margin-top:24px;text-align:center;border-top:1px solid #E2E8F0;padding-top:10px;color:#718096;font-size:10px}table{width:100%;border-collapse:collapse;font-size:11px;margin-bottom:12px}th{background:#DFF0FF;color:#0A3D62;padding:5px 7px;text-align:left}td{padding:4px 7px;border-bottom:1px solid #E2E8F0}';
  var H='<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Reporte de Servicios</title><style>'+CSS+'</style></head><body>';
  H+='<h1>🤝 Reporte de Servicios — Comunidad Emmanuel</h1>';
  H+='<p><strong>Semestre:</strong> '+CSEM+' &emsp;|&emsp; <strong>Generado:</strong> '+new Date().toLocaleDateString('es-CO')+'</p>';
  var total=0,conServ=0;
  groups.forEach(function(g){g.miembros.forEach(function(m){total++;var ppp=allPlans[g.rpId]&&allPlans[g.rpId].miembros&&allPlans[g.rpId].miembros[m.id];if(ppp&&typeof ppp==='object'&&ppp.info&&hasServ(ppp.info.servicios))conServ++;});});
  H+='<h2>Resumen General</h2><table><thead><tr><th>Total miembros</th><th>Con servicio registrado</th><th>Sin servicio registrado</th></tr></thead><tbody>';
  H+='<tr><td>'+total+'</td><td>'+conServ+' ('+Math.round(conServ/total*100)+'%)</td><td>'+(total-conServ)+' ('+Math.round((total-conServ)/total*100)+'%)</td></tr></tbody></table>';
  ['San Miguel','Nazaret'].forEach(function(sec){
    var secGroups=groups.filter(function(g){return g.sector===sec;});
    var sT=0,sCS=0;
    H+='<h2>Sector '+sec+'</h2>';
    secGroups.forEach(function(g){
      var rpUser=users.find(function(u){return u.id===g.rpId;})||{};
      H+='<div class="sec"><h3>'+g.nombre+' — RP: '+rpUser.nombre+'</h3><div class="grid">';
      g.miembros.forEach(function(m){
        sT++;var ppp=allPlans[g.rpId]&&allPlans[g.rpId].miembros&&allPlans[g.rpId].miembros[m.id];
        var serv='—';
        if(ppp&&typeof ppp==='object'&&ppp.info&&hasServ(ppp.info.servicios)){serv=fmtServ(ppp.info.servicios);sCS++;}
        H+='<div class="card"><div class="card-name">'+m.nombre+'</div><div class="card-row"><strong>Servicio:</strong> '+serv+'</div></div>';
      });
      H+='</div></div>';
    });
    H+='<p style="text-align:right;font-size:11px;color:#718096">'+sec+': '+sCS+'/'+sT+' con servicio registrado</p>';
  });
  H+='<p class="foot">Koinonía · Comunidad Emmanuel · Cali · '+CSEM+'</p></body></html>';
  dlHTML(H,'Reporte_Servicios_'+CSEM);
}

function HomeOscar(p){
  var user=p.user,go=p.go;
  var dynGroups=p.groups||GROUPS,allPlans=p.allPlans||{},dynUsers=p.users||USERS;
  var h=new Date().getHours(),gr=h<12?'Buenos días':h<18?'Buenas tardes':'Buenas noches';
  var total=0,conServ=0;
  var porSector={'San Miguel':{total:0,conServ:0},'Nazaret':{total:0,conServ:0}};
  dynGroups.forEach(function(g){var sec=g.sector;if(!porSector[sec])porSector[sec]={total:0,conServ:0};g.miembros.forEach(function(m){total++;porSector[sec].total++;var ppp=allPlans[g.rpId]&&allPlans[g.rpId].miembros&&allPlans[g.rpId].miembros[m.id];if(ppp&&typeof ppp==='object'&&ppp.info&&hasServ(ppp.info.servicios)){conServ++;porSector[sec].conServ++;}});});
  var pct=total>0?Math.round(conServ/total*100):0;
  return (
    <div style={{padding:'20px 16px 100px',fontFamily:'system-ui'}}>
      <p style={{color:MU,fontSize:18,margin:'0 0 2px'}}>{gr},</p>
      <h2 style={{color:P,fontSize:27,fontWeight:700,margin:'0 0 4px'}}>{user.nombre.split(' ')[0]} 👋</h2>
      <p style={{color:MU,fontSize:17,margin:'0 0 16px'}}>Servidor Mayor · {CSEM}</p>
      <Card style={{marginBottom:14,background:P+'08',border:'1.5px solid '+P+'33'}}>
        <p style={{margin:'0 0 10px',fontWeight:700,fontSize:18,color:P}}>Servicio Comunitario — Comunidad Emmanuel</p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,textAlign:'center',marginBottom:8}}>
          <div><div style={{fontSize:33,fontWeight:800,color:P}}>{total}</div><div style={{fontSize:15,color:MU}}>Miembros</div></div>
          <div><div style={{fontSize:33,fontWeight:800,color:G}}>{conServ}</div><div style={{fontSize:15,color:MU}}>Con servicio</div></div>
        </div>
        <Bar val={conServ} max={total||1} color={G}/>
        <p style={{fontSize:16,color:MU,margin:'6px 0 0',textAlign:'center'}}>{pct}% con servicio registrado</p>
      </Card>
      <p style={{fontSize:17,fontWeight:700,color:P,margin:'0 0 8px'}}>POR SECTOR</p>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:14}}>
        {['San Miguel','Nazaret'].map(function(sec){var s=porSector[sec]||{total:0,conServ:0};var pctS=s.total>0?Math.round(s.conServ/s.total*100):0;var col=pctS>=80?G:pctS>=50?W:R;return(<Card key={sec} style={{textAlign:'center'}}><p style={{margin:'0 0 6px',fontWeight:700,fontSize:17,color:P}}>{sec}</p><div style={{fontSize:31,fontWeight:800,color:col}}>{pctS}%</div><div style={{fontSize:15,color:MU,marginBottom:6}}>cobertura</div><Bar val={s.conServ} max={s.total||1} color={col}/><div style={{fontSize:15,color:MU,marginTop:4}}>{s.conServ}/{s.total} con servicio</div></Card>);})}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginTop:14}}>
        <Btn onClick={function(){go('servicios');}} style={{padding:13,fontSize:18}}>🤝 Ver detalle de servicios</Btn>
        <Btn variant='accent' onClick={function(){printReporteServicios(dynGroups,allPlans,dynUsers);}} style={{padding:13,fontSize:18}}>⬇️ Reporte semestral</Btn>
      </div>
    </div>
  );
}

// ─── HOME ROUTER ──────────────────────────────────────────────────────────────
function Home(p){
  var role=mrole(p.user);
  if(p.user.id==='u_oscar')return <HomeOscar user={p.user} groups={p.groups} allPlans={p.allPlans} users={p.users} go={p.go}/>;
  if(role==='admin')return <HomeAdmin user={p.user} users={p.users} groups={p.groups} meetings={p.meetings} supMtgs={p.supMtgs} allPlans={p.allPlans} allAtt={p.allAtt} go={p.go} goSup={p.goSup} sem={p.sem} pendingPeriodId={p.pendingPeriodId} activatedGPs={p.activatedGPs} onActivateGP={p.onActivateGP}/>;
  if(role==='cds')return <HomeCds user={p.user} users={p.users} groups={p.groups} meetings={p.meetings} supMtgs={p.supMtgs} allPlans={p.allPlans} allAtt={p.allAtt} go={p.go} goSup={p.goSup} sem={p.sem} pendingPeriodId={p.pendingPeriodId} activatedGPs={p.activatedGPs} onActivateGP={p.onActivateGP}/>;
  if(role==='sup')return <HomeSup user={p.user} users={p.users} groups={p.groups} meetings={p.meetings} supMtgs={p.supMtgs} allPlans={p.allPlans} go={p.go} goSup={p.goSup} sem={p.sem} pendingPeriodId={p.pendingPeriodId} activatedGPs={p.activatedGPs} onActivateGP={p.onActivateGP}/>;
  return <HomeRP user={p.user} group={p.group} meetings={p.meetings} go={p.go} sem={p.sem} pendingPeriodId={p.pendingPeriodId} activatedGPs={p.activatedGPs} onActivateGP={p.onActivateGP}/>;
}

// ─── AGENDAR ─────────────────────────────────────────────────────────────────
function Agendar(p){
  var user=p.user,group=p.group,allUsers=p.users||[];
  var mb=group?group.miembros:[];
  // Incluir miembros sin rpOverride O cuyo rpOverride apunta al usuario actual
  var mbPP=mb.filter(function(m){return !m.rpOverride||m.rpOverride===user.id;});
  var [mId,setMId]=useState(p.agFor||'');
  var [fecha,setFecha]=useState(TODAY);
  var [hora,setHora]=useState('10:00');
  var [mod,setMod]=useState('Presencial');
  var [lugar,setLugar]=useState('');
  var [notas,setNotas]=useState('');
  var [ok,setOk]=useState(false);
  var pend=p.meetings.filter(function(m){return m.rpId===user.id&&!m.realizada;}).sort(function(a,b){return (a.fecha||'').localeCompare(b.fecha||'');});
  function save(){if(!mId||!fecha)return;var m2=mb.find(function(m){return m.id===mId;});p.onAdd({id:uid(),rpId:user.id,miembroId:mId,miembroNombre:m2?m2.nombre:'',sector:user.sector,fecha:fecha,hora:hora,modalidad:mod,lugar:lugar,notas:notas,realizada:false,semestre:p.sem||CSEM});if(p.onSyncProg){var mes=MESES_FULL[parseInt(fecha.slice(5,7))-1];p.onSyncProg(mId,mes,fecha);}setOk(true);p.setFor(null);setMId('');setFecha(TODAY);setHora('10:00');setMod('Presencial');setLugar('');setNotas('');setTimeout(function(){setOk(false);},2500);}
  return (
    <div style={{padding:'20px 16px 100px',fontFamily:'system-ui'}}>
      <h2 style={{color:P,fontSize:21,fontWeight:700,margin:'0 0 4px'}}>📅 Agendar Pastoreo Personal</h2>
      <p style={{color:MU,fontSize:17,margin:'0 0 16px'}}>Programa un encuentro fraterno con un hermano/a</p>
      {ok&&<div style={{background:'#F0FFF4',border:'1.5px solid #68D391',borderRadius:10,padding:12,marginBottom:14,textAlign:'center',fontWeight:700,color:G}}>✅ ¡Reunión agendada! ¡Que el Señor la bendiga!</div>}
      <Card style={{marginBottom:16}}>
        <div style={{marginBottom:10}}><div style={{fontSize:17,color:MU,fontWeight:600,marginBottom:4}}>Hermano/a *</div><select value={mId} onChange={function(e){setMId(e.target.value);}} style={inp()}><option value=''>— Selecciona —</option>{mbPP.map(function(m){return <option key={m.id} value={m.id}>{m.nombre}</option>;})}</select></div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:10}}><div><div style={{fontSize:17,color:MU,fontWeight:600,marginBottom:4}}>Fecha *</div><input type='date' value={fecha} onChange={function(e){setFecha(e.target.value);}} style={inp()}/></div><div><div style={{fontSize:17,color:MU,fontWeight:600,marginBottom:4}}>Hora</div><input type='time' value={hora} onChange={function(e){setHora(e.target.value);}} style={inp()}/></div></div>
        <div style={{marginBottom:10}}><div style={{fontSize:17,color:MU,fontWeight:600,marginBottom:4}}>Modalidad</div><select value={mod} onChange={function(e){setMod(e.target.value);}} style={inp()}><option>Presencial</option><option>Virtual</option><option>Telefónica</option></select></div>
        <div style={{marginBottom:10}}><div style={{fontSize:17,color:MU,fontWeight:600,marginBottom:4}}>Lugar (opcional)</div><input value={lugar} onChange={function(e){setLugar(e.target.value);}} placeholder='Casa, café, parroquia...' style={inp()}/></div>
        <div style={{marginBottom:14}}><div style={{fontSize:17,color:MU,fontWeight:600,marginBottom:4}}>Notas previas</div><textarea value={notas} onChange={function(e){setNotas(e.target.value);}} style={inp({minHeight:64,resize:'vertical'})}/></div>
        <Btn onClick={save} style={{width:'100%',padding:12}}>Agendar 📅</Btn>
      </Card>
      {pend.length>0&&(<div><p style={{fontSize:17,fontWeight:700,color:P,margin:'0 0 8px'}}>PROGRAMADAS</p>{pend.map(function(m){return(<Card key={m.id} style={{marginBottom:8}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><div><p style={{margin:0,fontWeight:700,fontSize:18}}>{m.miembroNombre}</p><p style={{margin:'2px 0 0',fontSize:16,color:MU}}>{fmt(m.fecha)} · {m.hora}</p></div><div style={{display:'flex',alignItems:'center',gap:6}}><span style={{background:'#EBF4FF',color:P,fontSize:15,padding:'3px 9px',borderRadius:20,fontWeight:600,whiteSpace:'nowrap'}}>📅 Agendada</span><Btn small variant='primary' onClick={function(){p.go('registrar');}}>Registrar</Btn></div></div></Card>);})}</div>)}
    </div>
  );
}

// ─── REGISTRAR ───────────────────────────────────────────────────────────────
function Registrar(p){
  var user=p.user,meetings=p.meetings;
  var [selId,setSelId]=useState(null);
  var [nota,setNota]=useState('');
  var [fechaR,setFechaR]=useState(TODAY);
  var [ok,setOk]=useState(false);
  var pend=meetings.filter(function(m){return m.rpId===user.id&&!m.realizada;}).sort(function(a,b){return (a.fecha||'').localeCompare(b.fecha||'');});
  var recent=meetings.filter(function(m){return m.rpId===user.id&&m.realizada&&m.semestre===CSEM;}).sort(function(a,b){return (b.fechaReal||'').localeCompare(a.fechaReal||'');}).slice(0,5);
  function reg(){if(!selId)return;p.onUpd(selId,{realizada:true,fechaReal:fechaR,notaFinal:nota});setSelId(null);setNota('');setFechaR(TODAY);setOk(true);setTimeout(function(){setOk(false);},2500);}
  return (
    <div style={{padding:'20px 16px 100px',fontFamily:'system-ui'}}>
      <h2 style={{color:P,fontSize:21,fontWeight:700,margin:'0 0 4px'}}>✅ Registrar Reunión</h2>
      <p style={{color:MU,fontSize:17,margin:'0 0 16px'}}>Marca como realizada una reunión de Pastoreo Personal</p>
      {ok&&<div style={{background:'#F0FFF4',border:'1.5px solid #68D391',borderRadius:10,padding:12,marginBottom:14,textAlign:'center',fontWeight:700,color:G}}>🙏 ¡Reunión registrada con gratitud!</div>}
      {pend.length===0&&<Card style={{textAlign:'center',padding:28,color:MU}}><div style={{fontSize:39}}>✨</div><p style={{fontSize:18,margin:'8px 0 0'}}>No tienes reuniones pendientes.</p></Card>}
      {pend.map(function(m){return(<Card key={m.id} style={{marginBottom:10,border:selId===m.id?'2px solid '+P:undefined}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:selId===m.id?12:0}}><div><p style={{margin:0,fontWeight:700,fontSize:18}}>{m.miembroNombre}</p><p style={{margin:'2px 0 0',fontSize:16,color:MU}}>Agendada: {fmt(m.fecha)} · {m.hora}</p></div><div style={{display:'flex',alignItems:'center',gap:6}}>{selId===m.id?<Btn small variant='outline' onClick={function(){setSelId(null);}}> Cancelar</Btn>:<><span style={{background:'#EBF4FF',color:P,fontSize:15,padding:'3px 9px',borderRadius:20,fontWeight:600,whiteSpace:'nowrap'}}>📅 Agendada</span><Btn small variant='primary' onClick={function(){setSelId(m.id);}}>Registrar</Btn></>}</div></div>{selId===m.id&&(<div><div style={{marginBottom:10}}><div style={{fontSize:17,color:MU,fontWeight:600,marginBottom:4}}>Fecha real</div><input type='date' value={fechaR} onChange={function(e){setFechaR(e.target.value);}} style={inp()}/></div><div style={{marginBottom:10}}><div style={{fontSize:17,color:MU,fontWeight:600,marginBottom:4}}>Nota de gratitud (opcional)</div><textarea value={nota} onChange={function(e){setNota(e.target.value);}} style={inp({minHeight:72,resize:'vertical'})}/></div><Btn variant='success' onClick={reg} style={{width:'100%'}}>✅ Confirmar como Realizada</Btn></div>)}</Card>);})}
      {recent.length>0&&(<div><p style={{fontSize:17,fontWeight:700,color:P,margin:'16px 0 8px'}}>ÚLTIMAS REALIZADAS</p>{recent.map(function(m){return(<Card key={m.id} style={{marginBottom:8,opacity:0.85}}><div style={{display:'flex',justifyContent:'space-between'}}><div><p style={{margin:0,fontWeight:700,fontSize:18}}>{m.miembroNombre}</p><p style={{margin:'2px 0 0',fontSize:16,color:MU}}>{fmt(m.fechaReal)}</p></div><span style={{background:G+'22',color:G,fontSize:16,padding:'2px 8px',borderRadius:20,fontWeight:600}}>✓</span></div>{m.notaFinal&&<p style={{margin:'6px 0 0',fontSize:17,color:MU,fontStyle:'italic'}}>"{m.notaFinal}"</p>}</Card>);})}</div>)}
    </div>
  );
}

// ─── PROGRESO ────────────────────────────────────────────────────────────────
function Progreso(p){
  var user=p.user,group=p.group,meetings=p.meetings,allUsers=p.users||[];
  var SEM=p.sem||CSEM;
  var mb=group?group.miembros:[];
  var mbPP=mb.filter(function(m){return !m.rpOverride;});
  var semR=meetings.filter(function(m){return m.rpId===user.id&&m.semestre===SEM&&m.realizada;});
  var total=mbPP.length*4,pct=total>0?Math.round(semR.length/total*100):0;
  var yr=parseInt(SEM.split('-')[0]),sMo=SEM.endsWith('S1')?[0,1,2,3,4,5]:[6,7,8,9,10,11];
  return (
    <div style={{padding:'20px 16px 100px',fontFamily:'system-ui'}}>
      <h2 style={{color:P,fontSize:21,fontWeight:700,margin:'0 0 4px'}}>📊 Mi Progreso</h2>
      <p style={{color:MU,fontSize:17,margin:'0 0 16px'}}>Semestre {SEM} · Meta: 4 Pastoreos por hermano/a</p>
      <Card style={{marginBottom:16,textAlign:'center'}}><div style={{fontSize:57,fontWeight:800,color:pct>=100?G:pct>=50?W:R}}>{pct}%</div><p style={{margin:'0 0 8px',color:MU,fontSize:18}}>{semR.length} de {total} reuniones realizadas</p><Bar val={semR.length} max={total||1} color={pct>=100?G:pct>=50?A:R}/><p style={{margin:'8px 0 0',fontSize:16,color:MU}}>{total-semR.length>0?'Faltan '+(total-semR.length)+' reuniones':'🎉 ¡Meta semestral cumplida!'}</p></Card>
      <p style={{fontSize:17,fontWeight:700,color:P,margin:'0 0 8px'}}>POR HERMANO/A</p>
      {mbPP.map(function(m){var n=semR.filter(function(x){return x.miembroId===m.id;}).length;return(<Card key={m.id} style={{marginBottom:8}}><div style={{display:'flex',justifyContent:'space-between',marginBottom:5}}><span style={{fontSize:18,fontWeight:600}}>{m.nombre}</span><span style={{fontSize:17,fontWeight:700,color:n>=4?G:n>=2?W:R}}>{n}/4</span></div><Bar val={n} max={4} color={n>=4?G:n>=2?W:R}/></Card>);})}
      <p style={{fontSize:17,fontWeight:700,color:P,margin:'14px 0 8px'}}>POR MES</p>
      <Card>{sMo.map(function(mo){var k=yr+'-'+String(mo+1).padStart(2,'0');var n=semR.filter(function(m){return (m.fechaReal||'').startsWith(k);}).length;var cur=new Date().getMonth()===mo;return(<div key={mo} style={{display:'flex',alignItems:'center',gap:10,marginBottom:7}}><span style={{width:32,fontSize:17,color:cur?P:MU,fontWeight:cur?700:400}}>{MESES[mo]}</span><div style={{flex:1}}><Bar val={n} max={mb.length||1} color={n>0?G:BO}/></div><span style={{width:20,fontSize:16,color:MU,textAlign:'right'}}>{n}</span></div>);})}</Card>
    </div>
  );
}

// ─── ASISTENCIA ──────────────────────────────────────────────────────────────
function Asistencia(p){
  var mb=p.mb,att=p.att,gId=p.gId,dynGroups=p.dynGroups||[];
  var evs=(att.eventos||[]).filter(function(e){return e.gId===gId;});
  var [show,setShow]=useState(false);
  var [nt,setNt]=useState('Asamblea de Oración');
  var [nf,setNf]=useState(TODAY);
  var [nn,setNn]=useState('');
  function toggle(evId,mId){var upd=(att.eventos||[]).map(function(ev){if(ev.id!==evId)return ev;var a=ev.asistentes||[];return Object.assign({},ev,{asistentes:a.includes(mId)?a.filter(function(x){return x!==mId;}):a.concat([mId])});});p.onSave(Object.assign({},att,{eventos:upd}));}
  function add(){p.onSave(Object.assign({},att,{eventos:(att.eventos||[]).concat([{id:uid(),tipo:nt,fecha:nf,nombre:nn||nt,asistentes:[],gId:gId}])}));setShow(false);setNn('');setNf(TODAY);}
  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}><p style={{fontSize:18,color:MU,margin:0}}>Asistencia a eventos comunitarios.</p><Btn small onClick={function(){setShow(!show);}}>+ Evento</Btn></div>
      {show&&(<Card style={{marginBottom:12,background:LI}}><p style={{margin:'0 0 8px',fontWeight:700,fontSize:18,color:P}}>Nuevo Evento</p><select value={nt} onChange={function(e){setNt(e.target.value);}} style={inp({marginBottom:8})}><option>Asamblea de Oración</option><option>Reunión del Grupo Pastoral</option><option>Retiro</option><option>Curso</option><option>Otro</option></select><input type='text' value={nn} onChange={function(e){setNn(e.target.value);}} placeholder='Nombre o descripción' style={inp({marginBottom:8})}/><input type='date' value={nf} onChange={function(e){setNf(e.target.value);}} style={inp({marginBottom:10})}/><div style={{display:'flex',gap:8}}><Btn small variant='success' onClick={add}>Agregar</Btn><Btn small variant='ghost' onClick={function(){setShow(false);}}>Cancelar</Btn></div></Card>)}
      {evs.length===0&&<div style={{textAlign:'center',padding:32,color:MU}}><div style={{fontSize:43}}>📆</div><p style={{fontSize:18}}>No hay eventos registrados aún.</p></div>}
      {evs.slice().sort(function(a,b){return (b.fecha||'').localeCompare(a.fecha||'');}).map(function(ev){
        var isGP=ev.tipo==='Reunión del Grupo Pastoral';
        var mbVisible=isGP&&dynGroups.length?mb.filter(function(m){return !findActualGroup(m.nombre,gId,dynGroups);}):mb;
        var mbExternal=isGP&&dynGroups.length?mb.filter(function(m){return !!findActualGroup(m.nombre,gId,dynGroups);}):[];
        return(<Card key={ev.id} style={{marginBottom:10}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
            <div><p style={{margin:0,fontWeight:700,fontSize:18}}>{ev.nombre}</p><p style={{margin:'2px 0 0',fontSize:16,color:MU}}>{fmt(ev.fecha)}</p></div>
            <span style={{background:P+'22',color:P,fontSize:16,padding:'2px 8px',borderRadius:20,fontWeight:600}}>{(ev.asistentes||[]).length}/{mbVisible.length}</span>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:5}}>
            {mbVisible.map(function(m){var ok2=(ev.asistentes||[]).includes(m.id);return(<button key={m.id} onClick={function(){toggle(ev.id,m.id);}} style={{padding:'6px 8px',borderRadius:7,border:'1.5px solid '+(ok2?G:BO),background:ok2?G+'18':'transparent',cursor:'pointer',display:'flex',alignItems:'center',gap:4}}><span style={{fontSize:18}}>{ok2?'✅':'⬜'}</span><span style={{fontSize:16,color:ok2?G:MU,fontWeight:ok2?700:400}}>{m.nombre.split(' ')[0]}</span></button>);})}
          </div>
          {mbExternal.length>0&&(<div style={{marginTop:8,paddingTop:8,borderTop:'1px dashed '+BO}}>{mbExternal.map(function(m){var ref=findActualGroup(m.nombre,gId,dynGroups);return(<div key={m.id} style={{fontSize:15,color:MU,padding:'3px 0',display:'flex',alignItems:'center',gap:5}}><span>ℹ️</span><span><strong>{m.nombre.split(' ')[0]}</strong> asiste al GP de {ref?ref.group.nombre.replace('GP ',''):'otro RP'} — asistencia registrada allá</span></div>);})}</div>)}
        </Card>);
      })}
    </div>
  );
}

// ─── PPG FORM ────────────────────────────────────────────────────────────────
function PPGForm(p){
  var group=p.group,ppg=p.ppg||{},mb=group?(group.miembros||[]).filter(function(m){return!(m.rpOverride&&m.rpOverride===group.rpId);}).sort(function(a,b){return a.nombre.localeCompare(b.nombre,'es');}):[];
  var allUsers=p.users||[];
  if(p.addSelf&&p.user&&!mb.some(function(m){return m.id===p.user.id;}))mb=mb.concat([{id:p.user.id,nombre:p.user.nombre,compromiso:'',cumple:'',aniv:'',curso:''}]);
  var initI=mb.map(function(m){var ex=ppg.integ&&ppg.integ.find(function(i){return i.id===m.id;});return ex||{id:m.id,nombre:m.nombre,compromiso:'',cumple:'',aniv:'',curso:''};});
  var [integ,setInteg]=useState(initI);
  var [areas,setAreas]=useState(ppg.areas&&ppg.areas.length?ppg.areas:[{id:uid(),area:'',meta:''}]);
  var [prog,setProg]=useState(ppg.prog||{});
  var [mesesProg,setMesesProg]=useState(ppg.mesesProg&&ppg.mesesProg.length?ppg.mesesProg:MESES_SEM.slice());
  var [reuns,setReuns]=useState(ppg.reuniones&&ppg.reuniones.length?ppg.reuniones:[{id:uid(),fecha:'',actividad:'',tema:'',comentarios:''}]);
  var [evalBien,setEvalBien]=useState(ppg.evalBien||'');
  var [evalMejorar,setEvalMejorar]=useState(ppg.evalMejorar||'');
  var anioActual=String(new Date().getFullYear());
  var [vigencia,setVigencia]=useState(ppg.vigencia||anioActual);
  var [ok,setOk]=useState(false);
  var [showSugg,setShowSugg]=useState(false);
  var [confirmRenovar,setConfirmRenovar]=useState(false);
  function uI(i,f,v){var n=integ.slice();n[i]=Object.assign({},n[i]);n[i][f]=v;setInteg(n);}
  function uA(i,f,v){var n=areas.slice();n[i]=Object.assign({},n[i]);n[i][f]=v;setAreas(n);}
  function uP(mid,mes,v){var n=Object.assign({},prog);n[mid]=Object.assign({},n[mid]||{});n[mid][mes]=v;setProg(n);}
  function uR(i,f,v){var n=reuns.slice();n[i]=Object.assign({},n[i]);n[i][f]=v;setReuns(n);}
  function cellSt(memberId,mes,dv){if(!dv)return null;var gRpId=group?group.rpId:null;var mtg=(p.meetings||[]).find(function(m){return m.rpId===gRpId&&m.miembroId===memberId&&m.fecha&&MESES_FULL[parseInt(m.fecha.slice(5,7))-1]===mes;});if(mtg&&mtg.realizada)return'done';if(dv<TODAY)return'late';return'pending';}
  function cellStyle(st){if(st==='done')return{background:G+'22',border:'1.5px solid '+G+'66',borderRadius:6};if(st==='late')return{background:R+'15',border:'1.5px solid '+R+'55',borderRadius:6};if(st==='pending')return{background:'#EBF8FF',border:'1.5px solid #90CDF4',borderRadius:6};return{};}
  function save(){p.onSave({integ:integ,areas:areas,prog:prog,reuniones:reuns,evalBien:evalBien,evalMejorar:evalMejorar,mesesProg:mesesProg,vigencia:vigencia});setOk(true);setTimeout(function(){setOk(false);},2000);}
  function renovar(){
    var nuevoAnio=anioActual;
    setInteg(mb.map(function(m){return({id:m.id,nombre:m.nombre,compromiso:'',cumple:'',aniv:'',curso:''});}));
    setAreas([{id:uid(),area:'',meta:''}]);
    setProg({});setReuns([{id:uid(),fecha:'',actividad:'',tema:'',comentarios:''}]);
    setMesesProg(MESES_SEM.slice());setEvalBien('');setEvalMejorar('');
    setVigencia(nuevoAnio);setConfirmRenovar(false);
  }
  var sH={fontSize:18,fontWeight:700,color:P,margin:'16px 0 8px',paddingBottom:4,borderBottom:'2px solid '+P+'33'};
  var thS={background:P+'18',color:P,fontSize:15,fontWeight:700,padding:'5px 6px',textAlign:'left',borderBottom:'1px solid '+BO};
  var tdS={padding:'4px 6px',borderBottom:'1px solid '+BO+'55',verticalAlign:'middle',fontSize:16};
  return (
    <div>
      <div style={{background:P+'10',borderLeft:'4px solid '+A,borderRadius:'0 8px 8px 0',padding:'10px 14px',marginBottom:12}}>
        <p style={{margin:0,fontSize:17,color:P,fontStyle:'italic',lineHeight:1.6}}>"Infundiré mi Espíritu en ustedes. Manténganse en mi Palabra y serán verdaderamente mis discípulos."</p>
        <p style={{margin:'4px 0 0',fontSize:16,color:MU}}>Ez 36,26-27 · Jn 8,31-32</p>
        <div style={{marginTop:8,display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:6}}>
          <span style={{fontSize:15,color:P,fontWeight:700}}>Período: {semLabel(p.sem||CSEM)}</span>
          <span style={{fontSize:14,background:P,color:'#fff',borderRadius:20,padding:'2px 10px',fontWeight:700}}>📅 Vigencia del plan: {vigencia}</span>
        </div>
      </div>
      {confirmRenovar?(
        <div style={{background:'#FFF5F5',border:'2px solid '+R,borderRadius:10,padding:'14px 16px',marginBottom:12}}>
          <p style={{margin:'0 0 6px',fontWeight:700,fontSize:17,color:R}}>⚠️ ¿Renovar el PPG desde cero?</p>
          <p style={{margin:'0 0 12px',fontSize:16,color:'#2D3748'}}>Se borrarán todos los integrantes, áreas, programación y evaluación. Esta acción no se puede deshacer hasta que guardes el nuevo plan.</p>
          <div style={{display:'flex',gap:8}}>
            <button onClick={renovar} style={{background:R,border:'none',borderRadius:8,color:'#fff',fontWeight:700,fontSize:16,padding:'8px 18px',cursor:'pointer'}}>Sí, renovar</button>
            <button onClick={function(){setConfirmRenovar(false);}} style={{background:'none',border:'1.5px solid #CBD5E0',borderRadius:8,color:MU,fontWeight:600,fontSize:16,padding:'8px 18px',cursor:'pointer'}}>Cancelar</button>
          </div>
        </div>
      ):(
        <div style={{display:'flex',justifyContent:'flex-end',marginBottom:4}}>
          <button onClick={function(){setConfirmRenovar(true);}} style={{background:'none',border:'1px solid '+W,borderRadius:8,color:W,fontWeight:600,fontSize:15,padding:'5px 12px',cursor:'pointer'}}>🔄 Renovar PPG (nuevo año pastoral)</button>
        </div>
      )}
      <p style={sH}>1. Integrantes del Grupo</p>
      <div style={{overflowX:'auto'}}><table style={{width:'100%',borderCollapse:'collapse'}}><thead><tr><th style={thS}>Nombre</th><th style={thS}>Compromiso</th><th style={thS}>Cumpleaños</th><th style={thS}>Aniversario</th><th style={thS}>Curso</th></tr></thead><tbody>{integ.map(function(m,i){return(<tr key={m.id}><td style={tdS}><strong>{m.nombre}</strong></td><td style={tdS}><select value={m.compromiso} onChange={function(e){uI(i,'compromiso',e.target.value);}} style={inp({minWidth:100,padding:'3px 4px'})}><option value=''>—</option><option>Inicial</option><option>En Camino</option><option>Solemne</option></select></td><td style={tdS}><input type='date' value={m.cumple} onChange={function(e){uI(i,'cumple',e.target.value);}} style={inp({minWidth:100})}/></td><td style={tdS}><input type='date' value={m.aniv} onChange={function(e){uI(i,'aniv',e.target.value);}} style={inp({minWidth:100})}/></td><td style={tdS}><select value={m.curso} onChange={function(e){uI(i,'curso',e.target.value);}} style={inp({minWidth:160,padding:'3px 4px'})}><option value=''>— Sin asignar —</option><option>Fundamentos I</option><option>Relaciones Personales Cristianas</option><option>IVC o Cómo recibir Pastoreo</option><option>Fruto del Espíritu Santo</option><option>Comunidad y Familia</option><option>Emociones en la Vida Cristiana</option><option>F2: Matrimonios</option><option>F2: Solteros "Entrando a nuestro estado de vida"</option><option>F2: H. Casados / F2: M. Casadas</option><option>F2: H. Solteros / F2: M. Solteras</option><option>Paternidad Cristiana</option><option>F3: Nuestro Llamado</option><option>F3: Visión para la Cdad. Cristiana</option><option>Servicio Cristiano</option><option>F3: Nuestro Modo de Vida</option><option>Carácter Masculino / Carácter Femenino</option><option>F4: Viviendo en Comunidad Cristiana</option><option>Normas y Políticas Comunitarias</option><option>Doctrina Cristiana</option><option>La Constitución de Emmanuel / Nuestra Espiritualidad Carismática</option><option>Doctrina y Ecumenismo - Versión Católica</option><option>Doctrina y Ecumenismo - Versión Ecuménica</option></select></td></tr>);})}</tbody></table></div>
      <p style={sH}>2. Plan Pastoral Comunitario (PPC)</p>
      <div style={{background:P+'08',border:'1px solid '+P+'33',borderRadius:8,padding:'10px 14px',marginBottom:6}}>
        <p style={{margin:'0 0 8px',fontSize:16,color:MU,fontStyle:'italic'}}>Metas comunitarias para {semLabel(p.sem||CSEM)}:</p>
        {(p.ppcGoals||PPC_GOALS_DEFAULT).map(function(g,i){return(<div key={i} style={{display:'flex',alignItems:'flex-start',gap:8,padding:'7px 0',borderBottom:i===0?'1px solid '+BO:'none'}}><span style={{fontWeight:700,color:P,fontSize:17,flexShrink:0}}>{i+1}.</span><span style={{fontSize:17,color:'#071F33',lineHeight:1.5}}>{g}</span></div>);})}

      </div>
      <p style={sH}>3. Áreas de trabajo y metas pastorales</p>
      <button onClick={function(){setShowSugg(!showSugg);}} style={{width:'100%',background:P+'10',border:'1px dashed '+P+'44',borderRadius:8,padding:'7px 12px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:6,color:P,fontSize:17,fontWeight:600}}>
        <span>💡 Áreas sugeridas que podrías trabajar en tu GP (escoge 3 a 5) <span style={{fontSize:14,background:P+'18',color:P,borderRadius:10,padding:'1px 7px',fontWeight:700,marginLeft:4}}>{areas.filter(function(a){return AREAS_SUG.map(function(s){return s.toLowerCase();}).includes((a.area||'').toLowerCase());}).length} / {AREAS_SUG.length}</span></span>
        <span style={{fontSize:16}}>{showSugg?'▲':'▼'}</span>
      </button>
      {showSugg&&(
        <div style={{background:'#fff',border:'1px solid '+BO,borderRadius:8,padding:'10px 12px',marginBottom:10}}>
          <p style={{fontSize:15,color:MU,margin:'0 0 8px',lineHeight:1.4}}>Toca un área para agregarla a la tabla. Las ya incluidas aparecen desactivadas.</p>
          <div style={{display:'flex',flexWrap:'wrap',gap:5}}>
            {AREAS_SUG.map(function(sug){
              var usada=areas.some(function(a){return (a.area||'').toLowerCase()===sug.toLowerCase();});
              return (
                <button key={sug} disabled={usada} onClick={function(){var ei=areas.findIndex(function(a){return!(a.area||'').trim();});if(ei>=0){var n=areas.slice();n[ei]=Object.assign({},n[ei],{area:sug});setAreas(n);}else{setAreas(areas.concat([{id:uid(),area:sug,meta:''}]));}}}
                  style={{fontSize:15,padding:'4px 9px',borderRadius:20,cursor:usada?'default':'pointer',border:'1px solid '+(usada?BO:P+'44'),background:usada?BG:LI,color:usada?MU:P,fontWeight:500,textDecoration:usada?'line-through':'none',opacity:usada?0.7:1}}>
                  {sug}
                </button>
              );
            })}
          </div>
        </div>
      )}
      <div style={{overflowX:'auto'}}><table style={{width:'100%',borderCollapse:'collapse'}}><thead><tr><th style={thS}>Área</th><th style={thS}>Metas / Objetivos</th><th style={Object.assign({},thS,{width:28})}></th></tr></thead><tbody>{areas.map(function(a,i){return(<tr key={a.id}><td style={tdS}><input value={a.area} onChange={function(e){uA(i,'area',e.target.value);}} style={inp({minWidth:90})} placeholder='Área'/></td><td style={tdS}><textarea value={a.meta} onChange={function(e){uA(i,'meta',e.target.value);}} style={inp({minHeight:44,resize:'vertical',minWidth:120})} placeholder='Meta'/></td><td style={tdS}><button onClick={function(){if(areas.length>1){var n=areas.slice();n.splice(i,1);setAreas(n);}}} style={{background:'none',border:'none',color:R,cursor:'pointer',fontSize:18}}>✕</button></td></tr>);})}</tbody></table></div>
      <Btn small variant='outline' onClick={function(){setAreas(areas.concat([{id:uid(),area:'',meta:''}]));}} style={{marginTop:6}}>+ Área</Btn>
      <p style={sH}>4. Programación de Pastoreos Personales</p>
      <div style={{overflowX:'auto'}}><table style={{width:'100%',borderCollapse:'collapse',fontSize:15}}><thead><tr><th style={Object.assign({},thS,{minWidth:72})}></th>{mb.map(function(m){return <th key={m.id} style={thS}>{m.nombre.split(' ')[0]}</th>;})}</tr></thead><tbody>{mesesProg.map(function(mes,ri){return(<tr key={mes}><td style={Object.assign({},tdS,{fontWeight:700,color:P,textTransform:'capitalize',whiteSpace:'nowrap'})}>{mes.slice(0,1).toUpperCase()+mes.slice(1,3)}</td>{mb.map(function(m){
                var isExtPP=!!(m.rpOverride&&m.rpOverride!==group.rpId);
                if(isExtPP){var ppMgr=allUsers.find(function(u){return u.id===m.rpOverride;})||null;var ppName=ppMgr?ppMgr.nombre.split(' ')[0]:'otro RP';return(<td key={m.id} style={Object.assign({},tdS,{background:'#F2F2F0',textAlign:'center',minWidth:90})}><span style={{fontStyle:'italic',color:'#888',fontSize:13,display:'flex',alignItems:'center',justifyContent:'center',gap:3,lineHeight:1.3}}>🔒 PP lo programa {ppName}</span></td>);}
                var mp=prog[m.id]||{};var dv=mp[mes]||'';var st=cellSt(m.id,mes,dv);return(<td key={m.id} style={Object.assign({},tdS,cellStyle(st))}><input type='date' value={dv} onChange={function(e){uP(m.id,mes,e.target.value);}} style={inp({minWidth:100,padding:'3px 5px',fontSize:15,background:'transparent'})}/>{st==='done'&&<div style={{fontSize:12,color:G,fontWeight:700,textAlign:'center',marginTop:2}}>✓ Realizado</div>}{st==='late'&&<div style={{fontSize:12,color:R,fontWeight:600,textAlign:'center',marginTop:2}}>⚠ Vencido</div>}</td>);})}<td style={tdS}><button onClick={function(){if(mesesProg.length>1){var n=mesesProg.slice();n.splice(ri,1);setMesesProg(n);}}} style={{background:'none',border:'none',color:R,cursor:'pointer',fontSize:18}}>✕</button></td></tr>);})}</tbody></table></div>
      <Btn small variant='outline' onClick={function(){var av=MESES_FULL.filter(function(m){return!mesesProg.includes(m);});if(av.length>0)setMesesProg(mesesProg.concat([av[0]]));}} style={{marginTop:6}}>+ Mes</Btn>
      <p style={sH}>5. Reuniones del GP</p>
      <div style={{overflowX:'auto'}}><table style={{width:'100%',borderCollapse:'collapse',fontSize:16}}><thead><tr><th style={thS}>Fecha</th><th style={thS}>Actividad</th><th style={thS}>Área/Tema</th><th style={thS}>Comentarios</th><th style={Object.assign({},thS,{width:28})}></th></tr></thead><tbody>{reuns.map(function(r,i){return(<tr key={r.id}><td style={tdS}><input type='date' value={r.fecha} onChange={function(e){uR(i,'fecha',e.target.value);}} style={inp({minWidth:105})}/></td><td style={tdS}><select value={r.actividad} onChange={function(e){uR(i,'actividad',e.target.value);}} style={inp({minWidth:100})}><option value=''>— Tipo —</option><option value='Formal'>Formal</option><option value='Informal'>Informal</option></select></td><td style={tdS}><input value={r.tema} onChange={function(e){uR(i,'tema',e.target.value);}} style={inp({minWidth:100})} placeholder='Tema'/></td><td style={tdS}><input value={r.comentarios} onChange={function(e){uR(i,'comentarios',e.target.value);}} style={inp({minWidth:100})} placeholder='Comentarios'/></td><td style={tdS}><button onClick={function(){if(reuns.length>1){var n=reuns.slice();n.splice(i,1);setReuns(n);}}} style={{background:'none',border:'none',color:R,cursor:'pointer',fontSize:18}}>✕</button></td></tr>);})}</tbody></table></div>
      <Btn small variant='outline' onClick={function(){setReuns(reuns.concat([{id:uid(),fecha:'',actividad:'',tema:'',comentarios:''}]));}} style={{marginTop:6}}>+ Reunión</Btn>
      <p style={sH}>6. Evaluación del GP</p>
      <div style={{background:G+'08',border:'1px solid '+G+'33',borderRadius:8,padding:12,marginBottom:4}}>
        <div style={{marginBottom:10}}><div style={{fontSize:17,fontWeight:700,color:G,marginBottom:4}}>✅ Lo que hicimos bien</div><textarea value={evalBien} onChange={function(e){setEvalBien(e.target.value);}} style={inp({minHeight:72,resize:'vertical'})} placeholder='Logros y aspectos positivos...'/></div>
        <div><div style={{fontSize:17,fontWeight:700,color:W,marginBottom:4}}>🔧 Lo que debemos mejorar</div><textarea value={evalMejorar} onChange={function(e){setEvalMejorar(e.target.value);}} style={inp({minHeight:72,resize:'vertical'})} placeholder='Aspectos a fortalecer...'/></div>
      </div>
      <Btn variant='success' onClick={save} style={{width:'100%',padding:12,marginTop:16}}>{ok?'✅ PPG Guardado':'💾 Guardar Plan Pastoral de Grupo'}</Btn>
      <Btn variant='outline' onClick={function(){printPPG(group,{integ:integ,areas:areas,prog:prog,reuniones:reuns,evalBien:evalBien,evalMejorar:evalMejorar},p.rpNombre||'',p.ppcGoals||PPC_GOALS_DEFAULT);}} style={{width:'100%',padding:11,marginTop:8}}>⬇️ Descargar PPG</Btn>
    </div>
  );
}

// ─── PPP FORM ────────────────────────────────────────────────────────────────
function PPPForm(p){
  var mb=p.miembro,user=p.user,group=p.group,saved=p.saved||{};
  var [info,setInfo]=useState(saved.info||{compromiso:'',servicios:[],situacion:''});
  var initA={};
  SECCIONES_PPP.forEach(function(sec){initA[sec.key]=sec.items.map(function(item,i){var ex=saved.autoeval&&saved.autoeval[sec.key]&&saved.autoeval[sec.key][i];return ex||{item:item,puntaje:'',comentario:''};});});
  var [autoeval,setAutoeval]=useState(initA);
  var [areas,setAreas]=useState(saved.areas||[{a:'',m:'',ac:''},{a:'',m:'',ac:''},{a:'',m:'',ac:''},{a:'',m:'',ac:''},{a:'',m:'',ac:''}]);
  var [seg,setSeg]=useState(saved.seguimiento||[{f:'',n:''},{f:'',n:''},{f:'',n:''},{f:'',n:''},{f:'',n:''}]);
  var anioActualPPP=String(new Date().getFullYear());
  var [vigenciaPPP,setVigenciaPPP]=useState(saved.vigencia||anioActualPPP);
  var [ok,setOk]=useState(false);
  var [confirmRenovarPPP,setConfirmRenovarPPP]=useState(false);
  function uAuto(sec,i,field,val){var n=Object.assign({},autoeval);n[sec]=n[sec].slice();n[sec][i]=Object.assign({},n[sec][i]);n[sec][i][field]=val;setAutoeval(n);}
  function uArea(i,f,v){var n=areas.slice();n[i]=Object.assign({},n[i]);n[i][f]=v;setAreas(n);}
  function uSeg(i,f,v){var n=seg.slice();n[i]=Object.assign({},n[i]);n[i][f]=v;setSeg(n);}
  function save(){p.onSave({info:info,autoeval:autoeval,areas:areas,seguimiento:seg,vigencia:vigenciaPPP});setOk(true);setTimeout(function(){setOk(false);},2000);}
  function renovarPPP(){
    var initANew={};
    SECCIONES_PPP.forEach(function(sec){initANew[sec.key]=sec.items.map(function(item){return({item:item,puntaje:'',comentario:''});});});
    setAutoeval(initANew);
    setAreas([{a:'',m:'',ac:''},{a:'',m:'',ac:''},{a:'',m:'',ac:''},{a:'',m:'',ac:''},{a:'',m:'',ac:''}]);
    setSeg([{f:'',n:''},{f:'',n:''},{f:'',n:''},{f:'',n:''},{f:'',n:''}]);
    setVigenciaPPP(anioActualPPP);
    setConfirmRenovarPPP(false);
  }
  var sH={fontSize:18,fontWeight:700,color:P,margin:'16px 0 8px',paddingBottom:4,borderBottom:'2px solid '+P+'33'};
  var thS={background:P+'18',color:P,fontSize:15,fontWeight:700,padding:'5px 6px',textAlign:'left',borderBottom:'1px solid '+BO};
  var tdS={padding:'4px 6px',borderBottom:'1px solid '+BO+'55',verticalAlign:'middle',fontSize:16};
  var criticas=[],importantes=[];
  SECCIONES_PPP.forEach(function(sec){(autoeval[sec.key]||[]).forEach(function(row){if(row.puntaje==='1')criticas.push({sec:sec.title.split('.')[1]?sec.title.split('.')[1].trim():sec.title,item:row.item});if(row.puntaje==='2')importantes.push({sec:sec.title.split('.')[1]?sec.title.split('.')[1].trim():sec.title,item:row.item});});});
  return (
    <div>
      <div style={{background:P+'10',borderLeft:'4px solid '+A,borderRadius:'0 8px 8px 0',padding:'10px 14px',marginBottom:12}}>
        <p style={{margin:0,fontWeight:700,fontSize:18,color:P}}>Plan Pastoral Individual</p>
        <div style={{marginTop:6,display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:6}}>
          <span style={{fontSize:16,color:MU}}>Período: {semLabel(p.sem||CSEM)}</span>
          <span style={{fontSize:14,background:P,color:'#fff',borderRadius:20,padding:'2px 10px',fontWeight:700}}>📅 Vigencia: {vigenciaPPP}</span>
        </div>
      </div>
      {confirmRenovarPPP?(
        <div style={{background:'#FFF5F5',border:'2px solid '+R,borderRadius:10,padding:'14px 16px',marginBottom:12}}>
          <p style={{margin:'0 0 6px',fontWeight:700,fontSize:17,color:R}}>⚠️ ¿Renovar el PPP desde cero?</p>
          <p style={{margin:'0 0 12px',fontSize:16,color:'#2D3748'}}>Se borrará la autoevaluación, las áreas de pastoreo y el seguimiento. Los datos del hermano/a se conservan.</p>
          <div style={{display:'flex',gap:8}}>
            <button onClick={renovarPPP} style={{background:R,border:'none',borderRadius:8,color:'#fff',fontWeight:700,fontSize:16,padding:'8px 18px',cursor:'pointer'}}>Sí, renovar</button>
            <button onClick={function(){setConfirmRenovarPPP(false);}} style={{background:'none',border:'1.5px solid #CBD5E0',borderRadius:8,color:MU,fontWeight:600,fontSize:16,padding:'8px 18px',cursor:'pointer'}}>Cancelar</button>
          </div>
        </div>
      ):(
        <div style={{display:'flex',justifyContent:'flex-end',marginBottom:4}}>
          <button onClick={function(){setConfirmRenovarPPP(true);}} style={{background:'none',border:'1px solid '+W,borderRadius:8,color:W,fontWeight:600,fontSize:15,padding:'5px 12px',cursor:'pointer'}}>🔄 Renovar PPP (nuevo año pastoral)</button>
        </div>
      )}
      <Card style={{marginBottom:10}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6,fontSize:17}}>
          <div><span style={{color:MU,fontWeight:600}}>Nombre: </span><strong>{mb.nombre}</strong></div>
          <div><span style={{color:MU,fontWeight:600}}>Sector: </span>{group?group.sector:''}</div>
          <div><span style={{color:MU,fontWeight:600}}>RP: </span>{user.nombre}</div>
          <div><span style={{color:MU,fontWeight:600}}>Compromiso: </span><select value={info.compromiso} onChange={function(e){setInfo(Object.assign({},info,{compromiso:e.target.value}));}} style={inp({display:'inline',width:'auto',padding:'2px 6px',fontSize:16})}><option value=''>—</option><option>Inicial</option><option>Camino</option><option>Solemne</option></select></div>
          <div style={{gridColumn:'1/3'}}><span style={{color:MU,fontWeight:600,fontSize:17}}>Servicios: </span><select value='' onChange={function(e){var v=e.target.value;if(v&&!(info.servicios||[]).includes(v))setInfo(Object.assign({},info,{servicios:(info.servicios||[]).concat([v])}));}} style={inp({display:'inline-block',width:'auto',minWidth:220,padding:'3px 8px',fontSize:16,marginLeft:6})}><option value=''>— Agregar servicio —</option>{SERVICIOS_LIST.filter(function(s){return !(info.servicios||[]).includes(s);}).map(function(s){return <option key={s} value={s}>{s}</option>;})}</select>{(info.servicios||[]).length>0&&<div style={{display:'flex',flexWrap:'wrap',gap:5,marginTop:7}}>{(info.servicios||[]).map(function(s){return(<span key={s} style={{display:'inline-flex',alignItems:'center',gap:4,background:A+'18',border:'1px solid '+A+'44',borderRadius:20,padding:'2px 10px',fontSize:14,color:A,fontWeight:600}}>{s}<button onClick={function(){setInfo(Object.assign({},info,{servicios:(info.servicios||[]).filter(function(x){return x!==s;})}));}} style={{background:'none',border:'none',cursor:'pointer',color:A,fontSize:15,padding:'0 0 0 2px',lineHeight:1}}>×</button></span>);})}</div>}</div>
          <div style={{gridColumn:'1/3'}}><span style={{color:MU,fontWeight:600}}>Situación laboral: </span><select value={info.situacion} onChange={function(e){setInfo(Object.assign({},info,{situacion:e.target.value}));}} style={inp({display:'inline',width:'auto',padding:'2px 6px',fontSize:16})}><option value=''>—</option><option>Empleado</option><option>Independiente</option><option>Pensionado</option><option>Otros ingresos</option><option>No percibe ingresos</option></select></div>
        </div>
      </Card>
      <p style={sH}>I. Autoevaluación</p>
      <div style={{background:LI,borderRadius:7,padding:'7px 10px',marginBottom:10,fontSize:16,color:MU}}>Escala: <strong style={{color:R}}>1 Insuf.</strong> · <strong style={{color:W}}>2 Regular</strong> · <strong style={{color:'#1A6FA8'}}>3 Bueno</strong> · <strong style={{color:G}}>4 Excelente</strong></div>
      {SECCIONES_PPP.map(function(sec){return(<div key={sec.key} style={{marginBottom:14}}><p style={{fontSize:17,fontWeight:700,color:P,margin:'0 0 4px'}}>{sec.title}</p>{sec.sub&&<p style={{fontSize:15,color:MU,margin:'0 0 6px',fontStyle:'italic'}}>{sec.sub}</p>}<div style={{borderRadius:8,overflow:'hidden',border:'1px solid '+BO}}><div style={{display:'grid',gridTemplateColumns:'1fr 152px 1fr',background:P+'18',borderBottom:'1px solid '+BO}}><div style={{padding:'5px 8px',fontSize:15,fontWeight:700,color:P}}>Área</div><div style={{padding:'5px 8px',fontSize:15,fontWeight:700,color:P,textAlign:'center'}}>Puntaje</div><div style={{padding:'5px 8px',fontSize:15,fontWeight:700,color:P}}>Comentario</div></div>{autoeval[sec.key].map(function(row,i){return(<div key={i} style={{display:'grid',gridTemplateColumns:'1fr 152px 1fr',borderBottom:'1px solid '+BO+'55',background:i%2===0?'#fff':P+'04',alignItems:'center'}}><div style={{padding:'7px 8px',fontSize:16,color:'#071F33',lineHeight:1.5}}>{row.item}</div><div style={{padding:'5px 6px',display:'flex',alignItems:'center',justifyContent:'center',gap:4,flexWrap:'nowrap'}}>{['1','2','3','4'].map(function(pp){var sel2=row.puntaje===pp;return <button key={pp} onClick={function(){uAuto(sec.key,i,'puntaje',sel2?'':pp);}} style={{border:'none',borderRadius:4,padding:'4px 9px',cursor:'pointer',fontWeight:sel2?700:400,fontSize:16,background:sel2?PCOL[pp]:BO,color:sel2?'#fff':'#555',lineHeight:1,flexShrink:0}}>{pp}</button>;})}</div><div style={{padding:'5px 6px'}}><input value={row.comentario} onChange={function(e){uAuto(sec.key,i,'comentario',e.target.value);}} style={inp({padding:'4px 7px',fontSize:16,width:'100%',boxSizing:'border-box'})} placeholder='Comentario'/></div></div>);})}</div></div>);})}
      {(function(){var tot=0,cnt=0;SECCIONES_PPP.forEach(function(sec){(autoeval[sec.key]||[]).forEach(function(r){if(r.puntaje){tot+=parseInt(r.puntaje);cnt++;}});});if(!cnt)return null;var avg=(tot/cnt).toFixed(2);var col=parseFloat(avg)>=3.5?G:parseFloat(avg)>=2.5?'#1A6FA8':parseFloat(avg)>=1.5?W:R;return(<div style={{background:col+'15',border:'1.5px solid '+col+'44',borderRadius:10,padding:'10px 16px',margin:'12px 0',display:'flex',alignItems:'center',justifyContent:'space-between'}}><span style={{fontSize:17,fontWeight:700,color:'#071F33'}}>📊 Promedio general de autoevaluación</span><span style={{background:col,color:'#fff',fontWeight:700,fontSize:18,padding:'4px 16px',borderRadius:20}}>{avg} / 4</span></div>);})()}
      {(criticas.length>0||importantes.length>0)&&(<div style={{marginBottom:4}}><div style={{display:'flex',alignItems:'center',gap:8,margin:'16px 0 8px'}}><span style={{fontSize:21}}>🎯</span><span style={{fontSize:18,fontWeight:700,color:'#071F33'}}>Áreas Prioritarias de Acompañamiento</span></div>{criticas.length>0&&<div style={{background:R+'10',border:'1.5px solid '+R+'55',borderRadius:10,padding:12,marginBottom:8}}><p style={{margin:'0 0 8px',fontWeight:700,fontSize:17,color:R}}>🔴 Atención urgente — Puntaje 1</p>{criticas.map(function(x,i){return <div key={i} style={{fontSize:16,color:'#071F33',marginBottom:4}}>● <strong>{x.sec}:</strong> {x.item}</div>;})}</div>}{importantes.length>0&&<div style={{background:W+'10',border:'1.5px solid '+W+'55',borderRadius:10,padding:12,marginBottom:8}}><p style={{margin:'0 0 8px',fontWeight:700,fontSize:17,color:W}}>🟡 Necesita refuerzo — Puntaje 2</p>{importantes.map(function(x,i){return <div key={i} style={{fontSize:16,color:'#071F33',marginBottom:4}}>● <strong>{x.sec}:</strong> {x.item}</div>;})}</div>}</div>)}
      <p style={sH}>II. Áreas de Pastoreo</p>
      <div style={{overflowX:'auto'}}><table style={{width:'100%',borderCollapse:'collapse',fontSize:16}}><thead><tr><th style={thS}>#</th><th style={thS}>Área</th><th style={thS}>Metas</th><th style={thS}>Acciones</th></tr></thead><tbody>{areas.map(function(row,i){return(<tr key={i}><td style={Object.assign({},tdS,{fontWeight:700,color:P,width:24})}>{i+1}</td><td style={tdS}><textarea value={row.a} onChange={function(e){uArea(i,'a',e.target.value);}} style={inp({minHeight:44,resize:'vertical',minWidth:80})} placeholder='Área'/></td><td style={tdS}><textarea value={row.m} onChange={function(e){uArea(i,'m',e.target.value);}} style={inp({minHeight:44,resize:'vertical',minWidth:80})} placeholder='Metas'/></td><td style={tdS}><textarea value={row.ac} onChange={function(e){uArea(i,'ac',e.target.value);}} style={inp({minHeight:44,resize:'vertical',minWidth:90})} placeholder='Acciones'/></td></tr>);})}</tbody></table></div>
      <p style={sH}>III. Seguimiento</p>
      <div style={{overflowX:'auto'}}><table style={{width:'100%',borderCollapse:'collapse',fontSize:16}}><thead><tr><th style={thS}>#</th><th style={Object.assign({},thS,{width:120})}>Fecha</th><th style={thS}>Anotaciones</th><th style={Object.assign({},thS,{width:28})}></th></tr></thead><tbody>{seg.map(function(row,i){return(<tr key={i}><td style={Object.assign({},tdS,{fontWeight:700,color:MU,width:24})}>{i+1}</td><td style={tdS}><input type='date' value={row.f} onChange={function(e){uSeg(i,'f',e.target.value);}} style={inp({minWidth:105})}/></td><td style={tdS}><textarea value={row.n} onChange={function(e){uSeg(i,'n',e.target.value);}} style={inp({minHeight:52,resize:'vertical'})} placeholder='Anotaciones...'/></td><td style={tdS}>{seg.length>1&&<button onClick={function(){var n=seg.slice();n.splice(i,1);setSeg(n);}} style={{background:'none',border:'none',color:R,cursor:'pointer',fontSize:18}}>✕</button>}</td></tr>);})}</tbody></table></div>
      <Btn small variant='outline' onClick={function(){setSeg(seg.concat([{f:'',n:''}]));}} style={{marginTop:8}}>+ Agregar seguimiento</Btn>
      <Btn variant='success' onClick={save} style={{width:'100%',padding:12,marginTop:16}}>{ok?'✅ PPP Guardado':'💾 Guardar Plan Pastoral Personal'}</Btn>
      <Btn variant='outline' onClick={function(){printPPP(mb,user,group,{info:info,autoeval:autoeval,areas:areas,seguimiento:seg});}} style={{width:'100%',padding:11,marginTop:8}}>⬇️ Descargar PPP</Btn>
    </div>
  );
}

// ─── MI GRUPO ────────────────────────────────────────────────────────────────
function MiGrupo(p){
  var user=p.user,group=p.group,meetings=p.meetings,plans=p.plans,att=p.att,allUsers=p.users||[],dynGroups=p.groups||GROUPS,allAtt2=p.allAtt||{};
  var [tab,setTab]=useState('hermanos');
  var [selMb,setSelMb]=useState('');
  if(!group)return <div style={{padding:32,textAlign:'center',color:MU,fontFamily:'system-ui'}}>No tienes un grupo asignado aún.</div>;
  var mb=group.miembros||[];
  var thisMo=TODAY.slice(0,7);
  var semR=meetings.filter(function(m){return m.rpId===user.id&&m.semestre===CSEM&&m.realizada;});
  var evs=(att.eventos||[]).filter(function(e){return e.gId===group.id;});
  function cnt(mId){return semR.filter(function(m){return m.miembroId===mId;}).length;}
  function lastM(mId){return meetings.filter(function(m){return m.miembroId===mId&&m.realizada;}).sort(function(a,b){return (b.fechaReal||'').localeCompare(a.fechaReal||'');})[0]||null;}
  function stMb(mId){var n=cnt(mId),l=lastM(mId);if(n>=4)return{lb:'Meta ✓',cl:G};if(l&&(l.fechaReal||'').slice(0,7)===thisMo)return{lb:'Al día',cl:'#1A6FA8'};if(n>0)return{lb:'En proceso',cl:W};return{lb:'Sin reunión',cl:R};}
  function attPct(mId,tipo){var f=tipo?evs.filter(function(e){return e.tipo===tipo;}):evs;if(!f.length)return 0;return Math.round(f.filter(function(e){return (e.asistentes||[]).includes(mId);}).length/f.length*100);}
  var isVirtual=!!(group&&group.isVirtual);
  var hermLabel=user.genero==='F'?'👥 Hermanas':'👥 Hermanos';
  var realMbCount=mb.filter(function(m){return !m.rpOverride||m.rpOverride!==group.rpId;}).length;
  var hasPPG=!isVirtual&&realMbCount>0;
  var TABS=[{id:'hermanos',lb:hermLabel}].concat(hasPPG?[{id:'ppg',lb:'📋 PPG'}]:[]).concat([{id:'ppp',lb:'📝 PPP'},{id:'asist',lb:'✅ Asistencia'}]);
  var supUser=user.supId?allUsers.find(function(u){return u.id===user.supId;}):null;
  return (
    <div style={{fontFamily:'system-ui'}}>
      <div style={{background:P,color:'#fff',padding:'20px 16px 12px'}}><h2 style={{margin:0,fontSize:21,fontWeight:700}}>{group.nombre}</h2><p style={{margin:'4px 0 0',fontSize:17,opacity:0.8}}>Sector {group.sector} · {(isVirtual||mb.every(function(m){return m.rpOverride&&m.rpOverride===user.id;}))?mb.length:mb.filter(function(m){return !(m.rpOverride&&m.rpOverride===user.id&&findActualGroup(m.nombre,group.id,dynGroups));}).length} {user.genero==='F'?'hermanas':'hermanos'}</p>{supUser&&<p style={{margin:'3px 0 0',fontSize:15,opacity:0.75}}>{supUser.genero==='F'?'Supervisora':'Supervisor'}: {supUser.nombre}</p>}</div>
      <div style={{background:CA,borderBottom:'1px solid '+BO,display:'flex',overflowX:'auto'}}>{TABS.map(function(t){return <button key={t.id} onClick={function(){setTab(t.id);}} style={{flex:'0 0 auto',padding:'10px 14px',border:'none',background:'transparent',cursor:'pointer',fontSize:17,fontWeight:tab===t.id?700:400,color:tab===t.id?P:MU,borderBottom:tab===t.id?'2.5px solid '+P:'2.5px solid transparent',whiteSpace:'nowrap'}}>{t.lb}</button>;})}</div>
      <div style={{padding:'16px 16px 100px'}}>
        {tab==='hermanos'&&mb.slice().sort(function(a,b){var ua=(a.userId?1:0),ub=(b.userId?1:0);if(ua!==ub)return ua-ub;return a.nombre.localeCompare(b.nombre,'es');}).map(function(m){
          var n=cnt(m.id),l=lastM(m.id),s=stMb(m.id);
          var ovU=m.rpOverride?allUsers.find(function(u){return u.id===m.rpOverride;}):null;
          if(m.rpOverride&&m.rpOverride===user.id&&!m.userId)return null;
          if(m.userId&&m.rpOverride===user.id){
            // Líder-miembro: pastoreado por este RP pero es líder en otra cadena
            return(<Card key={m.id} style={{marginBottom:10,borderLeft:'3px solid '+A}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:6}}>
                <div><p style={{margin:0,fontWeight:700,fontSize:18,color:'#071F33'}}>{m.nombre}</p><p style={{margin:'2px 0 0',fontSize:16,color:MU}}>Líder · PP a tu cargo</p></div>
                <span style={{background:A+'22',color:A,fontSize:16,padding:'2px 10px',borderRadius:20,fontWeight:700}}>👑 Líder</span>
              </div>
              <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                <Btn small onClick={function(){p.onAgendar(m);}}>📅 Agendar PP</Btn>
                <Btn small variant='outline' onClick={function(){setTab('ppp');setSelMb(m.id);}}>📝 PPP</Btn>
              </div>
            </Card>);
          }
          if(m.rpOverride&&m.rpOverride!==user.id){return(<Card key={m.id} style={{marginBottom:10,borderLeft:'3px solid '+MU}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8}}><div><p style={{margin:0,fontWeight:700,fontSize:18,color:'#071F33'}}>{m.nombre}</p><p style={{margin:'2px 0 0',fontSize:16,color:MU}}>Asiste a este GP · PP a cargo de otro/a RP</p></div><span style={{background:MU+'22',color:MU,fontSize:16,padding:'2px 8px',borderRadius:20,fontWeight:600}}>PP: {ovU?ovU.nombre.split(' ')[0]:'otro RP'}</span></div>{evs.length>0&&(<div style={{display:'flex',justifyContent:'space-around',padding:'6px 0',borderTop:'1px solid '+BO,borderBottom:'1px solid '+BO,marginBottom:8}}><Donut pct={attPct(m.id,'Asamblea de Oración')} label="Asambleas"/><Donut pct={attPct(m.id,'Reunión del Grupo Pastoral')} label="Grupo"/><Donut pct={attPct(m.id,'Retiro')} label="Retiro"/><Donut pct={attPct(m.id,'Curso')} label="Curso"/></div>)}<p style={{fontSize:15,color:MU,margin:0,fontStyle:'italic'}}>Los Pastoreos Personales los gestiona {ovU?ovU.nombre:'el/la RP asignado/a'}.</p></Card>);}
          return(<Card key={m.id} style={{marginBottom:10}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8}}><div><p style={{margin:0,fontWeight:700,fontSize:18,color:'#071F33'}}>{m.nombre}</p><p style={{margin:'2px 0 0',fontSize:16,color:MU}}>Última reunión: {l?fmt(l.fechaReal):'Sin registros'}</p></div><span style={{background:s.cl+'22',color:s.cl,fontSize:16,padding:'2px 8px',borderRadius:20,fontWeight:600}}>{s.lb}</span></div><div style={{marginBottom:8}}><div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}><span style={{fontSize:16,color:MU}}>Pastoreos este semestre</span><span style={{fontSize:16,fontWeight:700}}>{n}/4</span></div><Bar val={n} max={4} color={n>=4?G:n>=2?W:R}/></div>{evs.length>0&&(<div style={{display:'flex',justifyContent:'space-around',padding:'6px 0',borderTop:'1px solid '+BO,borderBottom:'1px solid '+BO,marginBottom:8}}><Donut pct={attPct(m.id,'Asamblea de Oración')} label="Asambleas"/><Donut pct={attPct(m.id,'Reunión del Grupo Pastoral')} label="Grupo"/><Donut pct={attPct(m.id,'Retiro')} label="Retiro"/><Donut pct={attPct(m.id,'Curso')} label="Curso"/></div>)}<div style={{display:'flex',gap:8}}><Btn small onClick={function(){p.setFor(m.id);p.go('agendar');}}>📅 Agendar</Btn><Btn small variant='outline' onClick={function(){setTab('ppp');setSelMb(m.id);}}>📝 PPP</Btn></div></Card>);})}
        {tab==='hermanos'&&(function(){var cargoMb=mb.filter(function(m){return m.rpOverride&&m.rpOverride===user.id&&!m.userId;});if(!cargoMb.length)return null;var genHerm=user.genero==='F'?'Hermanas':'Hermanos';return(<div style={{marginTop:16}}><p style={{fontSize:17,fontWeight:700,color:A,margin:'0 0 8px',paddingBottom:4,borderBottom:'1px solid '+A+'33'}}>👥 {genHerm} que tengo a mi cargo y no están en mi GP</p>{cargoMb.map(function(m){var n=cnt(m.id),l=lastM(m.id),s=stMb(m.id);return(<Card key={m.id} style={{marginBottom:10,borderLeft:'3px solid '+A}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8}}><div><p style={{margin:0,fontWeight:700,fontSize:18,color:'#071F33'}}>{m.nombre}</p><p style={{margin:'2px 0 0',fontSize:16,color:MU}}>PP a tu cargo · Asiste a GP de {(function(){var n=getAttendingRPNombre(m.nombre,group.id,dynGroups,allUsers);return n||'otro RP';})()}</p></div><span style={{background:s.cl+'22',color:s.cl,fontSize:16,padding:'2px 8px',borderRadius:20,fontWeight:600}}>{s.lb}</span></div><div style={{marginBottom:8}}><div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}><span style={{fontSize:16,color:MU}}>Pastoreos este semestre</span><span style={{fontSize:16,fontWeight:700}}>{n}/4</span></div><Bar val={n} max={4} color={n>=4?G:n>=2?W:R}/></div>{evs.length>0&&(<div style={{display:'flex',justifyContent:'space-around',padding:'6px 0',borderTop:'1px solid '+BO,borderBottom:'1px solid '+BO,marginBottom:8}}><Donut pct={attPct(m.id,'Asamblea de Oración')} label="Asambleas"/><Donut pct={getExternalGPPct(m.nombre,group.id,dynGroups,allAtt2)} label="Grupo"/><Donut pct={attPct(m.id,'Retiro')} label="Retiro"/><Donut pct={attPct(m.id,'Curso')} label="Curso"/></div>)}<div style={{display:'flex',gap:8}}><Btn small onClick={function(){p.setFor(m.id);p.go('agendar');}}>📅 Agendar</Btn><Btn small variant='outline' onClick={function(){setTab('ppp');setSelMb(m.id);}}>📝 PPP</Btn></div></Card>);})}</div>);})()}
        {tab==='ppg'&&<PPGForm group={group} ppg={plans.ppg||{}} rpNombre={user.nombre} user={user} meetings={meetings} users={allUsers} addSelf={dynGroups.some(function(g){return g.id!==group.id&&g.miembros.some(function(m){return m.userId===user.id;});})} onSave={function(d){p.savePlan('ppg',null,d);}} sem={p.sem} ppcGoals={p.ppcGoals}/>}
        {tab==='ppp'&&(<div><p style={{fontSize:18,color:MU,marginBottom:10}}>Plan Pastoral Personal por hermano/a.</p><select value={selMb} onChange={function(e){setSelMb(e.target.value);}} style={inp({marginBottom:12})}><option value=''>— Selecciona un hermano/a —</option>{mb.filter(function(m){return !m.rpOverride||m.rpOverride===user.id;}).map(function(m){return <option key={m.id} value={m.id}>{m.nombre}</option>;})}</select>{selMb&&(<PPPForm key={selMb} miembro={mb.find(function(m){return m.id===selMb;})} user={user} group={group} saved={plans.miembros&&plans.miembros[selMb]&&typeof plans.miembros[selMb]==='object'?plans.miembros[selMb]:{}} onSave={function(d){p.savePlan('miembro',selMb,d);}} sem={p.sem}/>)}</div>)}
        {tab==='asist'&&<Asistencia mb={mb} att={att} onSave={p.saveAtt} gId={group.id} dynGroups={dynGroups}/>}
      </div>
    </div>
  );
}

// ─── CADENA ──────────────────────────────────────────────────────────────────
function Cadena(p){
  var user=p.user,supMtgs=p.supMeetings||[],role=mrole(user);
  var dynUsers=p.users||USERS;
  var canSched=(role==='sup'||role==='cds'||role==='admin');
  var [showForm,setShowForm]=useState(false);
  var [selId,setSelId]=useState(null);
  var [rNotas,setRNotas]=useState('');
  var [rPautas,setRPautas]=useState('');
  var defaultTipo=(user.id==='u_rene'||user.id==='u_alejo')?'sup_cds':'sup_rp';
  var [fTipo,setFTipo]=useState(defaultTipo);
  var [fFecha,setFFecha]=useState(TODAY);
  var [fHora,setFHora]=useState('10:00');
  var [fMod,setFMod]=useState('Presencial');
  var [fLugar,setFLugar]=useState('');
  var [fNotas,setFNotas]=useState('');
  var [fPart,setFPart]=useState('');
  var [savedOk,setSavedOk]=useState(false);
  var availTipos=(function(){
    if(hasR(user,'supervisor_cds')){var sc2=TIPOS_SUP.filter(function(t){return t.id==='sup_cds';});var rest=TIPOS_SUP.filter(function(t){return t.id!=='sup_cds';});return sc2.concat(rest);}
    return TIPOS_SUP.filter(function(t){if(t.id==='sup_cds')return false;if(role==='sup')return t.id!=='retro1';if(role==='cds'){if(hasR(user,'responsable_sector'))return t.id==='sup_rp';return t.id==='retro1';}if(role==='admin')return true;return false;});
  })();
  function getOpts(tipo){
    if(tipo==='sup_cds'){if(user.id==='u_rene')return dynUsers.filter(function(u){return u.id==='u_german';});if(user.id==='u_alejo')return dynUsers.filter(function(u){return u.id==='u_carlos';});return[];}
    if(tipo==='retro1')return dynUsers.filter(function(u){return u.roles&&u.roles.includes('supervisor')&&u.sector===user.sector&&u.activo!==false;});
    var directSupervisees=dynUsers.filter(function(u){return u.supId===user.id&&u.activo!==false&&!hasR(u,'servidor_mayor');});
    if(hasR(user,'responsable_sector')){
      var cdsList=dynUsers.filter(function(u){return hasR(u,'coordinador_sector')&&u.sector===user.sector&&u.activo!==false;});
      var nonCds=directSupervisees.filter(function(u){return!hasR(u,'coordinador_sector');});
      return cdsList.concat(nonCds);
    }
    return directSupervisees;
  }
  function partFieldLabel(tipo){if(tipo==='sup_cds')return'Coordinador de Sector *';if(tipo==='retro1')return'Supervisor/a *';return'Responsable Pastoral *';}
  function getTipo(id){return TIPOS_SUP.find(function(t){return t.id===id;})||TIPOS_SUP[0];}
  function partLabel(m){
    var supU=dynUsers.find(function(u){return u.id===m.supId;});
    var rpU=dynUsers.find(function(u){return u.id===m.rpId;});
    if(role==='rp')return supU?supU.nombre:'—';
    if(role==='sup')return rpU?rpU.nombre:m.partNombre||'—';
    var pts=[];if(supU)pts.push(supU.nombre);if(rpU)pts.push(rpU.nombre);
    return pts.join(' · ')||m.partNombre||'—';
  }
  var myMtgs=supMtgs.filter(function(m){if(role==='admin')return true;if(role==='cds')return m.sector===user.sector;if(role==='sup')return m.supId===user.id;return m.rpId===user.id;}).sort(function(a,b){return (a.fecha||'').localeCompare(b.fecha||'');});
  var upcoming=myMtgs.filter(function(m){return !m.realizada;});
  var past=myMtgs.filter(function(m){return m.realizada;}).reverse();
  function save(){
    if(!fPart||!fFecha)return;
    var pu=dynUsers.find(function(u){return u.id===fPart;});
    var tipoFinal=(hasR(user,'supervisor_cds')&&pu&&pu.roles&&pu.roles.includes('coordinador_sector'))?'sup_cds':fTipo;
    var isRS=hasR(user,'responsable_sector');
    var actsSup=(role==='sup'||isRS);
    p.onAdd({id:uid(),tipo:tipoFinal,fecha:fFecha,hora:fHora,modalidad:fMod,lugar:fLugar,notas:fNotas,semestre:CSEM,sector:user.sector||(pu?pu.sector:''),supId:tipoFinal==='sup_cds'?user.id:(actsSup?user.id:(tipoFinal==='retro1'?fPart:'')),rpId:tipoFinal==='sup_cds'?fPart:(actsSup?fPart:''),cdsId:role==='cds'?user.id:(tipoFinal==='sup_cds'?fPart:''),partNombre:pu?pu.nombre:'',realizada:false});
    setShowForm(false);setFPart('');setFNotas('');setFLugar('');
    setSavedOk(true);setTimeout(function(){setSavedOk(false);},2500);
  }
  function confirmar(m){p.onUpdate(m.id,{realizada:true,fechaReal:TODAY,notasReunion:rNotas,pautas:rPautas});setSelId(null);setRNotas('');setRPautas('');}
  return (
    <div style={{padding:'20px 16px 100px',fontFamily:'system-ui'}}>
      <h2 style={{color:P,fontSize:21,fontWeight:700,margin:'0 0 2px'}}>🔄 Cadena Pastoral</h2>
      <p style={{color:MU,fontSize:17,margin:'0 0 12px'}}>{user.nombre} · {CSEM}</p>
      {savedOk&&<div style={{background:'#F0FFF4',border:'1.5px solid #68D391',borderRadius:10,padding:12,marginBottom:12,textAlign:'center',fontWeight:700,color:G}}>✅ ¡Reunión agendada!</div>}
      {canSched&&(<Btn onClick={function(){setShowForm(!showForm);}} style={{marginBottom:14,width:'100%',padding:11}} variant={showForm?'outline':'primary'}>{showForm?'Cancelar':'+ Agendar Reunión de Supervisión'}</Btn>)}
      {showForm&&canSched&&(
        <Card style={{marginBottom:16}}>
          <p style={{margin:'0 0 12px',fontWeight:700,fontSize:18,color:P}}>Nueva Reunión de Supervisión</p>
          <div style={{marginBottom:12}}><div style={{fontSize:17,color:MU,fontWeight:600,marginBottom:6}}>Tipo de reunión *</div><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>{availTipos.map(function(t){var selT=fTipo===t.id;return(<button key={t.id} onClick={function(){setFTipo(t.id);setFPart('');}} style={{padding:'8px 10px',borderRadius:8,border:'1.5px solid '+(selT?t.color:BO),background:selT?t.color+'18':'transparent',cursor:'pointer',textAlign:'left'}}><div style={{fontSize:21}}>{t.icon}</div><div style={{fontSize:16,fontWeight:700,color:selT?t.color:'#071F33',marginTop:2}}>{t.label}</div><div style={{fontSize:15,color:MU,marginTop:1,lineHeight:1.3}}>{t.desc}</div></button>);})}</div></div>
          <div style={{marginBottom:10}}><div style={{fontSize:17,color:MU,fontWeight:600,marginBottom:4}}>{partFieldLabel(fTipo)}</div><select value={fPart} onChange={function(e){setFPart(e.target.value);}} style={inp()}><option value=''>— Selecciona —</option>{getOpts(fTipo).map(function(u){return <option key={u.id} value={u.id}>{u.nombre}</option>;})}</select></div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:10}}><div><div style={{fontSize:17,color:MU,fontWeight:600,marginBottom:4}}>Fecha *</div><input type='date' value={fFecha} onChange={function(e){setFFecha(e.target.value);}} style={inp()}/></div><div><div style={{fontSize:17,color:MU,fontWeight:600,marginBottom:4}}>Hora</div><input type='time' value={fHora} onChange={function(e){setFHora(e.target.value);}} style={inp()}/></div></div>
          <div style={{marginBottom:10}}><div style={{fontSize:17,color:MU,fontWeight:600,marginBottom:4}}>Modalidad</div><select value={fMod} onChange={function(e){setFMod(e.target.value);}} style={inp()}><option>Presencial</option><option>Virtual</option><option>Telefónica</option></select></div>
          <div style={{marginBottom:14}}><div style={{fontSize:17,color:MU,fontWeight:600,marginBottom:4}}>Notas previas</div><textarea value={fNotas} onChange={function(e){setFNotas(e.target.value);}} style={inp({minHeight:60,resize:'vertical'})} placeholder='Aspectos a revisar...'/></div>
          <Btn onClick={save} style={{width:'100%',padding:12}}>Agendar 📅</Btn>
        </Card>
      )}
      {myMtgs.length===0&&(<Card style={{textAlign:'center',padding:28,color:MU}}><div style={{fontSize:39}}>🔄</div><p style={{fontSize:18,margin:'8px 0 4px'}}>No hay reuniones de supervisión registradas aún.</p></Card>)}
      {upcoming.length>0&&(<div><p style={{fontSize:17,fontWeight:700,color:P,margin:'0 0 8px'}}>PRÓXIMAS ({upcoming.length})</p>{upcoming.map(function(m){var t=getTipo(m.tipo),marked=selId===m.id;return(<Card key={m.id} style={{marginBottom:10,border:marked?'2px solid '+P:undefined}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:marked?10:0}}><div><div style={{display:'flex',alignItems:'center',gap:6,marginBottom:3}}><span style={{fontSize:21}}>{t.icon}</span><span style={{background:t.color+'22',color:t.color,fontSize:16,padding:'2px 8px',borderRadius:20,fontWeight:700}}>{t.label}</span></div><p style={{margin:0,fontSize:18,fontWeight:600,color:'#071F33'}}>{partLabel(m)}</p><p style={{margin:'2px 0 0',fontSize:16,color:MU}}>{fmt(m.fecha)} · {m.hora}</p></div><div style={{display:'flex',alignItems:'center',gap:6}}>{marked?<Btn small variant='outline' onClick={function(){setSelId(null);setRNotas('');setRPautas('');}}>Cancelar</Btn>:<><span style={{background:'#EBF4FF',color:P,fontSize:15,padding:'3px 9px',borderRadius:20,fontWeight:600,whiteSpace:'nowrap'}}>📅 Agendada</span><Btn small variant='primary' onClick={function(){setSelId(m.id);setRNotas('');setRPautas('');}}>Registrar</Btn></>}</div></div>{marked&&(<div><div style={{marginBottom:8}}><div style={{fontSize:17,color:MU,fontWeight:600,marginBottom:4}}>Nota / resumen</div><textarea value={rNotas} onChange={function(e){setRNotas(e.target.value);}} style={inp({minHeight:60,resize:'vertical'})} placeholder='¿Cómo fue la reunión?'/></div>{(m.tipo==='retro1'||m.tipo==='retro2')&&(<div style={{marginBottom:10}}><div style={{fontSize:17,color:MU,fontWeight:600,marginBottom:4}}>Pautas pastorales</div><textarea value={rPautas} onChange={function(e){setRPautas(e.target.value);}} style={inp({minHeight:80,resize:'vertical'})} placeholder='Pautas para fortalecer el PPG y el PPP...'/></div>)}<Btn variant='success' onClick={function(){confirmar(m);}} style={{width:'100%'}}>✅ Confirmar como Realizada</Btn></div>)}</Card>);})}</div>)}
      {past.length>0&&(<div style={{marginTop:16}}><p style={{fontSize:17,fontWeight:700,color:P,margin:'0 0 8px'}}>REALIZADAS ({past.length})</p>{past.map(function(m){var t=getTipo(m.tipo);return(<Card key={m.id} style={{marginBottom:8,opacity:0.9}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}><div><div style={{display:'flex',alignItems:'center',gap:6,marginBottom:3}}><span style={{fontSize:18}}>{t.icon}</span><span style={{background:t.color+'22',color:t.color,fontSize:16,padding:'2px 8px',borderRadius:20,fontWeight:700}}>{t.label}</span></div><p style={{margin:0,fontSize:17,fontWeight:600}}>{partLabel(m)}</p><p style={{margin:'2px 0 0',fontSize:16,color:MU}}>{fmt(m.fechaReal||m.fecha)}</p>{m.notasReunion&&<p style={{margin:'4px 0 0',fontSize:16,color:MU,fontStyle:'italic'}}>"{m.notasReunion}"</p>}{m.pautas&&<div style={{margin:'6px 0 0',padding:'6px 8px',background:P+'10',borderRadius:6,fontSize:16}}><strong style={{color:P}}>Pautas: </strong>{m.pautas}</div>}</div><span style={{background:G+'22',color:G,fontSize:16,padding:'2px 8px',borderRadius:20,fontWeight:600,whiteSpace:'nowrap'}}>✓</span></div></Card>);})}</div>)}
    </div>
  );
}

// ─── SERVICIOS ───────────────────────────────────────────────────────────────
function Servicios(p){
  var allPlans=p.allPlans||{};
  var dynGroups=p.groups||GROUPS;
  var dynUsers=p.users||USERS;
  var [sector,setSector]=useState('Todos');
  var pcol={'1':R,'2':W,'3':'#1A6FA8','4':G,'':MU};
  var grupos=dynGroups.filter(function(g){if(sector==='Todos')return true;return g.sector===sector;});
  var total=0,conServ=0;
  grupos.forEach(function(g){g.miembros.forEach(function(m){total++;var ppp=allPlans[g.rpId]&&allPlans[g.rpId].miembros&&allPlans[g.rpId].miembros[m.id];if(ppp&&typeof ppp==='object'&&ppp.info&&hasServ(ppp.info.servicios))conServ++;});});
  return (
    <div style={{padding:'20px 16px 100px',fontFamily:'system-ui'}}>
      <h2 style={{color:P,fontSize:21,fontWeight:700,margin:'0 0 2px'}}>🤝 Servicio Comunitario</h2>
      <p style={{color:MU,fontSize:17,margin:'0 0 14px'}}>Oscar Estrada — Servidor Mayor · {CSEM}</p>
      <div style={{display:'flex',gap:8,marginBottom:14}}>{['Todos','San Miguel','Nazaret'].map(function(s){return <Btn key={s} small variant={sector===s?'primary':'outline'} onClick={function(){setSector(s);}}>{s}</Btn>;})}</div>
      <Card style={{marginBottom:16}}><p style={{margin:'0 0 10px',fontWeight:700,fontSize:18,color:'#071F33'}}>Resumen — {sector}</p><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,textAlign:'center',marginBottom:10}}><div><div style={{fontSize:27,fontWeight:700,color:P}}>{total}</div><div style={{fontSize:15,color:MU}}>Miembros</div></div><div><div style={{fontSize:27,fontWeight:700,color:G}}>{conServ}</div><div style={{fontSize:15,color:MU}}>Con servicio</div></div></div><Bar val={conServ} max={total||1} color={G}/></Card>
      {grupos.map(function(g){
        var rp=dynUsers.find(function(u){return u.id===g.rpId;});
        return(<Card key={g.id} style={{marginBottom:14}}><div style={{marginBottom:10}}><p style={{margin:0,fontWeight:700,fontSize:18,color:P}}>{g.nombre}</p><p style={{margin:'2px 0 0',fontSize:16,color:MU}}>Sector {g.sector} · RP: {rp?rp.nombre:'—'}</p></div>{g.miembros.map(function(m){var ppp=allPlans[g.rpId]&&allPlans[g.rpId].miembros&&allPlans[g.rpId].miembros[m.id];var servicios='—';if(ppp&&typeof ppp==='object'&&ppp.info&&hasServ(ppp.info.servicios))servicios=fmtServ(ppp.info.servicios);return(<div key={m.id} style={{padding:'7px 0',borderBottom:'1px solid '+BO+'88',display:'flex',justifyContent:'space-between',alignItems:'center',gap:8}}><p style={{margin:0,fontWeight:600,fontSize:17,color:'#071F33'}}>{m.nombre}</p><p style={{margin:0,fontSize:16,color:hasServ(ppp&&ppp.info&&ppp.info.servicios)?'#071F33':MU,textAlign:'right'}}>{servicios}</p></div>);})}</Card>);
      })}
    </div>
  );
}

// ─── FORMULARIOS DE SUPERVISIÓN ──────────────────────────────────────────────
// SupGPForm = Visita cualitativa del Supervisor al GP (Segmento 2)
function SupGPForm(p){
  var readOnly=p.readOnly||false;
  var sem=p.sem||CSEM;
  function mk(){
    var b=initSupGP();
    var sv=p.data;
    if(!sv)return b;
    var m=Object.assign({},b);
    m.secciones=Object.assign({},b.secciones);
    SECCIONES_SUPVISITA.forEach(function(s){if(sv.secciones&&sv.secciones[s.key]!==undefined)m.secciones[s.key]=sv.secciones[s.key];});
    m.obsFinales=sv.obsFinales||'';
    m.reuniones=sv.reuniones?sv.reuniones.slice():[];
    return m;
  }
  var [d,setD]=useState(mk());
  var [ok,setOk]=useState(false);
  function updObs(sk,i,val){setD(function(prev){var sc=Object.assign({},prev.secciones);var rw=sc[sk].slice();rw[i]=Object.assign({},rw[i],{observacion:val});sc[sk]=rw;return Object.assign({},prev,{secciones:sc});});}
  function updFinal(val){setD(function(prev){return Object.assign({},prev,{obsFinales:val});});}
  function addReun(){setD(function(prev){return Object.assign({},prev,{reuniones:(prev.reuniones||[]).concat([{fecha:TODAY,notas:''}])});});}
  function updReun(i,field,val){setD(function(prev){var rs=prev.reuniones.slice();rs[i]=Object.assign({},rs[i],{[field]:val});return Object.assign({},prev,{reuniones:rs});});}
  function save(){if(p.onSave)p.onSave(d);setOk(true);setTimeout(function(){setOk(false);},2000);}
  var sH={fontSize:17,fontWeight:700,color:P,margin:'14px 0 6px',paddingBottom:3,borderBottom:'1px solid '+P+'33'};
  return (
    <div>
      {ok&&<div style={{background:'#F0FFF4',border:'1.5px solid #68D391',borderRadius:10,padding:10,marginBottom:10,textAlign:'center',fontWeight:700,color:G}}>✅ Guardado</div>}
      <div style={{background:'#154E78',color:'#fff',padding:'8px 14px',borderRadius:8,fontSize:17,fontWeight:700,marginBottom:12}}>👁 Visita al Grupo Pastoral</div>
      <p style={{fontSize:15,color:MU,marginTop:0,marginBottom:12,fontStyle:'italic'}}>Observaciones del Supervisor/a durante una reunión del GP.</p>
      {SECCIONES_SUPVISITA.map(function(sec){
        var rows=d.secciones[sec.key]||[];
        return (
          <div key={sec.key}>
            <p style={sH}>{sec.title}</p>
            {rows.map(function(row,i){return(
              <Card key={i} style={{marginBottom:6}}>
                <div style={{fontSize:16,color:MU,fontWeight:600,marginBottom:4,lineHeight:1.3}}>{row.aspecto}</div>
                {readOnly?(<div style={{fontSize:15,padding:'5px 8px',background:BG,borderRadius:7,minHeight:28}}>{row.observacion||'—'}</div>):(<textarea value={row.observacion||''} onChange={function(e){updObs(sec.key,i,e.target.value);}} style={inp({minHeight:52,resize:'vertical',fontSize:15})} placeholder='Observaciones...'/>)}
              </Card>
            );})}
          </div>
        );
      })}
      <p style={sH}>📝 Observaciones finales de la visita</p>
      {readOnly?(<div style={{fontSize:15,padding:'5px 8px',background:BG,borderRadius:7,minHeight:60}}>{d.obsFinales||'—'}</div>):(<textarea value={d.obsFinales||''} onChange={function(e){updFinal(e.target.value);}} style={inp({minHeight:80,resize:'vertical',fontSize:15})} placeholder='Síntesis general de la visita...'/>)}
      <p style={sH}>📅 Visitas realizadas</p>
      {!readOnly&&<Btn small variant='outline' onClick={addReun} style={{marginBottom:8}}>+ Registrar visita</Btn>}
      {(!d.reuniones||!d.reuniones.length)&&<p style={{fontSize:15,color:MU,fontStyle:'italic'}}>Sin visitas registradas aún.</p>}
      {(d.reuniones||[]).map(function(r,i){return(
        <Card key={i} style={{marginBottom:6}}>
          <div style={{display:'grid',gridTemplateColumns:'auto 1fr',gap:8}}>
            <div><div style={{fontSize:14,color:MU,fontWeight:600,marginBottom:2}}>Fecha</div>{readOnly?<span style={{fontSize:15}}>{fmt(r.fecha)||'—'}</span>:<input type='date' value={r.fecha||''} onChange={function(e){updReun(i,'fecha',e.target.value);}} style={inp({fontSize:15,padding:'5px 8px'})}/>}</div>
            <div><div style={{fontSize:14,color:MU,fontWeight:600,marginBottom:2}}>Notas</div>{readOnly?<span style={{fontSize:15}}>{r.notas||'—'}</span>:<input value={r.notas||''} onChange={function(e){updReun(i,'notas',e.target.value);}} style={inp({fontSize:15,padding:'5px 8px'})} placeholder='Notas de la visita...'/>}</div>
          </div>
        </Card>
      );})}
      {!readOnly&&<div style={{marginTop:14}}><Btn variant='success' onClick={save} style={{width:'100%',padding:12}}>💾 Guardar Visita al GP</Btn></div>}
    </div>
  );
}

// SupRPForm = Supervisión al RP: Parte A (evaluación) + Parte B (reporte GP)
function SupRPForm(p){
  var readOnly=p.readOnly||false;
  var miembros=(p.miembros||[]).filter(function(m){return !m.rpOverride;});
  var sem=p.sem||CSEM;
  function mk(){
    var b=initSupRP(miembros);
    var sv=p.data;
    if(!sv)return b;
    var m=Object.assign({},b);
    m.pregPersonales=Object.assign({},b.pregPersonales,sv.pregPersonales||{});
    m.secA=Object.assign({},b.secA);
    SECCIONES_SUPRP_A.forEach(function(s){if(sv.secA&&sv.secA[s.key]!==undefined)m.secA[s.key]=sv.secA[s.key];});
    m.sintesis=Object.assign({},b.sintesis,sv.sintesis||{});
    m.secB=Object.assign({},b.secB);
    SECCIONES_SUPRP_B.forEach(function(s){if(sv.secB&&sv.secB[s.key]!==undefined)m.secB[s.key]=sv.secB[s.key];});
    m.integ=Object.assign({},b.integ,sv.integ||{});
    m.acciones=Object.assign({},b.acciones,sv.acciones||{});
    m.reuniones=sv.reuniones?sv.reuniones.slice():[];
    return m;
  }
  var [d,setD]=useState(mk());
  var [ok,setOk]=useState(false);
  var dRef=React.useRef(d);
  dRef.current=d;
  function updPP(field,val){setD(function(prev){return Object.assign({},prev,{pregPersonales:Object.assign({},prev.pregPersonales,{[field]:val})});});}
  function updRowA(sk,i,field,val){setD(function(prev){var sc=Object.assign({},prev.secA);var rw=sc[sk].slice();rw[i]=Object.assign({},rw[i],{[field]:val});sc[sk]=rw;return Object.assign({},prev,{secA:sc});});}
  function updSintesis(field,val){setD(function(prev){return Object.assign({},prev,{sintesis:Object.assign({},prev.sintesis,{[field]:val})});});}
  function updRowB(sk,i,field,val){setD(function(prev){var sc=Object.assign({},prev.secB);var rw=sc[sk].slice();rw[i]=Object.assign({},rw[i],{[field]:val});sc[sk]=rw;return Object.assign({},prev,{secB:sc});});}
  function upd5SB(sk,sid,field,val){setD(function(prev){var sc=Object.assign({},prev.secB);var s5=Object.assign({},sc[sk]);s5[sid]=Object.assign({},s5[sid]||{},{[field]:val});sc[sk]=s5;return Object.assign({},prev,{secB:sc});});}
  function updInteg(mid,val){setD(function(prev){var ig=Object.assign({},prev.integ);ig[mid]=Object.assign({},ig[mid]||{},{anotaciones:val});return Object.assign({},prev,{integ:ig});});}
  function updAcc(field,val){setD(function(prev){return Object.assign({},prev,{acciones:Object.assign({},prev.acciones,{[field]:val})});});}
  function addReun(){setD(function(prev){return Object.assign({},prev,{reuniones:(prev.reuniones||[]).concat([{fecha:TODAY,notas:''}])});});}
  function updReun(i,field,val){setD(function(prev){var rs=prev.reuniones.slice();rs[i]=Object.assign({},rs[i],{[field]:val});return Object.assign({},prev,{reuniones:rs});});}
  function save(){if(p.onSave)p.onSave(dRef.current);setOk(true);setTimeout(function(){setOk(false);},3000);}
  var sH={fontSize:17,fontWeight:700,color:P,margin:'14px 0 6px',paddingBottom:3,borderBottom:'1px solid '+P+'33'};
  var pH={color:'#fff',padding:'8px 14px',borderRadius:8,fontSize:17,fontWeight:700,marginTop:16,marginBottom:10};
  function ScoreSel(val,onCh){
    if(readOnly){
      if(!val)return(<span style={{color:MU,fontSize:15}}>—</span>);
      return(<span style={{background:PSUP_COL[val]+'22',color:PSUP_COL[val],padding:'2px 10px',borderRadius:20,fontSize:15,fontWeight:700,whiteSpace:'nowrap'}}>{val} — {(['','Pésimo','Malo','Regular','Bueno','Excelente'])[parseInt(val)]||''}</span>);
    }
    return(
      <div style={{display:'flex',gap:3,flexShrink:0}}>
        {['1','2','3','4','5'].map(function(pp){var sel=val===pp;return(<button key={pp} onClick={function(){onCh({target:{value:sel?'':pp}});}} style={{border:'none',borderRadius:4,padding:'4px 9px',cursor:'pointer',fontWeight:sel?700:400,fontSize:16,background:sel?PSUP_COL[pp]:BO,color:sel?'#fff':'#555',lineHeight:1,flexShrink:0}}>{pp}</button>);})}</div>
    );
  }
  function rnSecs(SECS,secData,updFn,upd5Fn){
    return SECS.map(function(sec){
      var rows=secData[sec.key];
      return(
        <div key={sec.key}>
          <p style={sH}>{sec.title}</p>
          {sec.es5S?(
            <div>{sec.items.map(function(it){var sv=(rows||{})[it.id]||{};return(
              <Card key={it.id} style={{marginBottom:7,borderLeft:'3px solid '+P}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:8,marginBottom:6}}>
                  <div style={{flex:1}}><div style={{fontWeight:700,fontSize:16,color:P}}>{it.label}</div><div style={{fontSize:14,color:MU,lineHeight:1.3}}>{it.desc}</div></div>
                  {ScoreSel(sv.puntaje,function(e){upd5Fn(sec.key,it.id,'puntaje',e.target.value);})}
                </div>
                {!readOnly&&<input value={sv.comentario||''} onChange={function(e){upd5Fn(sec.key,it.id,'comentario',e.target.value);}} placeholder='Comentario...' style={inp({fontSize:15,padding:'5px 8px'})}/>}
                {readOnly&&sv.comentario&&<div style={{fontSize:15,color:MU,fontStyle:'italic'}}>{sv.comentario}</div>}
              </Card>
            );})}
            </div>
          ):sec.esFidelidad?(
            <div>{(rows||[]).map(function(row,i){return(
              <Card key={i} style={{marginBottom:6}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:8,marginBottom:row.comentario&&readOnly?6:0}}>
                  <p style={{margin:0,fontSize:16,flex:1,lineHeight:1.3}}>{row.item}</p>
                  {readOnly?(<span style={{background:(row.respuesta==='Sí'?G:row.respuesta==='No'?R:MU)+'22',color:row.respuesta==='Sí'?G:row.respuesta==='No'?R:MU,padding:'2px 10px',borderRadius:20,fontSize:15,fontWeight:700}}>{row.respuesta||'—'}</span>):(
                    <select value={row.respuesta||''} onChange={function(e){updFn(sec.key,i,'respuesta',e.target.value);}} style={{padding:'4px 8px',borderRadius:6,border:'1px solid '+BO,fontSize:15,fontFamily:'inherit',minWidth:70}}>
                      <option value=''>—</option><option value='Sí'>Sí</option><option value='No'>No</option>
                    </select>
                  )}
                </div>
                {!readOnly&&<input value={row.comentario||''} onChange={function(e){updFn(sec.key,i,'comentario',e.target.value);}} placeholder='Comentario...' style={inp({fontSize:15,padding:'5px 8px',marginTop:6})}/>}
                {readOnly&&row.comentario&&<div style={{fontSize:15,color:MU,fontStyle:'italic',marginTop:4}}>{row.comentario}</div>}
              </Card>
            );})}
            </div>
          ):(
            <div>{(rows||[]).map(function(row,i){return(
              <Card key={i} style={{marginBottom:6}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:8,marginBottom:6}}>
                  <p style={{margin:0,fontSize:16,flex:1,lineHeight:1.3}}>{row.item}</p>
                  {ScoreSel(row.puntaje,function(e){updFn(sec.key,i,'puntaje',e.target.value);})}
                </div>
                {!readOnly&&<input value={row.comentario||''} onChange={function(e){updFn(sec.key,i,'comentario',e.target.value);}} placeholder='Comentario...' style={inp({fontSize:15,padding:'5px 8px'})}/>}
                {readOnly&&row.comentario&&<div style={{fontSize:15,color:MU,fontStyle:'italic'}}>{row.comentario}</div>}
              </Card>
            );})}
            </div>
          )}
        </div>
      );
    });
  }
  return (
    <div>
      {ok&&<div style={{background:G,color:'#fff',borderRadius:10,padding:'10px 16px',marginBottom:12,textAlign:'center',fontWeight:700,fontSize:17,position:'sticky',top:0,zIndex:10}}>✅ Guardado correctamente</div>}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
        <p style={{fontSize:20,fontWeight:700,color:P,margin:0,letterSpacing:0.2}}>Formato de Supervisión al RP</p>
        {!readOnly&&<Btn small variant='success' onClick={save}>💾 Guardar</Btn>}
      </div>
      {/* ── PARTE A ──────────────────────────────────────────────────────────── */}
      <div style={Object.assign({},pH,{background:P})}>PARTE A — Conocimiento, habilidades y organización del RP</div>
      <p style={{fontSize:15,color:MU,marginTop:0,marginBottom:12,fontStyle:'italic'}}>Se diligencia en la reunión del Supervisor/a con el Responsable Pastoral.</p>
      {/* Preguntas personales */}
      <p style={sH}>🙏 Primero unas preguntas para ti{p.rpNombre?', '+(p.rpNombre.split(' ')[0]):''}:</p>
      {[['oracion','¿Cómo está tu vida de oración y tu relación con el Señor?'],['salud','¿Cómo está tu salud?'],['retos','¿Qué retos estás enfrentando en tu vida en este momento?'],['alianza','¿Estás viviendo plenamente tu Alianza?']].map(function(q){var v=d.pregPersonales[q[0]]||'';return(
        <div key={q[0]} style={{marginBottom:8}}>
          <div style={{fontSize:16,color:MU,fontWeight:600,marginBottom:3}}>{q[1]}</div>
          {readOnly?(<div style={{fontSize:15,padding:'5px 8px',background:BG,borderRadius:7,minHeight:28}}>{v||'—'}</div>):(<textarea value={v} onChange={function(e){updPP(q[0],e.target.value);}} style={inp({minHeight:44,resize:'vertical',fontSize:15})}/>)}
        </div>
      );})}
      {/* Secciones A */}
      {rnSecs(SECCIONES_SUPRP_A,d.secA,updRowA,null)}
      {(function(){
        var criticas=[],desarrollo=[],consolidadas=[];
        SECCIONES_SUPRP_A.forEach(function(sec){(d.secA[sec.key]||[]).forEach(function(row){if(!row.puntaje)return;var pv=parseInt(row.puntaje);var e2={sec:sec.title,item:row.item,puntaje:row.puntaje};if(pv<=2)criticas.push(e2);else if(pv===3)desarrollo.push(e2);else consolidadas.push(e2);});});
        if(!criticas.length&&!desarrollo.length&&!consolidadas.length)return null;
        return(
          <div style={{background:'#F7FAFC',border:'1.5px solid '+BO,borderRadius:10,padding:12,margin:'10px 0 14px'}}>
            <p style={{margin:'0 0 8px',fontWeight:700,fontSize:17,color:P}}>📊 Resumen — Evaluación del RP</p>
            {criticas.length>0&&(<div style={{marginBottom:8}}><div style={{fontSize:15,fontWeight:700,color:R,marginBottom:4}}>🔴 Áreas críticas — requieren plan de acción ({criticas.length})</div>{criticas.map(function(a,i){return(<div key={i} style={{display:'flex',alignItems:'flex-start',gap:6,padding:'3px 0',borderBottom:'1px solid '+BO+'33'}}><span style={{background:PSUP_COL[a.puntaje]+'22',color:PSUP_COL[a.puntaje],padding:'1px 7px',borderRadius:10,fontSize:14,fontWeight:700,flexShrink:0}}>{a.puntaje}</span><span style={{fontSize:14,color:MU,flexShrink:0,paddingTop:1}}>{a.sec.split('.')[0].trim()}.</span><span style={{fontSize:15,lineHeight:1.3}}>{a.item}</span></div>);})}</div>)}
            {desarrollo.length>0&&(<div style={{marginBottom:8}}><div style={{fontSize:15,fontWeight:700,color:'#718096',marginBottom:4}}>⚫ En desarrollo — monitorear ({desarrollo.length})</div>{desarrollo.map(function(a,i){return(<div key={i} style={{display:'flex',alignItems:'flex-start',gap:6,padding:'3px 0',borderBottom:'1px solid '+BO+'33'}}><span style={{background:PSUP_COL[a.puntaje]+'22',color:PSUP_COL[a.puntaje],padding:'1px 7px',borderRadius:10,fontSize:14,fontWeight:700,flexShrink:0}}>{a.puntaje}</span><span style={{fontSize:14,color:MU,flexShrink:0,paddingTop:1}}>{a.sec.split('.')[0].trim()}.</span><span style={{fontSize:15,lineHeight:1.3}}>{a.item}</span></div>);})}</div>)}
            {consolidadas.length>0&&(<div><div style={{fontSize:15,fontWeight:700,color:G,marginBottom:4}}>🟢 Áreas consolidadas — sin acción requerida ({consolidadas.length})</div>{consolidadas.map(function(a,i){return(<div key={i} style={{display:'flex',alignItems:'flex-start',gap:6,padding:'3px 0',borderBottom:'1px solid '+BO+'33'}}><span style={{background:PSUP_COL[a.puntaje]+'22',color:PSUP_COL[a.puntaje],padding:'1px 7px',borderRadius:10,fontSize:14,fontWeight:700,flexShrink:0}}>{a.puntaje}</span><span style={{fontSize:14,color:MU,flexShrink:0,paddingTop:1}}>{a.sec.split('.')[0].trim()}.</span><span style={{fontSize:15,lineHeight:1.3}}>{a.item}</span></div>);})}</div>)}
          </div>
        );
      })()}
      {(function(){var tot=0,cnt=0;SECCIONES_SUPRP_A.forEach(function(sec){(d.secA[sec.key]||[]).forEach(function(r){if(r.puntaje){tot+=parseInt(r.puntaje);cnt++;}});});if(!cnt)return null;var avg=(tot/cnt).toFixed(2);var col=parseFloat(avg)>=4?G:parseFloat(avg)>=3?'#1A6FA8':parseFloat(avg)>=2?W:R;return(<div style={{background:col+'15',border:'1.5px solid '+col+'44',borderRadius:10,padding:'10px 16px',margin:'0 0 14px',display:'flex',alignItems:'center',justifyContent:'space-between'}}><span style={{fontSize:17,fontWeight:700,color:'#071F33'}}>📊 Promedio Parte A — Evaluación del RP</span><span style={{background:col,color:'#fff',fontWeight:700,fontSize:18,padding:'4px 16px',borderRadius:20}}>{avg} / 5</span></div>);})()}
      {/* Síntesis */}
      <p style={sH}>📌 Síntesis del Supervisor/a</p>
      {[['areasCrec','🔹 Áreas de crecimiento como pastor/a'],['pautas','📌 Pautas pastorales ofrecidas'],['compromisos','✅ Compromisos del RP']].map(function(f){var v=d.sintesis[f[0]]||'';return(
        <div key={f[0]} style={{marginBottom:8}}>
          <div style={{fontSize:16,color:MU,fontWeight:600,marginBottom:3}}>{f[1]}</div>
          {readOnly?(<div style={{fontSize:15,padding:'5px 8px',background:BG,borderRadius:7,minHeight:28}}>{v||'—'}</div>):(<textarea value={v} onChange={function(e){updSintesis(f[0],e.target.value);}} style={inp({minHeight:60,resize:'vertical',fontSize:15})}/>)}
        </div>
      );})}
      {/* ── PARTE B ──────────────────────────────────────────────────────────── */}
      <div style={Object.assign({},pH,{background:'#1A5276',marginTop:20})}>PARTE B — Reporte de RP de su Grupo Pastoral</div>
      <p style={{fontSize:15,color:MU,marginTop:0,marginBottom:12,fontStyle:'italic'}}>El RP informa al Supervisor/a sobre el estado de su grupo.</p>
      {/* Secciones B */}
      {rnSecs(SECCIONES_SUPRP_B,d.secB,updRowB,upd5SB)}
      {(function(){
        var criticas=[],desarrollo=[],consolidadas=[];
        SECCIONES_SUPRP_B.forEach(function(sec){
          if(sec.es5S){var s5=d.secB[sec.key]||{};sec.items.forEach(function(it){var sv=s5[it.id]||{};if(!sv.puntaje)return;var pv=parseInt(sv.puntaje);var e2={sec:sec.title,item:it.label,puntaje:sv.puntaje};if(pv<=2)criticas.push(e2);else if(pv===3)desarrollo.push(e2);else consolidadas.push(e2);});}
          else if(!sec.esFidelidad){(d.secB[sec.key]||[]).forEach(function(row){if(!row.puntaje)return;var pv=parseInt(row.puntaje);var e2={sec:sec.title,item:row.item,puntaje:row.puntaje};if(pv<=2)criticas.push(e2);else if(pv===3)desarrollo.push(e2);else consolidadas.push(e2);});}
        });
        if(!criticas.length&&!desarrollo.length&&!consolidadas.length)return null;
        return(
          <div style={{background:'#F7FAFC',border:'1.5px solid '+BO,borderRadius:10,padding:12,margin:'10px 0 14px'}}>
            <p style={{margin:'0 0 8px',fontWeight:700,fontSize:17,color:'#1A5276'}}>📊 Resumen — Estado del GP</p>
            {criticas.length>0&&(<div style={{marginBottom:8}}><div style={{fontSize:15,fontWeight:700,color:R,marginBottom:4}}>🔴 Áreas críticas — requieren acción en el GP ({criticas.length})</div>{criticas.map(function(a,i){return(<div key={i} style={{display:'flex',alignItems:'flex-start',gap:6,padding:'3px 0',borderBottom:'1px solid '+BO+'33'}}><span style={{background:PSUP_COL[a.puntaje]+'22',color:PSUP_COL[a.puntaje],padding:'1px 7px',borderRadius:10,fontSize:14,fontWeight:700,flexShrink:0}}>{a.puntaje}</span><span style={{fontSize:14,color:MU,flexShrink:0,paddingTop:1}}>{a.sec.split('.')[0].trim()}.</span><span style={{fontSize:15,lineHeight:1.3}}>{a.item}</span></div>);})}</div>)}
            {desarrollo.length>0&&(<div style={{marginBottom:8}}><div style={{fontSize:15,fontWeight:700,color:'#718096',marginBottom:4}}>⚫ En desarrollo — monitorear ({desarrollo.length})</div>{desarrollo.map(function(a,i){return(<div key={i} style={{display:'flex',alignItems:'flex-start',gap:6,padding:'3px 0',borderBottom:'1px solid '+BO+'33'}}><span style={{background:PSUP_COL[a.puntaje]+'22',color:PSUP_COL[a.puntaje],padding:'1px 7px',borderRadius:10,fontSize:14,fontWeight:700,flexShrink:0}}>{a.puntaje}</span><span style={{fontSize:14,color:MU,flexShrink:0,paddingTop:1}}>{a.sec.split('.')[0].trim()}.</span><span style={{fontSize:15,lineHeight:1.3}}>{a.item}</span></div>);})}</div>)}
            {consolidadas.length>0&&(<div><div style={{fontSize:15,fontWeight:700,color:G,marginBottom:4}}>🟢 Áreas consolidadas — sin acción requerida ({consolidadas.length})</div>{consolidadas.map(function(a,i){return(<div key={i} style={{display:'flex',alignItems:'flex-start',gap:6,padding:'3px 0',borderBottom:'1px solid '+BO+'33'}}><span style={{background:PSUP_COL[a.puntaje]+'22',color:PSUP_COL[a.puntaje],padding:'1px 7px',borderRadius:10,fontSize:14,fontWeight:700,flexShrink:0}}>{a.puntaje}</span><span style={{fontSize:14,color:MU,flexShrink:0,paddingTop:1}}>{a.sec.split('.')[0].trim()}.</span><span style={{fontSize:15,lineHeight:1.3}}>{a.item}</span></div>);})}</div>)}
          </div>
        );
      })()}
      {(function(){var tot=0,cnt=0;SECCIONES_SUPRP_B.forEach(function(sec){if(sec.es5S){var s5=d.secB[sec.key]||{};sec.items.forEach(function(it){var sv=s5[it.id]||{};if(sv.puntaje){tot+=parseInt(sv.puntaje);cnt++;}});}else if(!sec.esFidelidad){(d.secB[sec.key]||[]).forEach(function(r){if(r.puntaje){tot+=parseInt(r.puntaje);cnt++;}});}});if(!cnt)return null;var avg=(tot/cnt).toFixed(2);var col=parseFloat(avg)>=4?G:parseFloat(avg)>=3?'#1A6FA8':parseFloat(avg)>=2?W:R;return(<div style={{background:col+'15',border:'1.5px solid '+col+'44',borderRadius:10,padding:'10px 16px',margin:'0 0 14px',display:'flex',alignItems:'center',justifyContent:'space-between'}}><span style={{fontSize:17,fontWeight:700,color:'#071F33'}}>📊 Promedio Parte B — Estado del GP</span><span style={{background:'#1A5276',color:'#fff',fontWeight:700,fontSize:18,padding:'4px 16px',borderRadius:20}}>{avg} / 5</span></div>);})()}
      {/* Cuadro de Integrantes */}
      <p style={sH}>👥 IX. Cuadro resumen de los Integrantes del GP</p>
      <div style={{background:P+'08',border:'1px solid '+P+'22',borderRadius:8,padding:'10px 14px',marginBottom:10,fontSize:14,color:MU,lineHeight:1.6}}>
        <p style={{margin:'0 0 6px',fontWeight:700,color:P,fontSize:15}}>Anotar situaciones especiales, necesidades y compromisos de cada hermano/a:</p>
        <ul style={{margin:0,paddingLeft:18}}>
          {['Actitudes sobre la vida comunitaria.',
            'Nivel de comprensión y aceptación de las Enseñanzas de la Comunidad.',
            'Fidelidad al Aporte del 10% y otros compromisos económicos con la Comunidad.',
            'Apertura y disponibilidad al servicio.',
            'Actitud hacia la autoridad: Coordinadores, Líderes, Programas y Ministerios.',
            'Relación con los demás hermanos en el GP.',
            'Evaluación de cara a la toma del siguiente nivel del Compromiso Básico.',
            'Necesidades o dificultades personales (familia, finanzas, trabajo, oración).'
          ].map(function(t,i){return <li key={i} style={{marginBottom:2}}>{t}</li>;})}
        </ul>
      </div>
      {miembros.length===0&&<p style={{fontSize:15,color:MU,fontStyle:'italic'}}>Sin integrantes registrados.</p>}
      {miembros.map(function(m){var iv=d.integ[m.id]||{};return(
        <Card key={m.id} style={{marginBottom:8,borderLeft:'3px solid '+A}}>
          <p style={{margin:'0 0 6px',fontWeight:700,fontSize:17}}>{m.nombre}</p>
          <div style={{fontSize:14,color:MU,fontWeight:600,marginBottom:2}}>Anotaciones generales</div>
          {readOnly?(<div style={{fontSize:15,padding:'5px 8px',background:BG,borderRadius:7,minHeight:28}}>{iv.anotaciones||'—'}</div>):(<textarea value={iv.anotaciones||''} onChange={function(e){updInteg(m.id,e.target.value);}} style={inp({minHeight:52,resize:'vertical',fontSize:15})} placeholder='Situaciones de vida, necesidades, fidelidad a la Alianza, compromisos, etc.'/>)}
        </Card>
      );})}
      {/* Acciones */}
      <p style={sH}>🎯 X. Acciones a partir de la Supervisión</p>
      {[['corregir','🔴 ¿Debes corregir algo?'],['prevenir','🟡 ¿Debes prevenir algo?'],['fomentar','🟢 ¿Debes fomentar algo?'],['potenciar','🔵 ¿Qué puedes potenciar en tu GP?'],['obsRS','📝 Observaciones del RS']].map(function(ac){var v=d.acciones[ac[0]]||'';return(
        <div key={ac[0]} style={{marginBottom:8}}>
          <div style={{fontSize:16,color:MU,fontWeight:600,marginBottom:3}}>{ac[1]}</div>
          {readOnly?(<div style={{fontSize:15,padding:'5px 8px',background:BG,borderRadius:7,minHeight:28}}>{v||'—'}</div>):(<textarea value={v} onChange={function(e){updAcc(ac[0],e.target.value);}} style={inp({minHeight:48,resize:'vertical',fontSize:15})}/>)}
        </div>
      );})}
      {/* Reuniones */}
      <p style={sH}>📅 Reuniones de Supervisión al RP</p>
      {!readOnly&&<Btn small variant='outline' onClick={addReun} style={{marginBottom:8}}>+ Agregar reunión</Btn>}
      {(!d.reuniones||!d.reuniones.length)&&<p style={{fontSize:15,color:MU,fontStyle:'italic'}}>Sin reuniones registradas aún.</p>}
      {(d.reuniones||[]).map(function(r,i){return(
        <Card key={i} style={{marginBottom:6}}>
          <div style={{display:'grid',gridTemplateColumns:'auto 1fr',gap:8}}>
            <div><div style={{fontSize:14,color:MU,fontWeight:600,marginBottom:2}}>Fecha</div>{readOnly?<span style={{fontSize:15}}>{fmt(r.fecha)||'—'}</span>:<input type='date' value={r.fecha||''} onChange={function(e){updReun(i,'fecha',e.target.value);}} style={inp({fontSize:15,padding:'5px 8px'})}/>}</div>
            <div><div style={{fontSize:14,color:MU,fontWeight:600,marginBottom:2}}>Notas</div>{readOnly?<span style={{fontSize:15}}>{r.notas||'—'}</span>:<input value={r.notas||''} onChange={function(e){updReun(i,'notas',e.target.value);}} style={inp({fontSize:15,padding:'5px 8px'})} placeholder='Notas de la reunión...'/>}</div>
          </div>
        </Card>
      );})}
      {!readOnly&&<div style={{marginTop:14}}><Btn variant='success' onClick={save} style={{width:'100%',padding:12}}>💾 Guardar Supervisión al RP</Btn></div>}
    </div>
  );
}


// ─── VIEW GRUPO ──────────────────────────────────────────────────────────────
function getPrioridades(plans,mId){var ppp=plans.miembros&&plans.miembros[mId];if(!ppp||typeof ppp!=='object'||!ppp.autoeval)return[];var pr=[];SECCIONES_PPP.forEach(function(sec){(ppp.autoeval[sec.key]||[]).forEach(function(row){if(row.puntaje==='1'||row.puntaje==='2')pr.push({item:row.item,puntaje:row.puntaje,sec:sec.title.split('.')[1]?sec.title.split('.')[1].trim():sec.title});});});return pr.sort(function(a,b){return parseInt(a.puntaje)-parseInt(b.puntaje);});}
function VGHermanos(p){var mb=p.mb,semR=p.semR,evs=p.evs,plans=p.plans;function ap(mId,tipo){var f=tipo?evs.filter(function(e){return e.tipo===tipo;}):evs;if(!f.length)return 0;return Math.round(f.filter(function(e){return (e.asistentes||[]).includes(mId);}).length/f.length*100);}return(<div>{mb.map(function(m){var n=semR.filter(function(x){return x.miembroId===m.id;}).length;var ppp=plans.miembros&&plans.miembros[m.id];var prs=getPrioridades(plans,m.id);return(<Card key={m.id} style={{marginBottom:10}}><div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}><div><p style={{margin:0,fontWeight:700,fontSize:18}}>{m.nombre}</p>{ppp&&ppp.info&&<p style={{margin:'2px 0 0',fontSize:16,color:MU}}>{ppp.info.compromiso||''}{hasServ(ppp.info.servicios)?' · '+fmtServ(ppp.info.servicios):''}</p>}</div><span style={{background:(n>=4?G:n>=2?W:R)+'22',color:n>=4?G:n>=2?W:R,fontSize:16,padding:'2px 8px',borderRadius:20,fontWeight:600}}>{n}/4 PP</span></div>{evs.length>0&&(<div style={{display:'flex',justifyContent:'space-around',padding:'6px 0',borderTop:'1px solid '+BO,borderBottom:'1px solid '+BO,marginBottom:8}}><Donut pct={ap(m.id,'Asamblea de Oración')} label="Asambleas"/><Donut pct={ap(m.id,'Reunión del Grupo Pastoral')} label="Grupo"/><Donut pct={ap(m.id,'Retiro')} label="Retiro"/><Donut pct={ap(m.id,'Curso')} label="Curso"/></div>)}{prs.length>0&&(<div style={{background:LI,borderRadius:7,padding:'6px 10px'}}><p style={{margin:'0 0 4px',fontSize:16,fontWeight:700}}>🎯 Áreas prioritarias:</p>{prs.slice(0,3).map(function(pr,i){return <div key={i} style={{fontSize:15,color:pr.puntaje==='1'?R:W,marginBottom:2}}>● <strong>{pr.sec}:</strong> {pr.item}</div>;})}</div>)}</Card>);})}</div>);}
function VGPpg(p){var ppg=p.ppg||{},mb=p.mb;var sH={fontSize:17,fontWeight:700,color:P,margin:'12px 0 5px',paddingBottom:3,borderBottom:'1px solid '+P+'33'};var thS={background:P+'18',color:P,fontSize:15,fontWeight:700,padding:'5px 6px',textAlign:'left',borderBottom:'1px solid '+BO};var tdS={padding:'4px 6px',borderBottom:'1px solid '+BO+'55',fontSize:15};if(!ppg.integ&&!ppg.areas&&!ppg.prog)return(<div style={{textAlign:'center',padding:32,color:MU}}><div style={{fontSize:39}}>📋</div><p>PPG aún no completado.</p></div>);return(<div><p style={sH}>Integrantes</p>{(ppg.integ||[]).map(function(m,i){return <div key={i} style={{padding:'4px 0',borderBottom:'1px solid '+BO+'55',fontSize:17}}><strong>{m.nombre}</strong>{m.compromiso?' · '+m.compromiso:''}</div>;})}<p style={sH}>Áreas de trabajo</p>{(ppg.areas||[]).filter(function(a){return a.area||a.meta;}).map(function(a,i){return <div key={i} style={{padding:'4px 0',borderBottom:'1px solid '+BO+'55',fontSize:17}}><strong>{a.area}</strong>{a.meta?' — '+a.meta:''}</div>;})} <p style={sH}>Programación PP</p><div style={{overflowX:'auto'}}><table style={{width:'100%',borderCollapse:'collapse'}}><thead><tr><th style={thS}>Hermano/a</th>{MESES_SEM.map(function(m){return <th key={m} style={thS}>{m.slice(0,3)}</th>;})}</tr></thead><tbody>{mb.map(function(m){var mp=(ppg.prog||{})[m.id]||{};return <tr key={m.id}><td style={tdS}><strong>{m.nombre.split(' ')[0]}</strong></td>{MESES_SEM.map(function(mes){return <td key={mes} style={tdS}>{mp[mes]?fmt(mp[mes]):'—'}</td>;})}</tr>;})}</tbody></table></div>{(ppg.reuniones&&ppg.reuniones.filter(function(r){return r.fecha||r.actividad;}).length>0)&&(<div><p style={sH}>Reuniones del GP</p><div style={{overflowX:'auto'}}><table style={{width:'100%',borderCollapse:'collapse'}}><thead><tr><th style={thS}>Fecha</th><th style={thS}>Actividad</th><th style={thS}>Área/Tema</th><th style={thS}>Comentarios</th></tr></thead><tbody>{ppg.reuniones.filter(function(r){return r.fecha||r.actividad;}).map(function(r,i){return <tr key={i}><td style={tdS}>{r.fecha?fmt(r.fecha):'—'}</td><td style={tdS}>{r.actividad||'—'}</td><td style={tdS}>{r.tema||'—'}</td><td style={tdS}>{r.comentarios||'—'}</td></tr>;})}</tbody></table></div></div>)}{(ppg.evalBien||ppg.evalMejorar)&&(<div><p style={sH}>Evaluación del GP</p>{ppg.evalBien&&<div style={{marginBottom:8}}><p style={{margin:'0 0 3px',fontWeight:700,fontSize:16,color:G}}>✅ Lo que va bien:</p><p style={{margin:0,fontSize:16}}>{ppg.evalBien}</p></div>}{ppg.evalMejorar&&<div><p style={{margin:'0 0 3px',fontWeight:700,fontSize:16,color:W}}>🔧 Lo que hay que mejorar:</p><p style={{margin:0,fontSize:16}}>{ppg.evalMejorar}</p></div>}</div>)}</div>);}
function VGPpp(p){var mb=p.mb,plans=p.plans;var [selMb,setSelMb]=useState('');var ppp=selMb&&plans.miembros&&plans.miembros[selMb];var selObj=mb.find(function(m){return m.id===selMb;});var prs=selMb?getPrioridades(plans,selMb):[];var sH={fontSize:17,fontWeight:700,color:P,margin:'12px 0 5px',paddingBottom:3,borderBottom:'1px solid '+P+'33'};return(<div><select value={selMb} onChange={function(e){setSelMb(e.target.value);}} style={inp({marginBottom:12})}><option value=''>— Selecciona un hermano/a —</option>{mb.map(function(m){return <option key={m.id} value={m.id}>{m.nombre}</option>;})}</select>{selMb&&(!ppp||typeof ppp!=='object'||!ppp.autoeval)&&(<div style={{textAlign:'center',padding:32,color:MU}}><div style={{fontSize:39}}>📝</div><p>PPP aún no completado.</p></div>)}{selMb&&ppp&&typeof ppp==='object'&&ppp.autoeval&&(<div><Card style={{marginBottom:10}}><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6,fontSize:17}}><div><span style={{color:MU,fontWeight:600}}>Nombre: </span><strong>{selObj?selObj.nombre:''}</strong></div><div><span style={{color:MU,fontWeight:600}}>Compromiso: </span>{ppp.info?ppp.info.compromiso:'—'}</div></div></Card>{prs.length>0&&(<div style={{background:R+'08',border:'1.5px solid '+R+'33',borderRadius:10,padding:10,marginBottom:10}}><p style={{margin:'0 0 6px',fontWeight:700,fontSize:17}}>🎯 Áreas prioritarias</p>{prs.map(function(pr,i){return <div key={i} style={{fontSize:16,color:pr.puntaje==='1'?R:W,marginBottom:3}}>● <strong>{pr.sec}:</strong> {pr.item}</div>;})}</div>)}<p style={sH}>Autoevaluación</p>{SECCIONES_PPP.map(function(sec){var rows=(ppp.autoeval[sec.key]||[]).filter(function(r){return r.puntaje;});if(!rows.length)return null;return(<div key={sec.key} style={{marginBottom:10}}><p style={{fontSize:17,fontWeight:700,color:P,margin:'0 0 4px'}}>{sec.title}</p>{rows.map(function(row,i){return <div key={i} style={{display:'grid',gridTemplateColumns:'1fr 36px',alignItems:'center',padding:'6px 8px',borderBottom:'1px solid '+BO+'44',background:i%2===0?'#fff':P+'04'}}><span style={{fontSize:16,color:'#071F33',lineHeight:1.5}}>{row.item}</span><span style={{background:PCOL[row.puntaje]+'22',color:PCOL[row.puntaje],padding:'3px 0',borderRadius:8,fontWeight:700,fontSize:16,textAlign:'center',display:'block'}}>{row.puntaje}</span></div>;})}</div>);})}</div>)}</div>);}
function VGAsist(p){var evs=p.evs,mb=p.mb;if(!evs.length)return(<div style={{textAlign:'center',padding:32,color:MU}}><div style={{fontSize:39}}>📆</div><p>No hay eventos registrados.</p></div>);return(<div>{evs.slice().sort(function(a,b){return (b.fecha||'').localeCompare(a.fecha||'');}).map(function(ev){return(<Card key={ev.id} style={{marginBottom:10}}><div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}><div><p style={{margin:0,fontWeight:700,fontSize:18}}>{ev.nombre}</p><p style={{margin:'2px 0 0',fontSize:16,color:MU}}>{fmt(ev.fecha)}</p></div><span style={{background:P+'22',color:P,fontSize:16,padding:'2px 8px',borderRadius:20,fontWeight:600}}>{(ev.asistentes||[]).length}/{mb.length}</span></div><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:5}}>{mb.map(function(m){var ok3=(ev.asistentes||[]).includes(m.id);return <div key={m.id} style={{fontSize:16,padding:'3px 6px',borderRadius:6,background:ok3?G+'15':R+'08',color:ok3?G:R,display:'flex',alignItems:'center',gap:4}}><span>{ok3?'✅':'❌'}</span><span style={{fontWeight:ok3?700:400}}>{m.nombre.split(' ')[0]}</span></div>;})} </div></Card>);})}</div>);}
function VGReuniones(p){var rpMtgs=p.meetings.filter(function(m){return m.rpId===p.rpId;}).sort(function(a,b){return (b.fecha||'').localeCompare(a.fecha||'');});if(!rpMtgs.length)return(<div style={{textAlign:'center',padding:32,color:MU}}><div style={{fontSize:39}}>📅</div><p>No hay reuniones registradas.</p></div>);var hechas=rpMtgs.filter(function(m){return m.realizada;});var pend=rpMtgs.filter(function(m){return !m.realizada;});return(<div>{pend.length>0&&(<div style={{marginBottom:12}}><p style={{fontSize:17,fontWeight:700,color:P,margin:'0 0 6px'}}>PROGRAMADAS</p>{pend.map(function(m){return <Card key={m.id} style={{marginBottom:6}}><div style={{display:'flex',justifyContent:'space-between'}}><div><p style={{margin:0,fontWeight:600,fontSize:18}}>{m.miembroNombre}</p><p style={{margin:'2px 0 0',fontSize:16,color:MU}}>{fmt(m.fecha)}</p></div><span style={{background:W+'22',color:W,fontSize:16,padding:'2px 8px',borderRadius:20,fontWeight:600}}>Pendiente</span></div></Card>;})}</div>)}{hechas.length>0&&(<div><p style={{fontSize:17,fontWeight:700,color:P,margin:'0 0 6px'}}>REALIZADAS</p>{hechas.map(function(m){return <Card key={m.id} style={{marginBottom:6}}><div style={{display:'flex',justifyContent:'space-between'}}><div><p style={{margin:0,fontWeight:600,fontSize:18}}>{m.miembroNombre}</p><p style={{margin:'2px 0 0',fontSize:16,color:MU}}>{fmt(m.fechaReal)}</p></div><span style={{background:G+'22',color:G,fontSize:16,padding:'2px 8px',borderRadius:20,fontWeight:600}}>✓</span></div></Card>;})}</div>)}</div>);}
function ViewGrupo(p){
  var group=p.group,rpId=p.rpId,rpNombre=p.rpNombre;
  var allPlans=p.allPlans||{},allAtt=p.allAtt||{},meetings=p.meetings||[];
  var plans=allPlans[rpId]||{ppg:{},miembros:{}};
  var att=allAtt[rpId]||{eventos:[]};
  var mb=group.miembros||[];
  var mbPPG=mb.filter(function(m){return!(m.rpOverride&&m.rpOverride===rpId);});
  if(p.addSelf)mbPPG=mbPPG.concat([{id:rpId,nombre:rpNombre}]);
  var evs=(att.eventos||[]).filter(function(e){return e.gId===group.id;});
  var semR=meetings.filter(function(m){return m.rpId===rpId&&m.semestre===CSEM&&m.realizada;});
  var [tab,setTab]=useState('hermanos');
  var TABS=[{id:'hermanos',lb:'👥 Hermanos'},{id:'ppg',lb:'📋 PPG'},{id:'ppp',lb:'📝 PPP'},{id:'asist',lb:'✅ Asistencia'},{id:'reuniones',lb:'📅 Reuniones'},{id:'supgp',lb:'👁 Visita GP'},{id:'suprp',lb:'👤 Sup. RP'}];
  return (
    <div style={{fontFamily:'system-ui'}}>
      <div style={{background:P,color:'#fff',padding:'14px 16px 10px'}}><button onClick={p.onBack} style={{background:'none',border:'none',color:'#ffffffcc',cursor:'pointer',fontSize:17,padding:'0 0 6px 0',display:'block'}}>← Volver al Panel</button><h2 style={{margin:0,fontSize:20,fontWeight:700}}>{group.nombre}</h2><p style={{margin:'3px 0 0',fontSize:16,opacity:0.8}}>RP: {rpNombre} · Sector {group.sector}</p></div>
      <div style={{background:CA,borderBottom:'1px solid '+BO,display:'flex',overflowX:'auto'}}>{TABS.map(function(t){return <button key={t.id} onClick={function(){setTab(t.id);}} style={{flex:'0 0 auto',padding:'10px 12px',border:'none',background:'transparent',cursor:'pointer',fontSize:16,fontWeight:tab===t.id?700:400,color:tab===t.id?P:MU,borderBottom:tab===t.id?'2.5px solid '+P:'2.5px solid transparent',whiteSpace:'nowrap'}}>{t.lb}</button>;})}</div>
      <div style={{padding:'14px 14px 100px'}}>
        {tab==='hermanos'&&<VGHermanos mb={mb} semR={semR} evs={evs} plans={plans}/>}
        {tab==='ppg'&&<VGPpg ppg={plans.ppg||{}} mb={mbPPG}/>}
        {tab==='ppp'&&<VGPpp mb={mb} plans={plans}/>}
        {tab==='asist'&&<VGAsist evs={evs} mb={mb}/>}
        {tab==='reuniones'&&<VGReuniones meetings={meetings} rpId={rpId}/>}
        {tab==='supgp'&&<SupGPForm data={(p.allSupForms||{})[rpId]&&(p.allSupForms||{})[rpId][p.sem||CSEM]?((p.allSupForms||{})[rpId])[p.sem||CSEM].supGP:null} readOnly={p.readOnly} sem={p.sem||CSEM} onSave={function(d){if(p.onSaveSupForm)p.onSaveSupForm(rpId,p.sem||CSEM,'supGP',d);}}/>}
        {tab==='suprp'&&<SupRPForm data={(p.allSupForms||{})[rpId]&&(p.allSupForms||{})[rpId][p.sem||CSEM]?((p.allSupForms||{})[rpId])[p.sem||CSEM].supRP:null} miembros={mbPPG} readOnly={p.readOnly} sem={p.sem||CSEM} rpNombre={rpNombre} onSave={function(d){if(p.onSaveSupForm)p.onSaveSupForm(rpId,p.sem||CSEM,'supRP',d);}}/>}
      </div>
    </div>
  );
}

// ─── MIS CITAS DE SUPERVISIÓN (vista del Supervisor como supervisado) ────────
function MiSupervision(p){
  var user=p.user,supMtgs=p.supMeetings||[],dynUsers=p.users||USERS;
  var sem=p.sem||CSEM;
  var sint=((p.allSupForms||{})[user.id]||{})[sem];
  sint=sint&&sint.supRP&&sint.supRP.sintesis?sint.supRP.sintesis:null;
  var myMtgs=supMtgs.filter(function(m){return m.rpId===user.id;}).sort(function(a,b){return (a.fecha||'').localeCompare(b.fecha||'');});
  var upcoming=myMtgs.filter(function(m){return !m.realizada;});
  var past=myMtgs.filter(function(m){return m.realizada;}).reverse();
  function getTipo(id){return TIPOS_SUP.find(function(t){return t.id===id;})||TIPOS_SUP[0];}
  function supLabel(m){var u=dynUsers.find(function(x){return x.id===m.supId;});return u?u.nombre:m.partNombre||'—';}
  return(
    <div style={{padding:'20px 16px 100px',fontFamily:'system-ui'}}>
      <h2 style={{color:'#1A6FA8',fontSize:21,fontWeight:700,margin:'0 0 2px'}}>👁 Mis Citas de Supervisión</h2>
      <p style={{color:MU,fontSize:17,margin:'0 0 14px'}}>{user.nombre} · {CSEM} · citas que te han agendado</p>
      {sint&&(sint.areasCrec||sint.pautas||sint.compromisos)&&(
        <div style={{background:'#EDF2FF',border:'1.5px solid #AED6F1',borderRadius:12,padding:'14px 16px',marginBottom:18}}>
          <p style={{margin:'0 0 10px',fontWeight:700,fontSize:17,color:P}}>📌 Mi Síntesis de Supervisión — {sem}</p>
          {sint.areasCrec&&(<div style={{marginBottom:8}}><div style={{fontSize:15,fontWeight:700,color:P,marginBottom:2}}>🔹 Áreas de crecimiento como pastor/a</div><div style={{fontSize:16,color:'#2D3748',lineHeight:1.5}}>{sint.areasCrec}</div></div>)}
          {sint.pautas&&(<div style={{marginBottom:8}}><div style={{fontSize:15,fontWeight:700,color:P,marginBottom:2}}>📌 Pautas pastorales</div><div style={{fontSize:16,color:'#2D3748',lineHeight:1.5}}>{sint.pautas}</div></div>)}
          {sint.compromisos&&(<div><div style={{fontSize:15,fontWeight:700,color:G,marginBottom:2}}>✅ Compromisos</div><div style={{fontSize:16,color:'#2D3748',lineHeight:1.5}}>{sint.compromisos}</div></div>)}
        </div>
      )}
      {myMtgs.length===0&&(<div style={{background:CA,borderRadius:12,padding:32,textAlign:'center',color:MU,border:'1.5px solid '+BO}}><div style={{fontSize:39}}>🔄</div><p style={{fontSize:18,margin:'8px 0 0'}}>Aún no tienes citas de supervisión agendadas.</p></div>)}
      {upcoming.length>0&&(<div style={{marginBottom:16}}><p style={{fontSize:17,fontWeight:700,color:P,margin:'0 0 8px'}}>PRÓXIMAS ({upcoming.length})</p>{upcoming.map(function(m){var t=getTipo(m.tipo);return(<div key={m.id} style={{background:CA,borderRadius:12,padding:'12px 14px',marginBottom:8,border:'1.5px solid '+t.color+'44'}}><div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4}}><span style={{fontSize:21}}>{t.icon}</span><span style={{background:t.color+'22',color:t.color,fontSize:16,padding:'2px 8px',borderRadius:20,fontWeight:700}}>{t.label}</span></div><p style={{margin:0,fontSize:18,fontWeight:600,color:'#071F33'}}>{supLabel(m)}</p><p style={{margin:'3px 0 0',fontSize:16,color:MU}}>{fmt(m.fecha)}{m.hora?' · '+m.hora:''}{m.modalidad?' · '+m.modalidad:''}</p>{m.notas&&<p style={{margin:'5px 0 0',fontSize:16,color:MU,fontStyle:'italic'}}>"{m.notas}"</p>}</div>);})}</div>)}
      {past.length>0&&(<div><p style={{fontSize:17,fontWeight:700,color:P,margin:'0 0 8px'}}>REALIZADAS ({past.length})</p>{past.map(function(m){var t=getTipo(m.tipo);return(<div key={m.id} style={{background:CA,borderRadius:12,padding:'12px 14px',marginBottom:8,border:'1.5px solid '+BO,opacity:0.85}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}><div><div style={{display:'flex',alignItems:'center',gap:6,marginBottom:4}}><span style={{fontSize:18}}>{t.icon}</span><span style={{background:t.color+'22',color:t.color,fontSize:16,padding:'2px 8px',borderRadius:20,fontWeight:700}}>{t.label}</span></div><p style={{margin:0,fontSize:17,fontWeight:600}}>{supLabel(m)}</p><p style={{margin:'2px 0 0',fontSize:16,color:MU}}>{fmt(m.fechaReal||m.fecha)}</p>{m.notasReunion&&<p style={{margin:'4px 0 0',fontSize:16,color:MU,fontStyle:'italic'}}>"{m.notasReunion}"</p>}{m.pautas&&<div style={{margin:'6px 0 0',padding:'6px 8px',background:P+'10',borderRadius:6,fontSize:16}}><strong style={{color:P}}>Pautas: </strong>{m.pautas}</div>}</div><span style={{background:G+'22',color:G,fontSize:16,padding:'2px 8px',borderRadius:20,fontWeight:600,whiteSpace:'nowrap'}}>✓</span></div></div>);})}</div>)}
    </div>
  );
}

// ─── SUPERVISIÓN ─────────────────────────────────────────────────────────────
function Supervision(p){
  var user=p.user,meetings=p.meetings||[],allPlans=p.allPlans||{},allAtt=p.allAtt||{};
  var dynUsers=p.users||USERS,dynGroups=p.groups||GROUPS;
  var admin=isAdmin(user),role=mrole(user);
  var isRp=role==='rp';
  var [tab,setTab]=useState(isRp?'cadena':(p.initTab||'panel'));
  var [sector,setSector]=useState(user.sector||'San Miguel');
  var [verGrupo,setVerGrupo]=useState(null);
  var semR=meetings.filter(function(m){return m.semestre===CSEM&&m.realizada;});
  var rps=dynUsers.filter(function(u){return u.roles&&u.roles.includes('responsable')&&u.activo!==false;});
  if(role==='sup')rps=rps.filter(function(u){return u.supId===user.id;});
  else if(role==='cds')rps=rps.filter(function(u){return u.sector===user.sector;});
  else if(admin)rps=rps.filter(function(u){return u.sector===sector;});
  // Para RS: añadir también usuarios sin rol 'responsable' que tienen miembros con rpOverride apuntando a ellos
  if(hasR(user,'responsable_sector')||admin){
    var checkSector=admin?sector:user.sector;
    var extraRPs=[];
    dynGroups.forEach(function(g){g.miembros.forEach(function(m){if(m.rpOverride){var rpU=dynUsers.find(function(u){return u.id===m.rpOverride;});if(rpU&&rpU.activo!==false&&rpU.sector===checkSector&&!rps.some(function(r){return r.id===rpU.id;})&&!extraRPs.some(function(r){return r.id===rpU.id;}))extraRPs.push(rpU);}});});
    rps=rps.concat(extraRPs);
  }
  function st(rp){
    var g=dynGroups.find(function(x){return x.rpId===rp.id;});
    var overrideMb=[];
    dynGroups.forEach(function(gr){gr.miembros.forEach(function(m){if(m.rpOverride===rp.id&&(!g||gr.id!==g.id))overrideMb.push(m);});});
    if(!g&&overrideMb.length===0)return{mb:0,real:0,meta:0,pct:0,gn:'Sin grupo',noGP:true};
    var mbOwn=g?g.miembros.filter(function(m){return !m.rpOverride;}).length:0;
    var mb=mbOwn+overrideMb.length;
    var real=semR.filter(function(m){return m.rpId===rp.id;}).length,meta=mb*4;
    var gn=g?g.nombre:('Sin GP · '+overrideMb.map(function(m){return m.nombre.split(' ')[0];}).join(', '));
    return{mb:mb,real:real,meta:meta,pct:meta>0?Math.round(real/meta*100):0,gn:gn,noGP:!g};
  }
  var tM=rps.reduce(function(a,r){return a+st(r).meta;},0),tR=rps.reduce(function(a,r){return a+st(r).real;},0),gP=tM>0?Math.round(tR/tM*100):0;
  var [verSupForm,setVerSupForm]=useState(null);
  if(verGrupo){var vgROnly=!(user.id===verGrupo.rpId||dynUsers.some(function(u){return u.id===verGrupo.rpId&&u.supId===user.id;}));return <ViewGrupo group={verGrupo.group} rpId={verGrupo.rpId} rpNombre={verGrupo.rpNombre} allPlans={allPlans} allAtt={allAtt} meetings={meetings} addSelf={dynGroups.some(function(g){return g.id!==verGrupo.group.id&&g.miembros.some(function(m){return m.userId===verGrupo.rpId;});})} onBack={function(){setVerGrupo(null);}} allSupForms={p.allSupForms||{}} onSaveSupForm={p.onSaveSupForm} readOnly={vgROnly} sem={p.sem||CSEM}/>;}
  if(verSupForm){
    var sfRpId=verSupForm.rpId;
    var sfSem=p.sem||CSEM;
    var sfGrp=dynGroups.find(function(g){return g.rpId===sfRpId;});
    var sfMb=sfGrp?sfGrp.miembros.filter(function(m){return !m.rpOverride;}):[];
    var sfForms=(p.allSupForms||{})[sfRpId]&&(p.allSupForms||{})[sfRpId][sfSem]?((p.allSupForms||{})[sfRpId])[sfSem]:{};
    return(
      <div style={{fontFamily:'system-ui'}}>
        <div style={{background:P,color:'#fff',padding:'14px 16px 10px'}}>
          <button onClick={function(){setVerSupForm(null);}} style={{background:'none',border:'none',color:'#ffffffcc',cursor:'pointer',fontSize:17,padding:'0 0 6px 0',display:'block'}}>← Volver</button>
          <h2 style={{margin:0,fontSize:20,fontWeight:700}}>{verSupForm.tipo==='supGP'?'📊 Supervisión al GP':'👤 Supervisión al RP'}</h2>
          <p style={{margin:'3px 0 0',fontSize:16,opacity:0.8}}>RP: {verSupForm.rpNombre}{verSupForm.groupNombre?' · '+verSupForm.groupNombre:''}</p>
          <div style={{marginTop:8}}><Btn small variant='accent' onClick={function(){printSupervision(verSupForm.rpNombre,verSupForm.groupNombre||'',sfForms.supRP,sfForms.supGP,sfMb,sfSem);}}>⬇️ Imprimir Supervisión</Btn></div>
        </div>
        <div style={{padding:'14px 14px 100px'}}>
          {verSupForm.tipo==='supGP'&&<SupGPForm data={sfForms.supGP} readOnly={verSupForm.readOnly} sem={sfSem} onSave={function(d){if(p.onSaveSupForm)p.onSaveSupForm(sfRpId,sfSem,'supGP',d);}}/>}
          {verSupForm.tipo==='supRP'&&<SupRPForm data={sfForms.supRP} miembros={sfMb} readOnly={verSupForm.readOnly} sem={sfSem} rpNombre={verSupForm.rpNombre} onSave={function(d){if(p.onSaveSupForm)p.onSaveSupForm(sfRpId,sfSem,'supRP',d);}}/>}
        </div>
      </div>
    );
  }
  var TABS=isRp?[{id:'cadena',lb:'🔄 Mis Reuniones'}]:[{id:'panel',lb:'📊 Panel'},{id:'cadena',lb:'🔄 Ciclo de Supervisión'}];
  return (
    <div style={{fontFamily:'system-ui'}}>
      <div style={{background:P,color:'#fff',padding:'16px 16px 0'}}>
        <h2 style={{margin:'0 0 12px',fontSize:21,fontWeight:700}}>👁 Supervisión</h2>
        <div style={{display:'flex',gap:0}}>{TABS.map(function(t){return(<button key={t.id} onClick={function(){setTab(t.id);}} style={{padding:'8px 16px',border:'none',background:'transparent',cursor:'pointer',fontSize:17,fontWeight:tab===t.id?700:400,color:tab===t.id?'#fff':'#ffffffaa',borderBottom:tab===t.id?'2.5px solid #fff':'2.5px solid transparent'}}>{t.lb}</button>);})}</div>
      </div>
      {tab==='panel'&&(
        <div style={{padding:'16px 16px 100px'}}>
          <p style={{color:MU,fontSize:17,margin:'0 0 12px'}}>{user.nombre} · {CSEM}</p>
          {admin&&(<div style={{marginBottom:12}}><div style={{fontSize:16,color:MU,fontWeight:700,marginBottom:5}}>SECTOR</div><div style={{display:'flex',gap:8,flexWrap:'wrap'}}>{['San Miguel','Nazaret'].map(function(s){return <Btn key={s} small variant={sector===s?'primary':'outline'} onClick={function(){setSector(s);}}>{s}</Btn>;})}<Btn small variant='accent' onClick={function(){printReporte(sector,rps,dynGroups,meetings,allPlans,allAtt);}}>⬇️ Reporte semestral</Btn></div></div>)}
          {!admin&&(role==='sup'||role==='cds')&&(<div style={{marginBottom:12,textAlign:'right'}}><Btn small variant='accent' onClick={function(){printReporte(user.sector||'Sector',rps,dynGroups,meetings,allPlans,allAtt);}}>⬇️ Reporte semestral</Btn></div>)}
          <Card style={{marginBottom:14}}><p style={{margin:'0 0 8px',fontWeight:700,fontSize:18}}>{admin?'Sector '+sector:role==='sup'?'Mi Cadena':'Sector '+user.sector}</p><div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10,textAlign:'center',marginBottom:8}}><div><div style={{fontSize:27,fontWeight:700,color:P}}>{rps.length}</div><div style={{fontSize:15,color:MU}}>Responsables</div></div><div><div style={{fontSize:27,fontWeight:700,color:G}}>{tR}</div><div style={{fontSize:15,color:MU}}>Realizadas</div></div><div><div style={{fontSize:27,fontWeight:700,color:A}}>{gP}%</div><div style={{fontSize:15,color:MU}}>Meta global</div></div></div><Bar val={tR} max={tM||1} color={gP>=80?G:gP>=50?A:R}/></Card>
          <p style={{fontSize:18,fontWeight:700,color:'#0A3D62',margin:'16px 0 8px',paddingBottom:4,borderBottom:'1px solid #0A3D6233'}}>🔄 MIS RESPONSABILIDADES DE SUPERVISIÓN</p>
          {(function(){var supMtgsList=p.supMeetings||[];return rps.map(function(rp){var s=st(rp),grp=dynGroups.find(function(x){return x.rpId===rp.id;});
            var cicloTipos=[{id:'sup_rp',ic:'👤',lb:'Sup. RP'},{id:'sup_gp',ic:'👥',lb:'Sup. GP'},{id:'retro1',ic:'🔄',lb:'Retro 1'},{id:'retro2',ic:'📋',lb:'Retro 2'}];
            var cicloStatus=cicloTipos.map(function(ct){
              var rpId2=ct.id==='retro1'?null:rp.id;
              var supIdChk=ct.id==='retro1'?rp.supId:null;
              var done=supMtgsList.some(function(sm){return sm.semestre===CSEM&&sm.tipo===ct.id&&sm.realizada&&(rpId2?sm.rpId===rpId2:sm.supId===supIdChk);});
              var pend=supMtgsList.some(function(sm){return sm.semestre===CSEM&&sm.tipo===ct.id&&!sm.realizada&&(rpId2?sm.rpId===rpId2:sm.supId===supIdChk);});
              return{id:ct.id,ic:ct.ic,lb:ct.lb,done:done,pend:pend};
            });
            return(<Card key={rp.id} style={{marginBottom:10}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:6}}><div><p style={{margin:0,fontWeight:700,fontSize:18}}>{rp.nombre}</p><p style={{margin:'2px 0 0',fontSize:16,color:MU}}>{s.gn} · {s.mb} hermanos/as</p></div><div style={{textAlign:'right'}}><div style={{fontSize:20,fontWeight:700,color:s.pct>=100?G:s.pct>=50?W:R}}>{s.pct}%</div><div style={{fontSize:15,color:MU}}>{s.real}/{s.meta} PP</div></div></div><Bar val={s.real} max={s.meta||1} color={s.pct>=100?G:s.pct>=50?A:R}/><div style={{display:'flex',gap:4,flexWrap:'wrap',marginTop:8}}>{cicloStatus.map(function(cs){return(<span key={cs.id} style={{fontSize:13,padding:'2px 8px',borderRadius:20,fontWeight:600,background:cs.done?G+'22':cs.pend?W+'22':BO+'88',color:cs.done?G:cs.pend?W:MU,whiteSpace:'nowrap'}}>{cs.ic} {cs.done?'✓ ':cs.pend?'⏳ ':'— '}{cs.lb}</span>);})}</div>{grp&&<div style={{marginTop:8,display:'flex',gap:6,flexWrap:'wrap'}}><Btn small variant='outline' onClick={function(){setVerGrupo({rpId:rp.id,rpNombre:rp.nombre,group:grp});}}>📂 Ver grupo</Btn>{(role==='sup'||role==='cds'||role==='admin')&&<Btn small variant='outline' style={{borderColor:A,color:A}} onClick={function(){var rOnly4=!(user.id===rp.supId);setVerSupForm({rpId:rp.id,rpNombre:rp.nombre,groupNombre:grp.nombre,tipo:'supRP',readOnly:rOnly4});}}>👤 Sup. RP</Btn>}{(role==='sup'||role==='cds'||role==='admin')&&<Btn small variant='outline' style={{borderColor:'#154E78',color:'#154E78'}} onClick={function(){var rOnly3=!(user.id===rp.supId);setVerSupForm({rpId:rp.id,rpNombre:rp.nombre,groupNombre:grp.nombre,tipo:'supGP',readOnly:rOnly3});}}>👁 Visita GP</Btn>}</div>}</Card>);})})()}
        </div>
      )}
      {tab==='cadena'&&(<div style={{padding:'0 0 100px'}}><Cadena user={user} supMeetings={p.supMeetings} onAdd={p.onAddSup} onUpdate={p.onUpdSup} users={dynUsers} onOpenSupForm={function(rpId2,tipo){var grp2=dynGroups.find(function(g){return g.rpId===rpId2;});var rOnly2=!(user.id===rpId2||dynUsers.some(function(u){return u.id===rpId2&&u.supId===user.id;}));setVerSupForm({rpId:rpId2,rpNombre:(dynUsers.find(function(u){return u.id===rpId2;})||{}).nombre||'',groupNombre:grp2?grp2.nombre:'',tipo:tipo,readOnly:rOnly2});}}/></div>)}
    </div>
  );
}

// ─── ADMIN ───────────────────────────────────────────────────────────────────
function Admin(p){
  var users=p.users||[],groups=p.groups||[],user=p.user||{};
  // Sectores que este admin puede editar
  var editableSectors=(hasR(user,'coordinador_mayor')||hasR(user,'supervisor_cds'))?['San Miguel','Nazaret']:[user.sector].filter(Boolean);
  function canEditSector(sec){return editableSectors.includes(sec)||editableSectors.length===0;}
  var [tab,setTab]=useState('usuarios');
  var [filtSec,setFiltSec]=useState('Todos');
  var [editUId,setEditUId]=useState(null);
  var [fNombre,setFNombre]=useState('');
  var [fPin,setFPin]=useState('');
  var [fRol,setFRol]=useState('responsable');
  var [fSector,setFSector]=useState('San Miguel');
  var [fGenero,setFGenero]=useState('M');
  var [fSupId,setFSupId]=useState('');
  var [fActivo,setFActivo]=useState(true);
  var [showNewU,setShowNewU]=useState(false);
  var [editGId,setEditGId]=useState(null);
  var [gNombre,setGNombre]=useState('');
  var [gSector,setGSector]=useState('San Miguel');
  var [gRpId,setGRpId]=useState('');
  var [gMiembros,setGMiembros]=useState([]);
  var [gNuevoMb,setGNuevoMb]=useState('');
  var [showNewG,setShowNewG]=useState(false);
  var [saveOk,setSaveOk]=useState('');
  function flash(msg){setSaveOk(msg);setTimeout(function(){setSaveOk('');},2200);}
  function openEditU(u){setEditUId(u.id);setShowNewU(false);setFNombre(u.nombre);setFPin(u.pin);setFRol(getRolSimple(u));setFSector(u.sector||'');setFGenero(u.genero||'M');setFSupId(u.supId||'');setFActivo(u.activo!==false);}
  function cancelU(){setEditUId(null);setShowNewU(false);}
  function saveU(isNew){var ro=ROLE_OPTIONS.find(function(r){return r.id===fRol;})||ROLE_OPTIONS[6];var obj={id:isNew?uid():editUId,nombre:fNombre.trim(),pin:fPin.trim()||'0000',roles:ro.roles,sector:fSector||null,genero:fGenero,activo:fActivo};if(fRol==='responsable'&&fSupId)obj.supId=fSupId;if(isNew){p.onAddUser(obj);}else{p.onUpdUser(editUId,obj);}cancelU();flash(isNew?'✅ Usuario creado':'✅ Usuario actualizado');}
  function openNewU(){setShowNewU(true);setEditUId(null);setFNombre('');setFPin('');setFRol('responsable');setFSector('San Miguel');setFGenero('M');setFSupId('');setFActivo(true);}
  function openEditG(g){setEditGId(g.id);setShowNewG(false);setGNombre(g.nombre);setGSector(g.sector);setGRpId(g.rpId);setGMiembros(g.miembros?g.miembros.slice():[]);setGNuevoMb('');}
  function cancelG(){setEditGId(null);setShowNewG(false);}
  function saveG(isNew){var obj={id:isNew?uid():editGId,nombre:gNombre.trim(),sector:gSector,rpId:gRpId,miembros:gMiembros};if(isNew){p.onAddGroup(obj);}else{p.onUpdGroup(editGId,obj);}cancelG();flash(isNew?'✅ Grupo creado':'✅ Grupo actualizado');}
  function openNewG(){setShowNewG(true);setEditGId(null);setGNombre('');setGSector('San Miguel');setGRpId('');setGMiembros([]);setGNuevoMb('');}
  function addMbToGroup(){if(!gNuevoMb.trim())return;setGMiembros(gMiembros.concat([{id:'m'+uid(),nombre:gNuevoMb.trim()}]));setGNuevoMb('');}
  function removeMb(idx){setGMiembros(gMiembros.filter(function(_,i){return i!==idx;}));}
  var rps=users.filter(function(u){return u.roles&&u.roles.includes('responsable')&&u.activo!==false;});
  var sups=users.filter(function(u){return u.roles&&u.roles.includes('supervisor')&&u.activo!==false;});
  var filtUsers=filtSec==='Todos'?users:users.filter(function(u){return u.sector===filtSec;});
  var filtGroups=filtSec==='Todos'?groups:groups.filter(function(g){return g.sector===filtSec;});
  var rolLabel=function(u){var r=ROLE_OPTIONS.find(function(ro){return ro.id===getRolSimple(u);});return r?r.label:'—';};
  var sH={fontSize:18,fontWeight:700,color:P,margin:'0 0 12px',paddingBottom:4,borderBottom:'2px solid '+P+'33'};
  var TABS=[{id:'usuarios',lb:'👤 Usuarios'},{id:'grupos',lb:'👥 Grupos'}].concat(hasR(user,'supervisor_cds')?[{id:'periodos',lb:'📅 Periodos'}]:[]);
  // ── PERIODOS STATE ──────────────────────────────────────────────────────────
  var [pLabel,setPLabel]=useState('');
  var [pStart,setPStart]=useState(TODAY);
  var [showNewP,setShowNewP]=useState(false);
  var [pConfirm,setPConfirm]=useState(false);
  var periods=p.periods||[];
  var activePeriod=p.activePeriod||CSEM;
  var pendingPeriodId=p.pendingPeriodId||null;
  var activatedGPs=p.activatedGPs||{};
  var allRPs=(p.allUsers||users).filter(function(u){return u.roles&&u.roles.includes('responsable')&&u.activo!==false;});
  var activatedCount=allRPs.filter(function(u){return activatedGPs[u.id];}).length;
  function doCreatePeriod(){if(!pLabel.trim())return;if(p.onCreatePeriod)p.onCreatePeriod(pLabel.trim(),pStart);setShowNewP(false);setPLabel('');setPStart(TODAY);setPConfirm(false);flash('✅ Periodo "'+pLabel.trim()+'" creado y activo');}
  function PeriodosTab(){
    return(
      <div>
        {/* Periodo activo */}
        <Card style={{marginBottom:14,background:'#EBF8FF',border:'2px solid #1A6FA8'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <p style={{margin:0,fontWeight:700,fontSize:18,color:P}}>🟢 Periodo activo</p>
              <p style={{margin:'4px 0 0',fontSize:22,fontWeight:800,color:'#071F33'}}>{activePeriod}</p>
            </div>
            {pendingPeriodId&&(
              <div style={{textAlign:'right'}}>
                <p style={{margin:0,fontSize:15,color:MU}}>RPs activados</p>
                <p style={{margin:'2px 0 0',fontSize:22,fontWeight:700,color:activatedCount===allRPs.length?G:W}}>{activatedCount}/{allRPs.length}</p>
              </div>
            )}
          </div>
          {pendingPeriodId&&activatedCount<allRPs.length&&(
            <div style={{marginTop:12,padding:'10px 12px',background:'#fff8e1',borderRadius:8,border:'1px solid #ECC94B'}}>
              <p style={{margin:'0 0 6px',fontWeight:700,fontSize:16,color:'#7D5A00'}}>⏳ Transición en curso — RPs pendientes de activar su PPG:</p>
              {allRPs.filter(function(u){return !activatedGPs[u.id];}).map(function(u){return(<div key={u.id} style={{fontSize:16,color:'#7D5A00',padding:'2px 0'}}>• {u.nombre}</div>);})}
              <button onClick={function(){if(p.onClearPending)p.onClearPending();flash('✅ Transición finalizada');}} style={{marginTop:8,background:'#0A3D62',border:'none',borderRadius:7,color:'#fff',fontWeight:700,fontSize:16,padding:'6px 14px',cursor:'pointer'}}>Finalizar transición (ignorar pendientes)</button>
            </div>
          )}
          {pendingPeriodId&&activatedCount===allRPs.length&&(
            <p style={{margin:'10px 0 0',fontSize:16,color:G,fontWeight:700}}>✅ Todos los RPs han activado su PPG. <button onClick={function(){if(p.onClearPending)p.onClearPending();}} style={{background:'none',border:'none',color:G,fontWeight:700,fontSize:16,cursor:'pointer',textDecoration:'underline'}}>Cerrar transición</button></p>
          )}
        </Card>
        {/* Historial de periodos */}
        <p style={{fontSize:17,fontWeight:700,color:P,margin:'0 0 8px'}}>HISTORIAL DE PERIODOS</p>
        {periods.slice().reverse().map(function(per){
          var isAct=per.id===activePeriod;
          var statusCol=per.status==='active'?G:per.status==='pending'?W:MU;
          var statusLb=per.status==='active'?'Activo':per.status==='pending'?'Pendiente':'Cerrado';
          return(
            <Card key={per.id} style={{marginBottom:8,border:isAct?'2px solid '+G:undefined}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div>
                  <p style={{margin:0,fontWeight:700,fontSize:18}}>{per.id}</p>
                  {per.label&&per.label!==per.id&&<p style={{margin:'2px 0 0',fontSize:16,color:MU}}>{per.label}</p>}
                  <p style={{margin:'2px 0 0',fontSize:15,color:MU}}>Inicio: {per.startDate||'—'}</p>
                </div>
                <span style={{background:statusCol+'22',color:statusCol,fontSize:15,padding:'3px 10px',borderRadius:20,fontWeight:700}}>{statusLb}</span>
              </div>
            </Card>
          );
        })}
        {/* Crear nuevo periodo */}
        {!showNewP&&(
          <Btn variant='success' style={{width:'100%',marginTop:8}} onClick={function(){setShowNewP(true);setPConfirm(false);}}>+ Nuevo periodo semestral</Btn>
        )}
        {showNewP&&(
          <Card style={{marginTop:12,border:'2px solid '+G}}>
            <p style={sH}>Nuevo periodo</p>
            <div style={{marginBottom:10}}>
              <div style={{fontSize:16,color:MU,fontWeight:600,marginBottom:3}}>ID del periodo * <span style={{fontWeight:400,fontSize:14}}>(ej: 2026-S2)</span></div>
              <input value={pLabel} onChange={function(e){setPLabel(e.target.value);setPConfirm(false);}} style={inp()} placeholder='2026-S2'/>
            </div>
            <div style={{marginBottom:14}}>
              <div style={{fontSize:16,color:MU,fontWeight:600,marginBottom:3}}>Fecha de inicio</div>
              <input type='date' value={pStart} onChange={function(e){setPStart(e.target.value);}} style={inp()}/>
            </div>
            {!pConfirm&&pLabel&&(
              <div style={{background:'#FFF5F5',border:'1.5px solid #FC8181',borderRadius:8,padding:12,marginBottom:12}}>
                <p style={{margin:'0 0 8px',fontWeight:700,fontSize:17,color:R}}>⚠️ Confirmar creación</p>
                <p style={{margin:'0 0 8px',fontSize:16,color:'#742A2A'}}>Crear el periodo <strong>{pLabel}</strong> marcará el periodo actual (<strong>{activePeriod}</strong>) como cerrado. Todos los RPs verán el banner de activación. ¿Deseas continuar?</p>
                <div style={{display:'flex',gap:8}}>
                  <Btn small variant='danger' onClick={function(){setPConfirm(true);}}>Sí, crear periodo</Btn>
                  <Btn small variant='ghost' onClick={function(){setShowNewP(false);}}>Cancelar</Btn>
                </div>
              </div>
            )}
            {pConfirm&&(
              <div style={{display:'flex',gap:8}}>
                <Btn small variant='success' onClick={doCreatePeriod}>💾 Crear y activar</Btn>
                <Btn small variant='ghost' onClick={function(){setShowNewP(false);setPConfirm(false);}}>Cancelar</Btn>
              </div>
            )}
            {!pLabel&&<p style={{fontSize:15,color:MU,fontStyle:'italic'}}>Escribe el ID del periodo para continuar.</p>}
          </Card>
        )}
        {/* Metas PPC */}
        <p style={{fontSize:17,fontWeight:700,color:P,margin:'20px 0 8px',paddingBottom:4,borderBottom:'2px solid '+P+'33'}}>📌 Metas del Plan Pastoral Comunitario (PPC)</p>
        <p style={{fontSize:15,color:MU,margin:'0 0 10px'}}>Estas metas se muestran en el PPG de todos los RPs. Actualízalas cuando cambien al inicio de cada año.</p>
        {(p.ppcGoals||PPC_GOALS_DEFAULT).map(function(g,i){return(
          <Card key={i} style={{marginBottom:8}}>
            <div style={{fontSize:15,color:MU,fontWeight:600,marginBottom:4}}>Meta {i+1}</div>
            <div style={{display:'flex',gap:8,alignItems:'center'}}>
              <textarea value={g} onChange={function(e){var n=(p.ppcGoals||[]).slice();n[i]=e.target.value;if(p.onSetPpcGoals)p.onSetPpcGoals(n);}} style={inp({flex:1,minHeight:48,resize:'vertical',fontSize:16})}/>
            </div>
          </Card>
        );})}
      </div>
    );
  }
  function UserForm(isNew){return(<Card style={{marginBottom:14,border:'2px solid '+(isNew?G:P)}}><p style={sH}>{isNew?'Nuevo Usuario':'Editando: '+fNombre}</p><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:10}}><div><div style={{fontSize:16,color:MU,fontWeight:600,marginBottom:3}}>Nombre *</div><input value={fNombre} onChange={function(e){setFNombre(e.target.value);}} style={inp()} placeholder='Nombre completo'/></div><div><div style={{fontSize:16,color:MU,fontWeight:600,marginBottom:3}}>PIN</div><input value={fPin} onChange={function(e){setFPin(e.target.value);}} style={inp()} placeholder='0000' maxLength={4}/></div><div><div style={{fontSize:16,color:MU,fontWeight:600,marginBottom:3}}>Rol *</div><select value={fRol} onChange={function(e){setFRol(e.target.value);}} style={inp()}>{ROLE_OPTIONS.map(function(r){return <option key={r.id} value={r.id}>{r.label}</option>;})}</select></div><div><div style={{fontSize:16,color:MU,fontWeight:600,marginBottom:3}}>Sector</div><select value={fSector} onChange={function(e){setFSector(e.target.value);}} style={inp()}><option value=''>Sin sector</option><option>San Miguel</option><option>Nazaret</option></select></div><div><div style={{fontSize:16,color:MU,fontWeight:600,marginBottom:3}}>Género</div><select value={fGenero} onChange={function(e){setFGenero(e.target.value);}} style={inp()}><option value='M'>Masculino</option><option value='F'>Femenino</option></select></div>{fRol==='responsable'&&(<div><div style={{fontSize:16,color:MU,fontWeight:600,marginBottom:3}}>Supervisor/a</div><select value={fSupId} onChange={function(e){setFSupId(e.target.value);}} style={inp()}><option value=''>— Sin asignar —</option>{sups.filter(function(u){return !fSector||u.sector===fSector;}).map(function(u){return <option key={u.id} value={u.id}>{u.nombre}</option>;})}</select></div>)}{!isNew&&(<div style={{display:'flex',alignItems:'center',gap:8}}><input type='checkbox' checked={fActivo} onChange={function(e){setFActivo(e.target.checked);}} id={'act'+editUId}/><label htmlFor={'act'+editUId} style={{fontSize:17,color:MU,cursor:'pointer'}}>Usuario activo</label></div>)}</div><div style={{display:'flex',gap:8}}><Btn small variant='success' onClick={function(){saveU(isNew);}}>💾 {isNew?'Crear':'Guardar'}</Btn><Btn small variant='ghost' onClick={cancelU}>Cancelar</Btn></div></Card>);}
  function GroupForm(isNew){return(<Card style={{marginBottom:14,border:'2px solid '+(isNew?G:P)}}><p style={sH}>{isNew?'Nuevo Grupo':'Editando: '+gNombre}</p><div style={{marginBottom:10}}><div style={{fontSize:16,color:MU,fontWeight:600,marginBottom:3}}>Nombre del grupo *</div><input value={gNombre} onChange={function(e){setGNombre(e.target.value);}} style={inp()} placeholder='Ej: Grupo San Pablo'/></div><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:12}}><div><div style={{fontSize:16,color:MU,fontWeight:600,marginBottom:3}}>Sector *</div><select value={gSector} onChange={function(e){setGSector(e.target.value);setGRpId('');}} style={inp()}><option>San Miguel</option><option>Nazaret</option></select></div><div><div style={{fontSize:16,color:MU,fontWeight:600,marginBottom:3}}>Responsable Pastoral *</div><select value={gRpId} onChange={function(e){setGRpId(e.target.value);}} style={inp()}><option value=''>— Selecciona —</option>{rps.filter(function(u){return u.sector===gSector;}).map(function(u){return <option key={u.id} value={u.id}>{u.nombre}</option>;})}</select></div></div><div style={{marginBottom:12}}><div style={{fontSize:16,color:MU,fontWeight:600,marginBottom:6}}>Miembros ({gMiembros.length})</div><div style={{maxHeight:160,overflowY:'auto',marginBottom:8}}>{gMiembros.map(function(m,i){return(<div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'5px 0',borderBottom:'1px solid '+BO+'55'}}><span style={{fontSize:17}}>{m.nombre}</span><button onClick={function(){removeMb(i);}} style={{background:'none',border:'none',color:R,cursor:'pointer',fontSize:18,padding:'0 4px'}}>✕</button></div>);})}{gMiembros.length===0&&<p style={{fontSize:16,color:MU,fontStyle:'italic',margin:'4px 0'}}>Sin miembros aún</p>}</div><div style={{display:'flex',gap:6}}><input value={gNuevoMb} onChange={function(e){setGNuevoMb(e.target.value);}} onKeyDown={function(e){if(e.key==='Enter')addMbToGroup();}} style={inp({flex:1})} placeholder='Nombre completo'/><Btn small onClick={addMbToGroup}>+ Agregar</Btn></div></div><div style={{display:'flex',gap:8}}><Btn small variant='success' onClick={function(){saveG(isNew);}}>💾 {isNew?'Crear':'Guardar'}</Btn><Btn small variant='ghost' onClick={cancelG}>Cancelar</Btn></div></Card>);}
  return (
    <div style={{fontFamily:'system-ui'}}>
      <div style={{background:'#071F33',color:'#fff',padding:'16px 16px 0'}}><h2 style={{margin:'0 0 4px',fontSize:21,fontWeight:700}}>⚙️ Administración</h2><p style={{margin:'0 0 4px',fontSize:16,opacity:0.6}}>Los cambios se mantienen durante la sesión activa</p><p style={{margin:'0 0 12px',fontSize:16,color:A,fontWeight:600}}>{editableSectors.length<2?'🔒 Sólo puedes editar: '+editableSectors.join(', '):'🔓 Acceso completo a todos los sectores'}</p><div style={{display:'flex',gap:0}}>{TABS.map(function(t){return(<button key={t.id} onClick={function(){setTab(t.id);}} style={{padding:'8px 16px',border:'none',background:'transparent',cursor:'pointer',fontSize:17,fontWeight:tab===t.id?700:400,color:tab===t.id?'#fff':'#ffffff88',borderBottom:tab===t.id?'2.5px solid '+A:'2.5px solid transparent'}}>{t.lb}</button>);})}</div></div>
      <div style={{padding:'16px 16px 100px'}}>
        {saveOk&&<div style={{background:'#F0FFF4',border:'1.5px solid #68D391',borderRadius:10,padding:12,marginBottom:12,textAlign:'center',fontWeight:700,color:G}}>{saveOk}</div>}
        {tab!=='periodos'&&<div style={{display:'flex',gap:8,marginBottom:14,flexWrap:'wrap'}}>{['Todos','San Miguel','Nazaret'].map(function(s){return <Btn key={s} small variant={filtSec===s?'primary':'outline'} onClick={function(){setFiltSec(s);}}>{s}</Btn>;})}</div>}
        {tab==='periodos'&&PeriodosTab()}
        {tab==='usuarios'&&(<div><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}><span style={{fontSize:18,color:MU}}>{filtUsers.length} usuario{filtUsers.length!==1?'s':''}</span>{editableSectors.length===2&&<Btn small variant='success' onClick={openNewU}>+ Nuevo usuario</Btn>}</div>{showNewU&&UserForm(true)}{filtUsers.map(function(u){var isEdit=editUId===u.id;return(<Card key={u.id} style={{marginBottom:8,opacity:u.activo===false?0.5:1,border:isEdit?'2px solid '+P:undefined}}>{isEdit?UserForm(false):(<div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}><div><p style={{margin:0,fontWeight:700,fontSize:18,color:u.activo===false?MU:'#071F33'}}>{u.nombre}{u.activo===false&&<span style={{fontSize:15,color:MU,fontWeight:400}}> — inactivo</span>}</p><p style={{margin:'2px 0 0',fontSize:16,color:MU}}>{rolLabel(u)}{u.sector?' · '+u.sector:''} · {u.genero==='M'?'Hombre':'Mujer'}</p>{u.supId&&<p style={{margin:'1px 0 0',fontSize:15,color:MU}}>Supervisor: {(users.find(function(x){return x.id===u.supId;})||{}).nombre||'—'}</p>}</div>{canEditSector(u.sector)&&<Btn small variant='outline' onClick={function(){openEditU(u);}}>✏️ Editar</Btn>}</div>)}</Card>);})}</div>)}
        {tab==='grupos'&&(<div><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}><span style={{fontSize:18,color:MU}}>{filtGroups.length} grupo{filtGroups.length!==1?'s':''}</span><Btn small variant='success' onClick={openNewG}>+ Nuevo grupo</Btn></div>{showNewG&&GroupForm(true)}{filtGroups.map(function(g){var isEdit=editGId===g.id;var rpUser=users.find(function(u){return u.id===g.rpId;});return(<Card key={g.id} style={{marginBottom:8,border:isEdit?'2px solid '+P:undefined}}>{isEdit?GroupForm(false):(<div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}><div><p style={{margin:0,fontWeight:700,fontSize:18}}>{g.nombre}</p><p style={{margin:'2px 0 0',fontSize:16,color:MU}}>Sector {g.sector} · RP: {rpUser?rpUser.nombre:'—'} · {g.miembros?g.miembros.length:0} miembros</p></div>{canEditSector(g.sector)&&<Btn small variant='outline' onClick={function(){openEditG(g);}}>✏️ Editar</Btn>}</div>)}</Card>);})}</div>)}
      </div>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
function labelPeriod(id){if(!id)return id;var parts=id.split('-');return parts[1]==='S1'?'Primer Semestre '+parts[0]:'Segundo Semestre '+parts[0];}
export default function App(){
  var [cu,setCu]=useState(null);
  var [sc,setSc]=useState('home');
  var [meetings,setMeetings]=useState([]);
  var [allPlans,setAllPlans]=useState({});
  var [allAtt,setAllAtt]=useState({});
  var [allSupForms,setAllSupForms]=useState({});
  function saveSupForm(rpId,sem,tipo,data){setAllSupForms(function(prev){var rpData=Object.assign({},prev[rpId]||{});var semData=Object.assign({},rpData[sem]||{});semData[tipo]=data;rpData[sem]=semData;return Object.assign({},prev,{[rpId]:rpData});});}
  var [supMtgs,setSupMtgs]=useState([]);
  var [agFor,setAgFor]=useState(null);
  var [dynUsers,setDynUsers]=useState(USERS.slice());
  var [dynGroups,setDynGroups]=useState(GROUPS.map(function(g){return Object.assign({},g,{miembros:g.miembros.slice()});}));
  var [supTab,setSupTab]=useState('panel');
  var [reporteHtml,setReporteHtml]=useState(null);
  var [reporteTitulo,setReporteTitulo]=useState('');
  // ── GESTIÓN DE PERIODOS ────────────────────────────────────────────────────
  var [periods,setPeriods]=useState([{id:CSEM,label:labelPeriod(CSEM),startDate:TODAY,status:'active'}]);
  var [activePeriod,setActivePeriod]=useState(CSEM);
  var [pendingPeriodId,setPendingPeriodId]=useState(null);
  var [activatedGPs,setActivatedGPs]=useState({});
  var [ppcGoals,setPpcGoals]=useState(PPC_GOALS_DEFAULT.slice());
  function createPeriod(id,startDate){
    if(!id)return;
    setPeriods(function(prev){return prev.map(function(p){return p.status==='active'?Object.assign({},p,{status:'closed'}):p;}).concat([{id:id,label:labelPeriod(id),startDate:startDate||TODAY,status:'active'}]);});
    setActivePeriod(id);
    setPendingPeriodId(id);
    setActivatedGPs({});
  }
  function activateGP(rpId){
    setActivatedGPs(function(prev){return Object.assign({},prev,{[rpId]:true});});
    setAllPlans(function(prev){
      var rp=Object.assign({},prev[rpId]||{ppg:{},miembros:{}});
      var oldPPG=rp.ppg||{};
      var anio=activePeriod?activePeriod.split('-')[0]:String(new Date().getFullYear());
      var newPPG=Object.assign({},oldPPG,{
        integ:(oldPPG.integ||[]).map(function(m){return Object.assign({},m);}),
        areas:(oldPPG.areas||[]).map(function(a){return Object.assign({},a);}),
        prog:{},reuniones:[],mesesProg:[],
        vigencia:oldPPG.vigencia||anio
      });
      return Object.assign({},prev,{[rpId]:Object.assign({},rp,{ppg:newPPG})});
    });
  }
  function clearPending(){setPendingPeriodId(null);}
  function goSup(tab){setSupTab(tab||'panel');setSc('sup');}
  React.useEffect(function(){regDlHTML(function(html,nombre){setReporteHtml(html);setReporteTitulo(nombre);});return function(){regDlHTML(null);};},[]); 

  if(!cu)return <Login users={dynUsers} onLogin={function(u){setCu(u);setSc('home');}}/>;
  
  if(reporteHtml)return(
    <div style={{position:'fixed',inset:0,background:'#fff',zIndex:999,display:'flex',flexDirection:'column'}}>
      <style dangerouslySetInnerHTML={{__html:'@media print{.kn-no-print{display:none!important}body{margin:0}}'}}/>
      <div className="kn-no-print" style={{background:P,color:'#fff',padding:'10px 16px',display:'flex',justifyContent:'space-between',alignItems:'center',flexShrink:0}}>
        <div style={{fontWeight:700,fontSize:18}}>📄 {reporteTitulo}</div>
        <div style={{display:'flex',gap:8}}>
          <button onClick={function(){window.print();}} style={{background:'#ffffff33',border:'none',color:'#fff',borderRadius:8,padding:'6px 14px',cursor:'pointer',fontWeight:700,fontSize:18}}>🖨️ Imprimir / PDF</button>
          <button onClick={function(){setReporteHtml(null);}} style={{background:'#ffffff33',border:'none',color:'#fff',borderRadius:8,padding:'6px 14px',cursor:'pointer',fontWeight:700,fontSize:18}}>✕ Cerrar</button>
        </div>
      </div>
      <div style={{flex:1,overflowY:'auto'}} dangerouslySetInnerHTML={{__html:reporteHtml}}/>
    </div>
  );

  var group=getEffectiveGroup(cu.id,dynGroups);
  var cuPlans=allPlans[cu.id]||{ppg:{},miembros:{}};
  var cuAtt=allAtt[cu.id]||{eventos:[]};

  function addM(m){setMeetings(function(prev){return prev.concat([m]);});}
  function updM(id,up){setMeetings(function(prev){return prev.map(function(m){return m.id===id?Object.assign({},m,up):m;});});}
  function addSM(m){setSupMtgs(function(prev){return prev.concat([m]);});}
  function updSM(id,up){setSupMtgs(function(prev){return prev.map(function(m){return m.id===id?Object.assign({},m,up):m;});});}
  function savePlan(type,mId,data){setAllPlans(function(prev){var rp=Object.assign({},prev[cu.id]||{ppg:{},miembros:{}});if(type==='ppg'){rp=Object.assign({},rp,{ppg:data});}else{var mb=Object.assign({},rp.miembros);mb[mId]=data;rp=Object.assign({},rp,{miembros:mb});}return Object.assign({},prev,{[cu.id]:rp});});}
  function syncPPGProg(miembroId,mes,fecha){setAllPlans(function(prev){var rp=Object.assign({},prev[cu.id]||{ppg:{},miembros:{}});var ppg=Object.assign({},rp.ppg||{});var prog=Object.assign({},ppg.prog||{});var mp=Object.assign({},prog[miembroId]||{});mp[mes]=fecha;prog[miembroId]=mp;var mesesP=(ppg.mesesProg&&ppg.mesesProg.length?ppg.mesesProg.slice():MESES_SEM.slice());if(!mesesP.includes(mes))mesesP=mesesP.concat([mes]);ppg=Object.assign({},ppg,{prog:prog,mesesProg:mesesP});rp=Object.assign({},rp,{ppg:ppg});return Object.assign({},prev,{[cu.id]:rp});});}
  function saveAtt(data){setAllAtt(function(prev){return Object.assign({},prev,{[cu.id]:data});});}
  function addUser(u){setDynUsers(function(prev){return prev.concat([u]);});}
  function updUser(id,up){setDynUsers(function(prev){return prev.map(function(u){return u.id===id?Object.assign({},u,up):u;});});}
  function addGroup(g){setDynGroups(function(prev){return prev.concat([g]);});}
  function updGroup(id,up){setDynGroups(function(prev){return prev.map(function(g){return g.id===id?Object.assign({},g,up):g;});});}

  var screens={
    home:     <Home user={cu} group={group} meetings={meetings} allPlans={allPlans} allAtt={allAtt} supMtgs={supMtgs} users={dynUsers} groups={dynGroups} go={setSc} goSup={goSup} sem={activePeriod} pendingPeriodId={pendingPeriodId} activatedGPs={activatedGPs} onActivateGP={activateGP}/>,
    grupo:    <MiGrupo user={cu} group={group} meetings={meetings} plans={cuPlans} att={cuAtt} allAtt={allAtt} savePlan={savePlan} saveAtt={saveAtt} go={setSc} setFor={setAgFor} users={dynUsers} groups={dynGroups} onAgendar={function(m){setAgFor(m);setSc('agendar');}} onRegistrar={function(m){setAgFor(m);setSc('registrar');}} sem={activePeriod} ppcGoals={ppcGoals}/>,
    agendar:  <Agendar user={cu} group={group} meetings={meetings} onAdd={addM} onSyncProg={syncPPGProg} agFor={agFor} setFor={setAgFor} go={setSc} users={dynUsers} sem={activePeriod}/>,
    registrar:<Registrar user={cu} meetings={meetings} onUpd={updM}/>,
    progreso: <Progreso user={cu} group={group} meetings={meetings} users={dynUsers} sem={activePeriod}/>,
    sup:      <Supervision key={supTab} user={cu} meetings={meetings} allPlans={allPlans} allAtt={allAtt} supMeetings={supMtgs} onAddSup={addSM} onUpdSup={updSM} users={dynUsers} groups={dynGroups} initTab={supTab} sem={activePeriod} allSupForms={allSupForms} onSaveSupForm={saveSupForm}/>,
    servicios:<Servicios user={cu} allPlans={allPlans} users={dynUsers} groups={dynGroups} sem={activePeriod}/>,
    admin:    <Admin user={cu} users={dynUsers} groups={dynGroups} onAddUser={addUser} onUpdUser={updUser} onAddGroup={addGroup} onUpdGroup={updGroup} periods={periods} activePeriod={activePeriod} pendingPeriodId={pendingPeriodId} activatedGPs={activatedGPs} onCreatePeriod={createPeriod} onClearPending={clearPending} allUsers={dynUsers} ppcGoals={ppcGoals} onSetPpcGoals={setPpcGoals}/>,
    misup:    <MiSupervision user={cu} supMeetings={supMtgs} users={dynUsers} sem={activePeriod} allSupForms={allSupForms}/>,
  };

  return (
    <div style={{background:BG,minHeight:'100vh',fontFamily:'system-ui'}}>
      <div style={{background:P,color:'#fff',padding:'12px 18px',display:'flex',justifyContent:'space-between',alignItems:'center',position:'sticky',top:0,zIndex:101}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <Logo size={82} white={true}/>
          <div style={{fontSize:27,fontWeight:700,letterSpacing:0.5}}>Koinonía</div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          {/* Indicador de periodo activo */}
          <span style={{fontSize:13,color:'#ffffffaa',background:'#ffffff15',padding:'3px 8px',borderRadius:20,display:'none'}}>{activePeriod}</span>
          {isSuperAdmin(cu)&&(
            <button onClick={function(){setSc(sc==='admin'?'home':'admin');}} title='Administración' style={{background:sc==='admin'?A:'transparent',border:'1px solid '+(sc==='admin'?A:'#ffffff50'),borderRadius:6,color:'#fff',fontSize:19,padding:'5px 10px',cursor:'pointer'}}>⚙️</button>
          )}
          <span style={{fontSize:19,opacity:0.9,fontWeight:600}}>{cu.nombre.split(' ')[0]}</span>
          <button onClick={function(){setCu(null);setSc('home');}} style={{background:'transparent',border:'1.5px solid #ffffff70',borderRadius:7,color:'#fff',fontSize:18,padding:'6px 14px',cursor:'pointer',fontWeight:600}}>Salir</button>
        </div>
      </div>
      {screens[sc]||screens.home}
      <BottomNav sc={sc} go={setSc} user={cu} groups={dynGroups}/>
    </div>
  );
}
