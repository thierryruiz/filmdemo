import { Injectable } from '@angular/core';
import { Actor } from '../models/actor.model';
import { Film } from '../models/film.model';
import { environment } from '../../environments/environment';
import { Director } from '../models/director.model';

@Injectable()
export class ModelHelper {

    createNewFilm(): Film {
        return new Film(null, '', '', null);
    }

    createNewActor(): Actor {
        return new Actor(null, '', '', null, null);
    }

    createNewDirector(): Director {
        return new Director(null, '', '', null, null);
    }

    createFilmFromJSON(json: any): Film {
        const imageUrl: string = json.image
            || environment.imagesUrl + '/' +
            json.title.toLowerCase().replace(/ /g, '_') + '.jpg';

        return new Film(json.id, json.title, imageUrl, json._links);
    }

    createActorFromJSON(json: any): Actor {
        const imageUrl: string = json.image
            || environment.imagesUrl + '/' +
            json.firstName.toLowerCase().replace(/ /g, '_') +
            '_' + json.lastName.toLowerCase().replace(/ /g, '_') + '.jpg';
        return new Actor(json.id, json.firstName, json.lastName, imageUrl, json._links);
    }

    createDirectorFromJSON(json: any): Director {
        const imageUrl: string = json.image
            || environment.imagesUrl + '/' +
            json.firstName.toLowerCase().replace(/ /g, '_') +
            '_' + json.lastName.toLowerCase().replace(/ /g, '_') + '.jpg';
        return new Director(json.id, json.firstName, json.lastName, imageUrl, json._links);
    }



}
