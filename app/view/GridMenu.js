/*
 * File: app/view/GridMenu.js
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

Ext.define('HomeAccounting.view.GridMenu', {
	extend: 'Ext.menu.Menu',
	alias: 'widget.gridmenu',

	requires: [
		'HomeAccounting.view.GridMenuViewModel',
		'Ext.menu.Item'
	],

	viewModel: {
		type: 'gridmenu'
	},
	width: 120,

	items: [
		{
			xtype: 'menuitem',
			handler: function(item, e) {
				Ext.create('HomeAccounting.view.EditWindow').loadRecord(this.parentMenu.record);
			},
			text: 'Edit'
		},
		{
			xtype: 'menuitem',
			handler: function(item, e) {
				var xhr = new XMLHttpRequest();
				xhr.open('DELETE', 'https://www.googleapis.com/calendar/v3/calendars/' + Ext.ComponentQuery.query('#calendarId')[0].getValue() + '/events/' + this.parentMenu.record.get('id'));
				var oauthToken = gapi.auth.getToken();
				xhr.setRequestHeader('Authorization', 'Bearer ' + oauthToken.access_token);
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.onload = Ext.Function.bind(this.parentMenu.onEventDelete, this.parentMenu);
				xhr.send();
			},
			text: 'Delete'
		}
	],

	onEventDelete: function() {
		Ext.data.StoreManager.get('Events').load();
	}

});