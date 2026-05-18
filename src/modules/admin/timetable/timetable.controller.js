const service = require('./timetable.service');

const getTimetable = async (req, res) => {
  try {
    const { grade, section } = req.query;
    if (!grade || !section) {
      return res.status(400).json({ success: false, message: 'grade and section are required' });
    }
    const data = await service.getTimetable(grade, section);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const upsertPeriod = async (req, res) => {
  try {
    const data = await service.upsertPeriod(req.body);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const saveTimetable = async (req, res) => {
  try {
    const { grade, section, periods } = req.body;
    if (!grade || !section || !Array.isArray(periods)) {
      return res.status(400).json({ success: false, message: 'grade, section and periods array are required' });
    }
    const data = await service.saveTimetable(grade, section, periods);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const deletePeriod = async (req, res) => {
  try {
    const data = await service.deletePeriod(req.params.id);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = { getTimetable, upsertPeriod, saveTimetable, deletePeriod };
