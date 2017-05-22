
Ext.define('HomeAccounting.view.Combobox', {
	extend: Ext.field.Select,
	alias: 'widget.combobox',
	config: {
		autoSelect: false,
		component: {
			readOnly: false,
			useMask: false
		}
	},
	initialize: function() {
		var me = this,
			component = me.getComponent();

		me.callParent();

		if(!me.getSelection()) {
			component.setValue(me.config.value);
		}
		component.on({
			scope: me,
			keyup: 'onKeyUp',
			blur: 'onBlur'
		});
	},
	onFocus: function(e) {
		if (this.getDisabled()) {
			return false;
		}

		var component = this.getComponent();
		this.fireEvent('focus', this, e);

		if (Ext.os.is.Android4) {
			component.inputElement.dom.focus();
		}
		this.isFocused = true;
		
		this.showPicker();
	},
	getTabletPicker: function() {
		var tabletPicker = this.callParent();
		tabletPicker.setModal(false);
		return tabletPicker;
	},
	getPhonePicker: function() {
		var phonePicker = this.callParent();
		phonePicker.setModal(false);
		return phonePicker;
	},
	onKeyUp: function(e) {
		this.clearSelection();

		this.getStore().filter({
			property: this.getDisplayField(),
			value: this.getComponent().getValue(),
			anyMatch: true
		});
	},
	onBlur: function() {
		if(this.tabletPicker) {
			this.onListTap();
		}
	},
	getValue: function() {
		var selection = this.getSelection();
		return selection ? selection.get(this.getValueField()) : this.getComponent().getValue();
	},
	applyValue: function(sValue) {
		var oRecord = this.callParent(arguments);
		if(!oRecord) {
			return sValue;
		}

		return oRecord;
	},
	updateValue: function(value, oldValue) {
		var me = this,
			component = me.getComponent(),
			displayValue = (value && !value.isModel)?value:'';

		if (value === null || (value && value.isModel)) {
			me.settingSelection = true;
			me.setSelection(value);
			me.settingSelection = false;
			if (value) {
				displayValue = value.get(me.getDisplayField());
			}
		}
		else {
			me.clearSelection();
		}

		if (component) {
			component.setValue(displayValue);
		}

		if (me.initialized) {
			me.fireEvent('change', me, value, oldValue);
		}
	},
	clearSelection: function() {
		this.settingSelection = true;
		this.setSelection(null);
		this.settingSelection = false;
		if(this.phonePicker) {
			this.phonePicker.setValue(null);
		}
		if(this.tabletPicker) {
			this.tabletPicker.down('list').setSelection(null);
		}
	}
});
