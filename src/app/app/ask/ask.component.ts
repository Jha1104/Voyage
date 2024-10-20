import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext'; 
import { InputGroupModule } from 'primeng/inputgroup'; 
import { ButtonModule } from 'primeng/button'; 
import { CommonModule } from '@angular/common';

interface Card {
  title: string;
  items: string[];
  isBlurred: boolean;
  isHighlighted: boolean;
}

@Component({
  selector: 'app-ask',
  standalone: true,
  imports: [InputTextModule, InputGroupModule, ButtonModule, ReactiveFormsModule, CommonModule], 
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.scss']
})
export class AskComponent implements OnInit {

  showTooltip: boolean = false; // Flag to control tooltip visibility
  searchTerm: string = ''; // To hold the current search term

  cards: Card[] = [
    { title: 'About Voyage', items: ['The App details', 'Overview'], isBlurred: false, isHighlighted: false },
    { title: 'Find Us', items: ['sharefeedback@voyage.com', 'Call Us'], isBlurred: false, isHighlighted: false },
    { title: 'Account Settings', items: ['General Settings', 'Advanced Settings'], isBlurred: false, isHighlighted: false },
    { title: 'Trips at Glance', items: ['My Voyage', 'Plans', 'Saved Voyage'], isBlurred: false, isHighlighted: false },
    { title: 'Rate Us', items: ['Comments', 'Ratings', 'Reviews'], isBlurred: false, isHighlighted: false },
    { title: 'Looking for something else?', items: ['Share your ideas or points', 'Tell us about your problem'], isBlurred: false, isHighlighted: false },
  ];

  ngOnInit(): void {
    // Initialize any other settings if needed
  }

  onSearch(searchTerm: string): void {
    const trimmedSearch = searchTerm.trim();
    const searchLength = trimmedSearch.length;
  
    // Show tooltip if the search length is 1 or 2
    this.showTooltip = searchLength > 0 && searchLength < 3;
  
    // Reset all cards to original state
    this.cards.forEach(card => {
      card.isBlurred = false;
      card.isHighlighted = false;
    });

    if (searchLength === 3) {
      this.cards.forEach(card => {
        if (this.cardMatches(card, trimmedSearch)) {
          card.isHighlighted = true; // Highlight matching cards
        } else {
          card.isBlurred = true; // Blur non-matching cards
        }
      });
    } else if (searchLength > 3) {
      this.cards.forEach(card => {
        if (this.cardMatches(card, trimmedSearch)) {
          card.isHighlighted = true; // Highlight only the exact match
        } else {
          card.isBlurred = true; // Blur non-matching cards
        }
      });
    }

    if (searchLength < 3) {
      this.cards.forEach(card => {
        card.isBlurred = false; // Reset blur if less than 3 characters
      });
    }

    // Update the search term
    this.searchTerm = trimmedSearch;
  }

  private cardMatches(card: Card, searchTerm: string): boolean {
    const titleMatch = card.title.toLowerCase().includes(searchTerm.toLowerCase());
    const itemsMatch = card.items.some(item => item.toLowerCase().includes(searchTerm.toLowerCase()));
    return titleMatch || itemsMatch;
  }
}
