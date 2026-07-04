/* ============================================================
   ZENIX CAR DETAILING — app.js
   File JavaScript unico per l'intero sito.

   INDICE SEZIONI:
   1. TRADUZIONI (i18n)         — t(), setLang(), TRANSLATIONS
   2. FIREBASE                  — REST API + config
   3. STATO APP                 — state globale, EmailJS, schedule
   4. UTILITY CONDIVISE         — particelle, nav, menu, WhatsApp, admin segreto
   5. PRENOTAZIONE              — form booking (index.html)
   6. ADMIN                     — pannello amministrativo (admin.html)
   7. CONFIGURATORE             — preventivo 4-step (configurator.html)
   8. BUSINESS                  — network canvas (business.html)
   9. COPERTURA                 — radar canvas (coverage.html)

   Ogni sezione verifica la presenza degli elementi DOM prima di
   operare, così le funzioni page-specific non generano errori
   sulle pagine che non le usano.
   ============================================================ */


/* ============================================================
   SEZIONE 1. TRADUZIONI (i18n)
   ============================================================ */
/**
 * translations.js — Sistema i18n Zenix Car Detailing
 * 4 lingue: IT (default), EN, FR, DE
 * Usa: t('chiave') o tr('chiave') per tradurre
 */
/* jshint esversion: 6 */
'use strict';

