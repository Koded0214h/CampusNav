# Responsive Design Documentation

## 📱 Mobile-First Strategy

The entire CampusNav application has been built with a **mobile-first approach**, meaning:
- Base styles are designed for mobile (< 640px)
- Desktop enhancements are added using `md:` and `lg:` breakpoints
- All views work seamlessly from 375px to 1920px+

---

## 🎯 Breakpoints Used

```
Mobile (default)  : 0px - 639px    - Base styles
sm:              : 640px+          - Small devices
md:              : 768px+          - Tablets
lg:              : 1024px+         - Desktops
xl:              : 1280px+         - Large screens
```

---

## 📐 Responsive Patterns Applied

### 1. Grid Layouts

#### DashboardScreen
```jsx
// Mobile: 1 column
// Tablet: 2 columns (md:col-span-2)
// Desktop: 4 columns (lg:col-span-4)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
```

#### StudentProfileScreen
```jsx
// Mobile: Full width sidebar
// Desktop: 4-column sidebar (lg:col-span-4)
<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
```

### 2. Sidebar Layouts

#### SearchMapScreen & NavigationScreen
```jsx
// Mobile: Full width, docked at bottom (70vh max-height)
// Desktop: Fixed 400-420px sidebar on left
<aside className="w-full lg:w-[420px] lg:h-full max-h-[70vh] lg:max-h-screen">
```

#### LocationDetailsScreen
```jsx
// Mobile: Full width panel at top
// Desktop: Fixed left panel with map on right
<div className="w-full lg:w-full lg:max-w-md lg:fixed">
```

### 3. Hidden/Visible Elements

```jsx
// Hidden on mobile, visible on desktop
<div className="hidden lg:flex">Desktop Only</div>

// Hidden on desktop, visible on mobile
<div className="lg:hidden">Mobile Only</div>

// Responsive display
<div className="hidden md:flex">Tablet and Up</div>
```

### 4. Responsive Spacing

```jsx
// Responsive padding
<div className="px-4 sm:px-6 lg:px-8">

// Responsive gap
<div className="gap-4 md:gap-6 lg:gap-8">

// Responsive font size
<h1 className="text-2xl sm:text-3xl lg:text-4xl">
```

---

## 🔄 Component Responsive Examples

### Button Component
- **Small (sm)**: 10px padding, text-sm
- **Medium (md)**: 24px padding, text-base
- **Large (lg)**: 32px padding, text-lg
- **Full**: 100% width on mobile, responsive on desktop

### InputField Component
- **Mobile**: Full width, 12px left padding for icons
- **Desktop**: Full width with proper spacing
- Consistent focus state: `focus:ring-2 focus:ring-primary/40`

### Header/Navigation
- **Mobile**: Flexwrap with overflow-x-auto
- **Desktop**: Proper spacing without wrapping
- Icons remain visible, text hidden if needed

---

## 📱 Screen-by-Screen Responsive Details

### SplashScreen
- ✅ Logo: 128px (mobile) → 160px (md)
- ✅ Heading: text-5xl (mobile) → text-6xl (md)
- ✅ Buttons: Full width (mobile) → auto width (md)
- ✅ Padding: 24px (mobile) → 48px (md)

### SignUpScreen & SignInScreen
- ✅ Form: Full width with 6px padding (mobile) → 10px padding (sm)
- ✅ Card: max-w-[480px] with responsive padding
- ✅ Input fields: Full width with 12px left padding for icons
- ✅ Buttons: Full width

### DashboardScreen
- ✅ Navigation: Sticky, responsive padding
- ✅ Profile card: Full width (mobile) → 1/4 width (lg)
- ✅ Content: Full width with responsive gaps
- ✅ Menu: Vertical on all sizes, responsive text

### SearchMapScreen
- ✅ Sidebar: Full width bottom drawer (mobile) → 420px left panel (lg)
- ✅ Categories: 3 columns (mobile) → 2 columns (lg)
- ✅ Search input: Full width with icon
- ✅ Map: Hidden on mobile, shown on desktop
- ✅ Max height: 70vh on mobile to show content below

### NavigationScreen
- ✅ Sidebar: Full width bottom drawer (mobile) → 400px left panel (lg)
- ✅ Transport modes: Flex wrap on mobile for single row
- ✅ Directions: Stacked on mobile
- ✅ Map: Hidden on mobile, shown on desktop

