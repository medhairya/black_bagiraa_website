# 3D Product Showcase with Blender Models

This enhanced ProductShowcase component now supports 3D Blender models with cool animations and effects!

## Features

### 🎭 3D Model Support
- **GLB Files**: Full support for GLB models with materials and animations
- **OBJ Files**: Support for OBJ models with automatic material application
- **Automatic Loading**: Models are loaded dynamically based on product selection

### ✨ Cool Animations
- **3D Transitions**: Smooth 3D rotations and scaling when switching products
- **Floating Effect**: Gentle floating animation for 3D models
- **Loading States**: Smooth loading transitions between products
- **Particle Effects**: Floating background particles for enhanced atmosphere

### 🎮 Interactive Controls
- **3D/2D Toggle**: Switch between 3D models and 2D images
- **Enhanced Navigation**: Improved arrow buttons with hover effects
- **Touch Support**: Works on both desktop and mobile devices

## How to Use

### 1. Add Your 3D Models
Place your Blender models in the `public/models/` folder:
```
public/models/
├── your-model.glb
├── another-model.obj
└── texture.jpg
```

### 2. Update the Flavours Array
Modify the `flavours` array in `ProductShowcase.js`:

```javascript
const flavours = [
  {
    name: "Your Product",
    bg: backgroundImage,
    can: productImage,
    color: "#your-color",
    model3D: "/models/your-model.glb", // Path to your 3D model
    has3D: true // Set to false if no 3D model
  },
  // ... more products
];
```

### 3. Supported File Formats

#### GLB Files (Recommended)
- ✅ Full material support
- ✅ Built-in animations
- ✅ Smaller file size
- ✅ Better performance

#### OBJ Files
- ✅ Geometry support
- ✅ Automatic material application
- ⚠️ Larger file size
- ⚠️ No built-in animations

### 4. Customization Options

#### Animation Speed
```javascript
<Product3DModel 
  modelPath={flavours[index].model3D} 
  isActive={true}
  animationSpeed={1.5} // Adjust for faster/slower rotation
/>
```

#### Lighting
The component includes:
- Ambient lighting
- Directional lighting with shadows
- Colored point lights
- Environment mapping
- Fog effects

#### Camera Settings
```javascript
<Canvas
  camera={{ position: [0, 0, 5], fov: 50 }}
  // Adjust camera position and field of view
/>
```

## Performance Tips

1. **Optimize Models**: Keep your 3D models under 5MB for best performance
2. **Use GLB**: Prefer GLB over OBJ for better performance
3. **Texture Resolution**: Use appropriate texture resolutions (1024x1024 or lower)
4. **LOD Models**: Consider using Level of Detail models for complex scenes

## Troubleshooting

### Model Not Loading?
- Check file path in `public/models/`
- Ensure file format is supported (.glb or .obj)
- Check browser console for errors

### Performance Issues?
- Reduce model complexity
- Use lower resolution textures
- Enable `powerPreference: "high-performance"` in Canvas

### Animation Not Working?
- GLB files support built-in animations
- OBJ files use automatic rotation/floating effects
- Check if animations are properly exported from Blender

## Dependencies

The component uses these libraries (already installed):
- `@react-three/fiber` - React renderer for Three.js
- `@react-three/drei` - Useful helpers for React Three Fiber
- `three.js` - 3D graphics library
- `framer-motion` - Animation library

## Browser Support

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ⚠️ Mobile browsers (may have performance limitations)

## Example Usage

```jsx
import ProductShowcase from './components/ProductShowcase';

function App() {
  return (
    <div className="App">
      <ProductShowcase />
    </div>
  );
}
```

## Customization

### Colors and Styling
Edit `ProductShowcase.css` to customize:
- Button styles
- Animation timings
- Particle effects
- Responsive breakpoints

### 3D Effects
Modify `Product3DModel.js` to adjust:
- Rotation speed
- Floating animation
- Material properties
- Lighting setup

Enjoy your enhanced 3D product showcase! 🎉
