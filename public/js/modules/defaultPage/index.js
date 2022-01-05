import api from '../shared/index.js';
export default function ({ panelElement: pEl, tabObjs, containerID }) {
    api.getResources(['js/modules/defaultPage/index.html']).then(([temp]) => {
        const pageName=containerID.replace('tab_','').replace('_','');
        pEl.append(temp.replace('@title',`${pageName}'s panel`));
    });
};