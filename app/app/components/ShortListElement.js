import React, {Component} from 'react';
import moment from 'moment';
import Config from './../config';
import clipboard from 'clipboard-js';

export default class ShortListElement extends Component {

    constructor(props) {

        super(props);

    }
    
    onClickCopy(url){

        clipboard.copy(url);

    }


    render() {

        var link = this.props.link;
        var date = moment(link.stats.lastSeenDate).fromNow();

        return <tr>
            <td className="linkColumn linkContent">
                <a href={Config.baseUrl+link.shortcode}  target="_blank">
                    <strong>shooooort.com/
                        <span className="red">{link.shortcode}</span>
                    </strong>
                </a>
                <span onClick={this.onClickCopy.bind(this,Config.baseUrl + link.shortcode)}
                      className="copyLink right">
                    Click To copy this link
                </span> <br/>
                <span className="unimportant"> 
                    { link.url.slice(0, 53) + (link.url.length > 53 ? '...' : '') }
                </span>
            </td>
            <td>
                { link.stats.redirectCount }
            </td>
            <td>
                <span>{ date }</span>
            </td>
        </tr>;
    }
}

