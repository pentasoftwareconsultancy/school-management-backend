const app = require('./src/app');
const { sequelize, connectDB } = require('./src/config/db.config');
require('dotenv').config();

// ── Load all models ──────────────────────────────────────────
require('./src/models/User.model');
require('./src/models/Student.model');
require('./src/models/Teacher.model');
require('./src/models/Parent.model');
require('./src/models/Course.model');
require('./src/models/Notification.model');
require('./src/models/Timetable.model');
const { FeeStructure, FeePayment } = require('./src/models/Fees.model');
const { Settings } = require('./src/modules/admin/settings/settings.service');

// ── Associations ─────────────────────────────────────────────
const Teacher   = require('./src/models/Teacher.model');
const Course    = require('./src/models/Course.model');
const Timetable = require('./src/models/Timetable.model');
const Student   = require('./src/models/Student.model');

Course.belongsTo(Teacher,     { foreignKey: 'teacherId', as: 'teacher' });
Teacher.hasMany(Course,       { foreignKey: 'teacherId', as: 'courses' });

Timetable.belongsTo(Teacher,  { foreignKey: 'teacherId', as: 'teacher' });
Teacher.hasMany(Timetable,    { foreignKey: 'teacherId', as: 'timetables' });

FeePayment.belongsTo(FeeStructure, { foreignKey: 'feeStructureId', as: 'feeStructure' });
FeeStructure.hasMany(FeePayment,   { foreignKey: 'feeStructureId', as: 'payments' });

FeePayment.belongsTo(Student,  { foreignKey: 'studentId', as: 'student' });
Student.hasMany(FeePayment,    { foreignKey: 'studentId', as: 'feePayments' });

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }).then(() => {
  console.log('Database schema synchronized');
  app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Error synchronizing database:', err);
});