# Bubby's Menu

## Current State
Full restaurant site with hero, brand story, tabbed menu (Pancakes/Breakfast/Lunch/Drinks), cart system, order tab, reservation section, testimonials, CTA, and footer. Warm cream/brown/red color scheme partially applied.

## Requested Changes (Diff)

### Add
- High-quality generated food images for menu items (pancakes with syrup, eggs benedict, burger, lemonade, etc.)

### Modify
- **Menu UI**: Upgrade to premium card layout — horizontal card with image on left, name/description/price on right. Tabs remain (Pancakes, Breakfast, Lunch, Drinks). Add hover lift effects, better spacing, more food-app polish.
- **Colors**: Enforce exact palette — background #FFF8F0 (cream), primary #8B4513 (brown), accent #C0392B (red). Remove any remaining tech-style blues or grays.
- **Reservation section**: Ensure form has Name, Date, Time, Guests fields with clean booking-system styling.
- **Testimonials**: Each review shows 5 gold stars, quote text, and customer name (e.g. Sarah M., John D.). Better card spacing.
- **CTA section**: "Ready to Experience Bubby's?" with subtext "Reserve your table today or order online." and two buttons: [Reserve Table] [Order Online].

### Remove
- Nothing removed

## Implementation Plan
1. Update CSS/Tailwind tokens to enforce #FFF8F0, #8B4513, #C0392B palette site-wide
2. Redesign menu cards to horizontal layout with image left, details right, hover effects
3. Generate high-quality food images for each menu item
4. Upgrade reservation form styling to look like a real booking system
5. Redesign testimonials with star ratings and customer names
6. Update CTA section with exact copy and two action buttons
