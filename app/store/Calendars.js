
Ext.define('HomeAccounting.store.Calendars', {
	extend: 'Ext.data.Store',

    requires: [
        'Ext.google.data.CalendarsProxy'
    ],

    storeId: 'Calendars',
    model: 'HomeAccounting.model.Calendar',
    proxy: {
        type: 'google-calendars'
    }
});
