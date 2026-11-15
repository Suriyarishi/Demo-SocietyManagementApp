# Hunt Lockdoor — Residential Security & Gated Community OS

> **Hunt Lockdoor** is a premier 2026 residential gated-community operating system and smart living mobile application. Engineered with high-assurance perimeter defense, instant gate passes, verified resident governance, zero-brokerage classifieds, and critical fail-safe SOS.

[![React](https://img.shields.io/badge/React-19.2-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v3-38B2AC.svg)](https://tailwindcss.com/)

---

## 📱 Mobile Architecture & Modules (01 – 11)

Hunt Lockdoor contains 11 end-to-end modules designed following `/ui-ux-pro-max`, `/design`, and `/design-system` standards:

| Module | Description | Core Screens |
|---|---|---|
| **M01: Auth & Onboarding** | OTP verification, multi-society lookup, unit selection, and digital KYC onboarding. | `SCR_AUTH_01` – `06` |
| **M02: Home Command Hub** | Dynamic concierge bar, incoming gate knock alerts, multi-flat switcher, and quick pass actions. | `SCR_HOME_01` – `04` |
| **M03: Gate Pass & Visitors** | Pre-approve guests, delivery passes (Zepto, Blinkit, Swiggy), cab passes, and audited gate history. | `SCR_GATE_01` – `07` |
| **M04: Daily Staff** | Domestic helps, maid/driver RFID attendance tracking, salary ledgers, and directory. | `SCR_STAFF_01` – `05` |
| **M05: Financials & Society Dues** | Itemized maintenance bills, Bharat UPI checkout, digital receipts, and smart sub-meter recharge. | `SCR_PAY_01` – `06` |
| **M06: Tickets & SLA Helpdesk** | Maintenance ticket creation with 24h SLA tracking, technician dispatch, 15m express services, and signoff. | `SCR_TICK_01` – `06` |
| **M07: Profile & Settings** | Luxury resident identity card, VoIP intercom toggles, and perimeter clearance controls. | `SCR_SET_01` – `03` |
| **M08: Society Living Hub** | 8-Feature Action Grid: Amenities booking, official notices & AGM voting, community forum, and directory. | `SCR_SOC_01` – `06` |
| **M09: Resident Marketplace** | Strict zero-brokerage resident-only pre-loved goods, home bakes, freecycle, chat, and gate handover passes. | `SCR_MKT_01` – `03` |
| **M10: Critical Safety & SOS** | Fail-safe emergency panic system with 3-second abort window, live guard dispatch tracking (ETA <45s), and speed dial. | `SCR_SOS_01` – `05` |
| **M11: Household & Vehicles** | Family & tenant access matrix, vehicle registry with Gate 2 RFID Fastag auto-lift, 15m wrong parking dispute notice, and smart lock integration. | `SCR_SETT_01` – `06` |

---

## 🎨 Design System Highlights

* **Smartphone Mockup Viewport**: Centered realistic mobile chassis (`#F4F5F7` backdrop, 43px inner corner radius, native dynamic island, and home indicator).
* **Ergonomic Bottom Thumb-Zone**: Persistent 4-tab sticky bottom navigation dock (`Home`, `Society`, `My Bills`, `Services`).
* **Ergonomic Inputs**: Standardized `h-[52px] rounded-2xl` input fields with elevated fill and soft focus rings.
* **Universal Back Navigation**: Accessible `← Back` top navigation on all sub-screens.
* **Strict Residential Scope**: Zero commercial real estate ads or property brokerages; verified resident ecosystem only.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0 or higher)
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/Suriyarishi/Hunt-LockDoorApp.git

# Navigate to project directory
cd Hunt-LockDoorApp

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 🛠️ Tech Stack
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS, CSS Variables
- **Icons**: Lucide React
- **Build Tool**: Vite 6

---

## 📄 License
MIT License. Developed for Hunt Security — 2026 Edition.
