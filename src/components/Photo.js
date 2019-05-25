import React from 'react';

const PhotoTags = ({ tags }) => (
  <div className="Photo__Tags">
    {(tags.split(' ') || []).map((tag, i) => (
      <span key={`tag_${i}`} className="Photo__Tag">
        {tag}
      </span>
    ))}
  </div>
);

/**
 * Displays one photo card with title, author, description and tags.
 * Links are expected to be already constructed on the photo prop.
 */
const Photo = ({ photo }) => (
  <div className="Photo">
    <figure>
      <img
        src={photo.photoURL || 'https://placekitten.com/480/360'}
        alt="Meow"
      />
    </figure>
    <div className="Photo__Headline">
      <a href={photo.photoURL} target="_blank" rel="noopener noreferrer">
        <h2 className="Photo__Title">{photo.title || 'Unknown'}</h2>
      </a>
      <span className="Photo__Author">
        by{' '}
        <a href={photo.authorURL} target="_blank" rel="noopener noreferrer">
          {photo.ownername}
        </a>
      </span>
    </div>
    <div className="Photo__Description">{photo.description._content}</div>
    {!!photo.tags && <PhotoTags tags={photo.tags} />}
  </div>
);

export default Photo;
