# 🎁 Gift Recommendation Dashboard

A mini CRM-style dashboard that helps marketers and sales reps manage their customers and generate personalized gift suggestions using live product data.

## 🚀 Tech Stack
- **Next.js (App Router)**
- **TypeScript**
- **shadcn/ui + Tailwind CSS**
- **Zustand** (state management + localStorage persistence)
- **React Toast** (notifications)
- **DummyJSON API** for mock product data

---

## ✨ Features

✅ **Customer Management**
- Add, edit, or delete customers via a modal
- Data persists across reloads (localStorage + Zustand)

✅ **Gift Suggestion Generator**
- Click “Suggest Gift” to fetch from `dummyjson.com/products`
- Automatically assigns a product within the customer’s budget

✅ **Responsive UI**
- Clean shadcn-based components
- Works smoothly on desktop and mobile

✅ **Feedback & UX**
- Toast messages on save/update/delete
- Smooth modals, hover effects, and card-style layout

---

## 🧠 Folder Structure
src/
├── app/
│ ├── page.tsx
│ ├── layout.tsx
│ └── globals.css
├── components/
│ ├── CustomerTable.tsx
│ ├── CustomerFormModal.tsx
│ ├── ui/ ← shadcn components
├── store/
│ └── useCustomerStore.ts
├── types/
│ └── Customer.ts
├── lib/
│ └── utils.ts

---

## ⚙️ Setup

```bash
# 1. Clone repo
git clone <your-repo-url>

# 2. Install dependencies
npm install

# 3. Run dev server
npm run dev
