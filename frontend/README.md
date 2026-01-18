# Frontend Application

A modern React web application for managing dynamic international addresses with country-specific forms and Google Maps integration. Built with React 19, Vite, TailwindCSS, and Shadcn UI.

## Setup Instructions

### 1. Install Dependencies
```bash
cd frontend
pnpm install
```

### 2. Configure Google Maps API

This application uses Google Maps for address autocomplete and validation.

1. Go to Google Cloud Console
2. Enable Places API and Maps JavaScript API
3. Create an API key
4. Add to index.html:

```html
<script async defer 
  src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
</script>
```

### 3. Configure Backend URL

Update API_URL in src/lib/constants.js:

```javascript
export const API_URL = "http://localhost:4000";
```

### 4. Start Development Server

```bash
pnpm run dev
```

Application will start on http://localhost:5173

## Available Scripts

- `pnpm run dev` - Start development server with HMR
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build
- `pnpm run lint` - Run ESLint

## Key Features

### 1. Dynamic Country Selection
- Dropdown for country selection (USA, Australia, Indonesia)
- Form fields adapt based on country requirements
- Real-time validation

### 2. Google Maps Integration
- Address autocomplete with component parsing
- Extracts and auto-fills address components
- Component restrictions to supported countries

### 3. Address Management
- Add addresses with maps integration
- View saved addresses from backend
- Delete addresses with confirmation

### 4. Responsive Design
- Mobile-friendly interface
- Tab-based navigation
- Toast notifications for user feedback

## Component Structure

```
frontend/src/
├── components/
│   ├── address-form.jsx       # Main form with maps
│   ├── country-select.jsx     # Country selector
│   ├── saved-address.jsx      # Address list
│   └── ui/                    # Shadcn UI components
├── lib/
│   ├── constants.js           # Country configs & API URLs
│   └── utils.ts               # Utilities
├── App.jsx                    # Main app
└── main.jsx                   # Entry point
```

## API Integration

**GET /addresses** - Fetch all saved addresses
**POST /addresses** - Create new address
**DELETE /addresses/:id** - Delete address

## Key Technologies

- **React 19**: UI library with hooks
- **Vite**: Build tool with HMR
- **TailwindCSS**: Utility-first CSS
- **Shadcn UI**: Headless components on Radix UI
- **Google Maps API**: Address validation

## Design Decisions & Trade-offs

### React 19 with Hooks
- **Choice**: React 19 functional components
- **Reasoning**: Latest features, improved performance, modern DX
- **Trade-off**: Requires updates from older React versions

### Shadcn UI Components
- **Choice**: Headless component library
- **Reasoning**: Full customization, excellent accessibility, efficient with Vite
- **Trade-off**: Manual installation; more control but requires management

### Dynamic Form Configuration
- **Choice**: JavaScript-based country config
- **Reasoning**: Flexible, easy to add countries, no backend dependency
- **Trade-off**: Client-side; could move to backend for centralization

### Google Maps JavaScript Library
- **Choice**: Official Google Maps library
- **Reasoning**: Trusted, accurate, supports component parsing
- **Trade-off**: Third-party dependency, API costs at scale, requires key management

### React Hooks for State
- **Choice**: useState instead of Redux/Zustand
- **Reasoning**: Sufficient for this scope, minimal boilerplate
- **Trade-off**: May need refactoring if complexity increases

### Trigger-based List Refresh
- **Choice**: State trigger for list updates
- **Reasoning**: Simple, reliable, no complex state management
- **Trade-off**: Not real-time; slight delay; websockets/polling for real-time

## Country Configurations

Defined in src/lib/constants.js:

### USA
- addressLine1, addressLine2, city, region, postalCode

### AUS (Australia)
- addressLine1, addressLine2, suburb, region, postalCode

### IDN (Indonesia)
- addressLine1, addressLine2, city, region, district, village, postalCode

## UI Components Used

- Button, Input, Select/Combobox
- Card, Tabs, Label
- Alert Dialog, Dropdown Menu
- Badge, Separator
- Toast (Sonner)

## Troubleshooting

### Google Maps Not Loading
1. Verify API key is valid
2. Confirm Places API is enabled
3. Check browser console for errors

### Port Already in Use
```bash
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Backend Connection Issues
1. Verify backend runs on http://localhost:4000
2. Check CORS is enabled
3. Verify API URL in src/lib/constants.js

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## Performance Optimization

- Lazy-loaded Google Maps library
- Code splitting with Vite
- Minimal dependencies
- TailwindCSS tree-shaking
- Image optimization

## Future Enhancements

- Form validation schema (Zod/Yup)
- Address history/suggestions
- Batch import functionality
- Real-time validation
- Service workers for offline support
- Internationalization (i18n)
- Address geocoding visualization
