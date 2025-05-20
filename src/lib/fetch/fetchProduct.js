export async function fetchProduct(slug, locale, area) {
  // fetch directly from supabase
  const apiRoute = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/produkte?slug=eq.${slug}&select=*,termslug(term_slug,Produktdatenblatt,autocad_Daten,Montageanleitung,term_name,textslogan_${locale},imgfirstrow)`;

  let header = {};

  // header for supabse api
  if (process.env.Environment && process.env.Environment == "localhost") {
    header = {
      next: { revalidate: 0 },
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      },
    };
  } else {
    header = {
      next: { tags: [slug] },
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      },
    };
  }

  const res = await fetch(apiRoute, header);

  const dataArr = await res.json();
  const data = dataArr[0];

  //fetch directly from supabase
  const supabaseraw = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/produkte?slug=eq.${slug}&select=*`,
    {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        next: { tags: [slug] },
      },
    }
  );

  //console.log(supabaseres);

  // get all fields where name includes "size"
  const sizes = createDataForTable(data);

  // send 10 fields to a function to check if the fields have values and put them inside a string
  const imgArr = [
    data.productimage,
    data.slider2___,
    data.slider3___,
    data.slider4___,
    data.slider5___,
    data.slider6___,
    data.slider7___,
    data.slider8___,
    data.zeichnung_1___,
    data.zeichnung_2___,
  ];
  const sliderArr = createSliderField(imgArr);
  //console.log(data.productimage);

  //console.log(data.sizeVortext);

  const returnObj = {};
  if (area == "productpage") {
    returnObj["title"] = data.title;
    returnObj["slug"] = data.slug;
    returnObj["produkt_kategorie"] = data.termslug.term_name;
    returnObj["term_slug"] = data.termslug.term_slug;
    //returnObj["term_pic"] = data.term_pic;
    returnObj["slogan"] = data[`slogan_${locale}`];

    returnObj["infotext"] = data[`infotext_${locale}`];

    returnObj["bgimage"] = data.termslug.imgfirstrow;
    returnObj["productimage"] = data.productimage;
    //returnObj["slider"] = data.data.slider;
    returnObj["slider"] = sliderArr;
    returnObj["price"] = data.price;
    returnObj["stock_status"] = data.stock_status;
    if (data.data.download_produktdatenlbatt) {
      returnObj["Produktdatenblatt"] = data.termslug.Produktdatenblatt;
    }
    if (data.online_bestellbar) {
      returnObj["online_bestellbar"] = data.online_bestellbar;
    }

    if (data.lieferzeit) {
      returnObj["lieferzeit"] = data.lieferzeit;
    }
    if (data.online_bestellbar) {
      returnObj["online_bestellbar"] = data.online_bestellbar;
    }
    if (data.ausstellungsstueck && data.ausstellungsstueck != "") {
      returnObj["ausstellungsstueck"] = data.ausstellungsstueck;
    }
    if (
      data.sale_verfuegbarkeit &&
      data.sale_verfuegbarkeit != "nicht im Sale"
    ) {
      returnObj["sale_verfuegbarkeit"] = data.sale_verfuegbarkeit;
    }
    if (data.preisanhang != "kein Preisanhang" && data.preisanhang) {
      returnObj["preisanhang"] = data.preisanhang;
    }
    if (data.sale_price) {
      returnObj["sale_price"] = data.sale_price;
    }
    if (data.infotab_vortext) {
      //console.log()
      returnObj["infotab_vortext"] =
        locale == "de"
          ? data.infotab_vortext
          : data[`infotab_vortext_${locale}`];
    }

    if (data.infotab_Nachtext) {
      //console.log(data.data.infotab_Nachtext);
      returnObj["infotab_nachtext"] =
        locale == "de"
          ? data.infotab_Nachtext
          : data[`infotab_Nachtext_${locale}`];
    }

    if (data.sizeVortext) {
      returnObj["size_vortext"] =
        locale == "de" ? data.sizeVortext : data[`sizeVortext_${locale}`];
    }

    if (data.sizeNachtext) {
      returnObj["size_nachtext"] =
        locale == "de" ? data.sizeNachtext : data[`sizeNachtext_${locale}`];
    }

    returnObj["sizes"] = sizes;
    //console.log(data.tab_bezugsstoffe_ausblenden);
    if (data.tab_bezugsstoffe_ausblenden) {
      returnObj["tab_bezugsstoffe_ausblenden"] =
        data.tab_bezugsstoffe_ausblenden;
    } else {
      let bezugstoffArr = [
        {
          title: data.bezugsstoff1___,
          slug: data.bezugsstoff1_slug___,
          img: data.bezugsstoff1_img___,
        },
        {
          title: data.bezugsstoff2___,
          slug: data.bezugsstoff2_slug___,
          img: data.bezugsstoff2_img___,
        },
        {
          title: data.bezugsstoff3___,
          slug: data.bezugsstoff3_slug___,
          img: data.bezugsstoff3_img___,
        },
        {
          title: data.bezugsstoff4___,
          slug: data.bezugsstoff4_slug___,
          img: data.bezugsstoff4_img___,
        },
        {
          title: data.bezugsstoff5___,
          slug: data.bezugsstoff5_slug___,
          img: data.bezugsstoff5_img___,
        },
      ];

      //console.log(bezugstoffArr);
      bezugstoffArr = removeNullFromArray(bezugstoffArr);
      //console.log(bezugstoffArr);
      //console.log(data.data.bezugsstoffe);
      //console.log(data.data.bezugsstoff_slug_all);
      //console.log(data.data.bezugsstoff_img_all);
      //returnObj["bezugsstoffe"] = data.data.bezugsstoffe;
      returnObj["bezugsstoffe"] = bezugstoffArr;
      //returnObj["bezugsstoff_slug_all"] = data.data.bezugsstoff_slug_all;
      //returnObj["bezugsstoff_img_all"] = data.data.bezugsstoff_img_all;
    }
    //console.log(data.data.tab_info_ausblenden);
    //console.log(data.tab_info_ausblenden);
    if (data.tab_info_ausblenden) {
      returnObj["tab_info_ausblenden"] = data.tab_info_ausblenden;
    }
    //console.log(data.data.tab_kontak_headline);
    //console.log(data.tab_kontak_headline);

    if (data.tab_kontak_headline) {
      returnObj["tab_kontak_headline"] = data.tab_kontak_headline;
    }
  }
  //console.log(locale);

  //
  //console.log(returnObj);
  return returnObj;
}

function createDataForTable(datainput) {
  //console.log(datainput);
  const obj = datainput;
  const data = [];
  Object.keys(obj)
    .filter((key) => key.includes("size_"))
    .reduce((cur, key) => {
      let toAdd = "";

      // add "cm" to value if the key includes "_cm"
      if (key.includes("_cm")) {
        toAdd = "cm";
      }
      // add "g" to value if the key  includes "_gramm"
      if (key.includes("_gramm")) {
        toAdd = "g";
      }

      if (obj[key]) {
        data.push({ [key]: obj[key] + toAdd });
      }
    }, {});
  return data;
}

function createSliderField(imgArr) {
  //console.log(imgArr);
  let slider = [];
  imgArr.map((src) => {
    if (src) {
      slider.push(src);
    }
  });
  //console.log(slider);

  return slider;
}

function createBezugsstoffeArr() {
  let bezArr;
  return bezArr;
}

function removeNullFromArray(theArr) {
  let newArr = [];
  theArr.map((el) => {
    if (el.title) {
      newArr.push(el);
    }
  });
  return newArr;
}
