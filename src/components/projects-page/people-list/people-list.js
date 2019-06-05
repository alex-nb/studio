import React from 'react';

import './people-list.css';

const PeopleList = ({name}) => {
    //const {id, name, deptID, deptName} = this.props;
    return (
        <i className="far fa-user fa-card" title={name} />
    );
};
export default PeopleList;