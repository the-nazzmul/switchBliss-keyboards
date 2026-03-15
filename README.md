# SwitchBliss Keyboards

A product site for **SwitchBliss** and the **Vapor75** — a premium 75% mechanical keyboard. The site features a 3D hero, switch sound playground, custom keycap configurator, and Stripe checkout.

## Description

SwitchBliss Keyboards is a Next.js e-commerce site showcasing the Vapor75: hot-swappable switches, full aluminum case, wireless connectivity, interchangeable knob, custom keycap sets, and E-Ink display. The front end includes a WebGL/Three.js hero scene, interactive switch and keycap explorers, and a Stripe-powered purchase flow.

## Screenshot

![SwitchBliss Keyboards](/screenshot.png)

## Tech Stack

| Category        | Technologies                                   |
| --------------- | ---------------------------------------------- |
| **Framework**   | Next.js 16 (App Router), React 19              |
| **Language**    | TypeScript                                     |
| **Styling**     | Tailwind CSS 4                                 |
| **3D / Canvas** | Three.js, React Three Fiber, @react-three/drei |
| **Animation**   | GSAP, @gsap/react                              |
| **UI**          | Radix UI, clsx, react-icons                    |
| **Payments**    | Stripe                                         |
| **Tooling**     | ESLint, Prettier (Tailwind plugin)             |

## How to Run Locally

1. **Clone and install dependencies**

   ```bash
   git clone <your-repo-url>
   cd switch-bliss-keyboards
   npm install
   # or
   bun install
   ```

2. **Environment variables (optional, for checkout)**

   Create a `.env.local` in the project root and add your Stripe keys if you want the Buy/checkout flow to work:

   ```env
   STRIPE_SECRET_KEY=sk_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
   ```

3. **Start the dev server**

   ```bash
   npm run dev
   # or
   bun run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

**Other commands**

- `npm run build` — Production build
- `npm run start` — Run production server
- `npm run lint` — Run ESLint

## Live Site

[Live site](https://switch-bliss-keyboards.vercel.app/)
