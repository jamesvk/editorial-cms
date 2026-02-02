Articles CMS
A lightweight Editorial Content Management System (CMS) built with React and the Context API. This project demonstrates modern frontend patterns for global state management, controlled forms, list rendering, accessibility-first UI, and responsive layout using CSS Grid.

Features
* Global State with Context API
    * Centralized article data, filters, selection state, and update actions
    * Clean “public API” pattern for consuming components
* Article List & Selection
    * Filter by Search, Category, and Status
    * Sort by Last Updated, Publish Date, or Headline (A–Z)
    * Stable list rendering using unique IDs as React keys
* Editor with Save / Cancel Workflow
    * Local draft buffer for editing without mutating global state
    * useEffect-based synchronization when a new article is selected
* Tags System
    * Add and remove tags
    * Prevents duplicates (case-insensitive)
    * Uses useRef for lightweight, uncontrolled input handling
* Responsive Layout
    * CSS Grid-based layout for predictable alignment
    * clamp(), max-content, and grid-column: 1 / -1 for adaptive sizing
* Accessibility & UI Polish
    * Semantic form labels and fieldsets
    * :focus-visible for keyboard navigation
    * backdrop-filter for modern “frosted glass” header

Tech Stack
* React (Functional Components + Hooks)
* Context API (Global state management)
* JavaScript (ES2020+)
* CSS Grid & Modern CSS

📁 Project Structure
src/
├── context/
│   └── ArticlesContext.jsx   # Global state and public API for articles
├── components/
│   ├── FiltersPanel.jsx     # Search, filter, and sort controls
│   ├── ArticleList.jsx     # Renders filtered/sorted list of articles
│   └── ArticleEditor.jsx  # Editable article form and tags system
├── App.jsx                # Layout and composition
└── App.css              # Global styles and layout system

Architecture Overview
Context as a “Public API”
The ArticlesContext exposes a value object that acts as the system’s public interface:
* Data: articles, visibleArticles, selectedArticle
* Filters: searchText, categoryFilter, statusFilter, sortMode
* Actions: setSearchText, setCategoryFilter, updateArticle, resetDemoData, etc.
Components consume only what they need via:
const { visibleArticles, setSelectedArticleId } = useArticles();
This keeps the system modular, predictable, and easy to extend.

Editor State Pattern (Draft Buffer)
The editor maintains a local draft copy of the selected article:
* selectedArticle → Global source of truth (Context)
* draft → Local editable buffer (Component state)
This enables:
* Save → Commit changes to global state
* Cancel → Revert to original article
Synchronization is handled with:
useEffect(() => {
  setDraft(selectedArticle);
}, [selectedArticle]);
This ensures the draft resets only when a new article is selected, not on every re-render.

Tags System (Refs vs State)
The tag input uses useRef instead of state:
* Avoids re-rendering on every keystroke
* Reads input value only when "Add" is clicked
* Allows imperative DOM actions like .focus() and .value = ""
Safe access pattern:
const raw = tagInputRef.current?.value ?? "";
This prevents crashes if the input is not mounted yet.

Layout & CSS Highlights
Global Box Model
*, *::before, *::after {
  box-sizing: border-box;
}
Ensures padding and borders are included in element width calculations for predictable layouts.
Grid-Based Forms
grid-template-columns: clamp(60px, 20vw, 110px) 1fr;
* Fixed-but-responsive label column
* Flexible input column
Full-Width Grid Spanning
grid-column: 1 / -1;
Spans content from the first grid line to the last, regardless of column count.
Accessibility
* <label> and <fieldset> for semantic grouping
* :focus-visible for keyboard-only focus outlines

Getting Started
Install Dependencies
npm install
Run Development Server
npm run dev

