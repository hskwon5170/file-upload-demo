// #1. 태스크 그룹 생성
export async function CreateTaskGroup() {
  try {
    const response = await fetch(
      'https://57d380cb-747d-4e60-a579-3352902f4308.mock.pstmn.io/resource',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) throw new Error('서버 응답이 올바르지 않습니다.');

    const result = await response.json();
    return result.id;
  } catch (error) {
    console.error('에러', error);
    return '';
  }
}
