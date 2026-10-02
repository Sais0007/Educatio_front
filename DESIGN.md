# Education Platform Design System

**Document:** DESIGN.md\
**Version:** 1.0\
**Status:** Design Foundation\
**Product:** Education Platform\
**Brand Direction:** Modern, colorful, trustworthy, student-focused

------------------------------------------------------------------------

## 1. Purpose

This document is the visual and interaction design authority for the
Education Platform.

All future public website, student panel, institute panel, branch admin,
faculty, and administrative interfaces should follow this system unless
a documented product requirement requires an exception.

The design should feel:

-   Modern
-   Colorful
-   Educational
-   Trustworthy
-   Clear
-   Friendly
-   Professional
-   Calm rather than visually noisy

The platform should feel like a modern education product, not a generic
SaaS dashboard and not a traditional school-management application.

------------------------------------------------------------------------

## 2. Brand Relationship

The Education Platform is visually inspired by the Hidden Brains brand
identity.

The Hidden Brains logo uses a multi-color visual language built around:

-   Yellow
-   Blue / Cyan
-   Purple
-   Green

The Education Platform should use these colors as its brand foundation
while developing its own product identity.

Do not reproduce the Hidden Brains corporate logo as the
education-platform logo.

The education product should have an independent logo and wordmark while
remaining visually compatible with the parent brand.

------------------------------------------------------------------------

## 3. Design Principles

### 3.1 Learning First

Every important screen should help the learner understand:

-   What is available?
-   Where am I?
-   What should I do next?
-   How am I progressing?
-   What requires attention?

### 3.2 Clear Before Decorative

Visual decoration must never compete with content or actions.

Prefer:

-   Strong hierarchy
-   White space
-   Clear grouping
-   Simple icons
-   Controlled color

Avoid unnecessary:

-   Illustrations
-   Gradients
-   Animations
-   Decorative shapes
-   Large empty hero areas inside authenticated workflows

### 3.3 Color With Meaning

Colors should communicate meaning consistently.

Do not use all brand colors merely for decoration.

### 3.4 Consistency

Buttons, cards, forms, badges, navigation, tables, states, and feedback
patterns should behave consistently across the product.

### 3.5 Accessibility

Color must never be the only way to communicate status.

Text, icons, labels, or patterns should support important states.

### 3.6 Responsive by Default

All screens must work across:

-   Desktop
-   Tablet
-   Mobile

Mobile is not a compressed desktop layout. Components should adapt
intentionally.

------------------------------------------------------------------------

# 4. Color System

## 4.1 Core Brand Palette

### Primary Blue

**HEX:** `#00A8F0`

Use for:

-   Primary interactive accents
-   Links
-   Learning-related UI
-   Active navigation accents
-   Primary progress indicators
-   Informational highlights

### Primary Yellow

**HEX:** `#F6C20F`

Use for:

-   Attention
-   Assignments
-   Important reminders
-   Secondary emphasis
-   Learning highlights

### Intelligent Purple

**HEX:** `#6C63D9`

Use for:

-   Practice
-   Analytics
-   Analytical features
-   Secondary feature accents
-   Supporting emphasis

### Growth Green

**HEX:** `#35C978`

Use for:

-   Success
-   Completion
-   Positive progress
-   Improvement
-   Completed learning states

### Deep Navy

**HEX:** `#12365A`

Use for:

-   Main headings
-   High-priority text
-   Navigation
-   Strong UI labels
-   Brand text

### Light Background

**HEX:** `#F5F8FC`

Use for:

-   Application background
-   Dashboard background
-   Large content surfaces
-   Soft section backgrounds

------------------------------------------------------------------------

## 4.2 Neutral Palette

Use neutral colors to keep the colorful brand palette controlled.

### White

`#FFFFFF`

Primary surface and card background.

### Primary Text

`#12365A`

Use Deep Navy wherever strong text contrast is required.

### Secondary Text

