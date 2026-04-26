# Academic Audit Management System
### Khwaja Moinuddin Chishti Language University, Lucknow

A centralized digital platform designed to replace manual Word-based academic auditing for faculty members.

## 🏗️ Project Structure

```text
kmc_project/
├── app/                    # Next.js App Router (Main logic)
│   ├── activities/         # The core Activities Dashboard
│   │   └── page.tsx        # Unified module for Organized/Attended/Support
│   ├── globals.css         # Global styles & University Theme variables
│   ├── layout.tsx          # Main layout (University Header & Footer)
│   └── page.tsx            # Welcome Portal / Landing Page
├── public/                 # Static assets (Logos, Icons)
├── .next/                  # Next.js build output (Auto-generated)
├── node_modules/           # Project dependencies (Auto-generated)
├── package.json            # Scripts and dependency list
├── tsconfig.json           # TypeScript configuration
├── next.config.ts          # Next.js specific configuration
└── tailwind.config.ts      # Tailwind CSS configuration
```

## 🛠️ Core Components

- **Theme**: Defined in `app/globals.css` using the university's primary Burnt Orange (`#B23B25`) and secondary Cream (`#FFF9E6`).
- **Dashboard**: A tabbed interface in `app/activities/page.tsx` that handles three main audit areas:
    1. **Activities Organized**: Seminars, Workshops, FDPs.
    2. **Activities Attended**: External training and programs.
    3. **Student Support**: Mentorship and engagement data.

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **View the App**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📤 Future Features
- [ ] **Supabase Integration**: Permanent database storage.
- [ ] **Auth System**: Individual teacher logins.
- [ ] **CSV Export**: One-click download of all records.
- [ ] **Admin Panel**: University-wide audit viewing.