const TRANSLATIONS = {
  it: {
    // ── Navigazione ──
    nav_prezzi:'Prezzi', nav_extra:'Extra', nav_prenota:'Prenota', nav_contatti:'Contatti',
    nav_book_btn:'Prenota ora',
    // ── Hero ──
    hero_eyebrow:'🦅 Car Detailing Professionale',
    hero_sub:'Servizi a domicilio · Savona e Provincia · Senza compromessi',
    hero_btn1:'Prenota il Servizio', hero_btn2:'Scopri i Prezzi',
    badge_home:'📍 A Domicilio', badge_pro:'💎 Professionale', badge_no_comp:'🛡️ Senza Compromessi',
    // ── Sezioni ──
    sec_packages:'Pacchetti', sec_listino:'LISTINO <span>PREZZI</span>',
    sec_extras:'Aggiunte', sec_extra_title:'SERVIZI <span>EXTRA</span>',
    sec_booking:'Appuntamento', sec_book_title:'PRENOTA IL <span>SERVIZIO</span>',
    sec_admin:'Gestione', sec_admin_title:'PANNELLO <span>ADMIN</span>',
    // ── Pacchetti – nomi / descrizioni ──
    pkg_from:'A partire da',
    pkg_badge_featured:'⭐ Consigliato',
    pkg_name_basic:'BASIC', pkg_name_complete:'COMPLETE', pkg_name_premium:'PREMIUM',
    pkg_desc_basic:'Lavaggio base · Interni + Esterni leggero',
    pkg_desc_complete:'Basic + Protezione + Pulizia leggera sedili',
    pkg_desc_premium:'Complete + Sanificazione abitacolo + Deep clean',
    pkg_feat_basic_1:'Lavaggio esterno manuale',
    pkg_feat_basic_2:'Pulizia interni base (aspirazione + superfici)',
    pkg_feat_basic_3:'Vetri e dettagli',
    pkg_feat_complete_1:'Tutto ciò che include il Basic',
    pkg_feat_complete_2:'Protezione vernice (sigillante / cera)',
    pkg_feat_complete_3:'Pulizia leggera sedili e tessuti',
    pkg_feat_complete_4:'Pulizia bagagliaio',
    pkg_feat_premium_1:'Tutto ciò che include il Complete',
    pkg_feat_premium_2:'Trattamento plastiche',
    pkg_feat_premium_3:'Deep clean interni',
    pkg_feat_premium_4:'Protezione tessuti e pelli',
    pkg_feat_premium_5:'Sanificazione abitacolo a vapore ed ozono',
    pkg_tagline_basic:'Perfetto per una manutenzione veloce e regolare.',
    pkg_tagline_complete:'Il nostro servizio più scelto.',
    pkg_tagline_premium:'Massima cura, massima protezione.',
    // ── Servizi Extra ──
    extra_card_name_deep:'DEEP CLEAN INTERNI',
    extra_card_desc_deep:'Pulizia profonda di sedili, moquette, pannelli e vani. Rimozione macchie e odori.',
    extra_card_price_deep:'Su richiesta',
    extra_card_name_luc:'LUCIDATURA AUTO',
    extra_card_desc_luc:'Ripristina la brillantezza e rimuove i difetti della carrozzeria. Il prezzo varia in base alle condizioni della vernice e alla dimensione del veicolo.',
    extra_tier_one:'One Step', extra_tier_two:'Two Step', extra_tier_full:'Completa',
    extra_card_name_fari:'RESTAURO FARI',
    extra_card_desc_fari:'Ripristino della trasparenza e della luminosità dei fari.',
    extra_card_price_fari:'da €80',
    // ── Form prenotazione ──
    hotel_title:'Sconto Hotel – 10% di Sconto',
    hotel_desc:"Sei ospite di un hotel convenzionato? Inserisci la tua targa per applicare lo sconto automaticamente.",
    lbl_nome:'Nome', lbl_cognome:'Cognome', lbl_tel:'Telefono', lbl_email:'Email',
    lbl_pacchetto:'Pacchetto', lbl_extra:'Servizi Extra (opzionale)',
    lbl_data:'Data', lbl_orario:'Orario Selezionato', lbl_slots:'Orari Disponibili',
    lbl_indirizzo:"Indirizzo (dove parcheggiata l'auto)", lbl_targa:'Targa (verifica sconto hotel)',
    lbl_note:'Note aggiuntive',
    ph_nome:'Mario', ph_cognome:'Rossi', ph_email:'mario@email.com',
    ph_orario:'Scegli un orario qui sotto', ph_indirizzo:'Via Roma 10, Savona',
    ph_note:'Colore auto, tipo di veicolo, richieste speciali...',
    pkg_placeholder:'— Seleziona un pacchetto —', pkg_basic:'Basic – da €45',
    pkg_complete:'Complete – da €70 ⭐', pkg_premium:'Premium – da €160',
    extra_none:'— Nessun extra —', extra_deep:'Deep Clean Interni (su richiesta)',
    extra_luc1:'Lucidatura One Step – da €120', extra_luc2:'Lucidatura Two Step – da €180',
    extra_luc3:'Lucidatura Completa – da €250', extra_fari:'Restauro Fari – da €80',
    discount_applied:'✅ Sconto hotel del 10% applicato!',
    // ── Riepilogo e pulsanti ──
    summary_title:'Riepilogo Prenotazione', btn_submit:'🦅 CONFERMA PRENOTAZIONE',
    btn_sending:'⏳ INVIO IN CORSO...',
    summary_pkg:'Pacchetto', summary_extra:'Extra', summary_date:'Data',
    summary_time:'Orario', summary_discount:'🏨 Sconto Hotel (10%)',
    summary_total:'Totale stimato',
    // ── Slot ──
    slots_pick_date:'👆 Seleziona prima una data',
    slots_none:'⚠️ Nessun orario disponibile per la data selezionata.',
    slots_loading:'⏳ Caricamento orari...',
    // ── Admin ──
    cancel_booking:'Annulla',
    admin_title:'Area Riservata – Zenix',
    admin_login_desc:'Accedi per gestire orari, codici hotel e visualizzare le prenotazioni.',
    // ── Contatti / Footer / Overlay ──
    contact_tel:'Telefono', contact_insta:'Instagram', contact_web:'Web', contact_zona:'Zona',
    footer_text:'© 2025 ZENIX Car Detailing · Savona e Provincia · Dettagli che fanno la differenza.',
    success_title:'Prenotazione Inviata!',
    success_msg:'Grazie per aver scelto Zenix Car Detailing. Ti contatteremo presto per confermare il tuo appuntamento.',
    success_close:'Chiudi',
    // ── Giorni ──
    days:['Domenica','Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato'],
    admin_days:['Dom','Lun','Mar','Mer','Gio','Ven','Sab'],
    nav_home: 'Home',
    nav_cfg: 'Configuratore',
    nav_biz: 'Business',
    nav_cov: 'Copertura',
    nav_elite: 'Elite Club',
    wa_title: '💬 Richiedi Preventivo',
    wa_item1: 'Risposta entro pochi minuti',
    wa_item2: 'Servizio a domicilio',
    wa_item3: 'Professionisti certificati',
    wa_cta: 'APRI WHATSAPP →',
    footer_brand_desc: 'Car detailing professionale a domicilio. Savona e Provincia.',
    footer_nav_title: 'Navigazione',
    footer_contact_title: 'Contatti',
    admin_modal_title: 'Area Riservata',
    admin_modal_desc: 'Inserisci la password per accedere al pannello.',
    admin_modal_pwd: 'Password',
    admin_modal_btn: 'ACCEDI',
    admin_modal_cancel: 'Annulla',
    why_title1: 'VENIAMO DA TE',
    why_desc1: 'Zero spostamenti. Il tuo veicolo viene trattato dove si trova.',
    why_title2: 'PRODOTTI PREMIUM',
    why_desc2: 'Solo prodotti professionali certificati. Risultati da showroom.',
    why_title3: 'RAPIDI E PRECISI',
    why_desc3: 'Tempi ottimizzati senza compromettere la qualità.',
    why_title4: 'GARANZIA TOTALE',
    why_desc4: 'Ogni servizio è coperto da garanzia soddisfazione.',
    biz_section_desc: 'Soluzioni dedicate per hotel, concessionarie e aziende. Gestione flotte, account dedicato e scontistiche volume.',
    biz_tag1: 'Hotel',
    biz_tag2: 'Concessionarie',
    biz_tag3: 'Aziende',
    biz_mini1_title: 'SERVIZIO SUL POSTO',
    biz_mini1_sub: 'Hotel o azienda',
    biz_mini2_title: 'FLOTTA AZIENDALE',
    biz_mini2_sub: 'Gestione completa',
    biz_mini3_title: 'ACCOUNT DEDICATO',
    biz_mini3_sub: 'Referente unico',
    cfg_preview_title: 'CONFIGURATORE PREVENTIVO',
    cfg_preview_desc: 'Scegli veicolo, pacchetto ed extra. Stima istantanea.',
    cfg_preview_btn: 'Avvia il Configuratore',
    services_preview_btn: 'Vedi Tutti i Servizi',
    biz_discover_btn: 'Scopri le Partnership',
    elite_how_title: 'COME FUNZIONA',
    elite_how_step1: 'Prenota il servizio',
    elite_how_step2: 'Ogni servizio conta',
    elite_how_step3: 'Scala i livelli',
    elite_how_step4: 'Goditi i benefici',
    elite_status_btn: 'Controlla il mio Status',
    elite_cta_note: 'Chiedici il tuo status su WhatsApp.',
    contact_card_wa: 'Messaggio diretto',
    contact_card_zone: 'Savona e Provincia',
    cform_send_btn: 'INVIA MESSAGGIO',
    cform_sending: 'Invio in corso...',
    cform_success: 'Messaggio inviato! Ti risponderemo presto.',
    cform_err: 'Compila almeno nome e messaggio.',
    cform_subj1: 'Richiesta preventivo',
    cform_subj2: 'Informazioni servizi',
    cform_subj3: 'Partnership Business',
    cform_subj4: 'Elite Club',
    cform_subj5: 'Altro',
    biz_partner_title: 'INIZIA UNA PARTNERSHIP',
    biz_partner_desc: 'Sei interessato a diventare partner Zenix? Contattaci per un preventivo personalizzato.',
    biz_partner_btn: 'Parla con noi su WhatsApp',
    coverage_cta_btn: 'Verifica la tua zona',
    coverage_not_found: 'Non trovi la tua zona? Contattaci.',
    why_title: 'IL NOSTRO STANDARD',
    sec_biz: 'Partnership',
    biz_preview_title: 'BUSINESS PARTNERSHIP',
    sec_cfg: 'Configuratore',
    sec_cfg_title: 'CALCOLA IL TUO PREVENTIVO',
    svc_hero_eyebrow: 'Listino Completo',
    svc_hero_title: 'SERVIZI E PREZZI',
    svc_hero_sub: 'Qualità professionale, prezzi trasparenti, risultati garantiti.',
    cfg_hero_eyebrow: 'Step-by-step',
    cfg_page_title: 'CALCOLA IL TUO PREVENTIVO',
    cfg_page_sub: 'Configura il servizio perfetto. Stima istantanea, prenotazione immediata.',
    cfg_step_vehicle: 'Veicolo',
    cfg_step_package: 'Pacchetto',
    cfg_step_extra: 'Extra',
    cfg_step_quote: 'Preventivo',
    cfg_s1_title: 'Scegli il tuo',
    cfg_s1_title_span: 'tipo di veicolo',
    cfg_veh_1: 'Utilitaria',
    cfg_veh_2: 'Berlina',
    cfg_veh_3: 'SUV',
    cfg_veh_4: 'Monovolume',
    cfg_veh_5: 'Sportiva',
    cfg_next1: 'AVANTI - PACCHETTO',
    cfg_next2: 'AVANTI - EXTRA',
    cfg_s2_title: 'Scegli il tuo',
    cfg_s2_title_span: 'pacchetto',
    cfg_basic_f1: 'Lavaggio esterno',
    cfg_basic_f2: 'Pulizia interni base',
    cfg_basic_f3: 'Vetri',
    cfg_complete_f1: 'Tutto Basic',
    cfg_complete_f2: 'Protezione vernice',
    cfg_complete_f3: 'Pulizia sedili',
    cfg_complete_f4: 'Bagagliaio',
    cfg_premium_f1: 'Tutto Complete',
    cfg_premium_f2: 'Lucidatura',
    cfg_premium_f3: 'Deep clean',
    cfg_premium_f4: 'Ozono',
    cfg_back: 'Indietro',
    cfg_calc: 'CALCOLA PREVENTIVO',
    cfg_s3_title: 'Aggiungi',
    cfg_s3_title_span: 'servizi extra',
    cfg_optional: 'opzionale',
    cfg_on_quote: 'Su preventivo',
    cfg_extra_luc1: 'Lucidatura One Step',
    cfg_extra_luc2: 'Lucidatura Two Step',
    cfg_result_estimate: 'Preventivo Stimato',
    cfg_result_note: 'Prezzo finale dopo ispezione',
    cfg_result_duration: 'Durata',
    cfg_ask_info: 'Richiedi Info',
    cfg_reconfigure: 'Riconfigura',
    biz_hero_eyebrow: 'Partnerships',
    biz_hero_title: 'BUSINESS PARTNERSHIP',
    biz_hero_sub: 'Soluzioni enterprise per hotel, concessionarie e aziende.',
    biz_system_title: 'BUSINESS PARTNERSHIP SYSTEM',
    biz_badge_partner: 'PARTNER',
    biz_sector: 'Settore',
    biz_title_hotel: 'HOTEL',
    biz_hotel_f1: 'Servizio nel parcheggio dell\'hotel',
    biz_hotel_f2: 'Sconto dedicato ospiti con targa',
    biz_hotel_f3: 'Prenotazioni prioritarie e dedicate',
    biz_hotel_f4: 'Account manager singolo',
    biz_hotel_f5: 'Fatturazione mensile riepilogativa',
    biz_cta_hotel: 'Diventa Partner',
    biz_badge_enterprise: 'ENTERPRISE',
    biz_title_dealer: 'CONCESSIONARIE',
    biz_dealer_f1: 'Preparazione veicoli pre e post-vendita',
    biz_dealer_f2: 'Trattamento flotta completa',
    biz_dealer_f3: 'Scontistiche volume su pacchetti',
    biz_dealer_f4: 'Priorità di intervento garantita',
    biz_dealer_f5: 'Reportistica periodica servizi',
    biz_cta_dealer: 'Richiedi Offerta',
    biz_badge_corporate: 'CORPORATE',
    biz_title_corp: 'AZIENDE',
    biz_corp_f1: 'Manutenzione flotta aziendale',
    biz_corp_f2: 'Intervento programmato in sede',
    biz_corp_f3: 'Account manager dedicato',
    biz_corp_f4: 'Scontistiche a scalare sui volumi',
    biz_corp_f5: 'Contratti annuali con SLA garantiti',
    biz_cta_corp: 'Contatta il Team',
    biz_advantages_eyebrow: 'Vantaggi',
    why_zenix_title: 'PERCHÉ SCEGLIERE',
    brand_zenix: 'ZENIX',
    ent_f1_title: 'INTERVENTO RAPIDO',
    ent_f1_desc: 'Team disponibile, pronto entro poche ore dalla richiesta.',
    ent_f2_title: 'REPORTISTICA',
    ent_f2_desc: 'Report mensili dettagliati su tutti i servizi erogati.',
    ent_f3_title: 'FATTURAZIONE SEMPLICE',
    ent_f3_desc: 'Una sola fattura mensile per tutti i servizi.',
    ent_f4_title: 'ACCOUNT DEDICATO',
    ent_f4_desc: 'Un referente unico per tutta la gestione.',
    cov_hero_eyebrow: 'Zona Operativa',
    cov_hero_title: 'AREA DI COPERTURA',
    cov_hero_sub: 'Copriamo Savona e tutta la provincia. Arriviamo direttamente da te.',
    cov_radar_eyebrow: 'Radar Operativo',
    cov_map_title: 'MAPPA COPERTURA',
    cov_hq_label: 'ZENIX HQ',
    cov_notfound_eyebrow: 'Non trovi la tua zona?',
    cov_contact_title: 'CONTATTACI DIRETTAMENTE',
    cov_notfound_desc: 'Valutiamo ogni richiesta al di fuori della zona standard. Scrivici su WhatsApp.',
    elite_hero_eyebrow: 'Loyalty Program',
    elite_hero_title: 'ZENIX ELITE CLUB',
    elite_hero_sub: 'Ogni servizio ti avvicina al livello successivo. Accumula status, sblocca vantaggi.',
    elite_levels_eyebrow: 'Livelli',
    elite_prog_title: 'PROGRESSIONE ELITE',
    elite_tier_bronze: 'BRONZE',
    elite_req_bronze: '1-3 servizi',
    elite_bronze_f1: 'Priorità di prenotazione',
    elite_bronze_f2: 'Notifiche promozioni',
    elite_bronze_f3: 'Reminder manutenzione',
    elite_tier_silver: 'SILVER',
    elite_req_silver: '4-9 servizi',
    elite_silver_f1: 'Tutto Bronze',
    elite_silver_f2: '5% sconto permanente',
    elite_silver_f3: '1 check-up gratuito/semestre',
    elite_silver_f4: 'Offerte riservate',
    elite_tier_gold: 'GOLD',
    elite_req_gold: '10-24 servizi',
    elite_gold_f1: 'Tutto Silver',
    elite_gold_f2: '10% sconto permanente',
    elite_gold_f3: 'Slot orario riservato',
    elite_gold_f4: 'Prodotti omaggio',
    elite_gold_f5: 'Accesso anticipato nuovi servizi',
    elite_tier_black: 'BLACK',
    elite_req_black: '25+ servizi',
    elite_black_f1: 'Tutto Gold',
    elite_black_f2: '15% sconto su tutto',
    elite_black_f3: 'Account manager dedicato',
    elite_black_f4: 'Servizio su chiamata 24h',
    elite_black_f5: 'VIP eventi Zenix',
    elite_black_f6: 'Targa hotel registrata',
    contact_hero_eyebrow: 'Siamo qui per te',
    contact_hero_title: 'CONTATTA ZENIX',
    contact_hero_sub: 'Disponibili sempre. Scegli il canale che preferisci.',
    contact_channels_eyebrow: 'Canali',
    contact_where_title: 'DOVE TROVARCI',
    contact_wa: 'WhatsApp',
    contact_zona_label: 'Zona',
    contact_write_eyebrow: 'Scrivici',
    contact_form_title: 'MODULO DI CONTATTO',
    cform_send_us: 'Inviaci un messaggio',
    cform_subject: 'Oggetto',
    cform_select: 'Seleziona',
    cform_message: 'Messaggio',
    cform_msg_ph: 'Scrivi qui il tuo messaggio...',
    ph_tel: '+39 333 1234567',
    admin_title: 'PANNELLO ADMIN',
    admin_subtitle: 'Area riservata Zenix Car Detailing — Gestione orari, prenotazioni e hotel.',
    admin_gate_title: 'ACCESSO RISERVATO',
    admin_gate_desc: 'Inserisci la password per accedere al pannello di controllo.',
    admin_gate_ph: 'Password admin',
    admin_back_site: 'Torna al Sito',
    admin_stat_total: 'Prenotazioni Totali',
    admin_stat_active: 'Attive',
    admin_stat_cancelled: 'Annullate',
    admin_stat_hotels: 'Targhe Hotel',
    admin_sched_title: 'Gestione Orari per Giorno',
    admin_sched_desc: 'Seleziona un giorno o una data specifica. Date specifiche hanno priorità.',
    admin_back_days: 'Torna ai Giorni',
    admin_day_default: 'Lunedì',
    admin_specific_date: 'DATA SPECIFICA',
    admin_bookings_title: 'Prenotazioni',
    admin_bookings_desc: 'Ultime prenotazioni ricevute. Clicca Annulla per liberare lo slot.',
    admin_no_bookings: 'Nessuna prenotazione ancora.',
    admin_saved: 'Modifiche salvate!',
  },
  en: {
    nav_prezzi:'Prices', nav_extra:'Extra', nav_prenota:'Book', nav_contatti:'Contacts',
    nav_book_btn:'Book Now',
    hero_eyebrow:'🦅 Professional Car Detailing',
    hero_sub:'Home service · Savona & Province · No compromises',
    hero_btn1:'Book the Service', hero_btn2:'See Prices',
    badge_home:'📍 Home Service', badge_pro:'💎 Professional', badge_no_comp:'🛡️ No Compromises',
    sec_packages:'Packages', sec_listino:'PRICE <span>LIST</span>',
    sec_extras:'Add-ons', sec_extra_title:'EXTRA <span>SERVICES</span>',
    sec_booking:'Appointment', sec_book_title:'BOOK THE <span>SERVICE</span>',
    sec_admin:'Management', sec_admin_title:'ADMIN <span>PANEL</span>',
    pkg_from:'Starting from',
    pkg_badge_featured:'⭐ Recommended',
    pkg_name_basic:'BASIC', pkg_name_complete:'COMPLETE', pkg_name_premium:'PREMIUM',
    pkg_desc_basic:'Basic wash · Interior + Light exterior',
    pkg_desc_complete:'Basic + Protection + Light seat cleaning',
    pkg_desc_premium:'Complete + Interior sanitization + Deep clean',
    pkg_feat_basic_1:'Manual exterior wash',
    pkg_feat_basic_2:'Basic interior cleaning (vacuuming + surfaces)',
    pkg_feat_basic_3:'Windows and details',
    pkg_feat_complete_1:'Everything included in Basic',
    pkg_feat_complete_2:'Paint protection (sealant / wax)',
    pkg_feat_complete_3:'Light seat and fabric cleaning',
    pkg_feat_complete_4:'Trunk cleaning',
    pkg_feat_premium_1:'Everything included in Complete',
    pkg_feat_premium_2:'Plastic treatment',
    pkg_feat_premium_3:'Deep interior clean',
    pkg_feat_premium_4:'Fabric and leather protection',
    pkg_feat_premium_5:'Interior sanitization with steam and ozone',
    pkg_tagline_basic:'Perfect for quick and regular maintenance.',
    pkg_tagline_complete:'Our most popular service.',
    pkg_tagline_premium:'Maximum care, maximum protection.',
    extra_card_name_deep:'DEEP INTERIOR CLEAN',
    extra_card_desc_deep:'Deep cleaning of seats, carpet, panels and compartments. Stain and odor removal.',
    extra_card_price_deep:'On request',
    extra_card_name_luc:'CAR POLISHING',
    extra_card_desc_luc:'Restores shine and removes paint defects. Price varies based on paint condition and vehicle size.',
    extra_tier_one:'One Step', extra_tier_two:'Two Step', extra_tier_full:'Full',
    extra_card_name_fari:'HEADLIGHT RESTORATION',
    extra_card_desc_fari:'Restoration of headlight transparency and brightness.',
    extra_card_price_fari:'from €80',
    hotel_title:'Hotel Discount – 10% Off',
    hotel_desc:'Are you a guest at a partner hotel? Enter your license plate to apply the discount automatically.',
    lbl_nome:'First Name', lbl_cognome:'Last Name', lbl_tel:'Phone', lbl_email:'Email',
    lbl_pacchetto:'Package', lbl_extra:'Extra Services (optional)',
    lbl_data:'Date', lbl_orario:'Selected Time', lbl_slots:'Available Time Slots',
    lbl_indirizzo:'Address (where your car is parked)', lbl_targa:'License Plate (hotel discount check)',
    lbl_note:'Additional notes',
    ph_nome:'John', ph_cognome:'Smith', ph_email:'john@email.com',
    ph_orario:'Choose a time slot below', ph_indirizzo:'Via Roma 10, Savona',
    ph_note:'Car color, vehicle type, special requests...',
    pkg_placeholder:'— Select a package —', pkg_basic:'Basic – from €45',
    pkg_complete:'Complete – from €70 ⭐', pkg_premium:'Premium – from €160',
    extra_none:'— No extras —', extra_deep:'Deep Clean Interior (on request)',
    extra_luc1:'One Step Polish – from €120', extra_luc2:'Two Step Polish – from €180',
    extra_luc3:'Full Polish – from €250', extra_fari:'Headlight Restoration – from €80',
    discount_applied:'✅ Hotel discount of 10% applied!',
    summary_title:'Booking Summary', btn_submit:'🦅 CONFIRM BOOKING',
    btn_sending:'⏳ SENDING...',
    summary_pkg:'Package', summary_extra:'Extra', summary_date:'Date',
    summary_time:'Time', summary_discount:'🏨 Hotel Discount (10%)',
    summary_total:'Estimated total',
    slots_pick_date:'👆 Please select a date first',
    slots_none:'⚠️ No available time slots for the selected date.',
    slots_loading:'⏳ Loading...',
    cancel_booking:'Cancel',
    admin_title:'Reserved Area – Zenix',
    admin_login_desc:'Log in to manage schedules, hotel codes and view bookings.',
    contact_tel:'Phone', contact_insta:'Instagram', contact_web:'Website', contact_zona:'Area',
    footer_text:'© 2025 ZENIX Car Detailing · Savona & Province · Details that make the difference.',
    success_title:'Booking Sent!',
    success_msg:'Thank you for choosing Zenix Car Detailing. We will contact you soon to confirm your appointment.',
    success_close:'Close',
    days:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    admin_days:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
    nav_home: 'Home',
    nav_cfg: 'Configurator',
    nav_biz: 'Business',
    nav_cov: 'Coverage',
    nav_elite: 'Elite Club',
    wa_title: '💬 Request a Quote',
    wa_item1: 'Reply within minutes',
    wa_item2: 'Home service',
    wa_item3: 'Certified professionals',
    wa_cta: 'OPEN WHATSAPP →',
    footer_brand_desc: 'Professional car detailing at your home. Savona & Province.',
    footer_nav_title: 'Navigation',
    footer_contact_title: 'Contacts',
    admin_modal_title: 'Reserved Area',
    admin_modal_desc: 'Enter password to access the admin panel.',
    admin_modal_pwd: 'Password',
    admin_modal_btn: 'LOGIN',
    admin_modal_cancel: 'Cancel',
    why_title1: 'WE COME TO YOU',
    why_desc1: 'Zero trips. Your vehicle is treated right where it is.',
    why_title2: 'PREMIUM PRODUCTS',
    why_desc2: 'Only certified professional products. Showroom results guaranteed.',
    why_title3: 'FAST AND PRECISE',
    why_desc3: 'Optimized timing without compromising quality.',
    why_title4: 'TOTAL GUARANTEE',
    why_desc4: 'Every service is covered by a satisfaction guarantee.',
    biz_section_desc: 'Dedicated solutions for hotels, dealerships and companies.',
    biz_tag1: 'Hotels',
    biz_tag2: 'Dealerships',
    biz_tag3: 'Companies',
    biz_mini1_title: 'ON-SITE SERVICE',
    biz_mini1_sub: 'Hotel or company',
    biz_mini2_title: 'FLEET MANAGEMENT',
    biz_mini2_sub: 'Complete management',
    biz_mini3_title: 'DEDICATED ACCOUNT',
    biz_mini3_sub: 'Single point of contact',
    cfg_preview_title: 'QUOTE CONFIGURATOR',
    cfg_preview_desc: 'Choose vehicle, package and extras. Instant estimate.',
    cfg_preview_btn: 'Launch Configurator',
    services_preview_btn: 'See All Services',
    biz_discover_btn: 'Discover Partnerships',
    elite_how_title: 'HOW IT WORKS',
    elite_how_step1: 'Book a service',
    elite_how_step2: 'Every service counts',
    elite_how_step3: 'Level up',
    elite_how_step4: 'Enjoy the benefits',
    elite_status_btn: 'Check my Status',
    elite_cta_note: 'Ask us your current status on WhatsApp.',
    contact_card_wa: 'Direct message',
    contact_card_zone: 'Savona & Province',
    cform_send_btn: 'SEND MESSAGE',
    cform_sending: 'Sending...',
    cform_success: 'Message sent! We will reply soon.',
    cform_err: 'Please fill in at least name and message.',
    cform_subj1: 'Quote request',
    cform_subj2: 'Service info',
    cform_subj3: 'Business partnership',
    cform_subj4: 'Elite Club',
    cform_subj5: 'Other',
    biz_partner_title: 'START A PARTNERSHIP',
    biz_partner_desc: 'Interested in becoming a Zenix partner? Contact us for a custom quote.',
    biz_partner_btn: 'Talk to us on WhatsApp',
    coverage_cta_btn: 'Check your area',
    coverage_not_found: 'Can\'t find your area? Contact us.',
    why_title: 'OUR STANDARD',
    sec_biz: 'Partnership',
    biz_preview_title: 'BUSINESS PARTNERSHIP',
    sec_cfg: 'Configurator',
    sec_cfg_title: 'CALCULATE YOUR QUOTE',
    svc_hero_eyebrow: 'Full Price List',
    svc_hero_title: 'SERVICES AND PRICES',
    svc_hero_sub: 'Professional quality, transparent prices, guaranteed results.',
    cfg_hero_eyebrow: 'Step-by-step',
    cfg_page_title: 'CALCULATE YOUR QUOTE',
    cfg_page_sub: 'Configure the perfect service. Instant estimate, immediate booking.',
    cfg_step_vehicle: 'Vehicle',
    cfg_step_package: 'Package',
    cfg_step_extra: 'Extra',
    cfg_step_quote: 'Quote',
    cfg_s1_title: 'Choose your',
    cfg_s1_title_span: 'vehicle type',
    cfg_veh_1: 'Compact',
    cfg_veh_2: 'Sedan',
    cfg_veh_3: 'SUV',
    cfg_veh_4: 'Minivan',
    cfg_veh_5: 'Sports Car',
    cfg_next1: 'NEXT - PACKAGE',
    cfg_next2: 'NEXT - EXTRAS',
    cfg_s2_title: 'Choose your',
    cfg_s2_title_span: 'package',
    cfg_basic_f1: 'Exterior wash',
    cfg_basic_f2: 'Basic interior cleaning',
    cfg_basic_f3: 'Windows',
    cfg_complete_f1: 'Everything in Basic',
    cfg_complete_f2: 'Paint protection',
    cfg_complete_f3: 'Seat cleaning',
    cfg_complete_f4: 'Trunk',
    cfg_premium_f1: 'Everything in Complete',
    cfg_premium_f2: 'Polishing',
    cfg_premium_f3: 'Deep clean',
    cfg_premium_f4: 'Ozone',
    cfg_back: 'Back',
    cfg_calc: 'CALCULATE QUOTE',
    cfg_s3_title: 'Add',
    cfg_s3_title_span: 'extra services',
    cfg_optional: 'optional',
    cfg_on_quote: 'Custom quote',
    cfg_extra_luc1: 'One Step Polish',
    cfg_extra_luc2: 'Two Step Polish',
    cfg_result_estimate: 'Estimated Quote',
    cfg_result_note: 'Final price after inspection',
    cfg_result_duration: 'Duration',
    cfg_ask_info: 'Request Info',
    cfg_reconfigure: 'Reconfigure',
    biz_hero_eyebrow: 'Partnerships',
    biz_hero_title: 'BUSINESS PARTNERSHIP',
    biz_hero_sub: 'Enterprise solutions for hotels, dealerships and companies.',
    biz_system_title: 'BUSINESS PARTNERSHIP SYSTEM',
    biz_badge_partner: 'PARTNER',
    biz_sector: 'Sector',
    biz_title_hotel: 'HOTELS',
    biz_hotel_f1: 'Service in the hotel parking lot',
    biz_hotel_f2: 'Dedicated discount for guests with plate',
    biz_hotel_f3: 'Priority and dedicated bookings',
    biz_hotel_f4: 'Single account manager',
    biz_hotel_f5: 'Monthly summary invoicing',
    biz_cta_hotel: 'Become a Partner',
    biz_badge_enterprise: 'ENTERPRISE',
    biz_title_dealer: 'DEALERSHIPS',
    biz_dealer_f1: 'Pre and post-sale vehicle prep',
    biz_dealer_f2: 'Full fleet treatment',
    biz_dealer_f3: 'Volume discounts on packages',
    biz_dealer_f4: 'Guaranteed intervention priority',
    biz_dealer_f5: 'Periodic service reporting',
    biz_cta_dealer: 'Request Quote',
    biz_badge_corporate: 'CORPORATE',
    biz_title_corp: 'COMPANIES',
    biz_corp_f1: 'Corporate fleet maintenance',
    biz_corp_f2: 'Scheduled on-site intervention',
    biz_corp_f3: 'Dedicated account manager',
    biz_corp_f4: 'Volume-based discounts',
    biz_corp_f5: 'Annual contracts with guaranteed SLA',
    biz_cta_corp: 'Contact the Team',
    biz_advantages_eyebrow: 'Advantages',
    why_zenix_title: 'WHY CHOOSE',
    brand_zenix: 'ZENIX',
    ent_f1_title: 'FAST INTERVENTION',
    ent_f1_desc: 'Available team, ready within a few hours of request.',
    ent_f2_title: 'REPORTING',
    ent_f2_desc: 'Detailed monthly reports on all services provided.',
    ent_f3_title: 'SIMPLE INVOICING',
    ent_f3_desc: 'A single monthly invoice for all services.',
    ent_f4_title: 'DEDICATED ACCOUNT',
    ent_f4_desc: 'A single point of contact for all management.',
    cov_hero_eyebrow: 'Operating Area',
    cov_hero_title: 'COVERAGE AREA',
    cov_hero_sub: 'We cover Savona and the entire province. We come directly to you.',
    cov_radar_eyebrow: 'Operating Radar',
    cov_map_title: 'COVERAGE MAP',
    cov_hq_label: 'ZENIX HQ',
    cov_notfound_eyebrow: 'Can\'t find your area?',
    cov_contact_title: 'CONTACT US DIRECTLY',
    cov_notfound_desc: 'We evaluate every request outside the standard area. Write to us on WhatsApp.',
    elite_hero_eyebrow: 'Loyalty Program',
    elite_hero_title: 'ZENIX ELITE CLUB',
    elite_hero_sub: 'Every service brings you closer to the next level. Build status, unlock benefits.',
    elite_levels_eyebrow: 'Levels',
    elite_prog_title: 'ELITE PROGRESSION',
    elite_tier_bronze: 'BRONZE',
    elite_req_bronze: '1-3 services',
    elite_bronze_f1: 'Booking priority',
    elite_bronze_f2: 'Exclusive promo notifications',
    elite_bronze_f3: 'Maintenance reminders',
    elite_tier_silver: 'SILVER',
    elite_req_silver: '4-9 services',
    elite_silver_f1: 'Everything in Bronze',
    elite_silver_f2: '5% permanent discount',
    elite_silver_f3: '1 free check-up/semester',
    elite_silver_f4: 'Exclusive offers',
    elite_tier_gold: 'GOLD',
    elite_req_gold: '10-24 services',
    elite_gold_f1: 'Everything in Silver',
    elite_gold_f2: '10% permanent discount',
    elite_gold_f3: 'Reserved time slot',
    elite_gold_f4: 'Free products',
    elite_gold_f5: 'Early access to new services',
    elite_tier_black: 'BLACK',
    elite_req_black: '25+ services',
    elite_black_f1: 'Everything in Gold',
    elite_black_f2: '15% off everything',
    elite_black_f3: 'Dedicated account manager',
    elite_black_f4: 'On-call service within 24h',
    elite_black_f5: 'VIP Zenix events',
    elite_black_f6: 'Registered hotel plate',
    contact_hero_eyebrow: 'We\'re here for you',
    contact_hero_title: 'CONTACT ZENIX',
    contact_hero_sub: 'Always available. Choose your preferred channel.',
    contact_channels_eyebrow: 'Channels',
    contact_where_title: 'WHERE TO FIND US',
    contact_wa: 'WhatsApp',
    contact_zona_label: 'Area',
    contact_write_eyebrow: 'Write to us',
    contact_form_title: 'CONTACT FORM',
    cform_send_us: 'Send us a message',
    cform_subject: 'Subject',
    cform_select: 'Select',
    cform_message: 'Message',
    cform_msg_ph: 'Write your message here...',
    ph_tel: '+1 555 1234567',
    admin_title: 'ADMIN PANEL',
    admin_subtitle: 'Zenix Car Detailing reserved area — Schedule, bookings and hotel management.',
    admin_gate_title: 'RESERVED ACCESS',
    admin_gate_desc: 'Enter the password to access the control panel.',
    admin_gate_ph: 'Admin password',
    admin_back_site: 'Back to Site',
    admin_stat_total: 'Total Bookings',
    admin_stat_active: 'Active',
    admin_stat_cancelled: 'Cancelled',
    admin_stat_hotels: 'Hotel Plates',
    admin_sched_title: 'Daily Schedule Management',
    admin_sched_desc: 'Select a weekday or specific date. Specific dates take priority.',
    admin_back_days: 'Back to Days',
    admin_day_default: 'Monday',
    admin_specific_date: 'SPECIFIC DATE',
    admin_bookings_title: 'Bookings',
    admin_bookings_desc: 'Latest bookings received. Click Cancel to free the slot.',
    admin_no_bookings: 'No bookings yet.',
    admin_saved: 'Changes saved!',
  },
  fr: {
    nav_prezzi:'Prix', nav_extra:'Extras', nav_prenota:'Réserver', nav_contatti:'Contacts',
    nav_book_btn:'Réserver',
    hero_eyebrow:'🦅 Detailing Auto Professionnel',
    hero_sub:'Service à domicile · Savone & Province · Sans compromis',
    hero_btn1:'Réserver le Service', hero_btn2:'Voir les Prix',
    badge_home:'📍 À Domicile', badge_pro:'💎 Professionnel', badge_no_comp:'🛡️ Sans Compromis',
    sec_packages:'Formules', sec_listino:'LISTE DES <span>PRIX</span>',
    sec_extras:'Options', sec_extra_title:'SERVICES <span>SUPPLÉMENTAIRES</span>',
    sec_booking:'Rendez-vous', sec_book_title:'RÉSERVER LE <span>SERVICE</span>',
    sec_admin:'Gestion', sec_admin_title:'PANNEAU <span>ADMIN</span>',
    pkg_from:'À partir de',
    pkg_badge_featured:'⭐ Recommandé',
    pkg_name_basic:'BASIQUE', pkg_name_complete:'COMPLET', pkg_name_premium:'PREMIUM',
    pkg_desc_basic:'Lavage de base · Intérieur + Extérieur léger',
    pkg_desc_complete:'Basique + Protection + Nettoyage léger des sièges',
    pkg_desc_premium:'Complet + Assainissement habitacle + Deep clean',
    pkg_feat_basic_1:'Lavage extérieur manuel',
    pkg_feat_basic_2:'Nettoyage intérieur de base (aspiration + surfaces)',
    pkg_feat_basic_3:'Vitres et détails',
    pkg_feat_complete_1:'Tout ce qui est inclus dans Basique',
    pkg_feat_complete_2:'Protection peinture (scellant / cire)',
    pkg_feat_complete_3:'Nettoyage léger des sièges et tissus',
    pkg_feat_complete_4:'Nettoyage du coffre',
    pkg_feat_premium_1:'Tout ce qui est inclus dans Complet',
    pkg_feat_premium_2:'Traitement des plastiques',
    pkg_feat_premium_3:'Nettoyage intérieur profond',
    pkg_feat_premium_4:'Protection tissus et cuirs',
    pkg_feat_premium_5:"Assainissement de l'habitacle vapeur et ozone",
    pkg_tagline_basic:'Parfait pour un entretien rapide et régulier.',
    pkg_tagline_complete:'Notre service le plus populaire.',
    pkg_tagline_premium:'Soin maximum, protection maximum.',
    extra_card_name_deep:'NETTOYAGE INTÉRIEUR PROFOND',
    extra_card_desc_deep:'Nettoyage profond des sièges, moquettes, panneaux. Élimination des taches et odeurs.',
    extra_card_price_deep:'Sur demande',
    extra_card_name_luc:'LUSTRAGE CARROSSERIE',
    extra_card_desc_luc:"Redonne de l'éclat et élimine les défauts de la carrosserie. Prix variable selon l'état de la peinture.",
    extra_tier_one:'Une Étape', extra_tier_two:'Deux Étapes', extra_tier_full:'Complète',
    extra_card_name_fari:'RESTAURATION DES PHARES',
    extra_card_desc_fari:'Restauration de la transparence et de la luminosité des phares.',
    extra_card_price_fari:'dès €80',
    hotel_title:'Réduction Hôtel – 10% de Remise',
    hotel_desc:"Êtes-vous client d'un hôtel partenaire ? Entrez votre plaque pour appliquer la remise automatiquement.",
    lbl_nome:'Prénom', lbl_cognome:'Nom', lbl_tel:'Téléphone', lbl_email:'Email',
    lbl_pacchetto:'Formule', lbl_extra:'Services supplémentaires (optionnel)',
    lbl_data:'Date', lbl_orario:'Heure sélectionnée', lbl_slots:'Créneaux disponibles',
    lbl_indirizzo:'Adresse (où est garée votre voiture)', lbl_targa:'Plaque (vérification remise hôtel)',
    lbl_note:'Notes supplémentaires',
    ph_nome:'Jean', ph_cognome:'Dupont', ph_email:'jean@email.com',
    ph_orario:'Choisissez un créneau ci-dessous', ph_indirizzo:'Via Roma 10, Savone',
    ph_note:'Couleur, type de véhicule, demandes spéciales...',
    pkg_placeholder:'— Choisissez une formule —', pkg_basic:'Basic – dès €45',
    pkg_complete:'Complet – dès €70 ⭐', pkg_premium:'Premium – dès €160',
    extra_none:'— Aucun extra —', extra_deep:'Nettoyage intérieur profond (sur devis)',
    extra_luc1:'Lustrage One Step – dès €120', extra_luc2:'Lustrage Two Step – dès €180',
    extra_luc3:'Lustrage Complet – dès €250', extra_fari:'Restauration phares – dès €80',
    discount_applied:'✅ Remise hôtel de 10% appliquée !',
    summary_title:'Récapitulatif', btn_submit:'🦅 CONFIRMER LA RÉSERVATION',
    btn_sending:'⏳ ENVOI EN COURS...',
    summary_pkg:'Formule', summary_extra:'Extra', summary_date:'Date',
    summary_time:'Heure', summary_discount:'🏨 Remise hôtel (10%)',
    summary_total:'Total estimé',
    slots_pick_date:"👆 Veuillez d'abord sélectionner une date",
    slots_none:'⚠️ Aucun créneau disponible pour la date sélectionnée.',
    slots_loading:'⏳ Chargement...',
    cancel_booking:'Annuler',
    admin_title:'Espace Réservé – Zenix',
    admin_login_desc:'Connectez-vous pour gérer les horaires, les codes hôtel et consulter les réservations.',
    contact_tel:'Téléphone', contact_insta:'Instagram', contact_web:'Site Web', contact_zona:'Zone',
    footer_text:'© 2025 ZENIX Car Detailing · Savone & Province · Des détails qui font la différence.',
    success_title:'Réservation Envoyée !',
    success_msg:"Merci d'avoir choisi Zenix Car Detailing. Nous vous contacterons bientôt pour confirmer votre rendez-vous.",
    success_close:'Fermer',
    days:['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
    admin_days:['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
    nav_home: 'Accueil',
    nav_cfg: 'Configurateur',
    nav_biz: 'Business',
    nav_cov: 'Zone',
    nav_elite: 'Elite Club',
    wa_title: '💬 Demander un Devis',
    wa_item1: 'Réponse en quelques minutes',
    wa_item2: 'Service à domicile',
    wa_item3: 'Professionnels certifiés',
    wa_cta: 'OUVRIR WHATSAPP →',
    footer_brand_desc: 'Detailing auto professionnel à domicile. Savone & Province.',
    footer_nav_title: 'Navigation',
    footer_contact_title: 'Contacts',
    admin_modal_title: 'Espace Réservé',
    admin_modal_desc: 'Entrez le mot de passe pour accéder au panneau.',
    admin_modal_pwd: 'Mot de passe',
    admin_modal_btn: 'CONNEXION',
    admin_modal_cancel: 'Annuler',
    why_title1: 'ON VIENT CHEZ VOUS',
    why_desc1: 'Zéro déplacement. Votre véhicule est traité là où il est.',
    why_title2: 'PRODUITS PREMIUM',
    why_desc2: 'Uniquement des produits professionnels certifiés.',
    why_title3: 'RAPIDES ET PRÉCIS',
    why_desc3: 'Temps optimisés sans compromettre la qualité.',
    why_title4: 'GARANTIE TOTALE',
    why_desc4: 'Chaque service est couvert par une garantie satisfaction.',
    biz_section_desc: 'Solutions dédiées pour hôtels, concessionnaires et entreprises.',
    biz_tag1: 'Hôtels',
    biz_tag2: 'Concessionnaires',
    biz_tag3: 'Entreprises',
    biz_mini1_title: 'SERVICE SUR PLACE',
    biz_mini1_sub: 'Hôtel ou entreprise',
    biz_mini2_title: 'GESTION DE FLOTTE',
    biz_mini2_sub: 'Gestion complète',
    biz_mini3_title: 'COMPTE DÉDIÉ',
    biz_mini3_sub: 'Interlocuteur unique',
    cfg_preview_title: 'CONFIGURATEUR DE DEVIS',
    cfg_preview_desc: 'Choisissez véhicule, formule et extras. Estimation instantanée.',
    cfg_preview_btn: 'Lancer le Configurateur',
    services_preview_btn: 'Voir Tous les Services',
    biz_discover_btn: 'Découvrir les Partenariats',
    elite_how_title: 'COMMENT ÇA MARCHE',
    elite_how_step1: 'Réservez un service',
    elite_how_step2: 'Chaque service compte',
    elite_how_step3: 'Montez en niveau',
    elite_how_step4: 'Profitez des avantages',
    elite_status_btn: 'Vérifier mon Statut',
    elite_cta_note: 'Demandez votre statut sur WhatsApp.',
    contact_card_wa: 'Message direct',
    contact_card_zone: 'Savone & Province',
    cform_send_btn: 'ENVOYER LE MESSAGE',
    cform_sending: 'Envoi en cours...',
    cform_success: 'Message envoyé ! Nous répondrons bientôt.',
    cform_err: 'Veuillez remplir au moins le nom et le message.',
    cform_subj1: 'Demande de devis',
    cform_subj2: 'Info services',
    cform_subj3: 'Partenariat Business',
    cform_subj4: 'Elite Club',
    cform_subj5: 'Autre',
    biz_partner_title: 'COMMENCER UN PARTENARIAT',
    biz_partner_desc: 'Intéressé à devenir partenaire Zenix ? Contactez-nous.',
    biz_partner_btn: 'Parlez-nous sur WhatsApp',
    coverage_cta_btn: 'Vérifier ma zone',
    coverage_not_found: 'Zone non trouvée ? Contactez-nous.',
    why_title: 'NOTRE STANDARD',
    sec_biz: 'Partenariat',
    biz_preview_title: 'PARTENARIAT BUSINESS',
    sec_cfg: 'Configurateur',
    sec_cfg_title: 'CALCULEZ VOTRE DEVIS',
    svc_hero_eyebrow: 'Liste Complète',
    svc_hero_title: 'SERVICES ET PRIX',
    svc_hero_sub: 'Qualité professionnelle, prix transparents, résultats garantis.',
    cfg_hero_eyebrow: 'Étape par étape',
    cfg_page_title: 'CALCULEZ VOTRE DEVIS',
    cfg_page_sub: 'Configurez le service parfait. Estimation instantanée, réservation immédiate.',
    cfg_step_vehicle: 'Véhicule',
    cfg_step_package: 'Formule',
    cfg_step_extra: 'Extra',
    cfg_step_quote: 'Devis',
    cfg_s1_title: 'Choisissez votre',
    cfg_s1_title_span: 'type de véhicule',
    cfg_veh_1: 'Citadine',
    cfg_veh_2: 'Berline',
    cfg_veh_3: 'SUV',
    cfg_veh_4: 'Monospace',
    cfg_veh_5: 'Sportive',
    cfg_next1: 'SUIVANT - FORMULE',
    cfg_next2: 'SUIVANT - EXTRAS',
    cfg_s2_title: 'Choisissez votre',
    cfg_s2_title_span: 'formule',
    cfg_basic_f1: 'Lavage extérieur',
    cfg_basic_f2: 'Nettoyage intérieur basique',
    cfg_basic_f3: 'Vitres',
    cfg_complete_f1: 'Tout Basique',
    cfg_complete_f2: 'Protection peinture',
    cfg_complete_f3: 'Nettoyage sièges',
    cfg_complete_f4: 'Coffre',
    cfg_premium_f1: 'Tout Complet',
    cfg_premium_f2: 'Lustrage',
    cfg_premium_f3: 'Nettoyage profond',
    cfg_premium_f4: 'Ozone',
    cfg_back: 'Retour',
    cfg_calc: 'CALCULER LE DEVIS',
    cfg_s3_title: 'Ajoutez',
    cfg_s3_title_span: 'services extra',
    cfg_optional: 'facultatif',
    cfg_on_quote: 'Sur devis',
    cfg_extra_luc1: 'Lustrage One Step',
    cfg_extra_luc2: 'Lustrage Two Step',
    cfg_result_estimate: 'Devis Estimé',
    cfg_result_note: 'Prix final après inspection',
    cfg_result_duration: 'Durée',
    cfg_ask_info: 'Demander des Infos',
    cfg_reconfigure: 'Reconfigurer',
    biz_hero_eyebrow: 'Partenariats',
    biz_hero_title: 'PARTENARIAT BUSINESS',
    biz_hero_sub: 'Solutions entreprise pour hôtels, concessionnaires et sociétés.',
    biz_system_title: 'SYSTÈME DE PARTENARIAT BUSINESS',
    biz_badge_partner: 'PARTENAIRE',
    biz_sector: 'Secteur',
    biz_title_hotel: 'HÔTELS',
    biz_hotel_f1: 'Service sur le parking de l\'hôtel',
    biz_hotel_f2: 'Remise dédiée aux clients avec plaque',
    biz_hotel_f3: 'Réservations prioritaires et dédiées',
    biz_hotel_f4: 'Gestionnaire de compte unique',
    biz_hotel_f5: 'Facturation mensuelle récapitulative',
    biz_cta_hotel: 'Devenir Partenaire',
    biz_badge_enterprise: 'ENTREPRISE',
    biz_title_dealer: 'CONCESSIONNAIRES',
    biz_dealer_f1: 'Préparation véhicules avant/après vente',
    biz_dealer_f2: 'Traitement flotte complète',
    biz_dealer_f3: 'Remises volume sur formules',
    biz_dealer_f4: 'Priorité d\'intervention garantie',
    biz_dealer_f5: 'Reporting périodique des services',
    biz_cta_dealer: 'Demander une Offre',
    biz_badge_corporate: 'CORPORATE',
    biz_title_corp: 'ENTREPRISES',
    biz_corp_f1: 'Entretien flotte entreprise',
    biz_corp_f2: 'Intervention programmée sur site',
    biz_corp_f3: 'Gestionnaire de compte dédié',
    biz_corp_f4: 'Remises dégressives sur volumes',
    biz_corp_f5: 'Contrats annuels avec SLA garanti',
    biz_cta_corp: 'Contacter l\'Équipe',
    biz_advantages_eyebrow: 'Avantages',
    why_zenix_title: 'POURQUOI CHOISIR',
    brand_zenix: 'ZENIX',
    ent_f1_title: 'INTERVENTION RAPIDE',
    ent_f1_desc: 'Équipe disponible, prête en quelques heures.',
    ent_f2_title: 'REPORTING',
    ent_f2_desc: 'Rapports mensuels détaillés sur tous les services.',
    ent_f3_title: 'FACTURATION SIMPLE',
    ent_f3_desc: 'Une seule facture mensuelle pour tous les services.',
    ent_f4_title: 'COMPTE DÉDIÉ',
    ent_f4_desc: 'Un interlocuteur unique pour toute la gestion.',
    cov_hero_eyebrow: 'Zone d\'Intervention',
    cov_hero_title: 'ZONE DE COUVERTURE',
    cov_hero_sub: 'Nous couvrons Savone et toute la province. Nous venons directement chez vous.',
    cov_radar_eyebrow: 'Radar Opérationnel',
    cov_map_title: 'CARTE DE COUVERTURE',
    cov_hq_label: 'ZENIX HQ',
    cov_notfound_eyebrow: 'Zone non trouvée ?',
    cov_contact_title: 'CONTACTEZ-NOUS DIRECTEMENT',
    cov_notfound_desc: 'Nous évaluons chaque demande hors zone standard. Écrivez-nous sur WhatsApp.',
    elite_hero_eyebrow: 'Programme Fidélité',
    elite_hero_title: 'ZENIX ELITE CLUB',
    elite_hero_sub: 'Chaque service vous rapproche du niveau suivant. Accumulez du statut, débloquez des avantages.',
    elite_levels_eyebrow: 'Niveaux',
    elite_prog_title: 'PROGRESSION ELITE',
    elite_tier_bronze: 'BRONZE',
    elite_req_bronze: '1-3 services',
    elite_bronze_f1: 'Priorité de réservation',
    elite_bronze_f2: 'Notifications promos exclusives',
    elite_bronze_f3: 'Rappels d\'entretien',
    elite_tier_silver: 'SILVER',
    elite_req_silver: '4-9 services',
    elite_silver_f1: 'Tout Bronze',
    elite_silver_f2: '5% de remise permanente',
    elite_silver_f3: '1 contrôle gratuit/semestre',
    elite_silver_f4: 'Offres réservées',
    elite_tier_gold: 'GOLD',
    elite_req_gold: '10-24 services',
    elite_gold_f1: 'Tout Silver',
    elite_gold_f2: '10% de remise permanente',
    elite_gold_f3: 'Créneau horaire réservé',
    elite_gold_f4: 'Produits offerts',
    elite_gold_f5: 'Accès anticipé aux nouveaux services',
    elite_tier_black: 'BLACK',
    elite_req_black: '25+ services',
    elite_black_f1: 'Tout Gold',
    elite_black_f2: '15% de remise sur tout',
    elite_black_f3: 'Gestionnaire de compte dédié',
    elite_black_f4: 'Service sur appel sous 24h',
    elite_black_f5: 'Événements VIP Zenix',
    elite_black_f6: 'Plaque d\'hôtel enregistrée',
    contact_hero_eyebrow: 'Nous sommes là pour vous',
    contact_hero_title: 'CONTACTEZ ZENIX',
    contact_hero_sub: 'Toujours disponibles. Choisissez votre canal préféré.',
    contact_channels_eyebrow: 'Canaux',
    contact_where_title: 'OÙ NOUS TROUVER',
    contact_wa: 'WhatsApp',
    contact_zona_label: 'Zone',
    contact_write_eyebrow: 'Écrivez-nous',
    contact_form_title: 'FORMULAIRE DE CONTACT',
    cform_send_us: 'Envoyez-nous un message',
    cform_subject: 'Sujet',
    cform_select: 'Sélectionner',
    cform_message: 'Message',
    cform_msg_ph: 'Écrivez votre message ici...',
    ph_tel: '+33 6 12 34 56 78',
    admin_title: 'PANNEAU ADMIN',
    admin_subtitle: 'Zone réservée Zenix Car Detailing — Gestion horaires, réservations et hôtels.',
    admin_gate_title: 'ACCÈS RÉSERVÉ',
    admin_gate_desc: 'Entrez le mot de passe pour accéder au panneau de contrôle.',
    admin_gate_ph: 'Mot de passe admin',
    admin_back_site: 'Retour au Site',
    admin_stat_total: 'Réservations Totales',
    admin_stat_active: 'Actives',
    admin_stat_cancelled: 'Annulées',
    admin_stat_hotels: 'Plaques d\'Hôtel',
    admin_sched_title: 'Gestion des Horaires par Jour',
    admin_sched_desc: 'Sélectionnez un jour ou une date spécifique. Les dates spécifiques sont prioritaires.',
    admin_back_days: 'Retour aux Jours',
    admin_day_default: 'Lundi',
    admin_specific_date: 'DATE SPÉCIFIQUE',
    admin_bookings_title: 'Réservations',
    admin_bookings_desc: 'Dernières réservations reçues. Cliquez sur Annuler pour libérer le créneau.',
    admin_no_bookings: 'Aucune réservation pour le moment.',
    admin_saved: 'Modifications enregistrées !',
  },
  de: {
    nav_prezzi:'Preise', nav_extra:'Extras', nav_prenota:'Buchen', nav_contatti:'Kontakt',
    nav_book_btn:'Jetzt buchen',
    hero_eyebrow:'🦅 Professionelles Car Detailing',
    hero_sub:'Hausbesuch · Savona & Provinz · Ohne Kompromisse',
    hero_btn1:'Service buchen', hero_btn2:'Preise ansehen',
    badge_home:'📍 Hausbesuch', badge_pro:'💎 Professionell', badge_no_comp:'🛡️ Ohne Kompromisse',
    sec_packages:'Pakete', sec_listino:'PREIS<span>LISTE</span>',
    sec_extras:'Zusätze', sec_extra_title:'EXTRA<span>DIENSTE</span>',
    sec_booking:'Termin', sec_book_title:'SERVICE <span>BUCHEN</span>',
    sec_admin:'Verwaltung', sec_admin_title:'ADMIN<span>PANEL</span>',
    pkg_from:'Ab',
    pkg_badge_featured:'⭐ Empfohlen',
    pkg_name_basic:'BASIS', pkg_name_complete:'KOMPLETT', pkg_name_premium:'PREMIUM',
    pkg_desc_basic:'Grundwäsche · Innen + Leichte Außenreinigung',
    pkg_desc_complete:'Basis + Schutz + Leichte Sitzreinigung',
    pkg_desc_premium:'Komplett + Innenraumdesinfektion + Deep clean',
    pkg_feat_basic_1:'Manuelle Außenwäsche',
    pkg_feat_basic_2:'Grundlegende Innenreinigung (Absaugen + Oberflächen)',
    pkg_feat_basic_3:'Scheiben und Details',
    pkg_feat_complete_1:'Alles aus Basis',
    pkg_feat_complete_2:'Lackschutz (Versiegelung / Wachs)',
    pkg_feat_complete_3:'Leichte Sitz- und Stoffreinigung',
    pkg_feat_complete_4:'Kofferraumreinigung',
    pkg_feat_premium_1:'Alles aus Komplett',
    pkg_feat_premium_2:'Kunststoffbehandlung',
    pkg_feat_premium_3:'Tiefenreinigung Innen',
    pkg_feat_premium_4:'Stoff- und Lederschutz',
    pkg_feat_premium_5:'Innenraumdesinfektion mit Dampf und Ozon',
    pkg_tagline_basic:'Perfekt für schnelle und regelmäßige Pflege.',
    pkg_tagline_complete:'Unser beliebtester Service.',
    pkg_tagline_premium:'Maximale Pflege, maximaler Schutz.',
    extra_card_name_deep:'TIEFENREINIGUNG INNEN',
    extra_card_desc_deep:'Tiefenreinigung von Sitzen, Teppichen, Verkleidungen und Ablagen. Flecken- und Geruchsbeseitigung.',
    extra_card_price_deep:'Auf Anfrage',
    extra_card_name_luc:'FAHRZEUGPOLITUR',
    extra_card_desc_luc:'Stellt Glanz wieder her und beseitigt Lackfehler. Preis variiert je nach Lackzustand und Fahrzeuggröße.',
    extra_tier_one:'Ein Schritt', extra_tier_two:'Zwei Schritte', extra_tier_full:'Vollständig',
    extra_card_name_fari:'SCHEINWERFER-RESTAURIERUNG',
    extra_card_desc_fari:'Wiederherstellung der Transparenz und Leuchtstärke der Scheinwerfer.',
    extra_card_price_fari:'ab €80',
    hotel_title:'Hotelrabatt – 10% Rabatt',
    hotel_desc:'Sind Sie Gast in einem Partnerhotel? Geben Sie Ihr Kennzeichen ein, um den Rabatt automatisch anzuwenden.',
    lbl_nome:'Vorname', lbl_cognome:'Nachname', lbl_tel:'Telefon', lbl_email:'E-Mail',
    lbl_pacchetto:'Paket', lbl_extra:'Zusatzleistungen (optional)',
    lbl_data:'Datum', lbl_orario:'Ausgewählte Uhrzeit', lbl_slots:'Verfügbare Zeiten',
    lbl_indirizzo:'Adresse (wo Ihr Auto geparkt ist)', lbl_targa:'Kennzeichen (Hotelrabatt-Prüfung)',
    lbl_note:'Zusätzliche Hinweise',
    ph_nome:'Hans', ph_cognome:'Müller', ph_email:'hans@email.com',
    ph_orario:'Wählen Sie eine Zeit unten', ph_indirizzo:'Via Roma 10, Savona',
    ph_note:'Autofarbe, Fahrzeugtyp, besondere Wünsche...',
    pkg_placeholder:'— Paket auswählen —', pkg_basic:'Basic – ab €45',
    pkg_complete:'Komplett – ab €70 ⭐', pkg_premium:'Premium – ab €160',
    extra_none:'— Kein Extra —', extra_deep:'Tiefenreinigung Innen (auf Anfrage)',
    extra_luc1:'Politur One Step – ab €120', extra_luc2:'Politur Two Step – ab €180',
    extra_luc3:'Vollpolitur – ab €250', extra_fari:'Scheinwerfer-Restaurierung – ab €80',
    discount_applied:'✅ Hotelrabatt von 10% angewendet!',
    summary_title:'Buchungsübersicht', btn_submit:'🦅 BUCHUNG BESTÄTIGEN',
    btn_sending:'⏳ WIRD GESENDET...',
    summary_pkg:'Paket', summary_extra:'Extra', summary_date:'Datum',
    summary_time:'Uhrzeit', summary_discount:'🏨 Hotelrabatt (10%)',
    summary_total:'Geschätztes Gesamt',
    slots_pick_date:'👆 Bitte zuerst ein Datum auswählen',
    slots_none:'⚠️ Keine verfügbaren Zeiten für das ausgewählte Datum.',
    slots_loading:'⏳ Lade Zeiten...',
    cancel_booking:'Stornieren',
    admin_title:'Reservierter Bereich – Zenix',
    admin_login_desc:'Melden Sie sich an, um Zeiten, Hotelcodes zu verwalten und Buchungen anzuzeigen.',
    contact_tel:'Telefon', contact_insta:'Instagram', contact_web:'Webseite', contact_zona:'Gebiet',
    footer_text:'© 2025 ZENIX Car Detailing · Savona & Provinz · Details, die den Unterschied machen.',
    success_title:'Buchung gesendet!',
    success_msg:'Vielen Dank, dass Sie Zenix Car Detailing gewählt haben. Wir werden Sie bald kontaktieren.',
    success_close:'Schließen',
    days:['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'],
    admin_days:['So','Mo','Di','Mi','Do','Fr','Sa'],
    nav_home: 'Start',
    nav_cfg: 'Konfigurator',
    nav_biz: 'Business',
    nav_cov: 'Abdeckung',
    nav_elite: 'Elite Club',
    wa_title: '💬 Angebot anfragen',
    wa_item1: 'Antwort in wenigen Minuten',
    wa_item2: 'Hausbesuch-Service',
    wa_item3: 'Zertifizierte Profis',
    wa_cta: 'WHATSAPP ÖFFNEN →',
    footer_brand_desc: 'Professionelles Car Detailing per Hausbesuch. Savona & Provinz.',
    footer_nav_title: 'Navigation',
    footer_contact_title: 'Kontakt',
    admin_modal_title: 'Reservierter Bereich',
    admin_modal_desc: 'Passwort eingeben, um auf das Admin-Panel zuzugreifen.',
    admin_modal_pwd: 'Passwort',
    admin_modal_btn: 'ANMELDEN',
    admin_modal_cancel: 'Abbrechen',
    why_title1: 'WIR KOMMEN ZU IHNEN',
    why_desc1: 'Null Fahrten. Ihr Fahrzeug wird dort behandelt, wo es steht.',
    why_title2: 'PREMIUM-PRODUKTE',
    why_desc2: 'Nur zertifizierte Profiprodukte. Showroom-Ergebnisse garantiert.',
    why_title3: 'SCHNELL UND PRÄZISE',
    why_desc3: 'Optimierte Zeiten ohne Qualitätskompromisse.',
    why_title4: 'VOLLSTÄNDIGE GARANTIE',
    why_desc4: 'Jeder Service ist durch eine Zufriedenheitsgarantie abgedeckt.',
    biz_section_desc: 'Maßgeschneiderte Lösungen für Hotels, Autohäuser und Unternehmen.',
    biz_tag1: 'Hotels',
    biz_tag2: 'Autohäuser',
    biz_tag3: 'Unternehmen',
    biz_mini1_title: 'VOR-ORT-SERVICE',
    biz_mini1_sub: 'Hotel oder Unternehmen',
    biz_mini2_title: 'FUHRPARKVERWALTUNG',
    biz_mini2_sub: 'Komplette Verwaltung',
    biz_mini3_title: 'DEDIZIERTES KONTO',
    biz_mini3_sub: 'Einziger Ansprechpartner',
    cfg_preview_title: 'ANGEBOTSKONFIGURATOR',
    cfg_preview_desc: 'Fahrzeug, Paket und Extras wählen. Sofortige Schätzung.',
    cfg_preview_btn: 'Konfigurator starten',
    services_preview_btn: 'Alle Dienste ansehen',
    biz_discover_btn: 'Partnerschaften entdecken',
    elite_how_title: 'SO FUNKTIONIERT ES',
    elite_how_step1: 'Service buchen',
    elite_how_step2: 'Jeder Service zählt',
    elite_how_step3: 'Level aufsteigen',
    elite_how_step4: 'Vorteile genießen',
    elite_status_btn: 'Meinen Status prüfen',
    elite_cta_note: 'Fragen Sie uns Ihren Status auf WhatsApp.',
    contact_card_wa: 'Direktnachricht',
    contact_card_zone: 'Savona & Provinz',
    cform_send_btn: 'NACHRICHT SENDEN',
    cform_sending: 'Wird gesendet...',
    cform_success: 'Nachricht gesendet! Wir antworten bald.',
    cform_err: 'Bitte mindestens Name und Nachricht ausfüllen.',
    cform_subj1: 'Angebotsanfrage',
    cform_subj2: 'Serviceinfos',
    cform_subj3: 'Business-Partnerschaft',
    cform_subj4: 'Elite Club',
    cform_subj5: 'Sonstiges',
    biz_partner_title: 'PARTNERSCHAFT STARTEN',
    biz_partner_desc: 'Interesse, Zenix-Partner zu werden? Kontaktieren Sie uns.',
    biz_partner_btn: 'Auf WhatsApp schreiben',
    coverage_cta_btn: 'Meine Zone prüfen',
    coverage_not_found: 'Zone nicht gefunden? Kontakt aufnehmen.',
    why_title: 'UNSER STANDARD',
    sec_biz: 'Partnerschaft',
    biz_preview_title: 'BUSINESS PARTNERSCHAFT',
    sec_cfg: 'Konfigurator',
    sec_cfg_title: 'BERECHNEN SIE IHR ANGEBOT',
    svc_hero_eyebrow: 'Komplette Preisliste',
    svc_hero_title: 'DIENSTE UND PREISE',
    svc_hero_sub: 'Professionelle Qualität, transparente Preise, garantierte Ergebnisse.',
    cfg_hero_eyebrow: 'Schritt für Schritt',
    cfg_page_title: 'BERECHNEN SIE IHR ANGEBOT',
    cfg_page_sub: 'Konfigurieren Sie den perfekten Service. Sofortige Schätzung, sofortige Buchung.',
    cfg_step_vehicle: 'Fahrzeug',
    cfg_step_package: 'Paket',
    cfg_step_extra: 'Extra',
    cfg_step_quote: 'Angebot',
    cfg_s1_title: 'Wählen Sie Ihren',
    cfg_s1_title_span: 'Fahrzeugtyp',
    cfg_veh_1: 'Kleinwagen',
    cfg_veh_2: 'Limousine',
    cfg_veh_3: 'SUV',
    cfg_veh_4: 'Van',
    cfg_veh_5: 'Sportwagen',
    cfg_next1: 'WEITER - PAKET',
    cfg_next2: 'WEITER - EXTRAS',
    cfg_s2_title: 'Wählen Sie Ihr',
    cfg_s2_title_span: 'Paket',
    cfg_basic_f1: 'Außenwäsche',
    cfg_basic_f2: 'Grundlegende Innenreinigung',
    cfg_basic_f3: 'Scheiben',
    cfg_complete_f1: 'Alles aus Basis',
    cfg_complete_f2: 'Lackschutz',
    cfg_complete_f3: 'Sitzreinigung',
    cfg_complete_f4: 'Kofferraum',
    cfg_premium_f1: 'Alles aus Komplett',
    cfg_premium_f2: 'Politur',
    cfg_premium_f3: 'Tiefenreinigung',
    cfg_premium_f4: 'Ozon',
    cfg_back: 'Zurück',
    cfg_calc: 'ANGEBOT BERECHNEN',
    cfg_s3_title: 'Fügen Sie hinzu',
    cfg_s3_title_span: 'Zusatzleistungen',
    cfg_optional: 'optional',
    cfg_on_quote: 'Auf Anfrage',
    cfg_extra_luc1: 'Politur One Step',
    cfg_extra_luc2: 'Politur Two Step',
    cfg_result_estimate: 'Geschätztes Angebot',
    cfg_result_note: 'Endpreis nach Inspektion',
    cfg_result_duration: 'Dauer',
    cfg_ask_info: 'Infos Anfordern',
    cfg_reconfigure: 'Neu Konfigurieren',
    biz_hero_eyebrow: 'Partnerschaften',
    biz_hero_title: 'BUSINESS PARTNERSCHAFT',
    biz_hero_sub: 'Unternehmenslösungen für Hotels, Autohäuser und Firmen.',
    biz_system_title: 'BUSINESS-PARTNERSCHAFTSSYSTEM',
    biz_badge_partner: 'PARTNER',
    biz_sector: 'Sektor',
    biz_title_hotel: 'HOTELS',
    biz_hotel_f1: 'Service auf dem Hotelparkplatz',
    biz_hotel_f2: 'Exklusiver Rabatt für Gäste mit Kennzeichen',
    biz_hotel_f3: 'Priorisierte und dedizierte Buchungen',
    biz_hotel_f4: 'Einziger Account-Manager',
    biz_hotel_f5: 'Monatliche Sammelrechnung',
    biz_cta_hotel: 'Partner werden',
    biz_badge_enterprise: 'ENTERPRISE',
    biz_title_dealer: 'AUTOHÄUSER',
    biz_dealer_f1: 'Fahrzeugvorbereitung vor/nach Verkauf',
    biz_dealer_f2: 'Komplette Flottenbehandlung',
    biz_dealer_f3: 'Mengenrabatte auf Pakete',
    biz_dealer_f4: 'Garantierte Interventionspriorität',
    biz_dealer_f5: 'Periodische Serviceberichte',
    biz_cta_dealer: 'Angebot Anfordern',
    biz_badge_corporate: 'CORPORATE',
    biz_title_corp: 'UNTERNEHMEN',
    biz_corp_f1: 'Wartung der Unternehmensflotte',
    biz_corp_f2: 'Geplanter Vor-Ort-Einsatz',
    biz_corp_f3: 'Dedizierter Account-Manager',
    biz_corp_f4: 'Gestaffelte Mengenrabatte',
    biz_corp_f5: 'Jahresverträge mit garantiertem SLA',
    biz_cta_corp: 'Team Kontaktieren',
    biz_advantages_eyebrow: 'Vorteile',
    why_zenix_title: 'WARUM',
    brand_zenix: 'ZENIX WÄHLEN',
    ent_f1_title: 'SCHNELLER EINSATZ',
    ent_f1_desc: 'Verfügbares Team, bereit innerhalb weniger Stunden.',
    ent_f2_title: 'BERICHTERSTATTUNG',
    ent_f2_desc: 'Detaillierte monatliche Berichte zu allen Diensten.',
    ent_f3_title: 'EINFACHE RECHNUNGSSTELLUNG',
    ent_f3_desc: 'Eine einzige Monatsrechnung für alle Dienste.',
    ent_f4_title: 'DEDIZIERTES KONTO',
    ent_f4_desc: 'Ein einziger Ansprechpartner für die gesamte Verwaltung.',
    cov_hero_eyebrow: 'Einsatzgebiet',
    cov_hero_title: 'ABDECKUNGSGEBIET',
    cov_hero_sub: 'Wir decken Savona und die gesamte Provinz ab. Wir kommen direkt zu Ihnen.',
    cov_radar_eyebrow: 'Einsatzradar',
    cov_map_title: 'ABDECKUNGSKARTE',
    cov_hq_label: 'ZENIX HQ',
    cov_notfound_eyebrow: 'Ihre Zone nicht gefunden?',
    cov_contact_title: 'KONTAKTIEREN SIE UNS DIREKT',
    cov_notfound_desc: 'Wir prüfen jede Anfrage außerhalb des Standardgebiets. Schreiben Sie uns auf WhatsApp.',
    elite_hero_eyebrow: 'Treueprogramm',
    elite_hero_title: 'ZENIX ELITE CLUB',
    elite_hero_sub: 'Jeder Service bringt Sie näher zum nächsten Level. Status sammeln, Vorteile freischalten.',
    elite_levels_eyebrow: 'Stufen',
    elite_prog_title: 'ELITE-FORTSCHRITT',
    elite_tier_bronze: 'BRONZE',
    elite_req_bronze: '1-3 Dienste',
    elite_bronze_f1: 'Buchungspriorität',
    elite_bronze_f2: 'Exklusive Aktionsbenachrichtigungen',
    elite_bronze_f3: 'Wartungserinnerungen',
    elite_tier_silver: 'SILVER',
    elite_req_silver: '4-9 Dienste',
    elite_silver_f1: 'Alles aus Bronze',
    elite_silver_f2: '5% dauerhafter Rabatt',
    elite_silver_f3: '1 kostenloser Check/Halbjahr',
    elite_silver_f4: 'Exklusive Angebote',
    elite_tier_gold: 'GOLD',
    elite_req_gold: '10-24 Dienste',
    elite_gold_f1: 'Alles aus Silver',
    elite_gold_f2: '10% dauerhafter Rabatt',
    elite_gold_f3: 'Reservierter Zeitslot',
    elite_gold_f4: 'Gratisprodukte',
    elite_gold_f5: 'Früher Zugang zu neuen Diensten',
    elite_tier_black: 'BLACK',
    elite_req_black: '25+ Dienste',
    elite_black_f1: 'Alles aus Gold',
    elite_black_f2: '15% Rabatt auf alles',
    elite_black_f3: 'Dedizierter Account-Manager',
    elite_black_f4: 'Abrufservice innerhalb 24h',
    elite_black_f5: 'VIP Zenix-Events',
    elite_black_f6: 'Registriertes Hotelkennzeichen',
    contact_hero_eyebrow: 'Wir sind für Sie da',
    contact_hero_title: 'ZENIX KONTAKTIEREN',
    contact_hero_sub: 'Immer verfügbar. Wählen Sie Ihren bevorzugten Kanal.',
    contact_channels_eyebrow: 'Kanäle',
    contact_where_title: 'WO SIE UNS FINDEN',
    contact_wa: 'WhatsApp',
    contact_zona_label: 'Gebiet',
    contact_write_eyebrow: 'Schreiben Sie uns',
    contact_form_title: 'KONTAKTFORMULAR',
    cform_send_us: 'Senden Sie uns eine Nachricht',
    cform_subject: 'Betreff',
    cform_select: 'Auswählen',
    cform_message: 'Nachricht',
    cform_msg_ph: 'Schreiben Sie hier Ihre Nachricht...',
    ph_tel: '+49 151 12345678',
    admin_title: 'ADMIN-PANEL',
    admin_subtitle: 'Reservierter Bereich Zenix Car Detailing — Zeitplan-, Buchungs- und Hotelverwaltung.',
    admin_gate_title: 'RESERVIERTER ZUGANG',
    admin_gate_desc: 'Geben Sie das Passwort ein, um auf das Kontrollpanel zuzugreifen.',
    admin_gate_ph: 'Admin-Passwort',
    admin_back_site: 'Zurück zur Website',
    admin_stat_total: 'Buchungen Gesamt',
    admin_stat_active: 'Aktiv',
    admin_stat_cancelled: 'Storniert',
    admin_stat_hotels: 'Hotel-Kennzeichen',
    admin_sched_title: 'Tägliche Zeitplanverwaltung',
    admin_sched_desc: 'Wählen Sie einen Wochentag oder ein bestimmtes Datum. Bestimmte Daten haben Priorität.',
    admin_back_days: 'Zurück zu Tagen',
    admin_day_default: 'Montag',
    admin_specific_date: 'BESTIMMTES DATUM',
    admin_bookings_title: 'Buchungen',
    admin_bookings_desc: 'Letzte eingegangene Buchungen. Klicken Sie auf Stornieren, um den Slot freizugeben.',
    admin_no_bookings: 'Noch keine Buchungen.',
    admin_saved: 'Änderungen gespeichert!',
  }
};

let currentLang = localStorage.getItem('zx_lang') || 'it';

/**
 * t(key) — traduzione sicura.
 * NON ritorna mai la chiave come fallback (evita il bug che iniettava 
 * "pkg_from" come testo visibile nel DOM).
 * Gerarchia: lang corrente → italiano → stringa vuota.
 */
function t(key) {
  const langObj = TRANSLATIONS[currentLang];
  if (langObj && langObj[key] !== undefined) return langObj[key];
  const itObj = TRANSLATIONS['it'];
  if (itObj && itObj[key] !== undefined) return itObj[key];
  // NON ritornare la chiave — ritorna stringa vuota così l'elemento 
  // mantiene il suo testo originale HTML invece di mostrare la chiave
  console.warn('[i18n] Chiave mancante:', key, 'per lingua:', currentLang);
  return '';
}
// Alias: tr() === t() — usato nei moduli booking e admin
const tr = t;

function setLang(lang) {
  if (!TRANSLATIONS[lang]) return; // lingua non supportata
  currentLang = lang;
  localStorage.setItem('zx_lang', lang);
  const root = document.getElementById('html-root');
  if (root) root.lang = lang;
  // Aggiorna bottoni lingua
  ['it','en','fr','de'].forEach(l => {
    const btn = document.getElementById('lang-' + l);
    if (btn) btn.classList.toggle('active', l === lang);
  });
  applyTranslations();
  // Re-render UI dinamica
  const fData = document.getElementById('f-data');
  if (typeof renderBookingSlots === 'function') renderBookingSlots(fData ? fData.value : null);
  if (typeof renderAdminSlots === 'function') renderAdminSlots();
  if (typeof renderHotelCodes === 'function') renderHotelCodes();
  if (typeof renderAdminBookings === 'function') renderAdminBookings();
  if (typeof updateAdminDayTabs === 'function') updateAdminDayTabs();
}

function applyTranslations() {
  // Elementi con data-i18n → innerHTML
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = t(key);
    // Solo aggiorna se la traduzione esiste, altrimenti lascia il testo originale
    if (val !== '') el.innerHTML = val;
  });
  // Elementi con data-i18n-ph → placeholder
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    const val = t(key);
    if (val !== '') el.placeholder = val;
  });
  // Bottone navbar (textContent, non innerHTML)
  const navBtn = document.getElementById('nav-book-btn');
  if (navBtn) { const v = t('nav_book_btn'); if (v) navBtn.textContent = v; }
  // Bottone submit
  const submitBtn = document.getElementById('submit-btn');
  if (submitBtn) { const v = t('btn_submit'); if (v) submitBtn.textContent = v; }
  // Aggiorna tab giorni admin
  if (typeof updateAdminDayTabs === 'function') updateAdminDayTabs();
}



