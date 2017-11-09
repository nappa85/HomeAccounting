
Ext.define('HomeAccounting.store.Events', {
	extend: 'Ext.data.Store',

// 	requires: [
// 		'Ext.google.data.EventsProxy'
// 	],

	storeId: 'Events',
	model: 'HomeAccounting.model.Event',
	proxy: 'google-events',
	autoSync: true,
	sorters: ['startDate'],
	listeners: {
		beforeload: function() {
			var oProxy = this.getProxy();

			if(!(oProxy.extraParams.calendar = Ext.ComponentQuery.query('#calendarId')[0].getValue())) {
				return false;
			}
			if(!(oProxy.extraParams.startDate = Ext.ComponentQuery.query('#startDate')[0].getValue())) {
				return false;
			}
			if(!(oProxy.extraParams.endDate = Ext.ComponentQuery.query('#endDate')[0].getValue())) {
				return false;
			}

			Ext.getStore('EventRows').removeAll();
		}
	}

});