Use a neutral blue-gray derived from the primary visual system.

Recommended starting value:

`#64748B`

### Muted Text

`#94A3B8`

Use for:

-   Supporting metadata
-   Disabled secondary information
-   Timestamps
-   Low-priority descriptions

### Border

`#E2E8F0`

Use for:

-   Card borders
-   Form borders
-   Dividers
-   Table boundaries

### Soft Surface

`#F8FAFC`

Use for:

-   Nested content
-   Secondary containers
-   Form backgrounds when needed

------------------------------------------------------------------------

# 5. Semantic Colors

Semantic colors must communicate meaning consistently.

  Meaning                 Color       Usage
  ----------------------- ----------- ----------------------------------
  Success                 `#35C978`   Completed, successful, passed
  Information             `#00A8F0`   Informational states
  Warning                 `#F6C20F`   Attention, due soon
  Practice / Analytical   `#6C63D9`   Practice and analytical features
  Error                   `#DC3545`   Validation and failure
  Neutral                 `#64748B`   Informational neutral states

Do not use Yellow for destructive/error states.

Do not use Green for actions that have not yet been completed.

------------------------------------------------------------------------

# 6. Color Usage Rules

The interface should not use equal amounts of all four brand colors.

Recommended visual hierarchy:

1.  Deep Navy: structure and typography
2.  Blue: primary interaction
3.  Purple: feature differentiation
4.  Green: positive status
5.  Yellow: attention

A page should normally have one dominant accent and supporting accents.

Avoid:

-   Rainbow cards without meaning
-   Every button using a different color
-   Multiple competing accent colors in one component
-   Strong gradients behind important text

------------------------------------------------------------------------

# 7. Typography

## 7.1 Font Families

### Headings

**Inria Serif**

Use for:

-   H1
-   H2
-   H3
-   Major section titles
-   Selected marketing headlines

The serif style provides an educational, editorial, and distinctive
character.

### Body and UI

**Roboto**

Use for:

-   Body text
-   Navigation
-   Buttons
-   Forms
-   Tables
-   Metadata
-   Labels
-   Dashboard UI

Do not introduce additional font families unless there is a documented
requirement.

------------------------------------------------------------------------

# 8. Typography Scale

The typography reference supplied for the project establishes the
following hierarchy.

  Element            Size Font          Weight
  ---------------- ------ ------------- ------------------
  H1                 68px Inria Serif   Bold
  H2                 52px Inria Serif   Bold
  H3                 40px Inria Serif   Bold
  H4                 28px Inria Serif   Bold
  H5                 20px Inria Serif   Bold
  H6                 16px Inria Serif   Bold
  Paragraph P1       28px Roboto        Bold / Regular
  Paragraph P2       20px Roboto        Bold / Regular
  Paragraph P3       16px Roboto        Bold / Regular
  Paragraph P4       14px Roboto        Medium / Regular
  Button / Label     16px Roboto        Medium / Bold
  Caption            12px Roboto        Regular
  Small Caption      10px Roboto        Regular

For authenticated product interfaces, use responsive sizing rather than
forcing the desktop marketing scale onto small screens.

------------------------------------------------------------------------

# 9. Typography Rules

-   Use Inria Serif primarily for hierarchy and brand character.
-   Use Roboto for operational UI.
-   Do not use all-caps for large blocks of content.
-   Avoid excessive bold text.
-   Keep line lengths readable.
-   Use sentence case for most interface labels.
-   Button labels should describe the action clearly.

Examples:

Good: - Continue Learning - Start Practice - View Result - Submit
Assignment

Avoid: - CLICK HERE - GO - MORE - SUBMIT NOW!!!

------------------------------------------------------------------------

# 10. Spacing System

Use a consistent spacing scale.

Base unit:

**4px**

Recommended scale:

  Token     Value
  ------- -------
  XS          4px
  SM          8px
  MD         12px
  LG         16px
  XL         24px
  2XL        32px
  3XL        40px
  4XL        48px
  5XL        64px
  6XL        80px

