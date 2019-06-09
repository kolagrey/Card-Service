
const generatePIN = () => {
      return (Math.random() * 999999).toFixed(0);
};

module.exports = generatePIN;