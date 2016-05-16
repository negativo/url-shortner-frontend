import React, { Component } from 'react';
import {RouteHandler, render} from 'react-router';

import Topbar from './Topbar';
import Shortner  from './Shortner';
import ShortHistory from './ShortHistory';


import ShortStore from './../stores/ShortStore';
import ShortActions from './../actions/ShortActions';
import connectToStores from 'alt/utils/connectToStores';

require('./../styles/App.less');

class Short extends Component {

	static getStores(){
		return [ShortStore];
	}

	static getPropsFromStores(){
		return ShortStore.getState();
	}

	constructor(props){
		super(props);
        
        this.state = {
            title: "Shooooort",
            subtitle: "The link shortner with a long name"
        };
	}

    componentWillMount(){

        ShortActions.loadLinks();

    }

	render() {

        var links = ShortStore.getState().links ? ShortStore.getState().links : [];

		return (
			<div className="Short">
				<Topbar
                    title={this.state.title}
                    subtitle={this.state.subtitle}
                />
				<Shortner />

                {links.length>0?<ShortHistory links={links} />:''}

			</div>
		);
	}
}
export default connectToStores(Short);
