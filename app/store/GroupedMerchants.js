
Ext.define('HomeAccounting.store.GroupedMerchants', {
	extend: 'Ext.data.ChainedStore',

	storeId: 'GroupedMerchants',
	source: 'EventRows',
	grouper: {
		groupFn: function(oRecord) {
			var oStore = Ext.getStore('Events'),
				oEvent = oStore ? oStore.getById(oRecord.get('eventId')) : false;

			return oEvent ? oEvent.get('merchant').toLowerCase().trim() : console.log(oRecord.data.eventId, oRecord.get('eventId'));
		}
	},
	listeners: {
		datachanged: Ext.Function.createBuffered(function(oStore) {
			var oStart = new Date();
			try {
				var oMerchants = Ext.getStore('Merchants') || Ext.create('HomeAccounting.store.Merchants');
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
			console.log('HomeAccounting.store.GroupedMerchants.datachanged ' + Ext.Date.diff(oStart, new Date, Ext.Date.MILLI));
		}, 100)
	}
});
