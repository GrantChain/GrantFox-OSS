import { useState } from "react";

/**
 * Use copy to clipboard
 *
 * @returns The copied key id and the function to copy to clipboard
 */
export const useCopy = () => {
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);

  const copyToClipboard = async (text: string, keyId?: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedKeyId(keyId ?? text);
    setTimeout(() => setCopiedKeyId(null), 1500);
  };

  return { copiedKeyId, copyToClipboard };
};
