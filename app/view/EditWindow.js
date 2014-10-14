/*
 * File: app/view/EditWindow.js
 *
 * This file was generated by Sencha Architect version 3.1.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.0.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('HomeAccounting.view.EditWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.editwindow',

	requires: [
		'HomeAccounting.view.EditWindowViewModel',
		'Ext.form.field.Hidden',
		'Ext.form.field.Date',
		'Ext.form.field.Time',
		'Ext.form.FieldSet',
		'Ext.form.FieldContainer',
		'Ext.form.field.Display',
		'Ext.toolbar.Toolbar'
	],

	viewModel: {
		type: 'editwindow'
	},
	autoScroll: true,
	autoShow: true,
	layout: 'anchor',
	bodyPadding: 10,
	title: 'Add Event',
	maximized: true,
	modal: true,

	items: [
		{
			xtype: 'hiddenfield',
			name: 'id'
		},
		{
			xtype: 'combobox',
			anchor: '100%',
			fieldLabel: 'Merchant',
			name: 'merchant',
			allowBlank: false,
			allowOnlyWhitespace: false,
			queryMode: 'local',
			store: 'Merchants',
			typeAhead: true
		},
		{
			xtype: 'datefield',
			anchor: '100%',
			fieldLabel: 'Date',
			name: 'date',
			allowBlank: false,
			allowOnlyWhitespace: false,
			format: 'Y-m-d',
			submitFormat: 'Y-m-d'
		},
		{
			xtype: 'timefield',
			anchor: '100%',
			fieldLabel: 'Time',
			name: 'time',
			allowBlank: false,
			allowOnlyWhitespace: false,
			format: 'H:i:s',
			submitFormat: 'H:i:s'
		},
		{
			xtype: 'fieldset',
			autoScroll: true,
			title: 'Rows',
			items: [
				{
					xtype: 'fieldcontainer',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [
						{
							xtype: 'displayfield',
							flex: 2,
							fieldLabel: 'Item'
						},
						{
							xtype: 'displayfield',
							flex: 2,
							fieldLabel: 'Tag'
						},
						{
							xtype: 'displayfield',
							flex: 1,
							fieldLabel: 'Number'
						},
						{
							xtype: 'displayfield',
							flex: 1,
							fieldLabel: 'Price'
						},
						{
							xtype: 'displayfield',
							width: 60
						}
					]
				}
			]
		}
	],
	dockedItems: [
		{
			xtype: 'toolbar',
			dock: 'bottom',
			ui: 'footer',
			layout: {
				type: 'hbox',
				pack: 'end'
			}
		}
	],

	loadRecord: function(record) {
		var oFieldset = this.down('fieldset'),
		    oToolbar = this.down('toolbar'),
		    i = 0,
		    j = 0,
		    aRows;

		if(!Ext.isEmpty(record)) {
		    this.setTitle(record.get('summary'));
		    this.down('field[name=id]').setValue(record.get('id'));
		    this.down('field[name=merchant]').setValue(record.get('merchant'));
		    this.down('field[name=date]').setValue(record.get('date'));
		    this.down('field[name=time]').setValue(record.get('time'));
		    aRows = record.get('rows');
		    for(; i < aRows.length; i++) {
		        oFieldset.add({xtype: 'rowcontainer'}).loadRecord(aRows[i]);
		    }
		    oToolbar.add({
		        xtype: 'button',
		        text: 'Save as New',
		        handler: function(button) {
		            this.down('field[name=id]').setValue('');
		            this.onSubmitClick(button);
		        },
		        scope: this
		    });
		}

		oFieldset.add(this.getNewRowObject());
		oToolbar.add({
		    xtype: 'button',
		    text: 'Save',
		    handler: this.onSubmitClick,
		    scope: this
		});
	},

	getNewRowObject: function() {
		return {
		        xtype: 'rowcontainer',
		        listeners: {
		            change: {
		                single: true,
		                fn: function() {
		                    this.down('fieldset').add(this.getNewRowObject());
		                },
		                scope: this
		            }
		        }
		    };
	},

	onSubmitClick: function(button) {
		var sCalendarId = Ext.ComponentQuery.query('#calendarId')[0].getValue(),
			sId = this.down('field[name=id]').getValue(),
			aRows = this.query('rowcontainer'),
			oValue = {
				merchant: this.down('field[name=merchant]').getSubmitValue(),
				date: this.down('field[name=date]').getSubmitValue(),
				time: this.down('field[name=time]').getSubmitValue(),
				rows: [],
				total: 0
			},
			i = 0,
			oRow;

		for(; i < aRows.length; i++) {
			oRow = aRows[i].getValues();
			if(!Ext.isEmpty(oRow.item) && (oRow.price > 0)) {
				oValue.rows.push(oRow);
				oValue.total += oRow.number * oRow.price;
			}
		}

		var xhr = new XMLHttpRequest();
		if(Ext.isEmpty(sId)) {
			xhr.open('POST', 'https://www.googleapis.com/calendar/v3/calendars/' + sCalendarId + '/events');
		}
		else {
			xhr.open('PUT', 'https://www.googleapis.com/calendar/v3/calendars/' + sCalendarId + '/events/' + sId);
		}
		var oauthToken = gapi.auth.getToken();
		xhr.setRequestHeader('Authorization', 'Bearer ' + oauthToken.access_token);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.onload = Ext.Function.bind(this.onEventCreate, this);
		xhr.send(Ext.JSON.encode({
			end: {
				dateTime: oValue.date + 'T' + oValue.time,
				timeZone: 'Europe/Rome'
			},
			start: {
				dateTime: oValue.date + 'T' + oValue.time,
				timeZone: 'Europe/Rome'
			},
			description: Ext.JSON.encode(oValue),
			summary: '[HomeAccounting] ' + oValue.merchant + ' ' + oValue.total
		}));
		/*Ext.Ajax.request({
		        url: 'https://www.googleapis.com/calendar/v3/calendars/' + sCalendarId + '/events',
		        headers: {
		            'Authorization': 'Bearer ' + oauthToken.access_token,
		            'Content-Type': 'application/json'
		        },
		        method: 'POST',
		        jsonData: {
		            end: {
		                dateTime: oValue.date + 'T' + oValue.time
		            },
		            start: {
		                dateTime: oValue.date + 'T' + oValue.time
		            },
		            description: Ext.JSON.encode(oValue),
		            summary: '[HomeAccounting] ' + oValue.merchant + ' ' + oValue.total
		        },
		        success: function() { console.log('success', arguments); },
		        failure: function() { console.log('failure', arguments); console.trace(); }
		    });*/
	},

	onEventCreate: function() {
		Ext.data.StoreManager.get('Events').load();
		this.close();
	}

});