import React,{ Component } from "react";
import { Switch, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, postFeedback, fetchDishes, fetchComments, fetchPromos, fetchLeaders, loginUser, logoutUser, fetchFavorites, postFavorite, deleteFavorite, FbLoginUser, postWarehouse, fetchWarehouses } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { withRouter} from './withRouter';

const mapStateToProps = state => {
    return {
        warehouse: state.warehouses
    }
    
}

const mapDispatchToProps = (dispatch) => ({
    postWarehouse: (warehouseId, warehouseName, city,state) => dispatch(postWarehouse(warehouseId,warehouseName,city,state)),
    fetchWarehouses: () => {dispatch(fetchWarehouses())},
})

class Main extends Component{
    componentDidMount() {
        this.props.fetchWarehouses();
    }

    render() {
        const HomePage = () => {
            return(
                <Home />
            )
        }
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));