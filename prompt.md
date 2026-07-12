# CarMatrix Frontend Development Instructions

You are a senior Frontend Software Engineer, UI/UX Designer, and React Architect.

Your responsibility is to design and build a complete production-quality frontend for my existing backend.

This is a portfolio project and must look like a real-world SaaS application used by millions of users.

Do not build a simple CRUD dashboard.

Build a polished, premium dealership management platform.

------------------------------------------------------------
IMPORTANT
------------------------------------------------------------

The backend is already completed.

DO NOT modify backend APIs.

DO NOT create new backend endpoints.

Only consume the APIs available in the supplied OpenAPI (Swagger) specification.

If a feature requires an API that does not exist in the OpenAPI specification, clearly report it instead of inventing an endpoint.

Never hardcode business data.

Everything must come from the backend whenever possible.

------------------------------------------------------------
BEFORE WRITING CODE
------------------------------------------------------------

Before generating code:

1. Read the complete OpenAPI specification.
2. Understand every endpoint.
3. Understand authentication flow.
4. Understand request and response models.
5. Identify reusable UI components.
6. Design the frontend architecture.
7. Then start implementation.

Do not immediately generate code.

Think through the application first.

------------------------------------------------------------
TECH STACK
------------------------------------------------------------

Use:

• React 19
• Vite
• TypeScript
• React Router
• Axios
• TanStack Query
• React Hook Form
• Zod
• Ant Design
• Framer Motion
• React Icons

Use functional components only.

Do not use class components.

------------------------------------------------------------
PROJECT STRUCTURE
------------------------------------------------------------

Create a scalable production architecture.

Example:

src/

    api/

    assets/

    components/
        common/
        cards/
        forms/
        layout/
        tables/
        modal/
        buttons/

    hooks/

    layouts/

    pages/

    routes/

    context/

    services/

    utils/

    constants/

    types/

    theme/

Organize files logically.

Avoid duplicated code.

------------------------------------------------------------
DESIGN GOAL
------------------------------------------------------------

The application should feel like a premium automotive dealership platform.

Design inspiration:

• Tesla
• Porsche
• Mercedes-Benz
• BMW
• Stripe Dashboard
• Linear
• Vercel Dashboard
• Notion

Avoid looking like:

• Bootstrap Admin Panel
• Basic CRUD Project
• College Assignment

The interface should feel modern, clean, luxurious and enterprise-ready.

------------------------------------------------------------
THEME
------------------------------------------------------------

I will provide a theme component.

Use ONLY the supplied theme.

Do not invent another color palette.

Use the theme throughout the entire application.

Use Ant Design Theme Provider.

Maintain consistent colors, spacing, typography, shadows and border radius.

------------------------------------------------------------
DESIGN PRINCIPLES
------------------------------------------------------------

Use:

• Excellent typography
• Large whitespace
• Consistent spacing
• Rounded corners
• Soft shadows
• Glassmorphism only where appropriate
• Premium cards
• Beautiful tables
• Responsive layouts

Animations should be subtle and professional.

Never overuse gradients.

Never overuse animations.

Focus on usability.

------------------------------------------------------------
APPLICATION REQUIREMENTS
------------------------------------------------------------

Build the following pages.

------------------------------------------------------------
1. Login
------------------------------------------------------------

Must contain

• Application Logo
• Application Name
• Welcome Message
• Email
• Password
• Show/Hide Password
• Remember Me (optional)
• Login Button
• Register Link
• Validation Messages
• API Error Messages
• Loading State

------------------------------------------------------------
2. Register
------------------------------------------------------------

Must contain

• Full Name
• Email
• Password
• Confirm Password
• Register Button
• Login Link
• Validation
• Success Notification
• Error Notification

------------------------------------------------------------
3. Dashboard
------------------------------------------------------------

Must contain

• Navigation
• Sidebar
• User Profile
• Statistics Cards
• Recent Activity
• Quick Actions
• Inventory Summary
• Charts (if supported by available APIs)

Dashboard should immediately communicate business information.

------------------------------------------------------------
4. Vehicle Listing
------------------------------------------------------------

Must contain

• Search
• Category Filter
• Price Filter
• Availability Filter
• Sorting
• Pagination
• Vehicle Cards
• Loading Skeleton
• Empty State
• Error State

Vehicle Card should contain

• Vehicle Image
• Make
• Model
• Category
• Price
• Quantity
• Purchase Button
• View Details

