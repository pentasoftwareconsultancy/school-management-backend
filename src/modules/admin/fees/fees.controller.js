const service = require('./fees.service');

// ─── Fee Structures ───────────────────────────────────────────────────────────

const getAllFeeStructures = async (req, res) => {
  try {
    const data = await service.getAllFeeStructures();
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getFeeStructureByGrade = async (req, res) => {
  try {
    const data = await service.getFeeStructureByGrade(req.params.grade);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

const createFeeStructure = async (req, res) => {
  try {
    const data = await service.createFeeStructure(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const updateFeeStructure = async (req, res) => {
  try {
    const data = await service.updateFeeStructure(req.params.id, req.body);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const deleteFeeStructure = async (req, res) => {
  try {
    const data = await service.deleteFeeStructure(req.params.id);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ─── Payments ─────────────────────────────────────────────────────────────────

const getPaymentsByStudent = async (req, res) => {
  try {
    const data = await service.getPaymentsByStudent(req.params.studentId);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const createPayment = async (req, res) => {
  try {
    const data = await service.createPayment(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const updatePaymentStatus = async (req, res) => {
  try {
    const { status, paidDate } = req.body;
    const data = await service.updatePaymentStatus(req.params.id, status, paidDate);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getFeeSummary = async (req, res) => {
  try {
    const data = await service.getFeeSummary();
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getAllFeeStructures,
  getFeeStructureByGrade,
  createFeeStructure,
  updateFeeStructure,
  deleteFeeStructure,
  getPaymentsByStudent,
  createPayment,
  updatePaymentStatus,
  getFeeSummary,
};
