function DownloadJSON(json_obj, resource, file_extension) {
    // deep copy JSON object
    var json_obj_copy = JSON.parse(JSON.stringify(json_obj));

    // delete rdfXML key from json
    delete json_obj_copy["rdfXML"];

    //Convert JSON Array to string.
    var json_string = JSON.stringify(json_obj_copy);

    // download file
    DownloadFile(json_string, resource, file_extension);
}

function DownloadRDFXML(json_obj, resource, file_extension) {
    // get rdfXML key value
    var rdf_xml_content = json_obj["rdfXML"];

    // download file
    DownloadFile(rdf_xml_content, resource, file_extension);
}

function DownloadFile(string_obj, resource, file_extension) {
    //Convert JSON string to BLOB.
    string_obj = [string_obj];
    var blob1 = new Blob(string_obj, { type: "text/plain;charset=utf-8" });

    // create download filename
    var filename = resource + "." + file_extension;

    //Check the Browser.
    var isIE = false || !!document.documentMode;
    if (isIE) {
        window.navigator.msSaveBlob(blob1, filename);
    } else {
        var url = window.URL || window.webkitURL;
        link = url.createObjectURL(blob1);
        var a = document.createElement("a");
        a.download = filename;
        a.href = link;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}