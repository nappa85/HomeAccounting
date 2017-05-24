
Ext.define('HomeAccounting.store.GroupedTags', {
	extend: 'Ext.data.ChainedStore',

	storeId: 'GroupedTags',
	source: 'EventRows',
	grouper: {
		groupFn: function(oRecord) {
			return oRecord.get('tag').toLowerCase().trim();
		}
	},
	listeners: {
		datachanged: Ext.Function.createBuffered(function(oStore) {
			var oStart = new Date();
			try {
				var oTags = Ext.getStore('Tags') || Ext.create('HomeAccounting.store.Tags');
					aItems = [];

				oStore.getGroups().each(function(oGroup) {
					aItems.push({
						name: oGroup.getGroupKey(),
						total: oGroup.sum('total'),
						count: oGroup.count(),
						min: oGroup.min('total'),
						max: oGroup.max('total')
					});
				});

				oItems.removeAll();
				oItems.add(aItems);
			}
			catch(e) {
				if(console && console.log) {
					console.log(e);
				}
			}
			console.log('HomeAccounting.store.GroupedTags.datachanged ' + Ext.Date.diff(oStart, new Date, Ext.Date.MILLI));
		}, 100)
	}
});
