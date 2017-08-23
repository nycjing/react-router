// import React from 'react';
// import { Route, Switch, Link } from 'react-router-dom';
// import Bluebird from 'bluebird';
// import axios from 'axios';
// import AllAlbums from './AllAlbums';
// import Songs from './Songs';

// export default class SingleArtist extends React.Component {

//   constructor () {
//     super();
//     this.state = {
//       artist: {}
//     };
//   }

//   componentDidMount () {
//     const artistId = this.props.match.params.artistId;
//     const mainPath = `/api/artists/${artistId}`;
//     const paths = [mainPath, `${mainPath}/albums`, `${mainPath}/songs`];
//     Bluebird
//       .map(paths, path => axios.get(path))
//       .map(res => res.data)
//       .spread((artist, albums, songs) => {
//         artist.albums = albums;
//         artist.songs = songs;
//         this.setState({ artist });
//       });
//   }

//   render () {

//     const artist = this.state.artist;
//     const albums = artist.albums || [];
//     const songs = artist.songs || [];

//     return (
//       <div>
//         <h3>{ artist.name }</h3>
//         <ul className="nav nav-tabs">
//           <li><Link to={`/artists/${artist.id}/albums`}>ALBUMS</Link></li>
//           <li><Link to={`/artists/${artist.id}/songs`}>SONGS</Link></li>
//         </ul>
//         <Switch>
//           <Route path={`/artists/${artist.id}/albums`} render={() => (
//             <AllAlbums albums={albums} />
//           )} />
//           <Route path={`/artists/${artist.id}/songs`} render={() => (
//             <Songs songs={songs} />
//           )} />
//         </Switch>
//       </div>
//     );
//   }
// }

import React, {
  Component,
} from 'react';

import {
  BrowserRouter as Router,
  Link,
  Route,
} from 'react-router-dom'


import Songs from '../components/Songs';
import AllAlbums from './AllAlbums';
import axios from 'axios';
import Promise from 'bluebird';

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

    return (
      <Router>
      <div>
        <h3>{artist.name}</h3>
        <ul className="nav nav-tabs">
          <li><Link to={`/artists/${artist.id}/songs`}>SONGS</Link></li>
          <li><Link to={`/artists/${artist.id}/albums`}>ALBUMS</Link></li>
        </ul>
        <div>
          <Route
            path="/artists/:artistId/albums"
            render={() =>
              (<AllAlbums albums={this.state.artistAlbums} />)}
          />
          <Route
            path="/artists/:artistId/songs"
            render={() => {
              console.log("songs")
              return (<Songs songs={this.state.artistSongs} />)
            }
            }
          />
        </div>

      </div>
      </Router>
    );
  }
}