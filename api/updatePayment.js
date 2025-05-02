// api/updatePayment.js

import axios from 'axios';

export default async function handler(req, res) {
  try {
    const { subscriptionId, nextAmount } = req.body;

    // DGFT APIのエンドポイント（必要に応じて本番URLに変更）
    const DGFT_API_URL = 'https://sandbox.dgft.jp/api/v1/subscription/update';

    // 認証情報（本番では環境変数にすべき！）
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + Buffer.from('3f2540da-229e-44e9-83c1-bfdfc65d9f18:283ed8ec-b46d-4b50-b73e-0b3c89bf94ca').toString('base64'),
    };

    // リクエストボディ
    const payload = {
      subscriptionId: subscriptionId,
      nextAmount: nextAmount,
    };

    // APIリクエスト
    const response = await axios.post(DGFT_API_URL, payload, { headers });

    res.status(200).json({ success: true, data: response.data });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}
