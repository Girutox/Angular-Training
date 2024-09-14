import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Place } from './place.model';
import { catchError, tap, throwError } from 'rxjs';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private http = inject(HttpClient);
  private errorService = inject(ErrorService);
  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces('http://localhost:3000/places', 'Something went wrong while fetching the available places. Please try again later.')
  }

  loadUserPlaces() {
    return this.fetchPlaces('http://localhost:3000/user-places', 'Something went wrong while fetching your favorite places. Please try again later.').pipe(
      tap({
        next: response => {
          this.userPlaces.set(response.places);
        }
      })
    )
  }

  addPlaceToUserPlaces(selectedPlace: Place) {
    const currentPlaces = this.userPlaces();

    if (!currentPlaces.some(a => a.id == selectedPlace.id)) {
      this.userPlaces.set([...currentPlaces, selectedPlace]); // Optimistic updating
    }

    return this.http.put('http://localhost:3000/user-places', {
      placeId: selectedPlace.id
    }).pipe(
      catchError(() => {
        const customErrorMessage = 'Failed to store selected place';

        this.errorService.showError(customErrorMessage);
        this.userPlaces.set([...currentPlaces]); // Rollback optimistic updating
        return throwError(() => new Error(customErrorMessage))
      })
    )
  }

  removeUserPlace(place: Place) {
    const currentPlaces = this.userPlaces();

    this.userPlaces.set([...currentPlaces.filter(a => a.id != place.id)]); // Optimistic updating

    return this.http.delete(`http://localhost:3000/user-places/${place.id}`).pipe(
      catchError(() => {
        const customErrorMessage = 'Failed to remove selected place';

        this.errorService.showError(customErrorMessage);
        this.userPlaces.set([...currentPlaces]); // Rollback optimistic updating
        return throwError(() => new Error(customErrorMessage))
      })
    )
  }

  fetchPlaces(url: string, erroMessage: string) {
    return this.http.get<{ places: Place[] }>(url).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error(erroMessage))
      })
    )
  }
}
