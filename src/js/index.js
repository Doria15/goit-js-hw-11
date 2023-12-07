import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { BASE_URL, options } from './pixabay.js';

const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('input[name="searchQuery"]');
const searchForm = document.querySelector('.search-form');

const lightbox = new SimpleLightbox('.lightbox', {
  captionsData: 'alt',
  captionDelay: 250,
});

let totalHits = 0;
let reachedEnd = false;

function createGallery(hits) {
  const markup = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
              <a href="${largeImageURL}" class="lightbox">
                  <div class="photo-card">
                      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                      <div class="info">
                          <p class="info-item">
                              <b>Likes</b>
                              ${likes}
                          </p>
                          <p class="info-item">
                              <b>Views</b>
                              ${views}
                          </p>
                          <p class="info-item">
                              <b>Comments</b>
                              ${comments}
                          </p>
                          <p class="info-item">
                              <b>Downloads</b>
                              ${downloads}
                          </p>
                      </div>
                  </div>
              </a>
              `;
      }
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  if (options.parameters.page * options.parameters.per_page >= totalHits) {
    if (!reachedEnd) {
      Notify.info("We're sorry, but you've reached the end of search results.");
      reachedEnd = true;
    }
  }
  lightbox.refresh();
}
