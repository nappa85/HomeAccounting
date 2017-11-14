
Ext.define('HomeAccounting.view.Tabs', {
	extend: 'Ext.tab.Panel',
	alias: 'widget.tabs',

	requires: [
		'Ext.chart.CartesianChart',
		'Ext.chart.axis.Time',
		'Ext.chart.series.Area',
		'Ext.chart.series.Scatter',
		'Ext.chart.interactions.PanZoom',
		'Ext.chart.interactions.ItemHighlight',
		'Ext.chart.PolarChart',
		'Ext.chart.series.Pie',
		'Ext.chart.series.sprite.PieSlice',
		'Ext.chart.interactions.Rotate',
		'Ext.chart.legend.Legend',
		'Ext.grid.plugin.SummaryRow'
	],

	listeners: {
		added: function() {
			this.getTabBar().add({
				xtype: 'button',
				iconCls: 'x-fa fa-gear',
				handler: function() {
					Ext.Viewport.toggleMenu('right');
				}
			});
		}
	},

	items: [
		{
			xtype: 'panel',
			layout: 'fit',
			tab: {
				title: 'Events'
			},
			items: [
				{
					xtype: 'toolbar',
					docked: 'bottom',
					items: [
						{
							handler: function(button, e) {
								if(!Ext.isEmpty(Ext.ComponentQuery.query('#calendarId')[0].getValue())) {
									Ext.Viewport.down('editwindow').setRecord({data: {
										date: Ext.Date.format(new Date, 'Y-m-d'),
										time: Ext.Date.format(new Date, 'H:i:s')
									}});
									Ext.Viewport.setActiveItem('editwindow');
								}
							},
							text: 'Add New',
							iconCls: 'x-fa fa-plus'
						},
						{
							handler: function() {
								var oRecord = this.up('panel').down('grid').getSelection();
								if(oRecord) {
									Ext.Viewport.down('editwindow').setRecord(oRecord);
									Ext.Viewport.setActiveItem('editwindow');
								}
							},
							text: 'Edit',
							iconCls: 'x-fa fa-pencil'
						},
						{
							handler: function() {
								var oRecord = this.up('panel').down('grid').getSelection();
								if(oRecord) {
									Ext.Msg.confirm('Confirm', 'Do you really want to delete this record?', function(sValue) {
										if(sValue === 'yes') {
											var oEventRows = Ext.getStore('EventRows'),
												aEventRows = [];

											oEventRows.query('eventId', oRecord.getId()).each(function(oRecord) {
												aEventRows.push(oRecord);
											});
											oEventRows.remove(aEventRows);
											Ext.getStore('Events').remove(oRecord);
										}
									});
								}
							},
							text: 'Delete',
							iconCls: 'x-fa fa-trash'
						}
					]
				},
				{
					xtype: 'grid',
					store: 'Events',
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
							xtype: 'gridcolumn',
							summaryRenderer: function(val) {
								return Ext.util.Format.currency(val);
							},
							renderer: function(value) {
								return Ext.util.Format.currency(value);
							},
							summaryType: 'sum',
							dataIndex: 'total',
							text: 'Total',
							flex: 1
						}
					],
					listeners: {
						itemdoubletap: function(oView, iIndex, oTarget, oRecord) {
							Ext.Viewport.down('editwindow').setRecord(oRecord);
							Ext.Viewport.setActiveItem('editwindow');
						}
					},
					plugins: [
						'summaryrow'
					]
				}
			]
		},
		{
			xtype: 'cartesian',
			tab: {
				title: 'Timeline'
			},
			store: 'Events',
			axes: [
				{
					type: 'numeric',
					position: 'left',
					fields: ['total']
				},
				{
					type: 'time',
					position: 'bottom',
					fields: ['startDate'],
					dateFormat: 'Y-m-d H:i:s',
					label: {
						rotationRads: 1.571
					}
				}
			],
			series: [
				{
					type: 'area',
					xField: 'startDate',
					yField: ['total']
				},
				{
					type: 'scatter',
					tooltip: {
						trackMouse: true,
						renderer: function(oTooltip, oRecord) {
							oTooltip.setHtml(oRecord.get('merchant') + ' ' + Ext.util.Format.currency(oRecord.get('total')));
						}
					},
					xField: 'startDate',
					yField: ['total']
				}
			],
			interactions: [
				{
					type: 'panzoom'
				},
				{
					type: 'itemhighlight'
				}
			]
		},
		{
			xtype: 'polar',
			tab: {
				title: 'Items'
			},
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
					tooltip: {
						trackMouse: true,
						renderer: function(oTooltip, oRecord) {
							oTooltip.setTitle(oRecord.get('name'));
							oTooltip.setHtml(oRecord.getHint());
						}
					},
					xField: 'total'
				}
			],
			interactions: [
				{
					type: 'rotate'
				},
				{
					type: 'itemhighlight'
				}
			]/*,
			legend: {
				xtype: 'legend',
				docked: 'right'
			}*/
		},
		{
			xtype: 'polar',
			tab: {
				title: 'Merchants'
			},
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
					tooltip: {
						trackMouse: true,
						renderer: function(oTooltip, oRecord) {
							oTooltip.setTitle(oRecord.get('name'));
							oTooltip.setHtml(oRecord.getHint());
						}
					},
					xField: 'total'
				}
			],
			interactions: [
				{
					type: 'rotate'
				},
				{
					type: 'itemhighlight'
				}
			]/*,
			legend: {
				xtype: 'legend',
				docked: 'right'
			}*/
		},
		{
			xtype: 'polar',
			tab: {
				title: 'Tags'
			},
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
					tooltip: {
						trackMouse: true,
						renderer: function(oTooltip, oRecord) {
							oTooltip.setTitle(oRecord.get('name'));
							oTooltip.setHtml(oRecord.getHint());
						}
					},
					xField: 'total'
				}
			],
			interactions: [
				{
					type: 'rotate'
				},
				{
					type: 'itemhighlight'
				}
			]/*,
			legend: {
				xtype: 'legend',
				docked: 'right'
			}*/
		}
	]
});
