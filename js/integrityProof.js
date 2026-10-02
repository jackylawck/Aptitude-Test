export class IntegrityProof {
  static async _sha256(str) {
    const encoder = new TextEncoder();
    const digestBuf = await crypto.subtle.digest('SHA-256', encoder.encode(str));
    return Array.from(new Uint8Array(digestBuf))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }

  static async computeRollingHash(eventStream) {
    let currentHash = '0000000000000000000000000000000000000000000000000000000000000000';
    for (const evt of eventStream) {
      const payload = `${evt.t}:${evt.type}:${evt.val || ''}:${currentHash}`;
      currentHash = await this._sha256(payload);
    }
    return currentHash;
  }

  static async generateProof(candidate, results, seed, eventStream) {
    const eventChainHash = await this.computeRollingHash(eventStream);
    const issuedAt = new Date().toISOString();

    const payloadObject = {
      candidate: candidate.name || 'ANONYMOUS',
      chainHash: eventChainHash,
      eventsCount: eventStream.length,
      gf: results.dimensions.gf,
      gv: results.dimensions.gv,
      issuedAt,
      pr: results.percentile,
      protocol: 'JO_ATP_VERIFIABLE_SPEC_V2',
      seed,
      stanine: results.stanine,
    };

    const canonicalJson = JSON.stringify(
      Object.keys(payloadObject)
        .sort()
        .reduce((obj, k) => {
          obj[k] = payloadObject[k];
          return obj;
        }, {})
    );

    const fullDigest = await this._sha256(canonicalJson);

    return {
      receiptCode: `REC-${fullDigest.slice(0, 16).toUpperCase()}`,
      eventChainHash: `${eventChainHash.slice(0, 16).toUpperCase()}...`,
      fullDigest,
      issuedAt,
    };
  }
}
