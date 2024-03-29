/*jshint nonstandard:true */
(function(root){
  var previousSimg = root.Simg;
  var Simg = root.Simg = function(svg){
    this.svg = svg;
  };

  Simg.noConflict = function(){
    root.Simg = previousSimg;
    return this;
  };

  Simg.getBase64Image = function(img) {
    // From: http://stackoverflow.com/questions/934012/get-image-data-in-javascript
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  };

  Simg.prototype = {

      getCSSStyles:  function() {
          var extractedCSSText = "";
          for (var i = 0; i < document.styleSheets.length; i++) {
              var s = document.styleSheets[i];
              try {
                  if (!s.cssRules) continue;
              } catch (e) {
                  if (e.name !== 'SecurityError') throw e; // for Firefox
                  continue;
              }

              if(s.href.toString().includes("chart.css")){
                  var cssRules = s.cssRules;
                  for (var r = 0; r < cssRules.length; r++) {
                      extractedCSSText += cssRules[r].cssText + "\n";
                  }
              }
          }
          return extractedCSSText;
      },

    // Return SVG text.
    toString: function(svg){
      if (!svg){
        throw new Error('.toString: No SVG found.');
      }
        var cssStyleText = this.getCSSStyles();
        if(document.getElementById("yearGraph") != null) {
            cssStyleText += "path { fill: none; stroke-width: 2;}";
            cssStyleText += ".axis path, .axis line {  fill: none; stroke: grey; stroke-width: 1; shape-rendering: crispEdges; }"
            cssStyleText += ".legend { font-size: 16px; font-weight: bold; text-anchor: middle; }";
        }
        var styleElement = document.createElement("style");
        styleElement.setAttribute("type", "text/css");
        styleElement.setAttribute("id", "tmpElement");
        styleElement.innerHTML = cssStyleText;

      [
        ['version', 1.1],
        ['xmlns', "http://www.w3.org/2000/svg"],
      ].forEach(function(item){
        svg.setAttribute(item[0], item[1]);
        var refNode = svg.hasChildNodes() ? svg.children[0] : null;
        svg.insertBefore(styleElement, refNode);
      });

      return svg.outerHTML;
    },

    // Return canvas with this SVG drawn inside.
    toCanvas: function(cb){
      this.toSvgImage(function(img){
        var canvas = document.createElement('canvas');
        var context = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        context.drawImage(img, 0, 0);
        cb(canvas);
      });
    },

    toSvgImage: function(cb){
      var str = this.toString(this.svg);
      var img = document.createElement('img');

      if (cb){
        img.onload = function(){
          cb(img);
        };
      }

      // Make the new img's source an SVG image.
      img.setAttribute('src', 'data:image/svg+xml;base64,'+ btoa(unescape(encodeURIComponent(str))));
    },

    // Returns callback to new img from SVG.
    // Call with no arguments to return svg image element.
    // Call with callback to return png image element.
    toImg: function(cb){
      this.toCanvas(function(canvas){
        var canvasData = canvas.toDataURL("image/png");
        var img = document.createElement('img');

        img.onload = function(){
          cb(img);
        };

        // Make pngImg's source the canvas data.
        img.setAttribute('src', canvasData);
      });
    },

    // Replace SVG with PNG img.
    replace: function(cb){
      var self = this;
      this.toImg(function(img){
        var parentNode = self.svg.parentNode;
        parentNode.replaceChild(img, self.svg);
        if (cb){
          cb();
        }
      });
    },

    // Converts canvas to binary blob.
    toBinaryBlob: function(cb){
      this.toCanvas(function(canvas){
        var dataUrl = canvas.toDataURL().replace(/^data:image\/(png|jpg);base64,/, "");
        var byteString = atob(escape(dataUrl));
        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        var dataView = new DataView(ab);
        var blob = new Blob([dataView], {type: "image/png"});
        cb(blob);
      });
    },

    // Trigger download of image.
    download: function(filename){
      if (!filename){
        filename = 'chart';
      }
      this.toImg(function(img){
        var a = document.createElement("a");
        // Name of the file being downloaded.
        a.download = filename + ".png";
        a.href = img.getAttribute('src');
        // Support for Firefox which requires inserting in dom.
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
    }
  };
})(this);