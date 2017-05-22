
Ext.define('HomeAccounting.store.EventRows', {
	extend: 'Ext.data.Store',

    storeId: 'EventRows',
    model: 'HomeAccounting.model.EventRow',
    proxy: {
        type: 'memory',
        reader: 'json'
    }
});
