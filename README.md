<div align="center">

<img src="public/images/logo.png" alt="Rim Logo" width="120" height="120">

# Rim

**Fast, intuitive border radius calculations for better design consistency**

</div>

## 🎯 Why Rim?

Ever struggled with nested elements where border radius just doesn't look *right*? You set the same radius on both outer container and inner content, but somehow the inner corners look sharper and visually inconsistent?

**I built Rim to solve this personal frustration.** After countless designs where nested radius values looked off, I wanted a simple tool to calculate the *correct* outer radius based on your desired inner radius and padding.

## 🧮 The Simple Math

The solution is beautifully simple:

```
outer_radius = inner_radius + padding
```

**Instead of guessing**, start with your desired inner content radius, add your padding, and get the perfect outer radius that maintains visual harmony.

## 🎨 Main Features

Rim provides a live, interactive demonstration showing:

- ✅ **Correct approach**: Calculated outer radius maintains design consistency
- ❌ **Wrong approach**: Same radius on both elements creates visual inconsistency
- 🎛️ **Real-time calculator**: Adjust inner radius, padding, and dimensions to see immediate results
- 📐 **Visual comparison**: Side-by-side preview of right vs wrong implementations

Perfect for card layouts, buttons, form inputs, modals, and navigation components.

## 🚀 Get Started

```bash
# Clone the repository
git clone https://github.com/ahmadrafidev/rim.git

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Visit `http://localhost:3000` to start calculating better radius values!

## 🤝 Make Rim Better

**Help make design consistency effortless for everyone!** 

Whether you're a designer tired of eyeballing radius values, a developer seeking pixel-perfect implementations, or someone who just loves clean, mathematical solutions to design problems – **your contributions are welcome**.

### Ways to Contribute

- 🐛 **Found a bug?** Open an issue
- 💡 **Have an idea?** Share it in discussions  
- 🎨 **Design improvements?** Submit a PR
- 📖 **Better documentation?** Always appreciated
- 🧮 **New calculation methods?** Let's explore together

**Together, we can eliminate visual inconsistency one radius at a time.**

---

<div align="center">

Built with ❤️ for designers and developers who care about the pixel details.

[🌐 Try Rim](https://rimm.vercel.app/) • [🐛 Report A Bug](https://github.com/ahmadrafidev/rim/issues)

</div>
