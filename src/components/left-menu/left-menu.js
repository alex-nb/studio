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

/*
* <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>
          <ul class="dropdown-menu">
            <li><a href="#">Действие</a></li>
            <li><a href="#">Другое действие</a></li>
            <li><a href="#">Что-то еще</a></li>
            <li class="divider"></li>
            <li><a href="#">Отдельная ссылка</a></li>
            <li class="divider"></li>
            <li><a href="#">Еще одна отдельная ссылка</a></li>
          </ul>
        </li>
*
* */

/*
* <NavDropdown active title={<i className="far fa-user fa-2x fa-menu"/>} id="collasible-nav-dropdown" alignRight>
                                <NavDropdown.Item href="#profil">Профиль</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => this.setState({ modalAskMoney: true })}>Запрос ДС</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#out">Выход</NavDropdown.Item>
                            </NavDropdown>
*
*
*
* */

export default LeftMenu;