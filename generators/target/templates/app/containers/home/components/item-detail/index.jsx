import React from 'react';
import Select from 'react-select';
import Quill from 'react-quill';
import partial from 'lodash/partial';
import moment from 'moment';
import FormHandler from '../../../../utils/form';
import {products, clients, statuses} from './../../../../config/demo-common';
import {getStatusById} from './../../../../config';
import ReactDom from 'react-dom';
import {cancelButtonClass, coloredButtonClass, inputClass} from '../../../../config/styles/mdl/';
import ActionTypes from '../../actions/action-types';

require('./style.scss');
require('quill/dist/quill.snow.css');
require('react-select/dist/react-select.css');
require('react-dom');

const selectConfig = {
    value: select => select.props.value,
    getElement: (select) => select.control,
    checkValidity: select => select.props.value.length !== 0
};
const formConfig = {
    description: {
        value: quill => quill.getEditor().getHTML(),
        checkValidity: quill => quill.getEditor().getText().trim() !== '',
        getElement: quill => ReactDom.findDOMNode(quill)
    },
    status: {
        ...selectConfig,
        value: select => select.props.value.value,
        checkValidity: () => true,

    },
    clients: {...selectConfig},
    products: {...selectConfig}
};

/* eslint-disable max-params */
const onSelectChange = (formHandler, oldValue, newValue) => {
    oldValue.length = 0;
    if (newValue) {
        Array.prototype.push.apply(oldValue, newValue.split(','));
    }
    formHandler.setValidity();

};
/* eslint-enable max-params */

//submitFn could be a regular submit, createAndSelect, or update
//secondaryItem is the old item for update and item to select for createAndSelect
const onSubmit = ({form, formHandler, submitFn, secondaryItem}) => {
    const isValid = formHandler.isFormValid();

    if (isValid) {
        form.classList.remove('invalid');
        submitFn(
            {...secondaryItem, ...formHandler.getFormData()},
            secondaryItem && secondaryItem._id ? ActionTypes.UPDATE_ITEM : ActionTypes.CREATE_ITEM
         );
    } else {
        form.classList.add('invalid');
        formHandler.setValidity();
    }
};

/* eslint-disable max-statements, complexity */
export const ItemDetail = ({item, cancel, submit, submitAndSelect}) => {

    // Implementation specific consts
    const isNewItem = !item._id;
    const productValues = item.products.slice(0);
    const clientValues = item.clients.slice(0);
    const itemStatus = Object.assign({}, getStatusById(item.status) || statuses[0]);
    const readOnly = item.readOnly;
    const formHandler = new FormHandler(formConfig);

    let form;

    return (
        <div className="item-detail item-card content">
            <div className="history-container" />
            <div className="details-container">
                <div className="tools-title">

                    {
                        isNewItem ? (
                            <h2 className="tools-title-text">Create New item:</h2>
                        )
                            : null

                    }
                    {
                        readOnly ? (
                            <div>
                                <h2 className="tools-title-text">{item.current.name}</h2>
                                <label className="fromTime">From {moment(item.lastModifiedDate).fromNow()}</label>
                            </div>
                        ) : null
                    }
                    {
                        !readOnly && !isNewItem ? (
                                    <h2 className="tools-title-text">Editing: {item.name}</h2>
                        ) : null
                    }
                </div>
                <div key={isNewItem ? '' : item._id + item.lastModifiedDate}>
                    <form ref={(ref) => {form = ref;}}
                          autoComplete="off"
                          noValidate>
                        <label>Title</label>
                        <input ref={formHandler.assign('name')}
                               required={true}
                               disabled={readOnly}
                               defaultValue={item.name}
                               placeholder="Enter a title"
                               className={inputClass} type="text"/>

                        <label>Description:</label>
                        <div className="resize-quill">
                            <Quill theme="snow"
                                   onChange={() => formHandler.setValidity()}
                                   required={true}
                                   readOnly={readOnly}
                                   ref={formHandler.assign('description')}
                                   defaultValue={item.description}/>
                        </div>
                        <label>Affected Products:</label>
                        <Select required={true}
                                disabled={readOnly}
                                ref={formHandler.assign('products')}
                                multi autoBlur clearable simpleValue
                                backspaceRemoves={false}
                                placeholder="Affected Product(s)"
                                value={productValues}
                                options={products}
                                onChange={partial(onSelectChange, formHandler, productValues)}/>

                        <label>Affected Clients:</label>
                        <Select required={true}
                                disabled={readOnly}
                                ref={formHandler.assign('clients')}
                                multi autoBlur clearable simpleValue
                                backspaceRemoves={false}
                                placeholder="Affected Client(s)"
                                value={clientValues}
                                options={clients}
                                onChange={partial(onSelectChange, formHandler, clientValues)}/>

                        <label>Status:</label>
                        <Select required={true}
                                disabled={readOnly}
                                ref={formHandler.assign('status')}
                                autoBlur
                                clearable={false}
                                placeholder="Status"
                                value={itemStatus}
                                options={statuses}
                                onChange={(newValue) => Object.assign(itemStatus, newValue)}/>
                    </form>
                </div>
                <div>
                    <button type="reset"
                            className={cancelButtonClass}
                            onClick={() => cancel()}>Cancel
                    </button>
                    {
                        !item._id ?
                            <button type="button"
                                    className={'save-create ' + coloredButtonClass}
                                    onClick={() => onSubmit(
                                        {
                                            form: form, formHandler: formHandler,
                                            submitFn: submitAndSelect, secondaryItem: {}
                                        }
                                    )}>Save &amp; Add Another
                            </button>
                            : null
                    }
                    <button type="submit"
                            className={coloredButtonClass}
                            onClick={() => onSubmit(
                                {form: form, formHandler: formHandler, submitFn: submit, secondaryItem: item}
                            )}>Save
                    </button>
                </div>
            </div>
        </div>);
};
/* eslint-enable max-statements */

ItemDetail.propTypes = {
    item: React.PropTypes.object,
    cancel: React.PropTypes.func.isRequired,
    submit: React.PropTypes.func.isRequired,
    selectItem: React.PropTypes.func.isRequired
};
