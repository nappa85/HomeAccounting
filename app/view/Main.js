/*
 * File: app/view/Main.js
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

Ext.define('HomeAccounting.view.Main', {
	extend: 'Ext.container.Viewport',
	alias: 'widget.main',

	requires: [
		'HomeAccounting.view.MainViewModel',
		'HomeAccounting.view.MainViewController',
		'Ext.tab.Panel',
		'Ext.toolbar.Toolbar',
		'Ext.form.field.ComboBox',
		'Ext.toolbar.Fill',
		'Ext.form.field.Date',
		'Ext.grid.Panel',
		'Ext.grid.View',
		'Ext.grid.column.Number',
		'Ext.tab.Tab',
		'Ext.chart.PolarChart',
		'Ext.chart.series.Pie',
		'Ext.chart.series.sprite.PieSlice',
		'Ext.chart.interactions.Rotate',
		'Ext.chart.Legend'
	],

	controller: 'main',
	viewModel: {
		type: 'main'
	},
	layout: 'fit',
	defaultListenerScope: true,

	items: [
		{
			xtype: 'tabpanel',
			activeTab: 0,
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'top',
					items: [
						{
							xtype: 'combobox',
							itemId: 'calendarId',
							fieldLabel: 'Calendar',
							autoLoadOnValue: true,
							displayField: 'summary',
							forceSelection: true,
							store: 'Calendars',
							valueField: 'id',
							listeners: {
								change: {
									fn: 'onComboboxChange',
									scope: 'controller'
								}
							}
						},
						{
							xtype: 'tbfill'
						},
						{
							xtype: 'datefield',
							itemId: 'startDate',
							fieldLabel: 'Start',
							name: 'startDate',
							format: 'Y-m-d',
							submitFormat: 'c',
							listeners: {
								change: 'onStartDateChange'
							}
						},
						{
							xtype: 'datefield',
							itemId: 'endDate',
							fieldLabel: 'End',
							name: 'endDate',
							format: 'Y-m-d',
							submitFormat: 'c',
							listeners: {
								change: 'onEndDateChange'
							}
						}
					]
				}
			],
			items: [
				{
					xtype: 'gridpanel',
					autoScroll: true,
					title: 'Events',
					store: 'Events',
					dockedItems: [
						{
							xtype: 'toolbar',
							dock: 'bottom',
							items: [
								{
									xtype: 'button',
									handler: function(button, e) {
										if(!Ext.isEmpty(Ext.ComponentQuery.query('#calendarId')[0].getValue())) {
											Ext.create('HomeAccounting.view.EditWindow').loadRecord();
										}
									},
									text: 'Add New'
								}
							]
						}
					],
					columns: [
						{
							xtype: 'gridcolumn',
							dataIndex: 'merchant',
							text: 'Merchant',
							flex: 1
						},
						{
							xtype: 'gridcolumn',
							dataIndex: 'date',
							text: 'Date',
							flex: 1
						},
						{
							xtype: 'gridcolumn',
							dataIndex: 'time',
							text: 'Time',
							flex: 1
						},
						{
							xtype: 'numbercolumn',
							dataIndex: 'total',
							text: 'Total',
							flex: 1
						}
					],
					listeners: {
						itemdblclick: 'onGridpanelItemDblClick',
						itemcontextmenu: 'onGridpanelItemContextMenu'
					}
				},
				{
					xtype: 'polar',
					title: 'Items',
					store: 'Items',
					series: [
						{
							type: 'pie',
							label: {
								field: 'name',
								display: 'rotate',
								contrast: true,
								font: '12px Arial'
							},
							xField: 'total'
						}
					],
					interactions: [
						{
							type: 'rotate'
						}
					],
					legend: {
						xtype: 'legend',
						docked: 'right'
					}
				},
				{
					xtype: 'polar',
					title: 'Merchants',
					store: 'Merchants',
					series: [
						{
							type: 'pie',
							label: {
								field: 'name',
								display: 'rotate',
								contrast: true,
								font: '12px Arial'
							},
							xField: 'total'
						}
					],
					interactions: [
						{
							type: 'rotate'
						}
					],
					legend: {
						xtype: 'legend',
						docked: 'right'
					}
				},
				{
					xtype: 'polar',
					title: 'Tags',
					store: 'Tags',
					series: [
						{
							type: 'pie',
							label: {
								field: 'name',
								display: 'rotate',
								contrast: true,
								font: '12px Arial'
							},
							xField: 'total'
						}
					],
					interactions: [
						{
							type: 'rotate'
						}
					],
					legend: {
						xtype: 'legend',
						docked: 'right'
					}
				}
			]
		}
	],

	onStartDateChange: function(field, newValue, oldValue, eOpts) {
		if(!Ext.isEmpty(Ext.ComponentQuery.query('#calendarId').getValue())) {
		   Ext.data.StoreManager.get('Events').load();
		}
	},

	onEndDateChange: function(field, newValue, oldValue, eOpts) {
		if(!Ext.isEmpty(Ext.ComponentQuery.query('#calendarId').getValue())) {
		   Ext.data.StoreManager.get('Events').load();
		}
	},

	onGridpanelItemDblClick: function(dataview, record, item, index, e, eOpts) {
		Ext.create('HomeAccounting.view.EditWindow').loadRecord(record);
	},

	onGridpanelItemContextMenu: function(dataview, record, item, index, e, eOpts) {
		e.preventDefault();
		Ext.create('HomeAccounting.view.GridMenu', {'record': record}).showAt(e.getXY());
	}

});