import api from '../shared/index.js';
export default function (panelElement) {
    return api.getResources(['js/modules/setting/index.html']).then(function([temp]){
        panelElement.empty().append(temp);
        const $selectEl = api.getElementByCody(panelElement, 'themes');
        $selectEl.change((e)=>{
            const value=e.target.value;
            const linkEl=$('#multi-theme');
            const href=linkEl.attr('href');
            const hrefArr=href.split('/');
            const perviousTheme=hrefArr[hrefArr.length-2];
            linkEl.attr('href',href.replace(perviousTheme,value));
        });
    });
}