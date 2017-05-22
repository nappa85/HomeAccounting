
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
            try {
                var oItems = Ext.getStore('Items') || Ext.create('HomeAccounting.store.Items');
                oItems.removeAll();
                oStore.getGroups().each(function(oGroup) {
                    oItems.add({
                        name: oGroup.getGroupKey(),
                        total: oGroup.sum('total'),
                        count: oGroup.count(),
                        min: oGroup.min('total'),
                        max: oGroup.max('total')
                    })
                });
            }
            catch(e) {
                if(console && console.log) {
                    console.log(e);
                }
            }
        }, 100)
    }
});
