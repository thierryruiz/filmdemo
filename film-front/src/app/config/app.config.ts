import {InjectionToken} from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig = {
  api: {
    clientId: 'filmapp',
    secret: 'nanar',
    scope: 'film',
    film: {
        name : 'film',
        collectionName : 'films',
        searchUrl: '/search/findByTitleContaining?title=',
        deleteUrl: 'deletefilms'
    },
    actor: {
      name: 'actor',
      collectionName: 'actors',
      searchUrl: '/search/findByNameContaining?name='
    },
    director: {
      name: 'director',
      collectionName: 'directors',
      searchUrl: '/search/findByNameContaining?name='
    }
  }
};
