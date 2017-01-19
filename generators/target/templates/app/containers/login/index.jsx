import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import cx from 'classnames';

import * as LoginActions from './actions';
import * as RootActions from '../../actions';

import {
    cancelButtonClass, coloredButtonClass,
    errorClass, fieldSetClass,
    inputClass, labelClass,
    supportingTextClass, toolsActionsClass
} from '../../config/styles/mdl/';

// Import local styles
require('./style.scss');

const devUserObj = {
    firstName: 'Test',
    lastName: 'Testerson',
    tokenSeed: 'JUaHJlZSBFeWVkI'
};

export const getFormData = (inputs) => {
    let cb = (data, input) => {
        const name = input.id;
        const value = input.value;
        data[name] = value === '' ? undefined : value;
        return data;
    };
    return inputs.reduce(cb, {});
};

/* eslint-disable no-shadow, max-len*/
export class Login extends React.Component {
    /* istanbul ignore next */
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    isValid(form) {
        return form.querySelectorAll('*:invalid').length === 0;
    }

    /* eslint-disable max-params */
    onSubmit(form, inputs, selections = []) {
        form.classList.remove('invalid');
        if (!this.isValid(form)) {
            form.classList.add('invalid');
        } else {
            if (selections.length > 0) {
                this.props.loginAndRegister(getFormData(inputs), ...devUserObj, selections);
            } else {
                this.props.login(getFormData(inputs), ...devUserObj);
            }
        }
    }

    /* eslint-enable max-params */
    render() {
        const {error, items} = this.props,
            inputs = [],
            addInput = (input) => {
                inputs.push(input);
                if (input && !!input.getAttribute('data-focused')) {
                    input.focus();
                }
            },
            LOGGING_IN = error && error.message === 'Logging in ...',
            selections = items.filter(item => item.selected);

        let form;
        let loginLabel = (selections.length > 0) ? 'Login and Register' : 'Login';

        const handleKeyPress = (e) => {
            if (e.keyCode === 13) {
                this.onSubmit(form, inputs, selections);
            }
        };

        /* eslint-disable quotes */
        return (
            <div className="login-container">
                <div className="login-component">
                    <div className="tools-title">
                        <h2>Login</h2>
                    </div>
                    <div className={supportingTextClass}>
                        <form ref={(ref) => {
                            form = ref;
                        }}
                              className={supportingTextClass}
                              noValidate>
                            <div className={fieldSetClass}>
                                <input ref={addInput}
                                       className={inputClass}
                                       required={true}
                                       data-focused={true}
                                       type="email"
                                       tabIndex={1}
                                       id="email"/>
                                <label className={labelClass} htmlFor="email">Email</label>
                                <span className={errorClass}>Valid email address is required</span>
                            </div>
                            <div className={fieldSetClass}>
                                <input ref={addInput}
                                       className={inputClass}
                                       type="password"
                                       tabIndex={2}
                                       required={true}
                                       id="password"
                                       onKeyDown={handleKeyPress}/>
                                <label className={labelClass} htmlFor="password">Password</label>
                                <span className={errorClass}>Password is required</span>
                            </div>
                        </form>
                    </div>
                    <div className={toolsActionsClass}>
                        <button onClick={() => this.onSubmit(form, inputs, selections)}
                                className={coloredButtonClass}
                                tabIndex={3}
                                type="submit">{loginLabel}</button>
                        &nbsp;
                        <Link to="/home"
                              className={cancelButtonClass}
                              tabIndex={4}>Cancel</Link>
                        {
                            (error) ?
                                <p className={ cx({
                                    'color-text--red': !LOGGING_IN,
                                    blink: LOGGING_IN
                                }) }>{error.message} <Link to="/home">(Return Home)</Link></p> : null
                        }
                    </div>
                </div>
            </div>
        );
        /* eslint-enable quotes */
    }
}

Login.propTypes = {
    login: React.PropTypes.func,
    loginAndRegister: React.PropTypes.func,
    error: React.PropTypes.object,
    items: React.PropTypes.array.isRequired
};

export default connect(
    // Map State to Props (Reducers)
    /* istanbul ignore next */
    (state) => state,
    //Map DispatchToProps (Actions)
    {...LoginActions, ...RootActions}
)(Login);
