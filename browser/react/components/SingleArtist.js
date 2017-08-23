import React, {Component} from 'react';
import Songs from '../components/Songs';
import axios from 'axios';
import Promise from 'bluebird';
import AllAlbums from './AllAlbums';

export default class SingleArtist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedArtist: {},
            artistAlbums: [],
            artistSongs: []
        };
    }


    componentDidMount() {
        const artistId = this.props.match.params.artistId;
        const getArtist = axios.get(`/api/artists/${artistId}`)
        const getAlbums = axios.get(`/api/artists/${artistId}/albums`)
        const getSongs = axios.get(`/api/artists/${artistId}/songs`)
        Promise.all([getArtist, getAlbums, getSongs])
            .spread((artistdata, albumdata, songdata) => {
                this.setState({
                    selectedArtist: artistdata.data,
                    artistAlbums: albumdata.data,
                    artistSongs: songdata.data
                })
            })


    }

    render() {
        const artist = this.state.selectedArtist;
        const songs = this.state.artistSongs;
        const albums = this.state.artistAlbums;
        console.log(albums);

        return (
            <div>
                <div>
                    <h3>ARTIST NAME</h3>
                    <h4>ALBUMS</h4>
                    <h4>SONGS</h4>
                </div>
                <div>
                    <h3>{artist.name}</h3>
                </div>
                <div className="row">
                    <AllAlbums albums={this.state.artistAlbums} />
                </div>

                <Songs songs={songs}/>
            </div>

        );
    }
}
