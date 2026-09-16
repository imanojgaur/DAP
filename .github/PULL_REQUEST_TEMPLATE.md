## 📝 Context 
<!-- What is the purpose of this PR? What bug were you fixing or what feature were you adding? -->

## 🚀 What Changed (crisp)
<!-- Bullet points of the literal files or logic you touched -->
### ✨**Features Added** or 
<!-- (Things the user will notice) -->
- Added user authentication routing structure.
- Implemented "Add to Cart" state persistence.
### 🛠️ Refactoring & Tech Debt
<!-- (Things only developers care about) -->
- Unified editorial layout into responsive grid. (This is where your change goes!)
- Decoupled Tailwind layout classes from data configuration (home.confi.ts).
- Abstracted carousel skeletons into a single shared dictionary to prevent DOM desyncs.
### ⚡Performance 
- Implemented parallel data fetching for carousels to improve First Contentful Paint.
- Leveraged native image lazy-loading to eliminate unnecessary network requests.
### 🐛 Bug Fixes
<!-- (Things that were broken and are now fixed) -->
Fixed 2px layout shift on the category carousel header.
### 🏗️ Infrastructure & Architecture
<!-- (Foundational setup, routing, and core configuration) -->
- Initialized `(auth)` route group to isolate authentication layouts from the main store.
- Configured secure API route structure for future NextAuth/provider integration.
- Set up foundational Shadcn UI drawer components for the upcoming login flow.
Resolved mobile padding bleed issue.
### 📚 Documentation & Setup
- Added .env.example to streamline local development setup.
- Restructured README.md with project overview and placeholders for future video demos.

### **🗺️ Reviewer Guide (Key Files)**
<!-- Don't list every file. Just tell the reviewer where to start and what the big files do. -->
<!-- eg -->
* `page.tsx`: **Start here.** This contains the new server-side data transformation adapters.
* `smart-media.tsx`: The brain of the new CDN routing logic.
* `section-wrapper.tsx` & `image-cover.tsx`: The base layout composers. (The rest of the component files are just UI fragments plugging into these).

## 🛠️ Approach (descriptive)
<!-- How did you solve it at an architectural level? (e.g., Component composition, hardware acceleration) -->
<!-- e.g > a. The "God Component" Layout Generator 
* ***Problem 1...2..3:*** Highly controlable layout either on desktop or mobile. But cause prop hell 
* ***solution 1..2..3:***  -->


## 📸 Visual Proof
<!-- Drag and drop your screenshots or Loom video links right here -->

## ✅ Pre-Merge Checklist 
- [ ] Passed next build
- [ ] Tested on Desktop (Mouse & Trackpad)
- [ ] Tested on Mobile (Touch Swipes)
- [ ] No unnecessary React re-renders verified via Profiler
- [ ] UI is responsive and looks premium on all screen sizes