/* ============================================================
   SEZIONE 2. FIREBASE
   ============================================================ */
/**
 * firebase.js — Firebase Realtime Database (REST API, no SDK)
 * 
 * SETUP:
 * 1. https://firebase.google.com → crea progetto → Realtime Database
 * 2. Copia l'URL del database (es. https://zenix-xxxx-default-rtdb.firebaseio.com)
 * 3. Sostituiscilo qui sotto in FIREBASE_DB_URL
 * 4. Regole: { "rules": { ".read": true, ".write": true } }
 */
/* jshint esversion: 8 */
'use strict';

// ── FIREBASE ──
const FIREBASE_DB_URL = 'https://zenix-detailing-default-rtdb.firebaseio.com';
const firebaseEnabled = FIREBASE_DB_URL !== 'https://INSERISCI-IL-TUO-DB.firebaseio.com' && FIREBASE_DB_URL !== '';
async function fbGet(path){try{const r=await fetch(`${FIREBASE_DB_URL}/${path}.json`,{cache:'no-store'});if(!r.ok)return null;return await r.json()}catch(e){return null}}
async function fbSet(path,data){try{await fetch(`${FIREBASE_DB_URL}/${path}.json`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)})}catch(e){}}
async function fbPush(path,data){try{await fetch(`${FIREBASE_DB_URL}/${path}.json`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)})}catch(e){}}
async function fbPatch(path,data){try{await fetch(`${FIREBASE_DB_URL}/${path}.json`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)})}catch(e){}}

