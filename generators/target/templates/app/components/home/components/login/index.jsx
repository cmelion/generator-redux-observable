import React from 'react';
/* istanbul ignore next  */
if (__WEBPACK__) {
    require('!style!css!sass!./style.scss');
}

/* eslint-disable no-shadow, max-len*/
export const Login = ({submit, error}) => {
    const inputs = [];

    const devUserObj = {
        firstName: 'Test',
        lastName: 'Testerson',
        tokenSeed: 'JUaHJlZSBFeWVkI'
    };

    return (
        <div className="login-component mdl-card mdl-shadow--6dp">
            <div className="mdl-card__title mdl-color--black mdl-color-text--white">
                <h2 className="mdl-card__title-text">Login</h2>
            </div>
            <div className="mdl-card__supporting-text">
                <form action="#">
                    <div className="mdl-textfield
                                    mdl-js-textfield
                                    mdl-textfield--floating-label">
                        <input ref={(input)=>inputs.push(input)}
                               className="mdl-textfield__input"
                               type="text" id="username"/>
                        <label className="mdl-textfield__label" htmlFor="username">Username</label>
                    </div>
                    <div className="mdl-textfield
                                    mdl-js-textfield
                                    mdl-textfield--floating-label">
                        <input ref={(input)=>inputs.push(input)}
                               className="mdl-textfield__input"
                               type="password"
                               id="userpass"/>
                        <label className="mdl-textfield__label" htmlFor="userpass">Password</label>
                    </div>
                </form>
            </div>
            <div className="mdl-card__actions mdl-card--border">
                <button onClick={()=>submit({
                            userName : inputs[0].value,
                            password: inputs[1].value,
                            firstName: devUserObj.firstName,
                            lastName: devUserObj.lastName,
                            token: devUserObj.tokenSeed,
                            })
                        }
                        type="submit"
                        className="mdl-button
                                   mdl-button--colored
                                   mdl-js-button
                                   mdl-js-ripple-effect">Log in
                </button>
                {
                    (error) ?
                    <p className="mdl-color-text--red">{error.message}</p> : null
                }
            </div>
        </div>
    );
};

Login.propTypes = {
    submit: React.PropTypes.func.isRequired,
    error: React.PropTypes.object
};