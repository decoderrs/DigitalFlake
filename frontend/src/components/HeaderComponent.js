import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen : !this.state.isNavOpen
        })
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }
    handleLogin(event){
        this.toggleModal();
        this.props.loginUser({username: this.username.value, password : this.password.value});
    }
render() {
    return (
        <React.Fragment>
            <Navbar dark expand = "md">
                <div className='container'>
                    <NavbarToggler onClick={this.toggleNav} />
                    <NavbarBrand className='mr-auto' href='/'>
                        <img src='/assets/logo-digitalflake.png' height="30" width="41"
                        alt= "digital-Flake"/>
                    </NavbarBrand>
            <Collapse isOpen={this.state.isNavOpen} navbar>
                <Nav navbar>
                    <NavItem>
                        <NavLink className='nav-link' to='/home'>
                            <span className='fa fa-home fa-lg'></span> Home
                        </NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
            
            <Nav className="ml-auto" navbar>
                            <NavItem>
                                {!this.props.auth.isAuthenticated ?
                                    <Button outline onClick={this.toggleModal}>
                                        <span className="fa fa-sign-in fa-lg"></span> Login
                                        {this.props.auth.isFetching ?
                                            <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                            : null
                                        }
                                    </Button>
                                    :
                                    <div>
                                        <div className="navbar-text mr-3">{this.props.auth.user.username}</div>
                                        <Button outline onClick={this.handleLogout}>
                                            <span className="fa fa-sign-out fa-lg"></span> Logout
                                            {this.props.auth.isFetching ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </Button>
                                    </div>
                                }

                            </NavItem>
                        </Nav>
                </div>
            </Navbar>
        </React.Fragment>
    )
}

}