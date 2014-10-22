/*
 * File: app/store/Events.js
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

Ext.define('HomeAccounting.store.Events', {
	extend: 'Ext.data.Store',

	requires: [
		'HomeAccounting.model.Event',
		'Ext.data.proxy.JsonP',
		'Ext.data.reader.Json',
		'Ext.util.Sorter'
	],

	constructor: function(cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
			storeId: 'Events',
			model: 'HomeAccounting.model.Event',
			proxy: {
				type: 'jsonp',
				extraParams: {
					q: '[HomeAccounting]'
				},
				reader: {
					type: 'json',
					rootProperty: 'items',
					transform: {
						fn: function(data) { sActualTimeZone = data.timeZone; return data;}
					}
				}
			},
			listeners: {
				beforeload: {
					fn: me.onJsonpstoreBeforeLoad,
					scope: me
				}
			},
			sorters: {
				property: 'start'
			}
		}, cfg)]);
	},

	onJsonpstoreBeforeLoad: function(store, operation, eOpts) {
		var oProxy = this.getProxy();

		oProxy.extraParams.timeMin = Ext.ComponentQuery.query('#startDate')[0].getSubmitValue();
		oProxy.extraParams.timeMax = Ext.ComponentQuery.query('#endDate')[0].getSubmitValue();

		Ext.data.StoreManager.get('Merchants').removeAll();
		Ext.data.StoreManager.get('Items').removeAll();
		Ext.data.StoreManager.get('Tags').removeAll();
	}

});