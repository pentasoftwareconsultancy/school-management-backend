const bcrypt = require('bcryptjs');
const User = require('./src/models/User.model');
const { sequelize, connectDB } = require('./src/config/db.config');

const seedUsers = async () => {
  try {
    await connectDB();
    // Ensure table is created
    await sequelize.sync({ alter: true });

    const defaultPassword = 'password123';
    const passwordHash = await bcrypt.hash(defaultPassword, 10);

    const users = [
      {
        username: 'admin',
        email: 'admin@school.com',
        password: passwordHash,
        role: 'admin'
      },
      {
        username: 'teacher',
        email: 'teacher@school.com',
        password: passwordHash,
        role: 'teacher'
      },
      {
        username: 'student',
        email: 'student@school.com',
        password: passwordHash,
        role: 'student'
      },
      {
        username: 'parent',
        email: 'parent@school.com',
        password: passwordHash,
        role: 'parent'
      }
    ];

    console.log('--- Seeding Default Users ---');
    for (const user of users) {
      const existing = await User.findOne({ where: { email: user.email } });
      if (!existing) {
        await User.create(user);
        console.log(`✅ Created ${user.role} | Email: ${user.email} | Password: ${defaultPassword}`);
      } else {
        console.log(`ℹ️ ${user.role} already exists (${user.email})`);
      }
    }

    console.log('Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

seedUsers();
