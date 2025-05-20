import { createClient } from "@supabase/supabase-js";
export const revalidate = 5;
export default async function Handler(req, res) {
  let filternot = "(irgendetwas)";

  if (req.query.filternot) {
    filternot = "(" + req.query.filternot + ")";
  }
  //console.log(notequalarray);
  //console.log(termslug);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  let { data: shopproducts, error } = await supabase
    .from("produkte")
    // .select(
    // 	`
    //         title,
    // 	slug,
    // 	produkt_kategorie:data->produkt_kategorie,
    //         price,
    // 	preisanhang,
    // 	sale_verfuegbarkeit,
    // 	term_slug:termslug,
    // 	lieferzeit,
    // 	farben:data->farben,
    // 	productimage,
    //         sale_price,
    // 	kissenform:data->kissenform,
    //         machart:data->machart,
    //         reissverschluss:data->reissverschluss,
    // 	bezugsstoff_slug_all:data->bezugsstoff_slug_all,
    // 	anzahl_der_farben:data->anzahl_der_farben`
    // )
    .select(
      `
                        title, 
			slug,
			produkt_kategorie,
                        price,
			preisanhang,
			sale_verfuegbarkeit,
			term_slug:termslug,
			lieferzeit,
			farben,
			farbe1___,
			farbe2___,
			farbe3___,
			farbe4___, 
			farbe5___,
			farbe6___,
			farbe7___, 
			farbe8___,
			bezugsstoff_1(farbe1___,farbe2___,farbe3___,farbe4___, farbe5___,farbe6___,farbe7___, farbe8___,anzahl_der_farben),
			bezugsstoff_2(farbe1___,farbe2___,farbe3___,farbe4___, farbe5___,farbe6___,farbe7___, farbe8___,anzahl_der_farben),
			bezugsstoff_3(farbe1___,farbe2___,farbe3___,farbe4___, farbe5___,farbe6___,farbe7___, farbe8___,anzahl_der_farben),
			bezugsstoff_4(farbe1___,farbe2___,farbe3___,farbe4___, farbe5___,farbe6___,farbe7___, farbe8___,anzahl_der_farben),
			bezugsstoff_5(farbe1___,farbe2___,farbe3___,farbe4___, farbe5___,farbe6___,farbe7___, farbe8___,anzahl_der_farben),
			productimage,
                        sale_price,
			kissenform,
                        machart,
                        reissverschluss,
			bezugsstoff_slug_all,
			anzahl_der_farben`
    )
    .neq("online_bestellbar", null)
    .eq("stock_status", "instock")
    .not("termslug", "in", filternot)
    .order("order_shop");

  const highlowprice = createhighestandlowestprice(shopproducts);

  const productnames = createlistofproductnames(shopproducts);
  const shopProductsWithFarben = createShopProductsWithFarben(shopproducts);
  //console.log(shopProductsWithFarben);

  try {
    res.status(200).json({
      produkte: shopProductsWithFarben,
      highlowprice: highlowprice,
      productnames: productnames,
    });
  } catch (err) {
    res.status(500).json(error);
  }
}

// check one
function createhighestandlowestprice(rows) {
  // create an array of all prices
  let prices = [];
  rows.map((row, i) => {
    if (!row.sale_price) {
      row.sale_price = "";
    }
    if (!row.preisanhang) {
      row.preisanhang = "";
    }
    if (!row.kissenform) {
      row.kissenform = "";
    }
    if (!row.machart) {
      row.machart = "";
    }
    if (!row.reissverschluss) {
      row.reissverschluss = "";
    }
    if (row.sale_price != "") {
      prices.push(row.sale_price * 1);
    } else {
      prices.push(row.price * 1);
    }
  });
  prices.sort(function (a, b) {
    return a - b;
  });
  prices = [...new Set(prices)];

  const priceHigh = Math.round(prices[prices.length - 1] / 10) * 10;
  const priceLow = Math.round(prices[0] / 10) * 10;
  const priceHiLow = [priceLow, priceHigh];
  return priceHiLow;
}

function createlistofproductnames(rows) {
  let productnames = [];
  rows.map((row, i) => {
    productnames.push(row.title);
  });
  productnames.sort();
  productnames = [...new Set(productnames)];
  return productnames;
}

