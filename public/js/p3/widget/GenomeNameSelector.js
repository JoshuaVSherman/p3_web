define([
	"dijit/form/FilteringSelect","dojo/_base/declare",
	"dojo/store/JsonRest"
], function(
	FilteringSelect, declare, 
	Store
){
	
	return declare([FilteringSelect], {
		apiServiceUrl: window.App.dataAPI,
		promptMessage:'Genome name.',
		missingMessage:'Specify genome name.',
		placeHolder:'e.g. Bacillus Cereus',
		searchAttr: "genome_name",
		//query: "?&select(taxon_name)",
		queryExpr: "*${0}*",
		query: {select: "genome_name,genome_id"},
		highlightMatch: "all",
		autoComplete: false,
		store: null,
		constructor: function(){
			if (!this.store){
				this.store = new Store({target: this.apiServiceUrl + "/genome/", idProperty: "genome_id", header: {accept: "application/json"}});
			}
		},
		isValid: function(){
			return (!this.required || this.get('displayedValue') != "");
		}
	});
});
