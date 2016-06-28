var profile = {
	basePath: "./",
	layerOptimize: "closure",
	cssOptimize: "comments.keepLines",
	releaseDir: "./release",
	stripConsole: "all",
	mini: true,
	hasReport: true,
	selectorEngine: "lite",
	staticHasFeatures: {
		"dojo-firebug": false,
		"dojo-debug-messages": true,
		'dojo-trace-api': false,
		'dojo-log-api': true,
		"async": true
	},
	plugins: {
		"xstyle/css": "xstyle/build/amd-css"
	},

	packages: [
		{
			name: "dojo",
			location: "./dojo"
		},
		{
			name: "dijit",
			location: "./dijit"
		},
		{
			name: "dojox",
			location: "./dojox"
		},
		{
			name: "p3",
			location: "./p3"
		},
		{
			name: "dgrid",
			location: "./dgrid"
		},
		{
			name: "put-selector",
			location: "./put-selector"
		},
		{
			name: "xstyle",
			location: "./xstyle"
		},
		{
			name: "dbind",
			location: "./dbind"
		},
		{
			name: "rql",
			location: "./rql"
		},
		{
			name: "JBrowse",
			location: "./JBrowse"
		},
		{
			name: "jszlib",
			location: "./jszlib"
		},
		{
			name: "FileSaver",
			location: "./FileSaver"
		},
		{
			name: "circulus",
			location: "./circulus"
		},
		{
			name: "lazyload",
			location: "./lazyload/",
			main: "lazyload"
		},
		{name: 'jDataView', location: './jDataView/src', main: 'jdataview'},
		{
			name: "d3",
			location: "./d3"
		},
		{
			name: "swfobject",
			location: "./swfobject"
		},
		{
			name: "phyloview",
			location: "./phyloview"
		}

	],

	layers: {
		"p3/layer/core": {
			include: [
				"p3/app/p3app",
				"p3/panels",
				"dijit/layout/BorderContainer",
				"put-selector/put",
				"dijit/_base",
				"dijit/InlineEditBox",
				"dijit/form/ComboButton",
				"dijit/form/RadioButton",
				"dijit/CheckedMenuItem",
				"dojo/dnd/AutoSource",
				"p3/widget/TooltipDialog",
				"dijit/PopupMenuItem",
				"dijit/MenuSeparator",
				"p3/widget/GlobalSearch",
				"p3/widget/WorkspaceManager",
				"p3/widget/viewer/GenomeList",
				"p3/widget/app/Annotation",
		                "p3/widget/SelectionToGroup",
				"dojo/fx/Toggler",
				"p3/widget/viewer/Taxonomy",
				"p3/widget/viewer/Genome",
				"p3/widget/viewer/GenomeList",
				"p3/widget/viewer/Feature",
				"p3/widget/viewer/FeatureList",
				"p3/widget/JobStatus",
				"JBrowse/ConfigAdaptor/conf",
				"JBrowse/ConfigAdaptor/JB_json_v1",
				"JBrowse/Plugin",
				"JBrowse/Store/TrackMetaData",
				"dojo/data/util/simpleFetch",
				"p3/widget/HierarchicalTrackList",
				"JBrowse/View/TrackList/Hierarchical",
				"JBrowse/View/TrackList/_TextFilterMixin",
				"JBrowse/Store/SeqFeature/REST",
				"JBrowse/Store/SeqFeature",
				"JBrowse/Store",
				"JBrowse/Model/SimpleFeature",
				"JBrowse/View/Track/HTMLFeatures",
				"JBrowse/View/Ruler",
				"JBrowse/View/FASTA",
				"dijit/Toolbar",
				"dijit/ToolbarSeparator",
				"p3/widget/ProteinFeatureSummary"
		
			]
		},
		"p3/layer/panels": {
			include: [
				"p3/widget/CreateFolder",
				"p3/widget/CreateWorkspace",
				"p3/widget/Uploader"
			],
			exclude: [
				"p3/layer/core"
			]
		},
		"p3/layer/p3user": {
			include: [
				"dojo/parser",
				"dijit/form/Form",
				"dijit/form/TextBox",
				"dijit/form/Button",
				"dojox/validate/web",
				"dijit/form/DropDownButton",
				"dijit/_base/manager",
				"dijit/_base",
				"dijit/WidgetSet",
				"dijit/selection",
				"dijit/form/ComboButton",
				"dijit/form/ToggleButton"
			]
		},
		"p3/layer/globalWSObject": {
			customBase: true,
			boot: true,
			include: [
				"p3/GlobalWorkspace"
			],
			deps: ["p3/GlobalWorkspace"]
		}
	}
};

