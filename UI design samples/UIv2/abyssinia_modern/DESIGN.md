```markdown
# Design System: The Modern Tilet

## 1. Overview & Creative North Star
**The Creative North Star: "Precision Heritage"**

This design system moves beyond the generic fintech aesthetic to create a "Digital Tapestry." We are blending the mathematical precision of modern cost management with the rhythmic, geometric soul of Ethiopian craftsmanship. Our goal is to avoid the "template" look by using intentional white space, high-end editorial typography, and a "Tonal Layering" approach that replaces traditional structural lines with shifts in depth and light.

The interface should feel like an expensive, custom-tailored garment—structured yet fluid. We honor the Ethiopian cultural identity not through loud motifs, but through the sophisticated use of the national palette and subtle "Tilet" (traditional weaving) inspired geometric patterns used as rhythmic spacers.

---

## 2. Colors & Surface Logic

We use a sophisticated interpretation of the Ethiopian tricolor. These are not vibrant primary colors, but deep, "Earth-tone" iterations that convey stability and professional trust.

### The Palette (Material Design Tokens)
- **Primary (Green):** `#0d631b` – Used for growth indicators, primary actions, and "Success" states.
- **Secondary (Yellow):** `#795900` – Used for alerts, budget warnings, and high-value accents.
- **Tertiary (Red):** `#ab1118` – Reserved for critical expense overages and high-priority deletions.
- **Surface Scale:** Use `surface` (`#f9f9f9`) for the base and `surface_container_lowest` (`#ffffff`) for elevated interactive cards.

### The "No-Line" Rule
**Explicit Instruction:** Prohibit the use of 1px solid borders for sectioning. 
Boundaries must be defined solely through:
1.  **Background Color Shifts:** A `surface_container_low` card sitting on a `surface` background.
2.  **Tonal Transitions:** Using `surface_container_highest` for a header area to separate it from the body without a "line."

### Glass & Gradient Rule
To achieve a premium, high-end feel, use **Glassmorphism** for floating elements (like bottom navigation bars or modal overlays). 
- **Effect:** `backdrop-blur: 20px` paired with a 60% opacity version of the `surface` color.
- **CTAs:** Use a subtle linear gradient for main buttons, transitioning from `primary` (`#0d631b`) to `primary_container` (`#2e7d32`) at a 135-degree angle. This adds a "jewel-like" depth that flat colors lack.

---

## 3. Typography
Our typography is a dialogue between **Plus Jakarta Sans** (Editorial/Brand) and **Inter** (Utility/Data).

- **Display & Headlines (Plus Jakarta Sans):** These should feel authoritative. Use `display-lg` for dashboard summaries to create a "Big Type" editorial impact.
- **Body & Data (Inter):** Chosen for its exceptional legibility in fintech environments, specifically for transaction lists and multi-language support.
- **Multi-language Nuance:** When rendering **Amharic (Ethiopic script)** or **Afaan Oromo**, increase the `line-height` by 1.2x compared to English. The Ethiopic script is vertically complex; it needs more "oxygen" (white space) between lines to maintain its premium feel.

---

## 4. Elevation & Depth: Tonal Layering

We do not use shadows to create "pop"; we use them to create "atmosphere."

- **The Layering Principle:** Stack `surface-container` tiers. A `surface_container_lowest` (pure white) card should sit on a `surface_container_low` background. This creates a natural, soft lift.
- **Ambient Shadows:** For "floating" elements like FABs or active cards, use a `12px` to `24px` blur with only **4% opacity** using a tinted shadow derived from `on_surface`.
- **The Ghost Border Fallback:** If a border is required for accessibility, use the `outline_variant` token at **15% opacity**. It should be felt, not seen.

---

## 5. Components & Layout Patterns

### Cards (The "Tilet" Card)
Forbid the use of divider lines inside cards. Use vertical white space from our spacing scale (16px, 24px, 32px) to separate content sections.
- **Habesha Pattern Integration:** Use subtle, low-opacity (3%) geometric patterns as a background fill for the top-right corner of a card to designate "Premium" or "Categorized" content.

### Transaction Lists
Instead of a grid, use an asymmetrical editorial layout.
- **Leading Element:** Large, rounded-square icons (`rounded-md`) using the `secondary_container` for background.
- **Data Points:** Right-aligned amounts should use `title-md` (Inter) for numerical clarity.
- **Separation:** Use a 12px vertical gap instead of a horizontal line divider.

### Budget Progress Bars
Move away from "thick" bars. Use a 4px "Hairline" bar. 
- **Unfilled Track:** Use `surface_container_highest`.
- **Filled Track:** Use a gradient from `primary` to `primary_fixed`.
- **Micro-Copy:** Place labels (`label-sm`) *above* the bar, never inside it.

### Ad Space Placeholders
Treat advertisements as "Sponsored Editorials." They must use `surface_container_high` backgrounds with a `rounded-lg` corner radius to match the system, ensuring the UI doesn't feel broken by external content.

### Charts & Data Visualization
- **Line Charts:** Use a 3px stroke width. Fill the area under the line with a vanishing gradient of the `primary` color (10% to 0% opacity).
- **Donut Charts:** Use a "Thin Ring" style (15% thickness) to maintain the minimalist aesthetic.

---

## 6. Do’s and Don’ts

### Do:
- **Do** use intentional asymmetry. A large "Total Balance" display on the left can be balanced by a smaller, detailed "Spending Trend" sparkline on the right.
- **Do** prioritize English, Amharic, and Afaan Oromo equally in the layout phase. Ensure your containers can expand vertically for Ethiopic characters.
- **Do** use the "Tilet" patterns as rhythmic dividers—think of them as digital fabric.

### Don't:
- **Don't** use pure black (`#000000`). Use `on_surface` (`#1a1c1c`) for all text to maintain tonal softness.
- **Don't** use 100% opaque borders. They create "visual noise" that contradicts the minimal fintech goal.
- **Don't** clutter the dashboard. If an element doesn't provide immediate financial insight, move it to a secondary layer.

---

## 7. Signature Pattern: The "Heritage Divider"
In place of a standard horizontal rule, use a 2px tall SVG pattern of a simplified Habesha geometric motif, rendered in `outline_variant` at 20% opacity. This acts as a cultural signature that anchors the user in the Ethiopian identity without overwhelming the modern fintech functionality.```