import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { STATE_OPTIONS, PLACE_OPTIONS, TRANSPORT_OPTIONS, PACKAGE_OPTIONS} from './explore.constant';
import { TreeSelectModule } from 'primeng/treeselect'; // Add this import
import { TreeNode } from 'primeng/api';
@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule, MultiSelectModule, ButtonModule, FormsModule, CalendarModule, TreeSelectModule],
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
  selectedDateRange: Date[] | null = null; // For the combined check-in and check-out
  selectedCategory: any[] = []; // For the p-treeSelect field
  
   // Add this for the tree select options (you can later update the options)
   treeOptions: TreeNode[] = [
    {
      label: 'Maharashtra',
      key: 'Maharashtra',
      children: [
        { label: 'Mumbai', key: 'Mumbai' },
        { label: 'Pune', key: 'Pune' }
      ]
    },
    {
      label: 'Karnataka',
      key: 'Karnataka',
      children: [
        { label: 'Bangalore', key: 'Bangalore' },
        { label: 'Mysore', key: 'Mysore' }
      ]
    }
  ];
   // Bind tree options from constants
   selectedOwnState: any[] = [];  // Hold selected options

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
  

  constructor( 
  ) {}
  ngOnInit() {
  //   this.placeOptions = PLACE_OPTIONS;
  // this.transportOptions = TRANSPORT_OPTIONS;
  // this.packageOptions = PACKAGE_OPTIONS;

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


onStateChange(selectedStates: string[] | null): void {
  if (!selectedStates || selectedStates.length === 0) {
    this.updatePlaceOptions([]); // Fallback when no states are selected
    return;
  }
  
  const fullStateNames = selectedStates
    .map(code => this.stateNameMap[code])
    .filter(Boolean); // Ensures null or undefined values are filtered out

  this.updatePlaceOptions(fullStateNames);
}


  private updatePlaceOptions(selectedStates: string[]) {
    console.log('Selected States:', selectedStates);
    console.log('Available Places:', PLACE_OPTIONS);
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
    // Step 1: Check selected state, city, and other filters
    const selectedCity = this.selectedOwnState.length > 0 ? this.selectedOwnState[0].label : 'Unknown City'; // First city selected
    const selectedState = this.selectedOwnState.length > 0 ? this.selectedOwnState[0].parent?.label : 'Unknown State'; // Parent state of selected city
  
    const travelStates = this.selectedState.length > 0 ? this.selectedState.join(', ') : 'No State Selected';
  
    // Debugging: Check selected values
    console.log('Selected Places ngModel:', this.selectedPlace);
    console.log('Selected Transport ngModel:', this.selectedTransport);
    console.log('Selected Package ngModel:', this.selectedPackage);
  
    // Step 2: Map the selected places
    const placesToVisit = this.selectedPlace && this.selectedPlace.length > 0 
      ? this.selectedPlace.map(selectedValue => {
          const matchedPlace = this.placeOptions.find(option => option.value === selectedValue);
          return matchedPlace ? matchedPlace.label : 'Unknown Place';
        }).join(', ')
      : 'No Place Selected';
    
    // Debugging: Check the output of placesToVisit
    console.log('Places to Visit:', placesToVisit);
  
    // Step 3: Map the selected transport modes
    const transportModes = this.selectedTransport && this.selectedTransport.length > 0 
      ? this.selectedTransport.map(selectedValue => {
          const matchedTransport = this.transportOptions.find(option => option.value === selectedValue);
          return matchedTransport ? matchedTransport.label : 'Unknown Transport';
        }).join(', ')
      : 'No Transport Selected';
  
    // Debugging: Check the output of transportModes
    console.log('Transport Modes:', transportModes);
  
    // Step 4: Map the selected packages
    const selectedPackage = this.selectedPackage && this.selectedPackage.length > 0 
      ? this.selectedPackage.map(selectedValue => {
          const matchedPackage = this.packageOptions.find(option => option.value === selectedValue);
          return matchedPackage ? matchedPackage.label : 'Unknown Package';
        }).join(', ')
      : 'No Package Selected';
  
    // Debugging: Check the output of selectedPackage
    console.log('Selected Package:', selectedPackage);
  
    // Step 5: Calculate number of days from the selected date range
    let numberOfDays = 'Unknown';
    if (this.selectedDateRange && this.selectedDateRange.length === 2) {
      const [checkIn, checkOut] = this.selectedDateRange;
      const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
      numberOfDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)).toString(); // Convert to days
    }
  
    // Step 6: Format the result
    const result = {
      currentLocation: `Your Location: ${selectedCity}, ${selectedState} / Travelling State: ${travelStates}`,
      placeToVisit: `Place to Visit: ${placesToVisit}`,
      transportMode: `Transport: ${transportModes}`,
      packageRange: `Selected Package: ${selectedPackage}`,
      numberOfDays: `Days: ${numberOfDays}`
    };
  
    // Debugging: Check the final result object
    console.log('Search Result:', result);
  
    // Step 7: Push the formatted result into the searchResults array
    this.searchResults = [result]; // Replace previous results with new search result
  }
  
  
  
  
  
  
  

  onCancel(){
   
      // Reset the selected states for p-treeSelect
      this.selectedOwnState = [];
    
      // Reset the selected states for p-multiselect
      this.selectedState = [];
      
      // Reset the selected places for p-multiselect
      this.selectedPlace = [];
      
      // Reset the selected transport modes for p-multiselect
      this.selectedTransport = [];
      
      // Reset the selected package for p-multiselect
      this.selectedPackage = [];
    
      // Reset the selected date range for p-calendar
      this.selectedDateRange = null;
    
      // Reset the place options to their initial state
      this.updatePlaceOptions([]); // or this.placeOptions = PLACE_OPTIONS;
    
      // You can optionally clear search results if needed
      this.searchResults = [];
    
      // Optionally log to confirm reset
      console.log('Filters reset successfully');
    }
    
  }

