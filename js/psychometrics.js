export class PsychometricsEngine {
  static evaluate(timeSpentSec, isCorrect, conflictCount) {
    const timeEfficiency = Math.max(0.2, Math.min(1.0, (120 - timeSpentSec) / 90));
    const accuracyFactor = isCorrect ? 1.0 : 0.3;
    const stability = Math.max(0.1, 1.0 - conflictCount * 0.12);

    const gv = Number((accuracyFactor * 0.95).toFixed(2));
    const gf = Number((accuracyFactor * (0.6 + timeEfficiency * 0.4)).toFixed(2));
    const gsm = Number((stability * 0.85).toFixed(2));
    const gq = Number((accuracyFactor * 0.75).toFixed(2));
    const gs = Number((timeEfficiency * 0.9).toFixed(2));

    const compositeRaw = (gv + gf + gsm + gq + gs) / 5;
    const stanine = Math.max(1, Math.min(9, Math.round(compositeRaw * 8 + 1)));
    const percentile = Math.max(1, Math.min(99, Math.round(compositeRaw * 100)));

    return {
      stanine,
      percentile,
      sem: 0.28,
      dimensions: { gv, gf, gsm, gq, gs },
    };
  }
}