Purchase button must automatically disable when quantity becomes zero.

------------------------------------------------------------
5. Vehicle Details
------------------------------------------------------------

Must contain

• Vehicle Image
• Make
• Model
• Category
• Price
• Stock
• Description
• Purchase Button
• Back Button

------------------------------------------------------------
6. Admin Vehicle Management
------------------------------------------------------------

Must contain

• Vehicle Table
• Search
• Pagination
• Sorting
• Add Vehicle
• Edit Vehicle
• Delete Vehicle
• Confirmation Dialog

------------------------------------------------------------
7. Add Vehicle
------------------------------------------------------------

Must contain

• Make
• Model
• Category
• Price
• Quantity
• Image
• Description
• Validation
• Submit
• Cancel

------------------------------------------------------------
8. Edit Vehicle
------------------------------------------------------------

Same fields as Add Vehicle.

Existing values must be prefilled.

------------------------------------------------------------
GLOBAL FEATURES
------------------------------------------------------------

The application must include:

• Protected Routes
• Guest Routes
• Authentication Persistence
• Loading Screens
• Skeleton Loading
• Empty States
• Toast Notifications
• API Error Handling
• Unauthorized Page
• 404 Page
• Responsive Design
• Dark Mode
• Light Mode
• Language Switcher
• Reusable Components

------------------------------------------------------------
SEARCH
------------------------------------------------------------

Filtering should support:

• Keyword
• Category
• Price Range
• Availability
• Sorting

Filter changes should automatically update API requests.

------------------------------------------------------------
API
------------------------------------------------------------

Use:

Axios

Single Axios Instance

Axios Interceptors

Centralized API layer

No fetch()

No duplicated API logic.

------------------------------------------------------------
STATE MANAGEMENT
------------------------------------------------------------

Use:

React Context for Authentication

TanStack Query for Server State

React Hook Form for Forms

Do not use Redux.

------------------------------------------------------------
VALIDATION
------------------------------------------------------------

Use:

React Hook Form

Zod

Show friendly validation messages.

Disable submit buttons while requests are running.

Prevent duplicate submissions.

------------------------------------------------------------
ERROR HANDLING
------------------------------------------------------------

Every API request must support:

Loading

Success

Error

Empty

Retry

Unauthorized

------------------------------------------------------------
COMPONENTS
------------------------------------------------------------

Create reusable components.

Examples:

VehicleCard

SearchBar

FilterPanel

StatCard

PriceBadge

StockBadge

QuantityBadge

LoadingOverlay

SkeletonCard

PageHeader

ConfirmDialog

EmptyState

SectionTitle

Reusable Form Components

------------------------------------------------------------
ANIMATIONS
------------------------------------------------------------

Use Framer Motion.

Use subtle:

Fade

Scale

Slide

Hover Elevation

Micro interactions

Animations should improve UX, not distract users.

------------------------------------------------------------
ACCESSIBILITY
------------------------------------------------------------

Support:

Keyboard Navigation

ARIA Labels

Semantic HTML

Accessible Forms

Proper Contrast

------------------------------------------------------------
RESPONSIVE
------------------------------------------------------------

Support:

Desktop

Tablet

Mobile

Avoid horizontal scrolling.

Cards and tables should adapt gracefully.

------------------------------------------------------------
PERFORMANCE
------------------------------------------------------------

Implement:

Lazy Loading

Route Code Splitting

Optimized Re-renders

React Query Caching

Memoization where appropriate

------------------------------------------------------------
INDIAN LOCALIZATION
------------------------------------------------------------

Use:

₹ Indian Rupee everywhere.

Date formatting should follow Indian conventions.

Number formatting should use Indian locale.

------------------------------------------------------------
QUALITY
------------------------------------------------------------

Write production-quality code.

Use clean architecture.

No duplicated code.

No unused code.

No "any" type.

Use meaningful names.

Write code that could be maintained by a professional engineering team.

------------------------------------------------------------
FINAL GOAL
------------------------------------------------------------

The finished application should look like a real SaaS platform that could be deployed today.

Prioritize:

• User Experience
• Clean Design
• Maintainability
• Scalability
• Performance
• Accessibility
• Reusability

Do not simplify the interface.

Build something worthy of a professional portfolio.

Use the supplied OpenAPI specification for every backend integration.

Never modify backend contracts.