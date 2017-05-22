
Ext.define('HomeAccounting.model.Event', {
	extend: 'Ext.data.Model',

	fields: [
		{
			type: 'string',
			name: 'id'
		},
		{
			type: 'string',
			name: 'calendarId'
		},
		{
			type: 'string',
			name: 'title'
		},
		{
			type: 'date',
			name: 'startDate',
			dateFormat: 'c'
		},
		{
			type: 'date',
			name: 'endDate',
			dateFormat: 'c'
		},
		{
			type: 'string',
			name: 'description',
			convert: function(v, rec) {
				if(rec.data.title.indexOf('[HomeAccounting]') === false) {
					return null;
				}

				var oData = Ext.JSON.decode(v, true);
				if(!Ext.isObject(oData)) {
					return null;
				}

				Ext.apply(rec.data, oData);

				//defer EventRows insertions to let the store generate ids
				Ext.Function.defer(function() {
					var oEventRows = Ext.getStore('EventRows');

					try {

						for(var i = 0; i < rec.data.rows.length; i++) {
							oEventRows.add(Ext.apply({
								eventId: rec.data.id
							}, rec.data.rows[i]));
						}
					}
					catch(e) {
						if(console && console.log) {
							console.log(e);
						}
					}
				}, 1);

				return v;
			}
		},
		{
			type: 'string',
			name: 'merchant',
			persist: false
		},
		{
			type: 'date',
			name: 'date',
			dateFormat: 'Y-m-d',
			persist: false
		},
		{
			type: 'date',
			name: 'time',
			dateFormat: 'H:i:s',
			persist: false
		},
		{
			type: 'float',
			name: 'total',
			persist: false
		},
		{
			name: 'rows',
			persist: false
		}
	]
});