function createShopProductsWithFarben(shopproducts) {
  const arr = [];
  shopproducts.map((row, i) => {
    // ist das Produkt kein Stoff, werden die Farben vom Bezugsstoff übernommen
    const farben1 = row.bezugsstoff_1 ? Object.values(row.bezugsstoff_1) : [];
    const farben2 = row.bezugsstoff_2 ? Object.values(row.bezugsstoff_2) : [];
    const farben3 = row.bezugsstoff_3 ? Object.values(row.bezugsstoff_3) : [];
    const farben4 = row.bezugsstoff_4 ? Object.values(row.bezugsstoff_4) : [];
    const farben5 = row.bezugsstoff_5 ? Object.values(row.bezugsstoff_5) : [];

    // wenn das Produkt ein Stoff ist ist, sind die Farben direkt im Produkt in 8 Feldern festgelegt
    // diese Felder schreiben wir hier in ein Array
    //console.log(shopproducts)
    const farben6 = [];
    if (row.term_slug == "stoffe") {
      if (row.farbe1___) {
        farben6.push(row.farbe1___);
      }
      if (row.farbe2___) {
        farben6.push(row.farbe2___);
      }
      if (row.farbe3___) {
        farben6.push(row.farbe3___);
      }
      if (row.farbe4___) {
        farben6.push(row.farbe4___);
      }
      if (row.farbe5___) {
        farben6.push(row.farbe5___);
      }
      if (row.farbe6___) {
        farben6.push(row.farbe6___);
      }
      if (row.farbe7___) {
        farben6.push(row.farbe7___);
      }
      if (row.farbe8___) {
        farben6.push(row.farbe8___);
      }
    }

    const farbenArr = getFarben(
      farben1,
      farben2,
      farben3,
      farben4,
      farben5,
      farben6
    );
    //console.log(farbenArr.length);
    const anzahl_der_farben_helper =
      row.bezugsstoff_1?.anzahl_der_farben +
      " " +
      row.bezugsstoff_2?.anzahl_der_farben +
      " " +
      row.bezugsstoff_3?.anzahl_der_farben +
      " " +
      row.bezugsstoff_4?.anzahl_der_farben +
      " " +
      row.bezugsstoff_5?.anzahl_der_farben +
      " " +
      row.anzahl_der_farben;
    //console.log(anzahl_der_farben_helper);

    // make a new instance of the object
    const newRow = { ...row };

    // delete all fields we don't need in the frontend
    delete newRow.bezugsstoff_1;
    delete newRow.bezugsstoff_2;
    delete newRow.bezugsstoff_3;
    delete newRow.bezugsstoff_4;
    delete newRow.bezugsstoff_5;
    delete newRow.farbe1___;
    delete newRow.farbe2___;
    delete newRow.farbe3___;
    delete newRow.farbe4___;
    delete newRow.farbe5___;
    delete newRow.farbe6___;
    delete newRow.farbe7___;
    delete newRow.farbe8___;
    newRow.anzahl_der_farben = anzahl_der_farben_helper.includes("mehrfarbig")
      ? "mehrfarbig"
      : "einfarbig";

    newRow.farben = farbenArr;
    arr.push(newRow);

    //console.log(farbenArr);
  });
  //console.log(arr);
  return arr;
}

function getFarben(farben1, farben2, farben3, farben4, farben5, farben6) {
  //console.log(farben1);
  const farbenAllArr = [];
  farben1.map((row, i) => {
    farbenAllArr.push(row);
  });
  farben2.map((row, i) => {
    farbenAllArr.push(row);
  });
  farben3.map((row, i) => {
    farbenAllArr.push(row);
  });
  farben4.map((row, i) => {
    farbenAllArr.push(row);
  });
  farben5.map((row, i) => {
    farbenAllArr.push(row);
  });
  farben6.map((row, i) => {
    farbenAllArr.push(row);
  });
  const withoutNullArr = farbenAllArr.filter((elements) => {
    return elements !== null;
  });
  const withoutmehrfarbigArr = withoutNullArr.filter((elements) => {
    return elements !== "mehrfarbig";
  });
  const withouteinfarbigArr = withoutmehrfarbigArr.filter((elements) => {
    return elements !== "einfarbig";
  });

  const withoutDuplicatesArr = withouteinfarbigArr.filter(
    (item, index) => withouteinfarbigArr.indexOf(item) === index
  );

  //console.log(withoutDuplicatesArr);
  return withoutDuplicatesArr;
}
