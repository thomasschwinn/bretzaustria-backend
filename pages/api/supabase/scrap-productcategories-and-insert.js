import { createClient } from "@supabase/supabase-js";
import { reformatAll } from "../../../src/lib/reformatFetchedTextString";
import { scrapData } from "../../../src/lib/scrapData";
import { JSDOM } from "jsdom";
const path = require("path");

export default async function Handler(req, res) {
  const termslug = req.query.termslug;
  //console.log(termslug);
  //const termslugs = await getprodcatslugs(); // [{term_slug: 'ballaoo'}, {term_slug: 'nanami'},....]

  const document_de = await scrapData("de", "prodCat", termslug);
  const document_en = await scrapData("en", "prodCat", termslug);
  const document_fr = await scrapData("fr", "prodCat", termslug);

  const data_de = await scraptheData(document_de, termslug);
  const data_en = await scraptheData(document_en, "noupload");
  const data_fr = await scraptheData(document_fr, "noupload");

  const obj = { de: data_de, en: data_de, fr: data_fr };

  //console.log(obj);

  // fetch data from bretz.de

  //const obj = { de: infotext_de, en: infotext_en, fr: infotext_fr };
  //console.log(obj);

  //console.log(infotext);

  // redúce the array to a number configured in environment variables

  // end

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  // const { data, error } = await supabase
  // 	.from("produktkategorien")
  // 	.update({
  // 		other_data_all: obj,
  // 		other_data_de: data_de,
  // 		other_data_en: data_en,
  // 		other_data_fr: data_fr,
  // 		headlinetitle_de: data_de.headlinetitle,
  // 		headlinetitle_en: data_en.headlinetitle,
  // 		headlinetitle_fr: data_fr.headlinetitle,
  // 		text1title_de: data_de.text1title,
  // 		text1title_en: data_en.text1title,
  // 		text1title_fr: data_fr.text1title,
  // 		text1_de: data_de.text1,
  // 		text1_en: data_en.text1,
  // 		text1_fr: data_fr.text1,
  // 		textslogan_de: data_de.textslogan,
  // 		textslogan_en: data_en.textslogan,
  // 		textslogan_fr: data_fr.textslogan,
  // 		text2_de: data_de.text2,
  // 		text2_en: data_en.text2,
  // 		text2_fr: data_fr.text2,
  // 		imgfirstrow: data_de.imgfirstrow,
  // 		thirdimage: data_de.thirdimage,
  // 		fourthimage: data_de.fourthimage,
  // 		fifthimage: data_de.fifthimage,
  // 		youtubeid: data_de.youtubeid,
  // 		secondimage: data_de.secondimage,
  // 		sixthimage: data_de.sixthimage,
  // 		blobbgimage: data_de.blobbgimage,
  // 	})
  // 	.eq("term_slug", termslug);

  //console.log(error);
  //console.log(data);

  res
    .status(200)
    //.json({ result: { termslug: termslug, error: error, data: data } });
    .json({ result: { termslug: termslug } });
}