// ── Sync helpers (richiedono state da app.js) ──────────────────────
async function loadBookedSlots() {
  if (!firebaseEnabled) {
    const local = localStorage.getItem('zx_booked');
    if (local) { try { state.bookedSlots = JSON.parse(local); } catch(e){} }
    return;
  }
  const data = await fbGet('bookedSlots');
  if (data && typeof data === 'object') {
    state.bookedSlots = data;
    localStorage.setItem('zx_booked', JSON.stringify(data));
  }
}
async function saveBookedSlots() {
  localStorage.setItem('zx_booked', JSON.stringify(state.bookedSlots));
  if (firebaseEnabled) await fbSet('bookedSlots', state.bookedSlots);
}


/* ============================================================
   SEZIONE 3. STATO APP
   ============================================================ */
/**
 * app.js — Stato globale e inizializzazione Zenix
 * Dipende da: translations.js, firebase.js
 */
/* jshint esversion: 8 */
'use strict';

// ── EmailJS ──────────────────────────────────────────────────────────
const EMAILJS_PUBLIC_KEY  = 'c3eAWukBKhlk3GoyC';
const EMAILJS_SERVICE_ID  = 'Zenix';
const EMAILJS_TEMPLATE_ID = 'template_6gi9os6';
window.addEventListener('load', () => {
  if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }
});

