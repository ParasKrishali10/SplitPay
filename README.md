
# 💸 SPLITPAY — Smart Expense Splitting App

🚀 **Live App:** https://splitpay8.onrender.com  

---

## 🌟 Overview

**SplitPay** is a full-stack expense management platform that enables users to:

- Split expenses with friends in groups  
- Track personal spending separately  
- Manage balances with transparency  

Built with **real-world fintech workflows**, inspired by Paytm-style expense systems.

---

## ⚡ Key Highlights

- 🚀 Developed a **production-ready full-stack application**
- 🔐 Implemented **OAuth authentication** with **0 regressions (100+ test scenarios)**
- 💡 Designed **group expense splitting logic** with clean balance calculations  
- ⚡ Built scalable backend using **Next.js API routes + MongoDB**
- 🎯 Focused on **fast UI + smooth UX** using Tailwind CSS  

---

## 🧠 Core Features

### 🔐 Authentication
- OAuth-based login (secure & scalable)
- Session management using NextAuth

---

### 👥 Group Expense System
- Create groups & add members  
- Add shared expenses  
- Automatic split calculation  
- Track who owes whom  

---

### 💰 Personal Expense Tracking
- Separate personal expense module  
- Clean overview of spending  

---

### 🔔 Real-Time Experience
- Instant updates for:
  - Expense changes  
  - Group activity  
  - Settlements  

---

## 🏗️ Tech Stack

| Layer        | Technology |
|-------------|-----------|
| Frontend    | Next.js, TypeScript, Tailwind CSS |
| Backend     | Next.js API Routes |
| Database    | MongoDB |
| Auth        | OAuth (NextAuth.js) |
| Deployment  | Render |

---

## 📂 Project Structure

    src/  
    ├── app/ # Frontend (Next.js App Router UI)  
    ├── model/ # MongoDB models (schemas)  
    ├── pages/api/ # Backend API routes  
    ├── types/ # TypeScript types


---

## 🧠 Architecture Insight

- **Frontend (app/):** UI & routing  
- **API Layer (pages/api/):** Business logic  
- **Database (model/):** Schema definitions  
- **Types (types/):** Type safety  

---

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/ParasKrishali10/SplitPay.git
cd splitpay
```
### 2. Install dependencies

    npm install
### 3. Setup environment variables

Create a `.env.local` file:

    MONGODB_URI=your_mongodb_uri
    NEXTAUTH_SECRET=your_secret
    OAUTH_CLIENT_ID=your_client_id
    OAUTH_CLIENT_SECRET=your_client_secret
### 4. Run the development server

    npm run dev

## 🧪 Engineering Quality

-   ✅ 100+ authentication test scenarios
-   ✅ Modular and scalable codebase
-   ✅ Clean separation of concerns
-   ✅ Optimized API handling

----------

## 🎯 Why This Project Stands Out

-   Mimics **real fintech systems**
-   Demonstrates **full-stack integration**
-   Shows **system design understanding**
-   Built with **industry-relevant stack**

## 🚀 Future Improvements

-   💳 Payment integration (UPI / Stripe)
-   📊 Expense analytics dashboard
-   🤖 AI-based insights
-   📱 Mobile optimization

## 👨‍💻 Author

**Paras Krishali**  
Final Year CSE | Full Stack Developer
