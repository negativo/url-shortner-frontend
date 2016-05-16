import React, {Component} from 'react';
import ShortStore from './../stores/ShortStore';
import ShortActions from './../actions/ShortActions';
import connectToStores from 'alt/utils/connectToStores';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ShortListElement from './ShortListElement';

require('../styles/History.less');

class ShortHistory extends Component {

    static getStores() {
        return [ShortStore];
    }

    static getPropsFromStores() {
        return ShortStore.getState();
    }


    onClickClearHistory() {
        ShortActions.resetLinks();
    }

    render() {

        let links = this.props.links ? this.props.links : [];

        return (<div className="ShortHistory">
            Previously shortened by you <span onClick={this.onClickClearHistory.bind(this)}
                                              className="ClearHistory red">Clear History</span>
            {links.length>0?
            <table className="ShortLinks">
                <thead>
                    <tr>
                        <td className="linkColumn">LINK</td>
                        <td>VISITS</td>
                        <td>LAST VISITED</td>
                    </tr>
                </thead>
                <ReactCSSTransitionGroup transitionName="fade" component="tbody" transitionEnterTimeout={800} transitionLeaveTimeout={800}>
                {links.map((link, index) => {
                    return <ShortListElement key={index} link={link} />
                })}
                </ReactCSSTransitionGroup>
            </table>:''}
        </div>);
    }
}

export default connectToStores(ShortHistory);