// ── Schedule defaults (admin può sovrascrivere via localStorage) ─────
const DAY_KEYS = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
const DEFAULT_SCHEDULE = {
  MON: ['09:00','10:00','11:00','14:00','15:00','16:00'],
  TUE: ['09:00','10:00','11:00','14:00','15:00','16:00'],
  WED: ['09:00','11:00','13:00','15:00','17:00'],
  THU: ['09:00','10:00','11:00','14:00','15:00','16:00'],
  FRI: ['09:00','10:00','11:00','14:00','15:00','16:00'],
  SAT: ['08:00','09:00','10:00','11:00','12:00'],
  SUN: []
};

// ── Stato globale applicazione ────────────────────────────────────────
const state = {
  schedule:    JSON.parse(localStorage.getItem('zx_schedule') || 'null') || DEFAULT_SCHEDULE,
  bookedSlots: {},
  hotelCodes:  JSON.parse(localStorage.getItem('zx_hotel') || '["AB123CD","XY456ZW","SA789LN"]'),
  bookings:    JSON.parse(localStorage.getItem('zx_bookings') || '[]'),
  adminPwd:    localStorage.getItem('zx_pwd') || 'zenix2024'
};

// ── Variabili di sessione (reset ogni pagina) ─────────────────────────
let selectedSlot    = null;
let discountApplied = false;
let adminCurrentDay = 'MON';