Use larger spacing for major page sections and smaller spacing within
components.

------------------------------------------------------------------------

# 11. Border Radius

The product should use modern rounded surfaces without becoming overly
playful.

Recommended:

  Component                 Radius
  ----------------------- --------
  Input                        8px
  Button                       8px
  Small Badge                999px
  Card                        12px
  Modal                       16px
  Large Feature Surface       16px

Avoid excessive rounding on every element.

------------------------------------------------------------------------

# 12. Shadows

Use shadows sparingly.

Preferred approach:

-   Cards: subtle shadow or border
-   Modals: stronger elevation
-   Dropdowns: medium elevation
-   Buttons: normally no heavy shadow

Avoid floating-everything UI.

A card should remain visually stable and readable.

------------------------------------------------------------------------

# 13. Buttons

## Primary Button

Use for the most important action.

Examples:

-   Continue Learning
-   Start Test
-   Submit Assignment
-   Start Practice
-   Create Account

Primary button should use the primary blue treatment.

## Secondary Button

Use for secondary actions.

Examples:

-   View Details
-   Explore
-   Cancel

## Ghost / Text Action

Use for low-emphasis actions.

Examples:

-   View All
-   Back
-   Learn More

## Destructive

Use only for destructive actions.

Examples:

-   Delete
-   Remove
-   Revoke Access

Destructive actions must use the semantic error color.

------------------------------------------------------------------------

# 14. Cards

Cards are a major component of the Education Platform.

Cards should group related information without excessive decoration.

A typical card contains:

-   Optional icon/image
-   Title
-   Supporting metadata
-   Status
-   Progress where relevant
-   Primary or secondary action

Avoid placing too many metrics into one card.

------------------------------------------------------------------------

# 15. Status Badges

Use badges for concise state communication.

Examples:

-   Active
-   Completed
-   In Progress
-   Upcoming
-   Due Soon
-   Locked
-   Expired
-   Submitted
-   Result Ready

Badge color must reflect semantic meaning.

Examples:

Completed → Green\
Upcoming → Blue\
Due Soon → Yellow\
Locked → Neutral\
Error → Red

------------------------------------------------------------------------

# 16. Progress Indicators

Progress is central to the education product.

Use:

-   Progress bars
-   Circular progress only when appropriate
-   Completion indicators

Always show the percentage or meaningful label where useful.

Example:

`72% Complete`

Avoid using progress indicators that look precise when the underlying
data is approximate.

------------------------------------------------------------------------

# 17. Icons

Icons should be:

-   Simple
-   Modern
-   Consistent in stroke/visual weight
-   Easily recognizable

Use icons to support meaning, not replace important labels.

Suggested conceptual mapping:

-   Learning → Book
-   Practice → Target / Activity
-   Tests → Clipboard / Trophy
-   Results → Chart
-   Revision → Bookmark
-   Resources → Document
-   Notifications → Bell
-   Profile → User
-   Assignments → Document / Task
-   Live Class → Video / Camera

Do not mix unrelated icon styles.

------------------------------------------------------------------------

# 18. Forms

Forms should prioritize clarity.

Each field should have:

-   Visible label
-   Input
-   Helpful placeholder only when useful
-   Validation
-   Error message when required

Avoid relying only on placeholders as labels.

Error messages should explain how to correct the issue.

Example:

Bad: `Invalid input`

Better: `Enter a valid email address.`

------------------------------------------------------------------------

# 19. Tables

Use tables for dense operational information such as:

-   Test history
-   Purchases
-   Assignments
-   Resource lists
-   Administrative records

Tables should support:

-   Clear column hierarchy
-   Responsive behavior
-   Sorting where useful
-   Filtering where useful
-   Empty state
-   Loading state
-   Error state

Do not force every dataset into a table. Cards/list layouts are
preferable on mobile and for content discovery.

