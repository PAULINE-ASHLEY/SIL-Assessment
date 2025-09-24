// All application routes in one centralized file

// Public routes - accessible without authentication
export const LANDING = '/';          // Landing page
export const LOGIN = '/login';       // User login page
export const SIGNUP = '/signup';     // User signup page

// Main application routes - typically require authentication
export const HOME = '/home';         // Main dashboard or home page after login
export const USERMAIN = '/users';    // Main users listing page
export const ALBUMMAIN = '/albums';  // Main albums listing page  
export const PHOTOMAIN = '/photos';  // Main photos listing page

// Dynamic detail routes with URL parameters
export const USER = '/user/:id';     // Individual user detail page
export const ALBUM = '/album/:id';   // Individual album detail page
export const PHOTO = '/album/:id/photos'; // Photos for a specific album