define([
	"dojo/_base/declare", "dojo/_base/lang", "dojo/when", "dojo/request", "dojo/dom-construct",
	"dijit/layout/ContentPane",
	"./Base", "../../util/PathJoin", "../SubsystemMapContainer", "../../util/EncodeURIComponentExpanded"
], function(declare, lang, when, request, domConstruct,
			ContentPane,
			ViewerBase, PathJoin, SubsystemMapContainer, EncodeURIComponentExpanded){
	return declare([ViewerBase], {
		"disabled": false,
		"query": null,
		containerType: "transcriptomics_experiment",
		apiServiceUrl: window.App.dataAPI,

		subsystemName: "",
		subsystemClass: "",
		subclass: "",
		
		genomeIds: "",
		subsystemId: "",
		taxonId: "",

		onSetState: function(attr, oldVal, state){

			if(!state){
				return;
			}

			var subsystemData = this.getStateParams(state);

			state.genome_ids = subsystemData.genome_ids;
			state.genome_ids_arr = subsystemData.genome_ids.split(',');
			state.subsystem_id = subsystemData.subsystem_id;
			state.selectionData = subsystemData.selectionData;

			var self = this;
			when(this.getGenomeIdsBySubsystemId(state.genome_ids_arr, state.subsystem_id), function(genomeIds){
				state.genome_ids = genomeIds;
				self.viewer.set('visible', true);
			});
				
			window.document.title = 'Subsystem Map';
		},

		truncateBefore: function (str, pattern) {
		  return str.slice(str.indexOf(pattern) + pattern.length);
		},

		truncateAfter: function (str, pattern) {
		  return str.slice(0, str.indexOf(pattern));
		},

		getStateParams: function(state) {

			var str = state.search;
			var pattern = "&subsystemselectionuniqueidentifier=";

			var search = this.truncateAfter(str, pattern);
			var selectionData = this.truncateBefore(str, pattern);
			var decodedSelectionData = decodeURIComponent(selectionData)
			var parsedSelectionData = JSON.parse(decodedSelectionData);

			var everythingAfterParam = /subsystem_id=(.*)/;
			var subsystem_id = everythingAfterParam.exec(search)[1];

			var everythingUpToParam = /^(.*?)&subsystem_id=/;
			var genomeIdsParam = everythingUpToParam.exec(search);
			var genome_ids = genomeIdsParam[1].replace("genome_ids=", "");

			//for taxon level
			if (genome_ids.indexOf('&') > -1)
			{
				var everythingAfterTaxonId = /taxon_id=(.*)/;
				var taxonString = genomeIdsParam[0];
				var taxonId = everythingAfterTaxonId.exec(taxonString);

				var everythingUpToTaxonid = /^(.*?)&/;
				this.taxonId = everythingUpToTaxonid.exec(taxonId[1])[1];

			  	var everythingUpAmpersand = /&(.*)/;
				var genome_ids_cleaned = everythingUpAmpersand.exec(genome_ids);
				genome_ids = genome_ids_cleaned[1];
			}

			this.genomeIds = genome_ids;
			this.subsystem_id = subsystem_id;

			var subsystemData = {};
			subsystemData.genome_ids = genome_ids;
			subsystemData.subsystem_id = subsystem_id;
			subsystemData.selectionData = parsedSelectionData;

			return subsystemData;
		},

		getStateParamsForSubClass: function(state) {
			var params = {};
			var qparts = state.search.split("&");
			qparts.forEach(function(qp){
				var parts = qp.split("=");
				params[parts[0]] = parts[1];
			});

			return params;
		},

		getGenomeIdsBySubsystemId: function(genome_ids, subsystem_id){

			var query = "q=genome_id:(" + genome_ids.join(" OR ") + ") AND subsystem_id:\"" + encodeURIComponent(subsystem_id) + "\"&rows=1&facet=true&facet.field=genome_id&facet.mincount=1&json.nl=map";
			var that = this;

			return when(request.post(window.App.dataAPI + 'subsystem/', {
				handleAs: 'json',
				headers: {
					'Accept': "application/solr+json",
					'Content-Type': "application/solrquery+x-www-form-urlencoded",
					'X-Requested-With': null,
					'Authorization': window.App.authorizationToken
				},
				data: query
			}), function(response){

				var selectionData = that.state.selectionData[0];

				this.superclass = response.response.docs[0].superclass;
				this.subsystemClass = response.response.docs[0].class;
				this.subclass = response.response.docs[0].subclass;
				this.subsystemName = response.response.docs[0].subsystem_name;

				var headerString = "Subsystem View <br>";

				if (this.superclass !== "") {
					headerString += this.superclass + " » ";
				}

				if (this.subsystemClass !== "") {
					headerString += this.subsystemClass + " » ";
				}

				if (this.subclass !== "") {
					headerString += this.subclass + " » ";
				}
				
				var geneInfo = "";

				if ( selectionData.genome_count > 1 && selectionData.hasOwnProperty("role_count") ) {
					geneInfo += " (" + selectionData.role_count + " roles, " + selectionData.genome_count + " genomes, " + selectionData.gene_count + " genes)";
				} 
				else if ( selectionData.genome_count > 1 && !selectionData.hasOwnProperty("role_count") ) {
					geneInfo += " (" + selectionData.role_count + " roles, " + selectionData.gene_count + " genes)";
				}
				else if (selectionData.hasOwnProperty("role_count")) {
					geneInfo += " (" + selectionData.role_count + " roles, " + selectionData.gene_count + " genes)";
				} 
				else {
					geneInfo += " (" + selectionData.genome_name + ")";
				}



				$('#subSystemHeatmap').html( headerString + "<span style=\"color:#76a72d;font-size: 1.1em;font-weight: bold\">" + this.subsystemName + geneInfo + "</span>");

				var genomeIdList = [];
				var genomeIds = response.facet_counts.facet_fields.genome_id;

				for (var key in genomeIds) {
					if (genomeIds.hasOwnProperty(key)) {
						genomeIdList.push(key);
					}
				}

				return genomeIdList;
			});
		},

		postCreate: function(){
			if(!this.state){
				this.state = {};
			}

			this.inherited(arguments);

			this.viewer = new SubsystemMapContainer({
				region: "center",
				state: this.state,
				apiServer: this.apiServiceUrl
			});

			this.viewerHeader = new ContentPane({
				content: "",
				region: "top"
			});
			
			var headerContent = domConstruct.create("div", {"class": "PerspectiveHeader"});
			domConstruct.place(headerContent, this.viewerHeader.containerNode, "last");
			domConstruct.create("i", {"class": "fa PerspectiveIcon icon-map-o"}, headerContent);
			domConstruct.create("div", {
				"class": "PerspectiveType",
				"id": "subSystemHeatmap"
				
			}, headerContent);

			this.addChild(this.viewerHeader);
			this.addChild(this.viewer);
			//setTimeout(this.addChild(this.viewer), 3000);
			
		}
	});
});
