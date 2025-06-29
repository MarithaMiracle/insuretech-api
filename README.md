# InsureTech API

A complete insuretech backend built with **NestJS**, **Sequelize (TypeScript)**, and **PostgreSQL**. This API allows users to purchase insurance plans, activate one policy per plan, and manage wallet balances and products.

---

## 🔧 Features

- Purchase insurance plans with wallet deduction
- Auto-generate multiple pending policies per plan
- Only one policy can be activated per plan
- Soft-delete activated policies
- View policies by user or plan
- Wallet balance tracking per user
- Seeded users, categories, and products
- Fully documented Swagger UI
- Passing unit tests for major modules

---

## 🧱 Tech Stack

- **Backend**: NestJS
- **Database**: PostgreSQL
- **ORM**: Sequelize (with TypeScript)
- **Testing**: Jest + @nestjs/testing
- **API Docs**: Swagger (OpenAPI 3.0)

---

## 📁 File Structure

```
src/
 ┣ models/              # Sequelize models
 ┣ pending-policies/    # Unused policy slots
 ┣ plans/               # Plan purchase logic
 ┣ policies/            # Policy activation logic
 ┣ products/            # Product listing logic
 ┣ seeder/              # Default users/products/categories
 ┣ users/               # Wallet balance endpoints
 ┣ app.module.ts        # Root module
 ┗ main.ts              # App entry point
```

---

## 🧪 Seeded Data

### 👤 Users

| ID | Name     | Wallet Balance |
|----|----------|----------------|
| 1  | Maritha  | 50000          |
| 2  | Emeka    | 30000          |
| 3  | Zainab   | 15000          |
| 4  | Greg     | 0              |

### 📂 Product Categories

- **Health**
- **Auto**

### 🛡️ Products

| ID | Name                    | Category | Price  |
|----|-------------------------|----------|--------|
| 1  | Optimal care mini       | Health   | 10000  |
| 2  | Optimal care standard   | Health   | 20000  |
| 3  | Third-party             | Auto     | 5000   |
| 4  | Comprehensive           | Auto     | 15000  |

---

## 🧭 API Endpoints

### 🛒 Plans

| Method | Route          | Description                                     |
|--------|----------------|-------------------------------------------------|
| POST   | /plans         | Purchase a plan (deducts wallet, creates slots) |
| GET    | /plans/:id     | Get plan details and all pending policies       |

POST Body:
```json
{
  "userId": 1,
  "productId": 4,
  "quantity": 2
}
```

---

### 🔒 Policies

| Method | Route                          | Description                                    |
|--------|--------------------------------|------------------------------------------------|
| POST   | /policies/activate             | Activate one pending policy under a plan       |
| GET    | /policies/user/:userId         | Get all activated policies for a user          |
| GET    | /policies/plan/:planId         | Get activated policies under a specific plan    |
| GET    | /policies/:id                  | Get a specific activated policy by ID           |

POST Body:
```json
{
  "planId": 1
}
```

> ⚠️ **Note**: Only one policy can be activated per plan.

---

### 🕓 Pending Policies

| Method | Route                               | Description                               |
|--------|-------------------------------------|-------------------------------------------|
| GET    | /pending-policies?planId=1          | Get all unused policies under a plan      |
| GET    | /pending-policies/user/:userId      | Get all unused policies across user plans |

---

### 📦 Products

| Method | Route       | Description                         |
|--------|-------------|-------------------------------------|
| GET    | /products   | Get all insurance products & prices |

---

### 👛 Users

| Method | Route              | Description                        |
|--------|--------------------|------------------------------------|
| GET    | /users/:id/wallet  | Get current wallet balance of user |

---

## ✅ Acceptance Criteria Mapping

| Criterion                                                         | Status ✅ |
|-------------------------------------------------------------------|-----------|
| 1. Fetch products + category + price                              | ✅ Done   |
| 2. Buy plan + deduct wallet                                       | ✅ Done   |
| 3. See pending policies under a plan                              | ✅ Done   |
| 4. Activate one pending policy only (soft delete)                 | ✅ Done   |
| 5. View all activated policies + filter by plan or user            | ✅ Done   |
| 6. Only one policy per plan allowed per user                      | ✅ Done   |

---

## 🧪 Testing

Run tests with:

```bash
npm run test
```

Tested:
- Plan creation and wallet deduction
- Policy activation logic
- Service and controller units
- User wallet lookups

---

## 🚀 Running Locally

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/insuretech-api.git
cd insuretech-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. 🔐 Environment Setup

Copy `.env.example` into a new file named `.env`

```bash
cp .env.example .env
```

### 4. Start PostgreSQL and Run App

```bash
npm run start:dev
```

Seeder will auto-run once and insert default data.

---

## 📜 Swagger Documentation

Visit:

```
http://localhost:3000/api
```

- Every route is documented
- Request/response samples included
- Includes validation schema (`CreatePlanDto`, `ActivatePolicyDto`, etc.)

---

## 👩🏽‍💻 Author

**Maritha Miracle**  
Backend Engineer — MyCoverGenius Technical Assessment  
📧 marithamiracle@gmail.com  
🔗 [GitHub: MarithaMiracle](https://github.com/MarithaMiracle)

---
