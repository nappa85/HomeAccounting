
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
			try {
				var oMerchants = Ext.getStore('Merchants') || Ext.create('HomeAccounting.store.Merchants');
					aMerchants = [];

				oStore.getGroups().each(function(oGroup) {
					aMerchants.push({
						name: oGroup.getGroupKey(),
						total: oGroup.sum('total'),
						count: oGroup.count(),
						min: oGroup.min('total'),
						max: oGroup.max('total')
					});
				});

				oMerchants.removeAll();
				oMerchants.add(aMerchants);
			}
			catch(e) {
				if(console && console.log) {
					console.log(e);
				}
			}
		}, 100)
	}
});
