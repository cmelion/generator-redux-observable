const
    cancelButtonClass = 'go-back mdl-button mdl-js-button mdl-js-ripple-effect',
    coloredButtonClass = 'mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect',
    createButtonClass = 'create-button mdl-button mdl-button--colored ' +
        'mdl-button--raised mdl-js-button mdl-js-ripple-effect',
    errorClass = 'mdl-textfield__error',
    fieldSetClass = 'mdl-textfield mdl-js-textfield mdl-textfield--floating-label extrawide',
    inputClass = 'mdl-textfield__input',
    labelClass = 'mdl-textfield__label',
    supportingTextClass = 'mdl-card__supporting-text',
    toolsActionsClass = 'mdl-card__actions mdl-card--border';

/*global componentHandler*/
const upgradeDomEpic = action$ =>
    action$.ofType('@@router/LOCATION_CHANGE', 'UPGRADE_DOM')
        .map(() =>
            ({type: 'DOM_UPGRADED'})
        )
        .delay(0)
        .do(() => {
            if (componentHandler && componentHandler.upgradeDom) {
                componentHandler.upgradeDom();
            }
        });

export {
    cancelButtonClass, coloredButtonClass,
    createButtonClass, errorClass, fieldSetClass,
    inputClass, labelClass,
    supportingTextClass, toolsActionsClass,
    upgradeDomEpic
};
