import { createClient } from "@supabase/supabase-js";
import { reformatAll } from "../../../src/lib/reformatFetchedTextString";
export const revalidate = 5;
export default async function Handler(req, res) {
  // get all products from google
  const fetchUrl =
    "https://docs.google.com/spreadsheets/d/1dcNcCF9Kw12ai5zAz2eURYoQrOT6UTpOCo7_6BY8j0k";
  //nothing
  const conStr = "/gviz/tq?tq=";

  const sheetselectorStr = "&gid=752983156"; // table: Produkte
  const selectStr = `select *`;

  const res_ = await fetch(
    `${fetchUrl}${conStr}${selectStr}${sheetselectorStr}`
  ).then((x) => x.text());

  // remove unusable parts from the fetched text string
  let result = reformatAll(res_);
  //console.log(result);

  // format the array

  const insertArr = [];

  const upsertid = Math.random();
  result.map((row, i) => {
    const obj = {};
    //obj["data"] = row;
    obj["title"] = row.title;
    obj["slug"] = row.slug;
    obj["stock_status"] = row.stock_status;
    obj["produkt_kategorie"] = row.produkt_kategorie;
    obj["price"] = row.price;
    obj["sale_price"] = row.sale_price;
    obj["termslug"] = row.term_slug;
    obj["term_slug"] = row.term_slug;
    obj["preisanhang"] = row.preisanhang;

    obj["sale_verfuegbarkeit"] = row.sale_verfuegbarkeit;
    obj["ausstellungsstueck"] = row.ausstellungsstueck;
    obj["show_in_loop"] = row.show_in_loop;
    obj["order_in_product_category_loop"] = row.order_in_product_category_loop;
    obj["order_sale_loop"] = row.order_sale_loop;
    obj["order_shop"] = row.order_shop;
    obj["online_bestellbar"] = row.online_bestellbar;
    obj["productimage"] = row.productimage;
    obj["slider2___"] = row.slider2___;
    obj["slider3___"] = row.slider3___;
    obj["slider4___"] = row.slider4___;
    obj["slider5___"] = row.slider5___;
    obj["slider6___"] = row.slider6___;
    obj["slider7___"] = row.slider7___;
    obj["slider8___"] = row.slider8___;
    obj["zeichnung_1___"] = row.zeichnung_1___;
    obj["zeichnung_2___"] = row.zeichnung_2___;
    obj["bezugsstoff1___"] = row.bezugsstoff1___;
    obj["bezugsstoff2___"] = row.bezugsstoff2___;
    obj["bezugsstoff3___"] = row.bezugsstoff3___;
    obj["bezugsstoff4___"] = row.bezugsstoff4___;
    obj["bezugsstoff5___"] = row.bezugsstoff5___;
    obj["bezugsstoff1_slug___"] = row.bezugsstoff1_slug___;
    obj["bezugsstoff2_slug___"] = row.bezugsstoff2_slug___;
    obj["bezugsstoff3_slug___"] = row.bezugsstoff3_slug___;
    obj["bezugsstoff4_slug___"] = row.bezugsstoff4_slug___;
    obj["bezugsstoff5_slug___"] = row.bezugsstoff5_slug___;
    obj["bezugsstoff1_img___"] = row.bezugsstoff1_img___;
    obj["bezugsstoff2_img___"] = row.bezugsstoff2_img___;
    obj["bezugsstoff3_img___"] = row.bezugsstoff3_img___;
    obj["bezugsstoff4_img___"] = row.bezugsstoff4_img___;
    obj["bezugsstoff5_img___"] = row.bezugsstoff5_img___;

    obj["farbe1___"] = row.farbe1___;
    obj["farbe2___"] = row.farbe2___;
    obj["farbe3___"] = row.farbe3___;
    obj["farbe4___"] = row.farbe4___;
    obj["farbe5___"] = row.farbe5___;
    obj["farbe6___"] = row.farbe6___;
    obj["farbe7___"] = row.farbe7___;
    obj["farbe8___"] = row.farbe8___;

    obj["tab_info_ausblenden"] = row.tab_info_ausblenden;
    obj["tab_bezugsstoffe_ausblenden"] = row.tab_bezugsstoffe_ausblenden;
    obj["size_breite_cm"] = row.size_breite_cm;
    obj["size_tiefe_cm"] = row.size_tiefe_cm;
    obj["size_hoehe_cm"] = row.size_hoehe_cm;
    obj["size_sitzhoehe_cm"] = row.size_sitzhoehe_cm;
    obj["size_sitztiefe_cm"] = row.size_sitztiefe_cm;
    obj["size_laenge_cm"] = row.size_laenge_cm;
    obj["size_durchmesser_cm"] = row.size_durchmesser_cm;
    obj["size_sitzflaeche-breite_cm"] = row["size_sitzflaeche-breite_cm"];
    obj["size_fus_cm"] = row.size_fus_cm;
    obj["size_liegeflaeche_qm"] = row.size_sitzflaeche_qm;
    obj["size_sitzflaeche_qm"] = row.size_liegeflaeche_qm;
    obj["size_teppich_faktor"] = row.size_teppich_faktor;
    obj["size_min_groesse_cm"] = row.size_min_groesse_cm;
    obj["size_max_groesse_cm"] = row.size_max_groesse_cm;
    obj["size_stoff_breite_cm"] = row.size_stoff_breite_cm;
    obj["size_stoff_verarbeitungsbreite_cm"] =
      row.size_stoff_verarbeitungsbreite_cm;
    obj["size_stoff_details_gesamtzusammensetzung"] =
      row.size_stoff_details_gesamtzusammensetzung;
    obj["size_stoff_details_grund"] = row.size_stoff_details_grund;
    obj["size_stoff_details_flor"] = row.size_stoff_details_flor;
    obj["size_stoff_details_zusatztext"] = row.size_stoff_details_zusatztext;
    obj["size_stoff_details_gewicht_pro_qm_gramm"] =
      row.size_stoff_details_gewicht_pro_qm_gramm;
    obj["size_stoff_details_scheuertouren"] =
      row.size_stoff_details_scheuertouren;
    obj["size_stoff_details_pillingbildung"] =
      row.size_stoff_details_pillingbildung;
    obj["size_stoff_details_lichtechtheit"] =
      row.size_stoff_details_lichtechtheit;
    obj["size_stoff_details_pflegeleichtigkeit"] =
      row.size_stoff_details_pflegeleichtigkeit;
    obj["kissenform"] = row.kissenform;
    obj["machart"] = row.machart;
    obj["reissverschluss"] = row.reissverschluss;
    obj["stoffdetails"] = row.stoffdetails;
    obj["infotab_vortext"] = row.infotab_vortext;
    obj["infotab_vortext_fr"] = row.infotab_vortext_fr;
    obj["infotab_vortext_en"] = row.infotab_vortext_en;
    obj["infotab_Nachtext"] = row.infotab_Nachtext;
    obj["infotab_Nachtext_en"] = row.infotab_Nachtext_en;
    obj["infotab_Nachtext_fr"] = row.infotab_Nachtext_fr;
    obj["sizeVortext"] = row.sizeVortext;
    obj["sizeVortext_en"] = row.sizeVortext_en;
    obj["sizeVortext_fr"] = row.sizeVortext_fr;
    obj["sizeNachtext"] = row.sizeNachtext;
    obj["sizeNachtext_en"] = row.sizeNachtext_en;
    obj["sizeNachtext_fr"] = row.sizeNachtext_fr;

    obj["lieferzeit"] = row.lieferzeit;
    //obj["farben"] = row.farben;
    //obj["bezugsstoff_slug_all"] = row.bezugsstoff_slug_all;
    //obj["bezugsstoff_img_all"] = row.bezugsstoff_img_all;
    obj["anzahl_der_farben"] = row.anzahl_der_farben;
    obj["size_matratzenlaenge_cm"] = row.size_matratzenlaenge_cm;
    obj["size_matratzenbreite_cm"] = row.size_matratzenbreite_cm;
    obj["size_paneelenbreite_cm"] = row.size_paneelenbreite_cm;
    obj["size_paneelenhoehe_cm"] = row.size_paneelenhoehe_cm;
    obj["size_rahmenbreite_cm"] = row.size_rahmenbreite_cm;
    obj["size_rahmentiefe_cm"] = row.size_rahmentiefe_cm;
    obj["size_gesamttiefeinklpaneele_cm"] = row.size_gesamttiefeinklpaneele_cm;
    obj["size_liegehoehe_standard_cm"] = row.size_liegehoehe_standard_cm;
    obj["size_liegehoehe_boxspring_cm"] = row.size_liegehoehe_boxspring_cm;

    obj["upsertid"] = upsertid;

    insertArr.push(obj);
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  const { data, error } = await supabase
    .from("produkte")
    .upsert(insertArr)
    .select();

  res.status(200).json({
    upsertid: upsertid,
    data: data,
    error: error,
    insertArr: insertArr,
  });
}
