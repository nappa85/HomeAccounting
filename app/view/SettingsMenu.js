
Ext.define('HomeAccounting.view.SettingsMenu', {
	extend: 'Ext.Menu',
	alias: 'widget.settingsmenu',

	items: [
        {
            xtype: 'selectfield',
            itemId: 'calendarId',
            label: 'Calendar',
            displayField: 'title',
            valueField: 'id',
            store: 'Calendars',
            autoSelect: false,
            value:  Ext.util.LocalStorage.get('id').getItem('calendarId') || null,
            listeners: {
                change: function(oField, oRecord) {
                    Ext.util.LocalStorage.get('id').setItem('calendarId', oRecord.getId());

                    Ext.getStore('Events').load();
                }
            }
        },
        {
            xtype: 'datepickerfield',
            itemId: 'startDate',
            label: 'Start',
            name: 'startDate',
            dateFormat: 'Y-m-d',
            value: (function() {
                var date = new Date(),
                    y = date.getFullYear(),
                    m = date.getMonth();

                return new Date(y, m, 1);
            })(),
            listeners: {
                change: function(field, newValue, oldValue, eOpts) {
                    Ext.getStore('Events').load();
                }
            }
        },
        {
            xtype: 'datepickerfield',
            itemId: 'endDate',
            label: 'End',
            name: 'endDate',
            dateFormat: 'Y-m-d',
            value: (function() {
                var date = new Date(),
                    y = date.getFullYear(),
                    m = date.getMonth();

                return new Date(y, m + 1, 0);
            })(),
            listeners: {
                change: function(field, newValue, oldValue, eOpts) {
                    Ext.getStore('Events').load();
                }
            }
        }
	]
});
