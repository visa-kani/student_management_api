### 📖 Project Description
A Node.js + MySQL CRUD application for managing student records with role-based access for Admin and Faculty.

#### Backend: Node.js, Express, Sequelize ORM, MySQL

##### Features: 
Role-based login (Admin and Faculty), CRUD operations, import/export to Excel, pagination, search, activity logging, and course-based student analytics.

#### 🔑 Roles

##### Admin:
1. Create, edit, delete, view student data
2. Import students via Excel
3. Export students to Excel
4. View activity logs (create, edit, update actions)
5. View analytics on students enrolled in different courses
6. Search and paginate student records

##### Faculty:
1. View student data
2. Search and paginate student records
3. Export students to Excel

#### ⚙️ Setup Instructions
##### Clone the repository
  1. git clone <your-repo-url>
  2. cd mysql-crud
  3. Install dependencies
  4. npm install
  5. Setup MySQL Database locally

## Create a database in your MySQL server (e.g., student_management).
`Update your database connection configurations in your project accordingly.`

 #### Run the project
`npm run dev`

##### ✨ Features
✅ Role-based authentication (Admin and Faculty)
✅ Admin CRUD (create, read, update, delete) on students
✅ Faculty view-only access
✅ Search and pagination for student records
✅ Export student data to Excel
✅ Import student data via Excel (Admin only)
✅ Activity logs for student data modifications
✅ Analytics of students per course

##### 🛠 Dependencies
1. express
2. sequelize
3. mysql2
4. jsonwebtoken
5. bcrypt
6. multer
...For a complete list of dependencies, please refer to the package.json file.

##### 💡 Author
Name: Kanimozhi T
