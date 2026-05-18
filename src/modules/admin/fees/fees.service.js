const { FeeStructure, FeePayment } = require('../../../models/Fees.model');
const Student = require('../../../models/Student.model');

// ─── Fee Structure ────────────────────────────────────────────────────────────

const getAllFeeStructures = async () => {
  return FeeStructure.findAll({ order: [['grade', 'ASC']] });
};

const getFeeStructureByGrade = async (grade) => {
  const fee = await FeeStructure.findOne({ where: { grade } });
  if (!fee) throw new Error(`No fee structure found for grade ${grade}`);
  return fee;
};

const createFeeStructure = async (data) => {
  const { grade, tuition, lab, library, sports, exam } = data;

  const existing = await FeeStructure.findOne({ where: { grade } });
  if (existing) throw new Error(`Fee structure for grade ${grade} already exists. Use update instead.`);

  const totalFee = (tuition || 0) + (lab || 0) + (library || 0) + (sports || 0) + (exam || 0);

  return FeeStructure.create({
    grade,
    tuitionFee:  tuition  || 0,
    labFee:      lab      || 0,
    libraryFee:  library  || 0,
    sportsFee:   sports   || 0,
    examFee:     exam     || 0,
    totalFee,
  });
};

const updateFeeStructure = async (id, data) => {
  const fee = await FeeStructure.findByPk(id);
  if (!fee) throw new Error('Fee structure not found');

  const tuition = data.tuition ?? fee.tuitionFee;
  const lab     = data.lab     ?? fee.labFee;
  const library = data.library ?? fee.libraryFee;
  const sports  = data.sports  ?? fee.sportsFee;
  const exam    = data.exam    ?? fee.examFee;
  const totalFee = tuition + lab + library + sports + exam;

  return fee.update({
    tuitionFee: tuition,
    labFee:     lab,
    libraryFee: library,
    sportsFee:  sports,
    examFee:    exam,
    totalFee,
  });
};

const deleteFeeStructure = async (id) => {
  const fee = await FeeStructure.findByPk(id);
  if (!fee) throw new Error('Fee structure not found');
  await fee.destroy();
  return { message: 'Fee structure deleted successfully' };
};

// ─── Fee Payments ─────────────────────────────────────────────────────────────

const getPaymentsByStudent = async (studentId) => {
  return FeePayment.findAll({
    where: { studentId },
    include: [{ model: FeeStructure, as: 'feeStructure', attributes: ['grade', 'totalFee'] }],
    order: [['dueDate', 'ASC']],
  });
};

const createPayment = async (data) => {
  // Auto-generate receipt number
  const receiptNumber = 'RCP-' + Date.now();
  return FeePayment.create({ ...data, receiptNumber });
};

const updatePaymentStatus = async (id, status, paidDate) => {
  const payment = await FeePayment.findByPk(id);
  if (!payment) throw new Error('Payment record not found');
  return payment.update({ status, paidDate: paidDate || new Date() });
};

// ─── Summary stats for admin ──────────────────────────────────────────────────

const getFeeSummary = async () => {
  const { Op, fn, col } = require('sequelize');

  const [totalCollected, totalPending, totalOverdue] = await Promise.all([
    FeePayment.sum('amount', { where: { status: 'paid' } }),
    FeePayment.sum('amount', { where: { status: 'pending' } }),
    FeePayment.sum('amount', { where: { status: 'overdue' } }),
  ]);

  return {
    totalCollected: totalCollected || 0,
    totalPending:   totalPending   || 0,
    totalOverdue:   totalOverdue   || 0,
  };
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
