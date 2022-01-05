﻿(function ($) {
    var gridPagerCounter = 0;
    $.extend($.jgrid.nav, {
        edit: false,
        add: false,
        del: false,
        search: false,
        refreshstate: 'current',
        refresh: true
    });
    function _createInlineBtns(options, $el) {
        var str = '', btns = options.customSetting.inlineBtns.btns;
        $.each(btns, function (i) { str += i; });
        if (!str)
            return false;
        options.colNames.unshift(" ");
        options.colModel.unshift({
            name: " ",
            index: 'act',
            search: false,
            frozen: true,
            sortable: false,
            width: options.customSetting.inlineBtns.width || 300,
            formatter: function (a, b) {
                return '<div class="jqGridInlineBtn" rowId="' + b.rowId + '">' + str + '</div>';
            }
        });
        options.shrinkToFit = false;
        options.forceFit = false;
        $el.click(function (e) {
            var el = $(e.target), pEl = el.parent();
            pEl.hasClass('jqGridInlineBtn') && btns[el[0].outerHTML]({ e: e, $gridEl: $el, rowData: $el.jqGrid('getRowData', pEl.attr('rowId')) });
        });
        return true;
    }
    var _jqGridAdapter = function () {
        var arg = arguments, argL = arg.length;
        switch (argL) {
            case 0:
                return this;
            case 1:
                if (Object.prototype.toString.call(arg[0]).toUpperCase() === '[OBJECT OBJECT]') {
                    var options = arg[0], $el = this, containsInlineBtns, containsTopToolbarBtns;
                    options.rowNum = options.rowNum || 50;
                    options.rowList = options.rowList || [50, 100, 200];
                    if (options.pager) {
                        if (typeof options.pager !== 'string') {  // it must be a jquery element
                            if (!options.pager.attr('id')) {
                                gridPagerCounter++;
                                options.pager.attr('id', 'grid_pager_' + gridPagerCounter);
                            }
                            options.pager = '#' + options.pager.attr('id');
                        }
                    } else {
                        options.scroll = 1;
                    }
                    (options.width || options.autowidth) || (options.autowidth = true);
                    options.customSetting && (function () {
                        var _setting = options.customSetting;
                        _setting.inlineBtns && (containsInlineBtns = _createInlineBtns(options, $el));
                        if (_setting.topToolbarBtns) {
                            options.toolbar = [true, "top"];
                            containsTopToolbarBtns = true;
                        }
                    })();
                    $.each(options.colModel, function (i, value) {
                        if (value.name.trim() && ((value.search === undefined) || (value.search)))
                            value.hidden || (
                                value.searchoptions = {
                                    sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge', 'bw', 'bn', 'in', 'ni', 'ew', 'en', 'cn', 'nc']
                                }
                            );
                    });
                    $el.jqGrid($.extend({
                        mtype: "POST",
                        datatype: "json",
                        sortorder: "asc"
                    }, options, {
                        gridview: true,
                        viewrecords: true,
                        sortable: true,
                        rownumbers: true
                    })).jqGrid('filterToolbar', {
                        searchOperators: true,
                        autoSearch: true
                    });
                    containsInlineBtns && $el.jqGrid('setFrozenColumns');
                    containsTopToolbarBtns && (function () {
                        var id = 't_' + $el.attr('id'), _set = options.customSetting, _btns = _set.topToolbarBtns, _temp = '', findEl = function ($el) {
                            if ($el.attr('id') === id)
                                return [{ outerHTML: '' }];
                            var _el, p = $el;
                            while (!_el)
                                (function () {
                                    var parent = p.parent(), parentId = parent.attr('id');
                                    if (parentId === id)
                                        _el = p;
                                    else
                                        p = parent;
                                })();
                            return _el;
                        };
                        $.each(_btns, function (i) { _temp += i });
                        $("#" + id).append(_temp).click(function (e) {
                            var el = findEl($(e.target)), _temp = el[0].outerHTML;
                            _btns[_temp] && _btns[_temp]({ e: e, $gridEl: $el });
                        });
                    })();
                    options.pager && $el.jqGrid("navGrid", options.pager);
                    return $el;
                } else {
                    return this.jqGrid(arg[0]);
                }
            case 2:
                if (arg[0].toUpperCase() === 'APPLYEXTERNALSEARCH') {
                    (function (param, $gridEl) {
                        var filters, p = $gridEl[0].p, oldFilters = p.postData.filters;
                        p.search = true;
                        filters = oldFilters ? JSON.parse(oldFilters) : { groupOp: 'AND', rules: [] };
                        filters.rules = filters.rules.concat(param);
                        $.extend(p.postData, { filters: JSON.stringify(filters) });
                        $gridEl.trigger("reloadGrid", [{ page: 1 }]);
                        p.postData.filters = oldFilters;
                    })(arg[1], this);
                    return this;
                } else {
                    return this.jqGrid(arg[0], arg[1]);
                }
            default:
                return this.jqGrid.apply(this, arg);
        }
    };
    $._createPlugin('gridAdapter', _jqGridAdapter);
})(jQuery);
