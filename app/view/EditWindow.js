
Ext.define('HomeAccounting.view.EditWindow', {
	extend: 'Ext.form.Panel',
	alias: 'widget.editwindow',

	layout: 'vbox',
	bodyPadding: 10,
	title: 'Add Event',

	items: [
		{
			xtype: 'toolbar',
			docked: 'bottom',
			ui: 'footer',
			items: [{
				text: 'Cancel',
				iconCls: 'x-fa fa-chevron-left',
				handler: function() {
					Ext.Viewport.setActiveItem('tabs');
				}
			}, {
				xtype: 'container',
				flex: 1
			}, {
				text: 'Save as New',
				iconCls: 'x-fa fa-copy',
				itemId: 'saveAsNew',
				hidden: true,
				handler: function() {
					var oForm = this.up('formpanel'),
						oValues = oForm.getValues();

					delete oValues.id;
					oForm.save(oValues);
				}
			}, {
				text: 'Save',
				iconCls: 'x-fa fa-save',
				handler: function() {
					var oForm = this.up('formpanel');

					oForm.save(oForm.getValues());
				}
			}]
		},
		{
			xtype: 'combobox',
			label: 'Merchant',
			name: 'merchant',
			displayField: 'name',
			store: 'Merchants',
			valueField: 'name'
		},
		{
			xtype: 'datepickerfield',
			label: 'Date',
			name: 'date',
			dateFormat: 'Y-m-d'
		},
		{
			xtype: 'combobox',
			label: 'Time',
			name: 'time',
			autoSelect: false,
			options: (function() {
				var options = [],
					h, m, t;

				for(h = 0; h < 24; h++) {
					for(m = 0; m < 60; m += 15) {
						t = (h < 10?'0' + h:h) + ':' + (m < 10?'0' + m:m) + ':00';
						options.push({
							text: t,
							value: t
						});
					}
				}

				return options;
			})()
		},
		{
			xtype: 'grid',
			flex: 1,
			title: 'Rows',
			columnMenu: false,
			columnResize: false,
			store: {
				model: 'HomeAccounting.model.EventRow',
				data: [],
				proxy: {
					type: 'memory',
					reader: 'json'
				},
				listeners: {
					datachanged: 'checkForEmptyRow',
					update: 'checkForEmptyRow'
				},
				checkForEmptyRow: function(oStore) {
					var bAddEmpty = true;

					oStore.getData().each(function(oEvent) {
						if((oEvent.get('item') === '') && (oEvent.get('tag') === '') && (oEvent.get('number') === 0) && (oEvent.get('price') === 0)) {
							bAddEmpty = false;
						}
					});

					if(bAddEmpty) {
						oStore.add({});
					}
				}
			},
			columns: [
				{
					xtype: 'column',
					text: 'Item',
					dataIndex: 'item',
					flex: 2,
					sortable: false,
					menu: false,
					cell: {
						xtype: 'widgetcell',
						widget: {
							xtype: 'combobox',
							name: 'item',
							displayField: 'name',
							store: 'Items',
							valueField: 'name',
							listeners: {
								change: function(oField, sValue) {
									var oGridRow = oField.up('gridrow'),
										oRecord = oGridRow.getRecord(),
										sTag = oRecord.get('tag'),
										sValue = (sValue && sValue.isModel)?sValue.get(oField.getValueField()):sValue;

									oRecord.set('item', sValue);

									//autoselect tag's value if it's unique
									if(Ext.isEmpty(sTag)) {
										var aTags = [];
										Ext.getStore('EventRows').query('item', sValue).each(function(oEventRow) {
											Ext.Array.include(aTags, oEventRow.get('tag'));
										});

										if(aTags.length == 1) {
											oGridRow.down('combobox[name=tag]').setValue(aTags[0]);
										}
									}
								}
							}
						}
					}
				}, {
					xtype: 'column',
					text: 'Tag',
					dataIndex: 'tag',
					flex: 2,
					sortable: false,
					menu: false,
					cell: {
						xtype: 'widgetcell',
						widget: {
							xtype: 'combobox',
							name: 'tag',
							displayField: 'name',
							store: 'Tags',
							valueField: 'name',
							listeners: {
								change: function(oField, sValue) {
									oField.up('gridrow').getRecord().set(oField.getName(), (sValue && sValue.isModel)?sValue.get(oField.getValueField()):sValue);
								}
							}
						}
					}
				}, {
					xtype: 'column',
					text: 'Number',
					dataIndex: 'number',
					flex: 1,
					sortable: false,
					menu: false,
					cell: {
						xtype: 'widgetcell',
						widget: {
							xtype: 'numberfield',
							name: 'number',
							stepValue: 0.01,
							listeners: {
								change: function(oField, sValue) {
									oField.up('gridrow').getRecord().set(oField.getName(), sValue);
								}
							}
						}
					}
				}, {
					xtype: 'column',
					text: 'Price',
					dataIndex: 'price',
					flex: 1,
					sortable: false,
					menu: false,
					cell: {
						xtype: 'widgetcell',
						widget: {
							xtype: 'numberfield',
							name: 'price',
							stepValue: 0.01,
							listeners: {
								change: function(oField, sValue) {
									oField.up('gridrow').getRecord().set(oField.getName(), sValue);
								}
							}
						}
					}
				}, {
					xtype: 'column',
					sortable: false,
					menu: false,
					cell: {
						xtype: 'widgetcell',
						widget: {
							xtype: 'button',
							iconCls: 'x-fa fa-trash',
							handler: function(oButton) {
								Ext.Msg.confirm('Confirm', 'Do you really want to delete this record?', function(sValue) {
									if(sValue === 'yes') {
										oButton.up('grid').getStore().remove(oButton.up('gridrow').getRecord());
									}
								});
							}
						}
					}
				}
			]
		}
	],

	setValues: function(values) {
		var oStore = this.down('grid').getStore();

		this.callParent(arguments);

		oStore.removeAll();
		oStore.add(Ext.Array.merge(values.rows || [], [{}]));

		if(!values.id) {
			this.setTitle('Add Event');
			this.down('#saveAsNew').setHidden(true);
		}
		else {
			this.setTitle('Edit Event');
			this.down('#saveAsNew').setHidden(false);
		}

		return this;
	},

	getValues: function() {
		var oStore = this.down('grid').getStore(),
			oValues = this.callParent(arguments);

		oValues.date = Ext.Date.format(oValues.date, 'Y-m-d');
		oValues.total = 0;
		oValues.rows = [];
		oStore.getData().each(function(oEvent) {
			if(!((oEvent.get('item') === '') && (oEvent.get('tag') === '') && (oEvent.get('number') === 0) && (oEvent.get('price') === 0))) {
				oValues.rows.push({
					item: oEvent.get('item'),
					tag: oEvent.get('tag'),
					number: oEvent.get('number'),
					price: oEvent.get('price')
				});

				oValues.total += oEvent.get('number') * oEvent.get('price');
			}
		});

		oValues.calendarId = Ext.ComponentQuery.query('#calendarId')[0].getValue();
		oValues.title = '[HomeAccounting] ' + oValues.merchant + ' ' + Ext.util.Format.currency(oValues.total);
		oValues.startDate = oValues.date + 'T' + oValues.time;
		oValues.endDate = oValues.date + 'T' + oValues.time;
		oValues.description = Ext.encode({
			merchant: oValues.merchant,
			date: oValues.date,
			time: oValues.time,
			rows: oValues.rows,
			total: oValues.total
		});

		return oValues;
	},

	save: function(oValues) {
		var oStore = Ext.getStore('Events'),
		   sId = oValues.id;

		if(sId) {
			delete oValues.id;
			oStore.getById(sId).set(oValues);
		}
		else {
			oStore.add(oValues);
		}

		Ext.Viewport.setActiveItem('tabs');
	}
});
