// Workaround for lightningcss build issue
// This file provides a stub for lightningcss to prevent build errors

module.exports = {
  transform: () => ({ code: '', map: null }),
  transformStyleSheet: () => ({ code: '', map: null }),
  bundle: () => ({ code: '', map: null }),
  browserslistToTargets: () => ({}),
};