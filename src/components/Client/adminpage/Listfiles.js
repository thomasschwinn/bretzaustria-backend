"use client";
import { useState, useEffect } from "react";
//import { updatefile } from "../../../lib/supabase_upload_file.mjs";

export default function Listfiles() {
  const [loading, setLoading] = useState();
  const [filelist, setFilelist] = useState(false);
  const [thefile, setThefile] = useState(false);
  const [thisfile, setThisfile] = useState(false);
  const [thisfilevalue, setThisfilevalue] = useState(false);
  let files = [];
  async function clickhandler() {
    setLoading("loading");
    const rawlist = await fetch("/api/supabase/get-bucket", {
      cache: "no-store",
    });
    files = await rawlist.json();
    //console.log(files);
    setFilelist(files);

    setLoading("result");
    //console.log(result);
  }

  async function loadfilehandler(file) {
    const bucket = "htmlfiles";
    const rawdata = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${file}`,
      {
        cache: "no-store",
      }
    );
    const data = await rawdata.text();
    setThefile(data);
    setFilelist([]);
    setThisfile(file);
  }
  async function updatefilehandler(thisfilevalue, thisfile) {
    const data = await fetch(
      "/api/supabase/upload-file?input=" +
        thisfilevalue +
        "&pathtostore=" +
        thisfile
    );
  }
  //console.log(files);
  useEffect(() => {
    //console.log(filelist);
  }, [filelist, thefile]);
  return (
    <div>
      <button
        onClick={() => {
          clickhandler();
        }}
        className="btn btn-warning mx-4"
      >
        list files
      </button>
      {loading == "loading" ? (
        <>
          ... loading ...{" "}
          <span className="loading loading-spinner loading-sm"></span>
        </>
      ) : loading == "result" ? (
        "Done"
      ) : (
        ""
      )}
      {filelist && (
        <>
          {filelist.map((row, i) => {
            //console.log(row);
            return (
              <div key={i} onClick={() => loadfilehandler(row.name)}>
                {row.name}
              </div>
            );
          })}
          {thefile && (
            <>
              <button
                className="btn btn-success  "
                onClick={() => updatefilehandler(thisfilevalue, thisfile)}
              >
                save file
              </button>
              <textarea
                className="w-full"
                onChange={(e) => setThisfilevalue(e.target.value)}
                rows={50}
              >
                {thefile}
              </textarea>
            </>
          )}
        </>
      )}
    </div>
  );
}
