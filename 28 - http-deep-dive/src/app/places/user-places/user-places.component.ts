import { Component, inject, signal } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent {
  private placesService = inject(PlacesService);
  places = this.placesService.loadedUserPlaces;
  isFetching = signal(false);
  error = signal('');

  ngOnInit(): void {
    this.isFetching.set(true);
    this.placesService.loadUserPlaces().subscribe({
      error: (error: Error) => {
        this.error.set(error.message);
      },
      complete: () => {
        this.isFetching.set(false);
      }
    })    
  }

  onSelectedPlace(selectedPlace: Place) {
    this.placesService.removeUserPlace(selectedPlace).subscribe({
      next: response => {
        console.log(response);
      }
    })
  }
}
