import React, { Component } from 'react';
import axios from 'axios';

export default class AllAlbums extends Component {


    constructor (props) {
        super(props);
        this.state = {
            albums: []
        };

    }

    componentDidMount () {
        axios.get('/api/albums/')
            .then(res => res.data)
            .then(albums => {
                this.setState({ albums })
            });
    }


  render () {
    const albums = this.state.albums;
    console.log(this.props);
    // const selectAlbum = this.props.selectAlbum;

    return (
      <div>
        <h3>Albums</h3>
        <div className="row">
        {
          albums.map(album => (
            <div className="col-xs-4" key={ album.id }>
              <a className="thumbnail" href="#" onClick={() => selectAlbum(album.id)}>
                <img src={ album.imageUrl } />
                <div className="caption">
                  <h5>
                    <span>{ album.name }</span>
                  </h5>
                  <small>{ album.songs.length } songs</small>
                </div>
              </a>
            </div>
          ))
        }
        </div>
      </div>
    );
  }
}
