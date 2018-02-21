define([
  "dojo/_base/declare", "dijit/_WidgetBase", "dojo/on",
  "dojo/dom-class", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin",
  "../../util/PathJoin",
  "dojo/request", "../../WorkspaceManager", "../WorkspaceObjectSelector",
  "dojo/query", "dojo/_base/lang", "dijit/Tooltip", "dijit/popup"

], function(declare, WidgetBase, on,
  domClass, Templated, WidgetsInTemplate,
  PathJoin,
  xhr, WorkspaceManager,
  WorkspaceObjectSelector,query,lang,
  Tooltip, popup){
    return function(config){
        console.log('did I call this function?');
        console.log(config);
        // document.getElementsByClassName('showHideSection')[0].style.display = 'none';
        // document.getElementsByClassName('showButton')[0].style.display = 'block';
        //console.log("MAP: ", this.mapFromIDs, this.leftTypeSelect.get('value'), this.rightTypeSelect.get('value'));
        // var from = this.leftTypeSelect.get('value');
        // var to = this.rightTypeSelect.get('value');
        // var via = "gene_id";
        // via= this.joinUsing.get('value');

        //var ids = this.mapFromIDs.map(encodeURIComponent).join(",");
        // var ids = this.mapFromIDs.join(",");
        // var q;
        // var fromIdGroup = null;
        // var toIdGroup = null;
        // var patric_id_group ={"patric_id":"","feature_id":"","P2_feature_id":"","alt_locus_tag":"","refseq_locus_tag":"","gene_id":"","gi":"","protein_id":""};
        //
        // fromIdGroup = (from in patric_id_group) ? "PATRIC" : "OTHER";
        // toIdGroup = (to in patric_id_group) ? "PATRIC" : "OTHER";
        //
        // var _self = this;
        //
        // if (this.leftList.get('value').replace(/^\s+|\s+$/gm,'') != ""){
        //
        //   console.log("ids: ", ids);
        //   query(".idmap_result_div .GridContainer").style("visibility", "visible");
        //   query(".PerspectiveTotalCount").style("visibility", "visible");
        //   _self.result.set('state', {"fromIdGroup": fromIdGroup, "joinId":via, "fromId": from, "toIdGroup":toIdGroup, "toId":to, "fromIdValue":ids});
        // }
        //
        // return;
        // if(ids && (ids.length > 0)){
        //   switch(from){
        //     case "UniProtKB-ID":
        //     q = "in(uniprotkb_accession,(" + ids + "))";
        //     break;
        //     default:
        //     q = 'in(id_value,(' + ids + '))&eq(id_type,' + from + ')&limit(99999)'
        //   }
        // }
        //
        // console.log('ID MAP Query: ', q);
        // xhr.post(PathJoin(window.App.dataAPI, "id_ref") + "/", {
        //   handleAs: 'json',
        //   headers: {
        //     'Accept': "application/json",
        //     'Content-Type': "application/rqlquery+x-www-form-urlencoded",
        //     'X-Requested-With': null,
        //     'Authorization': this.token ? this.token : (window.App.authorizationToken || "")
        //   },
        //   data: q
        // }).then(function(res){
        //   console.log("RES: ", res);
        //   var uniprotIDs = res.map(function(item){
        //     return item['uniprotkb_accession']
        //   });
        //
        //   var lq = 'in(uniprotkb_accession,(' + uniprotIDs.join(',') + '))&eq(id_type,' + to + ')'
        //   xhr.post(PathJoin(window.App.dataAPI, "id_ref") + "/", {
        //     handleAs: 'json',
        //     headers: {
        //       'Accept': "application/json",
        //       'Content-Type': "application/rqlquery+x-www-form-urlencoded",
        //       'X-Requested-With': null,
        //       'Authorization': this.token ? this.token : (window.App.authorizationToken || "")
        //     },
        //     data: lq
        //   }).then(function(res){
        //     _self.set('mapToIDs', res.map(function(x){
        //       return x['id_value'];
        //     }));
        //     console.log("RES: ", res);
        //   });
        // });
      }
    });
  // });
