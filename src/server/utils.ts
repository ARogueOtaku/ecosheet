const HASH_DERIVATION_ALGO = "PBKDF2";
const HASH_ALGO = "SHA-512";
const encoder = new TextEncoder();
const saltBuffer = encoder.encode(process.env.CRYPTO_KEY!);

export async function hash(value: string, iterations = 1000, length = 64) {
  const valueBuffer = encoder.encode(value);
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    valueBuffer,
    {
      name: HASH_DERIVATION_ALGO,
    },
    false,
    ["deriveKey", "deriveBits"]
  );
  const derivedKey = await crypto.subtle.deriveBits(
    {
      name: HASH_DERIVATION_ALGO,
      salt: saltBuffer,
      iterations,
      hash: HASH_ALGO,
    },
    keyMaterial,
    length
  );
  return Array.from(new Uint8Array(derivedKey))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function verifyHash(
  value: string,
  hashedValue: string,
  iterations = 1000,
  length = 64
) {
  const newHashedValue = await hash(value, iterations, length);
  return hashedValue === newHashedValue;
}

// Embeds the Initialization Vector inside the encrypted data
export async function encrypt(value: string) {
  const initializationVector = crypto.getRandomValues(new Uint8Array(16));
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    saltBuffer,
    { name: "AES-GCM" },
    false,
    ["encrypt"]
  );
  const valueBuffer = encoder.encode(value);
  const encryptedData = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: initializationVector },
    cryptoKey,
    valueBuffer
  );
  const encryptedBuffer = new Uint8Array(encryptedData);
  const combinedData = new Uint8Array(
    initializationVector.length + encryptedBuffer.length
  );
  combinedData.set(initializationVector);
  combinedData.set(encryptedBuffer, initializationVector.length);
  return Buffer.from(combinedData).toString("hex");
}

// Assumes that the Initialization Vector is embedded with the value
export async function decrypt(value: string) {
  const valueBuffer = Buffer.from(value, "hex");
  const initializationVector = valueBuffer.slice(0, 16);
  const encryptedBuffer = valueBuffer.slice(16);
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    saltBuffer,
    { name: "AES-GCM" },
    false,
    ["decrypt"]
  );
  try {
    const decryptedData = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: initializationVector },
      cryptoKey,
      encryptedBuffer
    );
    const decoder = new TextDecoder();
    return decoder.decode(decryptedData);
  } catch (err) {
    console.error(`Decryption failed! ${err}`);
    throw new Error("Decryption failed");
  }
}

export function JSONSafeParse<T = unknown>(value: string, defaultOut: T) {
  let out = defaultOut;
  try {
    out = JSON.parse(value);
  } catch (err) {
    console.error(`JSON Parse Error. ${err}`);
  }
  return out;
}