------------------------------------------------------------------------

# 20. Student Dashboard Direction

The Student Dashboard should be action-oriented.

Primary question:

**What should I do next?**

Recommended information hierarchy:

1.  Continue Learning
2.  Upcoming Activities
3.  Learning Progress
4.  Performance Snapshot
5.  Recommendations
6.  Recent Activity
7.  Purchase / Access summary where relevant

Do not turn the dashboard into a generic analytics dashboard.

Avoid excessive KPI cards and decorative charts.

------------------------------------------------------------------------

# 21. Public Website Direction

The Guest/Public experience should feel:

-   Welcoming
-   Educational
-   Modern
-   Trustworthy
-   Discovery-focused

It should prioritize:

-   Examination discovery
-   Courses
-   Sample Tests
-   Resources
-   About
-   Contact
-   FAQ

The public experience should not expose authenticated student
functionality.

------------------------------------------------------------------------

# 22. Student Panel Direction

The Student Panel should feel more focused and functional than the
public website.

Primary navigation:

-   Dashboard
-   Learning
-   Practice
-   Tests
-   Results / Performance
-   Revision
-   Resources
-   Profile

The authenticated interface should prioritize task completion over
marketing.

------------------------------------------------------------------------

# 23. Education Feature Color Mapping

Use color consistently to help students recognize feature categories.

  Feature               Primary Accent
  --------------------- ----------------
  Learning              Blue
  Practice              Purple
  Tests                 Blue / Purple
  Results               Purple
  Revision              Yellow
  Resources             Green
  Assignments           Yellow
  Live Classes          Green / Blue
  Success / Completed   Green
  Warning / Due Soon    Yellow
  Error                 Red

This mapping should remain consistent throughout the product.

------------------------------------------------------------------------

# 24. Images and Illustrations

Images should support learning or product context.

Prefer:

-   Authentic education imagery
-   Clean academic illustrations
-   Relevant subject visuals
-   Simple abstract brand shapes

Avoid:

-   Generic corporate stock photography
-   Excessive decorative imagery
-   Unrelated 3D illustrations
-   Visually noisy backgrounds

Images should never reduce content readability.

------------------------------------------------------------------------

# 25. Logo System

The Education Platform should have its own logo.

The logo should be visually compatible with the Hidden Brains brand
without being a copy of the Hidden Brains corporate logo.

The final logo system should include:

1.  Horizontal / rectangular logo
2.  Symbol / mark
3.  Wordmark
4.  Light-background version
5.  Dark-background version
6.  Monochrome version
7.  Small-size/icon version

The primary logo should work well in:

-   Website header
-   Student Panel sidebar
-   Login / Signup
-   Mobile header
-   Favicon
-   App icon where required
-   Documents and reports

The logo should use the established education palette:

-   Yellow
-   Blue
-   Purple
-   Green
-   Deep Navy

Do not use all four colors at equal visual weight.

------------------------------------------------------------------------

# 26. Logo Design Direction

The final logo should communicate:

-   Learning
-   Growth
-   Knowledge
-   Progress
-   Technology
-   Opportunity

Avoid overly literal school imagery such as:

-   Generic graduation caps
-   Generic open books
-   Pencil icons
-   School buildings

unless integrated into a distinctive mark.

The logo should remain recognizable at small sizes.

The horizontal/rectangular version should be the primary lockup for the
platform header.

------------------------------------------------------------------------

# 27. Accessibility

The product should target WCAG-aligned accessibility practices.

Important requirements:

-   Adequate text contrast
-   Visible keyboard focus
-   Accessible form labels
-   Accessible error messages
-   Keyboard-accessible dialogs
-   Meaningful button labels
-   Do not rely only on color
-   Touch targets appropriate for mobile
-   Respect reduced-motion preferences where animations exist

------------------------------------------------------------------------

# 28. Responsive Breakpoints

Use the application's established responsive framework if already
defined.

