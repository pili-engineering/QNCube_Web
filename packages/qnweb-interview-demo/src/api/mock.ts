import Base64 from 'crypto-js/enc-base64';
import HmacSHA1 from 'crypto-js/hmac-sha1';


/**
 * mock dora http 请求 token
 */
export function mockToken() {
  // const accessKey = 'QxZugR8TAhI38AiJ_cptTl3RbzLyca3t-AAiH-Hh';
  // const secretKey = '4yv8mE9kFeoE31PVlIjWvi3nfTytwT0JiAxWjCDa';
  // const app_id = 'fleqfq6yc';
  // const src = `${app_id}:${Math.floor(Date.now() / 1000)}`;
  // const encodedSrc = btoa(src).replace(/\//g, '_').replace(/\+/g, '-');
  // const sign = HmacSHA1(encodedSrc, secretKey);
  // // @ts-ignore
  // const encodedSign = btoa(sign).replace(/\//g, '_').replace(/\+/g, '-');
  // return 'QD ' + accessKey + ':' + encodedSign + ':' + encodedSrc;
  return 'QD bsOUqUaLN-cJ3DlmdD6jU8B7_Nq5fo6IDZVAhtLe:ijjEYvSXU6hMVf3ft9c1fjy0EwA=:dGVzdEFwcDoxNjI0MTA0NjY1'
}

/**
 * mock dora 语音转文字 websocket token
 * @param url
 */
export async function mockSignToken(url: string): Promise<string> {
  const accessKey = 'QxZugR8TAhI38AiJ_cptTl3RbzLyca3t-AAiH-Hh';
  const secretKey = '4yv8mE9kFeoE31PVlIjWvi3nfTytwT0JiAxWjCDa';
  // const app_id = 'fleqfq6yc';
  const SKSign = HmacSHA1(url, secretKey);
  const SKEncodedSign = Base64.stringify(SKSign).replace(/\//g, '_').replace(/\+/g, '-');
  const token = `${accessKey}:${SKEncodedSign}`;
  return token;
}