﻿import api, { FormValidation } from '../../../shared/index.js';
class SearchForm extends FormValidation {
    constructor(containerEl) {
        super(containerEl);
        ////////////////// get the form children elements ///////////////
        this.fromDay = api.getElementByCody(containerEl, 'FromDay');
        this.toDay = api.getElementByCody(containerEl, 'ToDay');

        ///////////////// dropdowns and datePickers construstors ////////////////////
        this.fromDay.calendarAdapter();
        this.toDay.calendarAdapter()
    }
    getValues() {
        return {
            fromDay: this.fromDay.calendarAdapter('getMilliSecDate'),
            toDay: this.toDay.calendarAdapter('getMilliSecDate')
        };
    }
    setValues(obj) {
        this.fromDay.calendarAdapter('setDate', obj.fromDay);
        this.toDay.calendarAdapter('setDate', obj.toDay);
        return this;
    }
    clearValues() {
        return this.setValues({ fromDay: '', toDay: '' });
    }
    getGridFilters() {
        const formData = this.getValues();
        const gridFilterData = [];
        if (formData.fromDay)
            gridFilterData.push({ field: 'day', op: api.gridFilterTypes.greater_or_equal, data: formData.fromDay });
        if (formData.toDay)
            gridFilterData.push({ field: 'day', op: api.gridFilterTypes.less_or_equal, data: formData.toDay });
        return gridFilterData;
    }
}
export default SearchForm;