import QRCode from 'qrcode';

export async function generateQRCode(paymentId: string, amount: number): Promise<string> {
  try {
    // Aqui você implementaria a geração real do QR Code PIX
    // Por enquanto, vamos apenas gerar um QR Code com dados simulados
    const pixData = {
      paymentId,
      amount,
      timestamp: new Date().toISOString()
    };

    const qrCodeData = JSON.stringify(pixData);
    const qrCode = await QRCode.toDataURL(qrCodeData);
    return qrCode;
  } catch (error) {
    throw new Error('Erro ao gerar QR Code');
  }
} 