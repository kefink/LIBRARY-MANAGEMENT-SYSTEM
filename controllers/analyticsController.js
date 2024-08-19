const { Book, Transaction, User } = require('../models');
const { Op } = require('sequelize');

const getMonthlyReport = async (req, res) => {
  const { month, year } = req.query;

  try {
    const mostReadBooks = await Book.findAll({
      order: [['readCount', 'DESC']],
      limit: 5,
    });

    const topClass = await User.findAll({
      where: { role: 'student' },
      include: [{
        model: Transaction,
        where: {
          borrowDate: {
            [Op.gte]: new Date(year, month - 1, 1),
            [Op.lt]: new Date(year, month, 1),
          }
        }
      }],
      group: ['User.id'],
      order: [[sequelize.fn('COUNT', sequelize.col('Transactions.id')), 'DESC']],
      limit: 5
    });

    const topTeacher = await User.findAll({
      where: { role: 'teacher' },
      include: [{
        model: Transaction,
        where: {
          borrowDate: {
            [Op.gte]: new Date(year, month - 1, 1),
            [Op.lt]: new Date(year, month, 1),
          }
        }
      }],
      group: ['User.id'],
      order: [[sequelize.fn('COUNT', sequelize.col('Transactions.id')), 'DESC']],
      limit: 5
    });

    res.json({ mostReadBooks, topClass, topTeacher });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getMonthlyReport };
