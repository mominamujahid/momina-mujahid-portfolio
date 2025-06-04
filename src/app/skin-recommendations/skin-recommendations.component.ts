import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Product {
  name: string;
  type: string;
  brand: string;
  description: string;
  price: number;
  rating: number;
  benefit: string;
  imageUrl?: string;
}

@Component({
  selector: 'app-skin-recommendations',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './skin-recommendations.component.html',
  styleUrls: ['./skin-recommendations.component.css']
})
export class SkinRecommendationsComponent implements OnInit {
  // User skin profile
  skinType: string = 'Pic Not Uploaded';
  skinConcern: string = 'Pic Not Uploaded';
  recommendedProductList: string[] = ['Pic Not Uploaded'];

  // Recommended products
  recommendedProducts: Product[] = [
    {
      name: 'Gentle Foaming Cleanser',
      type: 'Cleanser',
      brand: 'CeraVe',
      description: 'Non-irritating cleanser that maintains skin barrier',
      price: 14.99,
      rating: 4.7,
      benefit: 'Effective for combination skin, helps balance oil production',
      imageUrl: '/api/placeholder/200/200'
    },
    {
      name: 'Niacinamide 10% + Zinc 1%',
      type: 'Serum',
      brand: 'The Ordinary',
      description: 'Reduces appearance of blemishes and congestion',
      price: 6.99,
      rating: 4.5,
      benefit: 'Addresses acne and hyperpigmentation concerns',
      imageUrl: '/api/placeholder/200/200'
    },
    {
      name: 'Hydrating Toner',
      type: 'Toner',
      brand: 'Laneige',
      description: 'Cream Skin Toner & Moisturizer for deep hydration',
      price: 33.00,
      rating: 4.8,
      benefit: 'Targets dryness while balancing combination skin',
      imageUrl: '/api/placeholder/200/200'
    },
    {
      name: 'Vitamin C Serum',
      type: 'Serum',
      brand: 'Skinceuticals',
      description: 'L-ascorbic acid serum for brightening',
      price: 166.00,
      rating: 4.9,
      benefit: 'Helps with hyperpigmentation and brightening',
      imageUrl: '/api/placeholder/200/200'
    },
    {
      name: 'Oil-Free Moisturizer',
      type: 'Moisturizer',
      brand: 'Neutrogena',
      description: 'Lightweight, non-comedogenic hydration',
      price: 19.99,
      rating: 4.4,
      benefit: 'Perfect for combination skin without clogging pores',
      imageUrl: '/api/placeholder/200/200'
    },
    {
      name: 'Mineral Sunscreen SPF 50',
      type: 'Sunscreen',
      brand: 'La Roche-Posay',
      description: 'Broad spectrum protection with antioxidants',
      price: 35.99,
      rating: 4.6,
      benefit: 'Prevents further hyperpigmentation and protects skin',
      imageUrl: '/api/placeholder/200/200'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    const getSessionValue = (key: string, fallback: string = 'Pic Not Uploaded') =>
      sessionStorage.getItem(key)?.trim() || fallback;

    const parseProducts = (raw: string | null): string[] => {
      if (!raw) return ['Pic Not Uploaded'];

      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) return parsed;
      } catch {
        const manualSplit = raw.split(',').map(p => p.trim()).filter(Boolean);
        if (manualSplit.length) return manualSplit;
      }

      return ['Pic Not Uploaded'];
    };

    this.skinType = getSessionValue('skin-type');
    this.skinConcern = getSessionValue('skin-issue');
    this.recommendedProductList = parseProducts(sessionStorage.getItem('products'));
  }


  getStarRating(rating: number): number[] {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const totalStars = hasHalfStar ? fullStars + 1 : fullStars;
    return Array(totalStars).fill(0);
  }
}