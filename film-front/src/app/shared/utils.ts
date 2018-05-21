import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

@Injectable()
export class Utils {

    static getUrlPattern(): RegExp {
        return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b|(:[0-9]+)?([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    }

}
