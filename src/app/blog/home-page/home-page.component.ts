import { Component } from '@angular/core';
import { defaultImage } from 'src/app/app-constants';

@Component({
  templateUrl: 'home-page.component.html'
})
export class BasicComponent {

    image = defaultImage;
}
