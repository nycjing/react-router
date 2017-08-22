import React, { Component } from 'react';
import Songs from '../components/Songs';
import axios from 'axios';

export default class SingleArtist extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  componentDidMount() {
    const artistId = this.props.match.params.artistId;
    axios.get(`/api/albums/${artistId}`)
      .then(res => res.data)
      .then(artist => this.setState({
        selectedArtist: artist
      }));
  }

  render() {
    const artist = this.state.selectedArtist
    // fakeAlbum;

    // const artist = this.props.artist;

    return (
      <div>
        <h3>ARTIST NAME</h3>
        <h4>ALBUMS</h4>
        <h4>SONGS</h4>
      </div>

      //   <div className="album">
      //     <div>
      //       <h3>{ album.name }</h3>
      //       <img src={ album.imageUrl } className="img-thumbnail" />
      //     </div>
      //     <Songs songs={album.songs} />
      //   </div>
    );
  }
}
