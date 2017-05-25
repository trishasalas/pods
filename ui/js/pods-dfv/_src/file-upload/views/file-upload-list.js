/*global jQuery, _, Backbone, Marionette, wp */

// Globally disable implicit event listeners in favor of explicit childViewTriggers and childViewEvents
Marionette.setEnabled( 'childViewEventPrefix', false );

import template from 'pods-dfv/_src/file-upload/views/file-upload-item.html';

import {PodsFieldListView, PodsFieldView} from 'pods-dfv/_src/core/pods-field-views';

/**
 * Individual list items, representing a single file
 */
export const FileUploadItem = PodsFieldView.extend( {
	tagName: 'li',

	template: _.template( template ),

	className: 'pods-dfv-list-item',

	ui: {
		dragHandle  : '.pods-dfv-list-handle',
		editLink    : '.pods-dfv-list-edit-link',
		viewLink    : '.pods-dfv-list-link',
		downloadLink: '.pods-dfv-list-download',
		removeButton: '.pods-dfv-list-remove',
		itemName    : '.pods-dfv-list-name'
	},

	triggers: {
		'click @ui.removeButton': 'remove:file:click'
	}
} );

/**
 * The file list container
 */
export const FileUploadList = PodsFieldListView.extend( {
	tagName: 'ul',

	className: 'pods-dfv-list',

	childView: FileUploadItem,

	childViewTriggers: {
		'remove:file:click': 'childview:remove:file:click'
	},

	onAttach: function () {
		const fieldConfig = this.options.fieldModel.get( 'fieldConfig' );

		// @todo
		// http://stackoverflow.com/questions/1735372/jquery-sortable-list-scroll-bar-jumps-up-when-sorting/4187833#4187833

		if ( 1 != fieldConfig[ 'file_limit' ] ) {
			var sort_axis = 'y';

			if ( 'tiles' == fieldConfig[ 'file_field_template' ] ) {
				sort_axis = '';
			}

			// init sortable
			this.$el.sortable( {
				containment      : 'parent',
				axis             : sort_axis,
				scrollSensitivity: 40,
				tolerance        : 'pointer',
				opacity          : 0.6
			} );
		}
	}
} );

