import React,{ Component} from 'react';
import ShortStore from './../stores/ShortStore';
import ShortActions from './../actions/ShortActions';
import connectToStores from 'alt/utils/connectToStores';
require('../styles/Shortner.less');
require('../styles/Button.less');

class Shortner extends Component {

    static getStores(){
        return [ShortStore];
    }

    static getPropsFromStores(){
        return ShortStore.getState();
    }

    constructor(){

        super();
        this.state = {
            buttonEnabled: false
        };

    }

    onChangeInput(){

        var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression);
        var url = this.refs.url.value;
        var enabled = url.match(regex);

        this.setState({
            buttonEnabled: enabled
        });

    }

    onClickShorten(e){

        e.preventDefault();
        if(this.state.buttonEnabled){
            ShortActions.submitLink(this.refs.url.value);
            this.refs.url.value = '';
        }

    }

    render() {

        var error = ShortStore.getState().error ? <span className="red"> {ShortStore.getState().error} </span> : null;
        return (
            <div className="Shortner">
                <form>
                    <input ref="url"
                           onChange={this.onChangeInput.bind(this)}
                           className="ShortInput left"
                           placeholder="Paste the link you want to shorten here" />

                    <button onClick={this.onClickShorten.bind(this)}
                            className={ !this.state.buttonEnabled?"disabled left":"left"}>
                        Shorten this link
                    </button>
                </form>
                {error}
            </div>
        );

    }
}
export default connectToStores(Shortner);