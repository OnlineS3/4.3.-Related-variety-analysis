var flare = 
{
 "name": "flare",
 "children": [
  {
   "name": "analytics",
   "children": [
    {
     "name": "cluster",
     "children": [
      {"name": "AgglomerativeCluster", "size": 3938},
      {"name": "CommunityStructure", "size": 3812},
      {"name": "HierarchicalCluster", "size": 6714}
     ]
    },
    {
     "name": "graph",
     "children": [
      {"name": "BetweennessCentrality", "size": 3534},
      {"name": "LinkDistance", "size": 5731}
     ]
    }
   ]
  },
  {
   "name": "animate",
   "children": [
    {"name": "Easing", "size": 17010, "set": "true"},
    {"name": "FunctionSequence", "size": 5842},
    {"name": "Transitioner", "size": 19975},
    {"name": "TransitionEvent", "size": 1116, "set": "true"},
    {"name": "Tween", "size": 6006}
   ]
  }
 ]
};

//coloredGraph(flare);

function treelikeGraph(flare){

	var margin = {top: 20, right: 120, bottom: 20, left: 120},
    	width = 960 - margin.right - margin.left,
    	height = 800 - margin.top - margin.bottom;
    
	var i = 0,
    	duration = 750,
    	root;

	var tree = d3.layout.tree()
    	.size([height, width]);

	var diagonal = d3.svg.diagonal()
    	.projection(function(d) { return [d.y, d.x]; });

	var svg = d3.select("#treelikeGraph").append("svg")
    	.attr("width", width + margin.right + margin.left)
    	.attr("height", height + margin.top + margin.bottom)
        .append("g")
    	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


	root = flare;
	root.x0 = height / 2;
	root.y0 = 0;

	function update(source) {

  		// Compute the new tree layout.
  		var nodes = tree.nodes(root).reverse(),
      		links = tree.links(nodes);

  		// Normalize for fixed-depth.
  		nodes.forEach(function(d) { d.y = d.depth * 180; });

  		// Update the nodes…
  		var node = svg.selectAll("g.node")
      		.data(nodes, function(d) { return d.id || (d.id = ++i); });

  		// Enter any new nodes at the parent's previous position.
  		var nodeEnter = node.enter().append("g")
      		.attr("class", "node")
      		.attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
            .style("cursor", "pointer")
            .on("click", click)
      		.on("dblclick", dblClick);

  		nodeEnter.append("circle")
      		.attr("r", 15)
      		.style({"fill": function(d) { return d._children ? "lightsteelblue" : "#fff"; }, "stroke": "steelblue", "stroke-width": "2px"});

  		// Transition nodes to their new position.
  		var nodeUpdate = node.transition()
      		.duration(duration)
      		.attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  		nodeUpdate.select("circle")
      		.attr("r", 10)
      		.style("fill", function(d) {              
                if(d.hasOwnProperty("region")){
                    return "dodgerBlue ";
                }
				
				return d._children ? "lightsteelblue" : "#fff"; });
        
  		nodeUpdate.select("text")
      		.style("fill-opacity", 1);

  		// Transition exiting nodes to the parent's new position.
  		var nodeExit = node.exit().transition()
      		.duration(duration)
      		.attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
      		.remove();

  		nodeExit.select("circle")
      		.attr("r", 15);

  		nodeExit.select("text")
      		.style("fill-opacity", 1e-6);

  		// Update the links…
  		var link = svg.selectAll("path.link")
      		.data(links, function(d) { return d.target.id; });

  		// Enter any new links at the parent's previous position.
  		link.enter().insert("path", "g")
      		.attr("class", "link")
      		.attr("d", function(d) {
       			var o = {x: source.x0, y: source.y0};
        		return diagonal({source: o, target: o});
      		})
            .style({"fill": "none", "stroke": "#ccc", "stroke-width": "2px"});

  		// Transition links to their new position.
  		link.transition()
      		.duration(duration)
      		.attr("d", diagonal);

  		// Transition exiting nodes to the parent's new position.
  		link.exit().transition()
      		.duration(duration)
      		.attr("d", function(d) {
       			var o = {x: source.x, y: source.y};
        		return diagonal({source: o, target: o});
      		})
      		.remove();

  		// Stash the old positions for transition.
  		nodes.forEach(function(d) {
    		d.x0 = d.x;
    		d.y0 = d.y;
  		});
        
        //----------legend--------------- 
        
        var legend = svg.append("g")
            .attr("class", "legend")
            .attr("x", width + 100)
            .attr("y", height)
            .attr("height", 100)
            .attr("width", 100);
        
        legend.append("circle")
            .attr("cx",  - width/10)
            .attr("cy", height)
            .attr("r", 7.5)
            .style({"fill" : "dodgerBlue", "stroke" : "steelblue", "stroke-width" : "1.5px"});
        
        legend.append("circle")
            .attr("cx",  - width/10 + width/8)
            .attr("cy", height)
            .attr("r", 7.5)
            .style({"fill" : "#fff", "stroke" : "steelblue", "stroke-width" : "1.5px"});
        
        legend.append("text")
            .attr("x",  - width/10 + 20)
            .attr("y", height + 5)
            .text("Region")
            .style("font", "12px sans-serif");

        legend.append("text")
            .attr("x",  - width/10 + width/8 + 20)
            .attr("y", height + 5)
            .text("Sectors")
            .style("font", "12px sans-serif");

	}

	//Toggle name of node on click
    function click(d) {
        
        if(d3.select(this).select("text.hover").size() != 0){
            d3.select(this).select("text.hover").remove();
        }
        else{
            d3.select(this).filter(function(d){ return d.hasOwnProperty('size')}).append("text")
        	   .attr("class", "hover")
        	   .attr('transform', function(d){ 
            	   return 'translate(5, -10)';
        	   })
        	   .text(d.name + ": " + d.size);

            d3.select(this).filter(function(d){ return !d.hasOwnProperty('size')}).append("text")
        	   .attr("class", "hover")
        	   .attr('transform', function(d){ 
            	   return 'translate(5, -10)';
        	   })
        	   .text(d.name);
        }
        
    }

	// Toggle children on double click.
	function dblClick(d) {
  		if (d.children) {
    		d._children = d.children;
    		d.children = null;
  		} else {
    		d.children = d._children;
    		d._children = null;
  		}
  		update(d);
	}

	function collapse(d) {
  		if (d.children) {
    		d._children = d.children;
    		d._children.forEach(collapse);
    		d.children = null;
 		}
	}

	root.children.forEach(collapse);
	update(root);

	d3.select(self.frameElement).style("height", "800px");
}


