/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('HomeAccounting.Application', {
	extend: 'Ext.app.Application',

	name: 'HomeAccounting',

	quickTips: false,
	platformConfig: {
		desktop: {
			quickTips: true
		}
	},

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

	launch: function () {
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

// 				Ext.Viewport.add(Ext.create('HomeAccounting.view.Tabs'));
// 				Ext.Viewport.add(Ext.create('HomeAccounting.view.EditWindow'));

// 				Ext.Viewport.setMenu(Ext.create('HomeAccounting.view.SettingsMenu'), {
// 					side: 'right',
// 					reveal: true
// 				});
			});
		});
	},

	onAppUpdate: function () {
		Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
			function (choice) {
				if (choice === 'yes') {
					window.location.reload();
				}
			}
		);
	}
});