// ── Helpers localstorage ──────────────────────────────────────────────
function saveState(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

// ── Date helpers ──────────────────────────────────────────────────────
function dateToKey(dateStr) {
  return DAY_KEYS[new Date(dateStr + 'T00:00:00').getDay()];
}
function getSlotsForDate(dateStr) {
  if (state.schedule[dateStr]) return [...state.schedule[dateStr]];
  const dow = dateToKey(dateStr);
  return state.schedule[dow] ? [...state.schedule[dow]] : [];
}
function getBookedForDate(dateStr) {
  return state.bookedSlots[dateStr] || [];
}
function isSlotBooked(dateStr, time) {
  return getBookedForDate(dateStr).includes(time);
}

// ── Init comune (chiamata da ogni pagina) ─────────────────────────────
function zenixInit() {
  // Lingua salvata
  const saved = localStorage.getItem('zx_lang') || 'it';
  if (typeof setLang === 'function') setLang(saved);

  // Imposta data minima nel form prenotazione (solo su index.html)
  const fd = document.getElementById('f-data');
  if (fd) fd.min = new Date().toISOString().split('T')[0];

  // Uppercase targa hotel admin
  const nc = document.getElementById('new-hotel-code');
  if (nc) nc.addEventListener('input', function() {
    this.value = this.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
  });
}


/* ============================================================
   SEZIONE 4. UTILITY CONDIVISE
   ============================================================ */
/**
 * utils.js — Utility condivise Zenix
 * Particelle, nav scroll, reveal, transizioni, hamburger, WhatsApp, admin segreto
 */
/* jshint esversion: 8 */
'use strict';

// ── PARTICLES ──
(function(){
  const c=document.getElementById('particles');
  if(!c)return;
  const ctx=c.getContext('2d');
  let W,H,pts;
  function resize(){W=c.width=window.innerWidth;H=c.height=window.innerHeight;init()}
  function init(){pts=Array.from({length:50},()=>{return{x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,r:Math.random()*1.5+.5,a:Math.random()}})}
  function draw(){
    ctx.clearRect(0,0,W,H);
    pts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(0,200,200,${p.a*.4})`;ctx.fill()});
    for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<120){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(0,200,200,${(1-d/120)*.12})`;ctx.lineWidth=.5;ctx.stroke()}}
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize',resize);resize();draw();
})();

// ── NAV SCROLL ──
window.addEventListener('scroll',()=>{
  const nb=document.getElementById('navbar');
  if(nb)nb.classList.toggle('scrolled',window.scrollY>40);
});

// ── SCROLL REVEAL ──
(function(){
  const obs = new IntersectionObserver(
    entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); }),
    {threshold: 0.12}
  );
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
})();

// ── PAGE TRANSITIONS ──
function navTo(e, url, cb) {
  if(e) e.preventDefault();
  const overlay = document.getElementById('page-transition');
  if(overlay) {
    overlay.classList.add('fade-out');
    setTimeout(() => { window.location.href = url; }, 280);
  } else {
    window.location.href = url;
  }
  if(cb) cb();
}
window.addEventListener('pageshow', () => {
  const overlay = document.getElementById('page-transition');
  if(overlay) overlay.classList.remove('fade-out');
});

// ── HAMBURGER ──
function toggleMobMenu(){
  const m=document.getElementById('mob-menu'),b=document.getElementById('hamburger-btn');
  if(!m||!b) return;
  const o=m.classList.toggle('active');b.classList.toggle('open',o);
  document.body.style.overflow=o?'hidden':'';
}
function closeMobMenu(){
  const m=document.getElementById('mob-menu'),b=document.getElementById('hamburger-btn');
  m.classList.remove('active');b.classList.remove('open');document.body.style.overflow='';
}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMobMenu()});

// ── WHATSAPP ──
function openWhatsApp(){
  const msg=encodeURIComponent('Ciao Zenix! Vorrei richiedere un preventivo per il servizio di car detailing a domicilio. 🚗✨');
  window.open('https://wa.me/393331234567?text='+msg,'_blank');
}
const waBtn=document.getElementById('wa-btn');
const waCard=document.getElementById('wa-card');
if(waBtn){
  let waTimer;
  waBtn.addEventListener('mouseenter',()=>{waTimer=setTimeout(()=>{if(waCard)waCard.classList.add('visible')},300)});
  waBtn.addEventListener('mouseleave',()=>{clearTimeout(waTimer);setTimeout(()=>{if(waCard)waCard.classList.remove('visible')},400)});
  if(waCard){
    waCard.addEventListener('mouseenter',()=>{clearTimeout(waTimer)});
    waCard.addEventListener('mouseleave',()=>{waCard.classList.remove('visible')});
  }
  waBtn.addEventListener('mousemove',ev=>{
    const r=waBtn.getBoundingClientRect();
    const dx=ev.clientX-(r.left+r.width/2),dy=ev.clientY-(r.top+r.height/2);
    waBtn.style.transform=`scale(1.1) translate(${dx*.2}px,${dy*.2}px)`;
  });
  waBtn.addEventListener('mouseleave',()=>{waBtn.style.transform=''});
}

// ── SECRET ADMIN (5 clicks in 3s on footer logo) ──
(function(){
  let clicks=[],adminPwd=localStorage.getItem('zx_pwd')||'zenix2024';
  const trigger=document.getElementById('footer-logo-trigger');
  if(!trigger)return;
  trigger.addEventListener('click',e=>{
    e.preventDefault();
    const now=Date.now();
    clicks=clicks.filter(ts=>now-ts<3000);
    clicks.push(now);
    if(clicks.length>=5){
      clicks=[];
      trigger.style.textShadow='0 0 30px var(--teal)';
      setTimeout(()=>{trigger.style.textShadow=''},600);
      setTimeout(()=>openAdminModal(),300);
    }
  });
  window.openAdminModal=function(){document.getElementById('admin-modal').classList.add('show');document.getElementById('admin-pwd-input').focus()};
  window.closeAdminModal=function(){document.getElementById('admin-modal').classList.remove('show')};
  window.checkAdminPwd=function(){
    const pwd=document.getElementById('admin-pwd-input').value;
    const stored=localStorage.getItem('zx_pwd')||'zenix2024';
    if(pwd===stored){
      closeAdminModal();navTo(null,'admin.html');
    }else{
      document.getElementById('admin-pwd-input').style.borderColor='#ff5555';
      setTimeout(()=>{document.getElementById('admin-pwd-input').style.borderColor=''},1500);
    }
  };
  document.addEventListener('keydown',ev=>{if(ev.key==='Escape')closeAdminModal()});
})();


/* ============================================================
   SEZIONE 5. PRENOTAZIONE
   ============================================================ */
/**
 * booking.js — Sistema prenotazione Zenix
 * Dipende da: app.js, firebase.js, translations.js
 */
/* jshint esversion: 8 */
'use strict';

// ── loadBookedSlots() / saveBookedSlots() sono definite in firebase.js ──
// (caricato prima di questo file — vedi ordine script in ogni pagina)

// ── Cambio data: ricarica slot da Firebase ───────────────────────────
async function onDateChange() {
  const dateStr = document.getElementById('f-data').value;
  selectedSlot  = null;
  const od  = document.getElementById('f-orario');
  const odd = document.getElementById('f-orario-display');
  if (od)  od.value  = '';
  if (odd) odd.value = '';
  updateSummary();
  const grid = document.getElementById('slots-grid');
  if (grid) grid.innerHTML = '<span class="slots-placeholder">' + t('slots_loading') + '</span>';
  await loadBookedSlots();
  renderBookingSlots(dateStr);
}

// ── Render griglia slot ───────────────────────────────────────────────
function renderBookingSlots(dateStr) {
  const grid = document.getElementById('slots-grid');
  if (!grid) return;
  if (!dateStr) {
    grid.innerHTML = '<span class="slots-placeholder">' + t('slots_pick_date') + '</span>';
    return;
  }
  const available = getSlotsForDate(dateStr);
  const booked    = getBookedForDate(dateStr);
  if (!available.length) {
    grid.innerHTML = '<span class="no-slots-msg">' + t('slots_none') + '</span>';
    return;
  }
  grid.innerHTML = available.map(time => {
    const isBooked   = booked.includes(time);
    const isSelected = selectedSlot === time;
    const cls = 'time-slot' + (isBooked ? ' booked' : isSelected ? ' selected' : '');
    const click = isBooked ? '' : 'onclick="selectSlot(\'' + time + '\')"';
    return '<div class="' + cls + '" ' + click + '>' + time + (isBooked ? ' ✕' : '') + '</div>';
  }).join('');
}

