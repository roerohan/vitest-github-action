import { C as COVERAGE_STORE_KEY } from './constants-758a8358.js';

async function getProvider() {
  const providerPath = "./provider.js";
  const { IstanbulCoverageProvider } = await import(providerPath);
  return new IstanbulCoverageProvider();
}
function takeCoverage() {
  const coverage = globalThis[COVERAGE_STORE_KEY];
  globalThis[COVERAGE_STORE_KEY] = {};
  return coverage;
}
var index = {
  getProvider,
  takeCoverage
};

export { index as default, getProvider, takeCoverage };
