import React from 'react';
import { Link } from 'react-router-dom';

import ListGroup from 'react-bootstrap/ListGroup';

import './left-menu.css';

const LeftMenu = () => {
    return(
        <ListGroup defaultActiveKey="#link1" className="col-md-2">
            <ListGroup.Item as={Link} to="/projects/" eventKey="projects" >
                Проекты
            </ListGroup.Item>
            <ListGroup.Item as={Link} to="/employees" eventKey="employees" >
                Сотрудники
            </ListGroup.Item>
            <ListGroup.Item as={Link} to="/balance" eventKey="balance">
                Баланс студии
            </ListGroup.Item>
            <ListGroup.Item as={Link} to="/expenditure" eventKey="expenditure">
                Статьи расходов
            </ListGroup.Item>
            <ListGroup.Item as={Link} to="/requests" eventKey="requests" >
                Запросы ДС
            </ListGroup.Item>
            <ListGroup.Item as={Link} to="/reports" eventKey="reports" >
                Отчеты
            </ListGroup.Item>
        </ListGroup>
    );
};

export default LeftMenu;