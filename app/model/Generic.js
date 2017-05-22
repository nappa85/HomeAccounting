
Ext.define('HomeAccounting.model.Generic', {
	extend: 'Ext.data.Model',

	fields: [
		{
			type: 'string',
			name: 'name'
		},
		{
			type: 'float',
			name: 'total'
		},
		{
			type: 'float',
			name: 'count'
		},
		{
			type: 'float',
			name: 'min'
		},
		{
			type: 'float',
			name: 'max'
		}
	],

	getHint: function() {
		return 'Total: ' + Ext.util.Format.currency(this.get('total')) +
			'<br />Count: ' + Ext.util.Format.number(this.get('count'), '0.###') +
			'<br />Min: ' + Ext.util.Format.currency(this.get('min')) +
			'<br />Max: ' + Ext.util.Format.currency(this.get('max'));
	}

});
