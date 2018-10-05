document.getElementById("saveImgButton1").addEventListener("click", function(d){
    var svg = document.getElementById("treelikeGraph").firstElementChild;
    svg.setAttribute("style", "background: white");
    var simg = new Simg(svg);
    simg.download("exported-chart");
    document.getElementById("tmpElement").remove();
});

document.getElementById("saveImgButton2").addEventListener("click", function(d){
    var svg = document.getElementById("coloredGraph").firstElementChild;
    svg.setAttribute("style", "background: white");
    var simg = new Simg(svg);
    simg.download("exported-chart");
    document.getElementById("tmpElement").remove();
});

document.getElementById("saveImgButton3").addEventListener("click", function(d){
    var svg = document.getElementById("specializationGraph").firstElementChild;
    svg.setAttribute("style", "background: white");
    var simg = new Simg(svg);
    simg.download("exported-chart");
    document.getElementById("tmpElement").remove();
});

document.getElementById("saveImgButton4").addEventListener("click", function(d){
    var svg = document.getElementById("correlationGraph").firstElementChild;
    svg.setAttribute("style", "background: white");
    var simg = new Simg(svg);
    simg.download("exported-chart");
    document.getElementById("tmpElement").remove();
});