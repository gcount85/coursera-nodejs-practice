// request를 받아서 프로미스를 반환한다.

export const getRequestData = (req) => {
  return new Promise((resolve, reject) => {
    try {
      // 클라이언트가 보낸 요청 바디를 파싱한다.
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
};