//needs div with id "coloredGraph" to play
function coloredGraph(flare, specialization, correlation){
	var margin = {top: 20, right: 120, bottom: 20, left: 120},
    	width = 960 - margin.right - margin.left,
    	height = 800 - margin.top - margin.bottom;
    
	var i = 0,
    	duration = 750,
    	root;

	var tree = d3.layout.tree()
    	.size([height, width]);

	var diagonal = d3.svg.diagonal()
    	.projection(function(d) { return [d.y, d.x]; });

    if(specialization && !correlation){
       var svg = d3.select("#specializationGraph").append("svg")
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    }
    else if(specialization && correlation){
        var svg = d3.select("#correlationGraph").append("svg")
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    }
    else{
         var svg = d3.select("#coloredGraph").append("svg")
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    }


	root = flare;
	root.x0 = height / 2;
	root.y0 = 0;

	function update(source) {

  		// Compute the new tree layout.
  		var nodes = tree.nodes(root).reverse(),
      		links = tree.links(nodes);

  		// Normalize for fixed-depth.
  		nodes.forEach(function(d) { d.y = d.depth * 180; });

  		// Update the nodes…
  		var node = svg.selectAll("g.node")
      		.data(nodes, function(d) { return d.id || (d.id = ++i); });

  		// Enter any new nodes at the parent's previous position.
  		var nodeEnter = node.enter().append("g")
      		.attr("class", "node")
      		.attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
            .style("cursor", "pointer")
            .on("click",click)
      		.on("dblclick", dblClick);

        if(!correlation){
            nodeEnter.append("circle")
      		.attr("r", 10)
      		.style({"fill": function(d) { return d._children ? "lightsteelblue" : "#fff"; }, "stroke": "steelblue", "stroke-width": "2px"});
        }
        else{
            //for tab 4 create rectangles when property correlation exists
            nodeEnter.filter(function(d){return !d.hasOwnProperty("correlation")}).append("circle")
      		.attr("r", 10)
      		.style({"fill": function(d) { return d._children ? "lightsteelblue" : "#fff"; }, "stroke": "steelblue", "stroke-width": "2px"});
            
            nodeEnter.filter(function(d){return d.hasOwnProperty("correlation")}).append("rect")
      		.attr("height", 20)
            .attr("width", 20)
      		.style({"fill": "red", "stroke": "fireBrick", "stroke-width": "2px"});
        }
  		
  		// Transition nodes to their new position.
  		var nodeUpdate = node.transition()
      		.duration(duration)
      		.attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });
        
        nodeUpdate.select("circle")
      		.attr("r", 10)
      		.style("fill", function(d) { 
				if (d.hasOwnProperty("set") && !d.hasOwnProperty("specialization")){
				    return "limeGreen";				
				}
                else if(d.hasOwnProperty("set") && d.hasOwnProperty("specialization")){
                    return "red";
                }
                
                if(d.hasOwnProperty("region")){
                    return "dodgerBlue ";
                }
				
				return d._children ? "lightsteelblue" : "#fff"; })
            .style("stroke", function(d) { 
				if (d.hasOwnProperty("set") && !d.hasOwnProperty("specialization")){
				    return "green";			
				}
                else if ((d.hasOwnProperty("set") && d.hasOwnProperty("specialization")) || d.hasOwnProperty("set")){
                    return "fireBrick";
                }
                else{
                    return "steelBlue";
                }
            });


  		nodeUpdate.select("text")
      		.style("fill-opacity", 1);

  		// Transition exiting nodes to the parent's new position.
  		var nodeExit = node.exit().transition()
      		.duration(duration)
      		.attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
      		.remove();

  		nodeExit.select("circle")
      		.attr("r", 15);

  		nodeExit.select("text")
      		.style("fill-opacity", 1e-6);

  		// Update the links…
  		var link = svg.selectAll("path.link")
      		.data(links, function(d) { return d.target.id; });

  		// Enter any new links at the parent's previous position.
  		link.enter().insert("path", "g")
      		.attr("class", "link")
      		.attr("d", function(d) {
       			var o = {x: source.x0, y: source.y0};
        		return diagonal({source: o, target: o});
      		})
            .style({"fill": "none", "stroke": "#ccc", "stroke-width": "2px"});

  		// Transition links to their new position.
  		link.transition()
      		.duration(duration)
      		.attr("d", diagonal);

  		// Transition exiting nodes to the parent's new position.
  		link.exit().transition()
      		.duration(duration)
      		.attr("d", function(d) {
       			var o = {x: source.x, y: source.y};
        		return diagonal({source: o, target: o});
      		})
      		.remove();

  		// Stash the old positions for transition.
  		nodes.forEach(function(d) {
    		d.x0 = d.x;
    		d.y0 = d.y;
  		});
        
       //----------legend--------------- 
        
        var legend = svg.append("g")
            .attr("class", "legend")
            .attr("x", width + 100)
            .attr("y", height)
            .attr("height", 100)
            .attr("width", 100);
        
         legend.append("circle")
            .attr("cx", - width/10)
            .attr("cy", height)
            .attr("r", 7.5)
            .style({"fill" : "dodgerBlue", "stroke" : "steelblue", "stroke-width" : "1.5px"});

        legend.append("circle")
            .attr("cx", - width/10 + width/8)
            .attr("cy", height)
            .attr("r", 7.5)
            .style({"fill" : "#fff", "stroke" : "steelblue", "stroke-width" : "1.5px"});
        
         legend.append("circle")
            .attr("cx", - width/10 + width/8 + width/8)
            .attr("cy", height)
            .attr("r", 7.5)
            .style({"fill" : "limeGreen", "stroke" : "green", "stroke-width" : "1.5px"});
        
        legend.append("text")
            .attr("x", - width/10 + 20)
            .attr("y", height + 5)
            .text("Region")
            .style("font", "12px sans-serif");
        
        legend.append("text")
            .attr("x", - width/10 + width/8 + 20)
            .attr("y", height + 5)
            .text("Sectors")
            .style("font", "12px sans-serif");

        legend.append("text")
            .attr("x", - width/10 + width/8 + width/8 + 20)
            .attr("y", height + 5)
            .text("Sectors that fulfill LQ")
            .style("font", "12px sans-serif");
        
        if(specialization){
            legend.append("circle")
                .attr("cx", - width/10 + width/8 + width/8 + width/4)
                .attr("cy", height)
                .attr("r", 7.5)
                .style({"fill" : "red", "stroke" : "fireBrick", "stroke-width" : "1.5px"});
        
            legend.append("text")
                .attr("x", - width/10 + width/8 + width/8 + width/4 + 20)
                .attr("y", height)
                .attr("dy", "0em")
                .text("Sectors with working and")
                .style("font", "12px sans-serif");
            legend.append("text")
                .attr("x", - width/10 + width/8 + width/8 + width/4 + 20)
                .attr("y", height)
                .attr("dy", "1em")
                .text(" patent specialization")
                .style("font", "12px sans-serif");
        }
        
        if(correlation){
            legend.append("rect")
                .attr("x", - width/10 + width/8 + width/8 + width/4 + width/5 + width/16)
                .attr("y", height - 5)
                .attr("height", 15)
                .attr("width", 15)
                .style({"fill": "red", "stroke": "fireBrick","stroke-width": "1.5px"});
        
            legend.append("text")
                .attr("x", - width/10 + width/8 + width/8 + width/4 + width/5 + width/16 + 25)
                .attr("y", height + 7)
                .text("Correlated sectors")
                .style("font", "12px sans-serif");
        }
    
	}
    
    //Toggle name of node on click
    function click(d) {

        if(d3.select(this).select("text.hover").size() != 0){
            d3.select(this).select("text.hover").remove();
        }
        else{
            //Auto trexei gia ta stroggyla (depth === 1)
            d3.select(this).filter(function(d){ return d.hasOwnProperty('size')}).append("text")
        	   .attr("class", "hover")
        	   .text(d.name + ": " + d.size)
        	   .attr('transform', function(d){
        	   	if (d.depth === 1) {
                    console.debug("depth is 1");
                    var midPos = (-this.clientWidth / 2) - 20; //Value in px
                    return 'translate('+ midPos +', -15)';
                } else {
        	   		console.warn("depth wasn't 1: investigate");
                    return 'translate(5, -10)';
                }
        	   });

            //Auto trexei gia ta tetragona (depth === 2) kai to arxiko(onoma polhs)
            d3.select(this).filter(function(d){ return !d.hasOwnProperty('size')}).append("text")
        	   .attr("class", "hover")
                .attr('transform', function(d){
                    if (d.depth === 2) {
                        console.debug("depth is 2");
                        return 'translate(5, -3)';
                    } else {
                        console.warn("depth wasn't 2: investigate");
                        return 'translate(5, -10)';
                    }
                })
        	   .text(d.name);
        }
        
    }

	// Toggle children on double click.
	function dblClick(d) {
  		if (d.children) {
    		d._children = d.children;
    		d.children = null;
  		} else {
    		d.children = d._children;
    		d._children = null;
  		}
  		update(d);
	}

	function collapse(d) {
  		if (d.children) {
    		d._children = d.children;
    		d._children.forEach(collapse);
    		d.children = null;
 		}
	}

	root.children.forEach(collapse);
	update(root);

	d3.select(self.frameElement).style("height", "800px");
    
}