### LocationDetailsScreen
- ✅ Panel: Full width (mobile) → Fixed md with max-w-md (lg)
- ✅ Image: Full width on mobile, max height on desktop
- ✅ Amenities grid: 1 column on mobile → 2 columns on desktop
- ✅ Map: Hidden on mobile, shown on desktop

### StudentProfileScreen
- ✅ Navigation: Sticky with responsive padding
- ✅ Sidebar: Full width (mobile) → 1/3 width (lg)
- ✅ Content: Stacked on mobile → side by side on desktop
- ✅ Tabs: Horizontal scroll on mobile, normal on desktop
- ✅ Search: Hidden on mobile, visible on md+

---

## 🎨 Tailwind CSS Classes Used

### Spacing
```
p-4 sm:p-6 lg:p-8      // Padding
m-4 sm:m-6 lg:m-8      // Margin
gap-4 sm:gap-6 lg:gap-8 // Gap
```

### Display
```
hidden lg:block         // Hide on mobile, show on desktop
lg:hidden              // Show on mobile, hide on desktop
flex lg:hidden         // Default flex, hidden on desktop
```

### Grid
```
grid-cols-1            // Single column (mobile default)
md:grid-cols-2         // 2 columns on tablet
lg:grid-cols-4         // 4 columns on desktop
```

### Width
```
w-full                 // 100% width
lg:w-[420px]          // Fixed 420px on desktop
lg:max-w-md            // Max 448px on desktop
```

### Height
```
h-auto                 // Automatic height
lg:h-full             // Full height on desktop
max-h-[70vh]          // Max 70% viewport height
```

---

## ✅ Testing Checklist

### Mobile (375px - 639px)
- [ ] All text readable without zoom
- [ ] Buttons easily tappable (48px minimum)
- [ ] No horizontal scroll
- [ ] Sidebar is bottom drawer or stacked
- [ ] Images scale properly
- [ ] Forms are single column

### Tablet (640px - 1023px)
- [ ] 2-column layouts show correctly
- [ ] Sidebar transitions to side panel
- [ ] Navigation is proper spacing
- [ ] No overlapping elements
- [ ] Images look good

### Desktop (1024px+)
- [ ] 4-column grids display
- [ ] Sidebars are fixed size
- [ ] Map views show alongside content
- [ ] All features visible and accessible
- [ ] Optimal spacing and alignment

---

## 🔧 Adding Responsive Classes

### Pattern 1: Progressive Enhancement
```jsx
<div className="text-base sm:text-lg md:text-xl lg:text-2xl">
  // Mobile: 16px → Tablet: 18px → Desktop: 20px → Large: 24px
</div>
```

### Pattern 2: Mobile Hide/Show
```jsx
<div className="hidden md:block">
  // Hidden on mobile and small tablet, visible md and up
</div>
```

### Pattern 3: Column Adjustment
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
  // Mobile: 1 col → Tablet: 2 cols → Desktop: 4 cols
</div>
```

### Pattern 4: Flexbox Wrapping
```jsx
<div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
  // Mobile: Vertical stack → Tablet: Horizontal with gap
</div>
```

---

## 📊 Responsive Metrics

| Metric | Mobile | Tablet | Desktop |
|--------|--------|--------|---------|
| Max Width | 100% | 100% | 1280px |
| Padding | 16px | 24px | 32px |
| Font Size | 14px | 16px | 16px |
| Gap | 16px | 24px | 32px |
| Breakpoint | N/A | 640px | 1024px |

---

## 🎯 Best Practices Applied

✅ **Mobile First**: Start with mobile, enhance for larger screens
✅ **Touch Targets**: Buttons minimum 48px × 48px on mobile
✅ **Readability**: Font sizes scale appropriately
✅ **Spacing**: Consistent gaps and padding across devices
✅ **Flexibility**: Content adapts, never cuts off
✅ **Images**: Use `object-cover` and `object-contain`
✅ **Navigation**: Responsive and accessible on all sizes
✅ **Performance**: Only load necessary assets per device

---

## 🚀 Future Enhancements

- [ ] Landscape orientation support
- [ ] Dynamic font sizing based on viewport
- [ ] Touch gesture optimization
- [ ] Viewport height considerations for mobile
- [ ] Safe area insets for notched devices
- [ ] High DPI image optimization

---

**Generated**: 2026-01-21
**Tailwind Version**: Latest (via Vite)
**Mobile Support**: iOS 12+, Android 5+