async function scraptheData(document, termslug) {
  const headlinetitle = document.querySelector(
    "#full_slider_1 .avia-caption-title "
  ).outerHTML;
  const text1title = document.querySelector(
    "#av-layout-grid-1 .avia_textblock.bre-grp-title >h1"
  ).innerHTML;
  const imgfirstrow = document.querySelector(
    "#full_slider_1 > div > ul > li > div > img"
  ).src;
  let text1 = document.querySelectorAll(
    "section.av_textblock_section > div.avia_textblock"
  )[1].outerHTML;
  text1 = text1.replace(` class="avia_textblock" itemprop="text"`, "");
  let textslogan = document.querySelector(
    "#av-layout-grid-2 .av-special-heading-tag"
  ).outerHTML;
  textslogan = textslogan.replace(` itemprop="headline"`, "");

  let text2 = document.querySelectorAll("#av-layout-grid-4 .avia_textblock")[1]
    .outerHTML;

  text2 = text2.replace(` class="avia_textblock" itemprop="text"`, "");

  let thirdimage;
  if (document.querySelector("#av-layout-grid-2 img")) {
    thirdimage = document.querySelector("#av-layout-grid-2 img").src;
  } else {
    thirdimage = undefined;
  }
  const fourthimage = document.querySelectorAll("#av-layout-grid-2 img")[1].src;
  let fifthimage;
  if (document.querySelectorAll("#av-layout-grid-2 img")[2]) {
    fifthimage = document.querySelectorAll("#av-layout-grid-2 img")[2].src;
  } else {
    fifthimage = undefined;
  }
  const sixthimage = document.querySelector("#av-layout-grid-3 img").src;
  let youtubeid;
  if (!document.querySelector(".avia-video.avia-video-16-9")) {
    youtubeid = undefined;
  } else {
    youtubeid = document.querySelector(".avia-video.avia-video-16-9").dataset
      .original_url;
    youtubeid = youtubeid.replace(
      "https://youtu.be",
      "https://www.youtube.com/embed"
    );
  }

  if (document.querySelectorAll("#av-layout-grid-1 .avia-slideshow img")) {
  }

  const secondimageNodelist = document.querySelectorAll(
    "#av-layout-grid-1 .avia-slideshow img"
  );
  var secondimageNodelistArr = Array.from(secondimageNodelist);
  const secondimage = [];
  secondimageNodelistArr.map((row, i) => {
    secondimage.push(row.src);
  });

  // get the backgroundimage that looks like a blob
  const thebodytext = document.querySelector("body").innerHTML;
  const splitthebodytext = thebodytext.split("background:url(");
  const secondofsplit = splitthebodytext[1];
  const splitsecondofsplit = secondofsplit.split(")");
  const blobbgimage = splitsecondofsplit[0];
  //console.log(blobbgimage);
  //const sixthimage = document.querySelectorAll("#av-layout-grid-3 .avia-image-overlay-wrap img").src
  //console.log(secondimage);
  const obj = {
    headlinetitle: headlinetitle,
    text1title: text1title,
    imgfirstrow: imgfirstrow,
    text1: text1,
    textslogan: textslogan,
    text2: text2,
    thirdimage: thirdimage,
    fourthimage: fourthimage,
    fifthimage: fifthimage,
    youtubeid: youtubeid,
    secondimage: secondimage,
    sixthimage: sixthimage,
    blobbgimage: blobbgimage,
  };

  if (termslug != "noupload") {
    const img1 = await movetobunny(imgfirstrow, termslug);
    const img2 = await movetobunny(thirdimage, termslug);
    const img3 = await movetobunny(fourthimage, termslug);
    const img4 = await movetobunny(fifthimage, termslug);
    const img5 = await movetobunny(sixthimage, termslug);
    const img6 = await movetobunny(blobbgimage, termslug);

    // loop through the array of secondimage
    for (let index = 0; index < secondimage.length; index++) {
      // Get num of each fruit
      //console.log(secondimage[index]);
      const img7 = await movetobunny(secondimage[index], termslug);
    }

    return obj;
  } else {
    return obj;
  }
  //const img1 = await movetobunny(imgfirstrow, )
}

async function movetobunny(urldownload, termslug) {
  const newfilename = path.basename(urldownload);
  // download file and buffer it
  const response = await fetch(urldownload);
  const blob = await response.blob();
  const arraybuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arraybuffer);

  // upload file to bunny
  const url =
    "https://storage.bunnycdn.com/bretz-austria-ab-11-2022/produktkategorien/" +
    termslug +
    "/" +
    newfilename;
  const options = {
    method: "PUT",
    headers: {
      AccessKey: "f1e7a6de-bd76-4ea2-a59687c9a7bc-91c4-48cd",
      "content-type": "application/octet-stream",
    },
    body: buffer,
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((err) => console.error("error:" + err));
}