Conceptually support:

-   Mobile
-   Tablet
-   Desktop
-   Large Desktop

Components should reflow rather than simply shrink.

Examples:

Desktop dashboard: Sidebar + multi-column content

Tablet: Reduced columns + adaptable navigation

Mobile: Stacked content + compact navigation

------------------------------------------------------------------------

# 29. Motion

Motion should be subtle and purposeful.

Use animation for:

-   Modal transitions
-   Dropdowns
-   Loading states
-   Progress changes
-   Small interaction feedback

Avoid:

-   Constant movement
-   Large decorative animations
-   Distracting page transitions
-   Animation that delays access to content

------------------------------------------------------------------------

# 30. Empty States

Empty states should explain:

1.  What is empty
2.  Why it may be empty
3.  What the student can do next

Example:

**No courses yet**

"You don't have any active courses right now."

CTA:

"Explore Courses"

Avoid generic:

"No data found."

------------------------------------------------------------------------

# 31. Loading States

Use skeleton loaders where content structure is predictable.

Examples:

-   Course cards
-   Dashboard cards
-   Tables
-   Lists

Avoid full-screen loading indicators for small individual sections.

------------------------------------------------------------------------

# 32. Error States

Errors should be:

-   Clear
-   Human-readable
-   Actionable

Preferred structure:

**Something went wrong**

"We couldn't load your upcoming tests."

**Retry**

Do not expose raw API errors, stack traces, or technical details.

------------------------------------------------------------------------

# 33. Content Tone

The product voice should be:

-   Clear
-   Supportive
-   Professional
-   Encouraging
-   Direct

Avoid excessive motivational language.

Good:

"Continue your Physics course."

"2 tests are scheduled this week."

"Review your mistakes."

Avoid:

"You're doing AMAZING!!! Keep crushing your goals!!!"

The platform should feel trustworthy and mature.

------------------------------------------------------------------------

# 34. Design Anti-Patterns

Do not introduce:

-   Generic SaaS dashboard templates
-   Excessive glassmorphism
-   Excessive gradients
-   Rainbow interfaces without semantic meaning
-   Huge KPI grids
-   Fake analytics
-   Fake student data
-   Unnecessary illustrations
-   Excessive rounded containers
-   Excessive shadows
-   Tiny text
-   Unnecessary popups
-   Duplicate navigation
-   Inconsistent icon styles
-   Multiple unrelated fonts

------------------------------------------------------------------------

# 35. Component Architecture Principle

Prefer reusable components.

Examples:

-   Button
-   Input
-   Select
-   Modal
-   Card
-   Badge
-   Progress
-   Tabs
-   Accordion
-   Table
-   EmptyState
-   ErrorState
-   Skeleton
-   Toast
-   Dropdown
-   Pagination
-   Breadcrumb
-   Navigation

Before creating a new component, check whether an existing component can
be extended.

------------------------------------------------------------------------

# 36. Design Authority Rule

This file is the visual source of truth for future implementation.

When a new screen is designed:

1.  Reuse existing design tokens.
2.  Reuse existing components.
3.  Follow established color semantics.
4.  Follow established typography.
5.  Follow established spacing.
6.  Follow established interaction patterns.
7.  Do not introduce a new visual language without documenting the
    reason.

If a future screen requires a new component or token, update this design
system rather than creating isolated styling.

------------------------------------------------------------------------

# 37. Final Design Direction

The Education Platform should visually communicate:

**Modern technology + trusted education + measurable progress.**

The overall visual character should combine:

-   Deep Navy for trust
-   Blue for technology and learning
-   Purple for intelligence and practice
-   Yellow for energy and attention
-   Green for growth and achievement
-   Inria Serif for educational character
-   Roboto for usability and operational clarity
-   White space for calmness
-   Rounded but controlled components for modernity

The result should be colorful, but disciplined.

The product should feel distinctive without becoming visually noisy.
