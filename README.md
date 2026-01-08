# OLX Clone (React + Firebase)

A simplified classifieds marketplace where users can sign up, list items for sale, browse categories, wishlist products, and manage their own ads. Built with React + Vite, Firebase (Auth + Firestore) for auth/data, and Cloudinary for image uploads.

## Features

- Email/password auth with persistent session via Firebase
- Post new ads with title, price, category, description, and image upload to Cloudinary
- Browse products with category tiles and responsive card grid
- Wishlist toggle on list and detail views (saved per user in Firestore)
- Product detail page with seller info and wishlist button
- “My Ads” page filtered by the signed-in seller
- Toast feedback and basic client-side validation for posting and wishlists

## Tech Stack

- React 19 + Vite, React Router
- Firebase Auth + Firestore
- Cloudinary upload API for images
- Tailwind utility classes with Flowbite components
- React Hot Toast for notifications

## Prerequisites

- Node.js 18+ and npm
- Firebase project with Auth + Firestore enabled
- Cloudinary account (unsigned upload preset)

## Environment Setup

1. Copy your Firebase credentials into [src/db/firebase.js](src/db/firebase.js) (replace the existing sample keys).
2. Configure Cloudinary in [src/Cloudinary/cloudinary.js](src/Cloudinary/cloudinary.js): set `cloudName` and `uploadPreset` to your values.
3. (Optional) create a `.env` for any additional secrets; Vite will expose vars prefixed with `VITE_`.

## Run Locally

1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Open the printed URL (default http://localhost:5173)

## Available Scripts

- `npm run dev` – start Vite dev server
- `npm run build` – build to `dist`
- `npm run preview` – preview production build
- `npm run lint` – run ESLint
- `npm run deploy` – build and publish `dist` to GitHub Pages (uses `homepage` in package.json)

## Usage Notes

- You must be logged in to post ads, wishlist items, or view My Ads/Wishlist
- Image uploads: only image files, max 5 MB (validated client-side)
- Prices must be positive digits and under 9,999,999
- Wishlist state is stored per user in the Firestore `users` collection

## Deployment (GitHub Pages)

1. Ensure `homepage` in package.json points to your repo URL
2. `npm run deploy` to build and push `dist` to the `gh-pages` branch
3. Confirm Firebase auth domains include your Pages URL if using hosted auth flows

## Future Improvements

- Search and category filters across listings
- Phone/OTP or social login
- Image moderation and multiple image uploads
- Seller chat/contact channel