function selectSlot(t_val) {
  const dateStr = document.getElementById('f-data').value;
  if (!dateStr || isSlotBooked(dateStr, t_val)) return;
  selectedSlot = t_val;
  document.getElementById('f-orario').value         = t_val;
  document.getElementById('f-orario-display').value = t_val;
  renderBookingSlots(dateStr);
  updateSummary();
}

// ── Sconto hotel ──────────────────────────────────────────────────────
function checkTarga(inp) {
  inp.value = inp.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
  const isHotel = state.hotelCodes.includes(inp.value.trim());
  discountApplied = isHotel;
  const badge = document.getElementById('discount-badge');
  const msg   = document.getElementById('discount-msg');
  if (badge) badge.style.display = isHotel ? 'inline-block' : 'none';
  if (msg)   msg.style.display   = isHotel ? 'block' : 'none';
  updateSummary();
}

// ── Riepilogo dinamico ────────────────────────────────────────────────
function updateSummary() {
  const pkg   = document.getElementById('f-pacchetto');
  const extra = document.getElementById('f-extra');
  const dataEl= document.getElementById('f-data');
  const sumEl = document.getElementById('booking-summary');
  if (!pkg || !sumEl) return;
  if (!pkg.value && !selectedSlot) { sumEl.style.display = 'none'; return; }
  sumEl.style.display = 'block';
  let rows = '', total = 0;
  if (pkg.value) {
    const [name, price] = pkg.value.split('|');
    const p = parseInt(price); total += p;
    rows += '<div class="summary-row"><span>' + t('summary_pkg') + ': ' + name + '</span><span class="val">da &euro;' + p + '</span></div>';
  }
  if (extra && extra.value) {
    const [name, price] = extra.value.split('|');
    const p = parseInt(price);
    if (p > 0) {
      total += p;
      rows += '<div class="summary-row"><span>' + t('summary_extra') + ': ' + name + '</span><span class="val">da &euro;' + p + '</span></div>';
    } else {
      rows += '<div class="summary-row"><span>' + t('summary_extra') + ': ' + name + '</span><span class="val">Su richiesta</span></div>';
    }
  }
  if (selectedSlot) rows += '<div class="summary-row"><span>' + t('summary_time') + '</span><span class="val">' + selectedSlot + '</span></div>';
  if (dataEl && dataEl.value) {
    const d = new Date(dataEl.value + 'T00:00:00');
    const locales = {it:'it-IT',en:'en-GB',fr:'fr-FR',de:'de-DE'};
    rows += '<div class="summary-row"><span>' + t('summary_date') + '</span><span class="val">' + d.toLocaleDateString(locales[currentLang]||'it-IT') + '</span></div>';
  }
  if (discountApplied && total > 0) {
    const disc = Math.round(total * 0.1); total -= disc;
    rows += '<div class="summary-row discount"><span>' + t('summary_discount') + '</span><span class="val">-&euro;' + disc + '</span></div>';
  }
  if (total > 0) rows += '<div class="summary-row"><span><strong>' + t('summary_total') + '</strong></span><span class="val"><strong>da &euro;' + total + '</strong></span></div>';
  const rowsEl = document.getElementById('summary-rows');
  if (rowsEl) rowsEl.innerHTML = rows;
}

