
Ext.define('HomeAccounting.store.Items', {
	extend: 'Ext.data.Store',

    storeId: 'Items',
    model: 'HomeAccounting.model.Generic',
    proxy: {
        type: 'memory',
        reader: 'json'
    }
});
