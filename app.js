
Ext.application({
	models: [
		'Calendar',
		'Event',
		'EventRow',
		'Generic'
	],
	stores: [
		'Calendars',
		'EventRows',
		'Events',
		'GroupedItems',
		'GroupedMerchants',
		'GroupedTags',
		'Items',
		'Merchants',
		'Tags'
	],
	views: [
		'Combobox',
		'EditWindow',
		'SettingsMenu',
		'Tabs'
	],
	name: 'HomeAccounting',

	launch: function() {
		Ext.util.Format.currencySign = '€';
		Ext.util.Format.decimalSeparator = ',';
		Ext.util.Format.thousandSeparator = '.';

		gapi.load('auth', function() {
			gapi.auth.authorize({
				'client_id': '137779780771-bl0ae35ftcuvloajal02idrsgnost9i7.apps.googleusercontent.com',
				'scope': 'https://www.googleapis.com/auth/calendar'
			}, function() {
				var params = gapi.auth.getToken(),
					oCalendars = Ext.getStore('Calendars');

				oCalendars.getProxy().extraParams.access_token = params.access_token;
				Ext.getStore('Events').getProxy().extraParams.access_token = params.access_token;
				oCalendars.load();

				Ext.Viewport.add(Ext.create('HomeAccounting.view.Tabs'));
				Ext.Viewport.add(Ext.create('HomeAccounting.view.EditWindow'));

				Ext.Viewport.setMenu(Ext.create('HomeAccounting.view.SettingsMenu'), {
					side: 'right',
					reveal: true
				});
			});
		});
	}
});
