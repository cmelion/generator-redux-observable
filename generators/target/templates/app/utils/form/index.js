export default class FormHandler {

    constructor(config = {}) {
        let fields = {},
            radioCheckboxRe = /(radio|checkbox)/i;

        this.assign = (name) => {
            return (control) => {
                fields[name] = control;
            };
        };

        this.value = (name) => {
            let value = '';
            const control = fields[name];

            if (!control) {
                throw new Error('You must provide the name of a field that has been defined within the form.');
            }
            if (config[name]) {
                value = config[name].value(control);
            } else {
                value = radioCheckboxRe.test(control.getAttribute('type')) ? control.checked : control.value;
            }

            return value === '' ? undefined : value;
        };

        this.getFormData = () => (
            Object.keys(fields).reduce((data, name) => {
                data[name] = this.value(name);
                return data;
            }, {})
        );

        this.isFieldValid = (name) => {
            const control = fields[name];
            return config[name] ? config[name].checkValidity(control) : control.checkValidity();
        };

        this.isFormValid = () => (
            !Object.keys(fields)
                .map(name => this.isFieldValid(name))
                .includes(false)
        );

        this.setValidity = () => (
            !Object.keys(fields)
                .filter(name => fields[name].isReactComponent)
                .map(name => {
                    const isValid = this.isFieldValid(name);
                    let target = fields[name];

                    if (config[name]) {
                        target = config[name].getElement(target);
                    }

                    return target.classList.toggle('invalid-control', !isValid);
                })
                .includes(true)
        );

    }

}
