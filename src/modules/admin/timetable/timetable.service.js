const Timetable = require('../../../models/Timetable.model');
const Teacher   = require('../../../models/Teacher.model');

// Get full timetable for a grade + section
const getTimetable = async (grade, section) => {
  return Timetable.findAll({
    where: { grade, section },
    include: [{ model: Teacher, as: 'teacher', attributes: ['id', 'fullName', 'subject'] }],
    order: [['day', 'ASC'], ['timeSlot', 'ASC']],
  });
};

// Upsert a single period (create or update)
const upsertPeriod = async (data) => {
  const { grade, section, day, timeSlot, subject, teacherId, room } = data;

  const existing = await Timetable.findOne({ where: { grade, section, day, timeSlot } });

  if (existing) {
    return existing.update({ subject, teacherId, room });
  }

  return Timetable.create({ grade, section, day, timeSlot, subject, teacherId, room });
};

// Save full timetable at once (array of periods)
const saveTimetable = async (grade, section, periods) => {
  // Delete existing timetable for this grade+section
  await Timetable.destroy({ where: { grade, section } });

  // Bulk insert new periods
  const rows = periods.map((p) => ({ ...p, grade, section }));
  return Timetable.bulkCreate(rows);
};

// Delete a single period
const deletePeriod = async (id) => {
  const period = await Timetable.findByPk(id);
  if (!period) throw new Error('Period not found');
  await period.destroy();
  return { message: 'Period deleted' };
};

module.exports = { getTimetable, upsertPeriod, saveTimetable, deletePeriod };
