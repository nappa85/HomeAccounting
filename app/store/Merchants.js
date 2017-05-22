
Ext.define('HomeAccounting.store.Merchants', {
	extend: 'Ext.data.Store',

    storeId: 'Merchants',
    model: 'HomeAccounting.model.Generic',
    proxy: {
        type: 'memory',
        reader: 'json'
    }
});
