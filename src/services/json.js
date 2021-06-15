import request from '@/utils/request';

export async function getJsonFile() {
  return request('/BlackFriday.json', {
    method: 'GET',
  });
}