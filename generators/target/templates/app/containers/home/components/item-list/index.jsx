import React, {Component} from 'react';
import Griddle from 'griddle-react';
import find from 'lodash/find';
import {DateColumn} from './components/date-column';
import {ListColumn} from './components/list-column';
import {HTMLColumn} from './components/html-column';
import {StatusColumn} from './components/status-column';
import {DeleteColumn} from './components/delete-column';

require('./style.scss');

const columnMetadata = [
    {
        columnName: 'history',
        locked: true,
        visible: false
    },
    {
        columnName: 'itemId',
        displayName: 'ID',
        locked: false,
        visible: true
    },
    {
        columnName: 'status',
        displayName: 'Status',
        customComponent: StatusColumn,
        locked: false,
        visible: true
    },
    {
        columnName: 'name',
        displayName: 'Title',
        locked: false,
        visible: false
    },
    {
        columnName: 'description',
        displayName: 'Description',
        customComponent: HTMLColumn,
        locked: false,
        visible: false
    },
    {
        columnName: 'products',
        displayName: 'Products',
        customComponent: ListColumn,
        locked: false,
        visible: true
    },
    {
        columnName: 'clients',
        displayName: 'Clients',
        customComponent: ListColumn,
        locked: false,
        visible: true
    },
    {
        columnName: 'lastModifiedDate',
        displayName: 'Last Updated',
        customComponent: DateColumn,
        locked: false,
        visible: true
    },
    {
        columnName: '_id',
        displayName: 'Delete',
        customComponent: DeleteColumn,
        cssClassName: 'delete-column',
        sortable: false,
        locked: true,
        visible: true
    }
];

export class ItemList extends Component {
    constructor(props) {
        /* istanbul ignore next */
        super(props);
    }

    componentWillMount() {
        //this.props.loadItems();
        find(columnMetadata, {displayName: 'Delete'}).onDelete = this.props.deleteItem;
    }

    render() {
        const {items, selectItem} = this.props;

        const rowMetadata = {
            bodyCssClassName: (rowData) => (
                (this.props.selectedItem && rowData._id === this.props.selectedItem._id) ? 'selected' : null
            )
        };

        return (
            <div className="item-list">
                {
                    this.props.items.length > 0 ? (
                        <Griddle
                            sortAscendingComponent={decodeURI('%E2%96%B2')}
                            sortDescendingComponent={decodeURI('%E2%96%BC')}
                            onRowClick={(row) => {
                                selectItem(row.props.data);
                            }}
                            columnMetadata={columnMetadata}
                            rowMetadata={rowMetadata}
                            results={items}
                            columns={['itemId', 'status', 'name', 'products', 'clients', 'lastModifiedDate', '_id']}
                            enableSort={true}
                            showSettings={false}
                            showFilter={true}
                            showPager={true}
                            resultsPerPage={25}/>
                    ) : null
                }
            </div>
        );
    }
}

ItemList.propTypes = {
    items: React.PropTypes.array.isRequired,
    deleteItem: React.PropTypes.func.isRequired,
    selectItem: React.PropTypes.func.isRequired
};