// ── Invio prenotazione ────────────────────────────────────────────────
async function submitBooking() {
  const required = ['f-nome','f-cognome','f-tel','f-indirizzo','f-pacchetto'];
  for (const id of required) {
    const el = document.getElementById(id);
    if (!el || !el.value.trim()) {
      if (el) { el.focus(); el.style.borderColor='#ff5555'; setTimeout(()=>el.style.borderColor='',2000); }
      return;
    }
  }
  if (!selectedSlot) { alert(t('slots_pick_date')); return; }
  const dateStr = document.getElementById('f-data').value;
  if (!dateStr)  { alert('Seleziona una data.'); return; }

  const btn = document.getElementById('submit-btn');
  if (btn) { btn.disabled = true; btn.textContent = t('btn_sending'); }

  // Re-fetch slot da Firebase prima di salvare (anti race-condition)
  await loadBookedSlots();

  if (isSlotBooked(dateStr, selectedSlot)) {
    alert('\u26a0\ufe0f Questo orario \u00e8 stato appena prenotato. Scegli un altro orario.');
    if (btn) { btn.disabled = false; btn.textContent = t('btn_submit'); }
    renderBookingSlots(dateStr);
    selectedSlot = null;
    return;
  }

  const pkgRaw    = document.getElementById('f-pacchetto').value;
  const extraRaw  = (document.getElementById('f-extra')||{}).value || '';
  const pkgName   = pkgRaw   ? pkgRaw.split('|')[0]   : '\u2014';
  const pkgPrice  = pkgRaw   ? pkgRaw.split('|')[1]   : '0';
  const extraName = extraRaw ? extraRaw.split('|')[0]  : 'Nessuno';

  const booking = {
    id:        Date.now(),
    nome:      (document.getElementById('f-nome').value + ' ' + document.getElementById('f-cognome').value).trim(),
    tel:       document.getElementById('f-tel').value,
    email:     (document.getElementById('f-email')||{}).value || '',
    pacchetto: pkgRaw, extra: extraRaw,
    data: dateStr, orario: selectedSlot,
    indirizzo: document.getElementById('f-indirizzo').value,
    targa:     (document.getElementById('f-targa')||{}).value || '',
    sconto:    discountApplied,
    note:      (document.getElementById('f-note')||{}).value || '',
    creato:    new Date().toISOString(),
    cancelled: false
  };

  if (!state.bookedSlots[dateStr]) state.bookedSlots[dateStr] = [];
  state.bookedSlots[dateStr].push(selectedSlot);
  await saveBookedSlots();

  state.bookings.unshift(booking);
  saveState('zx_bookings', state.bookings);
  if (firebaseEnabled) await fbPush('bookings', booking);

  // EmailJS
  try {
    if (typeof emailjs !== 'undefined' && EMAILJS_SERVICE_ID !== 'TUO_SERVICE_ID') {
      const d = new Date(dateStr + 'T00:00:00');
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_email: 'youssefbousselham1@gmail.com',
        nome: booking.nome, tel: booking.tel, email: booking.email || 'n/a',
        pacchetto: pkgName + ' (\u20ac' + pkgPrice + ')',
        extra: extraName,
        data: d.toLocaleDateString('it-IT'), orario: selectedSlot,
        indirizzo: booking.indirizzo,
        targa: booking.targa || 'n/a',
        sconto: discountApplied ? 'S\u00cc -10%' : 'No',
        note: booking.note || 'n/a',
        data_creazione: new Date().toLocaleString('it-IT')
      });
    }
  } catch(err) { console.warn('EmailJS:', err); }

  if (btn) { btn.disabled = false; btn.textContent = t('btn_submit'); }
  const overlay = document.getElementById('success-overlay');
  if (overlay) overlay.classList.add('show');

  // Reset form
  ['f-nome','f-cognome','f-tel','f-email','f-pacchetto','f-extra',
   'f-data','f-indirizzo','f-targa','f-note'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  ['f-orario-display','f-orario'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  selectedSlot = null; discountApplied = false;
  ['discount-badge','discount-msg'].forEach(id => {
    const el = document.getElementById(id); if(el) el.style.display = 'none';
  });
  const sumEl = document.getElementById('booking-summary');
  if (sumEl) sumEl.style.display = 'none';
  renderBookingSlots(null);

  // Firebase banner
  if (!firebaseEnabled) {
    const b = document.getElementById('fb-banner');
    if (b) b.style.display = 'block';
  }
}

// Inizializza prenotazione (chiamata da index.html)
async function bookingInit() {
  await loadBookedSlots();
  if (!firebaseEnabled) {
    const b = document.getElementById('fb-banner');
    if (b) b.style.display = 'block';
  }
}


/* ============================================================
   SEZIONE 6. ADMIN
   ============================================================ */
/**
 * admin.js — Pannello amministrativo Zenix
 * Dipende da: app.js, firebase.js, translations.js
 */
/* jshint esversion: 8 */
'use strict';

// ── Firebase sync admin ───────────────────────────────────────────────
async function loadBookedSlotsAdm() {
  if (!firebaseEnabled) {
    const l = localStorage.getItem('zx_booked');
    if (l) { try { state.bookedSlots = JSON.parse(l); } catch(e) {} }
    return;
  }
  const data = await fbGet('bookedSlots');
  if (data && typeof data === 'object') {
    state.bookedSlots = data;
    localStorage.setItem('zx_booked', JSON.stringify(data));
  }
}
async function saveBookedSlotsAdm() {
  localStorage.setItem('zx_booked', JSON.stringify(state.bookedSlots));
  if (firebaseEnabled) await fbSet('bookedSlots', state.bookedSlots);
}
async function loadFirebaseBookings() {
  if (!firebaseEnabled) return;
  const data = await fbGet('bookings');
  if (!data || typeof data !== 'object') return;
  const existing = new Set(state.bookings.map(b => b.id));
  Object.values(data).filter(Boolean).forEach(b => {
    if (b.id && !existing.has(b.id)) { state.bookings.push(b); existing.add(b.id); }
  });
  state.bookings.sort((a,b) => (b.id||0)-(a.id||0));
  saveState('zx_bookings', state.bookings);
  renderAdminBookings();
}

// ── Login ─────────────────────────────────────────────────────────────
async function adminLogin() {
  const inp = document.getElementById('admin-pwd');
  if (!inp || inp.value !== state.adminPwd) {
    if (inp) { inp.style.borderColor='#ff5555'; setTimeout(()=>inp.style.borderColor='',1500); }
    return;
  }
  document.getElementById('admin-gate').style.display = 'none';
  document.getElementById('admin-content').classList.add('visible');
  sessionStorage.setItem('zx_admin_auth','true');
  adminCurrentDay = 'MON';
  renderAdminSlots(); renderHotelCodes(); renderAdminBookings();
  updateAdminDayTabs(); updateAdminStats();
  await loadBookedSlotsAdm();
  if (firebaseEnabled) await loadFirebaseBookings();
}

// ── Stats dashboard ───────────────────────────────────────────────────
function updateAdminStats() {
  const s = id => document.getElementById(id);
  if(s('stat-total'))     s('stat-total').textContent     = state.bookings.length;
  if(s('stat-active'))    s('stat-active').textContent    = state.bookings.filter(b=>!b.cancelled).length;
  if(s('stat-cancelled')) s('stat-cancelled').textContent = state.bookings.filter(b=>b.cancelled).length;
  if(s('stat-hotels'))    s('stat-hotels').textContent    = state.hotelCodes.length;
}

// ── Gestione giorno/tab ───────────────────────────────────────────────
function updateAdminDayTabs() {
  const rawNames = t('admin_days');
  const names = Array.isArray(rawNames) ? rawNames : ['Dom','Lun','Mar','Mer','Gio','Ven','Sab'];
  ['MON','TUE','WED','THU','FRI','SAT','SUN'].forEach(day => {
    const btn = document.getElementById('dtab-' + day);
    if (!btn) return;
    const idx = ['SUN','MON','TUE','WED','THU','FRI','SAT'].indexOf(day);
    btn.textContent = (names[idx] || day).slice(0,3);
  });
}
function selectAdminDay(key) {
  adminCurrentDay = key;
  const isDate = /^\d{4}-\d{2}-\d{2}$/.test(key);
  document.querySelectorAll('.day-tab').forEach(tab=>tab.classList.remove('active'));
  const badge = document.getElementById('specific-date-badge');
  if (badge) badge.style.display = isDate ? 'inline-block' : 'none';
  const rawDays = t('days');
  const dow = Array.isArray(rawDays) ? rawDays : ['Dom','Lun','Mar','Mer','Gio','Ven','Sab'];
  const lbl = document.getElementById('admin-day-label');
  if (isDate) {
    const d = new Date(key+'T00:00:00');
    if (lbl) lbl.textContent = key + ' (' + (dow[d.getDay()]||'') + ')';
  } else {
    const btn = document.getElementById('dtab-'+key);
    if (btn) btn.classList.add('active');
    const idx = ['SUN','MON','TUE','WED','THU','FRI','SAT'].indexOf(key);
    if (lbl) lbl.textContent = dow[idx] || key;
  }
  renderAdminSlots();
}
function clearSpecificDate() {
  const el = document.getElementById('admin-specific-date');
  if (el) el.value = '';
  selectAdminDay('MON');
}

// ── Slot editor ───────────────────────────────────────────────────────
function renderAdminSlots() {
  const el = document.getElementById('admin-slots');
  if (!el) return;
  const slots = state.schedule[adminCurrentDay] || [];
  if (!slots.length) {
    el.innerHTML = '<span style="color:var(--muted);font-size:.85rem;font-style:italic">Nessun orario configurato.</span>';
    return;
  }
  const booked = adminCurrentDay.includes('-') ? (state.bookedSlots[adminCurrentDay]||[]) : [];
  el.innerHTML = slots.map((time,i) => {
    const isB = booked.includes(time);
    return '<div class="slot-toggle active" style="'+(isB?'opacity:.4;border-style:dashed':'')+'">'
      + time + (isB ? ' (occ.)' : '')
      + '<button onclick="removeSlot('+i+')" style="margin-left:.5rem;background:none;border:none;'
      + 'color:#ff7070;cursor:pointer;font-size:.8rem;'+(isB?'pointer-events:none':'')+'">'
      + '&times;</button></div>';
  }).join('');
}
function addSlot() {
  const inp = document.getElementById('new-slot-time');
  if (!inp || !inp.value) return;
  if (!state.schedule[adminCurrentDay]) state.schedule[adminCurrentDay] = [];
  if (state.schedule[adminCurrentDay].includes(inp.value)) { alert('Orario gia presente.'); return; }
  state.schedule[adminCurrentDay].push(inp.value);
  state.schedule[adminCurrentDay].sort();
  saveState('zx_schedule', state.schedule);
  renderAdminSlots(); showSaveNotice(); inp.value = '';
}
function removeSlot(idx) {
  if (!state.schedule[adminCurrentDay]) return;
  state.schedule[adminCurrentDay].splice(idx,1);
  saveState('zx_schedule', state.schedule);
  renderAdminSlots(); showSaveNotice();
}

// ── Codici hotel ──────────────────────────────────────────────────────
function renderHotelCodes() {
  const el = document.getElementById('hotel-codes-list');
  if (!el) return;
  if (!state.hotelCodes.length) {
    el.innerHTML = '<li style="color:var(--muted);font-size:.85rem">Nessuna targa registrata.</li>';
    return;
  }
  el.innerHTML = state.hotelCodes.map((c,i) =>
    '<li class="hotel-code-item"><span>'+(i+1)+'.</span>'
    + '<span class="code-val">'+c+'</span>'
    + '<span style="color:var(--muted);font-size:.8rem">Sconto 10%</span>'
    + '<button onclick="removeHotelCode('+i+')">&times;</button></li>'
  ).join('');
}
function addHotelCode() {
  const inp = document.getElementById('new-hotel-code');
  if (!inp) return;
  const val = inp.value.toUpperCase().trim();
  if (!val) return;
  if (state.hotelCodes.includes(val)) { alert('Targa gia presente.'); return; }
  state.hotelCodes.push(val);
  saveState('zx_hotel', state.hotelCodes);
  renderHotelCodes(); showSaveNotice(); inp.value = '';
}
function removeHotelCode(i) {
  state.hotelCodes.splice(i,1);
  saveState('zx_hotel', state.hotelCodes);
  renderHotelCodes(); showSaveNotice();
}

// ── Log prenotazioni ──────────────────────────────────────────────────
function renderAdminBookings() {
  const el = document.getElementById('bookings-log');
  if (!el) return;
  if (!state.bookings.length) {
    el.innerHTML = '<p style="color:var(--muted);font-size:.85rem">Nessuna prenotazione ancora.</p>';
    return;
  }
  const active    = state.bookings.filter(b=>!b.cancelled);
  const cancelled = state.bookings.filter(b=>b.cancelled);
  const renderEntry = b => {
    const pkg   = b.pacchetto ? b.pacchetto.split('|')[0] : '-';
    const extra = b.extra     ? b.extra.split('|')[0]     : '';
    const d = new Date(b.data+'T00:00:00');
    return '<div class="booking-entry" style="'+(b.cancelled?'opacity:.4;border-style:dashed':'')+'">'
      + '<div class="be-name">'+(b.cancelled?'&#10060;':'&#128663;')+' '+b.nome+' &ndash; '+(b.targa||'n/a')
      + (b.sconto?' <span style="color:var(--gold)">[hotel-10%]</span>':'')
      + (b.cancelled?' <span style="color:#ff7070;font-size:.75rem">ANNULLATA</span>':'')+'</div>'
      + '<div class="be-details">Data: '+d.toLocaleDateString('it-IT')+' ore '+b.orario
      + ' | '+pkg+(extra?' + '+extra:'')
      + '<br>Tel: '+b.tel+' | '+b.indirizzo+(b.note?' | '+b.note:'')+'</div>'
      + (!b.cancelled?'<button class="be-cancel" onclick="cancelBooking('+b.id+')">Annulla</button>':'')
      + '</div>';
  };
  el.innerHTML = [
    ...active.slice(0,20).map(renderEntry),
    ...(cancelled.length?['<div style="color:var(--muted);font-size:.75rem;margin-top:.8rem">- Annullate -</div>']:[]),
    ...cancelled.slice(0,5).map(renderEntry)
  ].join('');
  updateAdminStats();
}
async function cancelBooking(id) {
  const booking = state.bookings.find(b=>b.id===id);
  if (!booking) return;
  const d = new Date(booking.data+'T00:00:00');
  if (!confirm('Annullare prenotazione di '+booking.nome+' per il '+d.toLocaleDateString('it-IT')+' alle '+booking.orario+'?')) return;
  booking.cancelled = true;
  if (state.bookedSlots[booking.data]) {
    state.bookedSlots[booking.data] = state.bookedSlots[booking.data].filter(s=>s!==booking.orario);
    if (!state.bookedSlots[booking.data].length) delete state.bookedSlots[booking.data];
    await saveBookedSlotsAdm();
  }
  saveState('zx_bookings', state.bookings);
  if (firebaseEnabled) {
    const data = await fbGet('bookings');
    if (data) for (const [k,v] of Object.entries(data)) {
      if (v && v.id===id) { await fbPatch('bookings/'+k,{cancelled:true}); break; }
    }
  }
  renderAdminBookings(); showSaveNotice();
}

function showSaveNotice() {
  const n = document.getElementById('save-notice');
  if (!n) return;
  n.classList.add('show');
  setTimeout(()=>n.classList.remove('show'), 2500);
}

// ── Auto-login da sessionStorage ──────────────────────────────────────
async function adminAutoLogin() {
  if (sessionStorage.getItem('zx_admin_auth') !== 'true') return;
  const gate = document.getElementById('admin-gate');
  const content = document.getElementById('admin-content');
  if (gate)    gate.style.display = 'none';
  if (content) content.classList.add('visible');
  adminCurrentDay = 'MON';
  renderAdminSlots(); renderHotelCodes(); renderAdminBookings();
  updateAdminDayTabs(); updateAdminStats();
  await loadBookedSlotsAdm();
  if (firebaseEnabled) await loadFirebaseBookings();
}


/* ============================================================
   SEZIONE 7. CONFIGURATORE
   ============================================================ */
/**
 * configurator.js — Configuratore preventivo Zenix (4 step)
 * Dipende da: app.js, translations.js
 */
/* jshint esversion: 6 */
'use strict';

const cfgState = {
  step: 1,
  vehicle: null, vehicleExtra: 0, vehicleIcon: '',
  pkg: null, pkgPrice: 0, pkgTime: '',
  extras: []
};

function cfgSelectVehicle(el, name, extra, icon) {
  document.querySelectorAll('.cfg-vehicle').forEach(v => v.classList.remove('selected'));
  el.classList.add('selected');
  cfgState.vehicle      = name;
  cfgState.vehicleExtra = extra;
  cfgState.vehicleIcon  = icon;
  const n = document.getElementById('cfg-next-1');
  if (n) n.disabled = false;
}

function cfgSelectPkg(el, name, basePrice, time) {
  document.querySelectorAll('.cfg-pkg').forEach(p => p.classList.remove('selected'));
  el.classList.add('selected');
  cfgState.pkg      = name;
  cfgState.pkgPrice = basePrice;
  cfgState.pkgTime  = time;
  const n = document.getElementById('cfg-next-2');
  if (n) n.disabled = false;
}

function cfgToggleExtra(el, name, price) {
  el.classList.toggle('selected');
  const chk = el.querySelector('.cfg-extra-chk');
  if (el.classList.contains('selected')) {
    if (chk) chk.textContent = 'v';
    cfgState.extras.push({ name, price });
  } else {
    if (chk) chk.textContent = '';
    cfgState.extras = cfgState.extras.filter(e => e.name !== name);
  }
}

function cfgGoTo(step) {
  document.querySelectorAll('.cfg-panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById('cfg-panel-' + step);
  if (panel) panel.classList.add('active');
  for (let i = 1; i <= 4; i++) {
    const el = document.getElementById('cfg-step-' + i);
    if (!el) continue;
    el.classList.remove('active', 'done');
    if (i < step)  el.classList.add('done');
    if (i === step) el.classList.add('active');
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (step === 4) cfgBuildResult();
  cfgState.step = step;
}

function cfgBuildResult() {
  const total = cfgState.pkgPrice + cfgState.vehicleExtra
    + cfgState.extras.reduce((s, e) => s + e.price, 0);
  const pm = document.getElementById('cfg-price-main');
  const tv = document.getElementById('cfg-time-val');
  if (pm) pm.textContent = 'EUR ' + total;
  if (tv) tv.textContent = cfgState.pkgTime || '--';
  let rows = '<div class="cfg-result-row"><span>Veicolo</span>'
    + '<span class="rv">' + cfgState.vehicleIcon + ' ' + cfgState.vehicle + '</span></div>';
  rows += '<div class="cfg-result-row"><span>Pacchetto</span>'
    + '<span class="rv">' + cfgState.pkg + ' (' + cfgState.pkgPrice + ')</span></div>';
  if (cfgState.vehicleExtra > 0) {
    rows += '<div class="cfg-result-row"><span>Suppl. ' + cfgState.vehicle + '</span>'
      + '<span class="rv">+' + cfgState.vehicleExtra + '</span></div>';
  }
  cfgState.extras.forEach(e => {
    rows += '<div class="cfg-result-row"><span>' + e.name + '</span>'
      + '<span class="rv">' + (e.price > 0 ? '+' + e.price : 'Su preventivo') + '</span></div>';
  });
  rows += '<div class="cfg-result-row total-row"><span><strong>Totale Stimato</strong></span>'
    + '<span class="rv"><strong>EUR ' + total + '</strong></span></div>';
  const rr = document.getElementById('cfg-result-rows');
  if (rr) rr.innerHTML = rows;
}


/* ============================================================
   SEZIONE 8. BUSINESS
   ============================================================ */
/**
 * business.js — Network canvas animato per business.html
 * Dipende da: nessuna dipendenza esterna
 */
/* jshint esversion: 6 */
'use strict';

(function () {
  var canvas = document.getElementById('bizNetCanvas');
  if (!canvas) return;

  function drawBizNet() {
    var W = canvas.parentElement.offsetWidth;
    var H = 120;
    canvas.width  = W;
    canvas.height = H;
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, W, H);

    var nodes = [
      { x: .5,  y: .5,  label: 'ZENIX',  main: true  },
      { x: .15, y: .2,  label: 'HOTEL'               },
      { x: .85, y: .2,  label: 'DEALER'              },
      { x: .1,  y: .8,  label: 'B&B'                 },
      { x: .9,  y: .8,  label: 'CORP.'               },
      { x: .35, y: .85, label: 'RESORT'              },
      { x: .65, y: .85, label: 'FLEET'               }
    ];

    // Linee connessione
    nodes.slice(1).forEach(function (n) {
      var m    = nodes[0];
      var grad = ctx.createLinearGradient(m.x * W, m.y * H, n.x * W, n.y * H);
      grad.addColorStop(0, 'rgba(0,200,200,0.5)');
      grad.addColorStop(1, 'rgba(0,200,200,0.05)');
      ctx.beginPath();
      ctx.moveTo(m.x * W, m.y * H);
      ctx.lineTo(n.x * W, n.y * H);
      ctx.strokeStyle = grad;
      ctx.lineWidth   = 1;
      ctx.setLineDash([3, 5]);
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // Nodi
    nodes.forEach(function (n) {
      ctx.beginPath();
      ctx.arc(n.x * W, n.y * H, n.main ? 10 : 6, 0, Math.PI * 2);
      ctx.fillStyle = n.main ? 'rgba(0,200,200,0.9)' : 'rgba(0,200,200,0.4)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,200,200,0.8)';
      ctx.lineWidth   = 1;
      ctx.stroke();
      ctx.fillStyle = 'rgba(0,200,200,0.9)';
      ctx.font      = (n.main ? '700 10px' : '600 8px') + ' Orbitron, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(n.label, n.x * W, n.y * H + (n.main ? 20 : 16));
    });
  }

  setTimeout(drawBizNet, 50);
  window.addEventListener('resize', drawBizNet);
})();


/* ============================================================
   SEZIONE 9. COPERTURA
   ============================================================ */
/**
 * coverage.js — Radar canvas animato per coverage.html
 * Dipende da: nessuna dipendenza esterna
 */
/* jshint esversion: 6 */
'use strict';

(function () {
  var CITIES = [
    { name:'SAVONA',    km:0,  arr:'10 min', angle:270, dist:0    },
    { name:'VADO L.',   km:9,  arr:'15 min', angle:220, dist:.42  },
    { name:'SPOTORNO',  km:14, arr:'20 min', angle:195, dist:.58  },
    { name:'ALBISSOLA', km:5,  arr:'12 min', angle:330, dist:.28  },
    { name:'QUILIANO',  km:6,  arr:'12 min', angle:290, dist:.30  },
    { name:'BERGEGGI',  km:18, arr:'25 min', angle:185, dist:.68  },
    { name:'STELLA',    km:11, arr:'18 min', angle:350, dist:.48  },
    { name:'CAIRO M.',  km:28, arr:'32 min', angle:15,  dist:.75  },
    { name:'FINALE L.', km:25, arr:'28 min', angle:170, dist:.78  },
    { name:'ALTARE',    km:22, arr:'25 min', angle:40,  dist:.70  }
  ];

  var canvas = document.getElementById('radarCanvas');
  if (!canvas) return;

  function drawRadar() {
    var size = canvas.parentElement.offsetWidth;
    canvas.width = canvas.height = size;
    var ctx = canvas.getContext('2d');
    var cx  = size / 2, cy = size / 2, r = size / 2 - 4;

    ctx.fillStyle = '#080c0f';
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();

    for (var i = 1; i <= 4; i++) {
      ctx.beginPath(); ctx.arc(cx, cy, r * i / 4, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0,200,200,' + (0.08 + i * .03) + ')';
      ctx.lineWidth = 1; ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(0,200,200,0.12)'; ctx.lineWidth = .8;
    ctx.beginPath(); ctx.moveTo(cx - r, cy); ctx.lineTo(cx + r, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, cy - r); ctx.lineTo(cx, cy + r); ctx.stroke();

    for (var a = 0; a < 360; a += 30) {
      var rad = a * Math.PI / 180;
      ctx.beginPath(); ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(rad) * r, cy + Math.sin(rad) * r);
      ctx.strokeStyle = 'rgba(0,200,200,0.05)'; ctx.lineWidth = .5; ctx.stroke();
    }
    CITIES.filter(function (c) { return c.dist > 0; }).forEach(function (c) {
      var rad2 = (c.angle - 90) * Math.PI / 180;
      var x = cx + Math.cos(rad2) * r * c.dist;
      var y = cy + Math.sin(rad2) * r * c.dist;
      var grad = ctx.createLinearGradient(cx, cy, x, y);
      grad.addColorStop(0, 'rgba(0,200,200,0.4)');
      grad.addColorStop(1, 'rgba(0,200,200,0.05)');
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x, y);
      ctx.strokeStyle = grad; ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]); ctx.stroke(); ctx.setLineDash([]);
    });
  }

  var sweepAngle = 0;
  function drawSweep() {
    var size = canvas.width;
    var ctx  = canvas.getContext('2d');
    var cx   = size / 2, cy = size / 2, r = size / 2 - 4;
    drawRadar();
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate((sweepAngle - 90) * Math.PI / 180);
    var sg = ctx.createLinearGradient(0, 0, r, 0);
    sg.addColorStop(0, 'rgba(0,200,200,0.6)');
    sg.addColorStop(1, 'rgba(0,200,200,0)');
    ctx.beginPath(); ctx.moveTo(0, 0);
    ctx.arc(0, 0, r, -Math.PI * .25, 0);
    ctx.fillStyle = sg; ctx.fill(); ctx.restore();
    sweepAngle = (sweepAngle + 1) % 360;
    requestAnimationFrame(drawSweep);
  }

  function placeNodes() {
    var wrap      = canvas.parentElement;
    var size      = wrap.offsetWidth;
    var cx = size / 2, cy = size / 2, r = size / 2 - 4;
    var container = document.getElementById('radar-nodes');
    if (!container) return;
    container.innerHTML = '';
    CITIES.forEach(function (c) {
      if (c.dist === 0) return;
      var rad = (c.angle - 90) * Math.PI / 180;
      var x   = cx + Math.cos(rad) * r * c.dist;
      var y   = cy + Math.sin(rad) * r * c.dist;
      var node = document.createElement('div');
      node.className    = 'radar-node';
      node.style.left   = x + 'px';
      node.style.top    = y + 'px';
      node.style.position = 'absolute';
      node.innerHTML =
        '<div class="radar-dot"></div>'
        + '<div class="radar-label">' + c.name + '</div>'
        + '<div class="radar-tooltip">'
        + '<div class="radar-tooltip-city">' + c.name + '</div>'
        + '<div class="radar-tooltip-row">' + c.km + ' km da Savona</div>'
        + '<div class="radar-tooltip-row">Arrivo: ' + c.arr + '</div>'
        + '</div>';
      container.appendChild(node);
    });
  }

  function buildPills() {
    var list = document.getElementById('copertura-list');
    if (!list) return;
    list.innerHTML = CITIES.map(function (c) {
      return '<div class="copertura-pill">'
        + '<div class="copertura-pill-dot"></div>'
        + '<div><div class="copertura-pill-name">' + c.name + '</div>'
        + '<div class="copertura-pill-time">Arrivo: ' + c.arr + '</div></div></div>';
    }).join('');
  }

  function initRadar() { drawRadar(); placeNodes(); buildPills(); drawSweep(); }
  setTimeout(initRadar, 100);
  window.addEventListener('resize', function () { drawRadar(); placeNodes(); });
})();

