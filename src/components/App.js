import React, { Component } from 'react';

import fetchPhotos from '../api';
import Photo from './Photo';
import Loading from './Loading';
import Search from './Search';

class App extends Component {

  state = {
    photos: [],
    searchQuery: '',
    isLoadingPhotos: true
  };

  componentDidMount() {
    this.searchPhotos();
  }

  searchPhotos = (tags = '') => {
    this.setState(
      {
        isLoadingPhotos: true
      },
      () => {
        try {
          // Tags are in fact entered with spaces in between in the Flickr UI, so let's allow for that here too.
          const tagsParam = tags.replace(' ', ',');

          fetchPhotos(tagsParam).then((photos) => {
            this.setState({
              photos,
              isLoadingPhotos: false
            });
          });
        } catch (e) {
          this.setState({
            isLoadingPhotos: false
          });
          alert('Could not retrieve photos. Please check your credentials.');
        }
      }
    );
  };

  renderPhotos() {
    return this.state.photos.map((photo, i) => {
      return (
        <div key={`photo_${i}`} className="column is-one-quarter">
          <Photo photo={photo} />
        </div>
      );
    });
  }

  render() {
    return (
      <div className="App">
        <header className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Flickr Feed</h1>
            </div>
          </div>
        </header>

        <section className="section">
          <div className="container">
            <div className="Content">
              <Search onSearch={this.searchPhotos} />

              <div className="PhotoStream columns is-multiline">
                {this.state.isLoadingPhotos ? <Loading /> : this.renderPhotos()}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
