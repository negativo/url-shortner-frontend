import alt from '../alt';
import ShortActions from '../actions/ShortActions';
import {HistoryLocation} from 'react-router';
import axios from 'axios';
import Config from '../config';

class ShortStore {

    constructor() {

        this.bindActions(ShortActions);
        this.links = [];
        this.error = null;
    }

	updateLinks(){

        let that = this;
        let newLinks = [];

		this.links.forEach(function(link,index){

			axios.get(Config.proxyUrl + '/' + link.shortcode + '/stats')
                .then(response => {

                    let responseBody = JSON.parse(response.data.body);

                    if(!responseBody.error) {

                        let newLink = link;
                        newLink.stats = responseBody;
                        newLinks[index] = newLink;

						if(newLinks.length == that.links.length){
                            that.setState({
                                links: newLinks
                            });
                            localStorage.setItem('links', JSON.stringify(newLinks));
						}

                    }else{
                        that.setState({error: "Updating links, " + responseBody.error + ", clear your history."});
                    }
                })
                .catch(response=>{
                    that.setState({error: 'Proxy offline. Check documentation' });
                });
        });

    }

    resetLinks() {

        this.setState({
            links: [],
            error:null
        });
        localStorage.removeItem('links');
    }

    loadLinks() {

        let links = JSON.parse(localStorage.getItem('links'));

        if (links) {
            this.setState({links: links});
            this.updateLinks();
        }

    }

    onSubmitLink(link) {

        this.setState({error:null});

        if(link.indexOf('http://') == -1 && link.indexOf('https://') == -1 ){
            link = 'http://' + link;
		}

        let shortcode;
        axios.post(
            Config.proxyUrl + '/shorten', {
                url: link
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        ).then(response => {
            shortcode = response.data.shortcode;

            return axios.get(Config.proxyUrl + '/' + shortcode + '/stats');
        })
		.then(response => {
		    if(response.data) {
	            this.saveLinks({shortcode: shortcode,
					url: link,
				    stats:JSON.parse(response.data.body)
			    });
			}
		})
		.catch( response => {
            this.setState({
                error: response.data.error ?
                    response.data.error :
                    'Something wrong, our monkeys are investingating the issue.'
            });
        });
    }

    saveLinks(data) {

        let links = this.links;
        links.unshift(data);

        this.setState({links: links});
        localStorage.setItem('links', JSON.stringify(this.links));

    }


}

export default alt.createStore(ShortStore, 'ShortStore');
