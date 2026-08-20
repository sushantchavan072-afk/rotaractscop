# Final Responsive, Interaction, and Performance QA Report

## Project

`C:\Users\HP\Downloads\rotaractscop-main\rotaractscop-main`

## Build and code quality

The final production build completed successfully with `npm run build`. The build generated a separate Events route chunk after event data was moved into `src/data/events.ts`, preventing the navbar and homepage from statically importing the full Events page.

`npm run lint` completed with **0 errors** and existing non-blocking Fast Refresh warnings in `MessagesTab.tsx` and `theme-provider.tsx`.

## Responsive QA coverage

The responsive code was reviewed against the requested narrow 9:16 and wide 16:9 mobile conditions. The mobile-specific areas checked were the navbar logo and controls, pill-shaped selected navigation, viewport-safe event/member filter menus, compact homepage calendar, mobile member-card grid, member-card flip content, testimonial profile controls, Contact form fields, and the Contact discussion select.

The mobile rules use responsive breakpoints, viewport-safe fixed filter menus, `max-h` constraints based on `100dvh`, compact card typography, controlled grid gaps, no-wrap testimonial controls, and mobile-safe form select padding. Desktop sizing remains protected by `sm` and larger breakpoint utilities.

## Interaction checks

The event modal flow is wired through the Events card click handlers and the shared Dialog component. Both Paintscape and Brandscape use the uploaded local event images and the updated completed-event data. The homepage event list uses the same shared event data.

The Contact form includes the Name, Email address, discussion select, Message, validation feedback, submission state, success state, and mailto fallback. The discussion select now uses a custom aligned ChevronDown icon with extra right padding and rounded focus treatment.

The custom cursor was moved outside the isolated application stacking context so it remains visible above event dialogs. The member-card tap-to-flip interaction remains intact.

## Performance findings and optimizations

The custom cursor now uses requestAnimationFrame and direct DOM transforms rather than React state updates on every mousemove. The interactive dotted grid now renders on demand instead of running a continuous animation loop and skips pointer interaction work on touch devices and reduced-motion settings.

The mobile ambient background uses normal scrolling while desktop retains the fixed background treatment. Static glass surfaces no longer request unnecessary GPU layer promotion. Route transitions are shorter and respect reduced-motion preferences.

Font loading was optimized by moving the active Plus Jakarta Sans and Noto Color Emoji stylesheet into `index.html` with early preconnect hints and removing duplicate CSS `@import` requests. The unused Poppins and Playfair Display request was removed.

Event metadata and image imports were extracted into `src/data/events.ts`. This removes the static `Navbar -> Events page` dependency, keeps the Events page lazy-loadable, and produces a separate Events route chunk in the production build.

## Preview limitation

The local Vite server was launched successfully on the attached PC at `http://localhost:8080/`. The sandbox browser service was unavailable for interactive screenshot-based viewport testing, and the attached-PC preview could not be bridged into that browser session. Therefore, the final report distinguishes code/build verification from live browser score measurement. No Lighthouse numeric score is claimed without a working browser engine.

## Current result

The project is saved locally, builds successfully, has no lint errors, and contains the responsive and performance optimizations described above. The latest event data and uploaded event assets are included in the final project.
