// Köhnə birbaşa axios importunu sil və öz yaratdığın api instansiyasını gətir
import api from './api'; 
import type { Article } from '../types/index';

// API_URL artıq api instansiyasının daxilindəki baseURL-dən (/api) sonrasını götürəcək
export const getAllArticles = async () => {
  const response = await api.get<Article[]>('/articles');
  return response; // data-nı useQuery daxilində (.data) ilə oxuyursan onsuz da
};

export const getArticleBySlug = async (slug: string) => {
  const response = await api.get<Article>(`/articles/${slug}`);
  return response;
};