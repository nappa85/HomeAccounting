
Ext.define('HomeAccounting.store.Tags', {
	extend: 'Ext.data.Store',

    storeId: 'Tags',
    model: 'HomeAccounting.model.Generic',
    proxy: {
        type: 'memory',
        reader: 'json'
    }
});
