﻿export default class Api {
    constructor() {
    }
    gridFilterTypes = {
        equal: 'eq',
        not_equal: 'ne',
        less: 'lt',
        less_or_equal: 'le',
        greater: 'gt',
        greater_or_equal: 'ge',
        begins_with: 'bw',
        does_not_begin_with: 'bn',
        is_in: 'in',
        is_not_in: 'ni',
        ends_with: 'ew',
        does_not_end_with: 'en',
        contains: 'cn',
        does_not_contain: 'nc'
    };
    templates = {
        gridInlineBtns: {
            update: '<span class="ui-icon ui-icon-pencil gridInlineBtn"></span>',
            delete: '<span class="ui-icon ui-icon-trash gridInlineBtn"></span>'
        },
        gridTopToolbarBtns: {
            create: '<button class="ui-button ui-widget ui-corner-all gridTopToolbarBtn"><span class="ui-icon ui-icon-plus"></span>create</button>',
            print: '<button class="ui-button ui-widget ui-corner-all gridTopToolbarBtn"><span class="ui-icon ui-icon-print"></span>print</button>'
        }
    };
    getResources(url) {
        return $._getResources(url);
    }
    getElementByCody($containerEl, codeNameString) {
        return $containerEl._findByCode(codeNameString);
    }
    createGUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
