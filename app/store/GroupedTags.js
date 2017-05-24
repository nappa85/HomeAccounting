
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
			try {
				var oTags = Ext.getStore('Tags') || Ext.create('HomeAccounting.store.Tags');
					aTags = [];

				oStore.getGroups().each(function(oGroup) {
					aTags.push({
						name: oGroup.getGroupKey(),
						total: oGroup.sum('total'),
						count: oGroup.count(),
						min: oGroup.min('total'),
						max: oGroup.max('total')
					});
				});

				oTags.removeAll();
				oTags.add(aTags);
			}
			catch(e) {
				if(console && console.log) {
					console.log(e);
				}
			}
		}, 100)
	}
});
