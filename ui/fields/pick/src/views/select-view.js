/*global jQuery, _, Backbone, Mn, wp */
import { PodsFieldListView, PodsFieldView } from '../../../core/pods-field-views';

/**
 *
 */
export const SelectItem = PodsFieldView.extend( {
	tagName: 'option',

	template: false,

	ui: {
		option: 'option'
	},

	triggers: {
		'change @ui.option': 'toggle:selected'
	},

	initialize: function () {

		this.$el.val( this.model.get( 'id' ) );

		this.$el.text( this.model.get( 'name') );

		if ( this.model.get( 'selected' ) ) {
			this.$el.prop( 'selected', 'selected' );
		}
	}
} );

/**
 *
 */
export const SelectView = PodsFieldListView.extend( {
	tagName: 'select',

	template: false,

	childView: SelectItem,

	attributes: function () {
		const fieldModel = this.options.fieldModel;
		const fieldAttributes = fieldModel.get( 'attributes' );
		const fieldOptions = fieldModel.get( 'options' );

		return {
			'name'           : fieldAttributes.name + '[]',
			'class'          : fieldAttributes.class,
			'data-name-clean': fieldAttributes[ 'name_clean' ],
			'id'             : fieldAttributes.id,
			'tabindex'       : '2',
			'multiple'       : fieldOptions[ 'pick_format_type' ]
		}
	},
} );
