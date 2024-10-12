import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { STATE_OPTIONS, PLACE_OPTIONS, TRANSPORT_OPTIONS, PACKAGE_OPTIONS } from './explore.constant';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule, MultiSelectModule, ButtonModule, FormsModule, CalendarModule],
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit{
  
  stateOptions = STATE_OPTIONS;
  placeOptions: { label: string; value: string }[] = [];
  selectedState: string[] = [];
  selectedPlace: any[] = [];
  transportOptions = TRANSPORT_OPTIONS;
  packageOptions = PACKAGE_OPTIONS;
  selectedCheckIn: Date | null = null;
  selectedCheckOut: Date | null = null;
  selectedTransport: any[] = [];
  selectedPackage: any[] = [];
  searchResults: any[] = []; // Store the search results
  randomResults: any[] = [];

  stateNameMap: { [key: string]: string } = {
    AP: 'AndhraPradesh',
    BR: 'Bihar',
    HP: 'Himachal',
    RJ: 'Rajasthan',
    MH: 'Maharashtra',
    KA: 'Karnataka',
    GJ: 'Gujarat',
    GA: 'Goa',
    KL: 'Kerala',
    WB: 'WestBengal',
    TN: 'TamilNadu'
  };
  locationPrompted: boolean = false;

  constructor(private storageService: StorageService) {}
  ngOnInit() {
      this.locationPrompted = this.storageService.getItem('locationPrompted') === 'true';
      const storedLocation = sessionStorage.getItem('userLocation') || 'Bangalore, Karnataka';
      console.log('Using fallback location:', storedLocation);
      
    // Call to request location access if not already prompted
    if (!this.locationPrompted) {
      this.requestCurrentLocation();
    } else {
      const storedLocation = sessionStorage.getItem('userLocation') || 'Bangalore, Karnataka';
      console.log('Using fallback location:', storedLocation);
    }

    this.generateRandomResults();
    this.updatePlaceOptions(this.selectedState);
}
generateRandomResults(): void {
  this.randomResults = [
    {
      currentLocation: 'Unknown Location, Karnataka',
      placeToVisit: 'Dudhsagar Falls',
      transportMode: 'Flight',
      packageRange: 'Rs 25,000 - Rs 30,000',
      numberOfDays: 8,
    },
    {
      currentLocation: 'Unknown Location, Goa',
      placeToVisit: 'Palolem Beach',
      transportMode: 'Train',
      packageRange: 'Rs 10,000 - Rs 15,000',
      numberOfDays: 4,
    },
    // Add more random results here
  ];
}
requestCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Location accessed:', position);
        this.getCurrentLocation(position); // Call to set the user location
        this.storageService.setItem('locationPrompted', 'true');
      },
      (error) => {
        console.error('Location access denied or failed:', error);
        sessionStorage.setItem('userLocation', 'Unknown Location, Karnataka');
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
}


private getCurrentLocation(position: GeolocationPosition): void {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log('Nominatim response:', data); // Log the response
      if (data && data.address) {
        const location = data.address.city || data.address.town || data.address.village || 'Unknown Location';
        const state = data.address.state || 'Unknown State';
        const formattedLocation = `${location}, ${state}`;
        sessionStorage.setItem('userLocation', formattedLocation); // Store the formatted location
      } else {
        sessionStorage.setItem('userLocation', 'Unknown Location, Karnataka'); // Default if no location found
      }
    })
    .catch(error => {
      console.error('Error fetching location:', error);
      sessionStorage.setItem('userLocation', 'Unknown Location, Karnataka');
    });
}



  onStateChange(selectedStates: string[]) {
    const fullStateNames = selectedStates
      .map(code => this.stateNameMap[code])
      .filter(Boolean);
    this.updatePlaceOptions(fullStateNames);
  }

  private updatePlaceOptions(selectedStates: string[]) {
    if (selectedStates.length === 0) {
      this.placeOptions = Object.values(PLACE_OPTIONS).flat();
    } else {
      this.placeOptions = selectedStates.flatMap(state => {
        const places = PLACE_OPTIONS[state as keyof typeof PLACE_OPTIONS];
        return places || [];
      });
    }
  }
 
  
  
  
  
  
  

  onSearch() {
    const numberOfDays = this.calculateNumberOfDays(this.selectedCheckIn, this.selectedCheckOut);
    const userLocation = sessionStorage.getItem('userLocation') || 'Unknown Location, Karnataka'; // Retrieve stored location
  
    // Add your logic here to show random results until user applies filters.
    
    this.searchResults.push({
      currentLocation: `Your location: ${userLocation}`,
      placeToVisit: this.selectedPlace.join(', '),
      transportMode: this.selectedTransport.join(', '),
      packageRange: this.selectedPackage.join(', '),
      numberOfDays: numberOfDays
    });
  }
  
  

  private calculateNumberOfDays(checkIn: Date | null, checkOut: Date | null): number {
    if (checkIn && checkOut) {
      const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert to days
    }
    return 0;
  }
}
