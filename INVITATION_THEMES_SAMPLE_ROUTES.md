# Wedding Invitation Themes - Sample Routes

This document shows how to access and test the converted wedding invitation templates.

## Available Routes

### 1. Sample Invitation Routes (for testing)
These routes display sample wedding invitations with different themes for testing purposes:

```
GET /sample-invitation/{themeId}
```

**Available Theme IDs:**
- `autumn` - Autumn Elegance theme
- `classy-flower` - Classy Flower theme
- `luxee-elegance` - Luxee Elegance theme (inspired by modern wedding design)
- `luxee-premium` - Luxee Premium theme (enhanced version inspired by luxee.net)
- `unique-modern` - Unique Modern theme (futuristic design with neon effects and animations)
- `classic-autumn` - Classic Autumn theme (faithful recreation of original template)
- `classy-gold-blue` - Classy Gold Blue theme
- `dark-flower` - Dark Flower theme

**Example URLs:**
- http://localhost:8000/sample-invitation/autumn
- http://localhost:8000/sample-invitation/classy-flower
- http://localhost:8000/sample-invitation/luxee-elegance
- http://localhost:8000/sample-invitation/luxee-premium
- http://localhost:8000/sample-invitation/unique-modern
- http://localhost:8000/sample-invitation/classic-autumn
- http://localhost:8000/sample-invitation/classy-gold-blue
- http://localhost:8000/sample-invitation/dark-flower

### 2. Real Wedding Invitation Routes
These routes display actual wedding invitations from the database:

```
GET /invitation/{slug}
GET /invitation/{slug}/theme/{themeId}
```

**Parameters:**
- `slug` - Wedding slug from database
- `themeId` - Theme ID (optional, defaults to wedding's assigned theme)

**Example URLs:**
- http://localhost:8000/invitation/john-jane-wedding
- http://localhost:8000/invitation/john-jane-wedding/theme/autumn

## Sample Data

The sample routes use pre-configured sample data including:

### Wedding Information
- **Couple**: John & Jane
- **Date**: December 25, 2024
- **Reception**: Grand Ballroom Hotel, Jakarta
- **Ceremony**: St. Mary Church, Jakarta
- **Features**: Countdown, Gallery, Guestbook, Music, Donation

### Sample Features
- ✅ Cover section with couple names
- ✅ Quote section with wedding quotes
- ✅ Couple information with photos
- ✅ Countdown timer to wedding date
- ✅ Location cards with Google Maps integration
- ✅ Photo gallery with lightbox
- ✅ Guestbook with RSVP functionality
- ✅ Donation/gift section
- ✅ Music player (floating button)
- ✅ COVID protocol information
- ✅ Live streaming section

## Testing the Themes

### 1. Test All Themes
Visit each sample route to see how different themes look:

```bash
# Autumn theme (warm browns/golds)
curl http://localhost:8000/sample-invitation/autumn

# Classy Flower theme (soft pastels)
curl http://localhost:8000/sample-invitation/classy-flower

# Classy Gold Blue theme (navy/gold)
curl http://localhost:8000/sample-invitation/classy-gold-blue

# Dark Flower theme (purple/pink)
curl http://localhost:8000/sample-invitation/dark-flower
```

### 2. Test Responsive Design
- Open the invitation in your browser
- Use browser dev tools to test mobile/tablet views
- Check that all sections are properly responsive

### 3. Test Interactive Features
- Click the music player button (bottom right)
- Test the countdown timer
- Try the guestbook form
- Test the gallery lightbox
- Check Google Maps integration

## Development Notes

### Theme Structure
Each theme follows this structure:
1. **Cover Section** - Hero image with couple names
2. **Quote Section** - Optional wedding quotes
3. **Couple Section** - Bride and groom information
4. **Countdown Section** - Optional countdown timer
5. **Location Section** - Venue details with maps
6. **Gallery Section** - Photo gallery
7. **Donation Section** - Gift/donation options
8. **Guestbook Section** - RSVP and comments
9. **Footer** - Thank you message

### Customization
To customize themes, edit the theme files in:
```
resources/js/invitation-themes/themes/
├── autumn.ts
├── AutumnTheme.tsx
├── classy-flower.ts
├── ClassyFlowerTheme.tsx
└── ...
```

### Adding New Themes
1. Create theme configuration file (`themes/my-theme.ts`)
2. Create theme component file (`themes/MyTheme.tsx`)
3. Register theme in `ThemeRegistry.tsx`
4. Add route for testing

## Troubleshooting

### Common Issues

1. **Theme not found error**
   - Check that theme ID is correct
   - Verify theme is registered in `ThemeRegistry.tsx`

2. **Images not loading**
   - Check image paths in sample data
   - Verify placeholder service is working

3. **Google Maps not showing**
   - Check `GOOGLE_MAPS_API_KEY` environment variable
   - Verify API key has proper permissions

4. **Music not playing**
   - Check audio file path
   - Verify browser allows autoplay

### Debug Mode
Add `?debug=1` to any URL to see debug information:
```
http://localhost:8000/sample-invitation/autumn?debug=1
```

## Next Steps

1. **Test all themes** using the sample routes
2. **Customize themes** to match your design requirements
3. **Add real wedding data** to test with actual content
4. **Integrate with existing system** for production use
5. **Add more themes** as needed

## Support

For issues or questions about the invitation themes system, check:
- Theme documentation: `resources/js/invitation-themes/README.md`
- Component documentation: `resources/js/invitation-themes/components/BaseComponents.tsx`
- Type definitions: `resources/js/invitation-themes/types.ts`
