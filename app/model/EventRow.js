
Ext.define('HomeAccounting.model.EventRow', {
	extend: 'Ext.data.Model',

	fields: [
		{
			type: 'string',
			name: 'eventId'
		},
		{
			type: 'string',
			name: 'item'
		},
		{
			type: 'float',
			name: 'number'
		},
		{
			type: 'float',
			name: 'price'
		},
		{
			type: 'string',
			name: 'tag'
		},
		{
			type: 'float',
			name: 'total',
			convert: function(fValue, oRecord) {
				return oRecord.get('price') * oRecord.get('number');
			},
			depends: [
				'price',
				'number'
            ]
		}
	]
});
