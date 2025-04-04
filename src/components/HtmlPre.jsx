import React from "react";
import "./htmlpre.css";


export const HtmlPre = ({ elements }) => {
   
  const [filename, setFilename] = React.useState("");

  const htmlTemplate = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.5, user-scalable=0">
      
      <title>Algorithm</title>
  
      <!-- jQuery -->
      <script src="/jquery-3.1.0.min.js"></script>
  
      <!-- Font Awesome -->
      <link rel="stylesheet" href="/font-awesome.min.css">
  
      <!-- Bootstrap -->
      <link rel="stylesheet" type="text/css" href="/bootstrap.min.css">
      <script src="/bootstrap.min.js"></script>
  
      <!-- Custom Stylesheet -->
      <link rel="stylesheet" type="text/css" href="/treeflex_testing.css">
      <link rel="stylesheet" type="text/css" href="/ESPEN_Tool.css">
  </head>
  
  <body>
      <div class="container">
          <div class="row">
              <a href="overview.html">
                  <img class="pull-right" src="/tree.png" height="40rem" style="margin-right: 2%;">
              </a>
          </div>
          <br>
          ${elements.join("\n")}
      </div>
  </body>
  </html>
  `;
  
  const handleSetFileName = (e) => {
    setFilename(e.target.value);
  }

  const downloadHtmlFile = () => {
    const blob = new Blob([htmlTemplate], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setFilename("");
  };


  return (
    <div className="htmlpre">

      <p>
        <h3>HTML Preview</h3>
        <form className="filename-form" onSubmit={(e) => e.preventDefault()}>
        <input type="text" name="filename" value={filename} onChange={handleSetFileName} placeholder="Enter Filename" />
        <button onClick={downloadHtmlFile} class="btn btn-primary">
          <i class="bi bi-download"></i> Download HTML
        </button>
        </form>
      </p>
      <iframe
        title="HTML Preview"
        style={{
          width: "100%",
          height: "auto",
          padding: "2px",
          border: "1px solid #ccc",
        }}
        srcDoc={htmlTemplate}
      />
    </div>
  );
};
