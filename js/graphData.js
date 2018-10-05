function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function buildGraphInput(dictRegion, dictCountry, worker_sum, european_worker_sum, sectors, result) {
    
    var obj = {};
    obj["name"] = selectedRegion;
    obj["region"] = "true";
    var tempArray = [];
    for (var i = 0; i < dictRegion.length; i++) {
        var item = {};
        item["name"] = dictRegion[i][0];
        item["size"] = dictRegion[i][1];

        var LQthreshold = 1;
        var p1 = dictRegion[i][1] / worker_sum;               
        var p2 = dictCountry[dictRegion[i][0]] / european_worker_sum;
        var LQ = p1 / p2;
        if (LQ > LQthreshold) {
            item["set"] = "true";
        }

        tempArray.push(item);
    }
    obj["children"] = tempArray;
    
    if (sectors != null) {
        
        for (var i = 0; i < obj["children"].length; i++) {
            if ("set" in obj["children"][i] && obj["children"][i]["name"] in result) {
                obj["children"][i]["specialization"] = "true";
                sectors.push(obj["children"][i]["name"]);
            }   
        }
        
    }
    
    return obj;
    
}

var selectedRegion = getParameterByName('region');
//console.log(selectedRegion);

$.ajax({
    method: 'get',
    url: 'http://localhost/related_var/backend/getRegionInfo.php',
    data: {
        region : selectedRegion
    },
    dataType: 'json',
    success: function(result) {
        //console.log(result);
        
        var nuts = result['Nuts'];
        //console.log(nuts);
        
        delete result['Nuts'];
        delete result['Region'];
        
        var worker_sum = 0;
        
        for (var key in result) {
            if (Object.prototype.hasOwnProperty.call(result, key)) {
                var val = result[key];
                //console.log(key + " -> " + val);
                
                worker_sum += parseInt(val);
            }
        }
        
        //console.log(worker_sum);
        var threeFourthsThreshold = worker_sum * 0.75;
        //console.log(threeFourthsThreshold);
        
        // Create items array
        var items = Object.keys(result).map(function(key) {
            return [key, parseInt(result[key])];
        });

        // Sort the array based on the second element
        items.sort(function(first, second) {
            return second[1] - first[1];
        });
        
        //console.log(items);
        
        var temp_worker_sum = 0, thresholdIndex;
        for (var i = 0; i < items.length; i++) {
            //console.log(i);
            //console.log(items[i][1]);
            
            temp_worker_sum += items[i][1];
            thresholdIndex = i;
            
            if (temp_worker_sum > threeFourthsThreshold) {
                break;
            }
        }
        
        //console.log(temp_worker_sum);
        
        var dictRegion = items.slice(0, thresholdIndex);
        //console.log(dict);
        
        
        $.ajax({
            method: 'get',
            url: 'http://localhost/related_var/backend/getCountriesInfo.php',
            dataType: 'json',
            success: function(result2) {
                //console.log(result2);
                //console.log(result2.length);
                var dictCountry = {};
                for (var key in result2[0]) {
                    if (Object.prototype.hasOwnProperty.call(result2[0], key)) {
                        if (key != "Nuts" && key != "Country")
                            dictCountry[key] = 0;
                    }
                }
                
                for (var j = 0; j < result2.length; j++) {
                    for (var key in result2[j]) {
                        if (Object.prototype.hasOwnProperty.call(result2[j], key)) {
                            var val = result2[j][key];
                            
                            if (key != "Nuts" && key != "Country")
                                dictCountry[key] = dictCountry[key] + parseInt(val);
                        }
                    }
                }
                //console.log(dictCountry);
                
                var european_worker_sum = 0;
                for (var key in dictCountry) {
                    if (Object.prototype.hasOwnProperty.call(dictCountry, key)) {
                        european_worker_sum += dictCountry[key];
                    }
                }
                //console.log(european_worker_sum);
                
                var obj = buildGraphInput(dictRegion, dictCountry, worker_sum, european_worker_sum, null, null);

                //console.log(obj);

                treelikeGraph(obj);
                coloredGraph(obj, false, false);
                
                
                $.ajax({
                    method: 'get',
                    url: 'http://localhost/related_var/backend/getSectors.php',
                    data: {
                        nuts : nuts
                    },
                    dataType: 'json',
                    success: function(result3) {
                        //console.log(result3);
                        
                        var sectors = [];
                        var obj2 = buildGraphInput(dictRegion, dictCountry, worker_sum, european_worker_sum, sectors, result3);
                        
                        //console.log(obj2);
                        
                        coloredGraph(obj2, true, false);

                        
                        $.ajax({
                            method: 'POST',
                            url: 'http://localhost/related_var/backend/getRelSectors.php',
                            data: JSON.stringify(sectors),
                            dataType: 'json',
                            success: function(result4) {
                                //console.log(result4);
                                
                                var obj3 = buildGraphInput(dictRegion, dictCountry, worker_sum, european_worker_sum, sectors, result3);
                                
                                for (var i = 0; i < obj3["children"].length; i++) {
                                    if ("specialization" in obj3["children"][i]) {
                                        
                                        var relSectors = [];
                                        for (var j = 0; j < result4[obj3["children"][i]["name"]].length; j++) {
                                            var item = {};
                                            item["name"] = result4[obj3["children"][i]["name"]][j];
                                            item["correlation"] = "true";
                                            relSectors.push(item);
                                        }
                                        
                                        obj3["children"][i]["children"] = relSectors;
                                    }   
                                }
                                
                                //console.log(obj3);
                                
                                coloredGraph(obj3, true, true);

                            }
                        });
                        

                    }
                });
                

            }
        });

    }
});