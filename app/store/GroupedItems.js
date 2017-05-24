
Ext.define('HomeAccounting.store.GroupedItems', {
	extend: 'Ext.data.ChainedStore',

	storeId: 'GroupedItems',
	source: 'EventRows',
	grouper: {
		groupFn: function(oRecord) {
			return oRecord.get('item').toLowerCase().trim();
		}
	},
	listeners: {
		datachanged: Ext.Function.createBuffered(function(oStore) {
			var oStart = new Date();
			try {
				var oItems = Ext.getStore('Items') || Ext.create('HomeAccounting.store.Items'),
					aItems = [];

				oItems.removeAll();

				oStore.getGroups().each(function(oGroup) {
					aItems.push({
						name: oGroup.getGroupKey(),
						total: oGroup.sum('total'),
						count: oGroup.count(),
						min: oGroup.min('total'),
						max: oGroup.max('total')
					});
				});

				oItems.add(aItems);
			}
			catch(e) {
				if(console && console.log) {
					console.log(e);
				}
			}
			console.log('HomeAccounting.store.GroupedItems.datachanged ' + Ext.Date.diff(oStart, new Date, Ext.Date.MILLI));
		}, 100)
	}
});
